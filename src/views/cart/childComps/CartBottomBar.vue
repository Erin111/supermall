<template>
    <div class="cart-bottom-bar">
        <div class="left">
            <check-button class="check-button"  :is-checked="isAllChecked"
                          @click.native="allCheckedClick"/>
            <span>全选</span>
        </div>
        <div class="price">
            合计：￥{{ totalPrice }}
        </div>
        <div class="calculate">
            去计算({{ productCount }})
        </div>
    </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";
import {mapGetters} from 'vuex'

export default {
    name: "CartBottomBar",
    components: {CheckButton},
    data() {
        return {
            isAllChecked: false,
        }
    },
    computed: {
        ...mapGetters(['cartList']),
        totalPrice() {
            return this.cartList.filter((item) => {
                return item.checked
            }).reduce((preVal, item) => {
                return preVal + item.price * item.count
            }, 0).toFixed(2)
        },
        productCount() {
            const checkedProduct = this.cartList.filter((item) => {
                return item.checked
            })
            return checkedProduct.length
        },
    },
    mounted() {
      this.allChecked();
    },
    watch:{
    cartList:{
      handler(val,old){
          this.allChecked();
      },
      deep:true
  }
    },
    methods: {
        allChecked() {
            const checkedProduct = this.cartList.filter((item) => {
                return item.checked
            })
            this.isAllChecked = checkedProduct.length === this.cartList.length;
            //下面这种方法是只要有一个不选中，全选按钮就不显示被点选，用find函数不用遍历所有的，这样性能更佳
            // if(this.cartList.length ===0) this.isAllChecked =false;
            //  this.isAllChecked =!this.cartList.find(value => value.checked ===false)
        },
        allCheckedClick() {
            //点击全选，如果原来全选未被点击，则全选
            //如果全选已经没选中，再点变成全不选
            //即点击全选按钮时，商品的被点击状态与全选按钮相同
            this.isAllChecked = !this.isAllChecked;
            this.cartList.forEach(item => {
                item.checked = this.isAllChecked
            })

        }
    }
}
</script>

<style scoped>
.cart-bottom-bar {
    height: 40px;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 49px;
    background-color: #f6f6f6;
    line-height: 40px;
    display: flex;
    font-size: 15px;
}

.left {
    display: flex;
    align-items: center;
    width: 100px
}

.check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-left: 10px;
    margin-right: 10px;
}

.left span {
    margin-right: 10px;
}

.price {
    flex: 1;
}

.calculate {
    width: 90px;
    background-color: darkorange;
    text-align: center;
    color: #eeeeee;
    border-radius: 20px;
}

</style>