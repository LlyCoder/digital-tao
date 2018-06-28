<template lang="html">
  <header class="header">
  <svg style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <symbol id="icon-arrow-short" viewBox="0 0 25 32">
        <title>arrow-short</title>
        <path class="path1" d="M24.487 18.922l-1.948-1.948-8.904 8.904v-25.878h-2.783v25.878l-8.904-8.904-1.948 1.948 12.243 12.243z"></path>
      </symbol>
      <symbol id="icon-status-ok" viewBox="0 0 32 32">
        <title>status-ok</title>
        <path class="path1" d="M22.361 10.903l-9.71 9.063-2.998-2.998c-0.208-0.209-0.546-0.209-0.754 0s-0.208 0.546 0 0.754l3.363 3.363c0.104 0.104 0.241 0.156 0.377 0.156 0.131 0 0.261-0.048 0.364-0.143l10.087-9.414c0.215-0.201 0.227-0.539 0.026-0.754s-0.539-0.226-0.754-0.026z"></path>
        <path class="path2" d="M16 30.933c-8.234 0-14.933-6.699-14.933-14.933s6.699-14.933 14.933-14.933c8.234 0 14.933 6.699 14.933 14.933s-6.699 14.933-14.933 14.933zM16 0c-8.822 0-16 7.178-16 16 0 8.823 7.178 16 16 16s16-7.177 16-16c0-8.822-7.178-16-16-16z"></path>
      </symbol>
      <symbol id="icon-cart" viewBox="0 0 38 32">
        <title>cart</title>
        <path class="path1" d="M37.759 0h-4.133c-0.733 0.004-1.337 0.549-1.434 1.255l-0.546 4.342c-0.081 0.484-0.496 0.849-0.997 0.849-0.005 0-0.009-0-0.014-0h-27.604c-0.003 0-0.007-0-0.011-0-1.674 0-3.031 1.357-3.031 3.031 0 0.34 0.056 0.666 0.159 0.971l2.52 8.062c0.385 1.194 1.486 2.043 2.785 2.043 0.126 0 0.25-0.008 0.372-0.023l22.983 0.002c0.515 0.131 0.626 0.768 0.626 1.283 0.005 0.044 0.009 0.095 0.009 0.146 0 0.501-0.294 0.933-0.718 1.134l-22.439 0.003c-0.354 0-0.642 0.287-0.642 0.642s0.287 0.642 0.642 0.642h22.745l0.131-0.071c0.919-0.392 1.551-1.287 1.551-2.33 0-0.058-0.002-0.116-0.006-0.173 0.021-0.108 0.033-0.24 0.033-0.376 0-1.072-0.732-1.973-1.724-2.23l-23.357-0.004c-0.063 0.008-0.135 0.013-0.209 0.013-0.719 0-1.332-0.455-1.566-1.093l-2.53-8.095c-0.048-0.154-0.076-0.332-0.076-0.515 0-0.973 0.782-1.764 1.752-1.778h27.657c1.159-0.004 2.112-0.883 2.232-2.011l0.547-4.345c0.010-0.083 0.078-0.147 0.161-0.152l4.133-0c0.354 0 0.642-0.287 0.642-0.642s-0.287-0.642-0.642-0.642z"></path>
        <path class="path2" d="M31.323 9.69c-0.022-0.003-0.048-0.004-0.074-0.004-0.328 0-0.598 0.248-0.633 0.567l-0.809 7.268c-0.003 0.022-0.004 0.048-0.004 0.074 0 0.328 0.248 0.598 0.567 0.633l0.074 0c0.001 0 0.003 0 0.004 0 0.327 0 0.596-0.246 0.632-0.563l0.809-7.268c0.003-0.022 0.004-0.048 0.004-0.074 0-0.328-0.248-0.598-0.567-0.633z"></path>
        <path class="path3" d="M27.514 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM27.514 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
        <path class="path4" d="M9.599 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM9.599 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
      </symbol>
    </defs>
  </svg>
    <div class="navbar">
        <div class="navbar-left-container">
          <router-link to='/'>
            <img class="navbar-brand-logo" src="/static/logo.png">
          </router-link>
          <ul class="router-nav">
            <li><router-link to="/" @click="changePage(1)" :class="{active:choosePage===1}">首页</router-link></li>
            <li><router-link to="/article" @click="changePage(2)" :class="{active:choosePage===2}">数码评测</router-link></li>
            <li><router-link to="/aboutUs" @click="changePage(3)" :class="{active:choosePage===3}">关于我们</router-link></li>
          </ul>
        </div>
        <div class="navbar-right-container" style="display: flex;">
          <div class="navbar-menu-container">
            <!-- <span class="navbar-link" v-text="nickName" v-if="nickName"></span> -->
            <a href="javascript:void(0)" class="navbar-link" @click="loginModalFlag=true;toggleOverlay()" v-if="!nickName"><img src="/static/user.svg" class="user_ico"></a>
            <div class="user_menu" v-else>
              <img class="userIco" src="/static/user.svg" @mouseover="userNavShow=true;">
              <div class="user-menu-outer" v-if="userNavShow">
                <img src="static/arrow-up.svg" class="arrow">
                <ul class="user_menu_nav" @mouseleave="userNavShow=false">
                  <li>
                    <img :src="'http://localhost:3000/images/userIco/'+userIco" class="user_des_ico">
                    <div class="">
                      {{nickName}}
                    </div>
                  </li>
                  <li><router-link to="/user/orderList">我的订单</router-link></li>
                  <li><router-link to="/user/information">我的资料</router-link></li>
                  <li><router-link to="/user/mySale">我的出售</router-link></li>
                  <li><router-link to="/user/myArticle">我的文章</router-link></li>
                  <li><router-link to="/user/myLeaveWord">我的留言</router-link></li>
                  <li><a href="javascript:void(0)" @click="logOut()">退出登录</a></li>
                </ul>
              </div>
            </div>
            <div class="navbar-cart-container">
              <span class="navbar-cart-count" v-if="cartCount">{{cartCount}}</span>
              <span class="navbar-link navbar-cart-link toCart" @click="goToCart()">
                <svg class="navbar-cart-logo">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-cart"></use>
                </svg>
              </span>
            </div>
          </div>
        </div>
    </div>
    <!-- 登录 -->
    <div class="md-modal  modal-msg  md-modal-transition" v-bind:class="{'md-show':loginModalFlag}">
      <div class="md-modal-inner">
        <div class="md-top">
          <div class="md-title">登录</div>
          <button class="md-close" @click="loginModalFlag=false;overlayFlag=false;">Close</button>
        </div>
        <div class="md-content">
          <div class="confirm-tips">
            <div class="error-wrap">
              <span class="error error-show" v-show="errorTip">{{errMsg}}</span>
            </div>
            <ul>
              <li class="regi_form_input">
                <i class="icon IconPeople"></i>
                <input type="text" tabindex="1" name="loginId" v-model="userId" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="请输入账号" @focus="errorTip=false">
              </li>
              <li class="regi_form_input noMargin">
                <i class="icon IconPwd"></i>
                <input type="password" tabindex="2"  name="password" v-model="userPwd" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="请输入密码" @keyup.enter="login" @focus="errorTip=false">
              </li>
            </ul>
          </div>
          <div class="login-wrap">
            <a href="javascript:;" class="btn-login" @click="login">登  录</a>
          </div>
        </div>
        <div class="md-bottom">
          <div class="account-guide">
            <span>没有账号？</span><a href="javascript:void(0)" @click="ToRegister()">注册</a>
          </div>
        </div>
      </div>
    </div>
    <!-- 注册 -->
    <div class="md-modal  modal-msg  md-modal-transition" v-bind:class="{'md-show':registerModalFlag}">
      <div class="md-modal-inner">
        <div class="md-top">
          <div class="md-title">注册</div>
          <button class="md-close" @click="overlayFlag=false;registerModalFlag=false;">Close</button>
        </div>
        <div class="md-content">
          <div class="confirm-tips">
            <ul>
              <li class="regi_form_input">
                <i class="icon IconPeople"></i>
                <input type="text" tabindex="1" name="loginname" class="regi_login_input" placeholder="昵称"  v-model="newUserNickName" @blur="checkReInfo(1)">
                <div class="errInputTip" v-show="nickNameErr">昵称不能为空！</div>
              </li>
              <li class="regi_form_input">
                <i class="icon IconPeople"></i>
                <input type="text" tabindex="1" name="loginname" class="regi_login_input" placeholder="账号"  v-model="newUserId" @blur="checkReInfo(2)">
                <div class="errInputTip" v-show="idErrTip">账号必须是7-12位的纯数字</div>
              </li>
              <li class="regi_form_input">
                <i class="icon IconPwd"></i>
                <input type="password" tabindex="2"  name="password" class="regi_login_input" placeholder="密码" v-model="newUserPwd" @blur="checkReInfo(3)">
                <div class="errInputTip" v-show="pwdErrTip">密码必须由数字，字母或特殊字符组成，且不少于8位</div>
              </li>
              <li class="regi_form_input">
                <i class="icon IconPwd"></i>
                <input type="password" tabindex="2"  name="password" class="regi_login_input" placeholder="确认密码" v-model="rePwd" @blur="checkReInfo(4)">
                <div class="errInputTip" v-show="pwdReErr">两次输入的密码不相同</div>
              </li>
              <li class="regi_form_input extraw">
                <input type="text" name="captcha" class="regi_login_input extra" placeholder="验证码" v-model="capInput"> <span class="captcha" v-html="captcha" @click="this.getCaptcha"></span>
              </li>
            </ul>
          </div>
          <div class="login-wrap">
            <a href="javascript:;" class="btn-login" @click="checkRegister()">注  册</a>
          </div>
        </div>
        <div class="md-bottom">
          <div class="account-guide">
            <span>已有账号？</span>  <a href="javascript:void(0)" @click="registerModalFlag=false;loginModalFlag=true">直接登录</a>
          </div>
        </div>
      </div>
    </div>
    <modal v-bind:mdShow="mdShow" v-on:close="closeModal">
      <p slot="message">
        请先登录
      </p>
      <div slot="btnGroup">
        <a class="btn btn--m" @click="mdShow = false">关闭</a>
      </div>
    </modal>
    <div class="md-overlay" v-if="overlayFlag" @click="overCloseModal()"></div>
</header>
</template>

<script>
import './../assets/css/login.css'
import axios from 'axios'
import Modal from '@/components/Modal'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      userId: '',
      userPwd: '',
      errorTip: false,
      loginModalFlag: false,
      registerModalFlag: false,
      overlayFlag: false,
      nickName: '',
      userIco: '',
      newUserNickName: '',
      newUserId: '',
      newUserPwd: '',
      rePwd: '',
      capInput: '',
      errMsg:'用户名或者密码错误',
      userNavShow: false,
      mdShow: false,
      choosePage: 1,
      captcha: '',
      nickNameErr: false,
      idErrTip:false,
      pwdErrTip: false,
      pwdReErr: false
    }
  },
  components: {
    Modal
  },
  mounted() {
    this.checkLogin();
    this.getPage();
  },
  computed: {
    // ...mapState(['userInfo.cartCount'])
    cartCount() {
      return this.$store.state.userInfo.cartCount;
    }
  },
  watch: {
  
  },
  methods: {
    checkLogin() {
      axios.get('users/checklogin').then((response) => {
        let res = response.data;
        if(res.status == '0') {
          this.nickName = res.result.userName;
          this.userIco = res.result.userIco;
          this.getCartCount();
        }
      });
    },
    login() {
      if(!this.userId || !this.userPwd) {
        this.errorTip = true;
        return;
      }
      axios.post('/users/login', {
        userId: this.userId,
        userPwd: this.userPwd
      }).then((response) => {
        let res = response.data;
        if(res.status == '0') {
          this.errTip = false;
          this.loginModalFlag = false;
          this.overlayFlag = false;
          this.$message({
           message: '恭喜你，登录成功！',
           type: 'success',
           center: true,
           duration: 2000
         });
          this.nickName = res.result.userName;
          this.userIco = res.result.userIco;
          this.getCartCount();
        } else {
          this.errorTip = true;
        }
      });
    },
    logOut() {
      axios.post("/users/logout").then((response) => {
        let res = response.data;
        if(res.status == '0') {
          this.nickName = '';
          //this.$store.commit('')
          //console.log(`nickName: ${this.nickName}`);
          this.$store.commit('updateCartCount',-(this.cartCount));
          this.$message({
           message: '成功退出！',
           type: 'success',
           center: true,
           duration: 2000
         });
         this.$router.push('/');
          }
        });
    },
    register() {
      //console.log(this.newUserNickName);
      axios.post('/users/register', {
        newUserNickName: this.newUserNickName,
        newUserId: this.newUserId,
        newUserPwd: this.newUserPwd
      }).then(response => {
        let res = response.data;
        if(res.status == 0) {
          this.$message({
            message: '恭喜你，注册成功！',
            type: 'success',
            center: true,
            duration: 2000
          });
          this.registerModalFlag = false;
          this.loginModalFlag = true;
        }
      });
    },
    checkRegister() {
      if(this.nickNameErr==false && this.idErrTip==false && this.pwdReErr==false && this.pwdErrTip==false) {
        let capInput = this.capInput;
        axios.post('/users/checkRegister', {
          capInput: capInput,
          userId: this.newUserId
        }).then(response => {
          let res = response.data;
          if(res.status == '0') {
            this.register();
          }
          else {
            this.$notify({
              title: '警告',
              message: res.msg,
              type: 'warning'
            });
          }
        })
      } else {
        this.$notify({
          title: '警告',
          message: '请正确填写注册信息！',
          type: 'warning'
        });
      }
    },
    getCartCount() {
      axios.get("users/getCartCount").then((response) => {
        let res = response.data;
        this.$store.commit('initCartCount', res.result);
      });
    },
    ToRegister() {
      this.loginModalFlag = false;
      this.registerModalFlag = true;
      this.errorTip = false;
      this.getCaptcha();
    },
    getCaptcha() {
      axios.get('users/captcha').then(response => {
        let res = response.data;
        this.captcha = res;
      })
    },
    checkReInfo(flag) {
      if(flag === 1) {
        if(this.newUserNickName == '') {
          this.nickNameErr = true;
          return;
        }
        else {
          this.nickNameErr = false;
          return;
        }
      }
      if(flag === 2) {
        let patt = /^[0-9]{7,12}$/;
        if(!patt.test(this.newUserId)) {
          this.idErrTip = true;
          return;
        }
        else {
          this.idErrTip = false;
          return;
        }
      }
      if(flag === 3) {
        let patt = /^(?!^\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{8,}/;
        if(!patt.test(this.newUserPwd)) {
          this.pwdErrTip = true;
          return;
        }
        else {
          this.pwdErrTip = false;
          return;
        }
      }
      if(flag === 4) {
        if(this.newUserPwd !== this.rePwd) {
          this.pwdReErr = true;
          return;
        }
        else {
          this.pwdReErr = false;
          return;
        }
      }
    },
    toggleOverlay() {
      this.overlayFlag = true;
    },
    overCloseModal() {
      this.overlayFlag = false;
      this.loginModalFlag = false;
      this.loginModalFlag = false;
      this.registerModalFlag = false;
    },
    goToCart() {
      let flag = document.cookie.indexOf("userId")>-1?true:false;
      if(flag) {
        this.$router.push({name: 'Cart'});
      } else {
        this.mdShow = true;
      }
    },
    closeModal() {
      //用于接收子组件触发
      this.mdShow = false;
    },
    changePage (v) {
      this.choosePage = v
    },
    getPage () {
      //验证是否满足active class
      const patt = new RegExp('^\/article');
      const patt2 = new RegExp('^\/page');
      if (this.$route.path === '/') {
        this.changePage(1)
      } else if (patt.test(this.$route.path) || patt2.test(this.$route.path)) {
        this.changePage(2)
      } else if (this.$route.path === '/aboutUs'){
        this.changePage(3)
      }
    },
    test() {
      console.log("test")
    }
  }
}
</script>

<style lang="css" scoped>
.md-bottom {
  display: flex;
  margin-top: 1rem;
}
.md-bottom a {
  color: #175199;
}
.user_ico {
  width: 3rem;
  height: 2rem;
}
.user_menu {
  display: flex;
  flex-direction: column;
  background: #fff;
  position: relative;
}

.user-menu-outer{
  align-self: center;
  position: absolute;
  top: 17px;
  z-index: 500000;
}
.userIco {
  display: flex;
  width: 3rem;
  height: 2.3rem;
  align-self: center;
  cursor: pointer;
}
.arrow {
  display: block;
  width: 1rem;
  height: 1rem;
  margin: 0 auto;
  margin-top: .5rem;
}
.user_menu_nav {
  width: 10rem;
  text-align: center;
  color: #666;
  font-size: 14px;
  box-shadow: 10.3rem -0.7rem 17.3rem #888888 inset
}
.user_menu_nav li {
  border-bottom: .2rem solid black;
  padding: .5rem;
}
.user_des_ico{
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
}
.toCart {
  cursor: pointer;
}
.router-nav {
  display: flex;
}
.router-nav a{
  margin-right: 2rem;
  color: #333;
}
.router-nav a:hover {
  padding-bottom: .7rem;
  border-bottom: .2rem solid #d1434a;
}
.active {
  padding-bottom: .7rem;
  border-bottom: .2rem solid #d1434a;
}
.extraw {
  border: none;
}
.extra {
  left: 0;
  width: 40%;
  height: 42px;
  padding-left: 10px;
  border:1px solid #ccc;
}
.captcha {
  position: absolute;
  right: 0;
}
.errInputTip {
  position: absolute;
  left: 0;
  z-index: 300000;
  top: 28px;
  font-size: 8px;
  color: red;
}

</style>
