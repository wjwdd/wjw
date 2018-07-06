import Vue from 'vue'
import Router from 'vue-router'
// import Rank from 'components/rank/rank'
// import Recommend from 'components/recommend/recommend'
// import Search from 'components/search/search'
// import Singer from 'components/singer/singer'


// 路由懒加载
const Recommend = (resolve) => {
  import ('components/recommend/recommend').then((module) => {
    resolve(module)
  })
}
const Singer = (resolve) => {
  import ('components/singer/singer').then((module) => {
    resolve(module)
  })
}
const foodDetail = (resolve) => {
  import ('components/singer/fooddetail').then((module) => {
    resolve(module)
  })
}
const foodDetail1 = (resolve) => {
  import ('components/singer/fooddetail1').then((module) => {
    resolve(module)
  })
}
const foodDetail2 = (resolve) => {
  import ('components/singer/fooddetail2').then((module) => {
    resolve(module)
  })
}
const Rank = (resolve) => {
  import ('components/rank/rank').then((module) => {
    resolve(module)
  })
}
const Search = (resolve) => {
  import ('components/search/search').then((module) => {
    resolve(module)
  })
}

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/', //默认目录
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: Recommend
    },
    {
      path: '/rank',
      name: 'rank',
      component: Rank,
      meta: {title: "趣味问答列表"}
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/singer',
      name: 'singer',
      component: Singer,
      children: [{
          path: 'foodDetail/:postid', //食品详情页
          name:'foodDetail',
          component: foodDetail,
      },{
          path: 'foodDetail1', //食品详情页
          name:'foodDetail1',
          component: foodDetail1,
      },{
          path: 'foodDetail2', //食品详情页
          name:'foodDetail2',
          component: foodDetail2,
      }]
    }
  ]
})
