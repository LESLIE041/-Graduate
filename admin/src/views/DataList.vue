<template>
  <div>
    <h1>数据列表</h1>
     <el-table :data="items">
        <el-table-column prop="_id" label="ID" width="240">
        </el-table-column>
        <el-table-column prop="categories" label="所属分类" width="240">
        </el-table-column>
        <el-table-column prop="year" label="年份">
        </el-table-column>
        <el-table-column prop="month" label="月份">
        </el-table-column>
        <el-table-column prop="data" label="数据">
        </el-table-column>
        <el-table-column
      fixed="right"
      label="操作"
      width="180">
      <template slot-scope="scope">
        <!-- scope.row_id代表当前这一行 -->
        <el-button type="text" size="small"
         @click="$router.push(`/datas/edit/` + scope.row._id)">编辑</el-button>
         <el-button type="text" size="small"
         @click="remove(scope.row)">删除</el-button>
      </template>
    </el-table-column>
      </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    }
  },
  methods: {
    async fetch(){
      const res = await this.$http.get('datas')
      this.items = res.data
    },
    async remove(row){
          this.$confirm('是否确定删除分类', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await this.$http.delete(`datas/` + row._id)// eslint-disable-line no-unused-vars
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.fetch()
        })
  },
  },
    
  created(){
    this.fetch()
  }
}
</script>
