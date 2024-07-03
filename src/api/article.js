import request from '@/utils/request.js'

//分类查询
export const articleCategoryListService = () => {
    return request.get('/category')
}

// 分类详情
export const articleCategoryDetailService = (id) => {
    return request.get('/category/detail?id=' + id)
}

//文章分类添加
export const articleCategoryAddService = (categoryData) => {
    return request.post('/category', categoryData)
}

//文章分类更新
export const articleCategoryUpdateService = (categoryData) => {
    return request.put('/category', categoryData)
}

//文章分类删除
export const articleCategoryDeleteService = (id) => {
    return request.delete('/category?id=' + id)
}

//文章列表查询
export const articleListService = (params) => {
    return request.get('/article', { params: params })
}

//文章添加
export const articleAddService = (articleData) => {
    return request.post('/article', articleData)
}

//文章删除
export const articleDeleteService = (id) => {
    return request.delete('/article?id=' + id)
};

//文章编辑
export const articleEditService = (articleData) => {
    return request.put('/article', articleData)
}

export const articleRecommendService = () => {
    return request.get('/article/recommend')
}