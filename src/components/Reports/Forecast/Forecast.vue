<template>
  <div class="forecast">
    <div class="forecast__head">

      <div class="field field--date">
        <div class="field__label">{{ $t('period') }}</div>
        <div class="field__inner">

          <div class="field__col">
            <div class="field__date">
              <div class="field__placeholder-left">{{ $t('datepicker.from') }}</div>
              <datepicker
                  format="yyyy"
                  minimum-view="year"
                  :typeable="true"
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
                        v-for="(option, i) in quarters"
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
                        v-for="(option, i) in quarters"
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


    <div class="report-no-data" v-if="!currentReports.length">{{ $t('no-data') }}</div>

    <div class="forecast__data">
      <div class="report-table" v-for="(period, index) in currentReports" :key="period.period">
        <div class="report-table__head">
          <div class="report-table__title" v-if="currentReports && currentReports.length">
            <p>{{ $t('forecast-for') }} <span>{{period.period}}</span></p>
          </div>
          <div class="report-table__head-actions">
            <div class="report-table__download" v-if="index === 0">
              <DownloadFile
                  :downloadable="true"
                  :forecast="periodsQuery"
                  download-link="/api/reports/abf.php"
              />
            </div>
          </div>
        </div>

        <div class="report-table__body">
          <div class="report-table__row" v-for="(row, index) in period.strings" :key="index" :class="{ 'is-highlighted': row.mark }">

            <v-clamp class="report-table__text" autoresize :max-lines="1">
              {{row.description}}
              <template #after="{ toggle, expanded, clamped }">
                <button
                    v-if="expanded || clamped"
                    class="toggle-clamp"
                    @click="toggle"
                >
                  <svg width="20" height="4" viewBox="0 0 20 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M4 2C4 3.10457 3.10457 4 2 4C0.895431 4 0 3.10457 0 2C0 0.895431 0.895431 0 2 0C3.10457 0 4 0.895431 4 2ZM12 2C12 3.10457 11.1046 4 10 4C8.89543 4 8 3.10457 8 2C8 0.895431 8.89543 0 10 0C11.1046 0 12 0.895431 12 2ZM18 4C19.1046 4 20 3.10457 20 2C20 0.895431 19.1046 0 18 0C16.8954 0 16 0.895431 16 2C16 3.10457 16.8954 4 18 4Z"
                          fill="currentColor" />
                  </svg>
                </button>

                <div class="report-table__info-icon" v-if="row.tooltip"
                     v-tooltip.top-start="{ content: row.tooltip, classes: 'report-tooltip' } ">
                  <svg width="2" height="8" viewBox="0 0 2 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M1.00098 2C1.55326 2 2.00098 1.55228 2.00098 1C2.00098 0.447715 1.55326 0 1.00098 0C0.448692 0 0.000976562 0.447715 0.000976562 1C0.000976562 1.55228 0.448692 2 1.00098 2ZM2.00098 4C2.00098 3.44772 1.55326 3 1.00098 3C0.448692 3 0.000976562 3.44772 0.000976562 4V7C0.000976562 7.55228 0.448692 8 1.00098 8C1.55326 8 2.00098 7.55228 2.00098 7L2.00098 4Z"
                          fill="white" />
                  </svg>
                </div>
              </template>
            </v-clamp>


            <div class="report-table__amount">
              {{
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
  import VClamp from 'vue-clamp';
  import Datepicker from '@sum.cumo/vue-datepicker';
  import { DateTime } from 'luxon';
  import { en, ru } from '@sum.cumo/vue-datepicker/dist/locale';

  export default {
    name: 'Forecast',
    components: {
      DownloadFile,
      Datepicker,
      VClamp,
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
        dateFrom: '',
        dateTo: '',
        periodsQuery: '',
        periods: [],
        startDate: '',
        endDate: '',
        currentQuarter: '',
        currentYear: '',
        startDateFormatted: '',
        endDateFormatted: '',
        disabledStartDates: {},
        disabledEndDates: {},
        openFromQSelect: false,
        currentFromQ: '',
        fromQuarters: [],
        openToQSelect: false,
        currentToQ: '',
        toQuarters: [],
        currentReports: [],
        dataset: [],
      }
    },
    mounted() {
      const investor = document.querySelector('.investor').value;
      const currentDate = DateTime.fromJSDate(new Date());
      this.currentYear = currentDate.year;
      this.currentQuarter = this.quarters[currentDate.quarter - 1];

      httpClient
        .get('/api/projected_balance_base.php', {
          params: {
            investor,
          },
        })
        .then((response) => {
          Object.values(response).map((periods) => {
            this.currentReports = periods;
            this.dataset = periods;
          });
          this.updateData();
        });
    },
    methods: {
      onBlur() {
        if (!this.startDate || !this.endDate) this.updateData();
      },
      onStartDateSelect(time) {
        this.startDate = time;
        this.disabledEndDates = {
          to: time,
        };
        if (this.startDate && this.endDate && this.currentToQ && this.currentFromQ) this.updateData();
      },
      onEndDateSelect(time) {
        this.endDate = time;
        this.disabledStartDates = {
          from: time,
        };
        if (this.startDate && this.endDate && this.currentToQ && this.currentFromQ) this.updateData();
      },
      closeFromQSelect() {
        this.openFromQSelect = false;
      },
      sortFromQChange(option) {
        this.currentFromQ = option;
        this.openFromQSelect = false;
        if (this.startDate && this.endDate && this.currentToQ && this.currentFromQ) this.updateData();
      },
      closeToQSelect() {
        this.openToQSelect = false;
      },
      sortToQChange(option) {
        this.currentToQ = option;
        this.openToQSelect = false;
        if (this.startDate && this.endDate && this.currentToQ && this.currentFromQ) this.updateData();
      },
      updateData() {
        if (!this.dataset || !this.dataset.length) return;

        this.$store.dispatch('loader/show');

        // disable dates with no data on load
        const toDate = new Date(Math.min.apply(Math, this.currentReports.map((o) => parseInt(o.period_year))).toString());
        const endDate = new Date(Math.max.apply(Math, this.currentReports.map((o) => parseInt(o.period_year))).toString());
        this.disabledStartDates = {
          // to: toDate,
          from: endDate,
        };
        this.disabledEndDates = {
          to: toDate,
          // from: endDate,
        };




        if (this.startDate && this.endDate && this.currentToQ && this.currentFromQ) {
          this.startDateFormatted = DateTime.fromJSDate(this.startDate).startOf('year').plus({ quarter: parseInt(this.currentFromQ.match(/\d+/)[0] - 1) });
          this.endDateFormatted = DateTime.fromJSDate(this.endDate).startOf('year').plus({ quarter: parseInt(this.currentToQ.match(/\d+/)[0] - 1) });

          this.currentReports = this.dataset.reduce((reports, report) => {
            if (report.strings) {
              const tt = report.strings.filter((dataset) => {
                const datasetDate = DateTime.fromFormat(dataset.year, 'yyyy').plus({ quarter: parseInt(dataset.quarter.match(/\d+/)[0] - 1) });
                return (datasetDate >= this.startDateFormatted && datasetDate <= this.endDateFormatted);
              });
              if (tt.length) {
                reports.push(report);
              }
            }
            return reports;
          }, []);
        }

        this.periodsQuery = '';

        this.currentReports.map((period) => {
          this.periodsQuery = this.periodsQuery + period.period + ';';
        });
        this.periodsQuery = this.periodsQuery.slice(0, -1);

        setTimeout(() => {
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
      @include xs {
        padding: 20px;
      }
    }

    &__period {
      margin-right: 40px;
    }

    .field {
      &__date {
        margin-right: 10px;
        margin-bottom: 10px;

        &:nth-child(2) {
          margin-right: 30px;
          @include xs {
            margin-right: 0;
          }
        }

        &:last-child {
          margin-right: 0;
        }

        @include xs {
          width: 50%;
        }
      }

      &__inner {
        @include md {
          flex-wrap: wrap;
          height: auto;
        }
        @include xs {
          flex-wrap: wrap;
        }
      }
    }

    .report-table {
      &__text {
        @include sm {
          padding: 20px 20px 8px;
        }
      }

      &__row {
        @include md {
          flex-wrap: wrap;
          white-space: normal;
        }
      }

      &__amount {
        @include sm {
          text-align: left;
        }
      }
    }
  }
</style>
