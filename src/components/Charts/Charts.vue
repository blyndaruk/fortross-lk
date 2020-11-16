<template>
  <div class="charts-wrapper">
    <line-chart :chart-data="datacollection"></line-chart>
    <button @click="fillData()">Randomize</button>
  </div>
</template>

<script>
  // import { Line } from 'vue-chartjs'
  import LineChart from '@/components/Charts/LineChart/LineChart';

  export default {
    components: {
      LineChart
    },
    // extends: Line,
    name: 'Charts',
    mounted () {
      this.fillData();
    },
    data () {
      return {
        datacollection: null
      }
    },
    methods: {
      fillData () {
        this.datacollection = {
          labels: [this.getRandomInt(), this.getRandomInt()],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: '#f87979',
              data: [this.getRandomInt(), this.getRandomInt()]
            }, {
              label: 'Data One',
              backgroundColor: '#f87979',
              data: [this.getRandomInt(), this.getRandomInt()]
            }
          ]
        }
      },
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "Charts";
</style>
