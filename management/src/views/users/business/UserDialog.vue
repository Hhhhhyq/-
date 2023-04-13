<template>
  <div>
    <el-dialog
      title="修改密码"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item prop="password">
          <el-input
            v-model="ruleForm.password"
            placeholder="请输入要修改的密码"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="ok">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="管理员身份验证"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible1"
      width="30%"
    >
      <el-form :model="manageInfo" :rules="rules1" ref="manageInfo">
        <el-form-item prop="account">
          <el-input
            style="margin-bottom: 20px"
            prefix-icon="el-icon-user"
            v-model="manageInfo.account"
            placeholder="请输入管理员账号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            v-model="manageInfo.password"
            placeholder="请输入管理员密码"
          ></el-input>
        </el-form-item>
      </el-form>
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
      ruleForm: {
        password: "",
      },
      rules: {
        password: [
          {
            required: true,
            message: "请输入要修改的密码",
            trigger: "blur",
          },
        ],
      },
      rules1: {
        account: [
          {
            required: true,
            message: "请输入管理员账号",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入管理员密码", trigger: "blur" },
        ],
      },
      manageInfo: {
        account: "",
        password: "",
      },
      dialogVisible: false,
      dialogVisible1: false,
      input: "",
    };
  },
  methods: {
    ok() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.dialogVisible1 = true;
        }
      });
    },
    ok1() {
      this.$refs.manageInfo.validate((valid) => {
        if (valid) {
          this.dialogVisible1 = false;
          this.dialogVisible = false;
          this.manageInfo = {
            account: "",
            password: "",
          };
          this.ruleForm = {
            password: "",
          };
        }
      });
    },
  },
};
</script>

<style></style>
