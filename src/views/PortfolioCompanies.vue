<template>
  <div class="portfolio-companies-view">
    <Dashboard viewType="simple" />
    <Charts />
    <Companies />
  </div>
</template>

<script>
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
  }
</script>

<style lang="scss" scoped>

</style>
