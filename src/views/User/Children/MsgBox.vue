<template>
    <div>
        <div class="msg_box_container">
            <div class="toUser">{{msg.from.userName}}</div>
            <div class="box">
                <div class="content">
                    <div :class="{first_sentence: toRight}" class="chatline">
                        <div><img :src="'http://localhost:3000/images/userIco/'+ msg.from.userIco"></div>
                        <div style="margin-left:10px;">{{msg.content}}</div>
                    </div>
                    <div v-for="(item, index) in msg.reply" class="reply">
                        <div :class="{me:item.from._id == userInfo.userInfo.userObjectId}" class="chatline">
                            <div><img :src="'http://localhost:3000/images/userIco/'+ item.from.userIco"></div>  
                            <div style="margin-left:10px;">{{item.content}}</div>
                        </div>
                    </div>
                </div>
                <div class="input">
                    <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="reply">
                    </el-input>
                    <el-button type="primary" round @click="replyMsg()">发送</el-button>
                </div>
            </div>
        </div>
    </div>
</template>   

<script>
import { mapState } from 'vuex'
import axios from 'axios'
export default {
    data() {
       return {
           msg: {},
           reply: '',
           toRight: false
        }
    },
     computed: {
            ...mapState(['userInfo'])
    },
    beforeCreate() {
         if (this.$route.query.me === 'true') {
            this.toRight = true;
        }
    },
    created() {
        console.log(this.userInfo);
        this.init();
    },
    mounted() {
        
    },
    methods: {
        init() {
            let msgId = this.$route.params.msgId;
            
            axios.get('/users/getMsgDetail', {
                params: {
                    msgId
                }
            }).then(result => {
                let res = result.data;
                if(res.status == '0') {
                    this.msg = res.result;
                } 
            })
           
        },
        replyMsg() {
            axios.post('/users/addMsgReply', {
                msgId: this.msg._id,
                to: this.msg.from._id,
                content: this.reply
            }).then(result => {
                let res = result.data;
                if(res.status == '0') {
                    this.init()
                }
            }) 
        }
    }
}
</script>
<style scoped>
    .msg_box_container {
      
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .toUser {
       width: 100%;
       background: #eee;
       text-align: center;
       height: 45px; 
       line-height: 45px;
       font-size: 20px;
       font-weight: 600;
    }
    .content {
        padding: 20px;
        height: 380px;
        overflow: scroll;
        display: flex;
        flex-direction: column;
    }
   .content div{
       margin-bottom: 20px;
   }
   .content img {
       display: block;
       width: 35px;
       height: 35px;
       border-radius: 50%;
   }
   .chatline {
       display: flex;
       align-items: center;
   }
   .me {
       align-self: flex-end!important;
   }
   .reply {
       display: flex;
       flex-direction: column;
   }
   .input {
       margin-top: 10px;
       display: flex;
   }
   .first_sentence {
       align-self: flex-end;
   }
    
</style>