<template>
  <div id="lineBox" style="width: 800px; height: 300px;"></div>
</template>
<script>
import { getArticals } from "@/api/index";
import utils from '@/utils/utils'
export default {
    name:'line-echart',
    data() {
     return {
       option: null,
       myChart: null,
       timeData:[],
       numData:[]
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    //初始化数据
    //初始化数据
    async initData() {
      const res = await getArticals();
      if (res.status == 200) {
        let {time,data} = utils.dealTime(res.data);
        console.log('123132',time,data);
        this.timeData = JSON.parse(JSON.stringify(time))
        this.numData = JSON.parse(JSON.stringify(data))
      }
      this.option = {
        xAxis: {
          type: "category",
          data: this.timeData,
        },
        grid:{
            top:40,
            left:'5%',
            bottom:40,
            right:'5%'
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.numData,
            type: "line",
          },
        ],
      };
      //初始化echarts实例
      this.myChart = this.$echarts.init(document.getElementById("lineBox"));
      //使用制定的配置项和数据显示图表
      this.myChart.setOption(this.option);
    },
  },
};
</script>
