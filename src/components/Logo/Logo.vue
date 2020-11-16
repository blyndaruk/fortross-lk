<template>
  <div>
    <a href="/">
      <img :src="logoImg" alt="FortRoss" />
    </a>
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

<style scoped>

</style>
