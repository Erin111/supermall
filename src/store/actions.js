import {
    ADD_COUNTER,
    ADD_TO_CART
} from "@/store/mutations-types";
export default {
        addCart(context, payload) {
            return new Promise((resolve, reject) =>{
                //payload 新添加的商品
                /*添加购物车逻辑：
                1. 首先判断购物车列表里有没有这件商品，通过item.iid === payload.iid进行判断
                2. 如果有该商品，则给该商品的count属性+1
                3. 如果没有该商品，则push进去，并设置一个count属性等于1
                相当于每一个商品在初次进入的时候count属性都默认1，再次被添加的时候就会给count属性+1
                 */

                let oldProduct = null
                // for (let item of state.cartList) {
                //     if (item.iid === payload.iid) {
                //         oldProduct = item
                //     }
                // }
                //find 函数的使用：可以在数组中查找符合条件的元素并返回该元素

                oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
                if (oldProduct) {
                    context.commit(ADD_COUNTER, oldProduct)
                    resolve('当前商品数量+1')

                } else {

                    context.commit(ADD_TO_CART, payload)
                    resolve('添加了新的商品')
                }

            }  )



        }
}