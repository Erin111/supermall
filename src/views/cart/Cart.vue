<template>
    <div class="cart">
        <nav-bar class="cart-nav">
            <div slot="center-navbar">
                购物车({{ cartLength }})
            </div>
        </nav-bar>
        <cart-list/>
        <cart-bottom-bar/>
    </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import CartList from "@/views/cart/childComps/CartList";
import CartBottomBar from "@/views/cart/childComps/CartBottomBar";
import {mapGetters} from 'vuex'

export default {
    name: "Cart",
    computed: {
        //vuex中提供的方法，可以将vuex中getters内指定的方法转为计算属性
        //这样就可以直接使用 不用this.$store.getters.cartLength
        ...mapGetters(['cartLength'])
        //    或者你想起一个和getters里面定义的方法不一样的名字作为计算属性
        //     ...mapGetters({
        //         length:'cartLength'
        //     })

    },
    components: {
        CartList,
        CartBottomBar,
        NavBar,
    },
}
</script>

<style scoped>
.cart-nav {
    background-color: var(--color-tint);
    color: white;

}
.cart{
    height: 100vh;
    position: relative;
}
</style>