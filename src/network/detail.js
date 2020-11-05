import {request} from "@/network/request";

export function getDetailData(iid) {
    return request({
        url: '/detail',
        params: {
            iid
        }
    })
}

export function getDetailRecommend() {
    return request({
        url: '/recommend'
    })
}

//详情页商品数据部分非常杂乱无章，不同的数据分布在不同的地方
//这里将数据进行汇总
//所以在这里将这些数据封装在同一个类中，detail组件面向new的同一个对象就行
export class GoodsInfo {
    constructor(itemInfo, columns, services) {
        this.title = itemInfo.title
        this.desc = itemInfo.desc
        this.newPrice = itemInfo.price
        this.oldPrice = itemInfo.oldPrice
        this.discount = itemInfo.discountDesc
        this.columns = columns
        this.services = services
        this.realPrice = itemInfo.lowNowPrice
    }
}

//在detail里只需要把相应的数据传进去之后我们就可以通过g.titile, g.desc获取啦
// const g = new GoodsInfo('','','')
// //构造函数，如果想传参数的话需要在内部定义一个构造器
// class Person{
//     constructor(name,age) {
//         this.name = name;
//         this.age = age
//     }
// }
// //这样p 里就有一个name属性，一个age属性
// const p = new Person('Bob','18');

export class Shop {
    constructor(shopInfo) {
        this.logo = shopInfo.shopLogo;
        this.name = shopInfo.name;
        this.fans = shopInfo.cFans;
        this.sell = shopInfo.cSells;
        this.goodsCount = shopInfo.cGoods;
        this.score = shopInfo.score;
    }
}

export class GoodsParam {
    constructor(info, rule) {
        // 注: images可能没有值(某些商品有值, 某些没有值)
        this.image = info.images ? info.images[0] : '';
        this.infos = info.set;
        this.sizes = rule.tables ? rule.tables : '';
    }
}
