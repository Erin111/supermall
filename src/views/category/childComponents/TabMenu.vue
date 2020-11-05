<template>
    <scroll class="tab-menu" ref="scroll">
        <div>
            <div class="menu-list">
                <div class="menu-list-item"
                     :class="{active: index===currentIndex}"
                     v-for="(item, index) in  menuTitle"
                     :key="index"
                     @click="itemClick(index)">
                    {{ item.title }}
                </div>
            </div>
        </div>

    </scroll>
</template>

<script>
import Scroll from "@/components/common/scroll/Scroll";

export default {
    name: "TabMenu",
    data() {
        return {
            currentIndex: 0,
        }
    },
    components: {
        Scroll,
    },
    props: {
        menuTitle: {
            type: Array,
            default: []
        }
    },
    watch:{
      menuTitle:{
          handler(val,newVal){
              this.$refs.scroll.refresh();
          },
          deep:true
      }
    },
    methods: {
        itemClick(index) {
            this.currentIndex = index;
            this.$emit('itemIndex', index)
        }
    },
}
</script>

<style scoped>
.tab-menu {
    background-color: #f6f6f6;
    height: 100%;
    width: 100px;
    box-sizing: border-box;
    overflow: hidden;
}

.menu-list {

}

.menu-list-item {
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
}

.active {
    font-weight: 700;
    color: var(--color-high-text);
    background-color: #fff;
    border-left: 3px solid var(--color-high-text);

}
</style>
