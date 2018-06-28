<template>
  <footer class="footer">
    <div class="footer__wrap">
      <div class="footer__secondary">
        <div class="footer__inner">
          <div class="footer__region">
            <span>语言</span> &nbsp
            <select class="footer__region__select">
              <option>中文</option>
              <option>English</option>
            </select>
          </div>
          <div class="footer__secondary__nav break">
            <span>Copyright © 2018 digitalTao All Rights Reserved.</span>
            <router-link to="/">
              售后服务
            </router-link>
            <a href="#">
              服务条款
            </a>
            <a href="#">
              隐私策略
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
  // export default{
  //
  // }
</script>
<style coped>
  .break {
    word-break: keep-all;
  }
</style>
