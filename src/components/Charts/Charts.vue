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
      <div class="chart-head__selects">
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

        <div class="chart-timeline" v-if="!isHistorical" v-click-outside="closeDateSelect">
          <div class="chart-timeline__label">Срез</div>
          <div class="chart-timeline__wrap" @blur="openDateSelect = false">
            <div class="chart-timeline__active" :class="{ 'is-open': openDateSelect }"
                 @click="openDateSelect = !openDateSelect"
            >
              {{ currentQuoter }}
            </div>
            <div class="chart-timeline__options" :class="{ 'is-open': openDateSelect }">
              <div
                  class="chart-timeline__option"
                  v-for="(option, i) in labelsAvailable"
                  :key="i"
                  @click="dateChange(option)"
              >
                {{ option }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="charts-toggle-type" :class="{'is-active': isPie}" v-if="!isHistorical">
        <div class="charts-toggle-type__active"></div>
        <div class="charts-toggle-type__inner">
          <button @click="toggleType('line')">
            <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M6 0H4V9H6V0ZM3 5H1V9H3V5ZM7 3H9V9H7V3ZM0 10V12H10V10H0Z"
                    fill="currentColor" />
            </svg>
          </button>
          <button @click="toggleType('pie')">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M10.9888 9.33342C11.6481 8.34673 12 7.18669 12 6H6V0C4.81331 0 3.65328 0.351894 2.66658 1.01118C1.67989 1.67047 0.910851 2.60754 0.456726 3.7039C0.00259972 4.80026 -0.11622 6.00666 0.115291 7.17054C0.346802 8.33443 0.918247 9.40353 1.75736 10.2426C2.59648 11.0818 3.66557 11.6532 4.82946 11.8847C5.99335 12.1162 7.19975 11.9974 8.2961 11.5433C9.39246 11.0892 10.3295 10.3201 10.9888 9.33342ZM8.91342 0.380602C8.30679 0.129329 7.65661 0 7 0V5L12 5C12 4.34339 11.8707 3.69321 11.6194 3.08658C11.3681 2.47996 10.9998 1.92876 10.5355 1.46447C10.0712 1.00017 9.52005 0.631876 8.91342 0.380602Z"
                    fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>
    </div>


    <!-- TODO: data.length canvas width  -->
    <!--    <vue-custom-scrollbar class="scroll-area" v-if="isHistorical" :settings="settings">-->
    <mq-layout mq="laptop+">
      <div class="chart-wrapper">
        <line-chart class="chart" v-if="isHistorical" :chart-data="datacollection" :unit="getUnit"></line-chart>
        <bar-chart
            class="chart-bar"
            v-if="isLine && !isHistorical"
            :chart-data="datacollection"
            :unit="getUnit"
        ></bar-chart>
        <pie-chart
            class="chart-pie"
            v-if="isPie && !isHistorical"
            :chart-data="datacollection"
            :unit="getUnit"
            @generated-legends="setLegends"
        ></pie-chart>
        <div v-if="!isHistorical && isPie" class="legends" v-html="legendHTML"></div>
      </div>
    </mq-layout>

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

    <div class="check-all-companies">
      <label for="all_companies">
        <input type="checkbox" name="all_companies" id="all_companies" @change="onCompanyUpdate('all')"
               v-model="selectAll" />
        <span>Выделить все компании</span>
        <span class="companies__check"></span>
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
  // import vueCustomScrollbar from 'vue-custom-scrollbar';
  import httpClient from '@/utils/httpClient';

  // import 'vue-custom-scrollbar/dist/vueScrollbar.css';

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
        rectangleSet: false,
        openTimeSelect: false,
        openDateSelect: false,
        settings: {
          suppressScrollY: false,
          suppressScrollX: false,
          wheelPropagation: false
        },
        legendHTML: '',
        timelineType: [
          {
            id: 'historical',
            title: 'Исторические данные',
          },
          {
            id: 'date',
            title: 'Данные на квартал',
          },
        ],
        currentTimeline: {
          id: 'historical',
          title: 'Исторические данные',
        },
        currentQuoter: '',
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
        labelsAvailable: [],
        unit: 'USD',
        datasets: [],
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
      const url = '/api/grafik_info_iblock.php';
      // : 'data/chart_online.json';
      httpClient
        .get(url)
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
          this.companiesSelected.push(this.companies[1]);
          this.companiesSelected.push(this.companies[2]);
          this.fillData();
        });
    },
    methods: {
      onMetricClick(metric, index) {
        this.currentMetricIndex = index;
        this.metrics[this.currentMetricIndex] === 'Gross profit margin' ? this.unit = '%' : this.unit = 'USD';
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
      closeDateSelect() {
        this.openDateSelect = false;
      },
      randomColor() {
        // const color = Math.floor(Math.random() * 16777215).toString(16);
        // "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
        return '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
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
        const periodMap = new Map();

        // test with more data
        // this.data.sort(this.sortByTime);
        // this.data.sort(this.sortByQuoter);

        this.data.forEach((obj) => {
          this.companiesSelected.some((company) => {
            if (obj.company_id === company.id && this.metrics[this.currentMetricIndex] === obj.metric_name) {
              obj.color = company.color;
              // if (obj.period) this.labels.push(obj.period);
              if (!map.has(obj.company_id)) {
                map.set(obj.company_id, true);
                this.datasets.push({
                  label: obj.company_id,
                  id: obj.company_id,
                  backgroundColor: obj.color,
                  borderColor: obj.color,
                  fill: false,
                  data: [],
                  barPercentage: 0.75,
                  // barThickness: 6,
                  // borderRadius: 4,
                  // borderRadius: 20,
                  // hoverBorderRadius: 50,
                  // hoverBorderWidth: 10,
                  // hoverBorderColor: '#000000',
                  // fillColor: obj.color,
                  // fillColor: "rgba(220,220,220,0.5)",
                  // strokeColor: "rgba(220,220,220,0.8)",
                  // highlightFill: "rgba(151,187,205,0.75)",
                  // highlightStroke: "rgba(220,220,220,1)",

                  // hoverBorderWidth: 5,
                  // hoverBorderColor: obj.color
                });
              }
              if (!periodMap.has(obj.period) && obj.period) {
                periodMap.set(obj.period, true);
                const str = obj.period.replace(" ", "'").slice(0, 3);
                this.labels.push(str + obj.period.slice(5))
              }

              if (!this.isHistorical) {
                const str = obj.period.replace(" ", "'").slice(0, 3);
                if (this.currentQuoter === (str + obj.period.slice(5))) {
                  this.currentData.push(obj);
                }
              } else {
                this.currentData.push(obj);
              }
            }
          });
        });


        this.currentData.forEach((obj) => {
          this.datasets.some((company) => {
            if (obj.company_id === company.id && obj.metric_value) {
              // company.data.push(parseFloat(obj.metric_value.replace(/,/g, '')))
              company.data.push(parseFloat(obj.metric_value));
            }
          });
        });

        this.labelsAvailable = this.labels;

        if (this.isHistorical) {
          // set first quoter as default
          this.currentQuoter = this.labels[0];
        } else {
          this.labels = [];
          this.labels[0] = this.currentQuoter;
        }

        setTimeout(() => {
          this.$store.dispatch('loader/hide');
        }, 650);


        // sorting from min to max for bar chart
        if (!this.isHistorical && !this.isPie) {
          this.datasets = this.sortMinMax(this.datasets);
        }

        this.datacollection = {
          labels: this.labels,
          datasets: this.datasets,
        };

        // rewrite data for doughnut chart
        if (!this.isHistorical && this.isPie) {
          this.datacollection = this.drawPie(this.datacollection);
        }
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
        this.chartType = type;
        this.fillData();
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
      dateChange(option) {
        this.currentQuoter = option;
        this.openDateSelect = false;
        this.fillData();
      },
      // TODO: refactor
      sortMinMax(data) {
        const dataArray = [];
        let dataset = data;
        dataset.forEach(function (obj) {
          dataArray.push(obj.data);
        });
        let dataIndexes = dataArray.map((d, i) => i);
        dataIndexes.sort((a, b) => {
          return dataArray[a] - dataArray[b];
        });
        const tempDatasets = [];
        dataIndexes.forEach(function (ind) {
          tempDatasets.push(dataset[ind]);
        });
        return tempDatasets;
      },
      drawPie(datasets) {
        const data = {
          datasets: [
            {
              data: [],
              backgroundColor: [],
            }
          ],
          labels: [],
        };
        datasets.datasets.forEach((obj) => {
          if (obj.data[0]) {
            data.labels.push(obj.label);
            data.datasets[0].data.push(obj.data);
            data.datasets[0].backgroundColor.push(obj.backgroundColor)
          }
        });
        return data;
      },
      setLegends(html) {
        this.legendHTML = html
      },
    },
    computed: {
      isMobile() {
        return this.$mq === 'tablet' || this.$mq === 'mobile';
      },
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
      selectAll: {
        get() {
          return this.companies ? this.companiesSelected.length === this.companies.length : false;
        },
        set(value) {
          const selected = [];
          if (value) {
            this.companies.forEach((company) => {
              selected.push(company);
            });
          }
          this.companiesSelected = selected;
        }
      },
    },
    directives: {
      ClickOutside
    },
  }
</script>

<style lang="scss" scoped>
  @import "Charts";
</style>
