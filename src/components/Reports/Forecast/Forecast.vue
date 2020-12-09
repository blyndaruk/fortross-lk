<template>
  <div class="forecast">
    <div class="forecast__head">

      <div class="field field--date">
        <div class="field__label">Период</div>
        <div class="field__inner">
          <div class="field__date">
            <div class="field__placeholder-left">{{ $t('datepicker.from') }}</div>
            <datepicker
                format="yyyy"
                @selected="onStartDateSelect"
                :language="$i18n.locale === 'ru' ? ru : en"
                minimum-view="year"
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
                  {{ currentFromQ || 'Квартал' }}
                </div>
                <div class="sort-select__options" :class="{ 'is-open': openFromQSelect }">
                  <div
                      class="sort-select__option"
                      v-for="(option, i) in fromQuarters"
                      :key="i"
                      @click="sortFromQChange(option)"
                  >
                    {{ option }}
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div class="field__date">
            <div class="field__placeholder-left">{{ $t('datepicker.to') }}</div>
            <datepicker
                format="yyyy"
                @selected="onEndDateSelect"
                :language="$i18n.locale === 'ru' ? ru : en"
                minimum-view="year"
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
                  {{ currentToQ || 'Квартал' }}
                </div>
                <div class="sort-select__options" :class="{ 'is-open': openToQSelect }">
                  <div
                      class="sort-select__option"
                      v-for="(option, i) in toQuarters"
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



    <div class="forecast__data">
      <div class="report-table">
        <div class="report-table__head">
          <div class="report-table__title">Forecast for the <span>2020 Q4</span></div>
          <div class="report-table__head-actions">
            <div class="report-table__download">
              <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M16.0015 15C16.0015 15.5523 15.5537 16 15.0015 16L1.00146 16C0.44918 16 0.00146485 15.5523 0.00146486 15C0.00146486 14.4477 0.44918 14 1.00146 14L6.51452 14L1.82836 9.74006C1.41969 9.36856 1.38956 8.73611 1.76105 8.32744C2.13255 7.91878 2.765 7.88865 3.17367 8.26014L7.00102 11.7394L7.00102 -2.01468e-06L9.00102 -1.99083e-06L9.00102 11.7397L12.8283 8.26018C13.237 7.88866 13.8694 7.91876 14.2409 8.32741C14.6125 8.73606 14.5824 9.36851 14.1737 9.74002L9.48796 14L15.0015 14C15.5537 14 16.0015 14.4477 16.0015 15Z"
                      fill="#24DBAF" />
              </svg>
              <span>XLS</span>
            </div>
          </div>
        </div>

        <div class="report-table__body">
          <div class="report-table__row" v-for="(row, index) in currentReports" :key="index">
            <div class="report-table__text">
              <p>{{row.title}}</p>
              <div class="report-table__info-icon" v-if="row.tooltip"
                   v-tooltip.top-start="{ content: row.tooltip, classes: 'report-tooltip' } ">
                <svg width="2" height="8" viewBox="0 0 2 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M1.00098 2C1.55326 2 2.00098 1.55228 2.00098 1C2.00098 0.447715 1.55326 0 1.00098 0C0.448692 0 0.000976562 0.447715 0.000976562 1C0.000976562 1.55228 0.448692 2 1.00098 2ZM2.00098 4C2.00098 3.44772 1.55326 3 1.00098 3C0.448692 3 0.000976562 3.44772 0.000976562 4V7C0.000976562 7.55228 0.448692 8 1.00098 8C1.55326 8 2.00098 7.55228 2.00098 7L2.00098 4Z"
                        fill="white" />
                </svg>
              </div>
            </div>
            <div class="report-table__amount">{{row.amount}}</div>
          </div>
        </div>
      </div>


      <div class="report-table" v-for="(table) in reports" :key="table.period">
        <div class="report-table__head">
          <div class="report-table__title">
            {{table.period}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import { DateTime } from 'luxon';

  // import httpClient from '@/utils/httpClient';
  import ClickOutside from 'vue-click-outside';
  import Datepicker from 'vuejs-datepicker';
  import { en, ru } from 'vuejs-datepicker/dist/locale';
  // import { DateTime } from "luxon";

  export default {
    name: 'Forecast',
    components: {
      Datepicker,
    },
    data() {
      return {
        en,
        ru,
        quarters: [
          'Q1',
          'Q2',
          'Q3',
          'Q4',
        ],
        openFromQSelect: false,
        currentFromQ: '',
        fromQuarters: [],
        openToQSelect: false,
        currentToQ: '',
        toQuarters: [],
        currentReports: [],
        reports: [
          {
            title: 'Upcoming Investments (estimate)',
            amount: '-45 000.00 USD',
            quarter: 'Q4',
            date: '20-10-2020',
          },
          {
            title: 'Upcoming Investments (estimate)',
            amount: '-45 000.00 USD',
            quarter: 'Q1',
          },
          {
            title: 'Upcoming Investments (estimate)',
            amount: '-45 000.00 USD',
            tooltip: 'Upcoming Investments',
            quarter: 'Q1',
            date: '22-01-2020',
          },
          {
            title: 'Upcoming Investments (estimate)',
            amount: '-45 000.00 USD',
            quarter: 'Q2',
          },
          {
            title: 'Upcoming Investments (estimate)',
            amount: '-45 000.00 USD',
            quarter: 'Q4',
          },
          {
            title: 'Upcoming Investments (estimate)',
            amount: '-45 000.00 USD',
            quarter: 'Q3',
          },
          {
            title: 'Upcoming Investments (estimate)',
            amount: '-45 000.00 USD',
          },
        ],
      }
    },
    mounted() {
      this.updateData();
      // console.log(DateTime);
      // httpClient
        // .get('/api/projected_balance_ex.php')
        // .then((response) => {
          // console.log(response);
          // response.Инвестор.Периоды.forEach((report) => {
          //   // console.log(report);
          //   report.Таблица.Строка.forEach((dataset) => {
          //     console.log(dataset);
          //   });
          // });
        // });
    },
    methods: {
      onStartDateSelect() {

      },
      onEndDateSelect() {

      },
      closeFromQSelect() {
        this.openFromQSelect = false;
      },
      sortFromQChange(option) {
        this.currentFromQ = option;
        this.openFromQSelect = false;
        // this.updateData();
      },
      closeToQSelect() {
        this.openToQSelect = false;
      },
      sortToQChange(option) {
        this.currentToQ = option;
        this.openToQSelect = false;
        // this.updateData();
      },
      updateData() {
        this.$store.dispatch('loader/show');

        this.currentReports = [];
        const mapFromQuarters = new Map();
        // const mapToQuaters = new Map();
        this.reports.forEach((report) => {
          // this.currentReports.push({
          //   period: report.period,
          //   dataset: [],
          // });
          // console.log(report.quarter, index);
          // report.forEach((dataset) => {
          //   if (dataset.type.toLowerCase() === this.currentFilterType.id) {
          //     this.currentReports[index].dataset.push(dataset);
          //   }
          //   // console.log(index);
          if (report.quarter) {
            if (!mapFromQuarters.has(report.quarter)) {
              mapFromQuarters.set(report.quarter, true);
              this.fromQuarters.push(report.quarter);
              this.toQuarters.push(report.quarter);
            }
          }
          this.currentReports.push(report);
        });


        // Filter by chosen date range
        // if (this.startDate && this.endDate) {
        //   const startDateFormatted = DateTime.fromJSDate(this.startDate).startOf('day');
        //   const endDateFormatted = DateTime.fromJSDate(this.endDate).startOf('day');
        //   this.currentReports = this.currentReports.reduce((reports, report) => {
        //     const tt = report.dataset.filter((dataset) => {
        //       const datasetDate = DateTime.fromFormat(dataset.date, 'd.MM.yyyy');
        //       return (datasetDate >= startDateFormatted && datasetDate <= endDateFormatted);
        //     });
        //     if (tt.length) {
        //       reports.push({
        //         period: report.period,
        //         dataset: tt,
        //       });
        //     }
        //     return reports;
        //   }, []);
        // }

        // Sorting by dates
        // this.currentReports.sort((a, b) => {
        //   const keyA = DateTime.fromFormat(a.period.toLowerCase(), 'LLLL, yyyy', { locale: this.$i18n.locale });
        //   const keyB = DateTime.fromFormat(b.period.toLowerCase(), 'LLLL, yyyy', { locale: this.$i18n.locale });
        //
        //   // Compare the 2 dates
        //   if (this.currentSortType.id === 'to-high') {
        //     if (keyA > keyB) return -1;
        //     if (keyA < keyB) return 1;
        //   } else {
        //     if (keyA < keyB) return -1;
        //     if (keyA > keyB) return 1;
        //   }
        //   return 0;
        // });

        setTimeout(() => {
          // this.truncate();
          this.$store.dispatch('loader/hide');
        }, 400);
      },
    },
    directives: {
      ClickOutside
    },
  }
</script>

<style lang="scss" scoped>
  .forecast {
    &__head {
      display: flex;
      padding: 30px;
      margin-bottom: 40px;
      background-color: #ffffff;
    }

    &__period {
      margin-right: 40px;
    }
  }
</style>
