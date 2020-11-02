<template>
    <swiper>
        <swiper-item v-for="(item,index) in bannerData" :key="index">
            <a :href="item.link">
                <img :src="item.image" alt="" @load="imgLoad">
            </a>

        </swiper-item>
    </swiper>

</template>

<script>
import {Swiper, SwiperItem} from '@/components/common/swiper/index'

export default {
    name: "HomeSwiper",
    components: {Swiper, SwiperItem},
    props: {
        bannerData: {
            type: Array,
            default() {
                return []
            }
        }
    },
    data(){
        return{
            isload: false
        }
    },
    methods:{
        imgLoad(){
            //这里其实只需要发送一次图片加载完成即可，记录offsetTop计算出一张图片的高度就行了，不需要发送四次
            //所以在第一次调用的时候发送，然后设置isLoad = true
            //之后三次就不会发送了
            if(!this.isload){
                this.$emit('swiperImageLoaded');
                this.isload = true
            }

        }
    }
}
</script>

<style scoped>

</style>