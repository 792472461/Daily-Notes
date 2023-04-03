import fs from "fs";
import path from "path";
import { defineConfigWithTheme } from "vitepress";
import type { Config as ThemeConfig } from "@vue/theme";
import { headerPlugin } from "./headerMdPlugin";
import baseConfig from '@vue/theme/config'


const nav: ThemeConfig["nav"] = [
  {
    text: "前端面试",
    link: `/interview/html`
  },
  {
    text: "TypeScript",
    link: "/typescript/basic"
  },
  {
    text: "源码解析",
    items: [
      {
        text: "Vue2.x源码解析",
        link: "/vue2/"
      },
      {
        text: "Vue3.x源码解析",
        link: "/vue3/"
      },
      {
        text: "React源码解析",
        link: "/react/"
      }
    ]
  },
  {
    text: "算法",
    items: [
      {
        text: "数据结构",
        link: "/data-structure/stack"
      },
      {
        text: "算法",
        link: "/algorithm/sort"
      }
    ]
  },
  {
    text: "工程化",
    items: [
      {
        text: "Webpack",
        link: "/webpack/"
      },
      {
        text: "Vite",
        link: "/vite/"
      },
      {
        text: "Git",
        link: "/git/"
      },
      {
        text: "微前端",
        link: "/micro-frontend/"
      }
    ]
  }
];

export const sidebar: ThemeConfig["sidebar"] = {
  "/interview/": [
    {
      text: "基础篇",
      items: [
        {
          text: "HTML",
          link: "/interview/html"
        },
        {
          text: "CSS",
          link: "/interview/css"
        },
        {
          text: "JavaScript",
          link: "/interview/javascript"
        }
      ]
    },
    {
      text: "进阶篇",
      items: [
        {
          text: "Vue",
          link: "/interview/vue"
        },
        {
          text: "React",
          link: "/interview/react"
        }
      ]
    },
    {
      text: "其他",
      items: [
        {
          text: "网络",
          link: "/interview/network"
        },
        {
          text: "浏览器",
          link: "/interview/browser"
        },
        {
          text: "工程化",
          link: "/interview/engineering"
        },
        {
          text: "手写题",
          link: "/interview/handwritten"
        },
        {
          text: "常见算法",
          link: "/interview/algorithm"
        }
      ]
    }
  ],
  "typescript/": [
    {
      text: "基础篇",
      items: [
        {
          text: "开发环境搭建",
          link: "/typescript/basic"
        },
        {
          text: "基础类型",
          link: "/typescript/basic-type"
        },
        {
          text: "类型断言",
          link: "/typescript/type-assertion"
        },
        {
          text: "接口",
          link: "/typescript/interface"
        },
        {
          text: "类",
          link: "/typescript/class"
        },
        {
          text: "函数",
          link: "/typescript/function"
        },
        {
          text: "泛型",
          link: "/typescript/generic"
        },
        {
          text: "高级类型",
          link: "/typescript/advanced-type"
        }
      ]
    },
    {
      text: "进阶篇",
      items: [
        {
          text: "泛型和交叉类型",
          link: "/typescript/generic-cross-type"
        },
        {
          text: "infer的使用",
          link: "/typescript/infer"
        },
        {
          text: "类型推断",
          link: "/typescript/type-inference"
        }
      ]
    },
    {
      text: "实战篇",
      items: [
        {
          text: "类型题",
          link: "/typescript/type-question"
        }
      ]
    }
  ],
  "data-structure/": [
    {
      text: "基础数据机构",
      items: [
        {
          text: "栈",
          link: "/data-structure/stack"
        },
        {
          text: "队列",
          link: "/data-structure/queue"
        },
        {
          text: "链表",
          link: "/data-structure/linked-list"
        },
        {
          text: "树",
          link: "/data-structure/tree"
        },
        {
          text: "堆",
          link: "/data-structure/heap"
        }
      ]
    }
  ],
  "algorithm/": [
    {
      text: "基础算法",
      items: [
        {
          text: "排序",
          link: "/algorithm/sort"
        },
        {
          text: "查找",
          link: "/algorithm/search"
        },
        {
          text: "递归",
          link: "/algorithm/recursion"
        }

      ]
    },
    {
      text: "进阶算法",
      items: [
        {
          text: "动态规划",
          link: "/algorithm/dynamic-programming"
        },
        {
          text: "贪心算法",
          link: "/algorithm/greedy"
        },
        {
          text: "分治算法",
          link: "/algorithm/divide-and-conquer"
        },
        {
          text: "回溯算法",
          link: "/algorithm/backtracking"

        }

      ]
    },
    {
      text: "leetcode",
      items: [
        {
          text: "数组",
          link: "/algorithm/leetcode/array"
        },
        {
          text: "字符串",
          link: "/algorithm/leetcode/string"
        },
        {
          text: "链表",
          link: "/algorithm/leetcode/linked-list"
        },
        {
          text: "树",
          link: "/algorithm/leetcode/tree"
        },
        {
          text: "栈",
          link: "/algorithm/leetcode/stack"
        },
        {
          text: "队列",
          link: "/algorithm/leetcode/queue"
        },
        {
          text: "哈希表",
          link: "/algorithm/leetcode/hash-table"
        },
        {
          text: "双指针",
          link: "/algorithm/leetcode/two-pointers"
        },

      ]
    }
  ]
};

export default defineConfigWithTheme<ThemeConfig>({
  extends: baseConfig,
  lang: "zh-CN",
  title: "前端",
  description: "生活不止眼前的苟且，还有诗和远方的田野",
  srcDir: "src",
  outDir: path.resolve(__dirname, "../../../dist"),
  scrollOffset: "header",
  head: [
    ["meta", { name: "theme-color", content: "#3c8772" }],
    ["link", { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" }],
    ["link", { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" }],
    ["link", { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" }],
    ["link", { rel: "manifest", href: "/site.webmanifest" }],
    [
      "script",
      {},
      fs.readFileSync(
        path.resolve(__dirname, "./inlined-scripts/restorePreference.js"),
        "utf-8"
      )
    ]
  ],
  lastUpdated: true,
  themeConfig: {
    nav,
    sidebar,
    socialLinks: [
      { icon: "github", link: "https://github.com/792472461/" }
    ],
    footer: {
      copyright: `Copyright © 2021-${new Date().getFullYear()} SongFengshuai`
    },
    i18n: {
      search: '搜索',
      menu: '菜单',
      toc: '目录',
      returnToTop: '返回顶部',
      appearance: '主题',
      previous: '上一篇',
      next: '下一篇',
      pageNotFound: '404',
    }
  },

  markdown: {
    config(md) {
      md.use(headerPlugin);
    }
  },
  vite: {
    define: {
      __VUE_OPTIONS_API__: false
    },
    optimizeDeps: {
      exclude: ["@vue/repl"]
    },
    ssr: {
      external: ["@vue/repl"]
    },
    server: {
      host: true,
      fs: {
        // for when developing with locally linked theme
        allow: ["../.."]
      }
    },
    build: {
      minify: "terser",
      chunkSizeWarningLimit: Infinity
    },
    json: {
      stringify: true
    }
  },

  // vue: {
  //   reactivityTransform: true
  // }

});
