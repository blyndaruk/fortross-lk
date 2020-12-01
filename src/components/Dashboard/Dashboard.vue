<template>
  <div v-if="isSimple" class="dashboard dashboard--simple">
    <div class="dashboard__col" v-for="item in data.simpleSummary" :key="item.title">
      <div class="dashboard__col-inner">
        <div class="dashboard__title-value">{{ item.title }}</div>
        <div class="dashboard__note">{{ item.note }}</div>
      </div>
    </div>
  </div>

  <div v-else-if="isMedium" class="dashboard">
    <div class="dashboard__main">
      <div class="dashboard__main-amount">{{ mainAmount }}</div>
      <div class="dashboard__main-note">Current state of the account</div>
    </div>
    <div class="dashboard__info">info</div>
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
