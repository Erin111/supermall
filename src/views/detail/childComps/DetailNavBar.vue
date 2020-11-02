<template>
<nav-bar>
    <div slot="left-navbar" class="left" >
        <img src="~assets/img/common/back.svg" alt="" @click="backClick">
    </div>
    <div slot="center-navbar" class="center">
        <div v-for="(items,index) in titles" class="navItem" :class="{active:currentNavIndex===index}" @click="navClick(index)">
            {{items}}
        </div>
    </div>
</nav-bar>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
export default {
    name: "DetailNavBar",
    components:{
        NavBar
    },
    data(){
        return{
            titles: ['商品','参数','评论','推荐'],
            currentNavIndex: 0
        }
    },
    methods:{
        backClick(){
            this.$router.back();
        },
        navClick(index){
            this.currentNavIndex = index;
            this.$emit('navClick', index)
        }
    }
}
</script>

<style scoped>
.center{
    display: flex;
}
.left{
    z-index: 10;
}
.left img{
    margin-top: 15px;
    width: 15px;
    height: 15px;
}
.navItem{
    flex: 1;
    font-size: 13px;
}
.active{
    color: var(--color-high-text);
}
</style>