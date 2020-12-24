<template>
  <div class="capital-calls">
    <div class="documents">
      <div class="documents__section">
        <div class="documents__head">
          <h2 class="documents__title">{{ $t('documents.to-sign') }}</h2>
          <SortSelect :options="sortTypes" @selected-option="sortSigning" />
        </div>
        <div class="documents__list">
          <div class="documents-no-data" v-if="!filteredSigningDocs.length">{{ $t('no-data') }}</div>
          <Document v-for="(document, index) in filteredSigningDocs" :key="index" :document="document" />
        </div>
      </div>
      <div class="documents__section">
        <div class="documents__head">
          <h2 class="documents__title">{{ $t('documents.signed') }}</h2>
          <SortSelect :options="sortTypes" @selected-option="sortToSign" />
        </div>
        <div class="documents__list">
          <div class="documents-no-data" v-if="!filteredToSignDocs.length">{{ $t('no-data') }}</div>
          <Document v-for="(document, index) in filteredToSignDocs" :key="index" :document="document" />
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
    name: 'DocReportingPersonal',
    components: { SortSelect, Document },
    data() {
      return {
        signingDocs: [],
        toSignDocs: [],
        sortTypes: [
          {
            title: `${this.$i18n.messages[this.$i18n.locale]['search-by-name']} (A—Z)`,
            type: 'to-more'
          },
          {
            title: `${this.$i18n.messages[this.$i18n.locale]['search-by-name']} (Z—A)`,
            type: 'to-less'
          },
        ],
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

      httpClient
        .get('/api/docs/docs_docs.php', {
          params: {
            investor,
            type: 'personal',
          }
        })
        .then((response) => {
          this.signingDocs = Object.values(response)[0];
          this.toSignDocs = Object.values(response)[1];
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
      sortSigning(option) {
        this.sortDocs(this.signingDocs, option);
      },
      sortToSign(option) {
        this.sortDocs(this.toSignDocs, option);
      },
      sortDocs(docs, type) {
        docs.sort((a, b) => {
          const nameA = a.file_name.toLowerCase(), nameB = b.file_name.toLowerCase();
          if (type.type === 'to-less') {
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
      filteredSigningDocs() {
        return this.signingDocs.filter(doc => doc.file_name.toLowerCase().includes(this.search.toLowerCase()));
      },
      filteredToSignDocs() {
        return this.toSignDocs.filter(doc => doc.file_name.toLowerCase().includes(this.search.toLowerCase()));
      }
    }
  }
</script>

<style scoped>

</style>
