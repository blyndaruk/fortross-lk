<script>
  import { Doughnut, mixins } from 'vue-chartjs';
  const { reactiveProp } = mixins;

  export default {
    extends: Doughnut,
    name: 'PieChart',
    mixins: [reactiveProp],
    data() {
      return {
        options: {
          responsive: true,
          maintainAspectRatio: false,
          layout: {
            padding: {
              left: 0,
              right: 0,
              top: 40,
              bottom: 40
            }
          },
          legend: {
            display: false
          },
          chartArea: {
            backgroundColor: '#f7f7f7'
          },
          scales: {
            xAxes: [{
              display: false,
              gridLines: {
                color: "#ffffff"
              },
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
      console.log(this.chartData);
      this.renderChart(this.chartData, this.options)
    }
  }
</script>

<style lang="scss" scoped>
  @import "PieChart";
</style>
