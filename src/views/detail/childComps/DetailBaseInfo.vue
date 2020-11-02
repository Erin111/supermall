<template>
<!--    对于一个对象，检查它是不是一个空的对象可以用Object.keys(goodsInfo).length===0判断，即判断里面是否有key-->
<!--    这里就是有数据的时候再渲染-->
    <div class="detailBaseInfo" v-if="Object.keys(goodsInfo).length!==0">
        <div class="goodsTitle">
            {{ goodsInfo.title }}
        </div>
        <div class="goodsPrice">
            <span class="n-price"> {{ goodsInfo.newPrice }}</span>
            <span class="o-price">{{ goodsInfo.oldPrice }}</span>
            <span v-if="goodsInfo.discount" class="goodsDiscount">{{ goodsInfo.discount }}</span>
        </div>
        <div class="goodsInfo">
            <span>{{goodsInfo.columns[0]}}</span>
            <span>{{goodsInfo.columns[1]}}</span>
            <span>{{goodsInfo.services[goodsInfo.services.length-1].name}}</span>
        </div>
        <div class="otherInfo">
<!--            除了遍历数组还可以遍历数字 v-for =“index in 10” {{index}}显示的就是1-10-->
             <span class="info-service-item" v-for="index in goodsInfo.services.length-1" :key="index">
        <img :src="goodsInfo.services[index-1].icon" alt="">
        <span>{{goodsInfo.services[index-1].name}}</span>
      </span>
        </div>

    </div>
</template>

<script>
export default {
    name: "DetailBaseInfo",
    props: {
        goodsInfo: {
            type: Object,
            default() {
                return null
            }
        }
    }
}
</script>

<style scoped>
.detailBaseInfo{
    margin-top: 15px;
    padding: 0 8px;
    color: #999;
    border-bottom: 5px solid #f2f5f8;
}
.goodsTitle{
    color: #222
}
.goodsPrice {
    margin-top: 10px;

}
.goodsPrice .n-price{
    font-size: 24px;
    color: var(--color-high-text);
}
.goodsPrice .o-price{
    font-size: 13px;
    margin-left: 5px;
    text-decoration: line-through;
}
.goodsPrice .goodsDiscount{
    font-size: 12px;
    padding: 2px 5px;
    color: #fff;
    background-color: var(--color-high-text);
    border-radius: 8px;
    margin-left: 5px;
    /*让元素上浮一些: 使用相对定位即可*/
    position: relative;
    top: -8px;
}
.goodsInfo{
    margin-top: 15px;
    line-height: 30px;
    display: flex;
    font-size: 13px;
    border-bottom: 1px solid rgba(100,100,100,.1);
    justify-content: space-between;
}
.otherInfo{
    display: flex;
    justify-content: space-between;
    line-height: 40px;
}
.info-service-item img{
    width: 14px;
    height: 14px;
    position: relative;
    top: 2px;
}
.info-service-item span{
    font-size: 10px;
    color: #333;
}
</style>