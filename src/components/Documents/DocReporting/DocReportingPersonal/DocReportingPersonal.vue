<template>
  <div class="personal">
    <div class="documents">
      <div class="documents__section">
        <div class="documents__head">
          <h2 class="documents__title">{{ currentYear }}<span>текущиий год</span></h2>
          <SortSelect :options="sortTypes" @selected-option="sortDocs" />
        </div>
        <div class="documents__list">
          <div class="documents-no-data" v-if="!filteredDocs.length">{{ $t('no-data') }}</div>
          <Document v-for="(document, index) in filteredDocs" :key="index" :document="document" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Document from '@/components/Documents/Document/Document';
  import SortSelect from '@/components/SortSelect/SortSelect';
  import httpClient from '@/utils/httpClient';
  import { DateTime } from 'luxon';

  export default {
    name: 'DocReportingPersonal',
    components: {
      SortSelect,
      Document
    },
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
        currentYear: '',
        documents: []
      }
    },
    props: {
      search: {
        type: String,
        default: ''
      }
    },
    mounted() {
      const investor = document.querySelector('.investor').value;
      const currentYear = DateTime.fromJSDate(new Date()).year;

      httpClient
        .get('/api/docs/reporting_docs.php', {
          params: {
            investor,
            type: 'personal',
          }
        })
        .then((response) => {
          Object.entries(response[0]).map((period) => {
            this.currentYear = period[0] || currentYear;
            this.documents = period[1];
          });
        });
    },
    methods: {
      sortDocs(option) {
        this.documents.sort((a, b) => {
          const nameA = a.file_name.toLowerCase(), nameB = b.file_name.toLowerCase();
          if (option.type === 'to-less') {
            if (nameA > nameB) return -1;
            if (nameA < nameB) return 1;
          } else {
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
          }
          return 0; //default return value (no sorting)
        });
      }
    },
    computed: {
      filteredDocs() {
        return this.documents.filter(doc => doc.file_name.toLowerCase().includes(this.search.toLowerCase()));
      },
    }
  }
</script>

<style scoped>

</style>
