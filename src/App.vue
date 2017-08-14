<template>
  <div id="app" class="he-workspace">

    <!-- 顶部菜单 -->
    <div class="frame-header">
      <ul class="header-operations left">
        <li class="logo">
          文小窝
        </li>
        <li>我的主页</li>
        <li>所有功能</li>
        <li>常用功能</li>
      </ul>
      <ul class="header-operations right">
        <!--<li @click="isFullscreen=true">-->
        <!--<i class="qz-icon-fullscreen"></i> 全屏模式-->
        <!--</li>-->
        <li @click="showSettingsDialog">设置</li>
        <li>消息</li>
        <li>退出</li>
      </ul>
    </div>

    <!-- 侧栏菜单 -->
    <el-row class="frame-container">
      <el-col class="sidebar-menu" :span="4">
        <el-menu  unique-opened @select="handleSelect">
          <nav-menu :menuList="menuList"></nav-menu>
        </el-menu>
      </el-col>

      <!-- 内容区域 -->
      <el-col class="main-content" :span="20">
        <router-view></router-view>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import NavMenu from './components/components/navMenu'

  export default {
    name: 'app',
    components:{
      NavMenu
    },
    data() {
      return {
        activeIndex: '1',
        menuList:[
          {
            label:'个人中心',
            url:'/personal-center/',
            index:'/personal-center/',
            children:[]
          },
          {
            label:'小功能',
            url:'/demo-function/',
            index:'/demo-function/',
            children:[
              {
                label:'计算器',
                url:'/demo-function/calc/',
                index:'/demo-function/calc/',
                children:[]
              }
            ]
          },
        ]
      }
    },
    methods: {
      handleSelect(path) {
        console.log(path)
          this.$router.push({path:path})

      },

      showSettingsDialog() {
      }
    }
  }
</script>

<style>
  html, body {
    padding: 0;
    margin: 0;
    height: 100%;
    overflow-x: hidden;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }

  .he-workspace {
    height: 100%;
    position: relative;
  }

  .he-workspace .frame-header {
    height: 60px;
    line-height: 60px;
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    padding: 0 20px;
    z-index: 1;
    box-sizing: border-box;
    background-color: #20a0ff;
  }

  .he-workspace .frame-header .logo {
    display: inline-block;
    height: 100%;
    font-size: 24px;
    height: 100%;
    line-height: 60px;

  }

  .he-workspace .frame-header .header-operations {
    display: inline-block;
    height: 100%;
    margin: 0;
  }

  .frame-header .header-operations li {
    color: #fff;
    font-size: 14px;
    display: inline-block;
    vertical-align: middle;
    padding: 0 20px;
    cursor: pointer;
    line-height: initial;
  }

  .frame-container {
    height: 100%;
    padding-top: 60px;
  }

  .frame-container .sidebar-menu, .frame-container .el-menu {
    height: 100%;
    overflow: auto;
  }

  .frame-container .main-content{
    padding:10px 0 0 10px;
  }
</style>
