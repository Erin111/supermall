<template>
    <div class="sub-category">
        <div class="category-image" v-for="(item,index) in categoryImage" :key="index">
            <a :href="item.link">
                <img :src="item.image" alt="" @load="imageLoaded">
                <p>{{ item.title }}</p>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: "SubCategory",
    props: {
        categoryImage: {
            type: Array,
            default(){
                []
            }
        }
    },
    methods:{
        imageLoaded(){
            this.$emit('imageLoaded')
        }
    }
}
</script>

<style scoped>
.sub-category {
    display: flex;
    flex-wrap: wrap;
}

.category-image {
    flex: 1;
    font-size: 15px;
    text-align: center;
    margin-bottom: 15px;

}

.category-image img {
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
}
</style>