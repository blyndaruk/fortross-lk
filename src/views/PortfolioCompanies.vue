<template>
  <div class="portfolio-companies-view">
    <Dashboard viewType="simple" />
    <br>
    <p>PortfolioCompanies</p>
  </div>
</template>

<script>
  import Dashboard from '@/components/Dashboard/Dashboard';

  export default {
    name: 'PortfolioCompanies',
    components: {
      Dashboard
    },
  }
</script>

<style lang="scss" scoped>

</style>
