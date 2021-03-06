module.exports = {// 基本路径
    publicPath: process.env.NODE_ENV === 'production'
    ? 'https://static.xxpw.net'
    : '/',
    css: {
        loaderOptions: {
            css: {
                // 这里的选项会传递给 css-loader
                importLoaders: 1,
            },
            less: {
                // 这里的选项会传递给 postcss-loader
                importLoaders: 1,
            },
         
        }
    },

    productionSourceMap: false,
    configureWebpack: config => {
        config.entry.app = ["babel-polyfill", "./src/main.js"];
    }
};