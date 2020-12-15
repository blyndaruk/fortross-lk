<template>
  <div class="recent-transactions">
    <div class="report-table">
      <div class="report-table__head is-tablet-wrap">
        <div class="report-table__title">Недавние транзакции</div>
        <div class="report-table__head-actions">
          <div class="report-table__show">Все транзакции</div>
          <!--          <div class="sort-select" v-if="index === 0" v-click-outside="closeSelect">-->
          <!--            <div class="sort-select__label">Сортировка по:</div>-->
          <!--            <div class="sort-select__wrap" @blur="openSortSelect = false">-->
          <!--              <div class="sort-select__active" :class="{ 'is-open': openSortSelect }"-->
          <!--                   @click="openSortSelect = !openSortSelect"-->
          <!--              >-->
          <!--                Дате-->
          <!--              </div>-->
          <!--              <div class="sort-select__options" :class="{ 'is-open': openSortSelect }">-->
          <!--                <div-->
          <!--                    class="sort-select__option"-->
          <!--                    v-for="(option, i) in sortTypes"-->
          <!--                    :key="i"-->
          <!--                    @click="sortChange(option)"-->
          <!--                >-->
          <!--                  {{ option.title }}-->
          <!--                </div>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--          </div>-->
        </div>
      </div>
      <div class="report-table__body">
        <div class="report-table__row js-row" v-for="(row, index) in reports" :key="index">
          <div class="report-table__date">{{row.date}}</div>
          <div class="report-table__type">
            <p class="report-table__trunc" ref="truncate">
              {{row.type}}
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
          <div class="report-table__amount">{{row.amount}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'RecentTransactions',
    data() {
      return {
        reports: [
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
            typeTooltip: 'Daily Markets: Lofty Valuations and Upcoming Election Contribute to Rising Market Volatility',
            description: 'Man Fee Q1 \'020',
            amount: '-579.57 USD'
          },
          {
            date: '12.03.2020',
            type: 'JDSPIOHPWPI JDSPIOHPWPI',
            description: 'Boston Techno Astra Zeneca Sandvinotoric Boston Techno Astra Zeneca Sandvinotoric',
            typeTooltip: 'Daily Markets: Lofty Valuations and Upcoming Election Contribute to Rising Market Volatility',
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
        ],
      }
    },
    mounted() {
      setTimeout(() => {
        this.truncate();
      }, 1000)
    },
    methods: {
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
  }
</script>

<style scoped>

</style>
