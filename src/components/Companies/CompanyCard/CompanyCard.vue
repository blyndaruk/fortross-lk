<template>
  <div class="company-card" :class="company.inactive && 'is-inactive'">
    <div class="company-card__category" @click="onClick(company.industry)">{{company.industry}}</div>

    <a :href="protocolFix(company.website)" class="company-card__inner" target="_blank">
      <div class="company-card__image"></div>
      <div v-if="company.company_valuation" class="company-card__row">
        ${{ shortenLargeNumber( parseInt(company.company_valuation, 10) ) }} USD
        <span>{{$t('company-card.valuation')}}</span>
      </div>
      <div v-if="company.total_invested" class="company-card__row">
        ${{ shortenLargeNumber( parseInt(company.total_invested, 10) ) }} USD
        <span>{{$t('company-card.investments')}}</span>
      </div>
      <div v-if="company.fund_share" class="company-card__row">
        {{parseFloat(company.fund_share).toFixed(1)}}%
        <span>{{$t('company-card.share')}}</span>
      </div>
      <span class="company-card__icon"></span>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'CompanyCard',
    props: {
      company: {
        type: Object,
        required: true,
      }
    },
    methods: {
      onClick(id) {
        this.$emit('company-id', id);
      },
      protocolFix(url) {
        return url.indexOf('http') === -1 || url.indexOf('https') === -1 ? '//' + url : url;
      },
      shortenLargeNumber(num) {
        const units = ['K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
        let decimal;

        for (let i = units.length - 1; i >= 0; i--) {
          decimal = Math.pow(1000, i + 1);

          if (num <= -decimal || num >= decimal) {
            return +(num / decimal).toFixed(0) + units[i];
          }
        }

        return num;
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "CompanyCard";
</style>
