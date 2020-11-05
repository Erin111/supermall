<template>
<div class="account">
    <div class="left">
        <span class="balance">{{account.balance.toFixed(2)}}</span>
        <span>元</span>
        <p>我的余额</p>
    </div>
    <div class="center">
        <span class="discount">{{account.discount}}</span>
        <span>元</span>
        <p>我的优惠</p>
    </div>
    <div class="right">
        <span class="score">{{account.score}}</span>
        <span>元</span>
        <p>我的积分</p>
    </div>

</div>
</template>

<script>
export default {
name: "Account",
    props:{
    account:{
        type: Object,
        default(){
            {}
        }
    }
    }
}
</script>

<style scoped>
.account{
    display: flex;
    text-align: center;
    margin-top: 10px;
    border-bottom: #eeeeee solid 10px;
}
.center{
    margin-top: 10px;
    flex: 1;
}
.center .discount{
    font-size: 25px;
    color: darkorange;
    font-weight: 600;
}
.center p{
    margin-top: 10px;
    margin-bottom: 10px;
}
.left{
    margin-top: 10px;
    flex: 1;
}
.left .balance{
    font-size: 25px;
    color: darkorange;
    font-weight: 600;
}
.left p{
    margin-top: 10px;
    margin-bottom: 10px;
}
.right{
    margin-top: 10px;
    flex: 1;
}
.right .score{
    font-size: 25px;
    color: darkorange;
    font-weight: 600;
}
.right p{
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>