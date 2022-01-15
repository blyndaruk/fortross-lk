<template>
  <transition name="fade" mode="out-in">
    <div v-show="isActive" :class="{'is-active': isActive}">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'Tab',
    props: {
      name: {
        required: true
      },
      selected: {
        default: false
      },
    },
    data() {
      return {
        isActive: false
      };
    },
    computed: {
      target() {
        return '#' + this.name.toLowerCase().replace(/ /g, '-');
      }
    },
    mounted() {
      this.isActive = this.selected;
    }
  }
</script>

<style lang="scss" scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .8s, transform .8s;
    width: 100%;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-20px);
    transition: opacity .3s, transform .8s;
  }
</style>
