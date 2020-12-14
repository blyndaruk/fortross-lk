<template>
  <div class="documents">
    <Tabs>
      <Tab :name="'Capital calls'" :selected="true">
        <Search />
        <CapitalCalls />
      </Tab>
      <Tab :name="'Письма инвесторам'">
        <Search />
        <Investors />
      </Tab>
      <Tab :name="'Отчетность'">
        <Search />
        <DocReporting />
      </Tab>
      <Tab :name="'Документы'">
        <Search />
        Документы
      </Tab>
    </Tabs>
  </div>
</template>

<script>
  import CapitalCalls from '@/components/Documents/CapitalCalls/CapitalCalls';
  import DocReporting from '@/components/Documents/DocReporting/DocReporting';
  import Investors from '@/components/Documents/Investors/Investors';
  import Search from '@/components/Search/Search';
  import Tab from '@/components/Tabs/Tab';
  import Tabs from '@/components/Tabs/Tabs';

  export default {
    name: 'Documents',
    components: {
      DocReporting,
      Investors,
      CapitalCalls,
      Search,
      Tab,
      Tabs
    },
  }
</script>

<style scoped>

</style>
