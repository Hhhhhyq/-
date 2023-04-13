<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <div class="title">{{ title }}</div>
    </div>
    <template v-if="type == 'banner'">
      <el-upload
        class="upload-demo"
        action="http://192.168.100.13:3000/api/image/uploadBanner/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="listData"
        :on-success="success"
        list-type="picture"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
    </template>
    <template v-else>
      <el-tag
        :key="tag"
        v-for="tag in list"
        :type="color"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)"
      >
        {{ tag }}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput"
        >+ 添加类型</el-button
      >
    </template>
  </el-card>
</template>

<script>
import { updateType } from "@/api/index";
export default {
  name: "common-card",
  props: {
    title: {
      type: String,
      default: "标题",
    },
    type: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "",
    },
    list: {
      type: Array,
      default: [],
    },
  },
  watch: {
    list: {
      handler(val) {
        this.listData = val;
      },
      immediate: true,
    },
  },
  data() {
    return {
      listData: [],
      inputVisible: false,
      inputValue: "",
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  methods: {
    //数据上传
    async update() {
      let obj = {
        type: this.type,
        data: this.listData.toString(),
      };
      const res = await updateType(obj);
      if (res.status == 200) {
        this.$message({
          message: res.message,
          type: "success",
        });
      }
    },
    //删除tag
    handleClose(tag) {
      this.list.splice(this.list.indexOf(tag), 1);
      this.update();
    },
    //物品类型->输入框聚焦
    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue.trim() == "") {
        this.inputVisible = false;
        this.inputValue = "";
        return;
      }
      if (inputValue) {
        this.list.push(inputValue);
      }
      this.update();
      this.inputVisible = false;
      this.inputValue = "";
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    success(res, file, fileList) {
      if (res.status == 200) {
        let obj = {
          name: "",
          url: res.data.url,
        };
        this.listData.push(obj);
        console.log('111',this.listData);
        this.upload()
      }
    },
    // // 上传图片->数据库
    async upload(){
        let str = ''
        let length = this.list.length
        this.list.forEach((item,index)=>{
            if(index == length-1){
                str +=item.url
            }else {
                str = item.url + ','
            }
        })
        let obj = {
            type:this.type,
            data:str
        }
        const res = await updateType(obj)
        if(res.status == 200){
            this.$message({
                message: res.message,
                type: "success",
            });
        }
    }

  },
};
</script>

<style lang="less" scoprd>
.box-card {
  margin-bottom: 20px;
  .el-upload-list__item {
    width: fit-content;
    display: inline-block;
    margin-right: 20px;
    a {
      display: none;
    }
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .title {
    font-size: 16px;
    line-height: 1.5;
    font-weight: bold;
  }
}
</style>
