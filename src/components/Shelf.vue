<template>
 <div>
   <div class="menu-title">
     <h2>{{title}}</h2>
   </div>
   <slot name="content" class="content"></slot>
 </div>
</template>
<script>
  export default {
    props: [
      'title'
    ]
  }
</script>
<style scoped>
.menu-title {
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #d4d4d4;
  border-radius: 8px 8px 0 0;
  box-shadow: 0 1px 7px rgba(0,0,0,.06);
  /* background: #f3f3f3; */
  background: linear-gradient(#fbfbfb,#ececec);
}
.menu-title h2 {
  margin-left: 20px;
  line-height: 60px;
}
.content {
  width: 100%;
}
</style>
