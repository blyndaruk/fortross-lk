<template>
  <div class="capital-calls">
    <div class="documents">
      <div class="documents__section">
        <div class="documents__head">
          <h2 class="documents__title">{{ $t('documents.payment-title') }}</h2>
          <SortSelect :options="sortTypes" @selected-option="sortPayment" />
        </div>
        <div class="documents__list">
          <div class="documents-no-data" v-if="!filteredPaymentDocs.length">{{ $t('no-data') }}</div>
          <Document v-for="(document, index) in filteredPaymentDocs" :key="index" :document="document" />
        </div>
      </div>

      <div class="documents__section">
        <div class="documents__head">
          <h2 class="documents__title">{{ $t('documents.paid-title') }}</h2>
          <SortSelect :options="sortTypes" @selected-option="sortPaid" />
        </div>
        <div class="documents__list">
          <div class="documents-no-data" v-if="!filteredPaidDocs.length">{{ $t('no-data') }}</div>
          <Document v-for="(document, index) in filteredPaidDocs" :key="index" :document="document" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import httpClient from '@/utils/httpClient';
  import Document from '@/components/Documents/Document/Document';
  import SortSelect from '@/components/SortSelect/SortSelect';

  export default {
    name: 'CapitalCalls',
    components: {
      SortSelect,
      Document
    },
    data() {
      return {
        paymentDocs: [],
        paidDocs: [],
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
        .get('/api/docs/capital_calls_docs.php', {
          params: {
            investor,
            type: 'payment' // payment/paid
          },
        })
        .then((response) => {
          this.paymentDocs = Object.values(response);
        });

      httpClient
        .get('/api/docs/capital_calls_docs.php', {
          params: {
            investor,
            type: 'paid' // payment/paid
          },
        })
        .then((response) => {
          this.paidDocs = Object.values(response);
        });
    },
    methods: {
      sortPayment(option) {
        this.sortDocs(this.paymentDocs, option);
      },
      sortPaid(option) {
        this.sortDocs(this.paidDocs, option);
      },
      // TODO: to utils method
      sortDocs(docs, type) {
        docs.sort(function (a, b) {
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
      },
    },
    computed: {
      filteredPaymentDocs() {
        return this.paymentDocs.filter(doc => doc.file_name.toLowerCase().includes(this.search.toLowerCase()));
      },
      filteredPaidDocs() {
        return this.paidDocs.filter(doc => doc.file_name.toLowerCase().includes(this.search.toLowerCase()));
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
