<template>
    <div class="w">
        <el-container>
            <div class="title">管理员登录</div>
            <el-main>
                <el-form label-position="left" :model="loginForm">
                    <el-form-item>
                        <el-input v-model="loginForm.id" prefix-icon="fa fa-id-card-o"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input prefix-icon="fa fa-key" v-model="loginForm.password" type="password" @keyup.enter.native="login"></el-input>
                    </el-form-item>
                </el-form>
            </el-main>
            <el-footer>
                <el-row type="flex" justify="center">
                    <el-button type="primary" round @click="login">登录</el-button>
                </el-row> 
            </el-footer>     
        </el-container>
        <!-- <button @click="test">测试</button> -->
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'login',
    data() {
        return {
            loginForm: {
                id: '',
                password: ''
            }
        }
    },
    components: {
       
    },
    methods: {
        login() {
            let info = {
                "id": this.loginForm.id,
                "password": this.loginForm.password
            }
            this.$store.dispatch('createToken', info).then((res) => {
                if(res.data.success) {
                    this.$message({
                        message: '登陆成功',
                        type: 'success'
                    });
                    this.$router.push('/admin');
                    sessionStorage.setItem('adminId', res.data.adminId);
                }
            }).catch((err) => {
                this.$notify.error({
                    title: '信息错误',
                    message: '你的登录信息有误！'
                });
                this.$message.error(err.response.data.error)
            })
        },
        test() {
            axios.post('/admins/test', {
               
            })
        }
    }
}
</script>

<style scoped>
    .w {
        margin: 180px auto;
        background: #fff;
        width: 500px;
        border-radius: 5px;
        padding: 35px 35px 15px 35px;
        box-shadow: 0 0 25px #eaeaea;
    }
    .title {
        text-align: center;
        font-size: 25px;
        font-weight: 600;
        margin-bottom: 30px;
    }
    
</style>