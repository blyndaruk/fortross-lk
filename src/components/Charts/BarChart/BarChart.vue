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
              display: true,
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
    },
    mounted () {
      // console.log(this.chartData);
      this.renderChart(this.chartData, this.options)
    }
  }
</script>

<style scoped>

</style>
