module.exports = {
  css: {
    // Enable CSS source maps.
    sourceMap: process.env.NODE_ENV !== 'production'
  },

  pluginOptions: {
    i18n: {
      locale: 'jp',
      fallbackLocale: 'cn',
      localeDir: 'locales',
      enableInSFC: true,
      includeLocales: false,
      enableBridge: false
    }
  }
};
