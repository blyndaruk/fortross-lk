<template>
  <div class="search-field">
    <label for="search" class="search-field__label">
      <input type="search"
             name="search"
             id="search"
             :placeholder="$t('search')"
             :value="value"
             @input="$emit('input', $event)"
      >
    </label>
  </div>
</template>

<script>
  export default {
    name: 'Search',
    methods: {},
    props: {
      value: String
    }
  }
</script>

<style lang="scss" scoped>
  @import "Search";
</style>
