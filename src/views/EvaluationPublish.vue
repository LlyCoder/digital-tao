<template lang="html">
  <div>
    <nav-header></nav-header>
    <nav-bread>
      <span>文章列表</span>
    </nav-bread>
    <div class="container">
      <el-form :label-position="labelPosition" label-width="80px">
        <el-form-item label="文章标题">
          <el-input v-model="articleTitle"></el-input>
        </el-form-item>
        <el-form-item label="文章简介">
          <el-input type="textarea" v-model="abstract"></el-input>
        </el-form-item>
        <el-form-item label="文章缩略图">
          <el-upload class="upload-demo" 
            name="uploadImg"
            action="http://127.0.0.1:3000/articles/uploadArImg"
            :limit="limitCount"
            :on-success="backItemSrc"
            list-type="picture">
            <el-button size="small" type="primary">选择预览图</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <div ref="editor" class="editor_diy" name="file"></div>
        </el-form-item> 
      </el-form>
      <div class="upload_btn">
        <el-button type="primary" round @click="publishArticle">发布文章</el-button>
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
import E from 'wangeditor'

export default {
  data() {
    return {
      editorContent: '',
      labelPosition: "top",
      limitCount: 1,
      articleTitle: '',
      abstract: '',
      articleImg: ''
    }  
  },
  mounted() {
        var editor = new E(this.$refs.editor)
        editor.customConfig.onchange = (html) => {
          this.editorContent = html
        }
        editor.customConfig.uploadImgServer = 'http://127.0.0.1:3000/articles/uploads';
        editor.customConfig.uploadFileName = 'uploadImg';
        editor.create()
  },
  components: {
    NavHeader,
    NavFooter,
    NavBread
  },
  methods: {
    backItemSrc(response, file, fileList) {
      let itemSrc = response.data[0];
      this.articleImg = itemSrc
    },
    publishArticle() {
      axios.post('/articles/postArticle', {
        articleTitle: this.articleTitle,
        abstract: this.abstract,
        articleImg: this.articleImg,
        content: this.editorContent
      }).then(result => {
        let res = result.data;
        if(res.status == '0') {
           this.$message({
            showClose: true,
            message: '恭喜你，发布成功',
            type: 'success'
          });
          this.$router.push('/user/myArticle');
        }
      })
    }
  }
}
</script>

<style lang="css" scoped>
.editor_diy {
  margin-top: 2rem;
}
.upload_btn {
  display: flex;
  justify-content: center;
}
</style>
