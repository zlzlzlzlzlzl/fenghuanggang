import Vue from 'vue'
import { WechatPlugin, AjaxPlugin } from 'vux'
// let sha1 = require('./sha1')
import sha1 from "sha1";
// import md5 from "md5"
Vue.use(WechatPlugin)
Vue.use(AjaxPlugin)


export default {
    //微信分享
    wxShare: (obj, callback) => {
        console.log(obj, callback);
        if (obj) {
            var title = obj.title == undefined || obj.title == null ? '测试系统' : obj.title;
            var link = obj.link == undefined || obj.link == null ? window.location.href : obj.link;
            var desc = obj.desc == undefined || obj.desc == null ? '测试系统' : obj.desc;
            var imgUrl = obj.imgUrl == undefined || obj.imgUrl == null ? 'src/img/share.png' : obj.imgUrl;
        } else {
            alert('请传分享参数');
        }

        Vue.wechat.onMenuShareTimeline({
            title: title, // 分享标题
            link: link, // 分享链接
            desc: desc, // 分享描述
            imgUrl: imgUrl, // 分享图标
            success: function () {
                callback && callback();
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        //分享到朋友
        Vue.wechat.onMenuShareAppMessage({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接
            imgUrl: imgUrl, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                // 用户确认分享后执行的回调函数
                callback && callback();
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        //分享到QQ
        Vue.wechat.onMenuShareQQ({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
                callback && callback();
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });

        //分享到QQ空间
        Vue.wechat.onMenuShareQZone({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
                callback && callback();
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });

        //分享到腾讯微博
        Vue.wechat.onMenuShareWeibo({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
                callback && callback();
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
    },
    wxConfig: (isDebug, shareObj, callback) => {
        function getUrl() {
            var url = window.location.href;
            //正常的，如果后续调用微信jssdk传值时官方手册原有的window.location.href.split("#")[0]提示url报错的话，使用encodeURIComponent()函数处理下就好，下面附上相关代码截图
            // var locationurl = encodeURIComponent(url.split('#')[0]);
            var locationurl = url.split('#')[0];
            // var locationurl = url;
            console.log(locationurl);

            return locationurl;
        }
        console.log(isDebug)
        //微信分享
        Vue.http.get(Vue.prototype.GLOBAL.BASE_URL + "/api/v1/index!getTokenAndTicket.action?appid=wx290628423cc53ed3").then(response => response.data.data).then(data => {
            // console.log('微信微信', data)
            let ret = {
                'appId': 'wx290628423cc53ed3',
                "timestamp": parseInt(new Date().getTime() / 1000),
                "nonceStr": Math.random().toString(36).substr(2),
                "jsapi_ticket": data.tokenAndTicket.ticket,
                "signature": '',
                "url": getUrl(),
            }
            let string = "jsapi_ticket=" + ret.jsapi_ticket + "&noncestr=" + ret.nonceStr +
                "&timestamp=" + ret.timestamp + "&url=" + ret.url;
            ret.signature = sha1(string);
            // console.log(ret)
            var wxdata = {
                'debug': isDebug,
                'appId': ret.appId,
                "timestamp": ret.timestamp,
                "nonceStr": ret.nonceStr,
                "jsapi_ticket": ret.jsapi_ticket,
                "signature": ret.signature,
                "url": ret.url,
                'jsApiList': [
                    // 所有要调用的 API 都要加到这个列表中
                    'getLocation',
                    "onMenuShareTimeline",
                    "onMenuShareAppMessage",
                    "onMenuShareQQ",
                    "onMenuShareWeibo",
                    "onMenuShareQZone",
                    "startRecord",
                    "stopRecord",
                    "onVoiceRecordEnd",
                    "playVoice",
                    "pauseVoice",
                    "stopVoice",
                    "onVoicePlayEnd",
                    "uploadVoice",
                    "downloadVoice",
                    "chooseImage",
                    "previewImage",
                    "uploadImage",
                    "downloadImage",
                    "translateVoice",
                    "getNetworkType",
                    "openLocation",
                    "getLocation",
                    "hideOptionMenu",
                    "showOptionMenu",
                    "hideMenuItems",
                    "showMenuItems",
                    "hideAllNonBaseMenuItem",
                    "showAllNonBaseMenuItem",
                    "closeWindow",
                    "scanQRCode",
                    "chooseWXPay",
                    "openProductSpecificView",
                    "addCard",
                    "chooseCard",
                    "openCard",
                ]
            };
            // var string = "jsapi_ticket=" + wxdata.jsapi_ticket + "&noncestr=" + wxdata.noncestr +
            //     "&timestamp=" + wxdata.timestamp + "&url=" + wxdata.url;
            // wxdata.signature = sha1(string)
            console.log(wxdata)

            Vue.wechat.config(wxdata);
            Vue.wechat.ready(function () {

                //ios的ua中无miniProgram，但都有MicroMessenger（表示是微信浏览器）
                Vue.wechat.miniProgram.getEnv(function (res) {
                    if (res.miniprogram) {
                        console.log("在小程序里");
                        sessionStorage.setItem('isSP','true')
                        // $('#busOrder').show()
                    } else {
                        sessionStorage.setItem('isSP','false')
                        console.log("不在小程序里");
                    }
                })
                Vue.wechat.onMenuShareTimeline({
                    title: shareObj.title, // 分享标题
                    link: shareObj.link, // 分享链接
                    desc: shareObj.desc, // 分享描述
                    imgUrl: shareObj.imgUrl, // 分享图标
                    success: function () {
                        callback && callback();
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
                //分享到朋友
                Vue.wechat.onMenuShareAppMessage({
                    title: shareObj.title, // 分享标题
                    link: shareObj.link, // 分享链接
                    desc: shareObj.desc, // 分享描述
                    imgUrl: shareObj.imgUrl, // 分享图标
                    type: '', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function () {
                        // 用户确认分享后执行的回调函数
                        callback && callback();
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
                //分享到QQ
                Vue.wechat.onMenuShareQQ({
                    title: shareObj.title, // 分享标题
                    link: shareObj.link, // 分享链接
                    desc: shareObj.desc, // 分享描述
                    imgUrl: shareObj.imgUrl, // 分享图标
                    success: function () {
                        // 用户确认分享后执行的回调函数
                        callback && callback();
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });

                //分享到QQ空间
                Vue.wechat.onMenuShareQZone({
                    title: shareObj.title, // 分享标题
                    link: shareObj.link, // 分享链接
                    desc: shareObj.desc, // 分享描述
                    imgUrl: shareObj.imgUrl, // 分享图标
                    success: function () {
                        // 用户确认分享后执行的回调函数
                        callback && callback();
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });

                //分享到腾讯微博
                Vue.wechat.onMenuShareWeibo({
                    title: shareObj.title, // 分享标题
                    link: shareObj.link, // 分享链接
                    desc: shareObj.desc, // 分享描述
                    imgUrl: shareObj.imgUrl, // 分享图标
                    success: function () {
                        // 用户确认分享后执行的回调函数
                        callback && callback();
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
                Vue.wechat.getLocation({
                    type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
                    success: function (res) {
                        // success
                        console.log('获取微信定位成功！')
                        // console.log(res);
                        // var lat = res.latitude;
                        // var lng = res.longitude;
                        sessionStorage.setItem("lat", res.latitude);
                        sessionStorage.setItem("lng", res.longitude);
                    }
                });

            })
        })
    }
}