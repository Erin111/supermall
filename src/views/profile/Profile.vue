<template>
    <div class="profile">
        <nav-bar class="nav-bar">
            <div slot="center-navbar">我的档案</div>
        </nav-bar>
        <user-info/>
        <account :account="account"/>
        <normal-list class="order" :item-list="orderList"/>
        <normal-list :item-list="servicesList"/>
    </div>
</template>

<script>
import Scroll from "@/components/common/scroll/Scroll";
import NavBar from "@/components/common/navbar/NavBar";
import UserInfo from "@/views/profile/childComponents/UserInfo";
import Account from "@/views/profile/childComponents/Account";
import NormalList from "@/views/profile/childComponents/NormalList";

export default {
    name: "Profile",
    components: {
        NormalList,
        Account,
        NavBar,
        UserInfo
    },
    data() {
        return {
            account: {
                balance: 0,
                discount: 0,
                score: 0
            },
            orderList: [
                {icon: 'message.svg', info: '我的消息'},
                {icon: 'pointer.svg', info: '积分商城'},
                {icon: 'vip.svg', info: '会员卡'}
            ],
            servicesList: [
                {icon: 'cart.svg', info: '我的购物车'},
                {icon: 'shopping.svg', info: '下载购物商城'}
            ]
        }
    }

}
</script>

<style scoped>
.nav-bar {
    background-color: #ff8198;
    color: white;
}
.order{
    border-bottom: #eee 10px solid;
}
</style>