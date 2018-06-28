<template lang="html">
    <div>
        <nav-header></nav-header>
        <nav-bread>
            <span>文章列表</span>
        </nav-bread>
        <div class="container">
            <div>
                <ul>
                    <li v-for="(item,index) in articleList" :key="index"  class="info_container">
                        <img @click="goToDetail(item._id)" :src="'http://localhost:3000/images/articles/'+item.articleImg" class="article_img">
                        <div class="artile_info">
                            <div>
                                <h3 @click="goToDetail(item._id)">{{item.articleTitle}}</h3>
                            </div>
                            <div style="margin-top: 3px;">
                                <span class="fa fa-user-circle"></span><span>{{item.publisher.userName}}</span> &nbsp;
                                <span class="fa fa-clock-o"></span><span>{{item.publishDate | toDate}}</span>
                            </div>
                            <div class="abstract">{{item.abstract}}</div>
                            <div class="go_detail_btn">
                                <router-link :to="{path:'/article/'+item._id, params: item._id}">继续阅读...</router-link>
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="pagination">
                    <el-pagination :page-sizes="[1,2,3,5]"
                        :current-page="page"
                        :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount"
                         @current-change="changePage"
                         @size-change="changeSize">
                    </el-pagination>
                </div>
                <!-- <button @click="test">55555</button> -->
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
    export default {
        data() {
            return {
                totalCount: 0,
                page: 1,
                pageSize: 3,
                articleList: []
            }
        },
        mounted() {
            this.getList();
        },
        components: {
            NavHeader,
            NavFooter,
            NavBread
        },
        //！！！！解决路由跳转视图不刷新的问题！！
        watch: {
            '$route'() {
                this.getList();
            }
        },
        methods: {
            getList() {
                axios.get('/articles/getList',{
                    params: {
                        page: this.page,
                        pageSize: this.pageSize
                    }
                }).then(result => {
                    let res = result.data.result;
                    this.articleList = res.list;
                    this.totalCount = res.totalCount;
                })
            },
            changeSize(pageSize) {
                this.pageSize = pageSize;
                this.getList();
            },
            changePage(currentPage) {
                console.log(currentPage);
                this.page = currentPage;
                
                this.$router.push({path: '/page/'+ this.page});
                
            },
            goToDetail(id) {
                this.$router.push({path: '/article/'+id, params: id});
            },
            test() {
                console.log(this.page)
            }
        }
    }
</script>

<style scoped>
.info_container {
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #e9e9e9;
    padding-bottom: 20px;
    margin-top: 30px;
}
.article_img {
    display: block;
    width: 230px;
    height: 180px;
    cursor: pointer;
}
.artile_info  {
    margin-left: 10px;
    padding-left: 50px;
}
.artile_info div:first-child {
    font-size: 20px;
}
.artile_info div:first-child:hover{
    color: #4482ea;
}
.artile_info h3 {
    cursor: pointer;
}
.abstract {
    /* width: 100%; */
    height: 90px;
    overflow: hidden;
    font-size: 14px;
    margin-top: 15px;
    letter-spacing: 1.5px;
}
.go_detail_btn {
    font-size: 13px;
    color: #0366d6;
}
.pagination {
    width: 600px;
    margin: 0 auto;
    margin-top: 30px;
}
</style>