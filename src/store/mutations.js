import {
    ADD_COUNTER,
    ADD_TO_CART
} from "@/store/mutations-types";

export default {
        //mutation唯一的目的就是修改state中的状态
        //mutations中的每一个方法尽可能完成的事情比较单一
        //这里其实有两种操作：第一种是添加一个新的商品
        //第二种是如果该商品已经存在那就count+1
        //这两种事情在vue-dev tools里都叫addCart显然不合适
        //如果要做的事情比较多，可以放在action里
        // addCart(state, payload) {
        //     //payload 新添加的商品
        //     /*添加购物车逻辑：
        //     1. 首先判断购物车列表里有没有这件商品，通过item.iid === payload.iid进行判断
        //     2. 如果有该商品，则给该商品的count属性+1
        //     3. 如果没有该商品，则push进去，并设置一个count属性等于1
        //     相当于每一个商品在初次进入的时候count属性都默认1，再次被添加的时候就会给count属性+1
        //      */
        //
        //     let oldProduct = null
        //     // for (let item of state.cartList) {
        //     //     if (item.iid === payload.iid) {
        //     //         oldProduct = item
        //     //     }
        //     // }
        //     //find 函数的使用：可以在数组中查找符合条件的元素并返回该元素
        //
        //     oldProduct = state.cartList.find( item =>item.iid === payload.iid)
        //     if(oldProduct){
        //         oldProduct.count += 1;
        //
        //     }
        //     else {
        //         payload.count = 1;
        //         state.cartList.push(payload);
        //     }
        //
        //
        // }
        [ADD_COUNTER](state, payload) {
            payload.count += 1
        },
        [ADD_TO_CART](state, payload) {
            payload.count = 1;
            //给商品添加一个checked属性，且默认为true
            //也就是说，商品在添加进去的时候即为选中状态
            payload.checked = true;
            state.cartList.push(payload);
        }

}