module.exports = {
  devServer: {
    proxy: 'https://www:Bureau@fortross.vc/',
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/assets/styles/additional.scss";`
      }
    }
  },
  transpileDependencies: ['vue-clamp', 'resize-detector'],
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

