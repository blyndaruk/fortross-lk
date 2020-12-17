<template>
  <div class="documents">
    <Tabs :scroll="false" :is-simple="true">
      <Tab :name="'Личное'" :selected="true">
        <DocReportingPersonal />
      </Tab>
      <Tab :name="'Общее'">
        <DocReportingGeneral />
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
    data() {
      return {
      }
    },
  }
</script>

<style scoped>

</style>
