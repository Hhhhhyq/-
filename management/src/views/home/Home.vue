<template>
  <div class="home">
    <el-container>
            <el-aside width="auto">
                <common-aside />
            </el-aside>
            <el-container>
                <el-header style="padding:0;">
                    <common-header />
                </el-header>
                <!-- <common-tag /> -->
                <el-main style="background-color:rgb(247, 248, 249);width:100%;height:calc(100vh - 60px);padding:20px 20px 0 20px;overflow:overlay;">
                  <transition name="fade" mode="out-in">
                    <router-view></router-view>
                  </transition>
                </el-main>
            </el-container>
        </el-container>
  </div>
</template>

<script>
import CommonHeader from '@/components/common/CommonHeader.vue'
import CommonAside from '@/components/common/CommonAside.vue'
import CommonTag from '@/components/common/CommonTag.vue'
export default {
  name: "home",
  components:{
    CommonHeader,
    CommonAside,
    CommonTag
  }
};
</script>

<style lang="less" scoped>
.home {
    width: 100%;
    height: 100%;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
 
 
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
