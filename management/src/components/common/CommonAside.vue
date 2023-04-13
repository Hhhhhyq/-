<template>
  <el-menu
    :default-active="activeTab"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <h3>{{ isCollapse ? "后台" : "失物招领管理平台" }}</h3>
    <template v-for="item in menuList">
      <template v-if="!item.children">
        <el-menu-item
          @click="clickMenu(item)"
          :key="item.name"
          :index="item.index"
        >
          <i :class="item.icon"></i>
          <span slot="title">{{ item.title }}</span>
        </el-menu-item>
      </template>
      <template v-else-if="item.children">
        <el-submenu :key="item.index" :index="item.index">
          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </template>
          <el-menu-item
            @click="clickMenu(subitem)"
            v-for="subitem in item.children"
            :key="subitem.index"
            :index="subitem.index"
          >
            <i :class="subitem.icon"></i>
            <span slot="title">{{ subitem.title }}</span>
          </el-menu-item>
        </el-submenu>
      </template>
    </template>
  </el-menu>
</template>
<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  height: 100vh;
  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
    font-size: 16px;
    font-weight: 400;
  }
}
</style>

<script>
import Cookie from "js-cookie";
export default {
  data() {
    return {
      activeTab: "1",
      menuList: [
        {
          index: "1",
          icon: "el-icon-menu",
          path: "/main",
          title: "首页",
        },
        // {
        //   index: '2',
        //   icon: "el-icon-s-help",
        //   path: "/screen",
        //   title: "数据驾驶舱",
        // },
        {
          index: "3",
          icon: "el-icon-user-solid",
          path: "/users",
          title: "用户管理",
        },
        {
          index: "4",
          icon: "el-icon-video-play",
          title: "物品审批",
          path: "/translate",
          children: [
            {
              index: "4 - 1",
              icon: "el-icon-search",
              path: "/translate/find",
              title: "寻物审批",
            },
            {
              index: "4 - 2",
              icon: "el-icon-search",
              path: "/translate/lose",
              title: "失物审批",
            },
          ],
        },
        {
          index: "5",
          icon: "el-icon-s-tools",
          path: "/goods",
          title: "物品管理",
          children: [
            {
              index: "5 - 1",
              icon: "el-icon-s-tools",
              path: "/goods/findManage",
              title: "寻物管理",
            },
            {
              index: "5 - 2",
              icon: "el-icon-s-tools",
              path: "/goods/releaseManage",
              title: "失物管理",
            },
          ],
        },
        {
          index: "6",
          icon: "el-icon-s-tools",
          path: "/artical",
          title: "文章管理",
        },
        {
          index: "7",
          icon: "el-icon-location",
          path: "/other",
          title: "其他",
        },
      ],
    };
  },
  created() {
    this.checkTab();
  },
  methods: {
    //数组柯里化刷新重新选定侧边栏
    checkTab() {
      let arr = [];
      this.menuList.forEach((item) => {
        if (item.children) {
          arr = [...arr, ...item.children];
        }
        arr.push(item);
      });
      let obj = arr.filter((item) => item.path == this.$route.path);
      this.activeTab = obj[0].index;
      this.clickMenu(this.$route);
    },
    // 点击菜单
    clickMenu(item) {
      // 当页面的路由与跳转的路由不一致才允许跳转
      if (
        this.$route.path !== item.path &&
        !(this.$route.path === "/home" && item.path === "/")
      ) {
        this.$router.push(item.path);
      }
      // this.$store.commit("homeStore/selectMenu", item);
    },
  },
  computed: {
    // 没有子菜单
    noChildren() {
      return this.menuList.filter((item) => !item.children);
    },
    // 有子菜单
    hasChildren() {
      return this.menuList.filter((item) => item.children);
    },
    menuData() {
      // 判断当前数据,如果缓存中没有,当前store中去获取
      return JSON.parse(Cookie.get("menu")) || this.$store.state.tab.menu;
    },
    isCollapse() {
      return this.$store.state.homeStore.isCollapse;
    },
  },
};
</script>
<style lang="less" scoped>
.el-menu {
  border-right: none;
}
</style>
