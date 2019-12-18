<template>
  <v-container fluid>
    <div class="d-flex justify-center align-center">
      <div style="width: 150px;">
        <v-select
          v-model="payType"
          :items="$store.state.payTypes"
          item-text="name"
          item-value="id"
          label="付款方式"
          :disabled="isPaying">
        </v-select>
      </div>
      <v-text-field
        style="margin-left: 20px;"
        v-model="payId"
        label="ID"
        :disabled="isPaying">
      </v-text-field>
      <v-btn type="primary" @click="commit" style="margin-left: 20px;" :disabled="isPaying">COMMIT</v-btn>
    </div>
    <div v-if="payRecord">
      <v-data-table
        :headers="headers"
        :items="payRecord.items"
        :items-per-page="5"
        class="elevation-1"
        style="border-radius: 8px;"
      ></v-data-table>
      <div class="d-flex justify-center align-center" style="margin-top: 15px; margin-left: 60%;">
        <v-select
          v-model="payMethod"
          :items="$store.state.payMethods"
          item-text="name"
          item-value="id"
          label="付款方式"
          :disabled="payRecord.receive !== null">
        </v-select>
        <v-text-field
          style="margin-left: 20px;"
          v-model="payReal"
          label="付款金额"
          :disabled="payRecord.receive !== null">
        </v-text-field>
        <v-text-field
          v-if="payMethod === 1"
          style="margin-left: 20px;"
          v-model="payRefund"
          label="找零金额"
          disabled>
        </v-text-field>
        <v-btn
          style="width: 80px; height: 30px; margin-left: 20px;"
          color="primary"
          @click="checkout"
          :disabled="payRecord.receive !== null">
          结算
        </v-btn>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  data: function () {
    return {
      payType: null,
      payId: null,
      isPaying: false,
      payRecord: null,
      payMethod: 0,
      payMount: 0, // 总价
      payReal: 0, // 实付
      headers: [
        { text: '项目名称', value: 'name' },
        { text: '单价', value: 'sPrice' },
        { text: '数量', value: 'count' },
        { text: '总价', value: 'price' }
      ]
    }
  },
  computed: {
    payRefund: function () {
      return this.payReal - this.payMount
    }
  },
  watch: {
    payRecord: function (newValue, oldValue) {
      if (newValue) {
        for (let it of this.payRecord.items) {
          it.sPrice = it.price / it.count
        }
        this.payMount = 0
        for (let it of this.payRecord.items) {
          this.payMount += it.price
        }
        if (!this.payRecord.receive) {
          this.payReal = this.payMount
        } else {
          this.payReal = this.payRecord.receive
          this.payMethod = this.payRecord.method
        }
        this.isPaying = !this.payRecord.receive
      }
    }
  },
  methods: {
    commit: function () {
      this.$axios({
        method: 'post',
        url: '/pay-records/',
        data: {
          type: this.payType,
          id: Number(this.payId)
        }
      }).then((res) => {
        this.payRecord = res.data
      }).catch((err) => {
        console.log(err)
        alert(err.response ? err.response.data.detail : 'Error')
      })
    },
    checkout: function () {
      this.$axios({
        method: 'put',
        url: '/pay-records/' + this.payRecord.id + '/',
        data: {
          receive: this.payReal,
          refund: this.payRefund,
          method: this.payMethod
        }
      }).then((res) => {
        this.payRecord = res.data
      }).catch((err) => {
        console.log(err)
        alert(err.response ? err.response.data.detail : 'Error')
      })
    }
  }
}
</script>

<style>
</style>
