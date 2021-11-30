const fs = require('fs')
const path = require('path')

const selfDestroyingSWVitePlugin = {
  name: 'generate-self-destroying-service-worker',
  buildStart() {
    this.emitFile({
      type: 'asset',
      fileName: 'service-worker.js',
      source: fs.readFileSync(path.join(__dirname, './self-destroying-service-worker.js'), 'utf-8')
    })
  }
}

module.exports = {
  vite: {
    // to destroy the service worker used by the previous vuepress build
    plugins: [selfDestroyingSWVitePlugin]
  },

  locales: {
    '/': {
      lang: 'zh-CN',
      title: '一个不正经的博客',
      description: 'By Songfengshuai'
    },
  },

  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    [
      'meta',
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }
    ],
    [
      'link',
      { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` }
    ],
    [
      'link',
      {
        rel: 'mask-icon',
        href: '/icons/safari-pinned-tab.svg',
        color: '#3eaf7c'
      }
    ],
    [
      'meta',
      {
        name: 'msapplication-TileImage',
        content: '/icons/msapplication-icon-144x144.png'
      }
    ],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  ],

  themeConfig: {
    docsDir: 'docs',
    docsBranch: 'master',
    editLinks: true,

    locales: {
      '/': {
        label: '简体中文',
        selectText: '选择语言',
        lastUpdated: '上次编辑时间',
        editLinkText: '在 GitHub 上编辑此页',
        nav: [
          {
            text: '面试汇总',
            link: '/interview/',
          },
          {
            text: '数据结构与算法',
            items: [
              {
                text: '数据结构',
                link: '/data-structure/'
              },
              {
                text: 'leetcode',
                link: '/leetcode/'
              }
            ]
          },
          {
            text: '前端工程化',
            items: [
              { text: '脚手架', link: '/project/cli' },
              { text: 'GUI', link: '/project/gui' },
              { text: '性能监控平台', link: '/project' },
              { text: '自动化发布', link: '/project/publish' },
              { text: '自动化测试', link: '/project/test' }
            ]
          },
          {
            text: 'Typescript',
            items: [
              { text: 'Typescript基础', link: '/typescript/basics/index' },
              { text: 'Typescript进阶', link: '/typescript/senior/index' }
            ]
          },
          {
            text: 'Vue源码解析',
            link: '/vue-analysis/'
          },
          {
            text: 'React源码解析',
            link: '/react-analysis/'
          }
        ],
        sidebar: {
          '/data-structure/': [
            {
              text: '栈',
              link: '/data-structure/stack/index',
            },
            {
              text: '队列',
              link: '/data-structure/queue/index',
            },
            {
              text: '链表',
              link: '/data-structure/linked-list/index',
            },
            {
              text: '树',
              link: '/tree',
              children: [
                {
                  text: '二分搜索树',
                  link: '/data-structure/tree/bst'
                },
                {
                  text: '线段树'
                },
                {
                  text: 'AVL树',
                },
                {
                  text: '红黑树',
                }
              ]
            },
            {
              text: '堆',
              link: '/data-structure/heap/index',
            },
            {
              text: '哈希表',
              link: '/data-structure/hash-map/index',
            },
          ],

        }
      },

    }
  },
}
