import {debounce} from "@/common/utils";

import BackTop from "@/components/content/backTop/BackTop";
export const itemListenerMix = {
    //不仅mounted可以混入，其他的例如data，created，methods，components等都可以混入
    data(){
        return{
            itemImgLoaded: null,
           refresh: null

        }
    },
    mounted(){
        this.refresh = debounce(this.$refs.scroll.refresh, 500);
        this.itemImgLoaded = () => {
            this.refresh()
        }
        this.$bus.$on('itemImageLoad', this.itemImgLoaded)
    }
}
export const backtop = {
    data(){
        return {
            isShowBackTop: false
        }
    },
    components:{
        BackTop
    },
    methods:{
        backClick() {
            this.$refs.scroll.scrollTo(0, 0, 500);
        },
        backTopShow(position){
            //1. 判断backTop显示
            //设置position>1000时显示
            //由于传过来的是负值需要加-号
            this.isShowBackTop = (-position.y) > 1000;
        },

    }
}