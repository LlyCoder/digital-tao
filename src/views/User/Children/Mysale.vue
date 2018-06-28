<template lang="html">
    <shelf title="我的出售">
        <div slot="content">
            <div v-if="saleList.length">
                <div v-for="(item,index) in saleList" :key="index">
                  <div class="item_layout">
                    <div><img :src="'http://localhost:3000/images/goods/'+item.productImage" class="goods_image"></div>
                    <div class="proName">{{item.productName}}</div>
                    <div style="color: red">￥{{item.salePrice}}</div>
                    <div>{{item.publishDate | toDate}}</div>
                    <el-row>
                      <el-button type="primary" icon="el-icon-edit" circle round @click="editSale(item.productId)"></el-button>
                      <el-button type="danger" icon="el-icon-delete" circle round @click="delSale(item._id)"></el-button>
                    </el-row>       
                  </div>  
                </div>
            </div>
            <div v-else>
                当前你还没有发布商品
            </div>
        </div>
    </shelf>
</template>

<script>
import Shelf from '@/components/Shelf'
import axios from 'axios'
export default {
    data() {
        return {
            saleList: []
        }
    },
    mounted() {
        this.getSaleList();
    },
    methods: {
        getSaleList() {
          axios.get('/users/getSaleList')
                .then(result => {
                 let res = result.data.result;
                 this.saleList = res;
                })
        },
        editSale(id) {
            this.$router.push({path:'/editSale',query:{sid: id}});
        },
        delSale(id) {
          axios.post('/users/delSale', {
            saleItemId: id
          }).then(result => {
              let res = result.data;
              if(res.status == '0') {
                    this.$message({
                      showClose: true,
                      message: '删除成功',
                      type: 'success'
                  });
                  this.getSaleList();
              } else {
                  this.$message.error('抱歉，删除失败');
              }
          })
        }
    },
    components: {
        Shelf
    }
}
</script>

<style lang="css" scoped>
.item_layout {
    display: flex;
    justify-content: space-between;
    padding: 5px 20px;
    margin-top: 20px;
    align-items: center;
    border-bottom: 1px solid #dbdbdb;
    border-top: 1px solid #dbdbdb;
}
.goods_image {
    display: block;
    width: 80px;
    height: 80px;
}
.proName {
    width: 100px;
}
   
</style>
