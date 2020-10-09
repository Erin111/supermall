module.exports = {
    configureWebpack:{
        resolve:{
            alias: {
                //内部已经配置过了
                // '@':'src'
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'views': 'src/views'
            }
        }
    }
}