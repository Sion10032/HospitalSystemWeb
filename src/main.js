import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.use(VueAxios, axios)

Vue.config.productionTip = false
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://47.106.164.144:8000/api/'
if (localStorage.getItem('access')) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access')
}

axios.all([
  axios({ method: 'get', url: '/departments/' }),
  axios({ method: 'get', url: '/reservation-time/' }),
  axios({ method: 'get', url: '/pay-types/' }),
  axios({ method: 'get', url: '/medicine-types/' }),
  axios({ method: 'get', url: '/medicine/' })
]).then(axios.spread((department, bookingTimes, payTypes, mTypes, medicine) => {
  store.commit('setDepartment', department.data)
  store.commit('setBookingTimes', bookingTimes.data)
  store.commit('setPayTypes', payTypes.data)
  store.commit('setMedicineTypes', mTypes.data)
  store.commit('setMedicines', medicine.data)
})).then(async () => {
  if (localStorage.getItem('refresh')) {
    await axios({
      method: 'post',
      url: '/auth/refresh/',
      data: {
        refresh: localStorage.getItem('refresh')
      }
    }).then((result) => {
      // 设置header
      localStorage.setItem('access', result.data['access'])
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access')
    }).catch((err) => {
      store.commit('setLogin', false)
      localStorage.clear()
      console.log(err)
    })
  }
}).then(async () => {
  if (localStorage.getItem('access')) {
    // 刷新用户信息
    await axios({
      method: 'get',
      url: '/auth/user/'
    }).then((result) => {
      store.commit('setUser', result.data)
      store.commit('setLogin', true)
    })
  }
}).then(async () => {
  let urls = []
  for (let it of store.state.department) {
    urls.push(axios({
      method: 'get',
      url: /groups/ + it.id + '/users/'
    }))
  }
  await axios.all(urls).then((result) => {
    for (let it of result) {
      store.commit('addDoctors', { id: it.config.url.split('/')[5], docs: it.data })
    }
  })
}).finally(() => {
  store.commit('setCheck', true)
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
