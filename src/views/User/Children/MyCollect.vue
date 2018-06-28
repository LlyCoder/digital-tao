<template lang="html">
  <div>
    <shelf title="我的点赞">
      <div slot="content">
        <div v-if="this.likeList.length">
          <table class="table table-hover">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">文章标题</th>
                <th scope="col">文章简介</th>
                <th scope="col">发布时间</th>
                <th scope="col">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in likeList">
                <th scope="row">{{index+1}}</th>
                <td>{{item.articleTitle}}</td>
                <td>{{item.abstract | sliceAbs}}</td>
                <td>{{item.publishDate | simpleDate}}</td>
                <td class="operation_btn">
                  <span>
                    <router-link :to="{path:'/article/'+item._id, params: item._id}">
                      <img src="/static/detail.svg" class="ds">
                    </router-link>
                  </span>
                  <span @click="dialogVisible = true;lid = item._id">
                    <img src="/static/del.svg" class="ds">
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else>
          你还真的高冷，没有一篇文章入你法眼
        </div>
      </div>

    </shelf>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>你确认要删掉这条点赞？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="delLike">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Shelf from '@/components/Shelf'
import axios from 'axios'
export default {
  data() {
      return {
        likeList: [],
        lid: '',
        dialogVisible: false,
    }
  },
  created() {
    this.init();
  },
  filters: {
    sliceAbs: (abs) => {
      return abs.slice(0, 9) + '...'
    }
  },
  methods: {
      init() {
      axios.get('/users/getMylike').then(result => {
        let res = result.data;
        if (res.status == '0') {
          this.likeList = res.result;
        }
      })
    },
    delLike(lid) {
      lid = this.lid;
      this.dialogVisible = false;
      axios.delete('/users/delLike/'+ lid)
           .then(result => {
             let res = result.data;
             if(res.status == '0') {
               this.$message({
                 showClose: true,
                 message: '恭喜你，删除成功！',
                 type: 'success'
               });
               this.init();
             }
          })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
  },
  components: {
    Shelf
  }
}
</script>
<style lang="css" scoped src="../../../../node_modules/_bootstrap@4.1.1@bootstrap/dist/css/bootstrap.min.css">
</style>
<style scoped>
  .operation_btn span img {
    display: inline-block !important;
    width: 20px;
    height: 20px;
  }

  .operation_btn span:first-child {
    margin-right: 15px;
  }

  .operation_btn span {
    cursor: pointer;
  }

  .ds:hover {
    -webkit-filter: drop-shadow(rgb(0, 204, 153) 2px 0px);
    /* filter: drop-shadow(rgb(0, 204, 153)); */
  }

  .add_btn img {
    display: block;
    width: 40px;
    height: 40px;
    float: right;
    margin: 10px 30px;
  }
</style>