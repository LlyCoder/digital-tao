<template lang="html">
  <div class="nav-breadcrumb-wrap">
    <div class="container">
      <nav class="nav-breadcrumb">
        <router-link to="/">首页</router-link>
        <!-- 定义插槽是内容随场景变化 -->
        <slot></slot>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
