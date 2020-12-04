<template>
  <div class="account-report">
    <div class="account-report__head">
      <div class="account-report__period">
        <div class="account-report__subtitle">Период</div>
      </div>
      <div class="account-report__type">
        <div class="account-report__subtitle">Тип</div>
      </div>
    </div>

    <div class="account-report__data">
      <div class="report-table" v-for="table in reports" :key="table.period">
        <div class="report-table__title">{{table.period}}</div>
        <div class="report-table__body">
          <div class="report-table__row" v-for="(row, index) in table.dataset" :key="index">
            <div class="report-table__date">{{row.date}}</div>
            <div class="report-table__type">
              <p>{{row.type}}</p>
              <div class="report-table__info-icon" v-if="row.tooltip"
                   v-tooltip.top-start="{ content: row.tooltip, classes: 'report-tooltip' } ">
                <svg width="2" height="8" viewBox="0 0 2 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M1.00098 2C1.55326 2 2.00098 1.55228 2.00098 1C2.00098 0.447715 1.55326 0 1.00098 0C0.448692 0 0.000976562 0.447715 0.000976562 1C0.000976562 1.55228 0.448692 2 1.00098 2ZM2.00098 4C2.00098 3.44772 1.55326 3 1.00098 3C0.448692 3 0.000976562 3.44772 0.000976562 4V7C0.000976562 7.55228 0.448692 8 1.00098 8C1.55326 8 2.00098 7.55228 2.00098 7L2.00098 4Z"
                        fill="white" />
                </svg>
              </div>
            </div>
            <div class="report-table__description" v-html="row.description"></div>
            <div class="report-table__amount">{{row.amount}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AccountReport',
    data() {
      return {
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
                type: 'JDSPIOHPWPI...',
                description: 'Boston Techno Astra Zeneca Sandvinotoric...',
                amount: '-1 230.78 USD'
              },
              {
                date: '12.03.2020',
                type: 'OMX STOCkH...',
                description: '17-th Catch Up',
                amount: '+36.14 USD'
              },
              {
                date: '12.03.2020',
                type: 'CONT',
                description: '17-th Additional Hennes & Ma...',
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
                description: 'Boston Techno Astra Zeneca Sandvicsalomin...',
                amount: '+468.13 USD'
              },
              {
                date: '06.02.2020',
                type: 'JDSPIOHPWPI HFT UTYDE KJ TYVV 256',
                description: '17-th Additional Hennes & Svenska Terranova Handelsbanken Swedish Match <br> TeliaSonera',
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
  }
</script>

<style lang="scss" scoped>
  .account-report {
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
