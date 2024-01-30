const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: process.env.DATABASE_URL + ":" + process.env.PORT,
        // target: "https://localhost:" + process.env.PORT,
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