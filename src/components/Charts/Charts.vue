<template>
  <div class="charts-wrapper">
    <div class="charts-wrapper__metrics">
      <div class="chart-metric"
           :class="{ 'is-active': currentMetricIndex === index }"
           v-for="(metric, index) in showedMetrics"
           :key="index"
           @click="onMetricClick(metric, index)"
      >
        {{metric}}
      </div>
      <div class="chart-metric-more">
        <div class="chart-metric"
             v-if="this.metrics.length > this.maxMetricsToShow"
             :class="{ 'is-active': currentMetricIndex >= this.showedMetrics.length }"
             @click="toggleOtherMetrics"
             v-click-outside="hide"
        >
          Other
        </div>
        <div class="chart-metric-more__wrapper"
             :class="{ 'is-active': this.showMoreMetrics }"
        >
          <div class="chart-metric-more__item"
               v-for="(metric, index) in moreMetrics"
               :key="index"
               :class="{ 'is-active': currentMetricIndex === showedMetrics.length+index }"
               @click="onMetricClick(metric, showedMetrics.length+index)"
          >
            {{metric}}
          </div>
        </div>
      </div>
    </div>
    <div class="charts-toggle-type">
      <button @click="toggleType('line')">Bar</button>
      <button @click="toggleType('pie')">Pie</button>
    </div>
    <line-chart v-if="isLine" :chart-data="datacollection" :options="options"></line-chart>
    <pie-chart v-if="isPie" :chart-data="datacollection" :options="options"></pie-chart>

    <div class="companies">
      <label :for="'company_name_'+index"
             v-for="(company, index) in companies"
             :key="index"
      >
        <input type="checkbox"
               :name="'company_name_'+index"
               :id="'company_name_'+index"
               v-model="companiesSelected"
               :value="company"
               @change="onCompanyUpdate"
        >
        <span>{{company.id}}</span>
        <span class="company-color" :style="{ backgroundColor: company.color }"></span>
      </label>
    </div>
  </div>
</template>

<script>
  // import { Line } from 'vue-chartjs'
  import Chart from 'chart.js';
  import ClickOutside from 'vue-click-outside'
  import LineChart from '@/components/Charts/LineChart/LineChart';
  import PieChart from '@/components/Charts/PieChart/PieChart';
  import chartData from '@/data/chart_example';
  import httpClient from '@/utils/httpClient';

  export default {
    name: 'Charts',
    components: {
      PieChart,
      LineChart
    },
    data() {
      return {
        chartType: 'line',
        graphData: [],
        metrics: [],
        currentMetricIndex: 0,
        maxMetricsToShow: 4,
        showMoreMetrics: false,
        companies: [],
        companiesSelected: [],
        // metrics: ['Revenue', 'Gross margin', 'Investments', 'Valuation'],
        datacollection: {},
        chartData,
        labels: [],
        unit: 'USD',
        // labels: ['January', 'February', 'Februaryss'],
        datasets: [
          {
            data: []
          }
        ],
        // datasets: [
        //   {
        //     label: false,
        //     // label: 'Data One',
        //     // backgroundColor: '#f87979',
        //     // fillColor: '#f87979',
        //     // fill: false,
        //     data: [40, 20, 10]
        //   },
        //   {
        //     // label: 'Data One',
        //     // backgroundColor: '#f87979',
        //     // fill: false,
        //     data: [30, 20, 40]
        //   },
        //   {
        //     // label: 'Data One',
        //     // backgroundColor: '#f87979',
        //     // fill: false,
        //     data: [30, 40, 20]
        //   },
        // ],
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false
          },
          chartArea: {
            backgroundColor: '#f7f7f7'
          },
          scales: {
            xAxes: [{
              display: true,
              gridLines: {
                color: "#FFFFFF"
              },
            }],
            yAxes: [{
              display: true,
              gridLines: {
                color: "#FFFFFF"
              },
              ticks: {
                // TODO: test with percentage units
                callback: value => this.getUnit + value,
              }
            }]
          },
        },

        quarters: {
          "Q1": 0,
          "Q2": 3,
          "Q3": 6,
          "Q4": 9
        },
      }
    },
    props: {},
    mounted() {
      httpClient
        .get('/lk/graf_data_full_api.php')
        .then((response) => {
          this.graphData = response;
          this.chartBackgroundColor();

          this.data.forEach((el, index) => {
            this.metrics.indexOf(el.metric_name) === -1 ? this.metrics.push(el.metric_name) : '';

            // TODO: Test with multiple companies
            if (index === 0) {
              this.companies.push({ id: el.company_id });
            } else {
              this.companies.map(c => {
                return c.id.indexOf(el.company_id) === -1 || index === 0 ? this.companies.push({ id: el.company_id }) : '';
              });
            }

            this.companies.map((el) => el.color = this.randomColor());
          });

          // set first company as default
          this.companiesSelected.push(this.companies[0]);
          this.fillData();
        });
    },
    methods: {
      onMetricClick(metric, index) {
        this.currentMetricIndex = index;
        this.fillData();
      },
      toggleOtherMetrics() {
        this.showMoreMetrics = !this.showMoreMetrics;
      },
      hide() {
        this.showMoreMetrics = false;
      },
      randomColor() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
      },
      onCompanyUpdate() {
        this.fillData();
      },
      fillData() {
        this.$store.dispatch('loader/show');
        const currentMetric = this.data.filter(el => el.metric_name === this.metrics[this.currentMetricIndex]);
        let currentCompanies = [];
        this.companiesSelected.map((company) => {
          return currentCompanies = currentMetric.filter(el => {
            el.color = company.color;
            return el.company_id === company.id
          });
        });

        // TODO: refactor this mess
        this.datacollection = {};
        this.datasets = [
          {
            data: []
          }
        ];
        this.labels = [];

        this.companiesSelected.forEach((company, index) => {
          currentCompanies.forEach((el) => {
            this.labels.push(el.period);
            this.datasets[index].data.push(el.metric_value);
            this.datasets[index].backgroundColor = el.color;
            this.datasets[index].borderColor = el.color;
            this.datasets[index].fill = false;
          });
        });

        setTimeout(() => {
          this.$store.dispatch('loader/hide');
        }, 1000);

        this.datacollection = {
          labels: this.labels,
          datasets: this.datasets,
        };
      },
      sortByTime(lhs, rhs) {
        const lhsPeriod = lhs.period;
        const rhsPeriod = rhs.period;
        if (!lhsPeriod || !rhsPeriod) return;

        var lhsQuarterYear = lhsPeriod.split(" ");
        var rhsQuarterYear = rhsPeriod.split(" ");
        // var lhsDate = new Date(lhsQuarterYear[1], this.quarters[lhsQuarterYear[0]]);
        // var rhsDate = new Date(rhsQuarterYear[1], this.quarters[rhsQuarterYear[0]]);
        return new Date(lhsQuarterYear[1]).getTime() - new Date(rhsQuarterYear[1]).getTime();
        // return lhsDate.getTime() - rhsDate.getTime();
      },
      sortByQuoter(lhs, rhs) {
        const lhsPeriod = lhs.period;
        const rhsPeriod = rhs.period;
        if (!lhsPeriod || !rhsPeriod) return;

        var lhsQuarterYear = lhsPeriod.split(" ");
        var rhsQuarterYear = rhsPeriod.split(" ");
        var lhsDate = new Date(lhsQuarterYear[1], this.quarters[lhsQuarterYear[0]]);
        var rhsDate = new Date(rhsQuarterYear[1], this.quarters[rhsQuarterYear[0]]);
        // return new Date(lhsQuarterYear[1]).getTime() - new Date(rhsQuarterYear[1]).getTime();
        return lhsDate.getTime() - rhsDate.getTime();
      },
      toggleType(type) {
        this.fillData();
        this.chartType = type;
      },
      chartBackgroundColor() {
        Chart.pluginService.register({
          beforeDraw: function (chart) {
            if (chart.config.options.chartArea && chart.config.options.chartArea.backgroundColor) {
              const ctx = chart.chart.ctx;
              const chartArea = chart.chartArea;
              ctx.save();
              ctx.fillStyle = chart.config.options.chartArea.backgroundColor;
              ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
              ctx.restore();
            }
          }
        });
      },
    },
    computed: {
      isPie() {
        return this.chartType === 'pie';
      },
      isLine() {
        return this.chartType === 'line';
      },
      showedMetrics() {
        return this.metrics.slice(0, this.maxMetricsToShow);
      },
      getUnit() {
        return this.unit === 'USD' ? '$' : '%';
      },
      moreMetrics() {
        return this.metrics.slice(this.showedMetrics.length, this.metrics.length);
      },
      data() {
        // TODO: refactor
        return this.graphData;
      },
    },
    directives: {
      ClickOutside
    },
  }
  // TODO: for scrollable graph, take width of container
  // Make two canvases, one just with YAxe, another - everything else without Y labels and big width
</script>

<style lang="scss" scoped>
  @import "Charts";
</style>
