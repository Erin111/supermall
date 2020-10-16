<template>
    <div id="home" class="wrapper">
        <nav-bar class="home-navbar">
            <div slot="center-navbar">购物街</div>
        </nav-bar>
        <scroll class="content" ref="scroll" @scroll="contentScroll" @pullingUp="contentPull">
            <!--        封装了一个滚动组件，将想要滚动的内容放在其中即可实现滚动-->
            <div
                :probe-type="3"
                :pull-up-load="true">
                <home-swiper :bannerData="banner"></home-swiper>
                <recommend-view :recommends="recommend"/>
                <feature-view/>
                <tab-control class="tab-control" :title="['流行','新款','精选']" @tabClick="tabClick"/>
                <goods-list :goods="showGoods"/>
            </div>
            <!--        利用class设置一个可滚动的高度-->

        </scroll>
        <!--        想要监听组件的根元素原生事件加native修饰符-->
        <back-top @click.native="backClick" v-show="isShowBackTop"/>
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
import GoodsList from "@/components/content/goods/GoodsList";
import Scroll from "@/components/common/scroll/Scroll";
import BackTop from "@/components/content/backTop/BackTop";

import {getHomeGoods, getHomeMultiData} from "@/network/home";


export default {
    name: "Home",
    components: {
        Scroll,
        BackTop,

        HomeSwiper,
        RecommendView,
        FeatureView,

        NavBar,
        TabControl,
        GoodsList

    },
    data() {
        return {
            //保存网络请求的数据
            banner: [],
            recommend: [],
            goods: {
                'pop': {page: 0, list: []},
                'new': {page: 0, list: []},
                'sell': {page: 0, list: []},
            },
            currentType: 'pop',
            isShowBackTop: false

        }
    },
    //组件创建完之后立即执行
    created() {
        this.getHomeMultiData()

        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')

    },
    mounted() {
        //    事件监听相关方法
      //  在mounted生命周期函数中使用 this.$refs.scroll而不是created中
      //  组件未挂载的话，scroll会获取不到
      this.imageLoad();
    },
    computed: {
        showGoods() {
            return this.goods[this.currentType].list
        }
    },
    methods: {
        //网络请求相关
        getHomeMultiData() {
            //函数调用->压入函数栈（保存函数使用过程中所有变量）
            //函数调用结束->弹出函数栈（释放函数中所有变量）
            //所以网络请求中的结果需要保存起来
            //1.网络请求多个数据
            getHomeMultiData().then((res) => {
                    this.banner = res.data.data.banner.list;
                    this.recommend = res.data.data.recommend.list;
                }
            )
        },
        getHomeGoods(type) {
            //2.请求商品数据
            //第一次调用请求的是第一页，当该方法复用时下拉加载，请求page=2的数据
            const page = this.goods[type].page + 1
            getHomeGoods(type, page).then((res => {
                //该方法实现了把网络请求获取的list数组逐个元素拿出来，push到goods.pop.list中
                //或者可以用for循环
                // res.data.data.list.forEach(item =>{
                //     this.goods[type].list.push(item)
                // })
                this.goods[type].list.push(...res.data.data.list);
                //多了一组数据，page+1,下一次调用的时候请求的就是第二页的数据了
                this.goods[type].page += 1;
                this.$refs.scroll.finishPullUp();
            }))
        },
        //事件监听相关的方法
        tabClick(item) {
            switch (item) {
                case 0:
                    this.currentType = 'pop';
                    break
                case 1:
                    this.currentType = 'new'
                    break
                case 2:
                    this.currentType = 'sell'
                    break
            }

        },
        backClick() {
            this.$refs.scroll.scrollTo(0, 0, 500);
        },
        contentScroll(position) {
            //设置position>1000时显示
            //由于传过来的是负值需要加-号
            this.isShowBackTop = -position.y > 1000
        },
        contentPull(){
            this.getHomeGoods(this.currentType);
        },
        imageLoad() {
            //对于refresh的频繁刷新需要进行防抖处理
            //如果直接执行refresh，那么refresh函数会被执行30次
            //通过将refresh函数传入debounce函数中生成一个新的函数
            const refresh = this.debounce(this.$refs.scroll.refresh,500);
            this.$bus.$on('itemImageLoad', () => {
                refresh()
            })
        },
        debounce(func,delay){
            //第一次进入时 timer是空的
            //这个函数返回了一个函数就是
            let timer = null;
            return function (...args){
                // 如果不是第一次调用，也就是第一张图片传过来之后，第二张图片在设定时间内又传过来了
                //那就清除第一个定时器，重启定时器
                if(timer) clearTimeout(timer)
                timer = setTimeout(()=>{
                    // 调用传入的函数，在这里是this.$refs.scroll.refresh，如果想传参数也可
                    func.apply(this,args)
                },delay)
            }
        }

    }
}
</script>

<style scoped>
#home {
    /*为了空出导航条的位置*/
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;

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


.content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
}

/*.content {*/
/*height: calc(100% - 93px);*/
/*overflow: hidden;*/
/*margin-top: 44px;*/
/*}*/
</style>
