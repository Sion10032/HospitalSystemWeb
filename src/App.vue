<template>
  <v-app id="inspire" v-if="$store.state.isCheck">
    <v-navigation-drawer v-if="isOk" v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
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
        <v-avatar size="40px" item>
          <v-img :src="$store.state.isLogin ? 'https://img.yzcdn.cn/vant/cat.jpeg' : 'https://cdn.vuetifyjs.com/images/logos/logo.svg'" alt="Vuetify" />
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
  data: function () {
    return {
      dialog: false,
      drawer: false,
      item: 0,
      items: [
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
      ],
      isOk: false
    }
  },
  created: function () {
    console.log(this.$store)
    setTimeout(this.setPages, 2000)
  },
  methods: {
    isInGroup: function (id) {
      for (let it of this.$store.state.userGroup) {
        if (it.id === id) {
          return true
        }
      }
      return false
    },
    setPages: function () {
      if (!this.$store.state.userGroup) {
        this.isOk = true
        return
      }
      if (this.isInGroup(230)) {
        this.items.unshift({
          icon: 'mdi-history',
          text: '收费管理',
          to: '/fee'
        })
      } else if (
        this.isInGroup(228) || this.isInGroup(223) || this.isInGroup(232) ||
        this.isInGroup(218) || this.isInGroup(221) || this.isInGroup(224) ||
        this.isInGroup(233) || this.isInGroup(229) || this.isInGroup(228)) {
        this.items.unshift({
          icon: 'mdi-contacts',
          text: '诊断',
          to: '/diagnosis'
        })
        this.items.unshift({
          icon: 'mdi-contacts',
          text: '叫号',
          to: '/callp'
        })
      } else if (this.isInGroup(225) || this.isInGroup(226) || this.isInGroup(227)) {
        this.items.unshift({
          icon: 'mdi-content-copy',
          text: '药房管理',
          to: '/medicine'
        })
        this.items.unshift({
          icon: 'mdi-content-copy',
          text: '配药',
          to: '/medhandout'
        })
      }
      this.isOk = true
    }
  }
}
</script>

<style>
.divider {
  height: 10px;
  width: 10px;
}
</style>
