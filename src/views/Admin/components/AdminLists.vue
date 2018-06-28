<template>
    <div class="w">
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="name" label="名称" width="180">
            </el-table-column>
            <el-table-column prop="id" label="ID" width="380">
            </el-table-column>
            <el-table-column label="操作" width="300" align="center" fixed="right">
                <template slot-scope="scope">
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row, 'ban')">删除</el-button>
                </template>
            </el-table-column>
            
        </el-table>
        <el-button type="primary" style="margin-top: 15px;" @click="dialogFormVisible=true">新增管理员</el-button>
    
        <el-dialog title="收货地址" :visible="dialogFormVisible" :modal-append-to-body="false" :show-close="false">
            <el-form :model="form">
                <el-form-item label="管理员名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="登录账号" :label-width="formLabelWidth">
                    <el-input v-model="form.id" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="登录密码" :label-width="formLabelWidth">
                    <el-input v-model="form.pwd" auto-complete="off" type="password"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="add()">确 定</el-button>
            </div>
        </el-dialog>
      
      
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                tableData: [],
                dialogFormVisible: false,
                form: {
                    name: '',
                    id: '',
                    pwd: ''
                },
                formLabelWidth: '120px'
            }
        },
        created() {
            this.init()
        },
        methods: {
            init() {
                axios.get('/admins/adminLists').then((re => {
                    if(re.data.status === '0') {
                        this.tableData = re.data.result;
                    }
                }))
            },
            add() {
                axios.post('/admins/addAdmin', {
                    id: this.form.id,
                    name: this.form.name,
                    password: this.form.pwd
                }).then(res => {
                    if (res.data.status == 'suc') { 
                        this.dialogFormVisible = false;
                        this.init();
                        this.$message({
                            message: '登陆成功',
                            type: 'success',
                            center: true
                        }); 
                    } else {
                          this.$message.error('错了哦，请待会再试！');
                    }
                })
            },
            handleDel(index, row) {
                const _id = row._id;
                console.log(_id);
                this.$confirm('是否删除该管理员, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.post('/admins/deladmin', {
                        id: _id
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
            }
        }
    }
</script>

<style scoped>
    .w {
        min-height: 800px;
    }
</style>