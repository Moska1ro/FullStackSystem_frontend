//定制请求的实例

//导入axios  npm install axios
import axios from 'axios';
import { ElMessage } from "element-plus";
import { useTokenStore } from '../stores/token.js'
// import useRouter from 'vue-router';
//定义一个变量,记录公共的前缀  ,  baseURL
//使用配置代理避免跨域问题
const baseURL = '/api';
const instance = axios.create({ baseURL })
// const router = useRouter()


import router from '@/router';


//请求拦截器
instance.interceptors.request.use(
    (config) => {
        const tokenStore = useTokenStore()
        if (tokenStore.token) {
            config.headers.Authorization = tokenStore.token
        }
        return config
    },
    (err) => {
        Promise.reject(err)
    }
)

//添加响应拦截器

instance.interceptors.response.use(
    result => {
        if (result.data.code === 0) {
            return result.data;
        }
        // debugger // 接口测试拦截器，当接口返回错误时，会在此处停止运行
        ElMessage.error(result.data.msg ? result.data.msg : "服务异常!")
        return Promise.reject(result.data)
    },
    err => {
        if (err.response.status === 401) {
            ElMessage.error("请先登录!")
            router.push('/login')
        } else {
            ElMessage.error('服务异常!');
        }
        return Promise.reject(err);
    }
)

export default instance;