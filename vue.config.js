module.exports = {
  // pages: {
  //   index: {
  //     entry: 'src/components/index.js',
  //     // template: 'public/index.html',
  //     // filename: 'index.html',
  //   },
  // },
  css: {
    extract: false,
  },
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
    },
    output: {
      libraryExport: 'default',
    },
  },
  outputDir: 'lib',
  productionSourceMap: false,
  devServer: {
    port: 8091,
    hot: true,
    open: 'Google Chrome',
  },
  // Display 组件使用的配置
  runtimeCompiler: true,
};
