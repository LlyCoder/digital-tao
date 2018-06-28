<template lang="html">
  <div>
    <nav-header></nav-header>
    <nav-bread>
      <span>个人中心</span>
    </nav-bread>
    <div class="container w">
      <div class="account-sidebar">
        <div class="ac-nav-top">
          <img v-lazy="'http://localhost:3000/images/userIco/'+userInfo.userIco">
          <h3>{{userInfo.userName}}</h3>
        </div>
        <ul class="ac-nav-bottom">
          <li v-for="(item,index) in nav" :class="{current: item.name === title}"  @click="tab(item)">
            <a href="javascript:;">{{item.name}}</a>
          </li>
        </ul>
      </div>
      <div class="account-content">
        <!-- <keep-alive exclude="*"> -->
          <router-view></router-view>
        <!-- </keep-alive> -->
      </div>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavHeader from '@/components/NavHeader'
import NavFooter from '@/components/NavFooter'
import NavBread from '@/components/NavBread'
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      title: '我的订单',
      nav: [
         {name: '我的订单', path: 'orderList'},
         {name: '账户资料', path: 'information'},
         {name: '我的出售', path: 'mySale'},
         {name: '我的点赞', path: 'myCollect'},
         {name: '我的文章', path: 'myArticle'},
         {name: '我的留言', path: 'myLeaveWord'}
       ],
       //nickName: '',
       //userIco: ''
    }
  },
  computed: {
    // ...mapState(['userInfo'])
    userInfo() {
      return this.$store.state.userInfo.userInfo
    }
  },
  mounted () {
    this.getUserInfo();
    console.log(this.$store.state.userInfo)
  },
  watch: {

  },
  components: {
    NavHeader,
    NavFooter,
    NavBread,
  },
  methods: {
    tab(e) {
      this.$router.push({path: '/user/' + e.path})
    },
    getUserInfo() {
      axios.get('users/checklogin').then((response) => {
        let res = response.data;
        if(res.status == '0') {
          this.$store.commit("updateUserInfo",res.result);
        }
      });
    }
  },
  created () {
      let path = this.$route.path.split('/')[2]
      this.nav.forEach(item => {
        if (item.path === path) {
          this.title = item.name
        }
      })
  },
  watch: {
     $route (to) {
       let path = to.path.split('/')[2]
       this.nav.forEach(item => {
         if (item.path === path) {
           this.title = item.name
         }
       })
     }
     // "$route": "getUserInfo"
   }
}
</script>

<style scoped>
.header {
  padding: 0 80px;
}
.nav-breadcrumb-wrap {
  padding: 0 80px;
}
.w {
  margin-top: 25px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 50px;
}
.account-sidebar {
  width: 16%;
  border-radius: 12px;
  /* background: red; */
  box-shadow: 0 3px 8px -6px rgba(0,0,0,.1);
  background: #fff;
}
.account-content {
  width: 80%;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #dcdcdc;
  border-color: rgba(0,0,0,.14);
  box-shadow: 0 3px 8px -6px rgba(0,0,0,.1);
}
.ac-nav-top img{
  /* background: black; */
  display: block;
  width: 130px;
  height: 130px;
  margin: 0 auto;
  border-radius: 50%;
  margin-top: 15px;
}
.ac-nav-top h3{
  display: block;
  text-align: center;
  margin-top: 15px;
  font-size: 20px;
}
.ac-nav-bottom {
  margin-top: 20px;
}
.ac-nav-bottom li {
  border-top: 1px solid #EBEBEB;
  line-height: 50px;
  color: #5079d9;
  font-size: 15px;
  text-align: center;
}
.ac-nav-bottom li:hover {
  background-color: #98AFEE;
  color:#fff;
}

.current {
  background-color: #98AFEE;
  color: #fff;
}
</style>
