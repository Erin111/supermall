<template>
    <div id="home">
        <nav-bar class="home-navbar">
            <div slot="center-navbar">购物街</div>
        </nav-bar>
        <home-swiper :bannerData="banner"></home-swiper>
        <recommend-view :recommends="recommend"/>
        <feature-view/>
        <tab-control class="tab-control" :title="['流行','精选','新款']"/>
        <ul>
            <li>列表</li>
            <li>列表</li>
            <li>列表</li>
            <li>列表</li>
            <li>列表</li>
            <li>列表</li>
            <li>列表</li>
            <li>列表</li>
            <li>列表</li>
            <li>列表</li>
            <li>列表</li>
            <li>列表</li>
            <li>列表</li>
            <li>列表</li>
            <li>列表</li>
            <li>列表</li>
            <li>列表</li>
            <li>列表</li>
            <li>列表</li>
            <li>列表</li>
            <li>列表</li>
            <li>列表</li>
            <li>列表</li>
            <li>列表</li>
            <li>列表</li>
            <li>列表</li>
            <li>列表</li>
            <li>列表</li>
            <li>列表</li>
            <li>列表</li>
            <li>列表</li>
            <li>列表</li>
            <li>列表</li>
        </ul>
    </div>
</template>

<script>
//home组件
import HomeSwiper from "./childComponents/HomeSwiper";
import RecommendView from "@/views/home/childComponents/RecommendView";
import FeatureView from "@/views/home/childComponents/FeatureView";
//公共组件
import NavBar from "@/components/common/navbar/NavBar";
import TabControl from "@/components/content/TabControl/TabControl";

import {getHomeMultiData} from "@/network/home";


export default {
    name: "Home",
    components: {

        HomeSwiper,
        RecommendView,
        FeatureView,

        NavBar,
        TabControl,

    },
    data() {
        return {
            //保存网络请求的数据
            banner: [],
            recommend: [],
            data: null

        }
    },
    created() {
        //函数调用->压入函数栈（保存函数使用过程中所有变量）
        //函数调用结束->弹出函数栈（释放函数中所有变量）
        //所以网络请求中的结果需要保存起来
        //1.网络请求多个数据
        getHomeMultiData().then((res) => {
                console.log(res)
                this.data = res;
                this.banner = res.data.data.banner.list;
                this.recommend = res.data.data.recommend.list;
            }
        )
    }
}
</script>

<style scoped>
#home {
    /*为了空出导航条的位置*/
    padding-top: 44px;
}

/*不要在NavBar组件中设置背景颜色，字体颜色，因为这个导航栏在很多地方会使用，且颜色字体各不相同*/
.home-navbar {
    background-color: var(--color-tint);
    color: white;
    /*为了可使上面导航条固定不动，不会随着下面内容滚动而移动*/
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 10;
}

.tab-control {
    /*到达下面指定的位置之前，position为sticky*/
    /*到达之后position变成fixed，这样就不会跟着再跑*/
    position: sticky;
    top: 44px
}
</style>