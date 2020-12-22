<template>
  <div class="documents">
    <Tabs :scroll="false" :is-simple="true">
      <Tab :name="'Личное'" :selected="true">
        <DocReportingPersonal :search="search" />
      </Tab>
      <Tab :name="'Общее'">
        <DocReportingGeneral />
      </Tab>
    </Tabs>
  </div>
</template>

<script>
  import DocReportingGeneral from '@/components/Documents/DocReporting/DocReportingGeneral/DocReportingGeneral';
  import DocReportingPersonal from '@/components/Documents/DocReporting/DocReportingPersonal/DocReportingPersonal';
  import Tab from '@/components/Tabs/Tab';
  import Tabs from '@/components/Tabs/Tabs';

  export default {
    name: 'DocReporting',
    components: {
      DocReportingGeneral,
      DocReportingPersonal,
      Tab,
      Tabs
    },
    props: {
      search: {
        type: String,
        default: ''
      }
    },
  }
</script>

<style lang="scss" scoped>
  .tabs::v-deep {
    &__list {
      background-color: transparent;
    }
  }
</style>
