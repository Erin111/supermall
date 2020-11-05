<template>
    <div class="category">
        <nav-bar class="nav-bar">
            <div slot="center-navbar">商品分类</div>
        </nav-bar>
        <div class="content">
            <tab-menu :menu-title="menuTitle" class="tab-menu" @itemIndex='itemClick'/>
            <scroll class="tab-content" ref="scroll">
                <div>
                    <sub-category class="sub-category" :category-image="categoryImage" @imageLoaded='imageLoaded'/>
                    <tab-control class="tab-control" :title="cateTabControl" @tabClick='tabClick'/>
                    <goods-list :goods="categoryDetail"/>
                </div>
            </scroll>
        </div>
    </div>
</template>

<script>


import {getCategoryData, getSubCategoryData, getCategoryDetail} from "@/network/category";

import NavBar from "@/components/common/navbar/NavBar";
import TabMenu from "@/views/category/childComponents/TabMenu";
import Scroll from "@/components/common/scroll/Scroll";
import SubCategory from "@/views/category/childComponents/SubCategory";
import TabControl from "@/components/content/TabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";

import {debounce} from "@/common/utils";
import {itemListenerMix} from '@/common/mixin'

export default {
    name: "Category",
    components: {GoodsList, SubCategory, Scroll, NavBar, TabMenu, TabControl},
    data() {
        return {
            menuTitle: [],
            categoryImage: [],
            currentIndex: 0,
            menuIndex: 0,
            cateTabControl: ['综合', '新品', '销量'],
            categoryDetail: [],
            saveY:0
        }
    },
    created() {
        this._getCategoryData();
    },
    mixins:[itemListenerMix],
    activated() {

        this.$refs.scroll.refresh();
        this.$refs.scroll.scrollTo(0, this.saveY, 0);
    },
    deactivated() {
        this.$bus.$off('itemImageLoaded', this.itemImgLoaded);
        this.saveY = this.$refs.scroll.getScrollY();
    },
    // destroyed() {
    //
    // },

    computed: {},
    methods: {
        async _getCategoryData() {
            const res = await getCategoryData();
            this.menuTitle = res.data.data.category.list;
            this.categoryImage = this._getSubCategoryData(this.menuTitle[0].maitKey);
            this._getCategoryDetail(this.menuTitle[this.menuIndex].miniWallkey, 'pop');
        },
        _getSubCategoryData(maitKey) {
            getSubCategoryData(maitKey).then(res => {
                // console.log(res)
                this.categoryImage = res.data.data.list;

            })
        },
        _getCategoryDetail(miniWallkey, type) {
            getCategoryDetail(miniWallkey, type).then(res => {
                this.categoryDetail = res.data;
            })
        },
        itemClick(index) {
            this.menuIndex = index;
            this._getSubCategoryData(this.menuTitle[index].maitKey)
            this._getCategoryDetail(this.menuTitle[this.menuIndex].miniWallkey, 'pop');
        },
        imageLoaded() {

            this.refresh = debounce(this.$refs.scroll.refresh, 500);
            this.refresh();

        },
        tabClick(index) {
            switch (index) {
                case 0:
                    this._getCategoryDetail(this.menuTitle[this.menuIndex].miniWallkey, 'pop');
                    break;
                case 1:
                    this._getCategoryDetail(this.menuTitle[this.menuIndex].miniWallkey, 'new');
                    break
                case 2:
                    this._getCategoryDetail(this.menuTitle[this.menuIndex].miniWallkey, 'sell');

            }
        }

    },
    mounted() {

    }
}
</script>

<style scoped>
.category {
    position: relative;
    height: 100vh;
}

.nav-bar {
    background-color: var(--color-tint);
    color: white;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
}

.content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;

    display: flex;
}

.tab-menu {
    z-index: 9;
}

.tab-content {
    height: 100%;
    flex: 1;
    overflow: hidden;
}

.sub-category {
    /*position: absolute;*/
    /*top: 44px;*/
    /*bottom: 49px;*/
    /*right: 0;*/
    margin-top: 20px;
}
</style>