<template>
    <div class="recommend-info" v-if="Object.keys(recommendInfo).length !==0">
        <div class="recommend-item" v-for="(item,index) in recommendInfo" :key="index">
            <img :src="item.image" alt="">
            <div class="info">
                <p>{{ item.title }}</p>
                <span class="discount-price">{{ item.discountPrice }}</span>
                <img src="~assets/img/common/collect.svg">
                <span>{{ item.cfav }}</span>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: "DetailRecommendInfo",
    props: {
        recommendInfo: {
            type: Array,
            default() {
                return []
            }
        }
    }
}
</script>

<style scoped>

</style>