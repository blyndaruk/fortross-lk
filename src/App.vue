<template>
  <TheHeader />
  <Loader :visible="loading" />
  <main class="main">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/my-account">My account</router-link>
      <router-view />
    </div>
  </main>
  <TheFooter />
</template>

<script>
  import TheFooter from '@/components/TheFooter/TheFooter';
  import TheHeader from '@/components/TheHeader/TheHeader';
  import '@/assets/styles/base/__base-dir.scss';
  import { mapState } from "vuex";

  import Loader from './components/Loader/Loader';

  export default {
    name: 'App',
    components: {
      TheFooter,
      TheHeader,
      Loader,
    },
    computed: {
      ...mapState("loader", ["loading"])
    },
  }
</script>

<style>

</style>
