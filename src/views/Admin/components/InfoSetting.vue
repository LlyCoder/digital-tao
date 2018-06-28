<template>
    <div class="w">
        <div class="info-item">
            <div class="tip">修改昵称</div>
            <div class="dw">
                <el-input placeholder="请输入新昵称" prefix-icon="el-icon-edit" v-model="name">
                </el-input>
                <el-button type="primary" round @click="updateInfo('name')">修改</el-button>
            </div>
        </div>
        <div class="info-item">
            <div class="tip">修改密码</div>
            <div class="dw">
                <el-input placeholder="请输入新密码" prefix-icon="el-icon-edit" v-model="pwd" type="password">
                </el-input>
                <el-button type="primary" round @click="updateInfo('pwd')">修改</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                name: '',
                pwd: ''
            }
        },
        methods: {
            updateInfo(option) {
                axios.post('/admins/updateInfo', {
                    id: sessionStorage.getItem('adminId'),
                    option: option,
                    name: this.name,
                    pwd: this.pwd
                }).then(res => {
                    if (res.data.status == 'sucName') {
                        this.$store.commit('SET_INFO', this.name);
                        this.$message({
                            message: '修改昵称成功',
                            type: 'success',
                            center: true
                        });
                    } else if (res.data.status == 'sucPwd') {
                          this.$message({
                            message: '修改密码成功，将在下次登录生效',
                            type: 'success',
                            center: true
                        });
                    } else {
                         this.$message.error('错了哦，请待会再试');
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .w {
        margin-top: 50px;
    }
    .w>div {
        margin-bottom: 100px;
    }
    .tip {
        font-size: 25px;
        font-weight: bold;
    }
    .info-item div {
        margin-bottom: 10px;
    }
    .dw {
        width: 900px;
    }
</style>