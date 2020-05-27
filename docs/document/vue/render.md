
## 初始化一个vue基础模板

1.安装vue-cli脚手架工具
npm i -g vue-cli

2.vue init webpack project-name (vue init是vue-cli的命令，webpack是项目使用的模板模型，project-name是项目名称) 

3.按enter然后根据需要选择构建项目


-这个时候 只需要进入文件夹 安装依赖就可以了,这下页面有了,我们需要将路由统一进行管理

## 创建路由模块

1.在项目src目录下建一个router文件夹,router文件夹里面创建一个叫index.js的文件,然后接下来配置路由(一般情况下我们都根据功能来将路由分成几个模块)
``` javascript
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const routes=[
    {
    name: 'login',
    path: '/login',
    component: () => import('./views/login/index'),
   },
    {
    path: '/',
    component: () => import('模块路径'),
    children: [
      '子模块1','子模块2',....
    ]

   },
  '模块1',
  '模块2',
  '模块3',
  .....
]

const router = new Router({
  routes: routes
})

//路由守卫,根据这个控制权限
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
        if (store.state.token) {  // 通过vuex state获取当前的token是否存在
            next();
        }
        else {
            next({
                path: '/login',
                query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    }
    else {
        next();
    }
})

export default router
```
2.在main.js里面日引入
``` javascript
import router from './router'
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
```
>这样一个路由管理模块就写好了,做前后端交互是项目中必不可少的,接下来以axios为例,创建一个api管理

## 创建request

1.在src下建一个api文件夹,api下创建一个request.js,代码如下

``` typescript
import axios from 'axios'
axios.defaults.baseURL = environment.baseURL // api 的 base_url
axios.defaults.timeout = 30000 // 请求超时时间
// request拦截器
axios.interceptors.request.use(
  config => {
    config.headers['ACCESS_TOKEN'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    return config
  },
  error => {
    Promise.reject(error)
    //请求创建失败
  }
)

// response 拦截器
axios.interceptors.response.use(
  response => {
    //请求成功
  },
  error => {
    //请求错误
    return Promise.reject(error)
  }
)

export default axios

```

2.创建api模块(用于管理接口),通常情况下根据功能或者页面来进行模块分类,比如:我创建一个user模块,代码如下

``` typescript

import request from '@/utils/request'

export function area(data) {
  return request({
    url: 'url',
    method: 'get/post',
    // data post方法传参
    // params:data  //get传参

  })
}


```
3.然后在需要使用request的页面import 对应的模块就可以进行前后端交互了~~~


这样一个基础的vue项目就完成了!!!!



















