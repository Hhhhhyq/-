<template>
  <div>
    <div class="search">
      <el-input
        class="inp"
        v-model="pagination.searchVal"
        placeholder="请输入搜索内容"
      ></el-input>
      <el-dropdown style="margin-right: 16px" @command="select">
        <el-button type="primary" size="small">
          {{this.selectTitle}}<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="0">待审批</el-dropdown-item>
          <el-dropdown-item command="1">通过审批</el-dropdown-item>
          <el-dropdown-item command="2">拒绝审批</el-dropdown-item>
          <el-dropdown-item command="3">已寻得</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button
        type="primary"
        icon="el-icon-search"
        size="small"
        @click="search"
        >搜索</el-button
      >
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="标题">
              <span class="item">{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="昵称">
              <span class="item">{{ props.row.shop }}</span>
            </el-form-item>
            <el-form-item label="学院">
              <span class="item">{{ props.row.shop }}</span>
            </el-form-item>
            <el-form-item label="类型">
              <span class="item">{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="地址">
              <span class="item">{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="描述" style="display: block;width:100%;">
              <span class="item">{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item v-if="props.row.imgList && props.row.imgList.length" label="图片" style="display: block;width:100%;">
              <el-image :previewSrcList="props.row.imgList" style="width:100px;height:100px;margin-right:20px;" v-for="url in props.row.imgList" :key="url" :src="url" lazy></el-image>
            </el-form-item>
            <el-form-item v-else label="图片" style="display: block;width:100%;">
                <span class="no-img">暂无图片信息</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="标题" prop="title"> </el-table-column>
      <el-table-column label="类型" prop="name"> </el-table-column>
      <el-table-column label="描述" prop="desc"> </el-table-column>
      <el-table-column label="状态" prop="status">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === '0'" type="info">待审批</el-tag>
          <el-tag v-if="scope.row.status === '1'" type="success">通过审批</el-tag>
          <el-tag v-if="scope.row.status === '2'" type="danger"
            >拒绝审批</el-tag
          >
          <el-tag v-if="scope.row.status === '3'" type="success">已寻得</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        style="position:absolute;right:0;"
        @size-change="handleSizeChange"
        :current-page="pagination.currentPage"
        @current-change="handleCurrentChange"
        :page-sizes="pagination.pageSizes"
        :page-size="pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getAllOfRelease } from '@/api/index'
export default {
  name: "find-goods",
  created(){
    this.pagination.total = this.tableData.length
  },
  data() {
    return {
      tableData: [],
      selectTitle:'选择状态',
      selectVal:['待审批','通过审批','拒绝审批','已寻得'],
      pagination:{
        total:0,
        pageSize:10,
        pageSizes:[10,20,30,40,50],
        currentPage:1,
        searchVal:'',
        command:''
      }
    };
  },
  created(){
    this.init()
  },
  methods:{
    //初始化数据
    async init(){
      const res = await getAllOfRelease(this.pagination)
      if(res.status == 200){
        this.tableData = res.data
        this.pagination.total = res.total
      }
    },
    handleSizeChange(e){
        this.pagination.pageSize = e
        this.init()
    },
    handleCurrentChange(page){
        console.log(page);
        this.pagination.currentPage = page
        this.init()
    },
    async handleDelete({ id }) {
      let obj = {
        type: "release",
        id: id,
      };
      const res = await deleteGoodsItem(obj);
      console.log(res);
      this.$message({
        message: "删除成功",
        type: "success",
      });
      this.init();
    },
    search(){
      this.init()
    },
    select(command){
      console.log(command);
      this.pagination.command = command
      this.selectTitle = this.selectVal[command]
    }
  }
};
</script>

<style lang="less" scoped>
.item{
  color: #1F6CDD;
}
.search {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  .inp {
    width: 300px;
    margin-right: 16px;
  }
}
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
/deep/ .el-form-item__label{
    color: #333;
}
/deep/ .el-form-item__content{
    color: #666;
}
.no-img{
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
