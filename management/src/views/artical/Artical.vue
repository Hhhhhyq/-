<template>
  <div class="artical">
    <el-card
      shadow="hover"
      class="bt"
      v-for="(item, index) in articalList"
      :key="index"
    >
      <div class="infoBox">
        <div class="title">
          <span class="biaoti">标题：</span>
          <span class="no-title" v-if="item.title == null || item.title == ''">暂无标题</span>
          <span class="title-content">{{item.title}}</span>
        </div>
        <div class="content">
          {{item.content}}
        </div>
        <div class="img" v-if="item.imgList && item.imgList.length">
          <div  v-for="(subItem,index) in item.imgList" :key="index">
            <img :src="subItem" v-if="subItem !== '' || subItem !== null" alt="">
          </div>
          
        </div>
      </div>
    </el-card>
    <div class="pagination">
      <el-pagination style="position: absolute; right: 0" :current-page="pageInfo.currentPage" @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000"> </el-pagination>
    </div>
  </div>
</template>

<script>
import { getAllArtical } from "@/api/index";
export default {
  name: "artical",
  data() {
    return {
      articalList: [],
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
      },
    };
  },
  created() {
    this.init();
  },
  methods: {
    //初始化数据
    async init() {
      const res = await getAllArtical(this.pageInfo);
      if (res.status == 200) {
        this.articalList = res.data;
      }
      console.log(res);
    },
    handleCurrentChange(page){
      this.pageInfo.currentPage = page
      this.init()
      // console.log(page);
    }
  },
};
</script>

<style lang="less" scoped>
.artical {
  .bt {
    margin: 20px 0px;
    .infoBox{
      .title{
        display: flex;
        align-items: center;
        font-size: 14px;
        margin-bottom: 8px;
        .biaoti{
          font-weight: bold;
        }
        .title-content{
          color: #333;
        }
        .no-title{
          color: #BBB;
          font-size: 14px;
        }
      }
      .content{
        padding-left: 40px;
        margin-bottom: 10px;
      }
      .img{
        padding-left: 40px;
        display: flex;
        flex-wrap: wrap;
        img{
          width: 100px;
          height: 100px;
          margin: 0 10px;
        }
      }
    }
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
}
</style>
