<template lang="html">
  <div class="">
    <form name="uploadForm"
      id="uploadForm"
      method="post"
      enctype="multipart/form-data"
      action="http://192.168.1.200/uploads"
      target="uploadFrame">
      <p style="margin:10px 0;">上传图片:
          <input type="text" name="name" value="xiangheng">
          <input type="file" name="imageFile" multiple="multiple"/>
          <input type="submit" id="fileSubmit" value="上传" />
      </p>
  </form>


  </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
