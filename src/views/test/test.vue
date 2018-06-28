<template>
    <div>
        <div class="header" @click="test"></div>
        <div class="aside">
            <ul>
                <li>test</li>
                <li>test</li>
                <li>test</li>
                <li>test</li>
                <li>test</li>
                <li>test</li>
                <li>test</li>
                <li>test</li>
                <li>test</li>
                <li>test</li>
                <li>test</li>
                <li>test</li>
                <li>test</li>
                <li>test</li>
                <li>test</li>
                <li>test</li>
                <li>test</li>
                <li>test</li>
                <li>test</li>
                <li>test</li>
                <li>test</li>
                <li>test</li>
                <li>test</li>
                <li>test</li>
            </ul>
        </div>
        <div class="main">
            <router-view>
                
            </router-view>
        </div>
    </div>
       
</template>

<style scoped>
    .header {
        width: 100%;
        height: 50px;
        background: red;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 5000
    }
    .aside {
        position: fixed;
        top: 50px;
        left: 0;
        bottom: 0;
        padding: 20px 0 50px;
        width: 180px;
        min-width: 45px;
        max-height: 100vh;
        height: calc(100% - 50px);
        z-index: 1023;
        background: #fff;
        box-shadow: 0 2px 3px hsla(0,0%,7%,.1), 0 0 0 1px hsla(0,0%,7%,.1);
        overflow-y: auto;
        overflow-x: hidden;
    }
    .main {
        padding-top: 50px;
        margin-left: 180px;
        transform: translateZ(0);
    }
    li {
        font-size: 30px;
    }
</style>

<script>
    export default {
        methods: {
            test() {
                this.$router.push({path: '/test/a'})
            }
        }
    }
</script>