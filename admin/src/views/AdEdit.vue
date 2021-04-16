<template>
  <div class="about">
    <h1>新建广告位</h1>
    <!-- label-width代表横向布局 -->
    <!-- native代表原生表单，prevent的代表阻止默认跳转 -->
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
          <el-input v-model="model.name"></el-input>
      </el-form-item>
       <el-form-item label="广告">
           <el-button type="text" 
       @click="model.items.push({})">
       <i class="el-icon-plus"></i>添加广告</el-button>
            <el-row type="flex" style="flex-wrap:wrap"> 
              <el-col :md="24" v-for="(item, i) in model.items" :key="i">
                <el-form-item label="跳转链接(URL)">
                  <el-input v-model="item.url"></el-input>
                </el-form-item>
                <el-form-item label="图片" style="margin-top: 0.5rem;">
                  <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL+'/upload'"
                  :show-file-list="false"
                  :on-success="res =>$set(item, 'image', res.url)">
                  <img v-if="item.image" :src="item.image" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
                <el-form-item>
                <el-button type="danger" @click="model.items.splice(i,1)">删除</el-button>
                </el-form-item>
              </el-col>
            </el-row>
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
    // 用于绑定数据
    data() {
        return{
            model: {
                // 用于向model里面添加
                items: []
            },
        }
    },
    methods: {
       async save() {
            // 用于提交数据请求接口
          const res =await this.$http.post('ads',this.model)
          this.$router.push('/advs/list')
          if(res != null){
          this.$message({
              type: 'success',
              message: '保存成功'
          })
          }
        },
    },
    //   created() {
    //     this.fetch()
    //   }
}
</script>
