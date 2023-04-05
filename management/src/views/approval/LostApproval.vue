<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="标题">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="昵称">
              <span>{{ props.row.shop }}</span>
            </el-form-item>
            <el-form-item label="学院">
              <span>{{ props.row.shop }}</span>
            </el-form-item>
            <el-form-item label="类型">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="描述" style="display: block; width: 100%">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item
              v-if="props.row.imgList && props.row.imgList.length"
              label="图片"
              style="display: block; width: 100%"
            >
              <el-image
                :previewSrcList="props.row.imgList"
                style="width: 100px; height: 100px; margin-right: 20px"
                v-for="url in props.row.imgList"
                :key="url"
                :src="url"
                lazy
              ></el-image>
            </el-form-item>
            <el-form-item
              v-else
              label="图片"
              style="display: block; width: 100%"
            >
              <span class="no-img">暂无图片信息</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="标题" prop="title"> </el-table-column>
      <el-table-column label="类型" prop="name"> </el-table-column>
      <el-table-column label="描述" prop="desc"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-popconfirm
            title="请确认是否要通过审批？"
            @confirm="checkApproval(scope.$index, scope.row)"
          >
            <el-button
              slot="reference"
              style="margin-right: 20px"
              size="mini"
              type="success"
              >审批</el-button
            >
          </el-popconfirm>
          <el-button slot="reference" @click="rejectApproval(scope.row)" size="mini" type="danger">拒绝审批</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        style="position: absolute; right: 0"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.currentPage"
        :page-sizes="pagination.pageSizes"
        :page-size="pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
      >
      </el-pagination>
    </div>
    <reject-dialog ref="dialog" type=1 :info="dialogItem" @init="init"></reject-dialog>
  </div>
</template>

<script>
import RejectDialog from './business/RejectDialog.vue'
import { getFind,approvalGoods } from '@/api/index'
export default {
  name: "lost-approval",
  components:{
    RejectDialog
  },
  created() {
    this.pagination.total = this.tableData.length;
  },
  data() {
    return {
      tableData: [],
      pagination: {
        total: 0,
        pageSize: 10,
        pageSizes: [5, 10, 20, 30, 40],
        currentPage: 1,
      },
      dialogItem:{}
    };
  },
  created(){
    this.init()
  },
  methods: {
    async init() {
      const res = await getFind(this.pagination);
      if (res.status == 200) {
        this.tableData = res.data;
        this.pagination.total = res.total;
      }
    },
    handleSizeChange(e) {
      this.pagination.pageSize = e;
      this.pagination.currentPage = 1;
      this.init();
    },
    handleCurrentChange(page) {
      this.pagination.currentPage = page;
      console.log('1',this.pagination);
      this.init();
    },
    approval() {
      this.visible1 = true;
    },
    //status 0 未审批
         //  1 审批
         //  2 拒绝审批
    async checkApproval(index, row) {
      const res = await approvalGoods(row)
      this.$message({
          message: '审批成功',
          type: 'success'
        });
      this.init()
    },
    rejectApproval(info){
      this.dialogItem = info
      this.$refs.dialog.visible = true
    }
  },
};
</script>
<style>
.el-popover {
  background-color: #fff !important;
  padding: 10px !important;
  border: 1px solid #ececec;
  border-radius: 4px;
}
</style>
<style lang="less" scoped>
.demo-table-expand {
  font-size: 0;
  padding: 0 20px;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
/deep/ .el-form-item__label {
  color: #333;
}
/deep/ .el-form-item__content {
  color: #666;
}
/deep/ .el-popover {
  background-color: #fff !important;
  padding: 10px !important;
}
.no-img {
  color: #bbbbbb;
}
.pagination {
  position: sticky;
  bottom: 0;
  z-index: 100;
  background-color: #fff;
  height: 60px;
  display: flex;
  align-items: center;
}
</style>
