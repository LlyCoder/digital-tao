<template lang="html">
  <div>
      <shelf title="账户资料">
        <div class="content" slot="content">
          <div class="item">
            <div class="left-img">
              <img v-lazy="'http://localhost:3000/images/userIco/'+userInfo.userIco" alt="userLogo">
              <div class="logo-tip">当前头像</div>
            </div>
            <div class="right-set">
              <span class="edit-word">修改头像</span>
              <div class="ico-btn">
                <form name="uploadForm"
                  id="uploadForm"
                  method="post"
                  enctype="multipart/form-data"
                  action="http://127.0.0.1:3000/users/uploads"
                  target="uploadFrame">
                    <p>
                      <input type="file" name="imageFile" multiple="multiple"/>
                      <input type="hidden" name="userId" :value="userInfo.userId">
                      <input type="submit" id="fileSubmit"  @click="closeWinow();upUserIco()" value="上传" />
                    </p>
                  </form>
                  <iframe id="rfFrame" name="rfFrame" src="about:blank" style="display:none;"></iframe>
              </div>
            </div>
          </div>
          <div class="edit-nickname">
            <div class="nickName-container">
              当前昵称： <span class="nickname">{{userInfo.userName}}</span>
            </div>
            <div class="nickname-input">
              <el-input placeholder="" v-model="newUserName">
                 <template slot="prepend">新昵称：</template>
              </el-input>
              <el-button type="primary" round @click="updateUserName">修改</el-button>
            </div>
            <div class="pwd_edit_container">
              <el-input placeholder="" v-model="newUserPwd">
                <template slot="prepend">新密码：</template>
              </el-input>
              <el-button type="primary" round @click="updatePwd">修改</el-button>
            </div>
          </div>
        </div>
      </shelf>
  </div>
</template>

<script>
import Shelf from '@/components/Shelf'
import axios from 'axios'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      newUserName: '',
      newUserPwd: ''
    }
  },
  computed: {
     userInfo() {
      return this.$store.state.userInfo.userInfo
    }
  },
  components: {
    Shelf
  },
  mounted() {

  },
  methods: {
    closeWinow() {
      document.forms[0].target="rfFrame";
    },
    updateUserName() {
      axios.post('users/updateUserName', {
        newUserName: this.newUserName
      }).then(response => {
        let res = response.data;
        if(res.status == '0') {
          // let userIco = this.userInfo.userIco;
          this.$store.commit("updateUserInfo",{userName:this.newUserName, userIco: this.userInfo.userIco});
           this.$message({
            showClose: true,
            message: '恭喜你，修改成功',
            type: 'success'
          });
        }else {
          alert("修改失败!");
        }
      })
    },
    upUserIco() {
      this.$store.commit("updateUserInfo",{userIco:this.userInfo.userId + '.png'});
      location.reload()
    },
    updatePwd() {
      let patt = /^(?!^\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{8,}/;
      if(!patt.test(this.newUserPwd)) {
        this.$notify.error({
          title: '密码格式错误',
          message: '密码必须由数字，字母或特殊字符组成，且不少于8位。'
        });
        return;
      } else {
        axios.post('/users/updatePwd', {
          newUserPwd: this.newUserPwd
        }).then(result => {
          let res = result.data;
          if(res.status == '0') {
            // axios.post("/users/logout");
            // this.$store.commit('updateCartCount',-(this.cartCount));
            // this.$router.push({'path': '/', 'query': {loginOut: true}});
            this.$message({
            message: '修改密码成功，将在下次登录时生效',
            type: 'success'
           });    
          }
        })
      }
    }
  }
}
</script>

<style lang="css" scoped>
.content {
  padding: 30px;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #dcdcdc;
  border-color: rgba(0,0,0,.14);
  box-shadow: 0 3px 8px -6px rgba(0,0,0,.1);
  border-bottom: none;
}
.left-img img{
  width: 80px;
  height: 80px;
}
.item {
  display: flex;
  flex-direction: row;
  padding-bottom: 80px;
  border-bottom:  1px solid #dcdcdc;
}
.right-set{
  width: 100px;
  margin-left: 120px;
}
.logo-tip {
  width: 80px;
  text-align: center;
}
.right-set span {
  width: 88px;
  margin: 0 auto;
  text-align: center;
}
.edit-word {
  font-size: 18px;
}
.el-upload__tip {
  word-break: keep-all;
}
.edit-nickname {
  width: 100%;
  margin-top: 50px;
  background: #fff;
  /* border-radius: 8px;
  border: 1px solid #dcdcdc;
  border-color: rgba(0,0,0,.14);
  box-shadow: 0 3px 8px -6px rgba(0,0,0,.1); */
}
.nickname {
  font-family: "微软雅黑";
  font-size: 25px;
  font-style: italic;
}
.nickname-input, .pwd_edit_container {
  display: flex;
  flex-direction: row;
  width: 60%;
  margin-top: 10px;
}

</style>
