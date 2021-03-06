module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = '抽獎'
        return args
      })
  },
  publicPath: './',
  pwa: {
    // APP 名稱
    name: '抽獎',
    short_name: '抽獎',
    // APP 主題顏色
    theme_color: '#cedeed',
    // APP 啟動畫面背景色
    background_color: '#e2f0fd',
    // APP 顯示範圍
    scope: './',
    // APP 開始畫面網址
    start_url: './',
    // 顯示模式
    display: 'fullscreen',
    icons: [
      {
        src: './img/icons/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: './img/icons/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      },
      {
        src: './img/icons/android-chrome-maskable-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: './img/icons/android-chrome-maskable-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: './img/icons/apple-touch-icon-60x60.png',
        sizes: '60x60',
        type: 'image/png'
      },
      {
        src: './img/icons/apple-touch-icon-76x76.png',
        sizes: '76x76',
        type: 'image/png'
      },
      {
        src: './img/icons/apple-touch-icon-120x120.png',
        sizes: '120x120',
        type: 'image/png'
      },
      {
        src: './img/icons/apple-touch-icon-152x152.png',
        sizes: '152x152',
        type: 'image/png'
      },
      {
        src: './img/icons/apple-touch-icon-180x180.png',
        sizes: '180x180',
        type: 'image/png'
      },
      {
        src: './img/icons/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png'
      },
      {
        src: './img/icons/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png'
      },
      {
        src: './img/icons/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png'
      },
      {
        src: './img/icons/msapplication-icon-144x144.png',
        sizes: '144x144',
        type: 'image/png'
      },
      {
        src: './img/icons/mstile-150x150.png',
        sizes: '150x150',
        type: 'image/png'
      }
    ]
  },
  transpileDependencies: [
    'vuetify'
  ]
}
