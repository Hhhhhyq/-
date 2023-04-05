<template>
  <div>
    <el-dialog title="修改密码" :close-on-click-modal="false" :visible.sync="dialogVisible" width="30%">
      <el-input v-model="input" placeholder="请输入要修改的密码"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="ok"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog title="管理员身份验证" :close-on-click-modal="false" :visible.sync="dialogVisible1" width="30%">
      <el-input style="margin-bottom:20px;" prefix-icon="el-icon-user" v-model="manageInfo.account" placeholder="请输入管理员账号"></el-input>
      <el-input prefix-icon="el-icon-lock" v-model="manageInfo.password" placeholder="请输入管理员密码"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="ok1">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  naem: "user-dialog",
  props: {
    userInfo: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      manageInfo:{
        account:'',
        password:''
      },
      dialogVisible: false,
      dialogVisible1: false,
      input: "",
    };
  },
  methods: {
    ok() {
      if(this.input !== ''){
        this.dialogVisible1 = true;
      }
    },
    ok1() {
      this.dialogVisible1 = false;
      this.dialogVisible = false;
    },
  },
};
</script>

<style></style>
