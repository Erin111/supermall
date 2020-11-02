<template>
    <div class="detail">
        <detail-nav-bar class="detail-nav" ref="detailNav" @navClick="navClick"/>
        <scroll ref="scroll" class="content" :probe-type="3" @scroll="detailPosition">
            <div>
                <detail-swiper :top-images="topImages"></detail-swiper>
                <detail-base-info :goods-info="goods"/>
                <detail-shop-info :shop-info="shop"/>
                <detail-goods-info :detail-info="detailInfo" @detailImageLoaded="ImageLoaded"/>
                <detail-param-info ref="params" :param-info="paramInfo"/>
                <detail-comment-info ref="comment" :comment-info="commentInfo"/>
                <goods-list ref="recommend" :goods="recommend"/>
            </div>
        </scroll>
        <detail-bottom-bar @addClick="addToCart"/>
        <back-top @click.native="backClick" v-show="isShowBackTop"/>
        <!--        普通的toast封装方式-->
        <!--        <toast :message="message" :is-show="show"/>-->
    </div>


</template>

<script>
import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";
import GoodsList from "@/components/content/goods/GoodsList";
import DetailBottomBar from "@/views/detail/DetailBottomBar";


import Scroll from "@/components/common/scroll/Scroll";
//普通的toast组件使用方式
// import Toast from "@/components/common/toast/Toast";

import {getDetailData, getDetailRecommend, GoodsInfo, Shop, GoodsParam} from '@/network/detail'
import {itemListenerMix, backtop} from "@/common/mixin";
import {debounce} from "@/common/utils";

import {mapActions} from 'vuex'


export default {
    name: "Detail",
    data() {
        return {
            iid: null,
            topImages: [],
            goods: {},
            shop: {},
            paramInfo: {},
            detailInfo: {},
            commentInfo: {},
            recommend: [],
            // itemImgLoaded: null
            //详情页中点击nav，滚动到相应的位置，这里保存滚动到的y值
            //第一个元素为商品 第二个为参数，第三个为评价，第四个为推荐
            themeTopYS: [],
            getThemeTopYs: null,
            positionY: 0,
            currentIndex: 0,
            //普通的toast组件使用方式
            // message: '',
            // show: false
        }
    },
    components: {
        DetailCommentInfo,
        DetailBottomBar,
        GoodsList,
        DetailParamInfo,
        DetailShopInfo,
        DetailBaseInfo,
        DetailSwiper,
        DetailNavBar,
        DetailGoodsInfo,


        Scroll,
        //普通的toast组件使用方式
        // Toast
    },
    //这样将混入的代码混到了mounted里面
    mixins: [itemListenerMix, backtop],
    //点进去之后还是相同的图片，是因为在app.vue里设置了keep-alive，组件不会销毁后再次创建
    //也就是说created函数只能执行一次
    //所以要在keep-alive里排除Detail组件
    created() {
        //1.保存传入的iid
        this.iid = this.$route.query.iid;
        //2. 根据iid请求详情页数据
        getDetailData(this.iid).then((res) => {
            // console.log(res);
            const data = res.data.result;
            //    1.获取顶部轮播图数据
            this.topImages = data.itemInfo.topImages;
            //2.获取商品信息数据
            this.goods = new GoodsInfo(data.itemInfo, data.columns, data.shopInfo.services);
            this.shop = new Shop(data.shopInfo);
            this.detailInfo = data.detailInfo;
            // 6.保存参数信息
            this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
            //    7.保存评论信息
            if (data.rate.cRate !== 0)
                this.commentInfo = data.rate.list[0];

        })
        getDetailRecommend().then(res => {
            console.log(res)
            this.recommend = res.data.data.list;

        })
        //根据最新的数据，对应的dom已经渲染完毕，之后会调用这个函数
        //但是图片还没有加载完呢
        //此时拿到的offsetTop显然是不对的
        //一般offsetTop拿到的值不对，都是因为图片的问题
        // this.nextTick(()=>{
        //     //将各个对应组件的offsetTop值push进去，以便滚动到相应位置
        //     this.themeTopYS = [];
        //     this.themeTopYS.push(0);
        //     this.themeTopYS.push(this.$refs.params.$el.offsetTop)
        //     this.themeTopYS.push(this.$refs.comment.$el.offsetTop)
        //     this.themeTopYS.push(this.$refs.recommend.$el.offsetTop)
        // })

    },
    mounted() {
        this.$nextTick(() => {
            this.getThemeTopYs = debounce(() => {
                this.themeTopYS = [];
                this.themeTopYS.push(0);
                this.themeTopYS.push(this.$refs.params.$el.offsetTop)
                this.themeTopYS.push(this.$refs.comment.$el.offsetTop)
                this.themeTopYS.push(this.$refs.recommend.$el.offsetTop)
                this.themeTopYS.push(Number.MAX_VALUE);
            }, 500)
        })

    },
    //在这里由于detail组件没有用keepAlive做缓存所以离开时和进入时是不会调用 disactivated和activated的，在这里要用destroyed
    destroyed() {
        this.$bus.$off('itemImageLoaded', this.itemImgLoaded)
    },
    methods: {
        //如果想在detail里直接使用actions里的函数，不用 this.$store.dispatch('addCart',product)的话，可以将actions里面的函数映射出来
        //这时就直接可以this.addCart(product) vuex内部会调用this.$store.dispatch('addCart',product)
        ...mapActions(['addCart']),
        ImageLoaded() {
            this.$refs.scroll.refresh();
            //等商品图片都加载完成之后载获取offsetTop是对的
            //为了防止函数运行结束，销毁局部变量，每次运行函数都要重新创建变量，然后调用，导致防抖失效，这里我们把函数先保存一下，这样每次调用的就是保存的那个函数

            this.getThemeTopYs();

        },
        navClick(index) {
            // console.log(index)
            this.$refs.scroll.scrollTo(0, -this.themeTopYS[index])
        },
        //根据滚动位置改变navBar的选择值
        detailPosition(position) {
            //引入currentIndex保存navBar的index，当index和currentIndex相同的时候就不需要重复对detailNav中的currentNavIndex赋值，提高性能
            // for (let i = 0; i < this.themeTopYS.length; i++) {
            //     if (this.currentIndex!==i && ((-position.y >= this.themeTopYS[i] && -position.y < this.themeTopYS[i + 1]) || -position.y >= this.themeTopYS[this.themeTopYS.length - 1])) {
            //         this.$refs.detailNav.currentNavIndex = i;
            //     }
            // }
            //在themeTopYS数组中，第五个元素传入一个js中能表示的最大值，这样就不用判断条件当position大于最后一个的情况
            //此时注意i+1依然是undefined，所以遍历的时候要对length-1
            for (let i = 0; i < this.themeTopYS.length - 1; i++) {
                if (this.currentIndex !== i && ((-position.y >= this.themeTopYS[i] && -position.y < this.themeTopYS[i + 1]))) {
                    this.$refs.detailNav.currentNavIndex = i;
                }
            }
            this.backTopShow(position);


        },
        addToCart() {
            //1.获取购物车需要展示的信息
            const product = {};
            product.image = this.topImages[0];
            product.title = this.goods.title;
            product.desc = this.goods.desc;
            product.price = this.goods.realPrice;
            product.iid = this.iid;
            //    2.将商品加入到购物车里
            // this.$store.commit('addCart', product);
            this.addCart(product).then((res) => {
                //普通的toast组件使用方式
                // this.message = res;
                // this.show = true;
                // setTimeout(()=>{
                //     this.show = false;
                //     this.message = '';
                // },1500)
                this.$toast.show(res, 1500);
            })

        }

        // recommandImgLoaded() {
        //     //这部分代码与home中的相对应功能即刷新better-scroll的代码是一样的，所以这里考虑抽离
        //     //通过vue中的mixin技术：通常用于两个组件中想要复用代码的情况
        //
        //     // const refresh = debounce(this.$refs.scroll.refresh, 500);
        //     // this.itemImgLoaded = () => {
        //     //     refresh()
        //     // }
        //     // this.$bus.$on('itemImageLoaded', this.itemImgLoaded);
        // }

    }
}
</script>

<style scoped>
.detail {
    position: relative;
    z-index: 9;
    background-color: #ffffff;
    height: 100vh;
}

.content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
}

.detail-nav {
    position: relative;
    background-color: #ffffff;
    z-index: 10
}
</style>