<template>
  <div class="investors">
    <div class="documents">
      <div class="documents-no-data" v-if="checkIfEmpty(filteredDocs)">{{ $t('no-docs-data') }}</div>

      <div class="documents__section" v-for="(period, index) in filteredDocs" :key="index">
        <div class="documents__head" v-if="period[0]">
          <h2 class="documents__title">
            {{ period[0].year }}
            <span>{{ $t('year') }}</span>
          </h2>
          <SortSelect v-if="index === 0" :options="sortTypes" @selected-option="sortDocs" />
        </div>
        <div class="documents__list">
          <Document v-for="(document, index) in period" :key="index" :document="document" />
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
          this.currentYear = response[0].year || currentYear;
          this.documents = response;
        });
    },
    methods: {
      sortDocs(option) {
        this.documents.map((period) => {
          return period.sort((a, b) => {
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
        })
      },
      checkIfEmpty(array) {
        return Array.isArray(array) && (array.length === 0 || array.every(this.checkIfEmpty));
      },
    },
    computed: {
      filteredDocs() {
        return this.documents.length
               ? this.documents.map(k => k.filter(e => e.file_name.toLowerCase().includes(this.search.toLowerCase())))
               : [];
      },
    }
  }
</script>
