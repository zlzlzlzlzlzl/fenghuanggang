<!--  -->
<template>
    <div class=""></div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    let that = this;
    let code = that.commonFun.getUrlCode().code;
    console.log(code);
    if (code) {
      //如果连接中能拿到code说明此时access_token没有或者已过期，需要重新获取token
      that.get({
        url: that.GLOBAL.BASE_URL + "/api/v1/web_oauth!FindUserInfo.action",
        params: { code: code },
        success: function(data) {
          console.log(data);
          if (data == undefined) {
            //   code过期或者什么问题
          } else {
            //因为浏览器刷新vuex的值就初始化了，所以需要存到浏览器中
            //   sessionStorage.setItem(
            //     "wechataccess_token",
            //     res.data.data.access_token
            //   );
            //   sessionStorage.setItem("wechatuser_userName", res.data.data.userName);
            //   sessionStorage.setItem("wechatuser_id", res.data.data.user_id);
            that.commonFun.setCookie("member_id", data.member.member_id);
            that.commonFun.setCookie("member_head",that.GLOBAL.DOMAIN_URL+data.member.big_img);
            that.commonFun.setCookie("member_nick_name", data.member.nick_name);

          }
          let url = sessionStorage.getItem("beforeUrl");
          //跳转
          that.$router.push(url);
        }
      });
     
    }
  },
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
<style lang='less'>
//@import url(); 引入公共css类
</style>