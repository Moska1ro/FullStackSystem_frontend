<template>
    <el-button type="primary" @click="getRecommend" class="button">换一换</el-button>
    <el-table :data="articles" style="width: 100%; border-radius: 12px; margin-top: 10px;">
        <el-table-column label="文章标题" width="400" prop="title"></el-table-column>
        <el-table-column label="作者" prop="createUser"></el-table-column>
        <el-table-column label="主题" prop="categoryName">
        </el-table-column>
        <el-table-column label="发表时间" prop="createTime"> </el-table-column>
        <el-table-column label="状态" prop="state"></el-table-column>
        <el-table-column label="操作" width="100">
            <template #default="{ row }">
                <el-button :icon="View" circle plain type="success" @click="openBlog(row)"></el-button>
            </template>
        </el-table-column>
        <template #empty>
            <el-empty description="没有数据" />
        </template>
    </el-table>
    <el-dialog v-model="articleVisible">
        <BlogArticle :display="display" />
    </el-dialog>
</template>
<script setup>
import { View } from '@element-plus/icons-vue';
import { onBeforeMount, ref } from 'vue';
import BlogArticle from '@/views/article/BlogArticle.vue';
import { articleCategoryDetailService, articleRecommendService } from '../../api/article';
import { ar } from 'element-plus/es/locales.mjs';
import { getUserNameService } from '../../api/user';
let articles = ref([]);
let articleVisible = ref(false);
let display = ref(false);
const openBlog = (row) => {
    display.value = row;
    articleVisible.value = true;
}
let getCategory = async (id) => {
    let res = await articleCategoryDetailService(id);
    return res.data.categoryName;
}
let getUserName = async (id) => {
    let res = await getUserNameService(id);
    return res.data;
}
let getRecommend = async () => {
    let res = await articleRecommendService();
    articles.value = res.data;
    for (let i = 0; i < articles.value.length; i++) {
        articles.value[i].categoryName = await getCategory(articles.value[i].categoryId);
        articles.value[i].createUser = await getUserName(articles.value[i].createUser);
        articles.value[i].createTime = articles.value[i].createTime.replace('T', '   ');
    }
    display.value = articles.value;
    for (let i = 0; i < display.value.length; i++) {
        display.value[i].category = articles.value[i].categoryName;
    }
}

onBeforeMount(() => {
    getRecommend();
})
</script>
<style scoped>
.button {
    background-color: #A5BD8A;
    color: black;
    border-color: transparent;

}
</style>
