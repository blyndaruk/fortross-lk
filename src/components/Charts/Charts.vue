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

    <div class="chart-head">
      <div class="chart-timeline" v-click-outside="closeSelect">
        <div class="chart-timeline__label">Срез</div>
        <div class="chart-timeline__wrap" @blur="openTimeSelect = false">
          <div class="chart-timeline__active" :class="{ 'is-open': openTimeSelect }"
               @click="openTimeSelect = !openTimeSelect"
          >
            {{ currentTimeline.title }}
          </div>
          <div class="chart-timeline__options" :class="{ 'is-open': openTimeSelect }">
            <div
                class="chart-timeline__option"
                v-for="(option, i) in timelineType"
                :key="i"
                @click="timeLineChange(option)"
            >
              {{ option.title }}
            </div>
          </div>
        </div>
      </div>

      <div class="charts-toggle-type" v-if="!isHistorical">
        <button @click="toggleType('line')">Bar</button>
        <button @click="toggleType('pie')">Pie</button>
      </div>
    </div>


    <line-chart v-if="isHistorical" :chart-data="datacollection" :options="options"></line-chart>
    <pie-chart v-if="isPie && !isHistorical" :chart-data="datacollection" :options="options"></pie-chart>
    <bar-chart v-if="isLine && !isHistorical" :chart-data="datacollection" :options="options"></bar-chart>

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
        <span class="companies__check"></span>
        <span>{{company.id}}</span>
        <span class="company-color" :style="{ backgroundColor: company.color }"></span>
      </label>
    </div>
  </div>
</template>

<script>
  import Chart from 'chart.js';
  import ClickOutside from 'vue-click-outside'
  import LineChart from '@/components/Charts/LineChart/LineChart';
  import PieChart from '@/components/Charts/PieChart/PieChart';
  import BarChart from '@/components/Charts/BarChart/BarChart';
  import httpClient from '@/utils/httpClient';

  export default {
    name: 'Charts',
    components: {
      BarChart,
      PieChart,
      LineChart,
    },
    data() {
      return {
        chartType: 'line',
        openTimeSelect: false,
        timelineType: [
          {
            id: 'historical',
            title: 'Исторические данные',
          },
          {
            id: 'date',
            title: 'Данные на дату',
          },
        ],
        currentTimeline: {
          id: 'historical',
          title: 'Исторические данные',
        },
        data: [],
        metrics: [],
        currentMetricIndex: 0,
        maxMetricsToShow: 4,
        showMoreMetrics: false,
        companies: [],
        companiesSelected: [],
        datacollection: {},
        currentData: [],
        labels: [],
        unit: 'USD',
        datasets: [],
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
              // type: 'time',
              ticks: {
                autoSkip: true,
                // suggestedMin: 12,
                maxTicksLimit: 18
              },
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
                beginAtZero: true,
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
        // .get('/lk/graf_data_full_api.php')
        .get('data/chart_example.json')
        .then((response) => {
          this.data = response;
          this.chartBackgroundColor();


          const map = new Map();
          // const result = [];

          this.data.forEach((el) => {
            // get all available metrics
            this.metrics.indexOf(el.metric_name) === -1 ? this.metrics.push(el.metric_name) : '';

            // set all available companies
            if (!map.has(el.company_id)) {
              map.set(el.company_id, true);
              this.companies.push({
                id: el.company_id,
                color: this.randomColor(),
              });
            }
          });

          // set first company as default (for first load)
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
      closeSelect() {
        this.openTimeSelect = false;
      },
      randomColor() {
        // const color = Math.floor(Math.random() * 16777215).toString(16);
        return '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
      },
      onCompanyUpdate() {
        this.fillData();
      },
      fillData() {
        this.$store.dispatch('loader/show');
        // const currentMetric = this.data.filter(el => el.metric_name === this.metrics[this.currentMetricIndex]);

        // TODO: refactor this mess
        this.datacollection = {};
        this.datasets = [];
        this.labels = [];
        this.currentData = [];

        const map = new Map();

        this.data.forEach((obj) => {
          this.companiesSelected.some((company) => {
            if (obj.company_id === company.id && this.metrics[this.currentMetricIndex] === obj.metric_name) {
              obj.color = company.color;
              this.labels.push(obj.period);
              if (!map.has(obj.company_id)) {
                map.set(obj.company_id, true);
                this.datasets.push({
                  id: obj.company_id,
                  backgroundColor: obj.color,
                  borderColor: obj.color,
                  fill: false,
                  data: [],
                });
              }
              this.currentData.push(obj);
            }
          });
        });

        this.currentData.forEach((obj) => {
          this.datasets.some((company) => {
            if (obj.company_id === company.id) {
              company.data.push(obj.metric_value)
            }
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
      timeLineChange(option) {
        this.currentTimeline = option;
        this.openTimeSelect = false;
        this.fillData();
      },
    },
    computed: {
      isPie() {
        return this.chartType === 'pie';
      },
      isLine() {
        return this.chartType === 'line';
      },
      isHistorical() {
        return this.currentTimeline.id === 'historical';
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
      // data() {
      //   // TODO: refactor
      //   return this.graphData;
      // },
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
