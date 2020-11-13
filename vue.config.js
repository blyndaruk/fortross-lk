module.exports = {
  devServer: {
    proxy: 'https://www:Bureau@fortross.dev.vr.buroburo.tech/',
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/assets/styles/variables/_index.scss";`
      }
    }
  }
//   publicPath: process.env.NODE_ENV === 'production'
//               ? '/fortross/'
//               : '/'
};

