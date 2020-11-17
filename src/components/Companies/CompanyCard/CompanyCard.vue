<template>
  <div class="company-card" :class="company.inactive && 'is-inactive'">
    <div class="company-card__category" @click="onClick(company.id)">{{company.category}}</div>

    <a href="#." class="company-card__inner" target="_blank">
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
      }
    },
    mounted() {
      // console.log(this.company);
    },
  }
</script>

<style lang="scss" scoped>
  @import "CompanyCard";
</style>
