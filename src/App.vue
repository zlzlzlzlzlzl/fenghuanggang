<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive  && isRouterAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
// import wx from "@/assets/utils/wx.js";
export default {
  name: "app",
  data() {
    return {
      isRouterAlive: true
    };
  },
  provide() {
    return {
      reload: this.reload
    };
  },
  mothods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  },
  created() {
    // 微信jssdk 配置
    // wx.wxConfig(
    //   false,
    //   {
    //     title: "", // 分享标题
    //     link: window.location.href, // 分享链接
    //     desc: "", // 分享描述
    //     imgUrl: "" // 分享图标
    //   },
    //   function() {
    //     //分享成功后的回调函数
    //     console.log("分享成功");
    //   }
    // );
  }
};
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";
@import "~vux/src/styles/1px.less";
@import "./common/css/basic.css";

.weui-toast__content {
  font-size: 14px !important;
}
.vux-loading .weui-toast {
  position: fixed;
  z-index: 5001;
  // width: 2.6rem !important;
  min-width: 130px;
  min-height: 130px;
  top: 50%;
  left: 50%;
  margin-left: none;
  background: hsla(0, 0%, 7%, 0.7);
  text-align: center;
  border-radius: 5px;
  color: #fff;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 130px;
  min-height: 130px;
}
</style>
