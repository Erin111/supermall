<template>
  <div class="tabbar-item" @click="itmClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <!--      插槽的使用时，将会用父组件定义的内容直接替换掉slot插槽内容，所以在下面插槽中动态添加class，改变活跃时颜色值是不会有效果的-->
    <!--      所以在这里用一个div包裹它，在此div上动态绑定class-->
    <div :style="isActiveColor">
<!--      动态绑定一个样式-->
      <slot name="item-text"></slot>
    </div>

  </div>
</template>

<script>
export default {
  name: "tabbarItem",
  props: {
    path: String,
    activecolor: {
      type: String,
      default: 'red'
    }
  },
  data() {
    return {
      // isActive: true
    }
  },
  computed: {
    isActive() {
      //此处想要实现点哪个tap-bar-item哪个变成红色
      //获取当前的活跃路由的路径，在传入的路径做检索，如果存在则，返回true，否则则返回false
      return this.$route.path.indexOf(this.path) !== -1
    },
    isActiveColor() {
      //此处想要实现点击哪个tap-bar-item，出现指定的文字颜色
      //判断该路由是否处于活跃状态，若处于活跃状态，则给style绑定父组件传入的activecolor值
      return this.isActive ? {color: this.activecolor} : {}
    }
  },
  methods: {
    itmClick() {
      this.$router.push(this.path);
    }
  }
}
</script>

<style scoped>
.tabbar-item {
  text-align: center;
  /*flex布局使得内容在空间上均分*/
  flex: 1;
  /*tab-bar的常用高度*/
  height: 49px;
  font-size: 14px;
}

.tabbar-item img {
  width: 24px;
  height: 24px;
  /*上方预留空间*/
  margin-top: 3px;
  margin-bottom: 2px;
  /*图片下方会自动多三个像素，可以通过下面这个去掉*/
  vertical-align: middle;
}


</style>
