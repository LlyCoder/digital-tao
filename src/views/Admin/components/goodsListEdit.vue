<template>
    <div>
        <el-table ref="multipleTable" :data="goodsList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="60">
            </el-table-column>
            <el-table-column label="商品标题" prop="productName" width="190" align="center">
            </el-table-column>
            <el-table-column label="商品价格" prop="salePrice" width="150" align="center">
            </el-table-column>
            <el-table-column label="发布者" prop="owner.userName" width="180" align="center">
            </el-table-column>
            <el-table-column label="创建日期" width="160">
                <template slot-scope="scope">{{ scope.row.publishDate | simpleDate}}</template>
            </el-table-column>
            <el-table-column label="最近更新" width="160">
                <template slot-scope="scope">{{ scope.row.updateDate | timeAgo}}</template>
            </el-table-column>
            <el-table-column label="操作" width="190" align="center" fixed="right">
                <template slot-scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--工具条-->
        <div class="tools">
            <el-button type="danger" @click="batchRemove" :disabled="this.multipleSelection.length===0">批量删除</el-button>
            <el-pagination layout="prev, pager, next" background @current-change="handleCurrentChange" :page-size="pageSize" :total="total">
            </el-pagination>
        </div>

    </div>
</template>
<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                goodsList: [],
                //多选项存储
                multipleSelection: [],
                page: 1,
                pageSize: 20,
                total: 0
            }
        },
        created() {
            this.init();
        },
        methods: {
            init() {
                axios.get('/admins/getGoodsList', {
                    params: {
                        page: this.page,
                        pageSize: this.pageSize
                    }
                }).then(result => {
                    let res = result.data.result;
                    this.goodsList = res.list;
                    this.total = res.totalCount;
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                console.log(this.multipleSelection);
            },
            handleEdit(index, row) {
                this.$router.push({ path: 'editGoSingle', query: { goodsId: row.productId } });
            },
            batchRemove() {
                //获取所选对象的id数组
                const delList = this.multipleSelection.map(item => item._id);
                console.log(delList);
                this.$confirm('此操作将永久删除所勾选的商品, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.post('/admins/delGoods', {
                        delList
                    }).then(res => {
                        if (res.data.status == 'suc') {
                            this.$message({
                                type: 'success',
                                message: '删除列表成功!'
                            });
                            this.init();
                        }
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            handleDel(index, row) {
                const _id = row._id;
                console.log(_id);
                this.$confirm('此操作将永久删除该商品, 是否继续?', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.post('/admins/delGoods', {
                        delList: [_id]
                    }).then(res => {
                        if (res.data.status == 'suc') {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.init();
                        }
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            handleCurrentChange(val) {
                this.page = val;
                this.init();
            },
        }
    }
</script>
<style scoped>
    .tools {
        display: flex;
        justify-content: space-between;
        margin-top: 2rem;
        width: 100%;
        background: #fff;
        padding: 1rem 2rem;
    }
</style>