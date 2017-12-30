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
      <el-col class="sidebar-menu" :span="3">
        <el-menu  unique-opened
                  :defaultActive="path"
                  @select="goMenu">
          <nav-menu :menuList="menuList"></nav-menu>
        </el-menu>
      </el-col>

      <!-- 内容区域 -->
      <el-col class="main-content" :span="21">

        <!-- tab  -->
        <el-tabs :value="path" type="card" @tab-remove="tabRemove" @tab-click="handleTabClick">
          <el-tab-pane v-for="(tab, index) in tabList"
                       :label="tab.label"
                       :key="index"
                       :closable="tab.closable"
                       :name="tab.name">
          </el-tab-pane>
        </el-tabs>

        <!-- router -->
        <keep-alive>
          <router-view></router-view>
        </keep-alive>

      </el-col>
    </el-row>

  </div>
</template>

<script>
import NavMenu from "./components/components/navMenu";

export default {
  name: "app",
  components: {
    NavMenu
  },
  data() {
    return {
      activeIndex: "1",
      tabList: [
        {
          label: '个人中心',
          name: '/',
          closeable: false
        }
      ],
      menuList: [
      ]
    };
  },
  computed: {
    path() {
      return this.$route.path
    }
  },
  created() {
    console.log(this.path, 'created this.path')
    console.log(this.tabList, 'created this.tablist')
    console.log(window.He.menuList)

    this.menuList = window.He.menuList

    /* 刷新后未监听到的bug解决*/
    this.routeHandler(this.$route.path)

  },
  methods: {

    handleTabClick({name}) {
      this.goMenu(name)
    },

    filterMenu(menuList, path) {
      for (let menu of menuList) {
        if (menu.index == path){
          return menu
        }

        let subMenu = this.filterMenu(menu.children, path)
        if (subMenu) {
          return subMenu
        }
      }
    },
    goMenu(index) {
      this.$router.push({path: index})
    },
    tabRemove(path) {
      let index = this.tabList.findIndex(tab => {
        return tab.name == path
      })
      this.tabList.splice(index, 1)
      let tab = this.tabList[index - 1]
      this.goMenu(tab.name)
    },
    routeHandler(path) {
      let tab = this.tabList.find(({name}) => {
        return name == path
      })
      console.log(tab, 'find tab resule from routehandle')
      if (!tab) {
        let menu = this.filterMenu(this.menuList, path)
        console.log(menu, 'tab cant find MENU result')
        menu && this.tabList.push({
          label: menu.label,
          name: menu.index,
          closable: true,
        })
      }
    },
    showSettingsDialog() {

    }
  },
  watch: {
    '$route' ({path}) {
      this.routeHandler(path)

    },
    tabList (val) {
      console.log(val, 'tablist changed')
    },
    menuList (val) {
      console.log(val, 'menulist changed')
    }
  }
};
</script>

<style>
html,
body {
  padding: 0;
  margin: 0;
  height: 100%;
  overflow-x: hidden;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
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

.frame-container .sidebar-menu,
.frame-container .el-menu {
  height: 100%;
  overflow: auto;
}

.frame-container .main-content {
  padding: 10px 0 0 10px;
}
</style>
