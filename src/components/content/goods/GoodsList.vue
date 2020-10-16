<template>
<div class="goods-list">
    <goods-list-item class="item" v-for="(item,index) in goods" :goods-item="item" :key="index"/>

</div>
</template>

<script>
import GoodsListItem from "@/components/content/goods/GoodsListItem";
export default {
    name: "GoodsList",
    components:{
      GoodsListItem
    },
    props:{
        goods:{
            type: Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style scoped>
.goods-list {
    display: flex;
    /*设置这个可以根据item宽度决定一行显示几个*/
    flex-wrap: wrap;
    padding: 5px;
    /*将图片在宽度内均等分，设置图片中间的宽度*/
    justify-content: space-around;
}

.goods-list .item {
    width: 48%;
}
</style>