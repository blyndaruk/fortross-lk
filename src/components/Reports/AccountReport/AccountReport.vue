<template>
  <div class="account-report">
    <div class="account-report__head">

      <div class="field field--date">
        <div class="field__label">Период</div>
        <div class="field__inner">
          <div class="field__date">
            <div class="field__placeholder-left">{{ $t('datepicker.from') }}</div>
            <datepicker :disabled-dates="disabledStartDates"
                        format="d.MM.yyyy"
                        @selected="onStartDateSelect"
                        :language="$i18n.locale === 'ru' ? ru : en"
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
                :disabled-dates="disabledEndDates"
                format="d.MM.yyyy"
                @selected="onEndDateSelect"
                :language="$i18n.locale === 'ru' ? ru : en"
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
        <div class="field__label">Тип</div>
        <div class="field__inner">

          <div class="sort-select" v-click-outside="closeTypeSelect">
            <div class="sort-select__wrap" @blur="openTypeSelect = false">
              <div class="sort-select__active" :class="{ 'is-open': openTypeSelect }"
                   @click="openTypeSelect = !openTypeSelect"
              >
                {{ currentFilterType.title }}
              </div>
              <div class="sort-select__options" :class="{ 'is-open': openTypeSelect }">
                <div
                    class="sort-select__option"
                    v-for="(option, i) in types"
                    :key="i"
                    @click="filterTypeChange(option)"
                >
                  {{ option.title }}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div class="account-report__data">
      <div class="report-table" v-for="(table, index) in currentReports" :key="table.period">
        <div class="report-table__head">
          <div class="report-table__title" v-if="table.dataset.length">
            {{table.period}}
          </div>
          <div class="report-table__head-actions">
            <div class="report-table__download" v-if="index === 0">
              <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M16.0015 15C16.0015 15.5523 15.5537 16 15.0015 16L1.00146 16C0.44918 16 0.00146485 15.5523 0.00146486 15C0.00146486 14.4477 0.44918 14 1.00146 14L6.51452 14L1.82836 9.74006C1.41969 9.36856 1.38956 8.73611 1.76105 8.32744C2.13255 7.91878 2.765 7.88865 3.17367 8.26014L7.00102 11.7394L7.00102 -2.01468e-06L9.00102 -1.99083e-06L9.00102 11.7397L12.8283 8.26018C13.237 7.88866 13.8694 7.91876 14.2409 8.32741C14.6125 8.73606 14.5824 9.36851 14.1737 9.74002L9.48796 14L15.0015 14C15.5537 14 16.0015 14.4477 16.0015 15Z"
                      fill="#24DBAF" />
              </svg>
              <span>XLS</span>
            </div>
            <div class="sort-select" v-if="index === 0" v-click-outside="closeSelect">
              <div class="sort-select__label">Сортировка по:</div>
              <div class="sort-select__wrap" @blur="openSortSelect = false">
                <div class="sort-select__active" :class="{ 'is-open': openSortSelect }"
                     @click="openSortSelect = !openSortSelect"
                >
                  {{ currentSortType.title }}
                </div>
                <div class="sort-select__options" :class="{ 'is-open': openSortSelect }">
                  <div
                      class="sort-select__option"
                      v-for="(option, i) in sortTypes"
                      :key="i"
                      @click="sortChange(option)"
                  >
                    {{ option.title }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="report-table__body">
          <div class="report-table__row js-row" v-for="(row, index) in table.dataset" :key="index">
            <div class="report-table__date">{{row.date}}</div>
            <div class="report-table__type">
              <p class="report-table__trunc" ref="truncate">
                {{row.type}}
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
            <div class="report-table__description">
              <p class="report-table__trunc" ref="truncate">
                {{ row.description }}
              </p>
              <div class="report-table__trunc-more" @click="toggleMore">
                <svg width="20" height="4" viewBox="0 0 20 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M4 2C4 3.10457 3.10457 4 2 4C0.895431 4 0 3.10457 0 2C0 0.895431 0.895431 0 2 0C3.10457 0 4 0.895431 4 2ZM12 2C12 3.10457 11.1046 4 10 4C8.89543 4 8 3.10457 8 2C8 0.895431 8.89543 0 10 0C11.1046 0 12 0.895431 12 2ZM18 4C19.1046 4 20 3.10457 20 2C20 0.895431 19.1046 0 18 0C16.8954 0 16 0.895431 16 2C16 3.10457 16.8954 4 18 4Z"
                        fill="currentColor" />
                </svg>
              </div>
            </div>
            <div class="report-table__amount">{{row.amount}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ClickOutside from 'vue-click-outside';
  import Datepicker from 'vuejs-datepicker';
  import { en, ru } from 'vuejs-datepicker/dist/locale';


  export default {
    name: 'AccountReport',
    components: {
      Datepicker,
    },
    data() {
      return {
        en,
        ru,
        openSortSelect: false,
        sortTypes: [
          {
            title: 'Дате'
          },
          {
            title: 'Типу'
          },
        ],
        currentSortType: {
          title: 'Дате'
        },
        openTypeSelect: false,
        // filterTypes: [
        //   {
        //     title: 'Все'
        //   },
        //   {
        //     title: 'INV'
        //   },
        //   {
        //     title: 'MANFEE'
        //   },
        // ],
        disabledStartDates: {},
        disabledEndDates: {},
        // disabledDates: {
        //   // from: new Date(2021, 0, 26),
        //   from: new Date(2020, 11, 26),
        //   to: new Date(2020, 11, 10)
        // },
        startDate: '',
        endDate: '',
        currentFilterType: {
          id: 'all',
          title: 'Все'
        },
        types: [
          {
            id: 'all',
            title: 'Все',
          }
        ],
        currentReports: [],
        reports: [
          {
            period: 'Март, 2020',
            dataset: [
              {
                date: '27.03.2020',
                type: 'INV',
                description: 'MindBody Tech',
                amount: '-5 484.84 USD'
              },
              {
                date: '23.03.2020',
                type: 'INV',
                description: 'Boston Techno',
                amount: '-685.56 USD'
              },
              {
                date: '23.03.2020',
                type: 'MANFEE',
                tooltip: 'Daily Markets: Lofty Valuations and Upcoming Election Contribute to Rising Market Volatility',
                description: 'Man Fee Q1 \'020',
                amount: '-579.57 USD'
              },
              {
                date: '12.03.2020',
                type: 'JDSPIOHPWPI JDSPIOHPWPI',
                description: 'Boston Techno Astra Zeneca Sandvinotoric Boston Techno Astra Zeneca Sandvinotoric',
                amount: '-1 230.78 USD'
              },
              {
                date: '12.03.2020',
                type: 'OMX STOCkH OMX STOCkH',
                tooltip: 'Daily Markets: Lofty Valuations and Upcoming Election Contribute to Rising Market Volatility',
                description: '17-th Catch Up',
                amount: '+36.14 USD'
              },
              {
                date: '12.03.2020',
                type: 'CONT',
                description: '17-th Additional Hennes & Ma',
                amount: '+5 999 999.71 USD'
              },
              {
                date: '06.03.2020',
                type: 'CONT',
                description: 'MindBody Capital Call',
                amount: '-1 023 293.91 USD'
              },
            ]
          },
          {
            period: 'Февраль, 2020',
            dataset: [
              {
                date: '08.02.2020',
                type: 'CATCH',
                description: '15-th Catch Up',
                amount: '+17 848.07 USD'
              },
              {
                date: '08.02.2020',
                type: 'MANFEE',
                tooltip: 'Daily Markets: Lofty Valuations and Upcoming Election Contribute to Rising Market Volatility',
                description: 'Man Fee Q3 \'20',
                amount: '-788.52 USD'
              },
              {
                date: '08.02.2020',
                type: 'CONT',
                description: 'Boston Techno Astra Zeneca Sandvicsalomin',
                amount: '+468.13 USD'
              },
              {
                date: '06.02.2020',
                type: 'JDSPIOHPWPI HFT UTYDE KJ TYVV 256',
                description: '17-th Additional Hennes & Svenska Terranova Handelsbanken Swedish Match TeliaSonera',
                amount: '+40 027.45 USD'
              },
              {
                date: '01.02.2020',
                type: '',
                description: 'Additional amount paid',
                amount: '-3 202.12 USD'
              },
              {
                date: '01.02.2020',
                type: '',
                description: 'Initial Investment',
                amount: '+45 051.50 USD'
              },
            ]
          }
        ]
      }
    },
    methods: {
      updateData() {
        this.$store.dispatch('loader/show');


        if (this.currentFilterType.id === 'all') {
          this.currentReports = this.reports;
        } else {
          this.currentReports = [];
          // const map = new Map();
          this.reports.forEach((report, index) => {
            this.currentReports.push({
              period: report.period,
              dataset: [],
            });
            report.dataset.forEach((dataset) => {
              console.log(dataset.type);
              if (dataset.type.toLowerCase() === this.currentFilterType.id) {
                this.currentReports[index].dataset.push(dataset);
              }
              // console.log(index);
              // if (!map.has(dataset.type)) {
              //   map.set(dataset.type, true);
              //   this.types.push({
              //     id: dataset.type.toLowerCase(),
              //     title: dataset.type,
              //   });
              // }
            });
          });
        }


        setTimeout(() => {
          this.truncate();
          this.$store.dispatch('loader/hide');
        }, 400);
      },
      onStartDateSelect(time) {
        this.startDate = time;
        this.disabledEndDates = {
          to: time,
        }
      },
      onEndDateSelect(time) {
        this.endDate = time;
        this.disabledStartDates = {
          from: time,
        }
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
      },
      filterTypeChange(option) {
        this.currentFilterType = option;
        this.openTypeSelect = false;
        this.updateData();
      },
      toggleMore(e) {
        e.currentTarget.closest('.js-row').classList.toggle('is-open');
      },
      truncate() {
        this.$refs.truncate.forEach((el) => {
          if (el.offsetWidth < el.scrollWidth) {
            el.classList.add('is-overflow');
          } else {
            el.classList.remove('is-overflow');
          }
        });
      },
    },
    mounted() {
      // document.addEventListener('DOMContentLoaded', () => {
      //   this.truncate();
      // });
      // this.truncate();
      const map = new Map();
      this.reports.forEach((report) => {
        report.dataset.forEach((dataset) => {
          if (!map.has(dataset.type)) {
            map.set(dataset.type, true);
            this.types.push({
              id: dataset.type.toLowerCase(),
              title: dataset.type,
            });
          }
        });
      });

      this.updateData();


      setTimeout(() => {
        this.truncate();
      }, 1000)
    },
    computed: {
      // types() {
      //
      // }
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
  }
</style>
