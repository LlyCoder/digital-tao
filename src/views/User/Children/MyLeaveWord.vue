<template lang="html">
    <div>
        <shelf title="我的留言">
            <div slot="content">
                <el-tabs type="border-card">
                    <el-tab-pane label="我的接收">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">时间</th>
                                    <th scope="col">发送者</th>
                                    <th scope="col">留言内容</th>
                                    <th scope="col">咨询商品</th>
                                    <th scope="col">操作</th>
                                </tr>
                            </thead>
                            <tbody v-for="(item,index) in tomeLsit" :key=index>
                                <tr>
                                    <th scope="row">{{index+1}}</th>
                                    <td>{{item.sendDate | simpleDate}}</td>
                                    <td>{{item.from.userName}}</td>
                                    <td>{{item.content | sliceAbs}}</td>
                                    <td>{{item.goods.productName}}</td>
                                    <td>
                                        <router-link :to="{path:'replyMsg/'+ item._id, params: item._id}">查看</router-link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </el-tab-pane>
                    <el-tab-pane label="我的发送">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">时间</th>
                                    <th scope="col">发送给</th>
                                    <th scope="col">留言内容</th>
                                    <th scope="col">咨询商品</th>
                                    <th scope="col">操作</th>
                                </tr>
                            </thead>
                            <tbody v-for="(item,index) in toOtherLsit" :key=index>
                                <tr>
                                    <th scope="row">{{index+1}}</th>
                                    <td>{{item.sendDate | simpleDate}}</td>
                                    <td>{{item.to.userName}}</td>
                                    <td>{{item.content | sliceAbs}}</td>
                                    <td>{{item.goods.productName}}</td>
                                    <td>
                                        <router-link :to="{path:'replyMsgOth/'+ item._id, params: item._id,query:{me:true}}">查看</router-link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </el-tab-pane>
                </el-tabs>
                
            </div>

        </shelf>
        <!-- <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="delArticle">确 定</el-button>
            </span>
        </el-dialog> -->
    </div>
</template>

<script>
    import Shelf from '@/components/Shelf'
    import axios from 'axios'
    export default {
        data() {
            return {
                dialogVisible: false,
                tabPosition: 'left',
                tomeLsit: [],
                toOtherLsit: []
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
            this.getTome();
            this.getToOtherLsit();
        },
        filters: {
            sliceAbs: (abs) => {
                return abs.slice(0, 9) + ' ...'
            }
        },
        methods: {
            getTome() {
                axios.get('/users/getTome').then(result => {
                    let res = result.data;
                    if (res.status == '0') {
                        this.tomeLsit = res.result;
                    }
                })
            },
            getToOtherLsit() {
                axios.get('/users/getToOther').then(result => {
                    let res = result.data;
                    if (res.status == '0') {
                        this.toOtherLsit = res.result;
                    }
                })
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => { });
            }
           
        }
    }
</script>

<style lang="css" scoped src="../../../../node_modules/_bootstrap@4.1.1@bootstrap/dist/css/bootstrap.min.css">
</style>
<style scoped>
    tr {
        font-size: 12px;
    }
    td {
        width: 22%;
    }
</style>