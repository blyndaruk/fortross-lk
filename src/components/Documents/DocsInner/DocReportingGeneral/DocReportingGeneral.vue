<template>
  <div class="general">
    <div class="documents">
      <div class="documents__section">
        <div class="documents__head">
          <h2 class="documents__title">Общие документы</h2>
          <SortSelect :options="sortTypes" @selected-option="sortDocs" />
        </div>
        <div class="documents__list">
          <div class="documents-no-data" v-if="!filteredDocuments.length">{{ $t('no-data') }}</div>
          <Document v-for="(document, index) in filteredDocuments" :key="index" :document="document" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Document from '@/components/Documents/Document/Document';
  import SortSelect from '@/components/SortSelect/SortSelect';
  import httpClient from '@/utils/httpClient';

  export default {
    name: 'DocReportingGeneral',
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
        documents: [],
      }
    },
    props: {
      search: {
        type: String,
        default: ''
      }
    },
    mounted() {
      httpClient
        .get('api/docs/docs_docs.php', {
          params: {
            type: 'general',
          }
        })
        .then((response) => {
          this.documents = Object.values(response)[0].signed;
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
      filteredDocuments() {
        return this.documents.filter(doc => doc.file_name.toLowerCase().includes(this.search.toLowerCase()));
      },
    }
  }
</script>

<style scoped>

</style>
