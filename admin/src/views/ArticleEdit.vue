<template>
  <div class="about">
    <h1>新建文章</h1>
    <!-- label-width代表横向布局 -->
    <!-- native代表原生表单，prevent的代表阻止默认跳转 -->
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
          <!-- 文章可以所属于多个分类，因此加入 multiple属性-->
          <el-select v-model="model.categories">
            <!-- lable代表显示值，value代表实际存储值 -->
            <el-option v-for="item in categories" :key="item._id"
            :label="item.name" :value="item._id">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="标题">
          <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
          <vue-editor v-model="model.body" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
      </el-form-item>
      <el-form-item>
          <!-- submit代表提交按钮 -->
          <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  components: {
    VueEditor
  },
    // 用于绑定数据
    data() {
        return{
            model: {},
            categories: []
        }
    },
    methods: {
      async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      // append用于添加字段
      formData.append("file", file);

      const res =await this.$http.post('upload', formData)
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },
       async save() {
            // 用于提交数据请求接口
          const res =await this.$http.post('articles',this.model)
          this.$router.push('/articles/list')
          if(res != null){
          this.$message({
              type: 'success',
              message: '保存成功'
          })
          }
        },
        async fetch() {
            const res = await this.$http.get('categories')
            this.categories = res.data
        },
    },
      created() {
        this.fetch()
      }
}
</script>
