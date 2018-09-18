<template>
    <div>
        <el-table ref="singleTable" :data="tableData" highlight-current-row @current-change="handleCurrentChange" style="width: 100%">
            <el-table-column type="index" width="50">
            </el-table-column>
            <el-table-column label="商品封面" width="210" align="center">
                <template slot-scope="scope"><img class="pre" :src="'http://localhost:3000/images/goods/'+scope.row.productImage"
                        alt=""></template>
            </el-table-column>
            <el-table-column property="productName" label="商品标题" width="180" align="center">
            </el-table-column>
            <el-table-column property="salePrice" label="商品价格" width="180" align="center">
            </el-table-column>
            <el-table-column property="owner.userName" label="发布者" width="180" align="center">
            </el-table-column>
            <el-table-column label="发布日期" width="150">
                <template slot-scope="scope">{{ scope.row.publishDate | simpleDate}}</template>
            </el-table-column>
            <el-table-column label="最近更新" width="150">
                <template slot-scope="scope">{{ scope.row.updateDate | timeAgo}}</template>
            </el-table-column>
            <el-table-column label="操作" width="300" align="center" fixed="right">
                <template slot-scope="scope">
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
            }
        },
        created() {
            this.init();
        },
        methods: {
            init() {
                axios.get('/admins/getGsCList').then((re) => {
                    let res = re.data;
                    this.tableData = res.result;
                })
            },
            handleCurrentChange() {

            },
            handleStatus(index, row, option) {
                const id = row._id;
                axios.post('/admins/updateGoodStatus', {
                    id,
                    option
                }).then(result => {
                    let res = result.data;
                    if (res.status == 'suc') {
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

            }
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