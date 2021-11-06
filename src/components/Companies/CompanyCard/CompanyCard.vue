<template>
  <div class="company-card" :class="company.status.toLowerCase() === 'exit' && 'is-inactive'">
    <div class="company-card__category" @click="onClick(company.industry)">{{company.industry}}</div>

    <a :href="protocolFix(company.website)" class="company-card__inner" target="_blank">
      <div class="company-card__image" :style="{ backgroundImage: 'url(' + company.logo + ')' }"></div>

      <div v-if="company.company_valuation" class="company-card__row">
        ${{ shortenLargeNumber( parseInt(company.company_valuation, 10) ) }} USD
        <span>{{$t('company-card.valuation')}}</span>
      </div>

      <div v-if="company.total_invested" class="company-card__row">
        ${{
          company.status.toLowerCase() === 'exit'
          ? shortenLargeNumber( parseInt(company.proceeds, 10) )
          : shortenLargeNumber( parseInt(company.total_invested, 10) )
        }} USD
        <span>{{ company.status.toLowerCase() === 'exit' ? $t('company-card.exit') : $t('company-card.investments') }}</span>
      </div>

      <div v-if="company.status.toLowerCase() === 'exit' && company.total_invested" class="company-card__row">
        ${{ shortenLargeNumber( parseInt(company.total_invested, 10) ) }} USD
        <span>{{ $t('company-card.investments') }}</span>
      </div>

      <div v-if="company.status.toLowerCase() !== 'exit' && company.fund_share" class="company-card__row">
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
      shortenLargeNumber(value) {
        const min = 1e3;
        // Alter numbers larger than 1k
        if (value >= min) {
          const units = ["K", "M", "B", "T"];

          const order = Math.floor(Math.log(value) / Math.log(1000));

          const unitName = units[(order - 1)];
          const num = parseFloat(parseFloat(value / 1000 ** order).toFixed(2));
          return num + unitName
        }
        // return formatted original number
        return value.toLocaleString('ru');
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "CompanyCard";
</style>
