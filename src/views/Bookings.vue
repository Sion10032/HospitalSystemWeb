<template>
  <v-container fluid>
    <v-row>
      <v-col cols="3">
        <v-card>
          <v-card-text>
            <v-icon>{{ icons.mdiAccount }}</v-icon>
            当前等待人数：{{ rawQueue && rawQueue.length }}
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="9">
        <v-card>
          <v-card-text>xxx请到xxx进行就诊。</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
        <v-card>
          <v-list dense>
            <v-subheader>当前等待列表</v-subheader>
            <v-list-item-group v-if="rawQueue" v-model="item" color="primary">
              <v-list-item
                v-for="(item, i) in rawQueue"
                :key="i">
                <v-list-item-content>
                  <v-list-item-title v-text="item.profile.name"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
        <v-card style="padding: 0 10px;">
          <v-text-field v-model="inQueue">
            <v-icon slot="append" color="red" @click="add2Queue">mdi-plus</v-icon>
          </v-text-field>
        </v-card>
      </v-col>
      <v-col cols="9">
         <v-data-table
          :headers="headers"
          :items="doctors"
          class="elevation-1">
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {
  mdiAccount
} from '@mdi/js'

export default {
  name: 'home',
  data: function () {
    return {
      icons: {
        mdiAccount
      },
      item: 0,
      inQueue: '23,,,,26',
      rawQueue: null,
      headers: [
        { text: '姓名', value: 'name' },
        { text: '科室', value: 'lab' },
        { text: '状态', value: 'status' }
      ],
      doctors: [
        {
          name: '1',
          lab: '1',
          status: '空闲'
        },
        {
          name: '2',
          lab: '1',
          status: '空闲'
        },
        {
          name: '3',
          lab: '2',
          status: '空闲'
        },
        {
          name: '3',
          lab: '2',
          status: '空闲'
        },
        {
          name: '3',
          lab: '2',
          status: '空闲'
        },
        {
          name: '3',
          lab: '2',
          status: '空闲'
        },
        {
          name: '3',
          lab: '2',
          status: '空闲'
        },
        {
          name: '3',
          lab: '2',
          status: '空闲'
        }
      ]
    }
  },
  created: function () {
    setInterval(() => this.getWaitQueue(), 1000)
  },
  methods: {
    add2Queue: function () {
      let tP = this.inQueue.split(',')
      let params = { patient: tP[0] }
      if (tP[4]) {
        params.reservation = tP[4]
      } else {
        params.department = tP[1]
        params.doctor = tP[2]
        params.pay = tP[3]
      }
      this.$axios({
        method: 'post',
        url: '/wait-queue/',
        data: params
      }).then((res) => {
        alert('排队成功！')
      }).catch((err) => {
        alert(err.response ? err.response.data.detail : 'Error')
      })
    },
    getWaitQueue: function () {
      this.$axios({
        method: 'get',
        url: '/wait-queue/'
      }).then((res) => {
        this.rawQueue = res.data.department[localStorage.getItem('department')]
        console.log(this.rawQueue)
      })
    }
  }
}
</script>
