import {request} from "@/network/request";
 //将首页中所有的网络请求函数都封装在这里
 //当首页请求的url有变化的时候只需要在这里改就行了
 //这样就可以用这个文件管理所有有关首页的网络请求，这样和home组件内部的耦合度就没那么高
 export function getHomeMultiData(){
     return request({
         url:'/home/multidata'
     })
 }