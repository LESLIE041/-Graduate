<template>
    <div class="login-container">
        <el-card header="请先登录" class="login-card">
            <!-- native代表监听原生表单，prevent代表阻止表单默认提交 -->
            <el-form @submit.native.prevent="login">
              <el-form-item label="用户名">
                  <el-input v-model="model.username"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                  <el-input type="password" v-model="model.password"></el-input>
              <el-form-item>
                  <el-button type="primary" native-type="submit" style="margin-top: 1.5rem">登录</el-button>
              </el-form-item>
              </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
    data(){
        return {
            model: {}
        }
    },
    methods: {
        async login() {
            // 将model上传
            const res = await this.$http.post('login', this.model)
            localStorage.token = res.data.token
            this.$router.push('/')
            this.$message({
                type: 'success',
                message: '登陆成功'
            })
        }
    }
}
</script>

<style scoped>
.login-card{
    width: 30rem;
    margin: 6rem auto;
}
</style>
