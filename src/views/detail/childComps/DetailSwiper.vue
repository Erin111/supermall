<template>
<swiper class="detailSwiper">
    <swiper-item class="detaiSwiperItem" v-for="item in topImages" :key="item">
        <img :src="item" alt="">
    </swiper-item>
</swiper>
</template>

<script>
import {Swiper,SwiperItem} from "@/components/common/swiper/index";


export default {
    name: "DetailSwiper",
    components: {
        SwiperItem,
        Swiper
    },
    props:{
        topImages:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style scoped>
.detailSwiper{
    height: 275px;
    overflow: hidden;
}
</style>