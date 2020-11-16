<template>
  <div class="portfolio-companies-view">
    <Dashboard viewType="simple" />
    <Charts />
  </div>
</template>

<script>
  import Charts from '@/components/Charts/Charts';
  import Dashboard from '@/components/Dashboard/Dashboard';

  export default {
    name: 'PortfolioCompanies',
    components: {
      Charts,
      Dashboard
    },
  }
</script>

<style lang="scss" scoped>

</style>
