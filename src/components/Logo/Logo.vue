<template>
  <div class="logo">
    <router-link to="/">
      <img :src="logoImg" alt="FortRoss" />
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'Logo',
    data() {
      return {
        logoImg: require('@/assets/images/logo.svg'),
      }
    }
  }
</script>

<style lang="scss" scoped>
  .logo {
    img {
      max-width: 100%;
      height: auto;
    }
  }
</style>
