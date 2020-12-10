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
          unit: this.unit,
          layout: {
            padding: {
              left: 0,
              right: 0,
              top: 40,
              bottom: 40
            }
          },
          legend: {
            display: false,
            position: 'bottom',
            lineDashOffset: 10,
            fillStyle: '#000000',
            lineWidth: 4,
            hidden: true,
            labels: {
              usePointStyle: true,
              fontColor: '#7c7c7c',
            }
          },
          tooltips: {
            mode: 'point',
            intersect: false,
            enabled: false,
            custom(tooltipModel) {
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

                let innerHtml = '';

                titleLines.forEach(function (title) {
                  innerHtml += '<tr><th>' + title + '</th></tr>';
                });
                innerHtml += '<tbody>';

                const { _data } = this;
                let sum = 0;
                _data.datasets[0].data.map(data => {
                  if (data[0]) {
                    sum += parseFloat(data[0]);
                  }
                });
                bodyLines.forEach(function (body, i) {
                  const colors = tooltipModel.labelColors[i];
                  let style = 'background:' + colors.backgroundColor;
                  style += '; border-color:' + colors.borderColor;
                  style += '; border-width: 2px';
                  const span = '<span style="' + style + '"></span>';
                  const str = body[0].split(': ');
                  const title = str[0];
                  const value = parseInt(str[1]).toLocaleString();
                  const percent = (str[1] * 100 / sum).toFixed(1);
                  innerHtml += '<tr><td>' + span + title + ': ' + value + ' (' + percent + '%) ' + '</td></tr>';
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
      },
    },
    mounted() {
      this.renderChart(this.chartData, this.options);
    },
  }
</script>

<style lang="scss" scoped>
  @import "PieChart";
</style>
