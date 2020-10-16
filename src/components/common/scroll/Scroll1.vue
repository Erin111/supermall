<template>
    <!--    ref如果是绑定在组件上面的，name通过this.$refs.rename获取到的是组件对象-->
    <!--    ref如果是绑定在元素上面的，name通过this.$refs.rename获取到的是元素对象-->
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
    name: "Scroll",
    props: {
        probeType: {
            type: Number,
            default: 0
        },
        pullUpLoad: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            scroll: null,
            message: '哈哈哈'
        }
    },
    mounted() {
        // 1.创建BScroll对象
        this.scroll = new BScroll(this.$refs.wrapper, {
            click: true,
            probeType: this.probeType,
            pullUpLoad: this.pullUpLoad
        })

        // 2.监听滚动的位置
        this.scroll.on('scroll', (position) => {
            // console.log(position);

        })

        // 3.监听上拉事件
        this.scroll.on('pullingUp', () => {

        })
    },
    methods: {}
}
</script>

<style scoped>

</style>