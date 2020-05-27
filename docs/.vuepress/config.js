/*
 * @Author: your name
 * @Date: 2020-03-06 13:51:13
 * @LastEditTime: 2020-05-22 10:35:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-press-start\docs\.vuepress\config.js
 */ 
const getChildContent = require('../../scripts//build.js')

module.exports = {
  title: '皮皮猫才知道的事情~~',
  description: 'Just playing around',
  themeConfig: {
    nav: [{
        text: '首页',
        link: '/'
      },
      {
        text: '分享文档',
        link: '/document/'
      },
    ],
    sidebar: {
      '/document/': [
        '',
        {
          title: 'Javascript基础',
          collapsable: false,
          children: [
            ['/document/basics/types', '数据类型'],
            ['/document/basics/this', 'this'],
            ['/document/basics/async', 'async和await'],
            ['/document/basics/event', '事件冒泡'],
            ['/document/basics/extends', '继承'],
            ['/document/basics/prototype', '原型'],
            ['/document/basics/closure', '闭包'],
            ['/document/basics/new', 'new关键字']
          ]
        },
        {
          title: 'CSS',
          collapsable: false,
          children: [
            ['/document/css/optimization', 'css性能优化'],
            ['/document/css/css3', 'css3新特性']
          ]
        },
        {
          title: 'docker',
          collapsable: false,
          children: [
            ['/document/docker/mysql', 'mysql']
          ]
        },
        {
          title: 'React',
          collapsable: false,
          children: [
            ['/document/react/setstate', 'setState'],
            ['/document/react/render', 'render和生命周期'],
            ['/document/react/optimization', '性能优化'],
            ['/document/react/tips', 'react注意事项'],
            ['/document/react/hooks', 'Hooks']
          ]
        },
        {
          title: 'HTML',
          collapsable: false,
          children: [
            ['/document/vue/render', '创建一个vue基础项目']
          ]
        },
        {
          title: 'Vue',
          collapsable: false,
          children: [
            ['/document/html/html5', 'HTML5']

          ]
        },
        {
          title: 'Service',
          collapsable: false,
          children: [
            ['/document/service/linux', 'linux'],
            ['/document/service/nginx', 'nginx'],
            ['/document/service/jenkins', 'jenkins'],
          ]
        },
      ]
    }
  }
}