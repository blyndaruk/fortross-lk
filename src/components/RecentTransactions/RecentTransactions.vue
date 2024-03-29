<template>
  <div class="recent-transactions">
    <div class="report-table">
      <div class="report-table__head is-tablet-wrap">
        <div class="report-table__title">{{ $t('transactions') }}</div>
        <div class="report-table__head-actions">
          <div class="report-table__show">
            <router-link to="/my-account">{{ $t('all-transactions') }}</router-link>
          </div>
        </div>
      </div>
      <div class="report-no-data" v-if="!reports.length">{{ $t('no-data') }}</div>
      <div class="report-table__body">
        <div class="report-table__row js-row" v-for="(row, index) in reports" :key="index">
          <div class="report-table__date">{{ row.date.split('.')[0].length === 1 ? '0' + row.date.replace(/-/g, '.') : row.date.replace(/-/g, '.') }}</div>
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
          <div class="report-table__amount">{{ formatSum(row.summ) }}{{ numberWithSpaces(row.summ) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'RecentTransactions',
    data() {
      return {}
    },
    props: {
      reports: {
        type: Array,
      }
    },
    watch: {
      'reports'() {
        setTimeout(() => {
          this.truncate();
        }, 1000)
      }
    },
    mounted() {
      setTimeout(() => {
        this.truncate();
      }, 1000);
      window.addEventListener('resize', this.truncate);
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.truncate);
    },
    methods: {
      toggleMore (e) {
        e.currentTarget.closest('.js-row').classList.toggle('is-open');
      },
      truncate () {
        if (this.$refs.truncate) {
          const buttons = Array.prototype.slice.call(document.querySelectorAll('.js-row'));
          if (buttons.length) buttons.forEach(btn => btn.classList.remove('is-open'));

          this.$refs.truncate.forEach((el) => {
            el.classList.remove('is-overflow');
            if (el.offsetWidth < el.scrollWidth) {
              el.classList.add('is-overflow');
            } else {
              el.classList.remove('is-overflow');
            }
          });
        }
      },
      sign (value) {
        return value.includes('-') ? '' : '+';
      },
      formatSum (value) {
        return this.sign(value)
      },
      numberWithSpaces(x) {
        const parts = x.toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        return parts.join('.');
      }
    },
  }
</script>

<style scoped>

</style>
