<template>
  <div class="personal">
    <div class="documents">
      <div class="documents__section" v-for="items in documents" :key="items.title">
        <div class="documents__head">
          <h2 class="documents__title">{{ items.title }}<span>за последний год</span></h2>
          <SortSelect :options="sortTypes" />
        </div>
        <div class="documents__list">
          <Document v-for="(document, index) in items.data" :key="index" :document="document" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Document from '@/components/Documents/Document/Document';
  import SortSelect from '@/components/SortSelect/SortSelect';

  export default {
    name: 'DocReportingPersonal',
    components: { SortSelect, Document },
    data() {
      return {
        sortTypes: [
          {
            title: 'Названию (A—Z)',
            type: 'to-more'
          },
          {
            title: 'Названию (Z—A)',
            type: 'to-less'
          },
        ],
        documents: [
          {
            title: '2020',
            type: 'to-pay',
            data: [
              {
                date: '14.02.2020',
                text: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet',
              },
              {
                date: '14.02.2020',
                text: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores',
              },
              {
                date: '14.02.2020',
                text: 'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam',
              },
              {
                date: '14.02.2020',
                text: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia',
              },
              {
                date: '14.02.2020',
                text: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet',
              },
              {
                date: '14.02.2020',
                text: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores sed quia odit sed quia consequuntur magni dolores',
              },
              {
                date: '14.02.2020',
                text: 'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam',
              },
            ]
          },
        ]
      }
    },
  }
</script>

<style scoped>

</style>