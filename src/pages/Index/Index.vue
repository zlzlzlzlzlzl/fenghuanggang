<!-- 地图页 -->
<template>
  <div class="page">
    <div class="section welcome">
      <div class="welcome-title">凤凰岗欢迎您</div>
    </div>
    <div class="section west-lake">
      <div class="west-lake-title">世界文化遗产-西湖</div>
    </div>
    <div class="section middle-funs">
      <div class="guide">导览地图</div>
      <div class="fun-list">
        <div class="fun-item fun-gd">旅游指南</div>
        <div class="fun-item fun-tfc">交通出行</div>
        <div class="fun-item fun-cmd">游览推荐</div>
        <div class="fun-item fun-src" @click="showIframe=true">网页搜索</div>
      </div>
    </div>
    <!-- 简介 -->
    <div class="section brief-intro">凤凰岗简介123</div>

    <div class="iframe-box" v-show="showIframe">
      <i class="icon-close" @click="showIframe=false"></i>
      <iframe id='iframe' scrolling="no" width="960px" height="1000px" src='https://www.baidu.com' frameborder="0" ></iframe>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      showIframe:false
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
.page {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(180deg, #0d1440 0%, #041b78 100%);
  padding: 36px 30px 0;
  .section {
    width: 100%;
    border-radius: 8px;
    margin-bottom: 30px;
    position: relative;
    background-color: #eee;
  }
  .welcome {
    height: 360px;

    .welcome-title {
      font-family: SimSun;
      font-size: 88px;
      line-height: 88px;
      font-weight: bold;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #ffffff;
      position: absolute;
      top: 64px;
      left: 44px;
    }
  }
  .west-lake {
    height: 360px;
    .west-lake-title {
      font-family: PingFangSC-Regular;
      font-size: 46px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 46px;
      letter-spacing: 0px;
      color: #ffffff;
      position: absolute;
      bottom: 43px;
      left: 41px;
    }
  }
  .middle-funs {
    height: 780px;
    display: flex;
    justify-content: space-between;
    .guide {
      width: 420px;
      height: 100%;
      border-radius: 8px;
      text-align: center;
      line-height: 780px;
      font-family: PingFangSC-Regular;
      font-size: 46px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #ffffff;
      margin-right: 40px;
    }
    .fun-list {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      .fun-item {
        width: 100%;
        height: 173px;
        border-radius: 8px;
        line-height: 173px;
        font-family: PingFangSC-Regular;
        font-size: 46px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        text-align: center;
        color: #ffffff;
        &.fun-gd {
          background-image: linear-gradient(90deg, #fbc28b 0%, #ef8d36 100%);
        }
        &.fun-tfc {
          background-image: linear-gradient(90deg, #a1d942 0%, #7cbc0e 100%);
        }
        &.fun-cmd {
          background-image: linear-gradient(90deg, #f3da37 0%, #f5b53a 100%);
        }
        &.fun-src {
          background-image: linear-gradient(90deg, #ff86ff 0%, #f641f2 100%);
        }
      }
    }
  }
  .brief-intro {
    height: 200px;
    line-height: 200px;
    text-align: center;
    font-family: PingFangSC-Regular;
    font-size: 46px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #ffffff;
  }
  .iframe-box{
    width: 960px;
    height: 1000px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    z-index: 9999;
    .icon-close{
      width: 100px;
      height: 100px;
      position: absolute;
      top: 30px;
      right: 30px;
      z-index: 99;
      background-color: #000;
      border-radius: 50%;
    }
  
  }
}
</style>
