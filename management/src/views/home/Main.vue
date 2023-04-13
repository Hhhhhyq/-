<template>
  <div class="home-main">
    <div class="left">
      <div class="left-t">
        <circle-1 ref="circle1"></circle-1>
        <circle-2 ref="circle2"></circle-2>
      </div>
      <div class="left-b">
        <line-echart ref="lines"></line-echart>
      </div>
    </div>
    <div class="right">
      <main-right></main-right>
    </div>
  </div>
</template>

<script>
import MainRight from "./mainBusiness/MainRight.vue";
import Circle1 from "./mainBusiness/Circle1.vue";
import Circle2 from "./mainBusiness/Circle2.vue";
import LineEchart from './mainBusiness/Line.vue';
export default {
  name: "home-main",
  components: {
    MainRight,
    Circle1,
    Circle2,
    LineEchart
  },
  data() {
    return {
      dispatTimer1: null,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {},
  },
};
</script>

<style lang="less" scoped>
.home-main {
  background-color: rgb(247, 248, 249);
  height: 620px;
  display: flex;
  .left {
    box-sizing: border-box;
    width: 800px;
    height: 100%;
    margin-right: 16px;
    display: flex;
    flex-direction: column;
    .left-t {
      flex: 1;
      background-color: #fff;
      margin-bottom: 16px;
      border-radius: 10px;
      display: flex;
    }
    .left-b {
      flex: 1;
      background-color: #fff;
      border-radius: 10px;
    }
  }
  .right {
    flex: 1;
    height: 100%;
    // background-color: #fff;
    border-radius: 10px;
  }
  .top {
    margin-bottom: 20px;
    display: flex;
    #circle {
      width: 800px;
      height: 300px;
      background-color: #fff;
      border-radius: 10px;
    }
  }
  .bot {
    display: flex;
    #circle1 {
      width: 300px;
      height: 300px;
      background-color: #fff;
      border-radius: 10px;
    }
  }
}
</style>
