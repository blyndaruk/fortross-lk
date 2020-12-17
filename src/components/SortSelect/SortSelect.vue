<template>
  <div class="sort-select" v-click-outside="closeSelect">
    <div class="sort-select__label">Сортировка по:</div>
    <div class="sort-select__wrap" @blur="openSelect = false">
      <div class="sort-select__active" :class="{ 'is-open': openSelect }"
           @click="openSelect = !openSelect"
      >
        {{ optionActive ? optionActive.title : options[0].title }}
      </div>
      <div class="sort-select__options" :class="{ 'is-open': openSelect }">
        <div class="sort-select__option"
             v-for="(option, i) in options"
             :key="i"
             @click="sortChange(option)"
             :title="option.title"
        >
          {{ option.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ClickOutside from 'vue-click-outside';

  export default {
    name: 'SortSelect',
    data() {
      return {
        openSelect: false,
        optionActive: '',
      }
    },
    props: {
      options: {
        type: Array,
      }
    },
    methods: {
      sortChange(option) {
        this.optionActive = option;
        this.$emit('selected-option', option);
        this.openSelect = false;
      },
      closeSelect() {
        this.openSelect = false;
      },
    },
    directives: {
      ClickOutside
    },
  }
</script>

<style scoped>

</style>
