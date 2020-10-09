<template>
  <tab-bar>
    <tab-bar-item path="/home" :activecolor="activateColor">
<!--      在webpack中配置了别名，在这里可以直接使用~assets-->
      <img src="~assets/img/tabbar/home.svg" slot="item-icon">
      <img src="~assets/img/tabbar/home_active.svg" slot="item-icon-active">

      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category" :activecolor="activateColor">
      <img src="~assets/img/tabbar/category.svg" slot="item-icon">
      <img src="~assets/img/tabbar/category_active.svg" slot="item-icon-active">
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart" :activecolor="activateColor">
      <img src="~assets/img/tabbar/shopcart.svg" slot="item-icon">
      <img src="~assets/img/tabbar/shopcart_active.svg" slot="item-icon-active">
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile" :activecolor="activateColor">
      <img src="~assets/img/tabbar/profile.svg" slot="item-icon">
      <img src="~assets/img/tabbar/profile_active.svg" slot="item-icon-active">
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
//由于在webpack配置文件中配置了路径别名，这里可以直接使用components
import TabBar from "@/components/common/tabbar/tabbar"
import TabBarItem from "@/components/common/tabbar/tabbarItem"

export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem
  },
  data() {
    return {

      activateColor: 'deepPink'

    }
  }
}
</script>

<style scoped>

</style>
