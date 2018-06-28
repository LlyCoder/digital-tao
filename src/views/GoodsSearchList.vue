<template lang="html">
  <div>
    <nav-header></nav-header>
    <nav-bread>
      <!-- 插入内容到默认插槽 -->
      <span>搜素列表</span>
    </nav-bread>
    <div class="container w">
      <div class="search_tip">
        已为你找到包含“<span class="key_word">{{searchInput}}</span>”的匹配项：
      </div>
      <div class="item-list-wrap" v-if="searchList.length">
        <div class="cart-item">
          <div class="cart-item-head">
            <ul>
              <li>名称</li>
              <li>价格</li>
              <li>发布者</li>
              <li>发布时间</li>
              <li>操作</li>
            </ul>
          </div>
          <ul class="cart-item-list">
            <li v-for="item in searchList">
              <div class="cart-tab-1">
                <div class="cart-item-pic">
                  <img :src="'http://localhost:3000/images/goods/'+item.productImage">
                </div>
                <div class="cart-item-title">
                  <div class="item-name">{{item.productName}}</div>
                </div>
              </div>
              <div class="cart-tab-2">
                <div class="item-price">￥{{item.salePrice}}</div>
              </div>
              <div class="cart-tab-2">
                <div class="item-price-total">{{item.owner.userName}}</div>
              </div>
              <div class="cart-tab-4">
                <div class="item-price-total">{{item.publishDate | toDate}}</div>
              </div>
              <div class="cart-tab-5">
                <div class="cart-item-opration">
                  <el-button type="primary" round class="join_btn">加入购物车</el-button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div v-else>
        <div class="err-tip-container">
          <img src="/static/sorry.jpg">
          <div class="err-tip">非常抱歉，当前还没有用户发布相关商品</div>
        </div>
      </div>
    </div>
    <nav-footer></nav-footer>
    <back-top></back-top>
</div>
</template>

<script>
import NavHeader from '@/components/NavHeader'
import NavBread from '@/components/NavBread'
import NavFooter from '@/components/NavFooter'
import BackTop from '@/components/BackTop'
import Modal from '@/components/Modal'
import axios from 'axios'
export default {
  data() {
    return {
      searchInput: this.$route.query.keyWord,
      searchList: []
    }
  },
  components: {
    NavHeader,
    NavBread,
    NavFooter,
    Modal,
    BackTop
  },
  mounted () {
    this.getSearchList();
  },
  methods: {
    getSearchList() {
      axios.get('/goods/searchList', {
        params: {
          searchInput: this.searchInput
        }
      }).then(result => {
        let res = result.data;
        if(res.status == '0') {
          this.searchList = res.result;
        }
      });
    }
  }
}
</script>

<style lang="css" scoped>
.w {
  margin-top: 20px;
}
.search_tip {
  margin-bottom: 10px;
}
.key_word {
  color: red;
}
.cart-item-head ul li:first-child {
  padding: 0;
  text-indent: -11em;
}
.cart-item-opration > .join_btn {
  border: 1px solid #d1434a;
  color: #d1434a;
  background: #eee;
}
.cart-item-opration > .join_btn:hover {
  background-color: rgba(187, 127, 136, .5);
}
.item-price-total {
  color: #333;
}
.item-price {
  color: red;
}
.owner {
  font-size: 14px!important;
  color: #333;
}
.err-tip-container {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.err-tip-container  img {
  display: block;
  width: 300px;
  height: 300px;
  border-radius: 10px;
}
.err-tip-container .err-tip {
  margin-left: 20px;
  font-size: 30px;
  font-weight: bold;
}
</style>
