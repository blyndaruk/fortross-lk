<template>
  <div class="tabs">
    <ul class="tabs__list">
      <li v-for="(tab, index) in tabs" :class="{ 'is-active': tab.isActive }" :key="index">
        <div class="tabs__item" :target="tab.href" @click="selectTab(tab)">{{ tab.name }}</div>
      </li>
    </ul>
    <div class="tabs__details">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Tabs',
    data() {
      return {
        tabs: []
      };
    },
    created() {
      console.log('created');
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
