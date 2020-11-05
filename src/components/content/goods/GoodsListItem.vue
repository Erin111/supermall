<template>
    <div class="goods-item" @click="itemClick">
<!--        v-lazy:图片懒加载-->
        <img v-lazy="showImage" alt="" @load="imgLoad">
        <div class="goods-info">
            <p>{{ goodsItem.title }}</p>
            <span class="price">{{ goodsItem.price }}</span>
            <span class="collect">{{ goodsItem.cfav }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "GoodsListItem",
    props: {
        goodsItem: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    computed:{
      //  详情页和home和category里面展示商品信息的方式是一样的
      //  所以可以用同一个组件来战士，但是在获取image src时两个数据的方式有所不同
      showImage(){

              return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img

      }
    },
    mounted() {

    },

    methods: {
        imgLoad() {
            this.$bus.$emit('itemImageLoad');
            //因为这里是首页和详情页两个页面的图片加载监听，所以等图片加载完之后分别向两个组件发送事件
            //方法一：根据this.$route.path.indexOf，拿到当前在哪个页面，以便该页面better-scroll可以进行刷新
            // if(this.$route.path.indexOf('/home')){
            //     this.$bus.$emit('homeImageLoad');
            // }
            // else if(this.$route.path.indexOf('/detail')){
            //     this.$bus.$emit('detailImageLoaded')
            // }
        //    方法二：在离开home组件的时候取消对itemImageLoaded事件的监听
        //    在detail组件内再监听itemImageLoaded事件
        //    在离开detail组件的时候取消对itemImageLoaded的监听

        },
        itemClick(){
            this.$router.push({
                path:'/detail',
                query: {
                    iid: this.goodsItem.iid
                }
            });

        }
    }

}
</script>

<style scoped>
.goods-item {
    padding-bottom: 40px;
    position: relative;
}

.goods-item img {
    width: 100%;
    /*设定了图片圆角*/
    border-radius: 5px;
}

.goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
}

.goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
}

.goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
}

.goods-info .collect {
    position: relative;
}

.goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>