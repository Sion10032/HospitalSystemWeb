import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      id: -1,
      email: '',
      username: '请登录',
      profile: {
        address: ''
      }
    },
    userGroup: [],
    isLogin: false,
    isCheck: false,
    department: [],
    bookingTimes: [],
    doctors: {},
    payTypes: [],
    medicineTypes: [],
    medicines: [],
    payMethods: [
      { id: 1, name: '现金' },
      { id: 2, name: '银联' },
      { id: 3, name: '支付宝' },
      { id: 4, name: '微信' }
    ],
    labTypes: [],
    works: [
      { text: '普通医生', value: '229' },
      { text: '专家医生', value: '228' },
      { text: '挂号人员', value: '235' },
      { text: '收银员', value: '230' },
      { text: '配药师', value: '227' },
      // { text: '财务审核人员', value: '' },
      { text: '分诊台工作人员', value: '234' }
    ],
    handoutStatus: [ '待配药', '配药中', '待取药', '取药中', '完成' ]
  },
  getters: {
    getLab: function (state) {
      return function (id) {
        for (let it of state.department) {
          if (it.id === id) {
            return it.name
          }
        }
      }
    },
    getTime: function (state) {
      return function (id) {
        for (let it of state.bookingTimes) {
          if (it.id === id) {
            return it.start + ' - ' + it.end
          }
        }
      }
    },
    getDoctor: function (state) {
      return function (id) {
        for (let k in state.doctors) {
          for (let it of state.doctors[k]) {
            if (it.id === id) {
              return it.profile.name
            }
          }
        }
      }
    },
    getMedicine: function (state) {
      return function (id) {
        for (let it of state.medicines) {
          if (it.id === id) {
            return it.name
          }
        }
      }
    }
  },
  mutations: {
    setUser: function (state, user) {
      state.user.id = user.id
      state.user.email = user.email
      state.user.username = user.username
      state.user.profile = user.profile
    },
    setUserGroup: function (state, userGroup) {
      state.userGroup.splice(0, state.userGroup.length)
      for (let it of userGroup) {
        state.userGroup.push(it)
      }
    },
    setLogin: function (state, loginState) {
      state.isLogin = loginState
    },
    setCheck: function (state, isCheck) {
      state.isCheck = isCheck
    },
    setDepartment: function (state, department) {
      state.department.splice(0, state.department.length)
      for (let it of department) {
        state.department.push(it)
      }
    },
    setBookingTimes: function (state, bookingTimes) {
      state.bookingTimes.splice(0, state.bookingTimes.length)
      for (let it of bookingTimes) {
        state.bookingTimes.push(it)
      }
    },
    addDoctors: function (state, doctors) {
      Vue.set(state.doctors, doctors.id, doctors.docs)
    },
    setPayTypes: function (state, payTypes) {
      state.payTypes.splice(0, state.payTypes.length)
      for (let it of payTypes) {
        state.payTypes.push(it)
      }
    },
    setMedicineTypes: function (state, medicineTypes) {
      state.medicineTypes.splice(0, state.medicineTypes.length)
      for (let it of medicineTypes) {
        state.medicineTypes.push(it)
      }
    },
    setMedicines: function (state, medicines) {
      state.medicines.splice(0, state.medicines.length)
      for (let it of medicines) {
        state.medicines.push(it)
      }
    },
    setLabTypes: function (state, labTypes) {
      state.labTypes.splice(0, state.labTypes.length)
      for (let it of labTypes) {
        state.labTypes.push(it)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
