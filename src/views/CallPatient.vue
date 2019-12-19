<template>
  <v-container fluid>
    <div>
      <v-btn color="primary" @click="onCallClick">叫号</v-btn>
    </div>
    <div v-if="rawQueue">
      <p v-for="item in queue"
        :key="item.id">
        {{ item.profile.name }}
      </p>
    </div>
  </v-container>
</template>

<script>
export default {
  data: function () {
    return {
      rawQueue: null
    }
  },
  computed: {
    queue: function () {
      let result = []
      for (let k in this.rawQueue.department) {
        for (let it of this.rawQueue.department[k]) {
          result.push(it)
        }
      }
      return result
    }
  },
  created: function () {
    // this.getWaitQueue()
    setInterval(() => this.getWaitQueue(), 5000)
  },
  methods: {
    onCallClick: function () {
      if (localStorage.getItem('curPatient')) {
        alert('请先完成当前就诊！')
        this.$router.push({ name: 'diagnosis', params: { patientId: localStorage.getItem('curPatient') } })
        return
      }
      this.$axios({
        method: 'get',
        url: '/wait-queue/?top=1&department=' + localStorage.getItem('department')
      }).then((res) => {
        localStorage.setItem('curPatient', res.data.id)
        alert('准备开始诊断病人：' + res.data.profile.name)
        this.$router.push({ name: 'diagnosis', params: { patientId: res.data.id } })
      })
    },
    getWaitQueue: function () {
      this.$axios({
        method: 'get',
        url: '/wait-queue/'
      }).then((res) => {
        this.rawQueue = res.data
      })
    }
  }
}
</script>

<style>
</style>
