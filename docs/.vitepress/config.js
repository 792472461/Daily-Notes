const selfDestroyingSWVitePlugin = {
  name: 'generate-self-destroying-service-worker',
  buildStart () {
    // this.emitFile({
    //   type: 'asset',
    //   fileName: 'service-worker.js',
    //   source: fs.readFileSync(path.join(__dirname, './self-destroying-service-worker.js'), 'utf-8')
    // })
  },
}

module.exports = {
  vite: {
    // to destroy the service worker used by the previous vuepress build
    plugins: [selfDestroyingSWVitePlugin],
  },

  locales: {
    '/': {
      lang: 'zh-CN',
      title: '一个不正经的博客',
      description: 'By Songfengshuai',

    },
  },

  head: [
    [
      'link', {
      rel: 'icon',
      href: '/favicon.png',
    }],
    [
      'meta', {
      name: 'theme-color',
      content: '#3eaf7c',
    }],
    [
      'meta', {
      name: 'apple-mobile-web-app-capable',
      content: 'yes',
    }],
    [
      'meta',
      {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'black',
      },
    ],
    [
      'link',
      {
        rel: 'apple-touch-icon',
        href: `/icons/apple-touch-icon-152x152.png`,
      },
    ],
    [
      'link',
      {
        rel: 'mask-icon',
        href: '/icons/safari-pinned-tab.svg',
        color: '#3eaf7c',
      },
    ],
    [
      'meta',
      {
        name: 'msapplication-TileImage',
        content: '/icons/msapplication-icon-144x144.png',
      },
    ],
    [
      'meta', {
      name: 'msapplication-TileColor',
      content: '#000000',
    }],
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
            text: '前端面试汇总',
            link: '/interview/',
          },
          {
            text: '数据结构与算法',
            link: '/algorithm/',
          },
          {
            text: '前端工程化',
            items: [
              {
                text: '脚手架',
                link: '/project/cli/',
              },
              // {
              //   text: 'GUI',
              //   link: '/project/gui/',
              // },
              // {
              //   text: '自动化发布',
              //   link: '/project/publish/',
              // },
              // {
              //   text: '自动化测试',
              //   link: '/project/test/',
              // },
            ],
          },
          // {
          //   text: 'Typescript',
          //   items: [
          //     {
          //       text: 'Typescript基础',
          //       link: '/typescript/basics/index',
          //     },
          //     {
          //       text: 'Typescript进阶',
          //       link: '/typescript/senior/index',
          //     },
          //   ],
          // },
          {
            text: 'Vue源码解析',
            link: '/vue-analysis/',
          },
          // {
          //   text: 'React源码解析',
          //   link: '/react-analysis/',
          // },
          {
            text: 'Github',
            link: 'https://github.com/792472461'
          }
        ],
        sidebar: {
          '/algorithm/': [
            {
              text: '数据结构',
              collapsable: false,
              children: [
                {
                  text: '栈',
                  link: '/algorithm/data-structure/Stack',
                },
                {
                  text: '队列',
                  link: '/algorithm/data-structure/Queue',
                },
                {
                  text: '链表',
                  link: '/algorithm/data-structure/LinkedList',
                },
                {
                  text: '树',
                  link: '/algorithm/data-structure/Tree',
                },
                {
                  text: '堆',
                  link: '/algorithm/data-structure/Heap',
                },
                {
                  text: '哈希表',
                  link: '/algorithm/data-structure/HashMap',
                },
              ]
            },
            {
              text: '刷题',
              collapsable: false,
              children: [
                {
                  text: '栈',
                  link: '/algorithm/topic/Stack',
                },
                {
                  text: '字符串',
                  link: '/algorithm/topic/String',
                },
                {
                  text: '数组',
                  link: '/algorithm/topic/Array',
                },
                {
                  text: '队列',
                  link: '/algorithm/topic/Queue',
                },
                {
                  text: '链表',
                  link: '/algorithm/topic/LinkedList',
                },
                {
                  text: '排序算法',
                  link: '/algorithm/topic/Sort',
                },
                {
                  text: '树',
                  link: '/algorithm/topic/Tree',
                },
                {
                  text: '深度优先遍历',
                  link: '/algorithm/topic/DFS',
                },
                {
                  text: '贪心算法',
                  link: '/algorithm/topic/GreedyAlgorithm',
                },
                {
                  text: '动态规划',
                  link: '/algorithm/topic/DP'
                }
              ],
            },

          ],

        },
      },

    },

  },
}
