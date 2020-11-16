<template>
  <div class="home">
    <Dashboard />
  </div>
</template>

<script>
  import Dashboard from '@/components/Dashboard/Dashboard';
  import httpClient from '@/utils/httpClient';

  export default {
    name: 'Home',
    components: {
      Dashboard
    },
    data() {
      return {
        data: null,
      };
    },
    mounted() {
      httpClient
        .get('/lk/portfolio_component.php')
        .then((response) => this.data = response);
    }
  }
</script>

<style scoped>

</style>
