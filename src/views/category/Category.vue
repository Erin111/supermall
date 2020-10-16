<template>
    <div class="wrapper">

        <ul class="content">
            <li>分类列表1</li>
            <li>分类列表2</li>
            <li>分类列表3</li>
            <li>分类列表4</li>
            <li>分类列表5</li>
            <li>分类列表6</li>
            <li>分类列表7</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>
            <li>分类列表8</li>

        </ul>
    </div>
</template>

<script>
//滚动条插件的使用 better-scroll
//需要用一个标签包裹，里面只能放一个对应元素
import BSroll from 'better-scroll'

export default {
    name: "Category",
    mounted() {
        const bs = new BSroll('.wrapper', {
            //实时监听滚动位置
            probeType: 0,
            pullUpLoad: true
        })
        bs.on('scroll', position => {
            console.log(position)

        })
        bs.on('pullingUp', ()=>{
            console.log('上拉加载更多')

        })
    }
}
</script>

<style scoped>
.wrapper {
    height: 200px;
    /*隐藏掉超出高度的内容，并设置未被隐藏的内容可滚动，这样就实现了原生的类似于滚动条的功能*/
    /*overflow-y: scroll;*/
    overflow: hidden;
    background-color: antiquewhite;
}
</style>