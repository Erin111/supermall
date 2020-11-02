//将很多地方都可能用到的工具类函数可以封装到这
//防抖函数，当一个函数被频繁调用多次的时候，可以将这个函数传入，生成一个新的函数
//从而减少函数调用次数
export function debounce(func,delay){
    //第一次进入时 timer是空的
    //这个函数返回了一个函数就是
    let timer = null;
    return function (...args){
        // 如果不是第一次调用，也就是第一张图片传过来之后，第二张图片在设定时间内又传过来了
        //那就清除第一个定时器，重启定时器
        if(timer) clearTimeout(timer)
        timer = setTimeout(()=>{
            // 调用传入的函数，在这里是this.$refs.scroll.refresh，如果想传参数也可
            func.apply(this,args)
        },delay)
    }
}
//服务器会以Unix时间元年为气垫，返回对应的时间戳
//1535694719（时间戳）
export function formatDate(date, fmt) {
    //1.获取年份
    if (/(y+)/.test(fmt)) {
        //一个数字+空字符串就变成了字符串
        //substring截取两位比如2019 19
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
}
//该函数防止出现4:4:4这种情况
//如果不到两位补齐两位
//比如传进来4
//变成004，再截取一位变成04
//传进来04，变成0004，再截取两位变成04
function padLeftZero (str) {
    return ('00' + str).substr(str.length);
}