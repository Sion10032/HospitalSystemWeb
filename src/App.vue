<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
      <v-list dense>
        <v-list-item-group v-model="item" color="primary">
          <template v-for="item in items">
            <v-list-item :key="item.text" link :to="item.to">
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down">医院管理系统</span>
      </v-toolbar-title>
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-btn icon large to="me">
        <v-avatar size="32px" item>
          <v-img src="https://cdn.vuetifyjs.com/images/logos/logo.svg" alt="Vuetify" />
        </v-avatar>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container class="fill-height" fluid>
        <router-view style="height: 100%;"></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: function () {
    return {
      dialog: false,
      drawer: null,
      item: 0,
      items: [
        {
          icon: 'mdi-home',
          text: '主页',
          to: '/'
        },
        {
          icon: 'mdi-contacts',
          text: '预约管理',
          to: '/bookings'
        },
        {
          icon: 'mdi-history',
          text: '收费管理',
          to: '/fee'
        },
        {
          icon: 'mdi-content-copy',
          text: '药房管理',
          to: '/medicine'
        },
        {
          icon: 'mdi-settings',
          text: '设置',
          to: '/settings'
        },
        {
          icon: 'mdi-message',
          text: '反馈',
          to: '/feedback'
        },
        {
          icon: 'mdi-help-circle',
          text: '帮助',
          to: '/about'
        }
      ]
    }
  }
}
</script>
