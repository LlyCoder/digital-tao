<template lang="html">
  <div>
    <shelf title="我的订单">
      <div slot="content">
        <div v-if="orderList.length">
          <div v-for="(item,index) in orderList" :key="index">
            <div class="order_table_top">
              <div class="first">
                <div>
                  <span>{{item.createDate}}</span>
                  <span>订单号：{{item.orderId}}</span>
                </div>
                <div class="extra_info">
                  <span class="">单价</span>
                  <span class="">数量</span>
                  <span class="">收件人</span>
                </div>
              </div>
              <div class="last">
                <span class="">实付金额</span>
                <span class="">操作</span>
              </div>
            </div>
            <div class="order_table_bottom">
              <div v-for="(goods,i) in item.goodsList">
                <div class="first_bottom">
                  <div class="product_info">
                    <div>
                      <img :src="'http://localhost:3000/images/goods/'+goods.productImage">
                    </div>
                    <div>{{goods.productName}}</div>
                  </div>
                  <div class="extra_info_content">
                    <span class="">{{goods.salePrice}}</span>
                    <span class="">{{goods.productNum}}</span>
                    <span class="">{{item.addressInfo.userName}}</span>
                  </div>
                </div>
              </div>
              <div class="last_operation" style="right: 0;top: 0;">
                <div>￥{{item.orderTotal}}</div>
                <div>
                  <el-button type="danger" icon="el-icon-delete" circle @click="delOrder(item.orderId)"></el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>没有订单</div>
      </div>
    </shelf>
  </div>
</template>

<script>
  import axios from 'axios'
  import Shelf from '@/components/Shelf'
  export default {
    data() {
      return {
        orderList: []
      }
    },
    mounted() {
      this.getOrderList()
    },
    components: {
      Shelf
    },
    methods: {
      getOrderList() {
        axios.get('/users/getOrderList')
          .then(result => {
            let res = result.data.result;
            this.orderList = res;
          })
      },
      delOrder(orderId) {
        axios.post('/users/delOrder', {
          orderId: orderId
        }).then(result => {
          let res = result.data;
          if (res.status == '0') {
            this.$message({
              message: '删除成功！',
              type: 'success',
              center: true,
              duration: 2000
            });
            this.getOrderList()
          } else {
            this.$message.error('很抱歉，删除失败！');
          }

        })
      }
    }
  }
</script>

<style lang="css" scoped>
  .order_table_top {
    width: 100%;
    height: 36px;
    line-height: 36px;
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #dbdbdb;
    border-bottom: 1px solid #dbdbdb;
    background: #eee;
    font-size: 3px;
    color: #666;
    padding: 0 20px;
  }

  .first {
    display: flex;
    justify-content: space-between;
    width: 790px;
  }

  .first div:first-child span:last-child {
    margin-left: 25px;
  }

  .extra_info span {
    /* 记住span是行内元素，直接设置宽高不会生效！！！ */
    display: inline-block;
    width: 112px;
    height: 36px;
    text-align: center;
  }

  .last {
    width: 254px;
    text-align: center;
    border-left: 1px solid #ccc;
  }

  .last span {
    display: inline-block;
    width: 95px;
  }

  .order_table_bottom {
    padding: 0 20px;
    color: #666;
    font-size: 15px;
    position: relative;
    /* justify-content: space-between; */
  }

  .first_bottom {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #dbdbdb;
    width: 678px;
  }

  .product_info {
    display: flex;
    height: 112px;
    align-items: center;
  }

  .product_info img {
    border: 1px solid #EBEBEB;
    width: 80px;
    height: 80px;
  }

  .product_info div:last-child {
    margin-left: 25px;
  }

  .extra_info_content {
    display: flex;
    align-items: center;
  }

  .extra_info_content span {
    /* 记住span是行内元素，直接设置宽高不会生效！！！ */
    display: inline-block;
    width: 112px;
    height: 36px;
    text-align: center;
    line-height: 36px;
  }

  .last_operation {
    position: absolute;
    right: 0;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 240px;
    border-left: 1px solid #ccc;
    border-bottom: 1px solid #dbdbdb;
  }

  .last_operation div {
    width: 100%;
    text-align: center;
  }
</style>