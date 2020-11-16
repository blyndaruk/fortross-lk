<template>
  <div class="app">
    <Loader :visible="loading" />
    <TheHeader />
    <main class="main">
      <div class="container">
        <Nav />
        <div class="page-view">
          <transition name="page">
            <router-view />
          </transition>
        </div>
      </div>
      <!--    br*40-->
    </main>
    <TheFooter />
  </div>
</template>

<script>
  import { mapState } from "vuex";

  import Nav from '@/components/Nav/Nav';
  import TheFooter from '@/components/TheFooter/TheFooter';
  import TheHeader from '@/components/TheHeader/TheHeader';
  import Loader from './components/Loader/Loader';

  import '@/assets/styles/base/__base-dir.scss';

  export default {
    name: 'App',
    components: {
      Nav,
      TheFooter,
      TheHeader,
      Loader,
    },
    computed: {
      ...mapState('loader', ['loading'])
    },
  }
</script>

<style lang="scss">
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .page-view {
    position: relative;
  }

  .page-enter-active, .page-leave-active {
    transition: opacity .8s, transform .8s;
  }

  .page-enter, .page-leave-to {
    opacity: 0;
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    transform: translateX(-20%);
    transition: opacity .3s, transform .8s;
  }

</style>
