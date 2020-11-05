<template>
<div class="user-info">
    <div class="left">
        <img src="~assets/img/profile/avatar.svg" alt="">
    </div>
    <div class="center">
        <p> 登录/注册</p>
        <img src="~assets/img/profile/phone.svg" alt="">
        <span>暂无绑定手机号</span>
    </div>
    <div class="right">
        <img src="~assets/img/common/arrow-left.svg" alt="">
    </div>

</div>
</template>

<script>
export default {
    name: "UserInfo",

}
</script>

<style scoped>
.user-info{
    display: flex;
    color: white;
    background-color: #ff8198;
    height: 120px;
    border-bottom: #eeeeee solid 2px;
}
.left{
    flex: 1;
}
.left img{
    width: 100px;
    height: 100px;
    margin-top: 10px;
    margin-left: 6px;
}
.center{
    flex: 1;
    margin-left: -10px;
}
.center p{
    margin: 30px 0 10px 6px;
}
.center img{
    width: 20px;
    height: 20px;
    margin-left: 3px;
    vertical-align: middle;
}
.center span{
    font-size: 14px;
}
.right{
    flex: 1;
}
.right img{
    width:20px;
    height: 20px;
    float: right;
    margin-top: 50px;
    margin-right: 15px;
}
</style>