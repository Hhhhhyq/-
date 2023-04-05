<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="发布人:">
              <span class="item">{{ props.row.publishername }}</span>
            </el-form-item>
            <el-form-item label="学院:">
              <span class="item">{{ props.row.college }}</span>
            </el-form-item>
            <el-form-item label="标题:">
              <span class="item">{{ props.row.title }}</span>
            </el-form-item>
            <el-form-item label="类型:">
              <span class="item">{{ props.row.selectType }}</span>
            </el-form-item>
            <el-form-item label="地址:">
              <span class="item">{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="备注:" style="display: block; width: 100%">
              <span class="item">{{ props.row.remarks }}</span>
            </el-form-item>
            <el-form-item
              v-if="props.row.imgList && props.row.imgList.length"
              label="图片:"
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
      <el-table-column label="类型" prop="selectType"> </el-table-column>
      <el-table-column label="备注" prop="remarks">
        <template slot-scope="scoped">
          <span v-if="scoped.row.remarks== '' || scoped.row.remarks== null">- -</span>
        </template>
      </el-table-column>
      <el-table-column label="发布时间" prop="time"> </el-table-column>
      <el-table-column label="拾取地点" prop="address"> </el-table-column>
      <el-table-column label="操作"> 
        <template slot-scope="scope">
          <el-popconfirm
            title="请确认是否要通过审批？"
            @confirm="checkApproval(scope.$index, scope.row, '1')"
          >
            <el-button slot="reference" style="margin-right:20px;" size="mini" type="success"
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
import { getRelease,approvalGoods } from '@/api/index'
export default {
  name: "goods-approval",
  components:{
    RejectDialog
  },
  data() {
    return {
      tableData: [
        {
          title: "12987122",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          status: 0,
          shopId: "10333",
          imgList: [
            "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
            "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
            "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
            "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
            "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg",
            "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
            "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg",
          ],
        },
        {
          title: "12987123",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          status: 0,
          shopId: "10333",
        },
        {
          title: "12987125",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          status: 1,
          shopId: "10333",
        },
        {
          title: "12987125",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          status: 1,
          shopId: "10333",
        },
        {
          title: "12987125",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          status: 1,
          shopId: "10333",
        },
        {
          title: "12987125",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          status: 1,
          shopId: "10333",
        },
        {
          title: "12987125",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          status: 1,
          shopId: "10333",
        },
        {
          title: "12987125",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          status: 1,
          shopId: "10333",
        },
        {
          title: "12987125",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          status: 1,
          shopId: "10333",
        },
        {
          title: "12987125",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          status: 1,
          shopId: "10333",
        },
        {
          title: "12987125",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          status: 1,
          shopId: "10333",
        },
        {
          title: "12987126",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          status: 2,
          shopId: "10333",
        },
      ],
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
    async init(){
      const res = await getRelease(this.pagination)
      console.log(res);
      if(res.status == 200){
        this.tableData = res.data
        this.pagination.total = res.total
      }
    },
    handleSizeChange(e) {
      this.pagination.pageSize = e;
      this.pagination.currentPage = 1
      this.init()
    },
    handleCurrentChange(page) {
      this.pagination.currentPage = page;
      this.init()
    },
    approval() {
      this.visible1 = true;
    },
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
.item{
  color: #1F6CDD;
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
