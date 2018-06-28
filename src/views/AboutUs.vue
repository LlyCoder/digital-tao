<template lang="html">
  <div>
    <nav-header></nav-header>
    <nav-bread>
      <span>关于我们</span>
    </nav-bread>
    <div class="container w">
        <div class="swiper_container">
            <el-carousel :interval="interval" type="card">
              <el-carousel-item v-for="(item,index) in teamInfo" :key="item.id">
                <div @mouseleave="checked=-1">
                    <img :src="item.url" class="info_img" @mouseover="checked=index">
                    <div class="info_title"  v-show="index === checked">{{item.title}}</div>
                </div> 
              </el-carousel-item>
            </el-carousel>
        </div>
        <div class="swiper_title">
          <h2>我们的团队</h2>
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
export default {
  data() {
    return {
      interval: 4000,
      teamInfo: [],
      checked: -1
    }
  },
  components: {
       NavHeader,
       NavFooter,
       NavBread
  },
  mounted() {
    axios.get('../../static/info/teamInfo.json')
         .then(res => {
           this.teamInfo = res.data;
          });     
  }
}
</script>

<style lang="css" scoped>
.w {
  margin-top: 2rem;
}

.swiper_title {
  margin-top: 2rem;
  text-align: center;
}  
.info_img {
  max-width: 100%;
}
.info_title {
  position: fixed;
  z-index: 10000;
  width: 100%;
  height: 8rem;
  bottom: 0;
  padding: 2rem;
  font-size: 1.8rem;
  color: #db141e;
  font-weight: bold;
  background:#605F5F;
  opacity: 0.7;
}
</style>
