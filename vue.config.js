var path = require("path");
var webpack = require("webpack");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  // publicPath: "./",
  devServer: {
    host: "0.0.0.0",
    port: 8899,

    // cnode代理
    // proxy: {
    //   "/apis": {
    //     target: "https://cnodejs.org",
    //     changeOrigin: true,
    //     pathRewrite: {
    //       "^/apis": ""
    //     }
    //   },
    // },

    // 贝思客代理
    // proxy: {
    //   "/apis": {
    //     target: "http://m.bestcake.com",
    //     changeOrigin: true,
    //     pathRewrite: {
    //       "^/apis": ""
    //     }
    //   }
    // }

    // 后端代理
    proxy: {
      "/api": {
        target: process.env.API_HOST,
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      },
    },

  },
  chainWebpack: config => {
    config.resolve.alias.set("@", resolve("src"));
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
      })
    ],
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
        @import "~@/assets/css/index.scss";	
       `
      }
    }
  }
};