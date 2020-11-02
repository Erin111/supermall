<template>
    <div class="detail-goods-info" v-if="Object.keys(detailInfo).length!== 0">
        <div class="goods-description">
            <div class="start"></div>
            <div class="desc">{{ detailInfo.desc }}</div>
            <div class="end"></div>
        </div>
        <div class="goods-key">
            {{ detailInfo.detailImage[0].key }}
        </div>
        <div class="goods-image">
            <img v-for="(item,index) in detailInfo.detailImage[0].list" :key="index" :src="item" alt=""
                 @load="imageLoad">
        </div>

    </div>
</template>

<script>
export default {
    name: "DetailGoodsInfo",
    props: {
        detailInfo: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {
            count: 0,
            imageLength: 0
        }
    },
    methods: {
        //判断所有图片都加载完了，进行一次回调，这时scroll组件可以根据所有加载完的图片计算高度以实现正常滚动
        imageLoad() {
             if(++this.count === this.imageLength){
                this.$emit('detailImageLoaded')
             }
            }

    },
    watch:{
        detailInfo(){
            //获取图片的长度
            this.imageLength = this.detailInfo.detailImage[0].list.length;
        }
    }

}
</script>

<style scoped>
.detail-goods-info {
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
}

.goods-description {
    padding: 0 15px;
}

.goods-description .start, .info-desc .end {
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
}

.goods-description .start {
    float: left;
}

.goods-description .end {
    float: right;
}

.goods-description .start::before, .goods-description .end::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0;
}

.goods-description .end::after {
    right: 0;
}

.goods-description .desc {
    padding: 15px 0;
    font-size: 14px;
}

.goods-key {
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 15px;
}

.goods-image img {
    width: 100%;
}
</style>