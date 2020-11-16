<template>
  <div>
    <nav class="nav">
      <ul class="nav__menu">
        <li class="nav__item"
            v-for="route in this.$router.options.routes"
            :key="route.path"
        >
          <router-link
              :to="route.path"
              active-class="is-active"
              exact-active-class="is-exact-active"
          >
            {{ route.name }}
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
  export default {
    name: 'Nav',
    data() {
      return {
        menu: []
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "Nav";
</style>
