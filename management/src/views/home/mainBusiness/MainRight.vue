<template>
  <div class="right">
    <div class="right-t">
      <el-card class="right-t0" shadow="hover">
        当前用户量
        <count-to :end-val="obj.userCount" :duration="3000"></count-to>
      </el-card>
      <el-card class="right-t0" shadow="hover">
        当前文章量
        <count-to :end-val="obj.articalCount" :duration="3000"></count-to>
      </el-card>
      <el-card class="right-t0" shadow="hover">
        物品数量
        <count-to :end-val="obj.goodsCount" :duration="3000"></count-to>
      </el-card>
      <el-card class="right-t0" shadow="hover">
        找回物品概率
        <count-to :end-val="obj.countRate" :decimals="2" :duration="3000" suffix="%"></count-to>
      </el-card>
      <!-- <right-top ref="rightTop"></right-top> -->
    </div>
    <vue-seamless-scroll :data="listData" class="right-b">
      <ul class="item">
        <li class="title-box" v-for="(item, index) in listData" :key="index">
          <i class="iconfont icon-wupindiushi"></i>
          <span class="title" v-text="item.title"></span>
          <span class="date" v-text="item.time"></span>
        </li>
      </ul>
    </vue-seamless-scroll>
  </div>
</template>

<script>
import countTo from 'vue-count-to'
import { getAllRelease, getAllFind,getCountNum } from "@/api/index";
import vueSeamlessScroll from "vue-seamless-scroll";
import RightTop from "./RightTop.vue";
export default {
  name: "main-right",
  components: {
    vueSeamlessScroll,
    RightTop,
    countTo
  },
  created() {
    this.init();
    this.initCountNum()
  },
  filters:{
    dealCount(val){
      return val+'%'
    }
  },
  data() {
    return {
      listData: [],
      obj:{}
    };
  },
  methods: {
    //时间转换
    timestampToTime(timestamp) {
      let date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let Y = date.getFullYear() + "-";
      let M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      let D = date.getDate() + " ";
      return Y + M + D;
    },
    async init() {
      const result1 = await getAllRelease();
      const result2 = await getAllFind();
      console.log("res", result1, result2);
      if (result1.status == 200 && result2.status == 200) {
        let arr = [...result1.data, ...result2.data];
        arr.forEach((item) => {
          item.time = this.timestampToTime(Number(item.time));
        });
        this.listData = arr;
      }
    },
    async initCountNum(){
      const res = await getCountNum()
      if(res.status == 200){
        this.obj = res.data
        console.log(this.obj);
      }
    }
  },
};
</script>

<style lang="less" scoped>
.right {
  .right-t {
    height: 300px;
    margin-bottom: 16px;
    background-color: #fff;
    display: flex;
    flex-wrap: wrap;
    .right-t0 {
      width: 50%;
      height: 50%;
      font-weight: bold;
      font-size: 20px;
    }
    .right-t1 {
    }
  }
  .right-b {
    background-color: #fff;
    height: 300px;
    margin: 0 auto;
    overflow: hidden;
    padding: 10px 20px;
    border-radius: 10px;
    box-sizing: border-box;
    .item {
      width: 100%;
      .title-box {
        height: 40px;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding: 0 10px;
        .title {
          flex: 1;
          flex-shrink: 0;
        }
        .date {
          flex-shrink: 0;
        }
        i {
          width: 30px;
          height: 30px;
          font-size: 20px;
        }
        &:nth-child(odd) {
          background-color: #ececec;
        }
      }
    }
    li,
    a {
      display: block;
      height: 30px;
      line-height: 30px;
      display: flex;
      justify-content: space-between;
      font-size: 15px;
    }
  }
}
</style>
