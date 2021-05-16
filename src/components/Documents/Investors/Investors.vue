<template>
  <div class="investors">
    <div class="documents">

      <div class="documents__section" v-for="(item, index) in documentsAll" :key="index">
        <div class="documents__head">
          <h2 class="documents__title">
            {{ Object.keys(item)[0] }}
            <span v-if="index === 0">{{ $t('current-year') }}</span>
            <span v-else>{{ $t('year') }}</span>
          </h2>
          <SortSelect v-if="index === 0" :options="sortTypes" @selected-option="sortDocs" />
        </div>
        <div class="documents__list">
          <div class="documents-no-data" v-if="!Object.values(item)[0].length">{{ $t('no-docs-data') }}</div>
          <Document v-for="(document, index) in Object.values(item)[0]" :key="index" :document="document" />
        </div>
      </div>

<!--      <br><br><br>-->


<!--      <div class="documents__section">-->
<!--        <div class="documents__head">-->
<!--          <h2 class="documents__title">{{ currentYear }}<span>{{ $t('current-year') }}</span></h2>-->
<!--          <SortSelect :options="sortTypes" @selected-option="sortDocs" />-->
<!--        </div>-->
<!--        <div class="documents__list">-->
<!--          <div class="documents-no-data" v-if="!filteredDocs.length">{{ $t('no-docs-data') }}</div>-->
<!--          <Document v-for="(document, index) in filteredDocs" :key="index" :document="document" />-->
<!--        </div>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script>
  import Document from '@/components/Documents/Document/Document';
  import SortSelect from '@/components/SortSelect/SortSelect';
  import httpClient from '@/utils/httpClient';
  import { DateTime } from 'luxon';

  export default {
    name: 'Investors',
    components: {
      SortSelect,
      Document
    },
    data() {
      return {
        currentYear: '',
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
        documents: [],
        documentsAll: [],
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
      const currentYear = DateTime.fromJSDate(new Date()).year;

      httpClient
        .get('/api/docs/investors_letters_docs.php')
        .then((response) => {
          if (!response) return;

          Object.values(response).map((period, index) => {
            if (index === 0) this.currentYear = Object.keys(period)[0] || currentYear;
            this.documentsAll.push(period);
          });
          // Object.entries(response[0]).map((period) => {
          //   this.currentYear = period[0] || currentYear;
          //   this.documents = period[1];
          // });
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
        if (this.documentsAll.length) {
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
