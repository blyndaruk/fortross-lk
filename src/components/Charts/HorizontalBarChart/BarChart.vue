<script>
  import { HorizontalBar, mixins } from 'vue-chartjs';
  const { reactiveProp } = mixins;

  export default {
    extends: HorizontalBar,
    name: 'HorizontalBarChart',
    mixins: [reactiveProp],
    data() {
      return {
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false
          },
          chartArea: {
            backgroundColor: '#f7f7f7'
          },
          scales: {
            xAxes: [{
              display: true,
              gridLines: {
                color: "#ffffff"
              },
              ticks: {
                beginAtZero: true,
                callback: value => this.unit === '%' ? value + this.unit : this.unit + value,
              }
            }],
            yAxes: [{
              display: false,
              gridLines: {
                color: "#ffffff"
              },
            }],
          },
        },
      }
    },
    props: {
      chartData: {
        type: Object,
        default: null
      },
      unit: {
        type: String
      }
    },
    mounted () {
      // console.log(this.chartData);
      this.renderChart(this.chartData, this.options)
    }
  }
</script>

<style lang="scss" scoped>
  .chart-bar-horizontal {
    margin-top: 40px;
  }
</style>
