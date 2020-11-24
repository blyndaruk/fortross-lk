<script>
  import { Bar, mixins } from 'vue-chartjs';
  const { reactiveProp } = mixins;

  export default {
    extends: Bar,
    name: 'BarChart',
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
              display: false,
              gridLines: {
                color: "#ffffff"
              },
            }],
            yAxes: [{
              display: true,
              gridLines: {
                color: "#ffffff"
              },
              ticks: {
                beginAtZero: true,
                // TODO: test with percentage units
                callback: value => this.unit === '%' ? value + this.unit : this.unit + value,
              }
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

<style scoped>

</style>
