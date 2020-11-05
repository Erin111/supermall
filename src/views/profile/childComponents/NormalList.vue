<template>
    <div class="normal-list">
        <div v-for="(item,index) in itemList" :key="index" class="item-list">
            <img :src='getURL(item)' alt="">
            <span>{{ item.info }}</span>
        </div>
    </div>
</template>

<script>
import path from 'path'

export default {
    name: "NormalList",
    props: {
        itemList: {
            type: Array,
            default() {
                return []
            }
        }
    },
    methods: {
        getURL(item) {
            return require('assets/img/profile/' + item.icon)
        }
    }
}
</script>

<style scoped>
.normal-list{

}
.item-list {
    line-height: 30px;
    border-bottom: #eeeeee 1px solid;
}

.item-list img {
    width: 25px;
    height: 25px;
    margin-top: 15px;
    margin-right: 10px;
    margin-left: 4px;
}

.item-list span {
    position: relative;
    bottom: 6px;
}
</style>