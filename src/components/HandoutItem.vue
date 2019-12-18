<template>
  <v-hover v-if="handout" v-slot:default="{ hover }">
    <v-card
      class="handout-wrapper d-flex justify-space-between align-center"
      :elevation="hover ? 12 : 2"
      @click="$emit('showPre', handout)">
      <div>{{ '领药单' + handout.id + ' - ' + $store.state.handoutStatus[handout.handout_status] }}</div>
      <v-btn
        :color="types[handout.handout_status]"
        @click.stop="$emit('goNextStep', handout)"
        :disabled="handout.handout_status == 4">
        {{ handout.handout_status == 4 ? 'Done' : 'Next' }}
      </v-btn>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  props: {
    handout: Object
  },
  data: function () {
    return {
      isExpend: false,
      types: [ 'primary', 'secondary', 'warning', 'success', 'error' ]
    }
  }
}
</script>

<style>
.handout-wrapper {
  padding: 15px;
  width: 400px;
  height: 60px;
}
</style>
