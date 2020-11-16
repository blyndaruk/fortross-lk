<template>
  <div>
    <div class="locale-switcher">
      <div class="locale-switcher__item"
           v-for="(lang, i) in languages"
           :class="activeLocale === lang ? 'is-active' : ''"
           :key="`Lang${i}`"
           @click="setLocale(lang)"
      >
        {{ lang }}
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import VueCookies from 'vue-cookies';

  Vue.use(VueCookies);
  Vue.config.lang = Vue.$cookies.get('app_locale') || 'en';

  export default {
    name: 'LocaleSwitcher',
    data() {
      return {
        activeLocale: Vue.config.lang
      }
    },
    methods: {
      setLocale(locale) {
        Vue.config.lang = locale;
        this.activeLocale = locale;
        this.$cookies.set('app_locale', locale);
        this.$i18n.locale = Vue.config.lang;
      }
    },
    mounted() {
      this.$i18n.locale = Vue.config.lang;
    },
    computed: {
      languages() {
        return Object.keys(this.$i18n.messages);
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "LocaleSwitcher";
</style>
