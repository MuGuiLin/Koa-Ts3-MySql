module.exports = {
    lintOnSave: false,

    configureWebpack: {
        devServer: {
            proxy: {
                '/Api': {
                    target: 'http://localhost:8080',
                    ws: true,
                    changeOrigin: true,
                    pathRewrite: {
                        '^/Api': '/api/v2'
                    }
                }
            }
        }
    }
};