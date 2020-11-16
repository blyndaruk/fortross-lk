<script>
  import { Pie, mixins } from 'vue-chartjs';
  const { reactiveProp } = mixins;

  export default {
    extends: Pie,
    name: 'PieChart',
    mixins: [reactiveProp],
    props: {
      chartData: {
        type: Object,
        default: null
      },
      options: {
        type: Object,
        default: null
      },
    },
    mounted () {
      console.log(this.chartData);
      this.renderChart(this.chartData, this.options)
    }
  }
</script>

<style scoped>

</style>
