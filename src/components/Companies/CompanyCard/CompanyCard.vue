<template>
  <div class="company-card">
    <div class="company-card__category">{{company.category}}</div>
    <div class="company-card__image"></div>

    <div v-if="company.valuation" class="company-card__row">
      {{company.valuation}}
      <span>{{$t('company-card.valuation')}}</span>
    </div>
    <div v-if="company.investments" class="company-card__row">
      {{company.investments}}
      <span>{{$t('company-card.investments')}}</span>
    </div>
    <div v-if="company.share" class="company-card__row">
      {{company.share}}
      <span>{{$t('company-card.share')}}</span>
    </div>
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
    mounted() {
      console.log(this.company);
    }
  }
</script>

<style lang="scss" scoped>
  @import "CompanyCard";
</style>
