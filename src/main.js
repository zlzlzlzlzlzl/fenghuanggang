// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import App from './App'
// 全局引入 loading/toast/alert
import { LoadingPlugin, ToastPlugin, AlertPlugin, AjaxPlugin } from 'vux'
// 公用方法
import commonFun from '@/common/js/commonFun'
// 全局引用
Vue.prototype.commonFun = commonFun;

Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
// ajax 请求插件 start
Vue.use(AjaxPlugin)
Vue.use(router)




/**
 * 定义常量
 */

import global_ from '@/components/global.vue';
// 挂载到vue 实例中：
Vue.prototype.GLOBAL = global_
console.log(Vue.prototype.GLOBAL)
// const apiPrefix = domainName + '/api/outer'
const loginTimeOutErrorCode = 'login_timeout_error'


// FastClick.attach(document.body)

/**
 * 定义全局公用常量
 */

// Vue.prototype.apiPrefix = apiPrefix

/**
 * 定义全局公用方法
 */
Vue.prototype.http = function (opts) {
  let vue = this;
  if (opts.isShowLoading) {
    vue.$vux.loading.show({
      text: '加载中...'
    })
  }


  vue.$http({
    method: opts.method,
    url: opts.url,
    headers: opts.headers || {},
    params: opts.params || {},
    data: opts.data || {}
  }).then(function (response) {
    vue.$vux.loading.hide()

    opts.success(response)
    // console.log(opts.url)
    console.log(response.data.data)
  }).catch(function (error) {
    vue.$vux.loading.hide()
    console.log(error)
    if (!opts.error) {
      console.log(!opts.error)
      let response = error.response
      let errorMessage = response.statusText
      console.log(response)
      console.log(errorMessage)
      
      // if (response && response.data) {

      //   if (response.data.code === loginTimeOutErrorCode) {
      //     window.location.href = '/'
      //   }
      //   if (response.status == 504 || response.status == 500) {
      //     console.log("504504504")
      //    errorMessage  ： Gateway Timeout
      //     window.location.href = '/'
      //     // errorMessage = '网页请求超时,请刷新重试'
      //   }
      //   // errorMessage = response.data.message
      // }
      
      vue.$vux.alert.show({
        title: '提示',
        content: errorMessage
        // content: '请求失败，请重试'
      })
    } else {
      console.log(opts.error(error.response.data.data))
      opts.error(error.response.data.data)
    }
  })
}

Vue.prototype.get = function (opts) {
  opts.method = 'get'
  this.http(opts)
}

Vue.prototype.post = function (opts) {
  opts.method = 'post'
  this.http(opts)
}

Vue.prototype.put = function (opts) {
  opts.method = 'put'
  this.http(opts)
}

Vue.prototype.delete = function (opts) {
  opts.method = 'delete'
  this.http(opts)
}

Vue.prototype.valid = function (opts) {
  let vue = this
  let valid = true

  if (opts.ref && !opts.ref.valid) {
    valid = false
  }

  if (opts.ignoreRefs) {
    let newRefs = []
    for (let i in opts.refs) {
      let ref = opts.refs[i]
      for (let j in opts.ignoreRefs) {
        let ignoreRef = opts.ignoreRefs[j]
        if (ref !== ignoreRef) {
          newRefs.push(ref)
        }
      }
    }
    opts.refs = newRefs
  }

  for (let i in opts.refs) {
    if (!opts.refs[i].valid) {
      valid = false
      break
    }
  }

  if (valid) {
    opts.success()
  } else if (opts.error) {
    opts.error()
  } else {
    vue.$vux.toast.show({
      text: '请检查输入'
    })
  }
}

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
