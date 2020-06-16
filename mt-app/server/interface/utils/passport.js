import passport from 'koa-passport'
import LocalStrategy from 'passport-local'
import UserModel from '../../dbs/models/users'

passport.use(new LocalStrategy(async (username, password, callback) => {
  let where = {
    username
  }
  let result = await UserModel.findOne(where)
  if(result !=null) {
    if(result.password === password) {
      return callback(null, result)
    }else{
      return  callback(null, false, '密码错误')
    }
  }else {
    return callback(null, false, '用户不存在')
  }
}))

passport.serializeUser((user, done) => {
  return done(null, user)
})

passport.deserializeUser((user, done) => {
  return done(null, user)
})

export default passport
