<template>
    <div class="comment" v-if="Object.keys(commentInfo).length !== 0">
        <div class="top">
            <span class="user-comment">用户评价</span>
            <span class="more">更多</span>
        </div>
        <div class="middle">
            <div class="user-info">
                <img :src="commentInfo.user.avatar" alt="">
                <span class="user-name">{{ commentInfo.user.uname }}</span>
            </div>
            <div class="comment-content">
                <div class="content-info">
                    <p>{{ commentInfo.content }}</p>
                </div>
                <div class="other-info">
                    <span class="goods-date">{{ commentInfo.created | showDate }}</span>
                    <span class="goods-info">{{ commentInfo.style }}</span>
                </div>

                <img v-if="commentInfo.images.length !== 0" v-for="(item,index) in commentInfo.images" :src="item" :key="index" alt=""
                     @load="commentImageLoaded">
            </div>

        </div>

    </div>
</template>

<script>
import {formatDate} from '@/common/utils.js'

export default {
    name: "DetailCommentInfo",
    props: {
        commentInfo: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {
            count: 0,
            imageLength: 0

        }
    },
    methods: {
        commentImageLoaded() {
            this.imageLength = this.commentInfo.images.length;
            if (++this.count === this.imageLength) {
                this.$emit('commentImageLoaded')
            }
        }
    },
    filters: {
        showDate: function (value) {
            //服务器会以Unix时间元年为气垫，返回对应的时间戳
            //1535694719（时间戳）
            //秒*1000转为ms
            let date = new Date(value * 1000);
            //将date进行格式化转成对应的字符串
            //第二个参数是传入想要的格式‘yyyy-MM-dd hh:mm:ss’
            return formatDate(date, 'yyyy-MM-dd')
        }
    }
}
</script>

<style scoped>
.comment {
    padding: 5px 12px;
    color: #333;
    border-bottom: 5px solid #f2f5f8;
}

.top {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
}

.user-comment {
    float: left;
    font-size: 15px;
}

.more {
    float: right;
    margin-right: 10px;
    font-size: 13px;
}

.user-info {
    padding: 10px 0 5px;
}

.user-info img {
    width: 42px;
    height: 42px;
    border-radius: 50%;
}

.user-info span {
    position: relative;
    font-size: 15px;
    top: -15px;
    margin-left: 10px;
}

.comment-content {
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 14px;
    color: #777;
    line-height: 1.5;

}

.other-info {
    margin-top: 10px;
    font-size: 12px;
}

.goods-date {
    margin: 0 10px 0 5px;
}

.comment-content img {
    margin-top: 10px;
    width: 70px;
    height: 70px;
    margin-right: 5px;
}
</style>