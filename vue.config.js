const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        //target: "http://127.0.0.1:3000",
        target: "http://localhost:3000",
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
    }
  }
})

// const { defineConfig } = require('@vue/cli-service')
// const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
// module.exports = defineConfig({
//   transpileDependencies: true,
//   configureWebpack: {
//     plugins: [
//       new NodePolyfillPlugin()
//     ]
//   }
//
// })

// const { defineConfig } = require("@vue/cli-service");
// const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
// module.exports = defineConfig({
//   transpileDependencies: true,
//   configureWebpack: {
//     plugins: [new NodePolyfillPlugin()],
//     optimization: {
//       splitChunks: {
//         chunks: "all",
//       },
//     },
//   },
// });