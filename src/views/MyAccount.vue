<template>
  <div class="my-account">
    <Dashboard viewType="medium" />
    <!--
    <div class="test-item"
         v-for="item in data"
         :key="item.id"
    >
    </div>
    <pre style="text-align: left">
      {{data}}
    </pre>
-->
  </div>
</template>

<script>
  import Dashboard from '@/components/Dashboard/Dashboard';
  import httpClient from '@/utils/httpClient';

  export default {
    name: "MyAccount",
    components: { Dashboard },
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

<style lang="scss" scoped>

</style>
