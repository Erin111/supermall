<template>
    <div class="wrapper" ref="wrapper">
        <slot></slot>
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
            default: true
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
        //将滚动的位置发送至home以确定backTop组件的显示和隐藏
        this.scroll.on('scroll', (position) => {
            this.$emit('scroll', position)
        })

        // 3.监听上拉事件
        this.scroll.on('pullingUp', () => {
            this.$emit('pullingUp')
        })
    },
    methods: {

        refresh() {
            //判断scroll有值的时候才进行调取其中的方法
            this.scroll && this.scroll.refresh();
            console.log('1111')
        },
        scrollTo(x, y, time = 500) {
            //更改滚动模块的位置，即滚动到x,y的位置，并可以设置完成这段滚动所需的时间
            this.scroll && this.scroll.scrollTo(x, y, time)
        },
        finishPullUp() {
            this.scroll && this.scroll.finishPullUp()
        }
    }
}
</script>

<style scoped>

</style>
