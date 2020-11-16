<template>
  <div class="dashboard">
    <div class="dashboard__main">
      <div class="dashboard__main-amount">{{ mainAmount }}</div>
      <div class="dashboard__main-note">Current state of the account</div>
    </div>
    <div class="dashboard__info">info</div>
  </div>
</template>

<script>
  export default {
    name: 'Dashboard',
    data() {
      return {
        mainAmount: '360 499 USD'
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "Dashboard";
</style>
