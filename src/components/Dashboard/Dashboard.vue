<template>
  <div v-if="isSimple" class="dashboard is-simple">
    <div class="dashboard__col" v-for="item in data.simpleSummary" :key="item.title">
      <div class="dashboard__col-inner">
        <div class="dashboard__title-value">{{ item.title }}</div>
        <div class="dashboard__note">{{ item.note }}</div>
      </div>
    </div>
  </div>

  <div v-else-if="isMedium || isFull" class="dashboard is-default">
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
              <radialGradient id="graphGradient" cx="43%" cy="43%" r="100%" fx="43%" fy="100%">
                <stop offset="10%" stop-color="#0B204E" />
                <stop offset="85%" stop-color="#24DBAF" />
              </radialGradient>
            </defs>
            <!--          stroke-dashoffset = perimeter - perimeter * amount / 100-->
            <circle cx="50" cy="50" r="35" fill="transparent" stroke-width="30" stroke="url(#graphGradient)"
                    stroke-dasharray="219.8" :stroke-dashoffset="activeAccountContributionPercentage || 219.8" />
            <circle cx="50" cy="50" r="35" fill="transparent" stroke-width="30" stroke="#24DBAF"
                    stroke-dasharray="219.8" :stroke-dashoffset="activePercentage || 219.8" />
          </svg>
        </mq-layout>
        <mq-layout :mq="['tablet', 'mobile']">
          <svg width="100%" height="100%" viewbox="0 0 220 220">
            <defs>
              <radialGradient id="graphGradient" cx="43%" cy="43%" r="100%" fx="43%" fy="100%">
                <stop offset="10%" stop-color="#0B204E" />
                <stop offset="85%" stop-color="#24DBAF" />
              </radialGradient>
            </defs>
            <!--            perimeter = 2 * 3.14 * radius 483.56-->
            <circle cx="110" cy="110" r="77" fill="transparent" stroke-width="66" stroke="url(#graphGradient)"
                    stroke-dasharray="483.56" :stroke-dashoffset="activeAccountContributionPercentage" />
            <circle cx="110" cy="110" r="77" fill="transparent" stroke-width="66" stroke="#24DBAF"
                    stroke-dasharray="483.56" :stroke-dashoffset="activePercentage" />
          </svg>
        </mq-layout>
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

    <div class="dashboard__bottom" v-if="isFull">
      <div class="dashboard__col" v-for="item in data.simpleSummary" :key="item.title">
        <div class="dashboard__col-inner">
          <div class="dashboard__title-value">{{ item.title }}</div>
          <div class="dashboard__note">{{ item.note }}</div>
        </div>
      </div>
    </div>
  </div>

  <!--  <div v-else class="dashboard">-->
  <!--    <div class="dashboard__main">-->
  <!--      <div class="dashboard__main-amount">{{ mainAmount }}</div>-->
  <!--      <div class="dashboard__main-note">Current state of the account</div>-->
  <!--    </div>-->
  <!--    <div class="dashboard__info">info</div>-->
  <!--  </div>-->
</template>

<script>
  export default {
    name: 'Dashboard',
    data() {
      return {
        mainAmount: '360 499 USD',
        activePercentage: this.$mq === 'tablet' || this.$mq === 'mobile' ? 483.56 : 219.8,
        activeAccountContributionPercentage: this.$mq === 'tablet' || this.$mq === 'mobile' ? 483.56 : 219.8,
        sum: 50000,
        unfunded: 13679,
        capital: 36321,
        accountContribution: 8701,
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
    },
    asyncComputed: {
      activePercentage() {
        const fullStroke = this.$mq === 'tablet' || this.$mq === 'mobile' ? 483.56 : 219.8;
        return new Promise(resolve =>
          setTimeout(() => resolve(
            this.activePercentage = fullStroke - fullStroke * this.capitalPercentage / 100,
          ), 1000)
        );
      },
      activeAccountContributionPercentage() {
        const fullStroke = this.$mq === 'tablet' || this.$mq === 'mobile' ? 483.56 : 219.8;
        return new Promise(resolve =>
          setTimeout(() => resolve(
            fullStroke - fullStroke * (this.accountContributionPercentage + this.capitalPercentage) / 100,
          ), 1000)
        );
      }
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
      capitalPercentage() {
        return this.capital * 100 / this.sum;
      },
      accountContributionPercentage() {
        return this.accountContribution * 100 / this.sum;
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "Dashboard";
</style>
