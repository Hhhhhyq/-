<template>
  <div class="header">
    <div class="header-l">
      <span class="icon" @click="taggleSideMenu">
        <i v-if="!collapsed" class="el-icon-s-fold"></i>
        <i v-else class="el-icon-s-unfold"></i>
      </span>
    </div>
    <div class="header-r">
      <div class="r-content">
        <el-dropdown @command="handleClick">
          <span class="el-dropdown-link">
            <img class="user" src="../../assets/user.png" alt="" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click="toMyself">个人中心</el-dropdown-item>
            <el-dropdown-item command="cancel" @click="exit">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapMutations } = createNamespacedHelpers("homeStore");
export default {
  name: "common-header",
  computed: {
    ...mapGetters(["collapsed"]),
  },
  methods: {
    ...mapMutations(["taggleSideMenu"]),
    handleClick(command) {
      if (command === "cancel") {
        console.log("登出");
        // 清除cookie中的token
        Cookie.remove("token");
        // 清除cookie中的menu
        Cookie.remove("menu");
        // 跳转到登录页
        this.$router.push("/login");
      }
    },
    //个人中心
    toMyself(){
      
    },
    //退出登录
    exit(){

    }
  },
};
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e6e6e6;
  padding-right: 16px;
  .header-l {
    .icon {
      display: inline-block;
      width: 40px;
      height: 40px;
      display: flex;
      i {
        font-size: 24px;
        margin: auto;
      }
    }
  }
  .header-r {
    .r-content {
      .user {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
  }
}
</style>
