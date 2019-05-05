import * as fs from 'fs'
import NuxtConfiguration from '@nuxt/config'

// 動的なroutesを返す
function getRoutes() {
  return fs
    .readdirSync("./markdown")
    .filter(i => i.match(/.md$/))
    .map(f => f.replace(/.md$/, ""))
    .map(f => `/${f}/`);
}

const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
  router: {
    base: '/blog/'
  }
} : {}

const config: NuxtConfiguration = {
  mode: 'universal',

  ...routerBase,

  /*
   ** Headers of the page
   */
  head: {
    title: 'OtsuLog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'フロントエンド(Vue, React, ReactNative, Electron..)、バックエンド(Ruby, GraphQL..)、書籍(スタートアップ, 経営者..)から学んだことをアウトプットする場所'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#3B8070' },

  /*
   ** Global CSS
   */
  css: [
    "normalize.css",
    '~/assets/css/main.scss',
    "~/node_modules/highlight.js/styles/vs2015.css"
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["~/plugins/init.js"],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    "@nuxtjs/markdownit",
    [
      "@nuxtjs/google-analytics",
      {
        id: "UA-7365476-10"
      }
    ],
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module!.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }

      config.node = {
        fs: "empty"
      };
    }
  },

  generate: {
    routes: getRoutes()
  },

  markdownit: {
    preset: "default",
    linkify: true,
    breaks: true,
    // injected: true,
    use: [
      "markdown-it-container",
      "markdown-it-attrs",
      "markdown-it-meta",
      "markdown-it-highlightjs"
    ]
  },

  sitemap: {
    path: "/sitemap.xml",
    hostname: "https://naokiotsu.github.io/blog",
    cacheTime: 1000 * 60 * 15,
    gzip: true,
    generate: true, // Enable me when using nuxt generate
    exclude: [],
    routes: getRoutes()
  },
}

export default config
