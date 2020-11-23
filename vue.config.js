module.exports = {
  // devServer: {
  //   proxy: 'https://www:Bureau@fortross.dev.vr.buroburo.tech/',
  // },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/assets/styles/variables/_index.scss";`
      }
    }
  },
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  },
  publicPath: process.env.NODE_ENV === 'production'
              ? '/local/templates/fortross_lk/assets/'
              : '/'
};

