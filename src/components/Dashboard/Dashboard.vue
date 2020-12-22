<template>
  <div v-if="isSimple" class="dashboard is-simple">
    <div class="dashboard__col" v-if="companiesAmount">
      <div class="dashboard__col-inner">
        <div class="dashboard__title-value">{{ companiesAmount }}</div>
        <div class="dashboard__note">{{ $t('dashboard.portfolio_companies') }}</div>
      </div>
    </div>
    <div class="dashboard__col" v-if="exits">
      <div class="dashboard__col-inner">
        <div class="dashboard__title-value">{{ exits }}</div>
        <div class="dashboard__note">{{ $t('dashboard.exits') }}</div>
      </div>
    </div>
    <div class="dashboard__col" v-if="totalInvestedFormatted">
      <div class="dashboard__col-inner">
        <div class="dashboard__title-value">{{ totalInvestedFormatted }} USD</div>
        <div class="dashboard__note">{{ $t('dashboard.total-invested') }}</div>
      </div>
    </div>
    <div class="dashboard__col" v-if="fairValueFormatted">
      <div class="dashboard__col-inner">
        <div class="dashboard__title-value">{{ fairValueFormatted }} USD</div>
        <div class="dashboard__note">{{ $t('dashboard.fair-value') }}</div>
      </div>
    </div>
  </div>

  <div v-else-if="isMedium || isFull" class="dashboard is-default">
    <div class="dashboard__main">
      <div class="dashboard__main-amount">{{ mainAmount || 0 }} USD</div>
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
      <div class="dashboard__col" v-if="companiesAmount">
        <div class="dashboard__col-inner">
          <div class="dashboard__title-value">{{ companiesAmount }}</div>
          <div class="dashboard__note">{{ $t('dashboard.portfolio_companies') }}</div>
        </div>
      </div>
      <div class="dashboard__col" v-if="exits">
        <div class="dashboard__col-inner">
          <div class="dashboard__title-value">{{ exits }}</div>
          <div class="dashboard__note">{{ $t('dashboard.exits') }}</div>
        </div>
      </div>
      <div class="dashboard__col" v-if="totalInvestedFormatted">
        <div class="dashboard__col-inner">
          <div class="dashboard__title-value">{{ totalInvestedFormatted }} USD</div>
          <div class="dashboard__note">{{ $t('dashboard.total-invested') }}</div>
        </div>
      </div>
      <div class="dashboard__col" v-if="fairValueFormatted">
        <div class="dashboard__col-inner">
          <div class="dashboard__title-value">{{ fairValueFormatted }} USD</div>
          <div class="dashboard__note">{{ $t('dashboard.fair-value') }}</div>
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
  import httpClient from '@/utils/httpClient';

  export default {
    name: 'Dashboard',
    data() {
      return {
        mainAmount: '',
        activePercentage: this.$mq === 'tablet' || this.$mq === 'mobile' ? 483.56 : 219.8,
        activeAccountContributionPercentage: this.$mq === 'tablet' || this.$mq === 'mobile' ? 483.56 : 219.8,
        sum: 50000,
        unfunded: 13679,
        capital: 36321,
        accountContribution: 8701,
        companiesAmount: 0,
        exits: 0,
        totalInvested: 0,
        totalInvestedFormatted: '',
        fairValue: 0,
        fairValueFormatted: '',
      }
    },
    props: {
      viewType: {
        type: String,
        default: 'medium'
      },
    },
    mounted() {
      const investor = document.querySelector('.investor').value;

      httpClient
        .get('/api/portfolio_dashboard.php')
        .then((response) => {
          this.companiesAmount = response.portfolio_companies;
          this.exits = response.of_exits;
          this.totalInvested = response.total_invested;
          this.totalInvestedFormatted = response.total_invested_formated.toUpperCase();
          this.fairValue = response.investment_fair_value;
          this.fairValueFormatted = response.investment_fair_value_formated.toUpperCase();
        });

      httpClient
        .get('/api/my_account_base.php', {
          params: {
            investor,
          },
        })
        .then((response) => {
          // console.log(response);
          if (!response) return;
          const allData = response.all;
          this.mainAmount = parseInt(allData['Current_state_of_account'].summ).toLocaleString();
          // this.sum = parseInt(allData['~Commitment'].summ);
        });

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
