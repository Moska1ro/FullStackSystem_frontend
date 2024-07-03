<template>
    <div class="login-page">
    <el-row>
        <el-col :span="2" class="container">
            <div class="image-container">
                <img src="@/assets/logo.jpg" alt="logo">
            </div>
        </el-col>
        <el-col :span="6" class="container">
            <div class="title-container">
                <h1>WELCOME TO MY BLOG</h1>
            </div>
        </el-col>
    </el-row>
    <el-row>
        <div class="form::before"></div>
        <el-col :span="6" :offset="3" class="form">
            <!-- 注册表单 -->
            <el-form ref="form" size="large" autocomplete="off" v-if="isRegister" :model="registerData" :rules="rules" >
                <el-form-item>
                    <h2 style="color: #333;">注册</h2>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input :prefix-icon="User" v-model="registerData.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input :prefix-icon="Lock" v-model="registerData.password" type="password"
                        placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item prop="rePassword">
                    <el-input :prefix-icon="Lock" v-model="registerData.rePassword" type="password"
                        placeholder="请输入再次密码"></el-input>
                </el-form-item>
                <!-- 注册按钮 -->
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space @click="register">
                        注册
                    </el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="isRegister = false; clearRegisterData()">
                        ← 返回
                    </el-link>
                </el-form-item>
            </el-form>
            <!-- 登录表单 -->
            <el-form ref="form" size="large" autocomplete="off" v-else :model="registerData" :rules="rules">
                <el-form-item>
                    <h2 style="color: #333;">登录</h2>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input :prefix-icon="User" v-model="registerData.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input name="password" :prefix-icon="Lock" v-model="registerData.password" type="password"
                        placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item class="flex">
                    <div class="flex">
                        <el-checkbox>记住我</el-checkbox>
                        <!-- <el-link type="primary" :underline="false">忘记密码？</el-link> -->
                    </div>
                </el-form-item>
                <!-- 登录按钮 -->
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space @click="login">登录</el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="isRegister = true; clearRegisterData()">
                        注册 →
                    </el-link>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</div>
</template>
<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ElMessage } from "element-plus";
import { ref } from 'vue'
//控制注册与登录表单的显示， 默认显示注册
const isRegister = ref(false)

const registerData = ref({
    username: '',
    password: '',
    rePassword: ''
})


const checkRePassword = (rule, value, callback) => {
    if (value === '') {
        callback(new Error("请再次输入密码"))
    } else if (value !== registerData.value.password) {
        callback(new Error("两次输入密码不一致"))
    } else {
        callback()
    }
}

// //定义表单校验规则
const rules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 5, max: 16, message: '本数据长度必需为5~6位', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 5, max: 16, message: '本数据长度必需为5~6位', trigger: 'blur' }
    ],
    rePassword: [
        { validator: checkRePassword, trigger: 'blur' }
    ],
}

import { useRouter } from "vue-router";
import { useTokenStore } from '../stores/token.js'
import { userRegisterService, userLoginService } from "../api/user.js";

const router = useRouter()
const tokenStore = useTokenStore()

const register = async () => {
    let result = await userRegisterService(registerData.value)
    ElMessage.success(result.msg ? result.msg : "注册成功! ")
}

const login = async () => {
    let result = await userLoginService(registerData.value);
    ElMessage.success(result.msg ? result.msg : "登录成功!")
    tokenStore.setToken(result.data)
    router.push('/')
}

const clearRegisterData = () => {
    registerData.value.username = ''
    registerData.value.password = ''
    registerData.value.rePassword = ''
}

</script>



<style lang="scss" scoped>

/* 样式 */
.login-page {
    // width: 100%;
    // height: 100vh;
    background-image: url('@/assets/1111.png'); /* 背景图片路径 */
    // background-size: cover;
    
    .container{
        display: flex;
        align-items: center; /* 垂直居中 */
        justify-content: center; /* 水平居中 */
        margin-left: 25%;
    }
    .img-container{
        flex: 0 0 auto; /* 不放大缩小，保持原有大小 */
        margin-right: 20px; /* 图片与文字之间的间距 */
    }
    .title-container{
        flex: 1; /* 自动扩展填充剩余空间 */
    }
    .title-container h1{
        // font-family: 'Montserrat', sans-serif;
        // font-weight: 700;
        font-size: 61px; 
        font-weight:bold;
        color: #333;
        margin-bottom: 10px;
    }
    .form::before{
        content: '';
        position: absolute;
        top: 50%; /* 垂直居中 */
        left: -20%;
        transform: translateY(-50%); /* 向下偏移50%的高度 */
        width: 140%;
        height: 80%; /* 高度占据 .form 的一半 */
        background-color: rgba(0, 0, 0, 0.2); /* 背景遮罩颜色和透明度 */
        z-index: 0; /* 确保背景遮罩在 .form 的背景下方 */
    }
    .form {
        position: relative;
        display: flex;
        flex-direction:column;
        justify-content: center;
        user-select: none;
        margin-left:35%;
        
        .button {
            width: 100%;
        }

        .flex {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
    }
   
}
</style>
