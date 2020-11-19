<template>
  <div class="portfolio-companies-view">
    <Dashboard viewType="simple" />
    <Charts />
    <Companies />
  </div>
</template>

<script>
  // import httpClient from '@/utils/httpClient';
  import Charts from '@/components/Charts/Charts';
  import Companies from '@/components/Companies/Companies';
  import Dashboard from '@/components/Dashboard/Dashboard';

  export default {
    name: 'PortfolioCompanies',
    components: {
      Companies,
      Charts,
      Dashboard
    },
    data() {
      return {
        // chartsData: [],
      }
    },
    mounted() {
      // httpClient
      //   .get('/lk/graf_data_full_api.php')
      //   .then((response) => this.chartsData = response);
    },
  }
</script>

<style lang="scss" scoped>

</style>
