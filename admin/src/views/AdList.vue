<template>
  <div>
    <h1>广告位列表</h1>
     <el-table :data="items">
        <el-table-column prop="_id" label="ID" width="240">
        </el-table-column>
        <el-table-column prop="name" label="名称" width="240">
        </el-table-column>
        <el-table-column
      fixed="right"
      label="操作"
      width="180">
      <template slot-scope="scope">
        <!-- scope.row_id代表当前这一行 -->
        <el-button type="text" size="small"
         @click="$router.push(`/advs/edit/` + scope.row._id)">编辑</el-button>
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
      const res = await this.$http.get('ads')
      this.items = res.data
    },
    async remove(row){
          this.$confirm('是否确定删除广告', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await this.$http.delete(`ads/` + row._id)// eslint-disable-line no-unused-vars
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
