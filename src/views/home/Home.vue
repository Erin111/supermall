<template>
    <div id="home" class="wrapper">
        <nav-bar class="home-navbar">
            <div slot="center-navbar">购物街</div>
        </nav-bar>
        <!--                当isTabFixed为true时显示，即滚动到需要吸顶效果时显示-->
        <tab-control class="tab-control" v-show="isTabFixed" :title="['流行','新款','精选']"
                     @tabClick="tabClick" ref="tabControl1"/>
        <scroll class="content" ref="scroll" @scroll="contentScroll" @pullingUp="contentPull">
            <!--        封装了一个滚动组件，将想要滚动的内容放在其中即可实现滚动-->
            <div
                :probe-type="3"
                :pull-up-load="true">
                <home-swiper :bannerData="banner" @swiperImageLoaded='swiperImageLoaded'></home-swiper>
                <recommend-view :recommends="recommend"/>
                <feature-view/>
                <!--                这个在滚动到吸顶效果时被隐藏了-->
                <tab-control :title="['流行','新款','精选']"
                             @tabClick="tabClick" ref="tabControl2"/>
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

import {getHomeGoods, getHomeMultiData} from "@/network/home";
import {itemListenerMix,backtop} from "@/common/mixin";


export default {
    name: "Home",
    components: {
        Scroll,


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
            tabOffsettop: 0,
            //tabcontrol的吸顶设置，默认是不吸顶的，到确定位置之后才会吸顶
            isTabFixed: false,
            saveY: 0,
            //    保存全局事件监听函数
            // itemImgLoaded: null

        }
    },
    //组件创建完之后立即执行
    mixins: [itemListenerMix,backtop],
    created() {
        this.getHomeMultiData()

        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')

    },
    mounted() {
        //1. 事件监听相关方法
        //  在mounted生命周期函数中使用 this.$refs.scroll而不是created中
        //  组件未挂载的话，scroll会获取不到
        // this.imageLoad();
        // console.log('all mixed')


    },
    activated() {

        this.$refs.scroll.refresh();
        this.$refs.scroll.scrollTo(0, this.saveY, 0);
    },
    deactivated() {
        //1. 保存离开时首页的Y值，以便回来后保存首页的状态
        this.saveY = this.$refs.scroll.getScrollY();
        //    2. 取消全局监听事件，跳转到详情页或者其他界面的时候取消对itemImageLoaded事件的监听
        //如果后面不加回调事件，会自动取消所有其他组件的itemImageLoaded的监听
        this.$bus.$off('itemImageLoaded', this.itemImgLoaded)
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
            //控制两个tabControl组件点击与最新的点击一致
            this.$refs.tabControl1.currentIndex = item;
            this.$refs.tabControl2.currentIndex = item;

        },

        contentScroll(position) {
          this.backTopShow(position);
            //  //2.判断是否吸顶
            this.isTabFixed = (-position.y) > this.tabOffsettop;


        },

        contentPull() {
            this.getHomeGoods(this.currentType);
        },
        // imageLoad() {
        //     //对于refresh的频繁刷新需要进行防抖处理
        //     //如果直接执行refresh，那么refresh函数会被执行30次
        //     //通过将refresh函数传入debounce函数中生成一个新的函数
        //     //下面这部分已经通过混入放到了mounted里面所以不用这个函数了
        //     const refresh = debounce(this.$refs.scroll.refresh, 500);
        //     this.itemImgLoaded = () => {
        //         refresh()
        //     }
        //     this.$bus.$on('itemImageLoad', this.itemImgLoaded)
        // },
        //  2. 获取TabControl的offsetTop用于吸顶效果的实现
        //    直接$ref.tabControl获取到的是组件本身
        //    现在我们想获取组件中元素的offsetTop属性
        //    所有的组件都有一个属性$el:用于获取组件中的元素
        //    但是这样拿是不对的，虽然元素已经挂载上去了，但是可能因为图片没加载完，所以拿到的值偏小
        //    一般情况下轮播图图片加载完了就差不多了
        swiperImageLoaded() {
            this.tabOffsettop = this.$refs.tabControl2.$el.offsetTop;
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
    /*在使用浏览器原生滚动时为了可使上面导航条固定不动，不会随着下面内容滚动而移动*/
    /*position: fixed;*/
    /*left: 0;*/
    /*top: 0;*/
    /*right: 0;*/
    /*z-index: 10;*/
}

/*浏览器原生滚动时使用*/
/*.tab-control {*/
/*    !*到达下面指定的位置之前，position为sticky*!*/
/*    !*到达之后position变成fixed，这样就不会跟着再跑*!*/
/*    position: sticky;*/
/*    top: 44px*/
/*}*/

.tab-control {
    position: relative;
    z-index: 10;
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
