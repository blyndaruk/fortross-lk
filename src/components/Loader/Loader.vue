<template>
  <div id="loader"
       class="loader"
       :class="{ 'is-visible': visible }"
  >
    <div class="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Loader',
    props: {
      visible: Boolean,
    },
  }
</script>

<style lang="scss" scoped>
  @import "Loader.scss";
</style>
