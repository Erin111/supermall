<template>
    <div class="tab-control">
        <div v-for="(item,index) in title" class="tab-control-item" @click="isClick(index)"
             :class="{active:index===currentIndex}">
            <span>{{ item }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "TabControl",
    data() {
        return {
            currentIndex: 0
        }
    },
    props: {
        title: {
            type: Array,
            default() {
                return ['流行', '新款', '精选']
            }
        }
    },
    methods: {
        isClick(index) {
            this.currentIndex = index
        }
    }
}
</script>

<style scoped>
.tab-control {
    text-align: center;
    display: flex;
    font-size: 14px;
    /*防止tab control透明*/
    background-color: #ffffff;
}

.tab-control-item {
    flex: 1;
    height: 40px;
    line-height: 40px;
}

.tab-control-item span{
    padding: 3px;
}
.active {
    color: var(--color-high-text);
}
.active span{
    border-bottom: 3px solid var(--color-high-text);
}
</style>