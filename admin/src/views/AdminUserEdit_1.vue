<template>
  <div class="about">
    <h1>修改分类</h1>
    <!-- label-width代表横向布局 -->
    <!-- native代表原生表单，prevent的代表阻止默认跳转 -->
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
          <el-input type="text" v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item>
          <!-- submit代表提交按钮 -->
          <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
    props: {
        id: {}
    },
    // 用于绑定数据
    data() {
        return{
            model: {},
        }
    },
    methods: {
       async save() {
            // 用于提交数据请求接口
          const res =await this.$http.put('admin_users/' + this.id,this.model)
          this.$router.push('/admin_users/list')
          if(res != null){
          this.$message({
              type: 'success',
              message: '保存成功'
          })
          }
        },
        async fetch() {
            const res = await this.$http.get('admin_users/' + this.id)
            this.model = res.data
        },
        },
        created() {
            this.id && this.fetch()
    }
}
</script>
