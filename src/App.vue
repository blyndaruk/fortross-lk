<template>
  <Loader :visible="loading" />
  <TheHeader />
  <main class="main">
    <div class="container">
      <Nav />
      <div class="page-view">
        <router-view v-slot="{ Component }">
          <transition name="fade" >
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
  </main>
  <TheFooter />
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
      ...mapState("loader", ["loading"])
    },
  }
</script>

<style lang="scss">
  .page-view {
    position: relative;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: transform 0.6s ease, opacity 0.4s ease;
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
  }

  .fade-enter-from,
  .fade-leave-active {
    opacity: 0;
    transform: translateX(-25px);
  }
</style>
