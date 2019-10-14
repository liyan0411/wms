<template>
  <div class="breadcrumbs">

		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/home' }"><i class="el-icon-info"></i> 首页</el-breadcrumb-item>
			<el-breadcrumb-item>{{name}}</el-breadcrumb-item>
		</el-breadcrumb>
  </div>
</template>
<script>
export default {
  name:"breadcrumb",
  props:{
    name:{
      type:String,
      default:function(){
        return ""
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .breadcrumbs{
    margin-bottom: 20px;
  }
</style>
