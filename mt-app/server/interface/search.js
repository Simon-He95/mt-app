import Router from 'koa-router'
import axios from "./utils/axios"

let router = new Router({
  prefix: '/search'
})

router.get('/top', async (ctx) => {
  let {status, data:{top}} = await axios.get('http://cp-tools.cn/search/top',{
    params: {
      input: ctx.query.input,
      city: ctx.query.city
    }
  })
  if(status === 200){
    ctx.body = {
      top
    }
  }else{
    ctx.body = {
      top: []
    }
  }
})

router.get('/hotPlace', async (ctx) => {
  let city = ctx.store ? ctx.store.state.geo.position.city : ctx.query.city
  let {status, data:{result}} = await axios.get('http://cp-tools.cn/search/hotPlace',{
    params: {
      city: city
    }
  })
    ctx.body = {
      result: status ===200?result:[]
    }

})

router.get('/resultsByKeywords', async (ctx) => {
  const {city, keyword} = ctx.query;
  let {
    status,
    data: {
      count,
      pois
    }
  } = await axios.get('http://cp-tools.cn/search/resultsByKeywords', {
    params: {
      city,
      keyword
    }
  })
  ctx.body = {
    count: status === 200 ? count : 0,
    pois: status === 200  ? pois  : []
  }
})

router.get('/products', async (ctx) => {
  let keyword = ctx.query.keyword || '旅游'
  let city = ctx.query.city || '北京'
  let {status, data: {product, more}} = await axios.get('http://cp-tools.cn/search/products',{
    params: {
      keyword,
      city
    }
  })
  if (status === 200) {
    ctx.body = {
      product,
      more: ctx.isAuthenticated() ? more: [],
      login: ctx.isAuthenticated()
    }
  }else {
    ctx.body = {
      product: [],
      more: ctx.isAuthenticated() ? more: [],
      login: ctx.isAuthenticated()
    }
  }
})

export default router
