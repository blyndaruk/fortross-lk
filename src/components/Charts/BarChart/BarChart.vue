<script>
  import { Bar, mixins } from 'vue-chartjs';
  const { reactiveProp } = mixins;

  export default {
    extends: Bar,
    name: 'BarChart',
    mixins: [reactiveProp],
    data() {
      return {
        pageYOffset: window.pageYOffset,
        options: {
          plugins: false,
          responsive: true,
          maintainAspectRatio: false,
          unit: this.unit,
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
                callback: value => {
                  return this.unit === '%' ? this.commarize(value) + this.unit : this.unit + this.commarize(value);
                },
              }
            }],
          },
          tooltips: {
            mode: 'point',
            intersect: false,
            // axis: 'y',
            // position: 'nearest',
            enabled: false,

            custom(tooltipModel) {
              const unit = document.querySelector('#unit_type').value === '%' ? '%' : '';

              // Tooltip Element
              let tooltipEl = document.getElementById('chartjs-tooltip');

              // Create element on first render
              if (!tooltipEl) {
                tooltipEl = document.createElement('div');
                tooltipEl.id = 'chartjs-tooltip';
                tooltipEl.innerHTML = '<table></table>';
                document.body.appendChild(tooltipEl);
              }

              // Hide if no tooltip
              if (tooltipModel.opacity === 0) {
                tooltipEl.style.opacity = 0;
                return;
              }

              // Set caret Position
              tooltipEl.classList.remove('above', 'below', 'no-transform');
              if (tooltipModel.yAlign) {
                tooltipEl.classList.add(tooltipModel.yAlign);
              } else {
                tooltipEl.classList.add('no-transform');
              }

              function getBody(bodyItem) {
                return bodyItem.lines;
              }

              // Set Text
              if (tooltipModel.body) {
                const titleLines = tooltipModel.title || [];
                const bodyLines = tooltipModel.body.map(getBody);

                let innerHtml = '<thead>';

                titleLines.forEach(function (title) {
                  innerHtml += '<tr><th>' + title + '</th></tr>';
                });
                innerHtml += '</thead><tbody>';


                bodyLines.forEach((body, i) => {
                  const colors = tooltipModel.labelColors[i];
                  let style = 'background:' + colors.backgroundColor;
                  style += '; border-color:' + colors.borderColor;
                  style += '; border-width: 2px';
                  const span = '<span style="' + style + '"></span>';
                  const str = body[0].split(': ');
                  const title = unit === '%' ? str[0] + '%' : Math.round(parseFloat(str[0])).toLocaleString();
                  innerHtml += '<tr><td>' + span + title + '</td></tr>';
                });
                innerHtml += '</tbody>';

                const tableRoot = tooltipEl.querySelector('table');
                tableRoot.innerHTML = innerHtml;
              }

              // `this` will be the overall tooltip
              const position = this._chart.canvas.getBoundingClientRect();

              // Display, position, and set styles for font
              tooltipEl.style.opacity = 1;
              tooltipEl.style.position = 'absolute';
              tooltipEl.style.left = position.left / 1.25 + window.pageXOffset + tooltipModel.caretX + 10 + 'px';
              tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY - tooltipEl.offsetHeight - 5 + 'px';
              tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
              tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
              tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
              tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
              tooltipEl.style.pointerEvents = 'none';
            }
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
      this.renderChart(this.chartData, this.options)
    },
    methods: {
      commarize(value) {
        const min = 1e3;
        // Alter numbers larger than 1k
        if (value >= min && this.unit !== '%') {
          const units = ["K", "M", "B", "T"];

          const order = Math.floor(Math.log(value) / Math.log(1000));

          const unitName = units[(order - 1)];
          const num = Math.floor(value / 1000 ** order);

          // output number remainder + unitname
          return num + unitName
        }

        // return formatted original number
        return value.toLocaleString()
      }
    },
    watch: {
      chartData() {
        this.renderChart(this.chartData, this.options)
      }
    }
  }
</script>

<style scoped>

</style>
