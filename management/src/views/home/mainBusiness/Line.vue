<template>
  <div id="lineBox" style="width: 800px; height: 300px;"></div>
</template>
<script>
export default {
    name:'line-echart',
    data() {
     return {
       option: null,
       myChart: null,
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.option = {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
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
            data: [150, 230, 224, 218, 135, 147, 260],
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
