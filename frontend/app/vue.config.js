module.exports = {
    lintOnSave: false,

    configureWebpack: {
        devServer: {
            proxy: {
                '/Api': {
                    target: 'http://localhost:8080/api/v2',
                    ws: true,
                    changeOrigin: true,
                    pathRewrite: {
                        '^/Api': ''
                    }
                }
            }
        }
    }
};