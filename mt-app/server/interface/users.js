import Router from 'koa-router'
import Redis from 'koa-redis'
import nodeMailer from 'nodemailer'
import User from '../dbs/models/users'
import Passport from './utils/passport'
import Email from '../dbs/config'
import axios from './utils/axios'

let router = new Router({
  prefix: '/users'
})

let Store = new Redis().client

router.post('/signup', async (ctx) => {
  const {username, password, email, code} = ctx.request.body
  if(code){
    const saveCode = await Store.hget(`nodemail:${username}`, 'code')
    const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
    if(code === saveCode){
      if(new Date().getTime() - saveExpire >0) {
        ctx.body = {
          code: -1,
          msg: '验证码已过期,请重新请求'
        }
        return false
      }
    }else {
      console.log('验证码错误')
      ctx.body = {
        code: -1,
        msg: '请填写正确的验证码'
      }
      return false
    }
  }else {
    ctx.body = {
      code: -1,
      msg: '请输入验证码'
    }
    return false
  }

  let user = await User.find({
    username
  })
  if(user.length){
    ctx.body = {
      code: -1,
      msg: '用户名已被注册'
    }
    return
  }
  let newUser = await User.create({
    username,
    password,
    email
  })

  if(newUser){
    let res = await axios.post('/users/signin', {
      username,
      password
    })
    if(res.data && res.data.code ===0){
      ctx.body = {
        code: 0,
        msg: '注册成功',
        user: res.data.user
      }
    }else {
      ctx.body = {
        code: -1,
        msg: 'error'
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '注册失败'
    }
  }

})

router.post('/signin', async (ctx, next) => {
  return Passport.authenticate('local', (err, user, info, status) => {
    if(err) {
      ctx.body = {
        code: -1,
        msg: err
      }
    }else{
      if(user) {
        ctx.body = {
          code: 0,
          msg: '登陆成功',
          user: user
        }
        return ctx.login(user)
      }else{
        ctx.body = {
          code: 1,
          msg: info
        }
      }
    }
  })(ctx, next)
})

router.post('/verify', async (ctx, next) => {
  let username = ctx.request.body.username
  const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
  if(saveExpire && new Date().getTime() - saveExpire < 0) {
    ctx.body = {
      code: -1,
      msg: '请求过于频繁，1分钟内1次',
      time1:new Date().getTime(),
      time: saveExpire
    }
    return false
  }
  let transporter = nodeMailer.createTransport({
    host: Email.smtp.host,
    port: 587,
    secure: false,
    auth: {
      user: Email.smtp.user,
      pass: Email.smtp.pass
    }
  })
  let ko = {
    code: Email.smtp.code(),
    expire: Email.smtp.expire(),
    email: ctx.request.body.email,
    user: ctx.request.body.username
  }
  let mailOptions = {
    from: `认证邮件 <${Email.smtp.user}>`,
    to: ko.email,
    subject: '美团实战注册码',
    html: `您在美团实战中注册，您的邀请码是${ko.code}`
  }
  await transporter.sendMail(mailOptions, (err, info) => {
    if(err) {
      return console.log('error')
    }else {
      Store.hmset(`nodemail:${ko.user}`, 'code', ko.code, 'expire', ko.expire, 'email', ko.email)
    }
  })
  ctx.body = {
    code: 0,
    msg: '验证码已发送，可能会有延时，有效期1分钟'
  }
})

router.get('/exit', async (ctx, next) => {
  await ctx.logout()
  if(!ctx.isAuthenticated()){
    // 如果成功注销
    ctx.body = {
      code: 0,
      msg: '成功注销'
    }
  }else{
    ctx.body = {
      code: -1,
      msg: '注销失败'
    }
  }
})

router.get('/getUser', async (ctx, next) => {
  if(ctx.isAuthenticated()){
    const {username, email} = ctx.session.passport.user
    ctx.body = {
      user: username,
      email
    }
  }else{
    ctx.body = {
      user: '',
      email: ''
    }
  }
})

export default router




