<template>
  <div id="chart2" style="width: 400px; height: 300px"></div>
</template>
<script>
import { find } from '@/api/index'
export default {
  data() {
    return {
      option: null,
      myChart: null,
      num: 0,
      timer: null,
      title: "",
      circleData:[]
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    async initData() {
      const res = await find()
      console.log(res);
      if(res.status == 200){
        this.circleData = res.data
      }
      this.option = {
        title: {
          text: "寻物启事",
          left:"left",
          top:20,
          left:10
        },
        legend: {
          orient: "vertical",
          left: "right",
          top:20
        },
        series: [
          {
            name: "访问量",
            type: "pie",
            radius: "70%",
            legendHoverLink: true,
            hoverAnimation: false,
            selectedMode: "single",
            label: {
              normal: {
                position: "inner",
                show: false,
              },
            },
            labelLine: {
              normal: {
                position: "inner",
                show: false,
              },
            },
            data:this.circleData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      //初始化echarts实例
      this.myChart = this.$echarts.init(document.getElementById("chart2"));
      //使用制定的配置项和数据显示图表
      this.myChart.setOption(this.option);
      //开启定时器
      this.setTimeToDo();
      this.setHighLight();
      const data = this.option.series[0].data;
      let debounce = null;
      this.myChart.on("mouseover", (params) => {
        clearInterval(this.timer);
        // 鼠标快速移动时，会导致mouseover里的代码来不及执行，引起事件延迟，出现多个扇形区域同时被选中的现象，所以有必要设置防抖函数
        debounce && clearTimeout(debounce);
        debounce = setTimeout(() => {
          const data = this.option.series[0].data;
          data.forEach((e) => (e.selected = false));
          data[params.dataIndex].selected = true;
          this.myChart.setOption(this.option);
          this.num = params.dataIndex;
          this.title = params.name;
        }, 300);
      });
      this.myChart.on("mouseout", (params) => {
        this.setTimeToDo();
        this.setHighLight();
      });
      // 当切屏时，定时器容易执行异常，所以如果用户切屏，就暂停定时器
      window.onblur = () => {
        clearInterval(this.timer);
      };
      window.onfocus = () => {
        this.setHighLight();
      };
    },
    setTimeToDo() {
      const data = this.option.series[0].data;
      data.forEach((e) => (e.selected = false));
      data[this.num].selected = true;
      //   this.title = data[this.num].name;
      // 必须重新设置option，因为echart没有监听data的变化
      this.myChart.setOption(this.option);
    },
    setHighLight() {
      clearInterval(this.timer);
      const data = this.option.series[0].data;
      this.timer = setInterval(() => {
        if (this.num < data.length - 1) {
          this.num++;
        } else {
          this.num = 0;
        }
        this.setTimeToDo();
      }, 2000);
    },
  },
};
</script>
