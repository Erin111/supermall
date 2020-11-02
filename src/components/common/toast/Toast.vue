<template>
    <div class="toast" v-show="isShow">
        <div>
            {{ message }}
        </div>

    </div>
</template>

<script>
export default {
    name: "Toast",
    //普通的Toast封装方式
    // props: {
    //     message:{
    //         type: String,
    //         default: ''
    //     },
    //     isShow:{
    //         type: Boolean,
    //         default: false
    //     }
    //
    // },
    data() {
        return {
            message: '',
            delay: 0,
            isShow: false
        }
    },
    methods: {
        //给delay和message传一个默认值
        show(message = '添加商品成功', delay = 2000) {
            this.isShow = true;
            this.message = message;
            setTimeout(() => {
                this.isShow = false;
                this.message = '';
            }, delay)

        }
    }


}
</script>

<style scoped>
.toast {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 200;
    /*根据宽度变化一直居中*/
    transform: translate(-50%, -50%);
    padding: 8px 10px;
    background-color: rgba(0, 0, 0, 0.75);
    color: white;

}
</style>