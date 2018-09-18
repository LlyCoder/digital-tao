<template lang="html">
  <div>
    <nav-header></nav-header>
    <nav-bread>
      <!-- 插入内容到默认插槽 -->
      <span>商品详情</span>
    </nav-bread>
    <div class="container detail-container">
      <ul class="samll-pic-container">
        <li v-for="item in previewImg" :class="{on:big===item}" @click="big=item">
          <img v-lazy="'http://localhost:3000/images/goods/'+ item">
        </li>
      </ul>
      <div class="big-pic">
        <img v-lazy="'http://localhost:3000/images/goods/'+ big" alt="">
      </div>
      <div class="product-info">
        <div class="proTitle"> 
          <h3>{{productInfo.productName}}</h3>
        </div>
        <div class="proIntro">
          <div><span class="gextil">发布者: </span><span class="pubhre" @click="leaveMsg">{{productInfo.owner.userName}}</span></div>
          <div style="margin-top: 3px;"><span class="gextil">发布时间：</span>{{productInfo.publishDate | toDate}}</div>
        </div>
        <div class="sellerIntro">
          <span class="gextil">卖家简述：</span>
          <span>
            {{productInfo.sellerIntro}}
          </span>
        </div>
        <div class="proPrice">
          <span class="gextil">价格：</span> <span>￥ {{productInfo.salePrice}}</span>
        </div>
        <div class="pro_operation">
          <el-button type="danger" plain @click="leaveMsg">给卖家留言</el-button>
          <el-button type="danger" plain @click="addCart">加入购物车</el-button>
        </div>
      </div>
    </div>
    <nav-footer></nav-footer>
    <modal v-bind:mdShow="mdShow" v-on:close="closeModal">
      <p slot="message">
        请先登录
      </p>
      <div slot="btnGroup">
        <a class="btn btn--m" @click="mdShow = false">关闭</a>
      </div>
    </modal>
    <modal v-bind:mdShow="mdShowCart" v-on:close="closeModal">
      <p slot="message">
        <svg class="icon-status-ok">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
        </svg>
        <span>加入购物车成!</span>
      </p>
      <div slot="btnGroup">
        <a class="btn btn--m" href="javascript:;" @click="mdShowCart = false">继续购物</a>
        <router-link class="btn btn--m btn--red" href="javascript:;" to="/cart">查看购物车</router-link>
      </div>
    </modal>
    <div class="leave_msg_container" v-show="msgShow">
      <el-input
        class="msg_content"
        type="textarea"
        :rows="5"
        placeholder="请输入留言内容"
        v-model="leaveMsgContent">
      </el-input>
      <el-button type="primary" round class="msg_btn" @click="sendLeaveMsg">发送</el-button>
    </div>
    <div class="md-overlay" v-show="overLayFlag" @click="msgShow=false;overLayFlag=false;"></div>
  </div>
</template>

<script>
import NavHeader from '@/components/NavHeader'
import NavBread from '@/components/NavBread'
import NavFooter from '@/components/NavFooter'
import Modal from '@/components/Modal'
import axios from 'axios'


export default {
  data() {
    return {
      previewImg: [],
      productInfo: {},
      big: '',
      mdShow: false,
      mdShowCart: false,
      leaveMsgContent: '',
      overLayFlag: false,
      msgShow: false
    }
  },
  components: {
    NavHeader,
    NavBread,
    NavFooter,
    Modal
  },
  mounted () {
    this.getGoodsDetail();
  },
  methods: {
    getGoodsDetail() {
      let productId = this.$route.query.productId;
      axios.get('/goods/goodsDetail', {
        params: {
          productId: productId
        }
      }).then(response => {
        let res = response.data;
        if(res.status == '0') {
          this.previewImg = res.result.previewImg;
          this.big = this.previewImg[0];
          this.productInfo = res.result;
        }
      }).catch(err => {
        console.log(err)
      }) 
    },
    closeModal() {
      //用于接收子组件触发
      this.mdShow = false;
      this.mdShowCart = false;
    },
    checkLogin() {
      let flag = document.cookie.indexOf("userId")>-1?true:false;
      if(!flag) {
        this.mdShow = true;
        return false;
      } else {
        return true;
      }
    },
    addCart() {
      if(!this.checkLogin()) {
        return;
      } else {
        let productId = this.$route.query.productId;
        axios.post('/goods/addCart',{
        productId: productId
        }).then((res) => {
        res = res.data;
        if(res.status == '0') {
          this.mdShowCart = true;
          this.$store.commit("updateCartCount",1);
        } else {
          this.mdShow = true;
        }
      });
      }     
    },
    leaveMsg() {
      if(this.checkLogin()) {
        this.overLayFlag = true;
        this.msgShow = true;
      }
      else {
        this.mdShow = true;
      }
    }, 
    sendLeaveMsg() {
      axios.post('/users/addLeaveMsg', {
        goods: this.productInfo._id,
        to: this.productInfo.owner._id,
        content: this.leaveMsgContent
      }).then(result => {
        let res = result.data;
        if(res.status == '0') {
          this.msgShow=false;
          this.overLayFlag=false;
          this.$message({
            message: '留言成功',
            type: 'success'
        });
        } else {
          this.$message.error('很抱歉，未能成功留言');
        }
      }).catch(err => {
        console.log(err);
      })
    }
  }
}
</script>

<style lang="css" scoped>
.detail-container {
  height: 48rem;
  background: #fff;
  margin-top: 2rem;
  padding: 5.5rem;
  border-radius: 2.5rem;
  box-shadow: 0 3px 8px -6px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0 3px 8px -6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.samll-pic-container {
  width: 10%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.samll-pic-container li {
  border: .1rem solid #f0f0f0;
  border: .1rem solid rgba(0, 0, 0, .06);
  border-radius: 5px;
  cursor: pointer;
  width: 6rem;
  height: 6rem;
  margin-top: 2rem;
  background: #fff;
  padding: 1rem;
  display: flex;
  align-items: center;
}
.samll-pic-container li:first-child {
  margin-top: 0;
}
.samll-pic-container img {
display: block;
height: 4rem;
width: 4rem;
margin: 0 auto;
}
.big-pic {
  width: 40%;
  height: 100%;
  padding: 2rem;
}
.big-pic img {
  display: block;
  width: 38rem;
  height: 38rem;
}
.product-info  {
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* background: #fff; */
  padding: 2rem;
}
.product-info .proTitle {
  font-size: 2rem;
  margin: 0 auto;
}
.product-info .proTitle h3 {
  text-align: center;
}
.proPrice {
  margin-top: 3rem;
}
.proPrice span:last-child {
  color: red;
  font-size: 3rem;
}
.pro_operation {
 display: flex;
 justify-content: space-around;
 margin-top: 4rem;
}
.on {
  border: .3rem solid rgba(211, 18, 50, 0.2)!important;
}
.leave_msg_container {
  position: fixed;
  z-index: 5000;
  top: 35%;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 40rem;
}

.msg_btn {
  margin-top: .2rem;
  float: right;
  background: #f56c6c;
}
.gextil {
  color: #f56c6c;
  font-weight: 700;
  font-size: 16px;
}
.pubhre {
  font-size: 15px;
  color:  #187cf7;
  cursor: pointer;
}
.pubhre:hover {
  text-decoration: underline;
  color: #aebed2;
}

</style>
