module.exports = {
    lintOnSave: false,

    configureWebpack: {
        devServer: {
            proxy: {
                '/Api': {
                    target: 'http://localhost:3000',
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