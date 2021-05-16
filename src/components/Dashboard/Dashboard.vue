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
            <!--          stroke-dashoffset = perimeter - perimeter * amount / 100-->
            <circle cx="50" cy="50" r="35" fill="transparent" stroke-width="30" stroke="url(#graphgradient)"
                    stroke-dasharray="219.8" :stroke-dashoffset="activeAccountContributionPercentage || 219.8" />
            <circle cx="50" cy="50" r="35" fill="transparent" stroke-width="30" stroke="#24DBAF"
                    stroke-dasharray="219.8" :stroke-dashoffset="activePercentage || 219.8" />
          </svg>
        </mq-layout>
        <mq-layout :mq="['tablet', 'mobile']">
          <svg width="100%" height="100%" viewbox="0 0 220 220">
            <!--            perimeter = 2 * 3.14 * radius 483.56-->
            <circle cx="110" cy="110" r="77" fill="transparent" stroke-width="66" stroke="url(#graphgradient)"
                    stroke-dasharray="483.56" :stroke-dashoffset="activeAccountContributionPercentage || 483.56" />
            <circle cx="110" cy="110" r="77" fill="transparent" stroke-width="66" stroke="#24DBAF"
                    stroke-dasharray="483.56" :stroke-dashoffset="activePercentage || 483.56" />
          </svg>
        </mq-layout>
      </div>
      <div class="dashboard__info-right">

        <div class="dashboard__info-amounts">
          <div class="dashboard__row">
            <div class="dashboard__unfunded">
              <span></span>
              <span>{{unfunded.toLocaleString('ru')}} USD</span>
              <span class="is-mobile">{{ $t('dashboard.unfunded') }}</span>
            </div>
          </div>
          <div class="dashboard__row">
            <div class="dashboard__amounts">
              <div class="dashboard__amount">
                <span>{{capital.toLocaleString('ru')}} USD</span>
                <span class="is-mobile">{{ $t('dashboard.contributed-capital') }}</span>
              </div>
              <div class="dashboard__amount">
                <div>{{accountContribution.toLocaleString('ru')}} USD</div>
                <span class="is-mobile">{{ $t('dashboard.contributed-account') }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="dashboard__naming-wrap is-mobile">
          <div class="dashboard__row">
            <div class="dashboard__naming">
              <span>{{ $t('dashboard.unfunded') }}</span>
            </div>
          </div>
          <div class="dashboard__row">
            <div class="dashboard__naming">
              <div>{{ $t('dashboard.contributed-capital') }}</div>
              <div>{{ $t('dashboard.contributed-account') }}</div>
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
        fullStroke: this.$mq === 'tablet' || this.$mq === 'mobile' ? 483.56 : 219.8,
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
      this.activePercentage = this.$mq === 'tablet' || this.$mq === 'mobile' ? 483.56 : 219.8;
      this.activeAccountContributionPercentage = this.$mq === 'tablet' || this.$mq === 'mobile' ? 483.56 : 219.8;
      this.fullStroke = this.$mq === 'tablet' || this.$mq === 'mobile' ? 483.56 : 219.8;

      httpClient
        .get('/api/portfolio_dashboard.php')
        .then((responseData) => {
          if (!responseData) return;
          const investor = document.querySelector('.investor').value;
          httpClient
            .get('/api/my_account_base.php', {
              params: {
                investor,
              },
            })
            .then((response) => {
              this.companiesAmount        = responseData.portfolio_companies;
              this.exits                  = responseData.of_exits;
              this.totalInvested          = responseData.total_invested;
              this.totalInvestedFormatted = responseData.total_invested_formated.toUpperCase();
              this.fairValue              = responseData.investment_fair_value;
              this.fairValueFormatted     = responseData.investment_fair_value_formated.toUpperCase();

              if (!response) return;

              const allData               = response.all;
              this.mainAmount             = parseInt(allData['Current_state_of_account'].summ).toLocaleString('ru');
              this.sum                    = parseInt(allData['~Commitment'].summ);
              this.capital                = parseInt(allData['~Contributed_capital'].summ);
              this.unfunded               = parseInt(allData['~Unfunded_commitment'].summ) ? parseInt(allData['~Unfunded_commitment'].summ) : this.sum - this.capital;
              this.accountContribution    = parseInt(allData['Current_state_of_account'].summ);

              setTimeout(() => {
                this.updateData();
              }, 1000);
            });
        });
    },
    watch: {
      '$mq'() {
        setTimeout(() => {
          this.updateData();
        }, 1000);
      },
    },
    methods: {
      updateData() {
        this.fullStroke = this.$mq === 'tablet' || this.$mq === 'mobile' ? 483.56 : 219.8;
        this.activePercentage = this.fullStroke - this.fullStroke / 100 * (this.capitalPercentage - this.contributionAccountPercent);
        this.activeAccountContributionPercentage = Math.abs(this.fullStroke - this.fullStroke / 100 * this.capitalPercentage);
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
      contributionAccountPercent() {
        const thisPercentage = this.accountContribution * 100 / this.capital;
        return ((this.capitalPercentage / 100) * (thisPercentage / 100)) * 100;
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "Dashboard";
</style>
