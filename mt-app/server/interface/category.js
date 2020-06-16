import Router from 'koa-router';
import axios from './utils/axios'

let router = new Router({prefix: '/category'})

router.get('/crumbs', async (ctx) => {
  let {status, data: {areas, types}} = await axios.get('http://cp-tools.cn/categroy/crumbs',{
    params: {
      city: ctx.query.city.replace('市', '') || '北京'
    }
  })
  ctx.body = {
    areas: status === 200 ? areas : [],
    types: status === 200 ? types : []
  }
})

export default router
