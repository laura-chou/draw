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
  transpileDependencies: [
    'vuetify'
  ]
}
