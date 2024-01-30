const { defineConfig } = require('@vue/cli-service')
const port = process.env.PORT || 443;
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        //target: process.env.PORT ? `${process.env.DATABASE_URL}:${process.env.PORT}` : 'https://localhost:3000',
        target: "https://localhost:" + port,
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