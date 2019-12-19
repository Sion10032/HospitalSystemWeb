<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-select
          label="科室"
          v-model="work"
          :items="$store.state.department"
          item-text="name"
          item-value="id">
        </v-select>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: function () {
    return {
      work: null
    }
  },
  watch: {
    work: function (newValue, oldValue) {
      if (newValue !== null) {
        localStorage.setItem('department', newValue)
      }
    }
  },
  created: function () {
    if (localStorage.getItem('department')) {
      this.work = Number(localStorage.getItem('department'))
    }
  }
}
</script>

<style>
</style>
