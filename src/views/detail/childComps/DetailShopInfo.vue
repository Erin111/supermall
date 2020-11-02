<template>
    <div class="shop-info">
        <div class="shop-title">
            <img :src="shopInfo.logo" alt="">
            <span> {{ shopInfo.name }}</span>
        </div>
        <div class="shop-info-middle">
            <div class="shop-middle-item middle-left">
                <div class="sell">
                    <div class=" sells-count">
                        {{ shopInfo.sell | sellSimply(shopInfo.goodsCount) }}
                    </div>
                    <div class="sells-text">
                        <div>总销量</div>
                    </div>
                </div>
                <div class="item">
                    <div class="goods-count">
                        {{ shopInfo.goodsCount }}
                    </div>
                    <div class="goods-text">
                        <div>全部宝贝</div>
                    </div>
                </div>
            </div>
            <div class="shop-middle-item middle-right">
                <div class="score">
                    <table>
                        <tr v-for="(item,index) in shopInfo.score" :key="index">
                            <td class="score-description"> {{ item.name }}</td>
                            <td class="score" :class="{'score-better': item.isBetter}">{{ item.score }}</td>
                            <td class='better' :class="{'better-more': item.isBetter}">
                                <span>{{ item.isBetter ? '高' : '低' }}</span></td>
                        </tr>
                    </table>

                </div>

            </div>

        </div>

        <div class="shop-info-bottom">
            <button class="enter-shop">进店看看</button>
        </div>

    </div>
</template>

<script>
export default {
    name: "DetailShopInfo",
    props: {
        shopInfo: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    filters: {
        sellSimply: function (sellCount) {
            if (sellCount < 10000) return sellCount
            return (sellCount / 10000).toFixed(1).toString() + '万';
        }
    }
}
</script>

<style scoped>
.shop-info {
    padding: 25px 8px;
    border-bottom: 5px solid #f2f5f8;
}

.shop-title {

    line-height: 45px;
    /* 让元素垂直中心对齐 */
    display: flex;
    align-items: center;
}

.shop-title img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, .1);
}

.shop-info-middle {
    margin-top: 15px;
    display: flex;
    align-items: center;
}

.shop-middle-item {
    flex: 1;
}

.middle-left {
    display: flex;
    justify-content: space-evenly;
    color: #333;
    text-align: center;
    border-right: 1px solid rgba(0, 0, 0, .1);
}

.sells-count, .goods-count {
    font-size: 18px;
}

.sells-text, .goods-text {
    margin-top: 10px;
    font-size: 12px;
}

.middle-right {
    font-size: 13px;
    color: #333;
}

.middle-right table {
    width: 120px;
    margin-left: 30px;
}

.middle-right table td {
    padding: 5px 0;
}

.middle-right .score {
    color: #5ea732;
}

.middle-right .score-better {
    color: #f13e3a;
}

.middle-right .better span {
    background-color: #5ea732;
    color: #fff;
    text-align: center;
}

.middle-right .better-more span {
    background-color: #f13e3a;
}

.shop-info-bottom {
    text-align: center;
    margin-top: 10px;
}

.enter-shop {
    display: inline-block;
    font-size: 14px;
    background-color: #f2f5f8;
    width: 150px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 10px;
}

</style>