<template>
  <div v-if="isSimple" class="dashboard dashboard--simple">
    <div class="dashboard__col" v-for="item in data.simpleSummary" :key="item.title">
      <div class="dashboard__col-inner">
        <div class="dashboard__title-value">{{ item.title }}</div>
        <div class="dashboard__note">{{ item.note }}</div>
      </div>
    </div>
  </div>

  <div v-else-if="isMedium" class="dashboard is-default">
    <div class="dashboard__main">
      <div class="dashboard__main-amount">{{ mainAmount }}</div>
      <div class="dashboard__main-note">{{ $t('dashboard.state') }}</div>
    </div>
    <div class="dashboard__info">
      <div class="dashboard__info-left">
        <div class="dashboard__row">{{sum.toLocaleString()}} USD</div>
        <div class="dashboard__row">COMMITED <br> CAPITAL</div>
      </div>
      <div class="dashboard__info-graph dashboard-graph">
        <mq-layout mq="md+">
          <svg width="100%" height="100%" viewbox="0 0 100 100">
            <defs>
              <radialGradient id="graphGradient">
                <stop offset="10%" stop-color="rgba(11, 32, 78, 0)"/>
                <stop offset="43%" stop-color="#0B204E" stop-opacity="0.2"/>
                <stop offset="100%" stop-color="#24DBAF"/>
              </radialGradient>
            </defs>
  <!--          radial-gradient(43.5% 43.5% at 50% 50%, #0B204E 0%, rgba(11, 32, 78, 0) 100%), #24DBAF-->
  <!--          <circle cx="50" cy="50" r="40" fill="tomato"/>-->
  <!--          <circle cx="50" cy="50" r="40" fill="transparent" stroke-width="20" stroke="grey"/>-->
  <!--          stroke-dashoffset = perimeter - perimeter * amount / 100-->
            <circle cx="50" cy="50" r="35" fill="transparent" stroke-width="30" stroke="url(#graphGradient)" stroke-dasharray="219.8" :stroke-dashoffset="activePercentage-20"/>
            <circle cx="50" cy="50" r="35" fill="transparent" stroke-width="30" stroke="#24DBAF" stroke-dasharray="219.8" :stroke-dashoffset="activePercentage"/>
          </svg>
        </mq-layout>
        <mq-layout :mq="['tablet', 'mobile']">
          <svg width="100%" height="100%" viewbox="0 0 220 220">
            <defs>
              <radialGradient id="graphGradient">
                <stop offset="10%" stop-color="rgba(11, 32, 78, 0)"/>
                <stop offset="43%" stop-color="#0B204E" stop-opacity="0.2"/>
                <stop offset="100%" stop-color="#24DBAF"/>
              </radialGradient>
            </defs>
  <!--          radial-gradient(43.5% 43.5% at 50% 50%, #0B204E 0%, rgba(11, 32, 78, 0) 100%), #24DBAF-->
  <!--          <circle cx="50" cy="50" r="40" fill="tomato"/>-->
  <!--          <circle cx="50" cy="50" r="40" fill="transparent" stroke-width="20" stroke="grey"/>-->
  <!--          stroke-dashoffset = perimeter - perimeter * amount / 100-->
<!--            perimeter = 2 * 3.14 * radius -->
            <circle cx="110" cy="110" r="77" fill="transparent" stroke-width="66" stroke="url(#graphGradient)" stroke-dasharray="219.8" :stroke-dashoffset="activePercentage-20"/>
            <circle cx="110" cy="110" r="77" fill="transparent" stroke-width="66" stroke="#24DBAF" stroke-dasharray="219.8" :stroke-dashoffset="activePercentage"/>
          </svg>
        </mq-layout>
<!--        <div class="dashboard-graph__inactive"></div>-->
<!--        <div class="dashboard-graph__active"><div></div></div>-->
<!--        <div class="dashboard-graph__subactive"></div>-->
      </div>
      <div class="dashboard__info-right">
        <div class="dashboard__row">
          <div class="dashboard__unfunded">
            <span></span>
            <span>{{unfunded.toLocaleString()}} USD</span>
            <span>{{ $t('dashboard.unfunded') }}</span>
          </div>
        </div>
        <div class="dashboard__row">
          <div class="dashboard__amounts">
            <div class="dashboard__amount">
              <span>{{capital.toLocaleString()}} USD</span>
              <span>{{ $t('dashboard.contributed-capital') }}</span>
            </div>
            <div class="dashboard__amount">
              <span>{{accountContribution.toLocaleString()}} USD</span>
              <span>{{ $t('dashboard.contributed-account') }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else-if="isFull" class="dashboard">
    <div class="dashboard__main">
      <div class="dashboard__main-amount">{{ mainAmount }}</div>
      <div class="dashboard__main-note">Current state of the account</div>
    </div>
    <div class="dashboard__info">info</div>
  </div>
</template>

<script>
  export default {
    name: 'Dashboard',
    data() {
      return {
        mainAmount: '360 499 USD',
        fullStroke: 219.8,
        activePercentage: 219.8,
        sum: 50000,
        unfunded: 13679,
        capital: 36321,
        accountContribution: 1002,
        data: {
          simpleSummary: [
            {
              title: '025',
              note: 'of portfolio companies',
            },
            {
              title: '003',
              note: 'of exits',
            },
            {
              title: '320M USD',
              note: 'total invested capital',
            },
            {
              title: '120M USD',
              note: 'investments fair value',
            },
          ]
        }
      }
    },
    props: {
      viewType: {
        type: String,
        default: 'medium'
      },
    },
    mounted() {
      const capitalPercentage = this.capital * 100 / this.sum;
      // console.log(capitalPercentage);
      setTimeout(() => {
        this.activePercentage = this.fullStroke - this.fullStroke * capitalPercentage / 100;
        // this.activePercentage = '98.9';
      }, 500)
    },
    computed: {
      isSimple() {
        return this.viewType === 'simple';
      },
      isMedium() {
        return this.viewType === 'medium';
      },
      isFull() {
        return this.viewType === 'full';
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "Dashboard";
</style>
