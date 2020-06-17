<script type="text/ecmascript-6">
let BASE_URL;
//打包环境判断
if (process.env.NODE_ENV == "production") {
  // console.log('正式环境')
  BASE_URL = "https://daoyou.worldmaipu.com";
} else {
  // console.log('测试环境')
  //不用跨域
  // Vue.prototype.GLOBAL.BASE_URL = "http://192.168.1.8:8081"
  //跨域，proxyTable代理，自定义如/api
  BASE_URL = "/api";
}
const DOMAIN_URL = "https://daoyou.worldmaipu.com/"; //资源域名地址

let u = navigator.userAgent;
let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
let isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
let isWx = u.toLowerCase().match(/MicroMessenger/i) == "micromessenger";
let isPc = !/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent);

export default {
  BASE_URL, //接口地址
  DOMAIN_URL, //静态文件域名
  isAndroid, //是否在安卓
  isIos, //是否在ios
  isWx, //是否在微信
  isPc //是否在pc
};
</script>