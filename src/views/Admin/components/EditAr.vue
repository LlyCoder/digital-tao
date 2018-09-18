<template>
    <div>
        <div class="container">
            <el-form :label-position="labelPosition" label-width="80px">
                <el-form-item label="文章标题">
                    <el-input v-model="articleTitle"></el-input>
                </el-form-item>
                <el-form-item label="文章简介">
                    <el-input type="textarea" v-model="abstract"></el-input>
                </el-form-item>
                <el-form-item label="文章缩略图（一旦选择图片，原图片将被覆盖）">
                    <el-upload class="upload-demo" name="uploadImg" action="http://127.0.0.1:3000/articles/uploadArImg" :limit="limitCount" :on-success="backItemSrc"
                        list-type="picture">
                        <el-button size="small" type="primary">选择预览图</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <div ref="editor" class="editor_diy">
                        <p v-html="lastContent"></p>
                    </div>
                </el-form-item>
            </el-form>
            <div class="upload_btn">
                <el-button type="primary" round @click="updateArticle">发布</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import E from 'wangeditor'
    export default {
        data() {
            return {
                editorContent: '',
                lastContent: '',
                content: '',
                labelPosition: "top",
                limitCount: 1,
                articleTitle: '',
                abstract: '',
                articleImg: '',
                info: {}
            }
        },
        components: {
            
        },
        methods: {
            backItemSrc(response, file, fileList) {
                let itemSrc = response.data[0];
                this.articleImg = itemSrc
            },
            updateArticle() {
                let articleId = this.$route.query.articleId;
                if (this.editorContent == '') {
                    this.editorContent = this.lastContent;
                }
                axios.post('/admins/updateArticle', {
                    articleId,
                    articleTitle: this.articleTitle,
                    articleImg: this.articleImg,
                    abstract: this.abstract,
                    content: this.editorContent
                }).then(result => {
                    let res = result.data;
                    if (res.status == '0') {
                        this.$message({
                            showClose: true,
                            message: '发布成功',
                            type: 'success'
                        });
                        this.$router.push('editArticle');
                    } else {
                        this.$message.error('错了哦,我们会修复的哦');
                    }
                })
            }
        },
        created() {
            axios.get('/articles/getDetail', {
                params: {
                    id: this.$route.query.articleId
                }
            }).then(result => {
                let res = result.data.result;
                this.articleTitle = res.articleTitle;
                this.abstract = res.abstract;
                this.lastContent = res.content;
                this.articleImg = res.articleImg;
            })
        },
        mounted() {
            const editor = new E(this.$refs.editor)
            editor.customConfig.onchange = (html) => {
                this.editorContent = html
            }
            editor.customConfig.uploadImgServer = 'http://127.0.0.1:3000/articles/uploads';
            editor.customConfig.uploadFileName = 'uploadImg';
            editor.create();
        },
    }
</script>
<style scoped>
    .editor_diy {
        margin-top: 2rem;
    }

    .upload_btn {
        display: flex;
        justify-content: center;
    }
</style>