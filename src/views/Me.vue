<template>
  <div class="d-flex">
    Me
  </div>
</template>

<script>
export default {
  beforeCreate: function () {
    if (!this.$store.state.isLogin) {
      alert('请登录')
      this.$router.push('/login')
    }
  }
}
</script>

<style>

</style>
