<template>
  <Loader :visible="loading" />
  <Test></Test>
</template>

<script>
  import { mapState } from "vuex";

  import Loader from './components/Loader/Loader';
  import Test from './components/Test';

  export default {
    name: 'App',
    components: {
      Loader,
      Test,
    },
    computed: {
      ...mapState("loader", ["loading"])
    },
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
