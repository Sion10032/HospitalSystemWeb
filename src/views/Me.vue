<template>
  <v-container class="d-flex justify-center align-center" fluid>
    <v-card v-if="this.$store.state.isLogin" style="padding: 15px; width: 400px;">
      <p>{{ this.$store.state.user.username }}</p>
      <p>{{ this.$store.state.user.profile.address }}</p>
      <v-btn color="warning" @click="onLogoutClick">登出</v-btn>
    </v-card>
    <v-card v-if="!this.$store.state.isLogin && !isReg" style="padding: 15px; width: 400px;">
      <v-row>
        <v-col>
          <v-text-field
            label="username"
            v-model="username">
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            label="password"
            v-model="password"
            type="password">
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="d-flex justify-space-between align-center">
            <v-btn color="success" @click="isReg = true">注册</v-btn>
            <v-btn color="primary" @click="onLoginClick">登陆</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card>
    <v-card v-if="!this.$store.state.isLogin && isReg" style="padding: 15px; width: 400px;">
      <v-row>
        <v-col>
          <v-text-field
            label="用户名"
            v-model="username">
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            label="密码"
            v-model="password"
            type="password">
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            label="邮箱"
            v-model="email">
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-select
            label="职务"
            v-model="work"
            :items="$store.state.works"
            item-text="text"
            item-value="value">
          </v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-select
            label="性别"
            v-model="profile.gender"
            :items="sexs"
            item-text="text"
            item-value="value">
          </v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            label="姓名"
            v-model="profile.name">
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            label="身份证号"
            v-model="profile.identify_id">
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            label="电话"
            v-model="profile.phone">
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            label="地址"
            v-model="profile.address">
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="d-flex flex-row-reverse">
            <v-btn color="success" @click="onRegisterClick">注册</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: function () {
    return {
      isReg: false,
      username: '',
      email: '',
      password: '',
      work: null,
      profile: {
        gender: 1,
        occupation: 34,
        name: '',
        identify_id: '',
        phone: '',
        address: ''
      },
      sexs: [
        { text: '女', value: 0 },
        { text: '男', value: 1 }
      ]
    }
  },
  methods: {
    onLoginClick: function () {
      this.$axios({
        method: 'POST',
        url: '/auth/',
        data: {
          username: this.username,
          password: this.password
        }
      }).then((result) => {
        if (result.status === 200) {
          localStorage.setItem('access', result.data.access)
          localStorage.setItem('refresh', result.data.refresh)
          this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access')
        }
      }).then(() => {
        this.$axios({
          method: 'get',
          url: '/auth/user/'
        }).then((res) => {
          if (res.status === 200) {
            this.$store.commit('setUser', res.data)
            this.$store.commit('setLogin', true)
            alert('登陆成功')
            location.reload()
          }
        })
      }).catch((err) => {
        console.log(err)
        alert('登陆失败')
      })
    },
    onLogoutClick: function () {
      this.$axios({
        method: 'GET',
        url: '/auth/logout/',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access')
        }
      }).then((result) => {
        if (result.status === 200) {
          this.isLogin = false
          localStorage.clear()
          this.$store.commit('setUser', {
            id: '请登录', email: '', username: '', profile: {}
          })
          this.$store.commit('setLogin', false)
          location.reload()
        }
      }).catch((err) => {
        console.log(err)
        alert('失败')
      })
    },
    onRegisterClick: function () {
      this.$axios({
        method: 'POST',
        url: '/users/',
        data: {
          username: this.username,
          email: this.email,
          password: this.password,
          group: this.work,
          profile: {
            gender: this.profile.gender,
            occupation: 34,
            name: this.profile.name,
            identify_id: this.profile.identify_id,
            phone: this.profile.phone,
            address: this.profile.address
          }
        }
      }).then((result) => {
        alert('注册成功')
        this.isReg = false
        location.reload()
      }).catch((err) => {
        console.log(err)
        alert('注册失败')
      })
    }
  }
}
</script>

<style>

</style>
