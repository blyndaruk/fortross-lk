<template>
  <div class="burger" :class="{ 'is-active': this.isActive, 'is-open': this.isOpen }" @click="onClick">
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<script>
  import scrollLock from '@/utils/scrollLock';

  export default {
    name: 'Burger',
    data() {
      return {
        isActive: false,
        isOpen: false,
      }
    },
    methods: {
      onClick() {
        this.toggleBurger();
      },
      toggleBurger() {
        if (this.isActive) {
          scrollLock.disable();
          this.isOpen = !this.isOpen;
          setTimeout(() => {
            this.isActive = !this.isActive;
            this.$emit('burger-toggle', this.isActive);
          }, 150);
        } else {
          scrollLock.enable();
          this.isActive = !this.isActive;
          this.$emit('burger-toggle', this.isActive);
          setTimeout(() => {
            this.isOpen = !this.isOpen;
          }, 150);
        }
      },
    },
    watch: {
      '$route'() {
        if (this.isActive) {
          this.toggleBurger();
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "Burger";
</style>
