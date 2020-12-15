<template>
  <div class="tabs" :class="{ 'no-scroll': !scroll, 'is-simple': isSimple }">
    <div v-if="!scroll">
      <ul class="tabs__list">
        <li v-for="(tab, index) in tabs" :class="{ 'is-active': tab.isActive }" :key="index">
          <div class="tabs__item" :target="tab.href" @click="selectTab(tab)">{{ tab.name }}</div>
        </li>
      </ul>
    </div>
    <vue-custom-scrollbar v-else class="scroll-area" :settings="scrollSettings">
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
    props: {
      scroll: {
        type: Boolean,
        default: true,
      },
      isSimple: {
        type: Boolean,
        default: false,
      }
    },
    data() {
      return {
        tabs: [],
        scrollSettings: {
          suppressScrollY: false,
          suppressScrollX: false,
          wheelPropagation: true,
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
