<template>
  <div>
    login
    <el-button type="primary" @click="jump">登录</el-button>
  </div>
</template>
<script>
export default {
  name:"login",
  methods:{
    jump(){
      this.$router.push("/home");
    }
  }
}
</script>
