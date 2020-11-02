<template>
    <div class="cart-list">
        <scroll class="content" ref="scroll">
            <div>
                <cart-list-item v-for="(item,index) in cartList" :product="item" :key="index"/>
            </div>

        </scroll>

    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Scroll from "@/components/common/scroll/Scroll";

import CartListItem from "@/views/cart/childComps/CartListItem";

export default {
    name: "CartList",
    computed: {
        ...mapGetters(['cartList'])
    },
    components: {
        Scroll,
        CartListItem
    },
    activated() {
        this.$refs.scroll.refresh();
    },
    watch: {
        cartList: {
            handler(val, old) {
                this.$refs.scroll.refresh();
            },
            deep: true
        }
    }
}
</script>

<style scoped>
.cart-list {
    height: 100%;

}

.content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 89px;
    left: 0;
    right: 0;
}
</style>