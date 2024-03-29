<template>
  <div class="general">
    <div class="documents">
      <div class="documents__section">
        <div class="documents__head">
          <h2 class="documents__title">{{ $t('documents.general-docs') }}</h2>
          <SortSelect :options="sortTypes" @selected-option="sortDocs" v-if="filteredDocuments.length" />
        </div>
        <div class="documents__list">
          <div class="documents-no-data" v-if="!filteredDocuments.length">{{ $t('no-docs-data') }}</div>
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
            title: `${this.$i18n.messages[this.$i18n.locale]['search-by-name']} (Z—A)`,
            type: 'to-less'
          },
          {
            title: `${this.$i18n.messages[this.$i18n.locale]['search-by-name']} (A—Z)`,
            type: 'to-more'
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
        .get('/api/docs/docs_docs.php', {
          params: {
            type: 'general',
          }
        })
        .then((response) => {
          if (!response) return;

          Object.values(response).map(docs => this.documents.push(docs));
        });
    },
    watch: {
      '$i18n.locale': function () {
        this.sortTypes = [
          {
            title: `${this.$i18n.messages[this.$i18n.locale]['search-by-name']} (A—Z)`,
            type: 'to-more'
          },
          {
            title: `${this.$i18n.messages[this.$i18n.locale]['search-by-name']} (Z—A)`,
            type: 'to-less'
          },
        ];
      }
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
        if (this.documents.length) {
          return this.documents.filter(doc => doc.file_name.toLowerCase().includes(this.search.toLowerCase()));
        } else {
          return [];
        }
      },
    }
  }
</script>

<style scoped>

</style>
