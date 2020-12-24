<template>
  <div class="home">
    <Dashboard viewType="full" />
    <div class="home__content">
      <DocsPreviewTable :title="$t('documents.to-sign')" :note="true" :list="toSign" />
      <DocsPreviewTable :title="$t('documents.payment-title')" :note="false" :list="paymentDocs" />
      <RecentTransactions :reports="reports" />
    </div>
  </div>
</template>

<script>
  import Dashboard from '@/components/Dashboard/Dashboard';
  import DocsPreviewTable from '@/components/DocsPreviewTable/DocsPreviewTable';
  import RecentTransactions from '@/components/RecentTransactions/RecentTransactions';
  import httpClient from '@/utils/httpClient';

  export default {
    name: 'Home',
    components: {
      RecentTransactions,
      DocsPreviewTable,
      Dashboard,
    },
    data() {
      return {
        paymentDocs: [],
        toSign: [],
        reports: [],
      };
    },
    mounted() {
      const investor = document.querySelector('.investor').value;

      httpClient
        .get('/api/home_api.php', {
          params: {
            investor,
          },
        })
        .then((response) => {
          this.toSign = response.signing_docs;
          this.paymentDocs = response.for_payment_docs;
          this.reports = response.recent_transaction.strings;
        });
    },
    methods: {}
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
