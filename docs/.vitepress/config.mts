import { defineConfig } from 'vitepress'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  ignoreDeadLinks: true,
  base: '/DocumentSite/',
  title: "清白之月",
  description: "你是否得到了期待的人生",
  head: [
    ['link', { rel: 'icon', href: './site.ico' }]
  ],
  themeConfig: {
    logo: '/hero-logo.svg',
    siteTitle: '清白之月',
    outline: [1, 6],
    search: {
      provider: 'local'
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: '前端', items: [
          {
            text: 'VUE 2.x',
            link: '/frontend/Vue2/index.md'
          },
          {
            text: 'VUE 3.x',
            link: '/frontend/Vue3/index.md'
          },
          {
            text: 'Typescript',
            link: '/frontend/Typescript/index.md'
          },
        ]
      },
      {
        text: '服务端', items: [
          {
            text: 'Nodejs',
            link: 'serverend/Nodejs/index.md',
          },
          {
            text: 'Mongodb',
            link: '/serverend/Mongodb/index.md'
          },
          {
            text: 'Mysql',
            link: '/serverend/Mysql/index.md'
          },
          {
            text: 'Docker',
            link: '/serverend/Docker/index.md'
          },
          {
            text: '云服务',
            link: '/serverend/cloud-services/README.md',
          },
        ]
      },
      {
        text: '工具类', items: [{
          text: 'Git',
          link: '/tools/Git/index.md'
        }]
      },
      { text: '前沿技术', link: '/' },
      { text: '随笔', link: '/' }
    ],

    sidebar: [
      {
        text: '前端',
        collapsed: false,
        items: [
          { text: 'README', link: '/frontend/README.md' },
          { text: 'Vue 2.x', link: '/frontend/Vue2/index.md' },
          { text: 'Vue 3.x', link: '/frontend/Vue3/index.md' },
          { text: 'Typescript', link: '/frontend/Typescript/index.md' },


        ]
      },
      {
        text: '服务端',
        collapsed: false,
        items: [
          { text: 'README', link: '/serverend/README.md' },
          { text: 'Nodejs', link: '/serverend/Nodejs/index.md' },
          {
            text: 'Mysql', items: [{
              text: 'Mysql', link: '/serverend/Mysql/index.md'
            }, {
              text: 'Mysql查询', link: '/serverend/Mysql/mysql.md'
            }]
          },
          { text: 'Mongodb', link: '/serverend/Mongodb/index.md' },
          { text: 'Docker', link: '/serverend/Docker/index.md' },
          { text: '云服务', link: '/serverend/cloud-services/README.md' },
        ]
      },
      {
        text: '工具类',
        collapsed: false,
        items: [{
          text: 'Git',items:[{
            text:'Git',
            link: '/tools/Git/index.md',
          },
        {
          text:'Git/Vim常用命令',
          link: '/tools/Git/git-vim.md',
        }]
          
        }]
      },
      {
        text: '前沿技术',
        collapsed: false,
        items: []
      },
      {
        text: '随笔',
        collapsed: false,
        items: []
      },
    ]
    ,

    footer: {
      message: 'As they floated in the breeze',
      copyright: 'Copyright © 2024-cheungchen'
    },
    socialLinks: [
      {
        icon: {
          svg: '<svg t="1713408687091" class="icon" viewBox="0 0 1316 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7801" width="64" height="64"><path d="M643.181714 247.698286l154.916572-123.172572L643.181714 0.256 643.072 0l-154.660571 124.269714 154.660571 123.245715 0.109714 0.182857z m0 388.461714h0.109715l399.579428-315.245714-108.361143-87.04-291.218285 229.888h-0.146286l-0.109714 0.146285L351.817143 234.093714l-108.251429 87.04 399.433143 315.136 0.146286-0.146285z m-0.146285 215.552l0.146285-0.146286 534.893715-422.034285 108.397714 87.04-243.309714 192L643.145143 1024 10.422857 525.056 0 516.754286l108.251429-86.893715L643.035429 851.748571z" fill="#1E80FF" p-id="7802"></path></svg>'
        },
        link: 'https://juejin.cn'
      }
    ]
  },
  appearance: true,
  cleanUrls: true,
})

