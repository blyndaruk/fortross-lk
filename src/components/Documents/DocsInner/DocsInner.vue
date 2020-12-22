<template>
  <div class="documents">
    <Tabs :scroll="false" :is-simple="true" @tab-toggle="onTabToggle">
      <Tab :name="'Личное'" :selected="true">
        <DocReportingPersonal :search="search" />
      </Tab>
      <Tab :name="'Общее'">
        <DocReportingGeneral :search="search" />
      </Tab>
    </Tabs>
  </div>
</template>

<script>
  import DocReportingPersonal from './DocReportingPersonal/DocReportingPersonal';
  import DocReportingGeneral from './DocReportingGeneral/DocReportingGeneral';
  import Tab from '@/components/Tabs/Tab';
  import Tabs from '@/components/Tabs/Tabs';

  export default {
    name: 'DocsInner',
    components: {
      DocReportingPersonal,
      DocReportingGeneral,
      Tab,
      Tabs,
    },
    props: {
      search: {
        type: String,
        default: ''
      }
    },
    methods: {
      onTabToggle() {
        this.$emit('subtabs-toggle');
      }
    }
  }
</script>

<style scoped>

</style>
