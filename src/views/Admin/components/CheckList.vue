<template>
    <div>
        <el-table ref="singleTable" :data="tableData" highlight-current-row @current-change="handleCurrentChange" style="width: 100%">
            <el-table-column type="index" width="50">
            </el-table-column>
            <el-table-column label="标题图片" width="200" align="center">
                <template slot-scope="scope"><img class="pre" :src="'http://localhost:3000/images/articles/'+scope.row.articleImg" alt=""></template>
            </el-table-column>
            <el-table-column property="articleTitle" label="文章标题" width="180" align="center">
            </el-table-column>
            <el-table-column property="publisher.userName" label="姓名" width="180" align="center">
            </el-table-column>
            <el-table-column label="创建日期" width="150">
                <template slot-scope="scope">{{ scope.row.publishDate | simpleDate}}</template>
            </el-table-column>
            <el-table-column label="最近更新" width="150">
                <template slot-scope="scope">{{ scope.row.updateDate | timeAgo}}</template>
            </el-table-column>
            <el-table-column label="操作" width="300" align="center" fixed="right">
                <template slot-scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
                    <el-button type="success" size="small" @click="handleStatus(scope.$index, scope.row, 'pass')">通过</el-button>
                    <el-button type="danger" size="small" @click="handleStatus(scope.$index, scope.row, 'ban')">退回</el-button>
                </template>
            </el-table-column>
        </el-table>   
    </div>
</template>
<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                tableData: [],
                pageSize: 20
            }
        },
        created() {
           this.init();
        },
        methods: {
            init() {
                axios.get('/admins/getCheckList').then((re) => {
                    let res = re.data;
                    this.tableData = res.result;
                })
            },
            handleCurrentChange() {
                
            },
            handleStatus(index, row, option) {
                const id = row._id;
                axios.post('/admins/updateStatus', {
                    id,
                    option
                }).then(result => {
                    let res = result.data;
                    if(res.status == 'suc') {
                        this.$message({
                            showClose: true,
                            message: '操作成功！',
                            center: true,
                            type: 'success'
                        })
                        this.init();
                    }
                })
            },
            handleBan(index, row) {

            },
            handleEdit(index, row) {
                this.$router.push({ path: 'editAr', query: { articleId: row._id } });
            },
        }
    }
</script>

<style scoped>
    .pre {
        display: inline-block;
        width: 45px;
        height: 45px;
    }
</style>