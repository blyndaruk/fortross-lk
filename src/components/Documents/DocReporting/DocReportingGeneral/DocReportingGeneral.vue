<template>
  <div class="general">
    <div class="documents">
      <div class="documents__section">
        <div class="documents__head">
          <h2 class="documents__title" v-if="currentYear">{{ currentYear }}<span>{{ $t('current-year') }}</span></h2>
          <SortSelect :options="sortTypes" @selected-option="sortSigning" />
        </div>
        <div class="documents__list">
          <div class="documents-no-data" v-if="!filteredCurrentYearDocs.length">{{ $t('no-data') }}</div>
          <Document v-for="(document, index) in filteredCurrentYearDocs" :key="index" :document="document" />
        </div>
      </div>
      <div class="documents__section">
        <div class="documents__head">
          <h2 class="documents__title">{{ $t('last-years') }}</h2>
          <SortSelect :options="sortTypes" @selected-option="sortToSign" />
        </div>
        <div class="documents__list">
          <div class="documents-no-data" v-if="!filteredPreviousDocs.length">{{ $t('no-data') }}</div>
          <Document v-for="(document, index) in filteredPreviousDocs" :key="index" :document="document" />
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
    name: 'DocReportingGeneral',
    components: { SortSelect, Document },
    data() {
      return {
        currentYear: '',
        currentYearDocs: [],
        previousDocs: [],
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
    mounted() {
      this.currentYear = DateTime.fromJSDate(new Date()).year;

      httpClient
        .get('/api/docs/reporting_docs.php', {
          params: {
            type: 'general',
          }
        })
        .then((response) => {
          const allDocs = Object.values(response)[0];
          this.currentYearDocs = Object.values(allDocs)[0];
          this.currentYearDocs = Object.values(this.currentYearDocs)[0];

          // test with normal data from server
          allDocs.forEach((docs, index) => {
            if (index === 0) return;
            Object.values(docs).map((doc) => {
              this.previousDocs = this.previousDocs.concat(doc);
            })
          });
        });
    },
    methods: {
      sortSigning(option) {
        this.sortDocs(this.currentYearDocs, option);
      },
      sortToSign(option) {
        this.sortDocs(this.previousDocs, option);
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
      filteredCurrentYearDocs() {
        return this.currentYearDocs.filter(doc => doc.file_name.toLowerCase().includes(this.search.toLowerCase()));
      },
      filteredPreviousDocs() {
        return this.previousDocs.filter(doc => doc.file_name.toLowerCase().includes(this.search.toLowerCase()));
      }
    }
  }
</script>

<style scoped>

</style>
