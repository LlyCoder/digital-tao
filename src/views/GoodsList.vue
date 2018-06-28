<template lang="html">
  <div>
    <nav-header></nav-header>
    <nav-bread>
      <!-- 插入内容到默认插槽 -->
      <span>商品</span>
    </nav-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <div style="float:left">
            <el-autocomplete
              v-model="searchInput"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入搜索内容"
              @select="handleSelect"
              @keyup.enter.native="goToList"
            ></el-autocomplete>
            <el-button type="primary" icon="el-icon-search" class="search_btn" @click="goToList">搜索</el-button>
          </div>
          <span class="sortby">排序:</span>
          <a href="javascript:void(0)" class="default cur">默认</a>
          <a href="javascript:void(0)" class="price" v-bind:class="{'sort-up':sortFlag}" @click="sortGoods()">价格
            <svg class="icon icon-arrow-short">
              <use xlink:href="#icon-arrow-short"></use>
            </svg>
          </a>
          <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop()">价格筛选</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter" v-bind:class="{'filterby-show':filterBy}">
            <dl class="filter-price">
              <dt>价格区间:</dt>
              <dd><a href="javascript:void(0)" @click="setPriceFilter('all')" v-bind:class="{'cur':priceChecked=='all'}">All</a></dd>
              <dd v-for="(price,index) in priceFilter">
                <a href="javascript:void(0)" @click="setPriceFilter(index)" v-bind:class="{'cur':priceChecked==index}">{{price.startPrice}} - {{price.endPrice}}</a>
              </dd>
            </dl>
            <div class="publish_gs_container" @click="goToPublish">
                <div><div>发布 <br>闲置</div> </div>
                <div><img src="/static/add.svg"></div>
            </div>
          </div>

          <!--  list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="(item,index) in goodsList">
                  <div class="pic">
                    <router-link :to="{path:'goodsDetails',query:{productId:item.productId}}"><img v-lazy="'http://localhost:3000/images/goods/'+item.productImage" alt=""></router-link>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="owner">发布者：{{item.owner.userName}}</div>
                    <div class="price">￥{{item.salePrice}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
              <div class="view-more-normal" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy">
                <img src="./../assets/loading-spinning-bubbles.svg" v-show="loading">
              </div>
            </div>
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
    <modal v-bind:mdShow="mdShowCart" v-on:close="closeModal">
        <p slot="message">
          <svg class="icon-status-ok">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
          </svg>
          <span>加入购物车完成!</span>
        </p>
        <div slot="btnGroup">
          <a class="btn btn--m" href="javascript:;" @click="mdShowCart = false">继续购物</a>
          <router-link class="btn btn--m btn--red" href="javascript:;" to="/cart">查看购物车</router-link>
        </div>
      </modal>
    <div class="md-overlay" v-show="overLayFlag" @click="closePop()"></div>
    <nav-footer></nav-footer>
    <back-top></back-top>
  </div>
</template>

<script>
import './../assets/css/base.css'
import './../assets/css/product.css'
import './../assets/css/login.css'
import './../assets/css/checkout.css'

import NavHeader from '@/components/NavHeader'
import NavBread from '@/components/NavBread'
import NavFooter from '@/components/NavFooter'
import BackTop from '@/components/BackTop'
import Modal from '@/components/Modal'
import axios from 'axios'
export default {
  data() {
    return {
      goodsList: [],
      sortFlag: true,
      page: 1,
      pageSize: 8,
      selectedAdsId: '',
      //默认禁用无限滑动
      busy: true,
      loading: false,
      mdShow: false,
      mdShowCart: false,
      searchInput: '',
      priceFilter: [
        {
          startPrice: '0',
          endPrice: '100'
        },
        {
          startPrice: '100',
          endPrice: '500'
        },
        {
          startPrice: '500',
          endPrice: '1000'
        },
        {
          startPrice: '1000',
          endPrice: '5000'
        }
      ],
      priceChecked: 'all',
      filterBy: false,
      overLayFlag: false
    }
  },
  components: {
    NavHeader,
    NavBread,
    NavFooter,
    Modal,
    BackTop
  },
  mounted: function() {
    this.getGoodsList();
  },
  methods: {
    //传入page验证是否需要累加page
    getGoodsList(flag) {
      let param = {
        page: this.page,
        pageSize: this.pageSize,
        sort: this.sortFlag?1:-1,
        priceLevel: this.priceChecked
      };
      this.loading = true;
      axios.get("/goods/list",{
        params: param
      }).then((result) => {
        let res = result.data;
        this.loading = false;
        if(res.status == '0') {
          if(flag) {
            //flag为true说明是分页，累加list
            this.goodsList = this.goodsList.concat(res.result.list);
            if(res.result.count == 0) {
              this.busy = true;
            } else {
              this.busy = false;
            }
          } else {
            //第一次进入，或者不需要拼接
            this.goodsList = res.result.list;
            this.busy = false;
          }
        } else {
          this.goodsList = [];
        }
      });
    },
    sortGoods() {
      this.sortFlag = !this.sortFlag;
      //every sort must start at page 1
      this.page = 1;
      this.getGoodsList();
    },
    loadMore() {
    //先禁用下划
    this.busy = true;
    //避免下划时无限发送get请求
    setTimeout(() => {
      this.page++;
      //传入flag为true，提示为分页get
      this.getGoodsList(true);
    }, 500);
    },
    setPriceFilter(index) {
      this.priceChecked = index;
      this.page = 1;
      this.getGoodsList();
      this.closePop();
    },
    showFilterPop() {
      this.filterBy = true;
      this.overLayFlag = true;
    },
    closePop() {
      this.overLayFlag = false;
      this.filterBy = false;
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
    backTop() {

    },
    addCart(productId) {
      if(!this.checkLogin()) {
        return;
      }
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
    },
    closeModal() {
      //用于接收子组件触发
      this.mdShow = false;
      this.mdShowCart = false;
    },
    querySearchAsync() {

    },
    handleSelect(item) {
       console.log(item);
    },
    goToList() {
      if(this.searchInput.trim() == '') {
        this.$message({
         message: '搜索内容不能为空！',
         type: 'error',
         center: true,
         duration: 2000
       });
      } else {
        this.$router.push({name: 'GoodsSearchList',query: { keyWord: this.searchInput}});
      }
    },
  goToPublish() {
    if(!this.checkLogin()) {
      this.mdShow = true;
      return;
    }
    this.$router.push('goodsPublish');
    }
  }
}
</script>

<style lang="css" scoped>
.icon-arrow-short {
  transition: all .3s ease-out;
}
.btn:hover {
  background-color: rgba(187, 127, 136, .5);
  transition: all .3s ease-out;
}
.search_btn {
  background: #fff;
  color: #d1434a;
  border: 1px solid #ccc;
}
.publish_gs_container {
  width: 100%;
  display: flex;
  flex-direction: row;
  padding-top: 3rem;
  border-top: 4px solid #eee;
}
.publish_gs_container img {
  width: 10rem;
  height: 10rem;
}
.publish_gs_container div:first-child {
  display: flex;
  font-size: 2.5rem;
}
.publish_gs_container div:first-child > div {
  align-items: center;  
}
.publish_gs_container div:last-child {
  cursor: pointer;
}  

</style>
