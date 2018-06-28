<template>
    <div>
        <div class="bk_container" @click="backTop" v-show="scrollTop > 300">
            <div class="arrow"></div>
        </div>
        
    </div>
</template>

<script>
    export default {
        data() {
            return {
                scrollTop: 0,
                
            }
        },
        mounted() {
            document.addEventListener('scroll', this.handelScroll)
        },
        watch: {

        },
        methods: {
            backTop() {
                //渐进的回到顶部
                let intScroll = setInterval(()=> {
                    document.documentElement.scrollTop -= 100;
                      if (this.scrollTop == 0) {
                       window.clearInterval(intScroll)
                    }
                },40)
            },
            handelScroll() {
                this.scrollTop = document.documentElement.scrollTop;
            }
        }
    }
</script>

<style scoped>
.bk_container {
    cursor: pointer;
    width: 45px;
    height: 40px;
    background: red;
    position: fixed;
    bottom: 30px;
    right: 30px;
    background-color: rgba(0,0,0,.6);
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0,0,0,.2);
}

.arrow { 
    width: 18px;
    height: 18px;
    border-width: 3px;
    border-style: solid;
    border-color: #fff #ffff transparent transparent;
    transform:rotate(-45deg);
    margin: 0 auto;
    margin-top: 18px;
}
</style>