<template>
  <div v-if="visible"
       id="loader"
       class="loader"
  >

  </div>
</template>

<script>
  export default {
    name: 'Loader',
    props: ["visible"],
  }
</script>

<style lang="scss" scoped>
  @import "Loader.scss";
</style>
