<template>
  <div class="charts-wrapper">
    <div class="charts-toggle-type">
      <button @click="toggleType('bar')">Bar</button>
      <button @click="toggleType('pie')">Pie</button>
    </div>
    <line-chart v-if="isBar" :chart-data="datacollection" :options="options"></line-chart>
    <pie-chart v-if="isPie" :chart-data="datacollection" :options="options"></pie-chart>
  </div>
</template>

<script>
  // import { Line } from 'vue-chartjs'
  import LineChart from '@/components/Charts/LineChart/LineChart';
  import PieChart from '@/components/Charts/PieChart/PieChart';
  import chartData from '@/data/chart_example';

  export default {
    components: {
      PieChart,
      LineChart
    },
    name: 'Charts',
    data() {
      return {
        chartType: 'bar',
        datacollection: null,
        chartData,
        labels: ['January', 'February', 'Februaryss'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [40, 20, 10]
          },
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [30, 20, 40]
          },
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [30, 40, 20]
          },
        ],
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    mounted() {
      this.fillData();
    },
    methods: {
      fillData() {
        console.log(this.chartData);
        this.datacollection = {
          labels: this.labels,
          datasets: this.datasets,
        }
        // this.datacollection = {
        //   labels: [this.getRandomInt(), this.getRandomInt()],
        //   datasets: [
        //     {
        //       label: 'Data One',
        //       backgroundColor: '#f87979',
        //       data: [this.getRandomInt(), this.getRandomInt()]
        //     }, {
        //       label: 'Data One',
        //       backgroundColor: '#f87979',
        //       data: [this.getRandomInt(), this.getRandomInt()]
        //     }
        //   ]
        // }
      },
      toggleType(type) {
        this.chartType = type;
        // console.log(type);
      },
      // getRandomInt () {
      //   return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      // }
    },
    computed: {
      isPie() {
        return this.chartType === 'pie';
      },
      isBar() {
        return this.chartType === 'bar';
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "Charts";
</style>
