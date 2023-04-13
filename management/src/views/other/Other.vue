<template>
  <div class="other">
    <common-card title="新增轮播图片" type="banner" :list="bannerlist"></common-card>
    <common-card title="新增物品类型" type="goodstype" :list="typelist"></common-card>
    <common-card title="新增代收处" type="collection" color="warning" :list="collectionlist"></common-card>
    <common-card title="新增学院信息" type="college" color="success" :list="college"></common-card>
  </div>
</template>

<script>
import { getAllType } from "@/api/index";
import CommonCard from './CommonCard.vue';
export default {
  name: "other",
  components:{
    CommonCard
  },
  data() {
    return {
      typelist: [],//物品类型
      collectionlist:[], // 代收处
      college:[], //学院
      bannerlist:[] // 轮播
    };
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      const res = await getAllType();
      if(res.status == 200){
        this.typelist = this.handleData(res.data.typelist)
        this.collectionlist = this.handleData(res.data.collectionlist)
        this.college = this.handleData(res.data.college)
        this.bannerlist = this.banner(res.data.bannerlist)
      }
    },
    //图片处理
    banner(str){
      let arr4 = str.split(",");
      let arr5 = [];
      arr4.forEach((item,index) => {
        if (item == "" || arr5.indexOf(item) !== -1) {
          return;
        } else {
          let obj = {
            name: `轮播图 ${index}`,
            url:item
          }
          arr5.push(obj);
        }
      });
      return arr5;
    },
    //处理数据
    handleData(str) {
      let arr4 = str.split(",");
      let arr5 = [];
      arr4.forEach((item) => {
        if (item == "" || arr5.indexOf(item) !== -1) {
          return;
        } else {
          arr5.push(item);
        }
      });
      return arr5;
    }
  },
};
</script>

<style lang="less" scoped>
</style>
