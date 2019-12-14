<template>
  <v-container fluid>
    <v-row>
      <v-col cols="3">
        <v-card>
          <v-card-text>
            <v-icon>{{ icons.mdiAccount }}</v-icon>
            当前等待人数：111
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
            <v-list-item-group v-model="item" color="primary">
              <v-list-item
                v-for="(item, i) in items"
                :key="i">
                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
        <v-card style="padding: 0 10px;">
          <v-text-field :rules="rules">
            <v-icon slot="append" color="red">mdi-plus</v-icon>
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
      items: [
        { text: '122' },
        { text: '123' },
        { text: '124' },
        { text: '125' },
        { text: '126' },
        { text: '127' },
        { text: '128' }
      ],
      headers: [
        {
          text: '姓名',
          value: 'name'
        },
        {
          text: '科室',
          value: 'lab'
        },
        {
          text: '状态',
          value: 'status'
        }
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
  }
}
</script>
