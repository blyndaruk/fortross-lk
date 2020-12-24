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
        <div class="dashboard__row">{{sum.toLocaleString('ru')}} USD</div>
        <div class="dashboard__row is-commited">{{ $t('dashboard.commited') }}</div>
      </div>
      <div class="dashboard__info-graph dashboard-graph">
        <mq-layout mq="md+">
          <svg width="100%" height="100%" viewbox="0 0 100 100">
            <defs>
              <radialGradient id="graphGradient" cx="43%" cy="43%" r="90%" fx="43%" fy="60%">
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
              <radialGradient id="graphGradient" cx="43%" cy="43%" r="90%" fx="43%" fy="60%">
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
            <span>{{unfunded.toLocaleString('ru')}} USD</span>
            <span>{{ $t('dashboard.unfunded') }}</span>
          </div>
        </div>
        <div class="dashboard__row">
          <div class="dashboard__amounts">
            <div class="dashboard__amount">
              <span>{{capital.toLocaleString('ru')}} USD</span>
              <span>{{ $t('dashboard.contributed-capital') }}</span>
            </div>
            <div class="dashboard__amount">
              <span>{{accountContribution.toLocaleString('ru')}} USD</span>
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
        sum: 0,
        unfunded: 0,
        capital: 0,
        accountContribution: 0,
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

      httpClient
        .get('/api/portfolio_dashboard.php')
        .then((response) => {
          this.companiesAmount = response.portfolio_companies;
          this.exits = response.of_exits;
          this.totalInvested = response.total_invested;
          this.totalInvestedFormatted = response.total_invested_formated.toUpperCase();
          this.fairValue = response.investment_fair_value;
          this.fairValueFormatted = response.investment_fair_value_formated.toUpperCase();
          const investor = document.querySelector('.investor').value;
          httpClient
            .get('/api/my_account_base.php', {
              params: {
                investor,
              },
            })
            .then((response) => {
              if (!response) return;
              const allData = response.all;
              this.mainAmount = parseInt(allData['Current_state_of_account'].summ).toLocaleString('ru');
              this.sum = parseInt(allData['~Commitment'].summ);
              this.capital = parseInt(allData['~Contributed_capital'].summ);
              this.unfunded = this.sum - this.capital;
              this.accountContribution = parseInt(allData['Current_state_of_account'].summ);
            });
        });


    },
    asyncComputed: {
      activePercentage() {
        const fullStroke = this.$mq === 'tablet' || this.$mq === 'mobile' ? 483.56 : 219.8;
        return new Promise(resolve =>
          setTimeout(() => resolve(
            this.activePercentage = fullStroke - fullStroke / 100 * (this.capitalPercentage - this.contributionAccountPercent)
            // this.activePercentage = fullStroke - fullStroke / 100 * this.capitalPercentage
            // this.activePercentage = fullStroke - fullStroke * this.capitalPercentage / 100
          ), 1750)
        );
      },
      activeAccountContributionPercentage() {
        const fullStroke = this.$mq === 'tablet' || this.$mq === 'mobile' ? 483.56 : 219.8;
        // console.log(fullStroke - fullStroke / 100 * this.capitalPercentage, this.capitalPercentage, 'eeee');
        return new Promise(resolve => {
            // const asf = 'asf';
            return setTimeout(() => resolve(
              this.activeAccountContributionPercentage = fullStroke - fullStroke / 100 * this.capitalPercentage
              // this.activeAccountContributionPercentage = this.activePercentage - this.accountContributionPercentage
            ), 1750)
          }
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
        // console.log(this.capital * 100 / this.sum, 'this.summ');
        return this.capital * 100 / this.sum;
        // return (this.capital - this.accountContribution) * 100 / this.sum;
        // return (20000 - 10000) * 100 / 20000;
      },
      contributionAccountPercent() {
        // console.log(this.activePercentage, this.accountContribution * 100 / this.capital, 'this.accountContribution * 100 / this.capital');

        const thisPercentage = this.accountContribution * 100 / this.capital;
        return ((this.capitalPercentage / 100) * (thisPercentage / 100)) * 100;
        // return this.accountContribution * 100 / this.capital;
      },
      accountContributionPercentage() {
        // same + percentage of capital
        // console.log(this.capital, this.accountContribution);
        // console.log(this.accountContribution * 100 / this.capital, this.capitalPercentage, 'grad');
        // return (20000 - 15000) * 100 / 20000;
        // console.log(fullStroke - fullStroke * this.accountContributionPercentage / 100);
        // console.log(this.activePercentage, this.accountContribution * 100 / this.capital, 'perc');
        // console.log();
        // this.$mq === 'tablet' || this.$mq === 'mobile' ? 483.56 : 219.8;



        // const fullStroke = this.$mq === 'tablet' || this.$mq === 'mobile' ? 483.56 : 219.8;

        // console.log(this.activePercentage / 100 * this.accountContribution * 100 / this.capital, 'offs');
        // console.log(100 / fullStroke * (this.activePercentage / 100 * this.accountContribution * 100 / this.capital), 'perc');
        //
        // console.log((this.accountContribution * 100 / this.capital) / this.capitalPercentage, 'test');
        //
        // console.log(fullStroke - fullStroke * this.accountContribution * 100 / this.capital / this.capitalPercentage);





        // console.log(this.capitalPercentage, 'this.capitalPercentage');
        return this.capitalPercentage * (this.accountContribution * 100 / this.capital) / this.capitalPercentage;
        // return this.activePercentage / 100 * this.accountContribution * 100 / this.capital;
        // return this.accountContribution * 100 / this.capital;
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "Dashboard";
</style>
