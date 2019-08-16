<template>
  <div>
    <!-- 头部导航组件 -->
    <v-header></v-header>
    <!-- 侧滑菜单组件 -->
    <left-panel>
      <div>
        <v-menu/>
      </div>
    </left-panel>
    <!-- 路由视图 -->
    <el-main>
      <v-content/>
    </el-main>
  </div>
</template>

<script>
import vHeader from './header'
import leftPanel from "@/components/LeftPanel"
import vContent from "./content"
import vMenu from "./menu"
export default {
  name: 'Layout',
  components: {
    vHeader,
    leftPanel,
    vContent,
    vMenu
  },
  data(){
    return {
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>

.el-main{
  padding: 10px;
}
</style>
