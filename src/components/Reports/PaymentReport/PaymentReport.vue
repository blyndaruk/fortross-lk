<template>
  <div class="payment-report">
    <div class="payment-report__head">

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

      <div class="field">
        <div class="field__label">{{ $t('payments') }}</div>
        <div class="field__checkboxes">
          <div class="field__checkbox">
            <label :for="'payments_income'">
              <input type="checkbox"
                     :name="'payments_income'"
                     :disabled="disabledIncome"
                     :id="'payments_income'"
                     v-model="paymentsIncome"
                     @change="onPaymentTypeChange"
              >
              <span class="field__check"></span>
              <span>{{ $t('incoming') }}</span>
            </label>
          </div>
          <div class="field__checkbox">
            <label :for="'payments_outcome'">
              <input type="checkbox"
                     :name="'payments_outcome'"
                     :id="'payments_outcome'"
                     :disabled="disabledOutcome"
                     v-model="paymentsOutcome"
                     @change="onPaymentTypeChange"
              >
              <span class="field__check"></span>
              <span>{{ $t('outgoing') }}</span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <div class="report-no-data" v-if="!currentReports.length">{{ $t('no-data') }}</div>

    <div class="payment-report__data">
      <div class="report-table report-table--sm" v-for="(table, index) in currentReports" :key="table.period">
        <div class="report-table__head" v-if="table.dataset && table.dataset.length">
          <div class="report-table__title" v-if="table.dataset && table.dataset.length">
            {{table.periodMonth + ', ' + table.periodYear}}
          </div>
          <div class="report-table__head-actions">
            <div class="report-table__download" v-if="index === 0">
              <DownloadFile
                  :downloadable="true"
                  :date-from="dateFrom"
                  :date-to="dateTo"
                  download-link="/api/reports/pr.php"
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
                  <div class="sort-select__option" @click="sortChange('to-low', $t('sort-by-list.to-low'))">{{$t('sort-by-list.to-low')}}</div>
                  <div class="sort-select__option" @click="sortChange('to-high', $t('sort-by-list.to-high'))">{{$t('sort-by-list.to-high')}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="report-table__body" v-if="table.dataset && table.dataset.length">
          <div class="report-table__row js-row" v-for="(row, index) in table.dataset" :key="index">
            <div class="report-table__date">{{ row.date.split('.')[0].length === 1 ? '0' + row.date : row.date }}</div>

<!--            <div class="report-table__description">-->
<!--              <p class="report-table__trunc" ref="truncate">-->
<!--                {{ row.type }}-->
<!--              </p>-->
<!--              <div class="report-table__info-icon" v-if="row.tooltip"-->
<!--                   v-tooltip.top-start="{ content: row.tooltip, classes: 'report-tooltip' } ">-->
<!--                <svg width="2" height="8" viewBox="0 0 2 8" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--                  <path fill-rule="evenodd" clip-rule="evenodd"-->
<!--                        d="M1.00098 2C1.55326 2 2.00098 1.55228 2.00098 1C2.00098 0.447715 1.55326 0 1.00098 0C0.448692 0 0.000976562 0.447715 0.000976562 1C0.000976562 1.55228 0.448692 2 1.00098 2ZM2.00098 4C2.00098 3.44772 1.55326 3 1.00098 3C0.448692 3 0.000976562 3.44772 0.000976562 4V7C0.000976562 7.55228 0.448692 8 1.00098 8C1.55326 8 2.00098 7.55228 2.00098 7L2.00098 4Z"-->
<!--                        fill="white" />-->
<!--                </svg>-->
<!--              </div>-->
<!--              <div class="report-table__trunc-more" @click="toggleMore">-->
<!--                <svg width="20" height="4" viewBox="0 0 20 4" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--                  <path fill-rule="evenodd" clip-rule="evenodd"-->
<!--                        d="M4 2C4 3.10457 3.10457 4 2 4C0.895431 4 0 3.10457 0 2C0 0.895431 0.895431 0 2 0C3.10457 0 4 0.895431 4 2ZM12 2C12 3.10457 11.1046 4 10 4C8.89543 4 8 3.10457 8 2C8 0.895431 8.89543 0 10 0C11.1046 0 12 0.895431 12 2ZM18 4C19.1046 4 20 3.10457 20 2C20 0.895431 19.1046 0 18 0C16.8954 0 16 0.895431 16 2C16 3.10457 16.8954 4 18 4Z"-->
<!--                        fill="currentColor" />-->
<!--                </svg>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="report-table__amount">{{sign(row.type)}}{{row.summ}}</div>-->
            <div class="report-table__amount">
              {{sign(row.type)}}{{
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
  import DownloadFile from '@/components/DownloadFile/DownloadFile';
  import httpClient from '@/utils/httpClient';
  import ClickOutside from 'vue-click-outside';
  import Datepicker from '@sum.cumo/vue-datepicker';
  import { DateTime } from "luxon";
  import { en, ru } from '@sum.cumo/vue-datepicker/dist/locale';


  export default {
    name: 'PaymentReport',
    components: {
      DownloadFile,
      Datepicker,
    },
    data() {
      return {
        en,
        ru,
        openSortSelect: false,
        paymentsIncome: true,
        paymentsOutcome: true,
        disabledIncome: false,
        disabledOutcome: false,
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
        currentReports: [],
        reportsNew: [],
        reports: [],
      }
    },
    watch: {
      '$i18n.locale': function () {
        if (Object.keys(this.reports).length) this.updateData();
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

        this.reports.periods.forEach((report) => {
          const formatted = DateTime.fromFormat(report.period, 'LL-yyyy', { locale: this.$i18n.locale });
          const month = formatted.monthLong;
          const year = formatted.year;

          const dataset = report.strings.filter((dataset) => {
            let date = DateTime.fromFormat(dataset.date, 'dd-MM-yyyy');
            if (!date.c) date = DateTime.fromFormat(dataset.date, 'd.M.yyyy');

            let month = date.c.month;
            month = month.toString().length < 2 ? '0' + month : month;

            dataset.date = `${date.c.day}.${month}.${date.c.year}`;

            return (dataset.type.includes('Ingoing') && this.paymentsIncome) || (dataset.type.includes('Outgoing') && this.paymentsOutcome);
          });

          if (dataset.length) {
            this.currentReports.push({
              period: report.period,
              periodMonth: month,
              periodYear: year,
              periodFormatted: month + ', ' + year,
              dataset,
            });
          }
        });


        const defaultReports = this.currentReports;

        // Filter by chosen date range
        if (this.startDate && this.endDate) {
          const startDateFormatted = DateTime.fromJSDate(this.startDate).startOf('day');
          const endDateFormatted = DateTime.fromJSDate(this.endDate).startOf('day');
          this.currentReports = this.currentReports.reduce((reports, report) => {
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
                periodFormatted: month + ', ' + year,
              });
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
        const toDate = new Date( Math.min.apply(null, defaultReports.map((o) => new Date(DateTime.fromFormat(o.period, 'LL-yyyy', { locale: this.$i18n.locale }).startOf('month').toISO()) )) );
        const endDate = new Date( Math.max.apply(null, defaultReports.map((o) => new Date(DateTime.fromFormat(o.period, 'LL-yyyy', { locale: this.$i18n.locale }).endOf('month').toISO()) )) );
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

        setTimeout(() => {
          this.truncate();
          this.$store.dispatch('loader/hide');
        }, 400);
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
      onPaymentTypeChange() {
        if (!this.paymentsIncome) {
         this.disabledOutcome = true;
        } else if (!this.paymentsOutcome) {
         this.disabledIncome = true;
        } else {
         this.disabledOutcome = false;
         this.disabledIncome = false;
        }
        this.updateData();
      },
      toggleMore(e) {
        e.currentTarget.closest('.js-row').classList.toggle('is-open');
      },
      truncate() {
        if (this.$refs.truncate) {
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
        return value.includes('Ingoing') ? '+' : '-';
      }
    },
    mounted() {
      const investor = document.querySelector('.investor').value;

      httpClient
        .get('/api/cash_flow_base.php', {
          params: {
            investor,
          },
        })
        .then((response) => {
          if (!response) return;
          this.reports = response;
          this.updateData();
        });
      setTimeout(() => {
        this.truncate();
      }, 1000)
    },
    computed: {},
    directives: {
      ClickOutside
    },
  }
</script>

<style lang="scss" scoped>
  .payment-report {
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
  }
</style>
