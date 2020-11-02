module.exports = {
    plugins:{
        autoprefixer:{},
        'postcss-px-to-viewport':{
            //将px根据视口做转化
            viewportWidth: 375,//视窗的宽度，对应设计稿中的宽度
            //retina高清屏 1个点两个像素u，给一个750的稿，实际是375
            viewportHeight: 667,//视窗的高度，对应设计稿中的高度
            unitPrecision: 5,//指定px转换为视窗单位值的小数位数（很多时候无法整除）
            viewportUnit: 'vw',//指定需要转换成的视窗单位
            selectorBlackList: ['ignore','tabbar','tabbaritem'],//指定不需要转换的类
            minPixelValue:1,//小于或等于1px不转化为视窗单位
            mediaQuery: false,//允许在媒体查询庄转换’px'
            exclude:[/TabBar/]
        }
    }
}