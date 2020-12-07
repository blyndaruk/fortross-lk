<template>
  <div class="tabs">
    <vue-custom-scrollbar class="scroll-area" :settings="scrollSettings">
      <ul class="tabs__list">
        <li v-for="(tab, index) in tabs" :class="{ 'is-active': tab.isActive }" :key="index">
          <div class="tabs__item" :target="tab.href" @click="selectTab(tab)">{{ tab.name }}</div>
        </li>
      </ul>
    </vue-custom-scrollbar>
    <div class="tabs__details">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import vueCustomScrollbar from 'vue-custom-scrollbar';
  import 'vue-custom-scrollbar/dist/vueScrollbar.css';

  export default {
    name: 'Tabs',
    components: {
      vueCustomScrollbar,
    },
    data() {
      return {
        tabs: [],
        scrollSettings: {
          suppressScrollY: false,
          suppressScrollX: false,
          wheelPropagation: false
        },
      };
    },
    created() {
      this.tabs = this.$children;
    },
    methods: {
      selectTab(selectedTab) {
        this.tabs.forEach(tab => {
          tab.isActive = (tab.name === selectedTab.name);
        });
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "Tabs";
</style>
