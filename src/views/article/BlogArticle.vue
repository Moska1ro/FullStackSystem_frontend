<template>
  <div class="center-container">
    <el-card class="card">
      <template #header>
        <div class="card-header">
          <span class="title">{{ props.display.title }}</span>
          <img :src="props.display.coverImg" alt="封面" class="header-image">
        </div>
        <div class="card-body">
          <span class="Category">#{{ props.display.category }}&nbsp &nbsp</span>
          <span class="Category">{{props.display.createTime}}</span>
        </div>
      </template>
      <el-text v-html="props.display.content"></el-text>
    </el-card>
  </div>
</template>
<script setup>
let props = defineProps(["display"])

</script>
<style scoped>
.card {
  border-radius:12px;
  width: 100%;
}

.header-image {
  width: 200px;
  height: 200px;
}

.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-header {
  position: relative;
  height: 200px;
  /* 设置 header 区域的高度 */
  background-image: url('/src/iamge/p2.jpg');
  /* 背景图片路径 */
  background-size: cover;
  /* 背景图片尺寸适应 */
  /* background-position: center; */
  /* 背景图片居中 */
  display: flex;

  align-items: center;
  justify-content: center; 
} 

.title {
  left: 0px;
  font-size: 40px;
  /* 设置标题字体大小 */
  color: #ffffff;
  /* 标题颜色 */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0);
  /* 标题文字阴影效果 */
  z-index: 1;
  /* 确保标题在背景图片上方显示 */
  position: relative;
  /* 确保标题的 z-index 生效 */
}

.card-header::before {
  content: '';
  /* 使用伪元素来实现背景遮罩 */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  /* 背景遮罩颜色和透明度 */
  z-index: 0;
  /* 确保背景遮罩在背景图片下方 */
  justify-content: flex-start; /* 标题左对齐 */
  padding-left: 10px; /* 根据需要调整左侧内边距 */
}

.card-body {
  display: flex;
  margin-top: 15px;
  justify-content: center;
  /* 水平居中 */
  align-items: center;
  /* 垂直居中 */
  height: 5px;
  /* 设置标题栏高度 */
}

.Category {
  margin-left: 20px;
  margin-top: 15px;
  font-size: 15px;
  color: grey;
}
</style>
