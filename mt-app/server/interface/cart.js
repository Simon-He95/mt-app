import Router from 'koa-router';
import axios from './utils/axios'
import Cart from '../dbs/models/cart'
import md5 from  'crypto-js/md5'

let router = new Router({prefix: '/cart'})

router.post('/create', async ctx => { // 从本地数据库中创建购物车
  if (!ctx.isAuthenticated) { // 验证信息登录拦截
    ctx.body = {
      code: -1,
      msg: 'please login'
    }
  }else {
    let time = Date()
    let cartNo = md5(Math.random() * 1000 + time).toString()
    let {params: {id, detail}} = ctx.request.body // 如果是get则是ctx.query
    let cart = new Cart({
      id,
      cartNo,
      time,
      user: ctx.session.passport.user,
      detail
    })
    let result = await cart.save() // 存储
    if (result) {
      ctx.body = {
        code: 0,
        msg: '',
        id: cartNo
      }
    }else {
      ctx.body = {
        code: -1,
        msg: 'fail'
      }
    }
  }
})

router.post('/getCart', async ctx => { // 获取购物车信息
  let {id} = ctx.request.body
  try {
    let result = await Cart.findOne({
      cartNo: id
    })
    ctx.body = {
      code: 0,
      data: result ? result.detail[0] : {}
    }
    console.log(ctx.query.id)
    console.log(result)
  }catch (e) {
    ctx.body = {
      code: -1,
      data: {}
    }
  }
})


export default router
