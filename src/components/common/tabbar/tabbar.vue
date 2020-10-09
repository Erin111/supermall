<template>
  <div id="tab-bar">
 <slot></slot>
  </div>
</template>

<script>
export default {
  name: "tabbar"
}
</script>

<style scoped>
#tab-bar {
  display: flex;
  background-color: #f6f6f6;
  /*为了使tab-bar移动到底部并占据整个底部*/
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  /*在tab-bar与上面界面中间加一些阴影过渡*/
  /*第一个是在X轴上的偏移，正方向为页面向左*/
  /*第二个是在Y轴上的偏移，正方向为页面向下*/
  /*第三个是模糊距离*/
  /*最后一个为阴影颜色*/
  box-shadow: 0 -2px 0 rgba(100, 100, 100, 0.1);
}


</style>
