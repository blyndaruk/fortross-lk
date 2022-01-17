<template>
  <div class="account-report">
    <div class="account-report__head">

      <div class="field field--date">
        <div class="field__label">{{ $t('period') }}</div>
        <div class="field__inner">
          <div class="field__date">
            <div class="field__placeholder-left">{{ $t('datepicker.from') }}</div>
            <datepicker
                format="d.MM.yyyy"
                initial-view="year"
                :disabled-dates="disabledStartDates"
                :typeable="true"
                :language="$i18n.locale === 'ru' ? ru : en"
                :open-date="disabledStartDates.from"
                :monday-first="true"
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
          <div class="field__date">
            <div class="field__placeholder-left">{{ $t('datepicker.to') }}</div>
            <datepicker
                format="d.MM.yyyy"
                initial-view="year"
                :disabled-dates="disabledEndDates"
                :typeable="true"
                :language="$i18n.locale === 'ru' ? ru : en"
                :open-date="disabledEndDates.from"
                :monday-first="true"
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
        </div>
      </div>

      <div class="field field--sort">
        <div class="field__label">{{ $t('type') }}</div>
        <div class="field__inner">

          <div class="sort-select" v-click-outside="closeTypeSelect">
            <div class="sort-select__wrap" @blur="openTypeSelect = false">
              <div class="sort-select__active" :class="{ 'is-open': openTypeSelect }"
                   @click="openTypeSelect = !openTypeSelect"
              >
                {{ checkedFiltersRender }}
              </div>
              <div class="sort-select__options" :class="{ 'is-open': openTypeSelect }">
                <div
                    class="sort-select__option sort-select__option--checkbox"
                    v-for="(option, i) in types"
                    :key="i"
                >
                  <label v-if="i === 0" for="select-all">
                    <input id="select-all"
                           class="conditions-check"
                           v-model="selectAll"
                           type="checkbox"
                           name="type"
                           @change="filterTypeChange"
                           checked
                    >
                    {{ $t('all') }}
                    <span class="sort-select__checkbox"></span>
                  </label>
                  <label v-else :for="'select-all'+i">
                    <input :id="'select-all'+i"
                           class="conditions-check"
                           v-model="checkedFilters"
                           :value="option"
                           @change="filterTypeChange"
                           type="checkbox"
                           name="type"
                           checked
                    >
                    {{ $t(option) }}
                    <span class="sort-select__checkbox"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div class="account-report__show-chart">
        <button @click="openGraphics">
          {{ $t('InfoGraphics') }}
        </button>
      </div>
    </div>

    <div v-if="currentReports.length && !graphicsHidden" class="report-table__chart">
      <mq-layout mq="laptop+">
        <div class="chart-wrapper">
          <input id="unit_type" type="hidden" name="unit_type" value="$">

          <div :class="{ 'has-scroll': this.labels.length > 8 }">
            <vue-custom-scrollbar class="scroll-area" :settings="scrollSettings" ref="scrollable">
              <line-chart
                  class="chart chart-line"
                  :class="{ 'has-scroll': this.labels.length > 8 }"
                  :chart-data="datacollection"
                  :style="{'width': `${this.labels.length * 30}px`, 'min-width': '100%'}"
                  unit="$"
              ></line-chart>
            </vue-custom-scrollbar>
            <canvas class="chart-line chart-line--x-axis js-x-axis" :class="{ 'has-scroll': this.labels.length > 8 }" height="300" width="0"></canvas>
            <input class="js-scrollable-val" type="hidden" name="scrollable" :value="this.labels.length > 8">
          </div>
        </div>
      </mq-layout>
    </div>




    <div class="report-no-data" v-if="!currentReports.length">{{ $t('no-data') }}</div>

    <div class="account-report__data">
      <div class="report-table" v-for="(table, index) in currentReports" :key="table.period">
        <div class="report-table__head">
          <div class="report-table__title" v-if="table.dataset && table.dataset.length">
            {{table.periodMonth + ', ' + table.periodYear}}
          </div>
          <div class="report-table__head-actions">
            <div class="report-table__download" v-if="index === 0">
              <DownloadFile
                  :downloadable="true"
                  :date-from="dateFrom"
                  :date-to="dateTo"
                  download-link="/api/reports/asr.php"
              />
            </div>
            <div class="sort-select" v-if="index === 0" v-click-outside="closeSelect">
              <div class="sort-select__label">{{ $t('sorting-by') }}</div>
              <div class="sort-select__wrap" @blur="openSortSelect = false">
                <div class="sort-select__active" :class="{ 'is-open': openSortSelect }"
                     @click="openSortSelect = !openSortSelect"
                >
                  {{ $t('date') }}
                </div>
                <div class="sort-select__options" :class="{ 'is-open': openSortSelect }">
                  <div class="sort-select__option" @click="sortChange('to-low', $t('sort-by-list.to-low'))">
                    {{$t('sort-by-list.to-low')}}
                  </div>
                  <div class="sort-select__option" @click="sortChange('to-high', $t('sort-by-list.to-high'))">
                    {{$t('sort-by-list.to-high')}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="report-table__body" v-if="table.dataset && table.dataset.length">
          <div class="report-table__row js-row" v-for="(row, index) in table.dataset" :key="index">
            <div class="report-table__date">{{ row.date.split('.')[0].length === 1 ? '0' + row.date : row.date }}</div>
            <div class="report-table__type">
              <p class="report-table__trunc" ref="truncate">
                {{ $t(row.type.toLowerCase()) }}
              </p>
              <div class="report-table__info-icon" v-if="row.typeTooltip"
                   v-tooltip.top-start="{ content: row.typeTooltip, classes: 'report-tooltip' } ">
                <svg width="2" height="8" viewBox="0 0 2 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M1.00098 2C1.55326 2 2.00098 1.55228 2.00098 1C2.00098 0.447715 1.55326 0 1.00098 0C0.448692 0 0.000976562 0.447715 0.000976562 1C0.000976562 1.55228 0.448692 2 1.00098 2ZM2.00098 4C2.00098 3.44772 1.55326 3 1.00098 3C0.448692 3 0.000976562 3.44772 0.000976562 4V7C0.000976562 7.55228 0.448692 8 1.00098 8C1.55326 8 2.00098 7.55228 2.00098 7L2.00098 4Z"
                        fill="white" />
                </svg>
              </div>
              <div class="report-table__trunc-more" @click="toggleMore">
                <svg width="20" height="4" viewBox="0 0 20 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M4 2C4 3.10457 3.10457 4 2 4C0.895431 4 0 3.10457 0 2C0 0.895431 0.895431 0 2 0C3.10457 0 4 0.895431 4 2ZM12 2C12 3.10457 11.1046 4 10 4C8.89543 4 8 3.10457 8 2C8 0.895431 8.89543 0 10 0C11.1046 0 12 0.895431 12 2ZM18 4C19.1046 4 20 3.10457 20 2C20 0.895431 19.1046 0 18 0C16.8954 0 16 0.895431 16 2C16 3.10457 16.8954 4 18 4Z"
                        fill="currentColor" />
                </svg>
              </div>
            </div>
            <div class="report-table__description">
              <p class="report-table__trunc" ref="truncate">
                {{ row.description }}
              </p>
              <div class="report-table__info-icon" v-if="row.tooltip"
                   v-tooltip.top-start="{ content: row.tooltip, classes: 'report-tooltip' } ">
                <svg width="2" height="8" viewBox="0 0 2 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M1.00098 2C1.55326 2 2.00098 1.55228 2.00098 1C2.00098 0.447715 1.55326 0 1.00098 0C0.448692 0 0.000976562 0.447715 0.000976562 1C0.000976562 1.55228 0.448692 2 1.00098 2ZM2.00098 4C2.00098 3.44772 1.55326 3 1.00098 3C0.448692 3 0.000976562 3.44772 0.000976562 4V7C0.000976562 7.55228 0.448692 8 1.00098 8C1.55326 8 2.00098 7.55228 2.00098 7L2.00098 4Z"
                        fill="white" />
                </svg>
              </div>
              <div class="report-table__trunc-more" @click="toggleMore">
                <svg width="20" height="4" viewBox="0 0 20 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M4 2C4 3.10457 3.10457 4 2 4C0.895431 4 0 3.10457 0 2C0 0.895431 0.895431 0 2 0C3.10457 0 4 0.895431 4 2ZM12 2C12 3.10457 11.1046 4 10 4C8.89543 4 8 3.10457 8 2C8 0.895431 8.89543 0 10 0C11.1046 0 12 0.895431 12 2ZM18 4C19.1046 4 20 3.10457 20 2C20 0.895431 19.1046 0 18 0C16.8954 0 16 0.895431 16 2C16 3.10457 16.8954 4 18 4Z"
                        fill="currentColor" />
                </svg>
              </div>
            </div>
            <div class="report-table__amount">
              {{sign(row.summ)}}{{
              parseFloat(row.summ)
              .toLocaleString('ru', {minimumFractionDigits: 2,maximumFractionDigits: 2})
              .replace(',', '.')
              }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Chart from 'chart.js';
  import DownloadFile from '@/components/DownloadFile/DownloadFile';
  import httpClient from '@/utils/httpClient';
  import ClickOutside from 'vue-click-outside';
  import Datepicker from '@sum.cumo/vue-datepicker';
  import { DateTime } from 'luxon';
  import { en, ru } from '@sum.cumo/vue-datepicker/dist/locale';
  import LineChart from '@/components/Charts/LineChart/LineChart';
  import vueCustomScrollbar from 'vue-custom-scrollbar';
  import 'vue-custom-scrollbar/dist/vueScrollbar.css';


  export default {
    name: 'AccountReport',
    components: {
      DownloadFile,
      Datepicker,
      LineChart,
      vueCustomScrollbar,
    },
    data() {
      return {
        en,
        ru,
        data: [],
        openSortSelect: false,
        dateFrom: '',
        dateTo: '',
        sortTypes: [
          {
            title: 'По возрастанию',
            id: 'to-high',
          },
          {
            title: 'По убыванию',
            id: 'to-low',
          },
        ],
        currentSortType: 'to-high',
        openTypeSelect: false,
        disabledStartDates: {},
        disabledEndDates: {},
        startDate: '',
        endDate: '',
        checkedFilters: [this.$i18n.messages[this.$i18n.locale].all],
        types: [this.$i18n.messages[this.$i18n.locale].all],
        allSelected: true,
        currentReports: [],
        reportsNew: [],
        reports: [],
        scrollSettings: {
          suppressScrollY: true,
          suppressScrollX: false,
          wheelPropagation: true,
          useBothWheelAxes: true,
        },
        datacollection: {},
        labels: [],
        graphicsHidden: true,
      }
    },
    methods: {
      onBlur() {
        if (!this.startDate && !this.endDate) this.updateData();
      },
      updateData() {
        if (!this.reports) return;

        this.$store.dispatch('loader/show');

        this.currentReports = [];

        this.reports.periods.forEach((report, index) => {
          const formatted = DateTime.fromFormat(report.period, 'LL-yyyy', { locale: this.$i18n.locale });
          const month = formatted.monthLong;
          const year = formatted.year;
          this.currentReports.push({
            period: report.period,
            periodMonth: month,
            periodYear: year,
            periodFormatted: month + ', ' + year,
            quarter: formatted.quarter,
            dataset: [],
          });

          report.strings.forEach((dataset) => {
            let date = DateTime.fromFormat(dataset.date, 'dd-MM-yyyy');
            if (!date.c) date = DateTime.fromFormat(dataset.date, 'd.M.yyyy');

            let month = date.c.month;
            month = month.toString().length < 2 ? '0' + month : month;

            dataset.date = `${date.c.day}.${month}.${date.c.year}`;

            if (this.checkedFilters === this.$i18n.messages[this.$i18n.locale].all) {
              this.currentReports[index].dataset.push(dataset);
            } else {
              if (this.checkedFilters.includes(dataset.type.toLowerCase())) {
                this.currentReports[index].dataset.push(dataset);
              }
            }
          });
        });

        // remove periods without data
        this.currentReports = this.currentReports.filter(report => report.dataset.length);

        const defaultReports = this.currentReports;

        // Filter by chosen date range
        if (this.startDate && this.endDate) {
          const startDateFormatted = DateTime.fromJSDate(this.startDate).startOf('day');
          const endDateFormatted = DateTime.fromJSDate(this.endDate).startOf('day');
          this.currentReports = this.currentReports.reduce((reports, report) => {
            if (report.dataset) {
              const tt = report.dataset.filter((dataset) => {
                const datasetDate = DateTime.fromFormat(dataset.date, 'd.M.yyyy');
                return (datasetDate >= startDateFormatted && datasetDate <= endDateFormatted);
              });
              if (tt.length) {
                const formatted = DateTime.fromFormat(report.period, 'LL-yyyy', { locale: this.$i18n.locale });
                const month = formatted.monthLong;
                const year = formatted.year;
                reports.push({
                  period: report.period,
                  dataset: tt,
                  periodMonth: month,
                  periodYear: year,
                  quarter: formatted.quarter,
                  periodFormatted: month + ', ' + year,
                });
              }
            }
            return reports;
          }, []);
        }

        // Sorting by inner dates
        this.currentReports.forEach((period) => {
          period.dataset.sort((x, y) => {
            const keyA = DateTime.fromFormat(x.date, 'd.M.yyyy');
            const keyB = DateTime.fromFormat(y.date, 'd.M.yyyy');

            if (this.currentSortType === 'to-high') {
              if (keyA > keyB) return -1;
              if (keyA < keyB) return 1;
            } else {
              if (keyA < keyB) return -1;
              if (keyA > keyB) return 1;
            }
            return 0;
          });
        });

        // Sorting by dates
        this.currentReports.sort((a, b) => {
          const keyA = DateTime.fromFormat(a.period.toLowerCase(), 'LL-yyyy', { locale: this.$i18n.locale });
          const keyB = DateTime.fromFormat(b.period.toLowerCase(), 'LL-yyyy', { locale: this.$i18n.locale });

          // Compare the 2 dates
          if (this.currentSortType === 'to-high') {
            if (keyA > keyB) return -1;
            if (keyA < keyB) return 1;
          } else {
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
          }
          return 0;
        });

        // disable dates with no data on load
        const toDate = new Date(Math.min.apply(null, defaultReports.map((o) => new Date(DateTime.fromFormat(o.period, 'LL-yyyy', { locale: this.$i18n.locale }).startOf('month').toISO()))));
        const endDate = new Date(Math.max.apply(null, defaultReports.map((o) => new Date(DateTime.fromFormat(o.period, 'LL-yyyy', { locale: this.$i18n.locale }).endOf('month').toISO()))));
        this.disabledStartDates = {
          to: toDate,
          from: endDate,
        };
        this.disabledEndDates = {
          to: toDate,
          from: endDate,
        };

        if (this.currentReports.length) {
          this.dateTo = this.currentReports[0].dataset[0].date;
          const lastDataset = this.currentReports[this.currentReports.length - 1].dataset;
          this.dateFrom = this.currentReports[this.currentReports.length - 1].dataset[lastDataset.length - 1].date;
        }

        this.updateGraphics(this.currentReports)

        setTimeout(() => {
          this.truncate();
          this.$store.dispatch('loader/hide');
        }, 500);
      },
      updateGraphics (reports) {
        this.chartBackgroundColor()
        this.labels = []
        this.datacollection = []


        // backgroundColor: "#008941"
        // borderColor: "#008941"
        // const labels = reports.map((period) => period.period)
        // const datasets = reports.map((period) => {
        //   const dataset = {
        //     backgroundColor: "#008941",
        //     borderColor: "#008941",
        //     data: period.dataset.map((data) => +data.summ),
        //     fill: false,
        //     id: "LendingHome",
        //     label: "LendingHome",
        //   }
        //   return dataset
        // })



        // const data = reports.map((period) => {
        //   // return app.concat(period.dataset.map((data) => +data.summ))
        //   return period.dataset.reduce((app, data) => {
        //     console.log(app);
        //     return app + (+data.summ)
        //   }, 0)
        // })


        const data = reports.reduce((app, period) => {
          return app.concat(period.dataset.map((data) => +data.summ))
        }, [])
        this.labels = reports.reduce((app, period) => {
          return app.concat(period.dataset.map((data) => data.date.slice(0, -4) + + data.date.slice(data.date.length - 2)))
        }, [])


        const datasets = [{
          backgroundColor: "#008941",
          borderColor: "#008941",
          data,
          fill: false,
          id: "LendingHome",
          label: "Value",
        }]

        this.datacollection = {
          datasets,
          labels: this.labels,
        }
        setTimeout(() => {
          if (this.$refs.scrollable) {
            this.$refs.scrollable.update();
          }
        },0)
      },
      openGraphics () {
        this.graphicsHidden = !this.graphicsHidden
        this.updateGraphics(this.currentReports)
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
      onStartDateSelect(time) {
        this.startDate = time;
        this.disabledEndDates.to = time;
        if (this.startDate && this.endDate) this.updateData();
      },
      onEndDateSelect(time) {
        this.endDate = time;
        this.disabledStartDates.from = time;
        if (this.startDate && this.endDate) this.updateData();
      },
      closeSelect() {
        this.openSortSelect = false;
      },
      closeTypeSelect() {
        this.openTypeSelect = false;
      },
      sortChange(option) {
        this.currentSortType = option;
        this.openSortSelect = false;
        this.updateData();
      },
      filterTypeChange() {
        this.openTypeSelect = false;
        this.updateData();
      },
      toggleMore(e) {
        e.currentTarget.closest('.js-row').classList.toggle('is-open');
      },
      truncate() {
        if (Object.keys(this.$refs).length !== 0) {
          this.$refs.truncate.forEach((el) => {
            if (el.offsetWidth < el.scrollWidth) {
              el.classList.add('is-overflow');
            } else {
              el.classList.remove('is-overflow');
            }
          });
        }
      },
      sign(value) {
        return value.includes('-') ? '' : '+';
      }
    },
    watch: {
      '$i18n.locale': function () {
        this.checkedFilters[0] = this.$i18n.messages[this.$i18n.locale].all;
        if (Object.keys(this.reports).length) this.updateData();
      }
    },
    mounted() {
      const investor = document.querySelector('.investor').value;

      httpClient
        .get('/api/contributed_capital_base.php', {
          params: {
            investor,
          },
        })
        .then((response) => {
          if (!response) return;

          this.reports = response;

          const map = new Map();
          this.reports.periods.forEach((report) => {
            report.strings.forEach((dataset) => {
              if (!map.has(dataset.type) && dataset.type) {
                map.set(dataset.type, true);
                this.types.push(dataset.type.toLowerCase());
              }
            });
          });
          this.checkedFilters = this.types; // show all filters on load
          this.updateData();
        });
      setTimeout(() => {
        this.truncate();
      }, 1000);
    },
    computed: {
      selectAll: {
        get() {
          return this.types ? this.checkedFilters.length === this.types.length : false;
        },
        set(value) {
          this.checkedFilters = [];
          if (value) {
            this.types.forEach((company) => {
              this.checkedFilters.push(company);
            });
          } else {
            this.checkedFilters = [this.$i18n.messages[this.$i18n.locale].all];
          }
        }
      },
      checkedFiltersRender() {
        let filters = this.checkedFilters;
        filters = filters.map((filter, index) => {
          if (index > 0) return this.$i18n.messages[this.$i18n.locale][filter]
        })

        if (filters.length === this.types.length || this.checkedFilters.length <= 1) {
          return filters[0] = this.$i18n.messages[this.$i18n.locale].all;
        } else {
          [, ...filters] = filters;
          return filters.join(', ');
        }
      }
    },
    directives: {
      ClickOutside
    },
  }
</script>

<style lang="scss" scoped>
  .account-report {
    &__head {
      position: relative;
      z-index: 3;
      display: flex;
      padding: 30px;
      margin-bottom: 40px;
      background-color: #ffffff;
      @include xs {
        display: block;
        padding: 20px;
        margin-bottom: 30px;
      }

      .field:not(:last-child) {
        margin-right: 40px;
        @include xs {
          margin-right: 0;
        }
      }
    }

    &__show-chart {
      display: flex;
      align-items: flex-end;
      margin-left: auto;
      margin-top: auto;

      button {
        padding: 4px 20px;
        height: 40px;
        font-size: 16px;
        font-weight: 600;
        color: #ffffff;
        border: 1px solid rgb(36, 219, 175);
        background-color: rgb(36, 219, 175);
        border-radius: 6px;
        transition: all .3s ease;

        &:hover {
          background-color: transparent;
          color: rgb(36, 219, 175);
        }
      }
    }
  }

  .charts-wrapper {
    position: relative;
    background-color: #ffffff;
    padding: 30px;
    margin-bottom: 40px;

    @include xs {
      margin-left: -20px;
      margin-right: -20px;
      padding: 20px;
    }
  }
  .chart-wrapper {
    position: relative;
    //width: 600px;
    overflow-x: auto;

    &::v-deep .ps__rail-x {
      display: none !important;
    }

    &::v-deep .chart-line {
      &.has-scroll {
        //width: 5000px;

        & ~ .ps__rail-x {
          display: block !important;
        }
      }

      &:not(.has-scroll) {
        & + .ps__rail-x {
          display: none !important;
        }
      }

      &--x-axis {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        background-color: #ffffff;
      }
    }


    .has-scroll {
      &::v-deep .ps__rail-x {
        display: block !important;
      }
    }
    //&:not(.has-scroll) {
    //  &::v-deep .ps__rail-x {
    //    display: none !important;
    //  }
    //}

    .ps-container {
      padding-bottom: 20px;
    }

    &::v-deep .ps__rail-x {
      height: 6px !important;
      opacity: 1 !important;
    }
    &::v-deep .ps__thumb-x {
      background-color: #bebebe !important;
      height: 6px !important;
      opacity: 1 !important;
    }
  }
</style>
