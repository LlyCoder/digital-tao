<template>
  <div>
      <div class="header">
          <div class="logo">TAO ADMIN</div>
          <div class="header-right">
              <div class="toggle">
                 
              </div>
              <div class="userinfo">
                <el-dropdown trigger="hover" @command="handleCommand">
                    <span class="name">
                     {{adminInfo}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="setting">设置</el-dropdown-item>
                        <el-dropdown-item divided command="loginOut">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
              </div>
          </div>
      </div>
      <div class="aside">
        <el-menu :default-active="position">
            <el-submenu index="1">
                <template slot="title">
                    <i class="fa fa-file-text-o" aria-hidden="true"></i>
                    &nbsp;&nbsp;
                    <span>文章管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="1-1" @click="$router.push('checkLIst')">审核列表</el-menu-item>
                    <el-menu-item index="1-2" @click="$router.push('editArticle')">文章列表</el-menu-item>
                    <el-menu-item index="1-3" @click="$router.push('publishArticle')">发布文章</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu>
                <template slot="title">
                    <i class="fa fa-mobile" aria-hidden="true"></i>
                    &nbsp;&nbsp;
                    <span>商品管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="3-1" @click="$router.push('goodsCheckLIst')">审核列表</el-menu-item>
                    <el-menu-item index="3-2" @click="$router.push('editGoods')">商品列表</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <i class="fa fa-user-circle" aria-hidden="true"></i>
                    &nbsp;&nbsp;
                    <span>信息维护</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="2-1" @click="$router.push('InfoSetting')">修改资料</el-menu-item>
                    <el-menu-item index="2-2" @click="$router.push('adminLists')">管理员列表</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
      </div>
      <div class="content-container">
        <div class="bread-container">

        </div>
        <router-view></router-view>
      </div>
  </div>
</template>

<script>
   import {mapGetters, mapMutations} from 'vuex'
   import axios from 'axios'
   export default {
       beforeRouteEnter: (to, from, next) => {
           //不能通过this来访问当前实例
           //因为守卫在导航确认前被调用,因此即将登场的新组件还没被创建。不能访问当前实例
           //通过传一个回调给 next来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数。
           next(vm => {
               if(!vm.$store.state.auth.token) {
                    vm.$message({
                       showClose: true,
                       message: '当前未登录！',
                       center: true,
                       type: 'warning'
                    });
                   vm.$router.push('/adminLogin')
               }
           })
       },
       data() {
           return {
               name: '',
               position: '1-1'
           }
       },
       computed: {
           ...mapGetters({
               adminInfo: 'adminInfo'
           })
       },
       created() {
           axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.auth.token;
        //    console.log('tttt：' + this.adminInfo)
            console.log(this.$store)
            this.name = window.sessionStorage['admin-info'];
       },
       methods: {
            handleCommand(cmd) {
                if(cmd === 'loginOut') {
                    this.logout();
                }
                if(cmd === 'setting') {
                    this.$router.push('/admin/InfoSetting');
                    this.position = '2-1';
                }
            },
            logout() {
                this.$confirm('此操作将退出系统, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteToken()
                    this.$router.push('/adminLogin');
                    this.$message({
                        type: 'success',
                        message: '退出成功'
                    });
                }).catch(() => {

                })
        },
        ...mapMutations({
            deleteToken: 'DELETE_TOKEN'
        }),
    }
   }
</script>

<style scoped>
 .header {
    width: 100%;
    height: 55px;
    position: fixed;
    background: #60829c;
    top: 0;
    left: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    color: #fff;
 }
 .logo {
    width: 230px;
    font-size: 22px;
    height: 100%;
    line-height: 55px;
    padding-left: 20px;
    border-right: 1px solid rgba(238, 241, 147, 0.3);
 }
 .header-right {
    width: calc(100% - 230px);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
 }
 .toggle {
    padding: 0px 23px;
    cursor: pointer;
 }
 .userinfo {
    /* display: flex;
    align-items: center; */
    padding-right: 35px;
 }
 .userinfo .name {
     display: inline-block;
     height: 100%;
     line-height: 55px;
     font-size: 18px;
     color: #fff;
 }
 .userinfo img{
    display: block;
    float: right;
    width: 30px;
    height: 30px;
    border-radius: 20px;
    margin: 10px 10px 10px 8px;
 }
 .aside {
    position: fixed;
    top: 55px;
    left: 0;
    bottom: 0;
    padding: 20px 0 20px;
    width: 230px;
    min-width: 45px;
    max-height: 100vh;
    height: calc(100% - 50px);
    z-index: 1;
    background: #fff;
    box-shadow: 0 2px 3px hsla(0,0%,7%,.1), 0 0 0 1px hsla(0,0%,7%,.1);
    overflow-y: auto;
    overflow-x: hidden; 
 }
 .content-container {
    width: calc(100% - 230px);
    padding-top: 75px;
    margin-left: 248px;
    transform: translateZ(0);
 }
</style>
