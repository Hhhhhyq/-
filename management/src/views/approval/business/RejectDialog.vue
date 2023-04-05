<template>
  <el-dialog
    title="拒绝审批"
    :visible.sync="visible"
    width="30%"
    :close-on-click-modal="false"
  >
    <el-input type="textarea" :rows="4" maxlength="100" placeholder="请输入拒绝理由" v-model="rejectText"></el-input>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="ok">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { rejectApproval } from '@/api/index'
export default {
    name:'reject-dialog',
    props:{
        info:{
            type:Object,
            default:()=>{}
        }
    },
    data(){
        return {
            visible:false,
            rejectText:''
        }
    },
    methods:{
        async ok(){
            this.visible = false    
            let obj = {
                info:this.info,
                rejectText:this.rejectText
            }
            const res = await rejectApproval(obj)
            this.$message({
                message: '审批成功',
                type: 'success'
            });
            this.$emit('init')
        }
    }
};
</script>

<style></style>
