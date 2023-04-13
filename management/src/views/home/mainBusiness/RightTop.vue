<template>
  <div id="right-top" style="width: 100%; height: 300px"></div>
</template>
<script>
import echarts from "echarts";
export default {
  name: "right-top",
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
          axisTick: {
            //刻度线
            show: false
          },
          axisLine:{
            lineStyle:{
                color:'#ececec'
            },
            symbolOffset:[10,10]
          }
        },
        yAxis: {
          type: "value",
          axisLine:{
            show:false
          },
          axisTick: {
            //刻度线
            show: false
          },
          axisLabel:{
            show:false
          },
          splitLine:{
            lineStyle:{
                color:'#ececec'
            }
          }
        },
        grid:{
            top:30,
            left:'5%',
            right:'5%',
            bottom:30
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar",
            showBackground: true,
            // backgroundStyle: {
            //   color: "rgba(180, 180, 180, 0.2)",
            // },
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#83bff6" },
                { offset: 0.5, color: "#188df0" },
                { offset: 1, color: "#188df0" },
              ]),
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#2378f7" },
                  { offset: 0.7, color: "#2378f7" },
                  { offset: 1, color: "#83bff6" },
                ]),
              },
            },
            label:{
                show:true
            }
          },
        ],
      };
      //初始化echarts实例
      this.myChart = this.$echarts.init(document.getElementById("right-top"));
      //使用制定的配置项和数据显示图表
      this.myChart.setOption(this.option);
    },
  },
};
</script>
