<template>
  <div class="companies">
    <div class="companies__tabs-wrap" ref="companiesTabs">
      <div class="companies__head">
        <div class="companies__title">{{ $t('companies-title') }}</div>
        <SortSelect :options="sortTypes" @selected-option="updateOption" />
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
  import httpClient from '@/utils/httpClient';

  import vueCustomScrollbar from 'vue-custom-scrollbar';
  import 'vue-custom-scrollbar/dist/vueScrollbar.css';

  export default {
    name: 'Companies',
    components: {
      SortSelect,
      CompanyCard,
      vueCustomScrollbar,
    },
    data() {
      return {
        sortTypes: [
          {
            title: 'Стоимости компании',
            type: 'company_valuation'
          },
          {
            title: 'По размеру инвестиции',
            type: 'total_invested'
          },
          {
            title: 'По доли фонда',
            type: 'fund_share'
          },
        ],
        sortOption: 'company_valuation',
        currentIndex: 0,
        currentTab: 'all',
        companies: [],
        industriesAmount: [],
        industries: [{
          id: 'all',
          title: 'All companies'
        }],
        scrollSettings: {
          suppressScrollY: true,
          suppressScrollX: false,
          wheelPropagation: false,
        },
      }
    },

    mounted() {
      const url = '/api/company_info_iblock.php';
      httpClient
        .get(url)
        .then((response) => {
          this.companies = response;

          const map = new Map();
          this.companies.forEach((company) => {
            if (!map.has(company.industry) && company.industry) {
              map.set(company.industry, true);
              this.industries.push({
                id: company.industry,
                title: company.industry,
              });
            }
          });
        });
    },
    methods: {
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
        } else {
          return companies.filter((company) => {
            return company.industry === this.currentTab;
          })
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
        return this.industries.map(category => {
          const amount = category.id === 'all' ? this.companies.length : this.companiesCount[category.id];
          return { ...category, amount };
        });
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "Companies";
</style>
