<template>
  <div class="companies">
    <div class="companies__tabs-wrap" ref="companiesTabs">
      <div class="companies__head">
        <div class="companies__title">{{ title || $t('companies-title') }}</div>
        <SortSelect :options="sortType" @selected-option="updateOption" />
      </div>
      <vue-custom-scrollbar class="scroll-area" :settings="scrollSettings">
        <div class="companies__tabs">
          <div class="companies__tab"
               v-for="(category, index) in filteredIndustries"
               :key="index"
               :class="{ 'is-active': currentIndex === index }"
               @click="filterCompanies(category.id, index)"
          >
            {{ index === 0 ? $t('all-companies') : category.title }}
            <span class="companies__tab-amount">{{ category.amount }}</span>
          </div>
        </div>
      </vue-custom-scrollbar>
    </div>

    <div class="companies__list">
      <div class="companies__item"
           v-for="(company, index) in filteredCompanies"
           :key="index"
      >
        <CompanyCard :company="company" @company-id="updateFilter" />
      </div>
    </div>
  </div>
</template>

<script>
  import CompanyCard from '@/components/Companies/CompanyCard/CompanyCard';
  import SortSelect from '@/components/SortSelect/SortSelect';

  import vueCustomScrollbar from 'vue-custom-scrollbar';
  import 'vue-custom-scrollbar/dist/vueScrollbar.css';

  export default {
    name: 'Companies',
    components: {
      SortSelect,
      CompanyCard,
      vueCustomScrollbar,
    },
    props: {
      companies: {
        type: Array,
        default: () => [],
      },
      industries: {
        type: Array,
        default: () => [{
          id: 'all',
          title: 'All companies'
        }]
      },
      sortType: {
        type: Array,
        default: () => []
      },
      title: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        sortOption: 'company_valuation',
        currentIndex: 0,
        currentTab: 'all',
        exitTab: false,
        exitAmount: 0,
        industriesAmount: [],
        scrollSettings: {
          suppressScrollY: true,
          suppressScrollX: false,
          wheelPropagation: true,
          useBothWheelAxes: true,
        },
      }
    },
    methods: {
      insert(arr, index, newItem) {
        return [
          ...arr.slice(0, index),
          newItem,
          ...arr.slice(index)
        ]
      },
      filterCompanies(id, index) {
        this.currentTab = id;
        this.currentIndex = index;
        setTimeout(() => {
          window.scrollTo(0, this.$refs.companiesTabs.offsetTop);
        }, 5)
      },
      updateFilter(id) {
        const index = this.companies.map((e) => e.id).indexOf(id);
        this.filterCompanies(id, index);
      },
      updateOption(option) {
        this.sortOption = option.type;
      },
    },
    computed: {
      filteredCompanies() {
        const companies = this.companies;

        companies.sort((a, b) => {
          return parseFloat(b[this.sortOption]) - parseFloat(a[this.sortOption]);
        });

        if (this.currentTab === 'all') {
          return companies;
        } else if (this.currentTab === 'exit') {
          return companies.filter((company) => {
            return company.status.toLowerCase() === 'exit';
          });
        } else {
          return companies.filter((company) => {
            return company.industry === this.currentTab;
          });
        }
      },
      companiesCount() {
        return this.companies.reduce((obj, cat) => {
          const id = cat.industry;
          if (!Object.prototype.hasOwnProperty.call(obj, id)) {
            obj[id] = 0;
          }
          obj[id]++;
          return obj;
        }, {});
      },
      filteredIndustries() {
        const localIndustries = this.industries;
        if (!this.industries.some((ind) => ind.id === 'all')) {
          localIndustries.unshift({
            id: 'all',
            title: 'All companies'
          })
        }
        return localIndustries.map(category => {
          let amount = category.id === 'all' ? this.companies.length : this.companiesCount[category.id];
          return { ...category, amount };
        });
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "Companies";
</style>
