<template>
  <div class="hello">
    Home
    <div class="test-item"
         v-for="item in data"
         :key="item.id"
    >
    </div>

    <pre style="text-align: left">
      {{data}}
    </pre>
  </div>
</template>

<script>
  import httpClient from '@/utils/httpClient';

  export default {
    name: "Home",
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
