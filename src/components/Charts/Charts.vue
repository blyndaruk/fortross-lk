<template>
  <div class="charts-wrapper">
    <mq-layout :mq="['lg', 'md', 'tablet', 'mobile']">
      <div class="charts-wrapper-notification" @click="setDesktopViewport"><span>{{ $t('open-desktop') }}</span></div>
    </mq-layout>
    <div class="charts-wrapper__metrics">
      <div class="chart-metric"
           :class="{ 'is-active': currentMetricIndex === index }"
           v-for="(metric, index) in showedMetrics"
           :key="index"
           @click="onMetricClick(metric, index)"
      >
        {{ $t(metric.id) }}
      </div>
      <div class="chart-metric-more">
        <div class="chart-metric"
             v-if="this.metrics.length > this.maxMetricsToShow"
             :class="{ 'is-active': currentMetricIndex >= this.showedMetrics.length }"
             @click="toggleOtherMetrics"
             v-click-outside="hide"
        >
          {{ $t('Other') }}
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
            {{ $t(metric.id) }}
          </div>
        </div>
      </div>
    </div>

    <div class="chart-head">
      <div class="chart-head__selects">
        <div class="chart-timeline" :class="{ 'is-disabled': !companiesSelected.length }" v-click-outside="closeSelect">
          <div class="chart-timeline__wrap" @blur="openTimeSelect = false">
            <div class="chart-timeline__active" :class="{ 'is-open': openTimeSelect }"
                 @click="openTimeSelect = !openTimeSelect"
            >
              {{ currentTimeline.title === 'historical' ? $t('historical') : currentTimeline.title
              || currentTimeline.title === 'quarter' ? $t('quarter-data') : currentTimeline.title }}
            </div>
            <div class="chart-timeline__options" :class="{ 'is-open': openTimeSelect }">
              <div
                  class="chart-timeline__option"
                  v-for="(option, i) in timelineType"
                  :key="i"
                  @click="timeLineChange(option)"
              >
                {{ option.title === 'historical' ? $t('historical') : option.title
                || option.title === 'quarter' ? $t('quarter-data') : option.title }}
              </div>
            </div>
          </div>
        </div>

        <div class="chart-timeline" v-if="!isHistorical && currentQuoter" v-click-outside="closeDateSelect">
          <div class="chart-timeline__label">{{ $t('period') }}</div>
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

        <div class="chart-timeline" v-if="!isHistorical" v-click-outside="closeSortSelect">
          <div class="chart-timeline__label">{{ $t('sorting') }}</div>
          <div class="chart-timeline__wrap" @blur="openSortSelect = false">
            <div class="chart-timeline__active" ref="sortingSelected" :class="{ 'is-open': openSortSelect }"
                 @click="openSortSelect = !openSortSelect"
            >
              {{$t('sort-by-list.to-low')}}
            </div>
            <div class="chart-timeline__options" :class="{ 'is-open': openSortSelect }">
              <div class="chart-timeline__option" @click="sortChange('to-low', $t('sort-by-list.to-low'))">{{$t('sort-by-list.to-low')}}</div>
              <div class="chart-timeline__option" @click="sortChange('to-big', $t('sort-by-list.to-high'))">{{$t('sort-by-list.to-high')}}</div>
            </div>
          </div>
        </div>

      </div>

      <div class="charts-toggle-type" :class="{'is-active': isPie, 'is-disabled': getUnit === '%'}"
           v-if="!isHistorical">
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


    <!-- for quarters selection -->
    <div v-if="isHistorical" class="quarters-selects">
      <div class="field field--date">
        <div class="field__label">{{ $t('period') }}</div>
        <div class="field__inner">

          <div class="field__col">
            <div class="field__date">
              <div class="field__placeholder-left">{{ $t('datepicker.from') }}</div>
              <datepicker
                  format="yyyy"
                  minimum-view="year"
                  :language="$i18n.locale === 'ru' ? ru : en"
                  @selected="onStartDateSelect"
                  @blur="onBlur"
              ></datepicker>
              <div class="field__placeholder-right">
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M3 0H5V2H3V0ZM6 0H8V2H6V0ZM5 3H3V5H5V3ZM6 3H8V5H6V3ZM2 3H0V5H2V3ZM3 6H5V8H3V6ZM2 6H0V8H2V6Z"
                        fill="#0B204E" />
                </svg>
              </div>
            </div>
            <div class="field__date field__date--quoter">
              <div class="sort-select" v-click-outside="closeFromQSelect">
                <div class="sort-select__wrap" @blur="openFromQSelect = false">
                  <div class="sort-select__active" :class="{ 'is-open': openFromQSelect }"
                       @click="openFromQSelect = !openFromQSelect"
                  >
                    {{ currentFromQ || $t('quarter') }}
                  </div>
                  <div class="sort-select__options" :class="{ 'is-open': openFromQSelect }">
                    <div
                        class="sort-select__option"
                        v-for="(option, i) in quartersReadable"
                        :key="i"
                        @click="sortFromQChange(option)"
                    >
                      {{ option }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="field__col">
            <div class="field__date">
              <div class="field__placeholder-left">{{ $t('datepicker.to') }}</div>
              <datepicker
                  format="yyyy"
                  minimum-view="year"
                  :typeable="true"
                  :language="$i18n.locale === 'ru' ? ru : en"
                  @selected="onEndDateSelect"
                  @blur="onBlur"
              ></datepicker>
              <div class="field__placeholder-right">
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M3 0H5V2H3V0ZM6 0H8V2H6V0ZM5 3H3V5H5V3ZM6 3H8V5H6V3ZM2 3H0V5H2V3ZM3 6H5V8H3V6ZM2 6H0V8H2V6Z"
                        fill="#0B204E" />
                </svg>
              </div>
            </div>
            <div class="field__date field__date--quoter">
              <div class="sort-select" v-click-outside="closeToQSelect">
                <div class="sort-select__wrap" @blur="openToQSelect = false">
                  <div class="sort-select__active" :class="{ 'is-open': openToQSelect }"
                       @click="openToQSelect = !openToQSelect"
                  >
                    {{ currentToQ || $t('quarter') }}
                  </div>
                  <div class="sort-select__options" :class="{ 'is-open': openToQSelect }">
                    <div
                        class="sort-select__option"
                        v-for="(option, i) in quartersReadable"
                        :key="i"
                        @click="sortToQChange(option)"
                    >
                      {{ option }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>


    <mq-layout mq="laptop+">
      <div class="chart-wrapper">

        <div class="charts-wrapper-notification" v-if="noGraphData"><span>{{ $t('no-data') }}</span></div>
        <input id="unit_type" type="hidden" name="unit_type" :value="unit">

        <div :class="{ 'has-scroll': this.labels.length > 8 }">
          <vue-custom-scrollbar class="scroll-area" :settings="scrollSettings" ref="scrollable" v-show="isHistorical">
            <line-chart
                v-if="isHistorical"
                class="chart chart-line"
                :class="{ 'has-scroll': this.labels.length > 8 }"
                :chart-data="datacollection"
                :unit="getUnit"
            ></line-chart>
          </vue-custom-scrollbar>
          <canvas v-show="isHistorical" class="chart-line chart-line--x-axis" :class="{ 'has-scroll': this.labels.length > 8 }" id="x-axis" height="300" width="0"></canvas>
          <input id="scrollable" type="hidden" name="scrollable" :value="this.labels.length > 8">
        </div>

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
        ></pie-chart>
      </div>
    </mq-layout>

    <div class="companies" :class="{ 'is-open': allCompaniesShown }">
      <label :for="'company_name_'+index"
             v-for="(company, index) in companies"
             :key="index"
             :class="{ 'is-disabled': company.len <= 0 }"
      >
        <input type="checkbox"
               :name="'company_name_'+index"
               :id="'company_name_'+index"
               v-model="companiesSelected"
               :value="company"
               :disabled="!company.len"
               @change="onCompanyUpdate"
        >
        <span class="companies__check"></span>
        <span>{{company.id}}</span>
        <span class="company-color" :style="{ backgroundColor: company.color }"></span>
        <span class="chart-company-tooltip" v-if="company.date_investment">
            <span class="chart-company-tooltip__info-icon"
                 v-tooltip.right="{ content: getTooltipContent(company), classes: 'company-tooltip' } ">
              <svg width="2" height="8" viewBox="0 0 2 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M1.00098 2C1.55326 2 2.00098 1.55228 2.00098 1C2.00098 0.447715 1.55326 0 1.00098 0C0.448692 0 0.000976562 0.447715 0.000976562 1C0.000976562 1.55228 0.448692 2 1.00098 2ZM2.00098 4C2.00098 3.44772 1.55326 3 1.00098 3C0.448692 3 0.000976562 3.44772 0.000976562 4V7C0.000976562 7.55228 0.448692 8 1.00098 8C1.55326 8 2.00098 7.55228 2.00098 7L2.00098 4Z"
                      fill="white" />
              </svg>
            </span>
        </span>
      </label>
    </div>

    <div class="graphic-companies-actions">
      <div class="toggle-all-companies" v-if="companies.length > 8" @click="toggleAllCompanies"
           :class="{ 'is-open': allCompaniesShown }">
        {{ $t('all-companies') }}
      </div>

      <div class="check-all-companies">
        <label for="all_companies">
          <input type="checkbox"
                 name="all_companies"
                 id="all_companies"
                 @change="onCompanyUpdate('all')"
                 v-model="selectAll"
          />
          <span>{{ $t('toggle-all-companies') }}</span>
          <span class="companies__check"></span>
        </label>
      </div>
    </div>

  </div>
</template>

<script>
  import tinycolor from "tinycolor2";
  import Chart from 'chart.js';
  import ClickOutside from 'vue-click-outside';
  import Datepicker from '@sum.cumo/vue-datepicker';
  import { DateTime } from 'luxon';
  import { en, ru } from '@sum.cumo/vue-datepicker/dist/locale';

  import httpClient from '@/utils/httpClient';
  import setDesktopViewport from '@/utils/setDesktopViewport';
  import setMobileViewport from '@/utils/setMobileViewport';
  import vueCustomScrollbar from 'vue-custom-scrollbar';
  import 'vue-custom-scrollbar/dist/vueScrollbar.css';

  import LineChart from '@/components/Charts/LineChart/LineChart';
  import PieChart from '@/components/Charts/PieChart/PieChart';
  import BarChart from '@/components/Charts/BarChart/BarChart';


  export default {
    name: 'Charts',
    components: {
      BarChart,
      PieChart,
      LineChart,
      vueCustomScrollbar,
      Datepicker,
    },
    data() {
      return {
        en,
        ru,
        chartType: 'line',
        openTimeSelect: false,
        openDateSelect: false,
        openSortSelect: false,
        allCompaniesShown: false,
        companiesSet: [],
        companiesData: [],
        sorting: 'to-low',
        scrollSettings: {
          suppressScrollY: true,
          suppressScrollX: false,
          wheelPropagation: true,
          useBothWheelAxes: true,
        },
        timelineType: [
          {
            id: 'historical',
            title: 'historical',
          },
          {
            id: 'date',
            title: 'quarter',
          },
        ],
        currentTimeline: {
          id: 'historical',
          title: 'historical',
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
        currentDataNonMut: [],
        labels: [],
        labelsRaw: [],
        labelsCutted: [],
        labelsAvailable: [],
        unit: 'USD',
        datasets: [],
        quarters: {
          "Q1": 0,
          "Q2": 3,
          "Q3": 6,
          "Q4": 9
        },


        quartersReadable: [
          'Q1',
          'Q2',
          'Q3',
          'Q4',
        ],


        disabledStartDates: {},
        disabledEndDates: {},
        startDate: '',
        endDate: '',
        currentQuarter: '',
        startDateFormatted: '',
        endDateFormatted: '',
        openFromQSelect: false,
        currentFromQ: '',
        fromQuarters: [],
        openToQSelect: false,
        currentToQ: '',
        toQuarters: [],
      }
    },
    props: {},
    mounted() {
      const url = '/api/grafik_info_iblock.php';
      httpClient
        .get(url)
        .then((responseData) => {
          this.chartBackgroundColor();

          httpClient
            .get('/api/company_info_iblock.php')
            .then((response) => {
              const companies = response;

              httpClient
              .get('/api/company_info_iblock_exits.php')
              .then((responseExits) => {
                Array.prototype.push.apply(companies, responseExits);

                this.companiesSet = response;
                this.data = responseData;
                const map = new Map();
                const metricsMap = new Map();

                this.data.forEach((el) => {
                  // set all available metrics
                  if (el.metric_unit_text_2 === 'thousand' && el.metric_unit_text_1 === 'USD') el.metric_value *= 1000;
                  if (!metricsMap.has(el.metric_name)) {
                    metricsMap.set(el.metric_name, true);
                    this.metrics.push({
                      id: el.metric_name,
                      unit: el.metric_unit_text_1
                    });
                  }

                  // set all available companies
                  if (!map.has(el.company_id)) {
                    map.set(el.company_id, true);
                    const matchingCompany = companies.find(x => x.company_id === el.company_id);
                    this.companies.push({
                      id: el.company_id,
                      color: matchingCompany ? matchingCompany.color : '#000000',
                      date_investment: matchingCompany ? matchingCompany.date_investment : null,
                      len: 0,
                    });
                  }
                });

                // set first company as default (for first load)
                this.companiesSelected.push(this.companies[0]);
                this.fillData();
              });
            });
        });
    },
    methods: {
      onMetricClick(metric, index) {
        this.currentMetricIndex = index;
        // this.chartType = 'line';
        // this.currentTimeline = {
        //   id: 'historical',
        //   title: 'historical',
        // };
        if (this.getUnit === '%') this.chartType = 'line';
        this.unit = this.getUnit;
        this.fillData();
      },
      toggleOtherMetrics() {
        this.showMoreMetrics = !this.showMoreMetrics;
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
        this.labelsNonMut = [];
        this.labelsRaw = [];
        this.labelsCutted = [];
        this.currentData = [];
        this.currentDataNonMut = [];
        this.companiesData = [];

        const map = new Map();
        const periodMap = new Map();
        const periodMapCutted = new Map();

        // test with more data
        this.data.sort(this.sortByTime);
        this.data.sort(this.sortByQuoter);

        this.companies.forEach((company) => {
          company.len = 0;
        });

        this.data.forEach((obj) => {

          if (this.metrics[this.currentMetricIndex].id === obj.metric_name) {
            this.companies.some((company) => {
              if (company.id === obj.company_id) {
                if (obj.metric_value && (obj.metric_value !== 'NA' && obj.metric_value !== '')) {

                  // check company availability and data existence
                  if (this.currentQuoter && !this.isHistorical) {
                    const quoter = obj.period.replace(" ", "'").slice(0, 3);
                    const quoterYear = quoter + obj.period.slice(5);
                    if (this.currentQuoter === quoterYear) {
                      company.len += 1;
                    }
                    // or increment just by metric  and data length
                  } else {
                    company.len += 1;
                  }
                }
              }
            });
          }


          if (this.companiesSelected) {
            this.companiesSelected.some((company) => {
              if (obj.company_id === company.id && this.metrics[this.currentMetricIndex].id === obj.metric_name) {
                obj.color = company.color;
                if (!map.has(obj.company_id)) {
                  map.set(obj.company_id, true);
                  this.datasets.push({
                    label: obj.company_id,
                    id: obj.company_id,
                    backgroundColor: obj.color,
                    borderColor: obj.color,
                    fill: false,
                    data: [],
                  });
                }
                if (!periodMap.has(obj.period) && obj.period) {
                  if (obj.metric_value && (obj.metric_value !== 'NA' && obj.metric_value !== '') && !this.isHistorical || this.isHistorical) {
                    periodMap.set(obj.period, true);
                    const str = obj.period.replace(" ", "'").slice(0, 3);
                    this.labels.push(str + obj.period.slice(5))
                    this.labelsRaw.push(obj.period)
                  }
                }

                if (!this.isHistorical) {
                  const str = obj.period.replace(" ", "'").slice(0, 3);
                  if (this.currentQuoter === (str + obj.period.slice(5))) {
                    this.currentData.push(obj);
                    this.currentDataNonMut.push(obj);
                  }
                } else {
                  if (obj.period) { // TODO: separate fix, need to test
                    this.currentData.push(obj);
                    this.currentDataNonMut.push(obj);
                  }
                }
              }
            });
          }
        });


        this.labelsNonMut = JSON.parse(JSON.stringify(this.labels));
        const dataForTimeFilter = JSON.parse(JSON.stringify(this.currentDataNonMut));
        // set non active select dates by calc available data
        const toDate = new Date(Math.min.apply(Math, dataForTimeFilter.map((o) => parseInt(o.period.substr(o.period.length - 4)))).toString());
        const endDate = new Date(Math.max.apply(Math, dataForTimeFilter.map((o) => parseInt(o.period.substr(o.period.length - 4)))).toString());


        this.disabledStartDates = {
          to: toDate,
          from: endDate,
        };
        this.disabledEndDates = {
          to: toDate,
          from: endDate,
        };



        // filter historical chart by datepicker
        if (this.isHistorical) {
          if (this.startDate && this.endDate && this.currentToQ && this.currentFromQ) {
            this.labels = [];

            this.startDateFormatted = DateTime.fromJSDate(this.startDate).startOf('year').plus({ quarter: parseInt(this.currentFromQ.match(/\d+/)[0] - 1) });
            this.endDateFormatted = DateTime.fromJSDate(this.endDate).startOf('year').plus({ quarter: parseInt(this.currentToQ.match(/\d+/)[0] - 1) });

            const dataForTimeFilter = JSON.parse(JSON.stringify(this.currentDataNonMut));

            this.currentData = dataForTimeFilter.reduce((periods, data) => {
              const { period } = data;
              if (period) {
                const year = period.substr(period.length - 4)
                const quarter = period.slice(0, 2);
                const datasetDate = DateTime.fromFormat(year, 'yyyy').plus({ quarter: parseInt(quarter.match(/\d+/)[0] - 1) });
                if (datasetDate && datasetDate >= this.startDateFormatted && datasetDate <= this.endDateFormatted) {
                  periods.push(data);
                  if (!periodMapCutted.has(data.period) && data.period) {
                    if (data.metric_value && (data.metric_value !== 'NA' && data.metric_value !== '') && !this.isHistorical || this.isHistorical) {
                      periodMapCutted.set(data.period, true);
                      const str = data.period.replace(" ", "'").slice(0, 3);
                      this.labels.push(str + data.period.slice(5))
                    }
                  }
                }
              }
              return periods;
            }, []);
          }

          // change to quarter chart if only one quarter period chosen
          if (this.labels.length === 1) {
            this.currentTimeline = {
              id: "date",
              title: "quarter",
            };
            this.openTimeSelect = false;
            this.currentQuoter = this.labels[0];
            this.fillData();
          }
        }

        // set scroll position default on last quarters
        setTimeout(() => {
          if (this.$refs.scrollable) {
            this.$refs.scrollable.$el.scrollLeft = this.$refs.scrollable.$el.scrollWidth;
            this.$refs.scrollable.update();
          }
        },0)


        this.currentData.forEach((obj) => {
          this.datasets.some((company) => {

            if (obj.company_id === company.id) {
              if (this.isHistorical) {
                if ((obj.metric_value === 'NA' || obj.metric_value === '')) {
                  company.data.push(null);
                } else {
                  company.data.push(parseFloat(obj.metric_value).toFixed(1));
                }
              } else if (obj.metric_value && !this.isHistorical && obj.metric_value !== 'NA' && obj.metric_value !== '') {
                company.data.push(parseFloat(obj.metric_value).toFixed(1));
              }
            }
          });
        });

        // cut line graphic by sides if empty
        if (this.isHistorical) {
          const lengthArr = [];
          let newDataset = [];
          this.datasets.forEach((dataset) => {
            if (!dataset) return;
            newDataset = dataset.data.slice();
            while (newDataset[0] === null) {
              newDataset.shift();
            }
            lengthArr.push(newDataset.length);
          });

          let shiftNum = isFinite(Math.max.apply(Math, lengthArr)) ? Math.max.apply(Math, lengthArr) : 0;
          shiftNum = this.labels.length - shiftNum;
          for (let i = 0; i < shiftNum; i++) {
            this.labels.shift();
          }

          this.datasets.forEach((dataset) => {
            if (!dataset) return;
            for (let i = 0; i < shiftNum; i++) {
              dataset.data.shift();
            }
          });
        }


        // start handling reverse data and labels for non historic
        // set first quoter as default (reverse labels to prepare for quarters data)
        if (this.isHistorical) {
          const labels = JSON.parse(JSON.stringify(this.labelsNonMut));
          this.labelsAvailable = labels.reverse();
          this.currentQuoter = this.labelsAvailable[0];
        } else {
          this.labels = [];
          this.labels[0] = this.currentQuoter;
        }
        // end handling reverse data and labels for non historic


        // sorting from min to max for bar chart
        if (!this.isHistorical) {
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
        // rewrite data for doughnut chart
        if (!this.isHistorical && this.isLine) {
          this.datacollection = this.drawBar(this.datacollection);
        }

        setTimeout(() => {
          this.$store.dispatch('loader/hide');
          if (this.$refs.scrollable) {
            this.$refs.scrollable.update();
          }
        }, 650);
      },
      sortByTime(lhs, rhs) {
        const lhsPeriod = lhs.period;
        const rhsPeriod = rhs.period;
        if (!lhsPeriod || !rhsPeriod) return;

        const lhsQuarterYear = lhsPeriod.split(" ");
        const rhsQuarterYear = rhsPeriod.split(" ");
        // var lhsDate = new Date(lhsQuarterYear[1], this.quarters[lhsQuarterYear[0]]);
        // var rhsDate = new Date(rhsQuarterYear[1], this.quarters[rhsQuarterYear[0]]);
        return new Date(lhsQuarterYear[1]).getTime() - new Date(rhsQuarterYear[1]).getTime();
        // return lhsDate.getTime() - rhsDate.getTime();
      },
      sortByQuoter(lhs, rhs) {
        const lhsPeriod = lhs.period;
        const rhsPeriod = rhs.period;
        if (!lhsPeriod || !rhsPeriod) return;

        const lhsQuarterYear = lhsPeriod.split(" ");
        const rhsQuarterYear = rhsPeriod.split(" ");
        const lhsDate = new Date(lhsQuarterYear[1], this.quarters[lhsQuarterYear[0]]);
        const rhsDate = new Date(rhsQuarterYear[1], this.quarters[rhsQuarterYear[0]]);
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
      sortMinMax(data) {
        const dataArray = [];
        let currentDatasets = data;
        currentDatasets.forEach((obj) => {
          dataArray.push(obj.data);
        });
        let dataIndexes = dataArray.map((d, i) => i);
        dataIndexes.sort((a, b) => {
          return this.sorting === 'to-low' ? dataArray[b] - dataArray[a] : dataArray[a] - dataArray[b];
        });
        const datasets = [];
        dataIndexes.forEach((index) => {
          datasets.push(currentDatasets[index]);
        });
        return datasets;
      },
      drawPie(datasets) {
        const data = { datasets: [{ data: [], backgroundColor: [], hoverBackgroundColor: [] }], labels: [] };
        datasets.datasets.forEach((obj) => {
          if (obj.data[0]) {
            data.labels.push(obj.label);
            data.datasets[0].data.push(obj.data);
            data.datasets[0].backgroundColor.push(obj.backgroundColor);
            data.datasets[0].hoverBackgroundColor.push(tinycolor(obj.backgroundColor).darken(10).toString());
          }
        });
        return data;
      },
      drawBar(datasets) {
        const labels = [];
        const data = [];
        const bgColors = [];
        const hoverBgColors = [];

        datasets.datasets.forEach((obj) => {
          if (obj.data[0]) {
            labels.push(obj.label);
            data.push(parseFloat(obj.data[0]).toFixed(2));
            bgColors.push(obj.backgroundColor);
            hoverBgColors.push(tinycolor(obj.backgroundColor).darken(10).toString());
          }
        });

        return {
          labels: labels,
          datasets: [
            {
              data,
              backgroundColor: bgColors,
              hoverBackgroundColor: hoverBgColors,
              labels: bgColors
            }
          ]
        };
      },
      toggleAllCompanies() {
        this.allCompaniesShown = !this.allCompaniesShown;
      },
      timeLineChange(option) {
        console.log(option);

        this.startDate = '';
        this.endDate = '';

        this.currentTimeline = option;
        this.openTimeSelect = false;
        if (this.isHistorical) this.currentQuoter = '';
        this.fillData();
      },
      dateChange(option) {
        this.currentQuoter = option;
        this.openDateSelect = false;
        this.fillData();
      },
      sortChange(param, option) {
        this.sorting = param;
        this.$refs.sortingSelected.innerText = option;
        this.openSortSelect = false;
        this.fillData();
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
      closeSortSelect() {
        this.openSortSelect = false;
      },
      onBlur() {
        if (!this.startDate && !this.endDate) this.updateDataHistoricQuarters();
      },
      onStartDateSelect(time) {
        this.startDate = time;
        this.disabledEndDates = {
          to: time,
        };
        if (this.startDate && this.endDate && this.currentToQ && this.currentFromQ) this.updateDataHistoricQuarters();
      },
      onEndDateSelect(time) {
        this.endDate = time;
        this.disabledStartDates = {
          from: time,
        };
        if (this.startDate && this.endDate && this.currentToQ && this.currentFromQ) this.updateDataHistoricQuarters();
      },

      closeFromQSelect() {
        this.openFromQSelect = false;
      },
      sortFromQChange(option) {
        this.currentFromQ = option;
        this.openFromQSelect = false;
        if (this.startDate && this.endDate && this.currentToQ && this.currentFromQ) this.updateDataHistoricQuarters();
      },
      closeToQSelect() {
        this.openToQSelect = false;
      },
      sortToQChange(option) {
        this.currentToQ = option;
        this.openToQSelect = false;
        if (this.startDate && this.endDate && this.currentToQ && this.currentFromQ) this.updateDataHistoricQuarters();
      },
      updateDataHistoricQuarters() {
        this.fillData();
      },
      getTooltipContent(content) {
        return `<b>${this.$t("date_investment")}: ${content.date_investment ? content.date_investment : ''}</b>`;
      },
      setDesktopViewport,
      setMobileViewport,
    },
    beforeDestroy() {
      this.setMobileViewport();
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
        return this.metrics.slice(0, this.isMobile ? 1 : 4);
      },
      getUnit() {
        return this.metrics[this.currentMetricIndex] && this.metrics[this.currentMetricIndex].unit === 'USD' ? '$' : '%';
      },
      moreMetrics() {
        return this.metrics.slice(this.showedMetrics.length, this.metrics.length);
      },
      noGraphData() {
        if (!this.datacollection.datasets) return false;
        return !this.datacollection.datasets.length;
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
          this.allCompaniesShown = selected.length;
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
