<template>
  <div class="portfolio-companies-view">
    <Dashboard viewType="simple" @on-metric-select="onMetricSelect" @on-scroll-to="onScrollToSection" />
    <Charts :chosen-metric="chosenMetric" @metric-to-default="onMetricReset" @scroll-to="onScrollToSection" />
    <Companies
        :companies="companies"
        :industries="industries"
        :title="$t('companies-title')"
        :sortType="sortTypes"
        type="portfolio"
    />
    <Companies
        :companies="companiesExits"
        :industries="industriesExits"
        :title="$t('Exits')"
        :sortType="sortTypesExits"
        type="exits"
    />
  </div>
</template>

<script>
  import httpClient from '@/utils/httpClient';
  import Charts from '@/components/Charts/Charts';
  import Companies from '@/components/Companies/Companies';
  import Dashboard from '@/components/Dashboard/Dashboard';
  import { mapState } from 'vuex';

  export default {
    name: 'PortfolioCompanies',
    components: {
      Companies,
      Charts,
      Dashboard
    },
    data() {
      return {
        companies: [],
        companiesExits: [],
        industries: [],
        industriesExits: [],
        chosenMetric: null,
        scrollToSectionName: null,
        sortTypes: [
          {
            title: this.$i18n.messages[this.$i18n.locale]['portfolio-sorting'].valuation,
            type: 'company_valuation'
          },
          {
            title: this.$i18n.messages[this.$i18n.locale]['portfolio-sorting'].investments,
            type: 'total_invested'
          },
          {
            title: this.$i18n.messages[this.$i18n.locale]['portfolio-sorting'].share,
            type: 'fund_share'
          },
        ],
        sortTypesExits: [
          {
            title: this.$i18n.messages[this.$i18n.locale]['portfolio-sorting'].valuation,
            type: 'company_valuation'
          },
          {
            title: this.$i18n.messages[this.$i18n.locale]['portfolio-sorting'].investments,
            type: 'total_invested'
          },
        ],
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

            if (company.company_valuation_unit2 === 'thousand') {
              company.company_valuation *= 1000;
            }
            if (company.total_invested_unit2 === 'thousand') {
              company.total_invested *= 1000;
            }

            if (!map.has(company.industry) && company.industry) {
              map.set(company.industry, true);
              this.industries.push({
                id: company.industry,
                title: company.industry,
              });
            }
            if (!map.has('exit') && company.status.toLowerCase() === 'exit') {
              this.exitTab = true;
              map.set('exit', true);
            }
            if (company.status.toLowerCase() === 'exit') {
              this.exitAmount += 1;
            }
          });
        });


      const urlExits = '/api/company_info_iblock_exits.php';
      httpClient
        .get(urlExits)
        .then((response) => {
          this.companiesExits = response;

          const map = new Map();

          this.companiesExits.forEach((company) => {
            if (company.company_valuation_unit2 === 'thousand') {
              company.company_valuation *= 1000;
            }
            if (company.total_invested_unit2 === 'thousand') {
              company.total_invested *= 1000;
            }

            if (!map.has(company.industry) && company.industry) {
              map.set(company.industry, true);
              this.industriesExits.push({
                id: company.industry,
                title: company.industry,
              });
            }
          });
        });
    },
    methods: {
      onMetricSelect (val) {
        this.chosenMetric = val
      },
      onMetricReset () {
        this.chosenMetric = null
      },
      onScrollToSection (val) {
        this.scrollToSectionName = val
        this.scrollToSection(val)
      },
      scrollToSection (section) {
        const elem = document.querySelector(`.js-companies-${section}`)
        if (!elem) return
        window.scrollTo({
          top: elem.getBoundingClientRect().top,
          behavior: 'smooth'
        })
        this.scrollToSectionName = null
      },
    },
    computed: {
      ...mapState('loader', ['loading']),
    },
    watch: {
      '$i18n.locale': function () {
        this.sortTypes = [
          {
            title: this.$i18n.messages[this.$i18n.locale]['portfolio-sorting'].valuation,
            type: 'company_valuation'
          },
          {
            title: this.$i18n.messages[this.$i18n.locale]['portfolio-sorting'].investments,
            type: 'total_invested'
          },
          {
            title: this.$i18n.messages[this.$i18n.locale]['portfolio-sorting'].share,
            type: 'fund_share'
          },
        ]

        this.sortTypesExits = [
          {
            title: this.$i18n.messages[this.$i18n.locale]['portfolio-sorting'].valuation,
            type: 'company_valuation'
          },
          {
            title: this.$i18n.messages[this.$i18n.locale]['portfolio-sorting'].investments,
            type: 'total_invested'
          }
        ]
      },
      loading(active) {
        if (!active && this.scrollToSectionName) {
          this.scrollToSection(this.scrollToSectionName)
        }
      },
    },
  }
</script>
