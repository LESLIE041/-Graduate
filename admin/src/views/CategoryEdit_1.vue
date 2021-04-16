<template>
  <div class="about">
    <h1>修改分类</h1>
    <!-- label-width代表横向布局 -->
    <!-- native代表原生表单，prevent的代表阻止默认跳转 -->
    <el-form label-width="120px" @submit.native.prevent="save">
        <el-form-item label="上级分类">
          <el-select v-model="model.parent">
            <!-- lable代表显示值，value代表实际存储值 -->
            <el-option v-for="item in parents" :key="item._id"
            :label="item.name" :value="item._id">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="名称">
          <el-input v-model="model.name"></el-input>
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
            parents: []
        }
    },
    methods: {
       async save() {
            // 用于提交数据请求接口
          const res =await this.$http.put('categories/' + this.id,this.model)
          this.$router.push('/categories/list')
          if(res != null){
          this.$message({
              type: 'success',
              message: '保存成功'
          })
          }
        },
        async fetch() {
            const res = await this.$http.get('categories/' + this.id)
            this.model = res.data
        },
        async fetchParents() {
            const res = await this.$http.get('categories')
            this.parents = res.data
        }
        },
        created() {
            this.fetchParents()
            this.id && this.fetch()
    }
}
</script>
