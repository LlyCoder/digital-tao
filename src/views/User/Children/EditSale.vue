<template lang="html">
    <div>
        <nav-header></nav-header>
        <nav-bread>
            <span>闲置信息修改</span>
        </nav-bread>
        <div class="container w">
            <div class="form_container">
                <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                    <div class="fd">
                        <el-form-item label="商品名称" class="goods_ti">
                            <el-input v-model="formLabelAlign.goodsName"></el-input>
                        </el-form-item>
                        <el-form-item label="商品价格">
                            <el-input-number v-model="salePrice" controls-position="right" :min="1"></el-input-number>
                        </el-form-item>
                    </div>
                    <el-form-item label="商品简介" class="gooods_intro">
                        <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="formLabelAlign.sellerIntro">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="标题图片（选择后将覆盖原来标题图片）">
                        <el-upload name="uploadImg" drag action="http://127.0.0.1:3000/users/goodsUploads" :on-success="backCoverSrc" multiple>
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或
                                <em>点击上传</em>
                            </div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="预览图片（选择后将覆盖原预览图）">
                        <el-upload name="uploadImg" action="http://127.0.0.1:3000/users/goodsUploads" :on-success="backItemSrc" :on-remove="removeItem"
                            :on-preview="handlePictureCardPreview" list-type="picture-card">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="'http://localhost:3000/images/goods/' + preImg">
                        </el-dialog>
                    </el-form-item>
                </el-form>
                <el-button type="primary" round @click="updatehGoods">重新提交</el-button>
                <!-- <el-button type="primary" round @click="test">测试</el-button> -->
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
                goodsInfo: {},
                goodsCoverSrc: '',
                labelPosition: 'top',
                salePrice: 0,
                itemSrcs: [],
                preImg: '',
                dialogVisible: false,
                formLabelAlign: {
                    goodsName: '',
                    sellerIntro: ''
                }
            }
        },
        components: {
            NavHeader,
            NavFooter,
            NavBread
        },
        mounted() {
          this.backOldInfo();
        },
        methods: {
            backOldInfo(gid) {
                gid = this.$route.query.sid
                axios.get('/goods/goodsDetail', {
                    params: {
                        productId: gid
                    }
                }).then(result => {
                    let res = result.data.result;
                    this.formLabelAlign.goodsName = res.productName;
                    this.salePrice = res.salePrice;
                    this.formLabelAlign.sellerIntro = res.sellerIntro;
                    this.goodsInfo = res;
                })
            },
            backCoverSrc(response, file, fileList) {
                this.goodsCoverSrc = response.result;
            },
            backItemSrc(response, file, fileList) {
                let itemSrc = response.result;
                this.itemSrcs.push(itemSrc);
            },
            removeItem(file, fileList) {
                let itemSrc = file.response.result[0];
                this.itemSrcs.forEach((item, index) => {
                    if (item == itemSrc) {
                        this.itemSrcs.splice(index, 1);
                    }
                })
            },
            handlePictureCardPreview(file, fileList) {
                this.dialogVisible = true;
                this.preImg = file.response.result[0];
            },
            updatehGoods(gid) {
                gid = this.$route.query.sid;
                if(this.goodsCoverSrc == '') {
                    this.goodsCoverSrc = this.goodsInfo.productImage
                }
                axios.post('/users/updateGoods/' + gid, {
                    goodsName: this.formLabelAlign.goodsName,
                    salePrice: this.salePrice,
                    productImage: this.goodsCoverSrc,
                    sellerIntro: this.formLabelAlign.sellerIntro,
                    previewImg: this.itemSrcs
                }).then(result => {
                    let res = result.data;
                    if(res.status == '0') {
                        this.$message({
                            message: '提交申请成功，等待管理员审核！',
                            type: 'success'
                        });
                        this.$router.push({ path: '/user/mySale' });
                    }
                })
            },
        }
    }
</script>

<style lang="css">
    .w {
        margin-top: 20px;
        background: #eee;
        border-radius: 20px;
        padding: 30px;
    }

    .fd {
        display: flex;
    }

    .goods_ti {
        margin-right: 50px;
    }

    .gooods_intro {
        width: 60%;
    }

    .form_container {
        margin-left: 360px;
        ;
    }
</style>