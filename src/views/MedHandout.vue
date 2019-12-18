<template>
  <v-container>
    <h3 style="margin-bottom: 10px;">等待配药</h3>
    <div class="handouts-wrapper" v-if="handouts.now">
      <hanout-item
        v-for="handout in handouts.now"
        :key="handout.id"
        :handout="handout"
        @showPre="showPre"
        @goNextStep="goNextStep">
      </hanout-item>
    </div>
    <h3 style="margin-bottom: 10px;">配药历史</h3>
    <div class="handouts-wrapper" v-if="handouts.history">
      <hanout-item
        v-for="handout in handouts.history"
        :key="handout.id"
        :handout="handout"
        @showPre="showPre"
        @nextStep="goNextStep">
      </hanout-item>
    </div>
    <v-overlay v-if="selectItem" :value="selectItem">
      <v-card class="d-flex flex-column justify-center align-stretch meds-wrapper" light>
        <div class="overline mb-3">取药单{{ selectItem.id }}详细信息 - {{ $store.state.handoutStatus[selectItem.handout_status] }}</div>
        <div
          class="d-flex justify-space-between align-center"
          style="height: 40px;"
          v-for="item in selectItem.prescription.items"
          :key="item.id">
          <div>{{ $store.getters.getMedicine(item.id) }}</div>
          <div>{{ item.count }}</div>
        </div>
        <div class="d-flex justify-space-between align-center" style="margin-top: 20px;">
          <v-btn
            fab small color="error"
            @click="selectItem = null">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-btn
            fab small color="success"
            @click="goNextStep(selectItem)"
            :disabled="selectItem.handout_status === 4">
            <v-icon>mdi-arrow-right</v-icon>
          </v-btn>
        </div>
      </v-card>
    </v-overlay>
  </v-container>
</template>

<script>
import HanoutItem from '../components/HandoutItem.vue'

export default {
  components: {
    HanoutItem
  },
  data: function () {
    return {
      handouts: {
        now: [],
        history: []
      },
      selectItem: null
    }
  },
  created: function () {
    this.getHanouts()
  },
  methods: {
    getHanouts: function () {
      this.$axios({
        method: 'get',
        url: '/medicine-handout-records/'
      }).then((res) => {
        this.handouts.now.splice(0, this.handouts.now.length)
        this.handouts.history.splice(0, this.handouts.history.length)
        for (let it of res.data) {
          if (it.handout_status === 4) {
            this.handouts.history.push(it)
          } else {
            this.handouts.now.push(it)
          }
        }
      }).catch((err) => {
        console.log(err.response ? err.response.data.detail : 'Error')
      })
    },
    showPre: function (item) {
      this.selectItem = item
    },
    goNextStep: function (item) {
      if (item.handout_status < 4) {
        this.$axios({
          method: 'put',
          url: '/medicine-handout-records/' + item.id + '/',
          data: {
            handout_status: item.handout_status += 1
          }
        }).then((res) => {
          item.handout_status = res.data.handout_status
          if (res.data.handout_status === 4) {
            this.handouts.history.push(item)
            this.handouts.now.splice(this.handouts.now.indexOf(item), 1)
          }
          alert('当前配药状态：' + this.$store.state.handoutStatus[item.handout_status])
        })
      }
    }
  }
}
</script>

<style>
.handouts-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 300px));
  grid-gap: 10px;
  width: 100%;
  margin-bottom: 30px;
}
.meds-wrapper {
  padding: 20px;
  width: 400px;
}
</style>
