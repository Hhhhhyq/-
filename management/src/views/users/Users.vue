<template>
  <div class="user">
    <el-table :data="userList" stripe style="width: 100%;">
      <el-table-column label="头像" width="100%">
        <template slot-scope="scoped">
          <img class="image" :src="scoped.row.img" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="email" label="账号" width="200px"> </el-table-column>
      <el-table-column prop="name" label="昵称"> </el-table-column>
      <!-- <el-table-column prop="password" label="密码"> </el-table-column> -->
      <el-table-column prop="sex" label="性别"> </el-table-column>
      <el-table-column prop="school" label="学院"> </el-table-column>
      <el-table-column
      label="操作"
      width="200">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">修改密码</el-button>
        <el-button @click="show(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    <!-- <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination> -->
    <!-- 修改密码 -->
    <user-dialog ref="dialog"  :userInfo="dialogInfo"></user-dialog>
    <!-- 查看 -->
    <info-card ref="infoCard"  :userInfo="dialogInfo"></info-card>
  </div>
</template>

<script>
import UserDialog from './business/UserDialog.vue'
import InfoCard from './business/InfoCard.vue'
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("userStore");
export default {
  name: "user",
  props: {},
  components: {
    UserDialog,
    InfoCard
  },
  created() {
    this.getAllUsers(this.pageInfo);
  },
  data() {
    return {
      // userList:[]
      pageInfo: {
        page: 1,
        pageSize: 10,
      },
      dialogInfo:{}
    };
  },
  computed: {
    ...mapGetters(["userList"]),
  },
  methods: {
    ...mapActions(["getAllUsers"]),
    handleClick(item){
      console.log(item);
      this.dialogInfo = item
      this.$refs.dialog.dialogVisible = true
    },
    show(item){
      this.dialogInfo = item
      this.$refs.infoCard.dialogVisible = true
    }
    // async getUsers(){
    //   const res = await getAllUser()
    //   this.userList = res.data
    //   console.log(this.userList);
    // }
  },
};
</script>

<style lang="less" scoped>
.user {
  .image{
    width: 60px;
    height: 60px;
  }
}
</style>
