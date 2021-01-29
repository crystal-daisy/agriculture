<template>
    <div class="login">
        <div class="title loginText"></div>
        <div class="formLine">
            <span class="formspan">用户名</span>
            <div class="formText">
                <input type="text" ref="username">
            </div>
        </div>
        <div class="formLine">
            <span class="formspan">密码</span>
            <div class="formText">
                <input type="text" ref="password">
            </div>
        </div>
        <div class="button">
            <button></button>
        </div>
        <test_update></test_update>
    </div>
</template>

<script>
    import test_update from "./test_update";
    export default{
        name: 'login',
        data(){
            return{

            }
        },
        methods: {
            
        },
        components:[
            test_update
        ]
    }
</script>

<style>
    body { font-family: 'Source Sans Pro', sans-serif; }
    .login{
        width:50%;
        height:200px;
        position: fixed;
        left:50%;top:50%;transform: translate(-50%,-50%);
        border:1px solid pink;border-radius: 10px;
        background: white;
    }
    .login .title{
        font-size:18px;width:100%;height:30px;line-height: 30px;padding-left: 20px;display: inline-block;color:blue;
    }
    .login .loginText::after{content: "用户登录";}
    .formLine{
        width:100%;height:50px;line-height: 50px;
    }
    .formspan{
        display: inline-block;margin-left:20px;font-size:13px;text-align: justify;width:50px;
    }
    .formspan::after{
        content: ":"
    }
    .formText{
        display: inline-block;
    }
    .button{width: 100%;height:50px;}
    .button button{
        width: 50px;
    }
</style>