<template>
  <div class="artical">
    <div class="search">
      <el-input class="inp" v-model="pageInfo.searchVal" placeholder="请输入搜索内容"></el-input>
      <el-button type="primary" icon="el-icon-search" size="small" @click="search">搜索</el-button>
    </div>
    <el-card
      shadow="hover"
      class="bt"
      v-for="(item, index) in articalList"
      :key="index"
    >
      <div class="infoBox">
        <div class="userImg">
          <span>发布人：</span>
          <img :src="item.img" alt="" />
        </div>
        <div class="time">
          <span>发布时间：</span>
          <span class="times">{{ item.time }}</span>
        </div>
        <div class="title">
          <span class="biaoti">标题：</span>
          <span class="no-title" v-if="item.title == null || item.title == ''"
            >暂无标题</span
          >
          <span class="title-content">{{ item.title }}</span>
        </div>
        <div class="content">
          {{ item.content }}
        </div>
        <div class="img" v-if="item.imgList && item.imgList.length">
          <div v-for="(subItem, index) in item.imgList" :key="index">
            <img
              :src="subItem"
              v-if="subItem !== '' || subItem !== null"
              alt=""
            />
          </div>
        </div>
        <div class="comment"></div>
        <div class="card-bot">
          <div class="bot-l">
            <i class="iconfont icon-yanjing"></i>
            <!-- <i class="el-icon-view"></i> -->
            {{ item.saw }}
          </div>
          <div class="bot-r">
            <!-- <i class="el-icon-thumb"></i> -->
            <i class="iconfont icon-thumbup-fill"></i>
            {{ item.likes }}
          </div>
        </div>
      </div>
      <div class="box-r">
        <!-- <div class="item item-r">编辑</div> -->
        <div class="item item-l" @click="deleteItem(item)">删除</div>
        <!-- <el-popconfirm
            title="请确认是否要通过审批？"
            @confirm="deleteItem(item)"
          >
            <div class="item item-l">删除</div>
          </el-popconfirm> -->
      </div>
    </el-card>

    <div class="pagination">
      <el-pagination
        style="position: absolute; right: 0"
        :current-page="pageInfo.currentPage"
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total="1000"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getAllArtical, deleteArticals } from "@/api/index";
export default {
  name: "artical",
  data() {
    return {
      articalList: [],
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        searchVal:''
      },
    };
  },
  created() {
    this.init();
  },
  filters: {
    dealTime(val) {
      let date = new Date();
      let year = date.getFullYear().toString();
      let arr = val.split(" ");
      let time = arr[1].split(":");
      let arr1 = arr[0].split("-");
      if (year !== arr1[0]) {
        return arr[0];
      } else {
        return `${arr1[1]}-${arr1[2]} ${time[0]}:${time[1]}`;
      }
      console.log("arr", arr1, year);
    },
  },
  methods: {
    //初始化数据
    async init() {
      const res = await getAllArtical(this.pageInfo);
      if (res.status == 200) {
        this.articalList = res.data;
      }
    },
    handleCurrentChange(page) {
      this.pageInfo.currentPage = page;
      this.init();
      // console.log(page);
    },
    async deleteitem(item) {
      console.log(item);
      const res = await deleteArticals(item);
      if (res.status == 200) {
        this.init();
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      }
    },
    deleteItem(item) {
      this.$confirm("此操作将永久删除该文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteitem(item);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    search(){
      this.pageInfo.currentPage = 1
      this.pageInfo.pageSize = 10
      this.init()
    }
  },
};
</script>

<style lang="less" scoped>
.artical {
  .search{
    display: flex;
    align-items: center;
    .inp{
      width: 300px;
      margin-right: 16px;
    }
  }
  .bt {
    margin: 20px 0px;
    position: relative;
    .infoBox {
      .userImg {
        font-size: 14px;
        display: flex;
        align-items: center;
        font-weight: bold;
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          overflow: hidden;
        }
        margin-bottom: 10px;
      }
      .time {
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 10px;
        .times {
          font-weight: normal;
          color: #666;
        }
      }
      .title {
        display: flex;
        align-items: center;
        font-size: 14px;
        margin-bottom: 8px;
        .biaoti {
          font-weight: bold;
        }
        .title-content {
          color: #333;
        }
        .no-title {
          color: #bbb;
          font-size: 14px;
        }
      }
      .content {
        padding-left: 40px;
        margin-bottom: 10px;
      }
      .img {
        padding-left: 40px;
        display: flex;
        flex-wrap: wrap;
        img {
          width: 100px;
          height: 100px;
          margin: 0 10px;
        }
      }
      .card-bot {
        display: flex;
        align-items: center;
        color: #666;
        justify-content: right;
        i {
          font-size: 20px;
          color: #1f6cdd;
        }
        .bot-l {
          margin-right: 16px;
        }
      }
    }
    .box-r {
      position: absolute;
      top: 0;
      bottom: 0;
      right: -100%;
      width: 60px;
      background-color: rgba(0, 0, 0, 0.1);
      transition: right 1s ease-in-out;
      transition-delay: -0.7s;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      .item {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
      // .item-r{
      //   background-color:#409eff;
      //   &:hover{
      //     background-color: #66b1ff;
      //   }
      //   &:active{
      //     background-color: #3a8ee6;
      //   }
      // }
      .item-l {
        background-color: #f56c6c;
        &:hover {
          background-color: #f78989;
        }
        &:active {
          background-color: #dd6161;
        }
      }
    }
    &:hover {
      .box-r {
        right: 0;
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
