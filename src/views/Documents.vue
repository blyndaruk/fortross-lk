<template>
  <div class="documents">
    <Tabs @tab-toggle="onTabToggle">
      <Tab :name="'Capital calls'" :selected="true">
        <Search @input="onInput" :value="search" />
        <CapitalCalls :search="search" />
      </Tab>
      <Tab :name="'Письма инвесторам'">
        <Search @input="onInput" :value="search" />
        <Investors :search="search" />
      </Tab>
      <Tab :name="'Отчетность'">
        <Search @input="onInput" :value="search" />
        <DocReporting :search="search" />
      </Tab>
      <Tab :name="'Документы'">
        <Search @input="onInput" :value="search" />
        <DocsInner :search="search" @subtabs-toggle="onTabToggle" />
      </Tab>
    </Tabs>
  </div>
</template>

<script>
  import CapitalCalls from '@/components/Documents/CapitalCalls/CapitalCalls';
  import DocReporting from '@/components/Documents/DocReporting/DocReporting';
  import DocsInner from '@/components/Documents/DocsInner/DocsInner';
  import Investors from '@/components/Documents/Investors/Investors';
  import Search from '@/components/Search/Search';
  import Tab from '@/components/Tabs/Tab';
  import Tabs from '@/components/Tabs/Tabs';

  export default {
    name: 'Documents',
    components: {
      DocsInner,
      DocReporting,
      Investors,
      CapitalCalls,
      Search,
      Tab,
      Tabs
    },
    data() {
      return {
        search: '',
      }
    },
    methods: {
      onInput(e) {
        this.search = e.target.value;
      },
      onTabToggle() {
        setTimeout(() => {
          this.search = '';
        }, 300);
      }
    }
  }
</script>

<style scoped>

</style>
