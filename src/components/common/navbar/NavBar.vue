<template>
    <div class="nav-bar">
        <div class="left">
            <slot name="left-navbar"></slot>
        </div>
        <div class="center">
            <slot name="center-navbar"></slot>
        </div>
        <div class="right">
            <slot name="right-navbar"></slot>
        </div>

    </div>
</template>

<script>
export default {
    name: "NavBar"
}
</script>

<style scoped>
.nav-bar {
    display: flex;
    height: 44px;
    /*有内容之后，设置这个会撑起来*/
    line-height: 44px;
    text-align: center;
    /*设置导航栏底部阴影*/
    box-shadow: 0 1px 1px rgb(200, 200, 200);

}

.left {
    width: 60px;


}

.right {
    width: 60px;

}

.center {
    /*其他部分设置好宽度之后，flex=1自动占据剩余的宽度*/
    flex: 1;

}
</style>