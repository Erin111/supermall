import {request} from "@/network/request";

export function getCategoryData(){
    return request({
        url: '/category'
    })
}
export function getSubCategoryData(maitKey){
    return request({
        url:'/subcategory',
        params:{
            maitKey
        }
    })
}
export function getCategoryDetail(miniWallkey,type){
    return request({
        url:'/subcategory/detail',
        params:{
            miniWallkey,
            type
        }
    })
}