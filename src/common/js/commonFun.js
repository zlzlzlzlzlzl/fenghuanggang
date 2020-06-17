import Vue from 'vue';
// import { LoadingPlugin, ToastPlugin, AlertPlugin, AjaxPlugin } from 'vux'

// const that = this;
export default {
    // 两个经纬度之间的距离
    getGreatCircleDistance: function (lat1, lng1, lat2, lng2) {
        let EARTH_RADIUS = 6378137.0;
        let PI = Math.PI;

        function getRad(d) {
            return d * PI / 180.0;
        }
        let radLat1 = getRad(lat1);
        let radLat2 = getRad(lat2);

        let a = radLat1 - radLat2;
        let b = getRad(lng1) - getRad(lng2);

        let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
        s = s * EARTH_RADIUS;
        s = Math.round(s * 10000) / 10000.0;

        return s;    // 公里数
    },
    // //判断是否在中国
    // outOfChina(lat, lon) {
    //     if (lon < 72.004 || lon > 137.8347)
    //         return true;
    //     if (lat < 0.8293 || lat > 55.8271)
    //         return true;
    //     return false;
    // },
    // transformFromWGSToGCJ(longitude, latitude) {
    //     //如果在国外，则默认不进行转换
    //     if (this.outOfChina(latitude, longitude)) {
    //         return new LatLng(latitude, longitude);
    //     }
    //     let dLat = transformLat(longitude - 105.0,
    //         latitude - 35.0);
    //     let dLon = transformLon(longitude - 105.0,
    //         latitude - 35.0);
    //     let radLat = latitude / 180.0 * Math.PI;
    //     let magic = Math.sin(radLat);
    //     magic = 1 - ee * magic * magic;
    //     let sqrtMagic = Math.sqrt(magic);
    //     dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * Math.PI);
    //     dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * Math.PI);
    //     return [(parseFloat(latitude) + parseFloat(dLat)), (parseFloat(longitude) + parseFloat(dLon))];
    // },
    openLocation: function (name, lat1, lng1, lat2, lng2) {
        console.log(Vue.prototype.GLOBAL.isWx)
        if (Vue.prototype.GLOBAL.isWx) {
            Vue.prototype.$wechat.openLocation({
                latitude: Number(lat2), // 纬度，范围为-90~90，负数表示南纬
                longitude: Number(lng2), // 经度，范围为-180~180，负数表示西经
                scale: 28, // 缩放比例
                name: name, // 位置名
                // address: 'address', // 地址的详细说明
                success: function (res) {
                    // success
                },
                fail: function () {
                    // fail
                },
                complete: function () {
                    // complete
                }
            })
        } else {

            let url = "http://uri.amap.com/navigation//uri.amap.com/navigation?from=" + lng1 + "," + lat1 + ",我的位置&to=" +
                lng2 +
                "," +
                lat2 +
                "," +
                name +
                "&mode=car&policy=1&src=mypage&coordinate=gaode&callnative=0"
            window.location.href = url;

        }
    },
    getCookie: function (c_name) {
        if (document.cookie.length > 0) {
            let c_start = document.cookie.indexOf(c_name + "=");
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1;
                let c_end = document.cookie.indexOf(";", c_start);
                if (c_end == -1) {
                    c_end = document.cookie.length
                }
                return unescape(document.cookie.substring(c_start, c_end))
            }
        }
        return ""
    },
    delCookie: function (name) {
        let exp = new Date();
        exp.setTime(exp.getTime() - 1);
        let cval = getCookie(name);
        if (cval != null) {
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString()
        }
    },
    setCookie: function (name, value, time) {
        if (arguments.length == 2) {
            let Days = 7;
            let exp = new Date();
            exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
            document.cookie = name + "=" + escape(value) + "; expires=" + exp.toGMTString()
        } else {
            let strsec = getsec(time);
            let exp = new Date();
            exp.setTime(exp.getTime() + strsec * 1);
            document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString()
        }
    },
    getsec: function (str) {
        let str1 = str.substring(1, str.length) * 1;
        let str2 = str.substring(0, 1);
        if (str2 == "s") {
            return str1 * 1000
        } else {
            if (str2 == "h") {
                return str1 * 60 * 60 * 1000
            } else {
                if (str2 == "d") {
                    return str1 * 24 * 60 * 60 * 1000
                }
            }
        }
    },
    GetQueryString: function (name) {
        let url = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        let newUrl = window.location.search.substr(1).match(url);
        if (newUrl != null) {
            return unescape(newUrl[2]);
        } else {
            return false;
        }
    },
    getUrlCode() { // 截取url中的code方法
        let url = location.search
        this.winUrl = url
        let theRequest = new Object()
        if (url.indexOf("?") != -1) {
            let str = url.substr(1)
            let strs = str.split("&")
            for (let i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1])
            }
        }
        return theRequest
    },
    /**
 * 音频播放时间换算
 * @param {number} value - 音频当前播放时间，单位秒
 */
    transTime(value) {
        let time = "";
        let h = parseInt(value / 3600);
        value %= 3600;
        let m = parseInt(value / 60);
        let s = parseInt(value % 60);
        if (h > 0) {
            time = this.formatTime(h + ":" + m + ":" + s);
        } else {
            time = this.formatTime(m + ":" + s);
        }

        return time;
    },

    /**
     * 格式化时间显示，补零对齐
     * eg：2:4  -->  02:04
     * @param {string} value - 形如 h:m:s 的字符串 
     */
    formatTime(value) {
        let time = "";
        let s = value.split(':');
        let i = 0;
        for (; i < s.length - 1; i++) {
            time += s[i].length == 1 ? ("0" + s[i]) : s[i];
            time += ":";
        }
        time += s[i].length == 1 ? ("0" + s[i]) : s[i];

        return time;
    },
    // 判断空字符串
    trim(string) {
        return string.replace(/(^\s*)|(\s*$)/g, '')
    }
}