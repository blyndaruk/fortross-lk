<template>
  <div class="my-account">
    <Dashboard viewType="medium" />
    <Tabs @tab-toggle="onTabChange">
      <Tab :name="$t('my-account.account-report-tab')" :selected="true">
        <AccountReport :force-update="renderComponent" />
      </Tab>
      <Tab :name="$t('my-account.payment-report-tab')">
        <PaymentReport :force-update="renderComponent" />
      </Tab>
      <Tab :name="$t('my-account.forecast-tab')">
        <Forecast />
      </Tab>
    </Tabs>
  </div>
</template>

<script>
  import Dashboard from '@/components/Dashboard/Dashboard';
  import AccountReport from '@/components/Reports/AccountReport/AccountReport';
  import Forecast from '@/components/Reports/Forecast/Forecast';
  import PaymentReport from '@/components/Reports/PaymentReport/PaymentReport';
  import Tab from '@/components/Tabs/Tab';
  import Tabs from '@/components/Tabs/Tabs';
  // import httpClient from '@/utils/httpClient';

  export default {
    name: "MyAccount",
    components: {
      Forecast,
      PaymentReport,
      AccountReport,
      Tab,
      Tabs,
      Dashboard,
    },
    data() {
      return {
        data: null,
        renderComponent: true,
      };
    },
    mounted() {
      // httpClient
      //   .get('/lk/portfolio_component.php')
      //   .then((response) => this.data = response);
    },
    methods: {
      onTabChange () {
        this.forceRerender()
      },
      forceRerender() {
        this.renderComponent = false;
        this.$nextTick(() => {
          this.renderComponent = true;
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .my-account {
    padding-bottom: 80px;
  }
</style>
