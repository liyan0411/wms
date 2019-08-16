<template>
  <div class="container">
    <el-header class="app-header" height="60px">
      <i class="el-icon-menu" @click="show=!show"></i>

      header
    </el-header>
  </div>
</template>
<script>
export default {
  name:"Header",
  data(){
    return {

    }
  },
  computed: {
    show: {
      get() {
        return this.$store.state.setting.isMenu
      },
      set(val) {
        this.$store.dispatch('setting/changeSetting', {
          key: 'isMenu',
          value: val
        })
      }
    },
  }
}
</script>
<style lang="scss" scoped>
.app-header{
  width:100%;
  background: red;
  position: fixed;
  top:0;
  z-index: 888;
}
</style>
