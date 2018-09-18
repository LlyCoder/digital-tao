<template>
    <div>
        <nav-header></nav-header>
        <nav-bread>
            <span>文章详情</span>
        </nav-bread> 
            <div class="container w">
                <div class="article_box">
                    <div class="title"><h2>{{article.articleTitle}}</h2></div>
                    <div class="ar_info">
                        <div><span class="fa fa-user-circle"></span>  {{article.publisher.userName}}</div> &nbsp;&nbsp;
                        <div><span class="fa fa-clock-o"></span>  {{article.publishDate | toDate}}</div>
                        <div><span class="fa fa-pencil-square-o"></span> {{article.updateDate | timeAgo}}</div>
                    </div>
                    <div class="ar_content" v-html="article.content"></div>
                    <div class="like_box">
                        <img :src="'/static/' + likeSvg" @click="updateLike" :class="{unliked: unlike}">
                        <div>已有{{arLike}}人点赞</div>
                    </div>
                </div>
                <div class="comments_box">
                    <div class="input_comment">
                        <div class="tip">
                            <h3>网友评论：</h3>
                            <div>文明上网理性发言，请遵守新闻评论服务协议</div>
                        </div>
                        <div class="upload">
                            <el-input type="textarea" :rows="3" placeholder="说点什么吧。。。。" v-model="commentInput">
                            </el-input>
                            <el-button type="primary" v-on:click="addComment(commentId, to)">回复</el-button>
                        </div>
                        <div class="comment_list">
                            <div class="list_tip"><h3>全部评论：</h3></div>
                            <div class="list_content">
                                <div v-for="(item, index) in comments" :key=index>
                                    <div class="main">
                                        <img :src="'http://localhost:3000/images/userIco/'+item.from.userIco">
                                        <div class="info">
                                            <div><span>{{item.from.userName}}</span> <span>{{item.createAt | toDate}}</span></div>
                                            <div>{{item.content}}</div>     
                                        </div>  
                                    </div>
                                    <div class="reply_input">
                                        <span class="fa fa-comment" aria-hidden="true"></span>
                                        <a class="reply" @click="showInput=false" v-if="showInput==true && checkIndex==index">收起</a>
                                         <a class="reply" @click="toReply();checkIndex=index" v-else>回复</a>
                                        <div v-if="showInput&&checkIndex==index">
                                            <el-input type="textarea" :rows="2" placeholder="" v-model="commentInput">
                                            </el-input>
                                            <el-button type="primary" @click="addComment(item._id, item.from);showInput=false;" size="mini">发表</el-button>
                                        </div>
                                    </div>
                                    <div class="below" v-if="item.reply.length">
                                        <div v-for="(item2, index2) in item.reply" :key="index2">
                                            <div class="reply_item">
                                                <span class="reply_name">{{item2.from.userName}}</span>
                                                <span class="ignore">回复</span>
                                                <span class="reply_name">{{item2.to.userName}}</span>：
                                                <span>{{item2.content}}</span>
                                             </div>
                                            <div class="reply_input">
                                                <span class="fa fa-comment" aria-hidden="true"></span>
                                                <a class="reply" @click="showInputb=false;" v-if="showInputb==true && index+'/'+index2 == indexfina">收起</a>
                                                <a class="reply" @click="showInputb=true;indexfina=index+'/'+index2" v-else>回复</a>
                                                <div v-if="showInputb && index+'/'+index2 == indexfina">
                                                    <el-input type="textarea" :rows="2" placeholder="" v-model="commentInput">
                                                    </el-input>
                                                    <el-button type="primary" @click="addComment(item._id, item2.from);showInputb=false;" size="mini">发表</el-button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>   
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <nav-footer></nav-footer>
    </div>
</template>
<script>
    import NavHeader from '@/components/NavHeader'
    import NavFooter from '@/components/NavFooter'
    import NavBread from '@/components/NavBread'
    import axios from 'axios'
export default  {
        data() {
            return {
                article: {},
                commentId: null,
                to: null,
                commentInput: '',
                comments: [],
                likeSvg: 'like.svg',
                arLike: 0,
                toggle: '回复',
                showInput: false,
                showInputb: false,
                checkIndex: -1,
                checkIndexb: -1,
                indexfina: 0,
                unlike: true
            }
    },
    created() {
        this.getDetail();
        this.getComments();
        this.checkLiked();
    },
    components: {
        NavHeader,
        NavFooter,
        NavBread
    },
    watch: {
        '$route'() {
            this.checkLiked();
        }
    },
    methods: {
        getDetail() {
            let id = this.$route.params.id;
            axios.get('/articles/getDetail', {
                params: {id}
            }).then(result => {
                let res = result.data.result;
                this.article = res;
                this.arLike = res.like
            })
        },
        getComments() {
            const aid = this.$route.params.id;
            axios.get('/articles/getComments' ,{
                params: {
                    aid
                }
            }).then(result => {
                let res = result.data;
                if(res.status == '0') {
                    this.comments = res.result;
                }
            })

        },
        checkLiked() {
            let flag = document.cookie.indexOf("userId") > -1 ? true : false;
             let aid = this.$route.params.id; 
            if(flag) {
                axios.get('/articles/chekLiked', {
                    params: {
                        aid
                    }
                }).then(result => {
                    let res = result.data;
                    if(res.status == '11') {
                        this.unlike = false;
                    } else {
                         this.unlike = true;
                    }
                })
            }
        },
        addComment(cId, toId) {
            let aid = this.$route.params.id;
            axios.post('/articles/addComment', {
                articleId: aid,
                content: this.commentInput,
                commentId: cId,
                to: toId
            }).then(result => {
                let res = result.data;
                if (res.status == '0') {
                    this.commentInput = '';
                    this.getComments();
                }
            }).catch(err => {
                consloe.log(err)
            }) 
        
           
        },
        toReply() {
           this.showInput = true;

        },
        updateLike() {
            let aid = this.$route.params.id;
            let option = 'add';
            if(this.unlike == false) {
                option = 'drop'
            }
            axios.post('/articles/updateLike', {
                articleId: aid,
                option
            }).then(result => {
                let res = result.data;
                if(res.msg == 'added') {
                    this.unlike = false;
                    this.arLike += 1;
                }
                else if(res.msg == 'droped') {
                    this.unlike = true;
                    this.arLike -= 1;
                }
            })  
        },
        test(key) {
            console.log(key)
        }
    }
    
}
</script>

<style scoped>
.w {
    margin-top: 20px;
}
.title {
    text-align: center;
}
.title h2 {
    font-size: 30px;
}
.ar_info{
    display: flex;
    text-align: center;
    justify-content: center;
    margin-top: 8px;
}
.ar_content {
    margin-top: 35px;
    letter-spacing: 1px;
    padding: 0 30px;
    line-height: 2em;
}
.ar_info div:last-child {
    margin-left: 10px;
}
.comments_box {
    width: 700px;
    margin:0 auto;
    margin-top: 90px;
}
.upload {
    display: flex;
    margin-bottom: 22px;
}
.tip {
    display: flex;
    align-items: center;
}
.tip h3{
font-size: 23px;
margin-bottom: 12px;
}
.tip div:last-child {
 color: #ccc;
}
.list_content .main {
    display: flex;
    margin-top: 25px;
}
.list_content .main img{
    display: block;
    width: 70px;
    height: 70px;
    border-radius: 50%;
}
.list_content .main{
    align-items: center;
}
.list_content .main .info {
    margin-left: 10px;
}
.list_content .main .info span:first-child {
    color: #379be9;
    font-weight: bold;
    margin-right: 10px;
}
.list_content .main .info span:last-child {
    font-size: 6px;
    color: #999;
}
.below {
    margin-left: 80px;
    background-color: #f7f7f7;
    padding: 8px 16px 10px;
    border: 1px solid #cac0c0;
    margin-top: 10px;
}
.ignore {
    color: #999;
}
.reply_name {
    font-weight: bold;
}
.reply_item {
    margin-top:  3px;
}
.reply {
    color: #999;
   font-size: 10px;
}
.reply:hover {
    color: #379be9;
}
.like_box {
    text-align: center;
    margin-top: 30px;
}
.like_box img {
    display: block;
    width: 50px;
    height: 50px;
    margin: 0 auto;
}
.reply_input {
    margin-left: 80px;
}
.reply_input:hover {
    color: #379be9;
    cursor: pointer;
}
.unliked {
    -webkit-filter: grayscale(100%); /* Chrome, Safari, Opera */
    filter: grayscale(100%);
}

</style>