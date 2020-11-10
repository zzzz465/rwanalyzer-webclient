module.exports = {
  lintOnSave: false,
  devServer: {
    port: 3000
  },
  configureWebpack: {
    devtool: 'source-map'
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/rwanalyzer-webclient/' : '/',
  outputDir: 'docs'
}
