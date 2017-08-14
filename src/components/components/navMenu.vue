<template>
  <div>
    <template v-for="(menu , index) in menuList">
      <el-menu-item v-if="!menu.children.length" :index="menu.index">
        <i class="el-icon-menu"></i>
        <span>{{menu.label}}</span>
      </el-menu-item>

      <el-submenu v-if="menu.children.length" :index="menu.index">
        <template slot="title">
          <i class="el-icon-message"></i>
          <span>{{menu.label}}</span>
        </template>

        <!--递归调用-->
        <nav-menu :menuList="menu.children"></nav-menu>
      </el-submenu>

    </template>
  </div>
</template>

<script>
  export default {
    name: 'NavMenu',
    props:{
      menuList:{
        type:Array,
        required:true
      }
    },
    data() {
      return {}
    },

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
