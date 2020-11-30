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
          legendCallback: (chart) => {
            const renderLabels = (chart) => {
              const { data } = chart;
              let sum = 0;
              data.datasets[0].data.map(data => {
                if (data[0]) {
                  sum += data[0]
                }
              });
              return data.datasets[0].data.map((_, i) => {
                  const value = (data.datasets[0].data[i] * 100 / sum).toFixed(1);
                  return `<li>
                    <div id="legend-${i}-item" class="legend-item">
                      <span class="legend-item__circle" style="border-color:${data.datasets[0].backgroundColor[i]}"></span>
                      ${data.labels[i] && `<span class="label">${value}% ${data.labels[i]}</span>`}
                    </div>
                </li>`
                }
              ).join("");
            };
            return `
          <ul class="chartjs-legend">
            ${renderLabels(chart)}
          </ul>`;
          },
          tooltips: {
            mode: 'point',
            intersect: false,
            // axis: 'y',
            // position: 'nearest',
            enabled: false,

            custom: function (tooltipModel) {
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


                bodyLines.forEach(function (body, i) {
                  const colors = tooltipModel.labelColors[i];
                  let style = 'background:' + colors.backgroundColor;
                  style += '; border-color:' + colors.borderColor;
                  style += '; border-width: 2px';
                  const span = '<span style="' + style + '"></span>';
                  const str = body[0].split(': ');
                  const title = str[0];
                  const value = parseFloat(str[1]).toLocaleString();
                  innerHtml += '<tr><td>' + span + title + ': ' + value + '</td></tr>';
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
      const HTML = this.$data._chart.generateLegend();
      this.$emit('generated-legends', HTML)
    },
    watch: {
      chartData() {
        const HTML = this.$data._chart.generateLegend();
        this.$emit('generated-legends', HTML)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "PieChart";
</style>
