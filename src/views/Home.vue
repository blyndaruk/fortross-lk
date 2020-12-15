<template>
  <div class="home">
    <Dashboard viewType="full" />
    <div class="home__content">
      <DocsPreviewTable title="Документы на подписание" :note="true" :list="toSign" />
      <DocsPreviewTable title="Документы на оплату" :note="false" :list="toSign" />
      <RecentTransactions />
    </div>
  </div>
</template>

<script>
  import Dashboard from '@/components/Dashboard/Dashboard';
  import DocsPreviewTable from '@/components/DocsPreviewTable/DocsPreviewTable';
  import RecentTransactions from '@/components/RecentTransactions/RecentTransactions';

  export default {
    name: 'Home',
    components: {
      RecentTransactions,
      DocsPreviewTable,
      Dashboard,
    },
    data() {
      return {
        toSign: [
          {
            description: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet',
            date: '14.02.2020',
          },
          {
            description: 'Quisquam est, qui dolorem ipsum quia dolor sit amet',
            date: '14.02.2020',
          },
          {
            description: 'Quisquam est, qui dolorem ipsum quia dolor sit amet Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet',
            date: '14.02.2020',
          },
        ],
      };
    },
    mounted() {
    }
  }
</script>

<style lang="scss" scoped>
  .home {
    &__content {
      position: relative;
      margin-top: 50px;
      padding-top: 50px;
      padding-bottom: 80px;
      @include xs {
        border: none;
        margin-top: 30px;
        padding: 0 0 50px;
      }

      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 125vw;
        margin-left: -25vw;
        height: 1px;
        background-color: $primary;
        opacity: 0.1;
        @include xs {
          display: none;
        }
      }
    }
  }
</style>
