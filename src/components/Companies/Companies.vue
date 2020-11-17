<template>
  <div class="companies">
    <div class="companies__head">
      <div class="companies__title">{{ $t('companies-title') }}</div>
    </div>

    <div class="companies__tabs" ref="companiesTabs">
      <div class="companies__tab"
           v-for="(category, index) in filteredCategories"
           :key="index"
           :class="{ 'is-active': currentIndex === index }"
           @click="onTabClick(category.id, index)"
      >
        {{ index === 0 ? $t('all-companies') : category.title }}
        <span class="companies__tab-amount">{{ category.amount }}</span>
      </div>
    </div>

    <div class="companies__list">
      <div class="companies__item"
           v-for="(company, index) in filteredCompanies"
           :key="index"
      >
        <CompanyCard :company="company" />
      </div>
    </div>
  </div>
</template>

<script>
  import CompanyCard from '@/components/Companies/CompanyCard/CompanyCard';

  export default {
    name: 'Companies',
    components: { CompanyCard },
    data() {
      return {
        currentIndex: 0,
        currentTab: 'all',
        categories: [
          {
            id: 'all',
            title: 'All companies'
          },
          {
            id: 'ai',
            title: 'Ai'
          },
          {
            id: 'fintech',
            title: 'Fintech'
          },
          {
            id: 'highLoad-platforms',
            title: 'HighLoad Platforms'
          },
        ],
        companies: [
          {
            id: 'ai',
            category: 'Ai',
            image: '',
            valuation: '12.5M USD',
            investments: '$0.2M USD',
            share: '4.5%'
          },
          {
            id: 'highLoad-platforms',
            category: 'HighLoad platforms',
            image: '',
            valuation: '246.58M USD',
            investments: '0.2M USD',
            share: '3.2%',
          },
          {
            id: 'fintech',
            category: 'Fintech',
            image: '',
            valuation: '246.58M USD',
            investments: '$12.5M USD',
            share: '5%'
          },
          {
            id: 'fintech',
            category: 'Fintech',
            image: '',
            valuation: '246.58M USD',
            investments: '$12.5M USD',
            share: '5%'
          },
          {
            id: 'highLoad-platforms',
            category: 'HighLoad platforms',
            image: '',
            valuation: '246.58M USD',
            investments: '0.2M USD',
            share: '3.2%',
            inactive: true,
          },
          {
            id: 'ai',
            category: 'Ai',
            image: '',
            valuation: '12.5M USD',
            investments: '$0.2M USD',
            share: '4.5%',
            inactive: true,
          },
          {
            id: 'highLoad-platforms',
            category: 'HighLoad platforms',
            image: '',
            valuation: '246.58M USD',
            investments: '0.2M USD',
            share: '3.2%',
            inactive: true,
          },
        ]
      }
    },
    methods: {
      onTabClick(id, index) {
        this.currentTab = id;
        this.currentIndex = index;
        setTimeout(() => {
          window.scrollTo(0, this.$refs.companiesTabs.offsetTop);
        }, 5)
      }
    },
    computed: {
      filteredCompanies() {
        if (this.currentTab === 'all') {
          return this.companies;
        } else {
          return this.companies.filter((company) => {
            return company.id === this.currentTab;
          })
        }
      },
      companiesCount() {
        return this.companies.reduce((obj, cat) => {
          const id = cat.id;
          if (!Object.prototype.hasOwnProperty.call(obj, id)) {
            obj[id] = 0;
          }
          obj[id]++;
          return obj;
        }, {});
      },
      filteredCategories() {
        return this.categories.map(category => {
          const amount = category.id === 'all' ? this.companies.length : this.companiesCount[category.id];
          return { ...category, amount };
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "Companies";
</style>
