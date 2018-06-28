<template lang="html">
   <div>
    <shelf title="我的文章">
        <div slot="content">
            <div v-if="this.articleList.length">
                <div class="add_btn">
                    <router-link to="/evaluationPublish">
                        <img src="/static/plus.svg" alt="">
                    </router-link>
                </div>
                <table class="table table-hover">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">文章标题</th>
                            <th scope="col">文章简介</th>
                            <th scope="col">发布时间</th>
                            <th scope="col">状态</th>
                            <th scope="col">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in articleList"> 
                            <th scope="row">{{index+1}}</th>
                            <td>{{item.articleTitle}}</td>
                            <td>{{item.abstract | sliceAbs}}</td>
                            <td>{{item.publishDate | simpleDate}}</td>
                            <td :class="{pass: item.status=='pass', ban: item.status=='ban'}">{{item.status | statusTrans}}</td>
                            <td class="operation_btn">
                                <span><router-link :to="{path: '/editArticle', query: { articleId: item._id}}"><img src="/static/edit.svg" class="ds"></router-link></span>
                                <span @click="dialogVisible = true;articleId = item._id"><img src="/static/del.svg"  class="ds"></span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-else>
                当前还没有发布文章，点击<router-link to="/evaluationPublish">这里</router-link>开始编写你的第一篇文章
            </div>
        </div>
        
    </shelf>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="delArticle">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import Shelf from '@/components/Shelf'
import axios from 'axios'
export default {
    data() {
        return {
            articleList: [],
            dialogVisible: false,
            articleId: ''
        }
    },
    components: {
            Shelf
    },
    // computed: {
    //     abstract: function() {

    //     }
    // },
    created() {
        this.getList()
    },
    filters: {
        sliceAbs: (abs) => {
            return abs.slice(0, 9) + '...'
        },
        statusTrans: (status) => {
            switch(status) {
                case 'pass': 
                    return '通过';
                    break;
                case 'ban':
                    return '未通过';
                    break;
                case 'untreated':
                    return '未处理';
                    break;
            }
                
        }
    },
    methods: {
        getList() {
            axios.get('/users/getMyArticle').then(result => {
                let res = result.data;
                if(res.status == '0') {
                    this.articleList = res.result;
                }
            })
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => { });
        },
        delArticle() {
            this.dialogVisible = false;
            axios.post('/users/delArticle', {
                articleId: this.articleId
            }).then(result => {
                let res = result.data;
                 if (res.status == '0') {
                    this.$message({
                        showClose: true,
                        message: '恭喜你，删除成功！',
                        type: 'success'
                    });
                this.getList();
                } else {
                    this.$message.error('错了哦,我们会修复的哦');
                }
            })
        }
    }
}
</script>

<style lang="css" scoped src="../../../../node_modules/_bootstrap@4.1.1@bootstrap/dist/css/bootstrap.min.css">

</style>
<style scoped>
.operation_btn span img{
    display: inline-block!important;
    width: 20px;
    height: 20px;
}
.operation_btn span:first-child {
    margin-right: 15px;
}
.operation_btn span {
    cursor: pointer;
}
.ds:hover {
    -webkit-filter: drop-shadow(rgb(0, 204, 153) 2px 0px);
/* filter: drop-shadow(rgb(0, 204, 153)); */
}
.add_btn img{
    display: block;
    width: 40px;
    height: 40px;
    float: right;
    margin:10px  30px;
}
.pass {
    color: #2ad62a;
}
.ban {
    color: red;
}
</style>
