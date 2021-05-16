<script>
  // import { addZeroes } from '@/utils/addZeroes';
  import { sortMinMaxTooltip } from '@/utils/sortMinMaxTooltip';
  import { Line, mixins } from 'vue-chartjs';

  const { reactiveProp } = mixins;

  export default {
    extends: Line,
    name: 'LineChart',
    mixins: [reactiveProp],
    data() {
      return {
        rectangleSet: false,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false
          },
          // bezierCurve: false,
          chartArea: {
            backgroundColor: '#f7f7f7'
          },
          spanGaps: true,
          unit: this.unit,
          scales: {
            xAxes: [{
              display: true,
              // stacked: true,
              // beginAtZero: true,
              ticks: {
                autoSkip: true,
                // suggestedMin: 12,
                // maxTicksLimit: 18
              },
              gridLines: {
                color: "#FFFFFF"
              },
            }],
            yAxes: [{
              display: true,
              gridLines: {
                color: "#FFFFFF"
              },
              ticks: {
                beginAtZero: true,
                callback: value => {
                  const negative = value < 0;
                  const editedUSD = negative ? this.commarize(value) : this.unit + this.commarize(value);
                  return this.unit === '%' ? this.commarize(value) + this.unit : editedUSD;
                },
              }
            }]
          },
          elements: {
            point: {
              radius: 3,
              hoverRadius: 5.4,
            },
            line: {
              cubicInterpolationMode: 'monotone',
              steppedLine: false
              // tension: 0.2
              // tension: 0.4
            }
          },
          hover: {
            mode: 'index',
            intersect: false,
          },
          tooltips: {
            mode: 'x',
            intersect: true,
            position: 'nearest',
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

                const bodyValues = sortMinMaxTooltip(bodyLines, 'min', tooltipModel.labelColors);
                const values = bodyValues.values;
                const sortedColors = bodyValues.colors;

                values.forEach(function (body, i) {
                  const str = body[0].split(': ');
                  const title = str[0];
                  // const value = parseFloat(str[1]).toFixed(1).toLocaleString(); // %
                  const value = unit === '%' ? parseFloat(str[1]).toFixed(1).toLocaleString('ru') : Math.round(parseFloat(str[1])).toLocaleString('ru');
                  const colors = sortedColors[i];
                  let style = 'background:' + colors.backgroundColor;
                  style += '; border-color:' + colors.borderColor;
                  style += '; border-width: 2px';
                  const span = '<span style="' + style + '"></span>';
                  innerHtml += '<tr><td>' + span + title + ': ' + value + unit + '</td></tr>';
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
              tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 10 + 'px';
              tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
              tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
              tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
              tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
              tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
              tooltipEl.style.pointerEvents = 'none';
            }
          },
          animation: {
            onComplete() {
              this.rectangleSet = false;
            },
            onProgress() {
              // TODO: set debounced function
              const scrollable = document.querySelector('#scrollable').value;
              if (!this.rectangleSet && !!scrollable) {
                const scale = window.devicePixelRatio;

                const sourceCanvas = this.canvas;
                const copyWidth = this.scales['y-axis-0'].width - 6;
                const copyHeight = this.scales['y-axis-0'].height + this.scales['y-axis-0'].top + 10;

                const targetCtx = document.getElementById("x-axis").getContext("2d");

                targetCtx.scale(scale, scale);
                targetCtx.canvas.width = copyWidth * scale;
                targetCtx.canvas.height = copyHeight * scale;

                targetCtx.canvas.style.width = `${copyWidth}px`;
                targetCtx.canvas.style.height = `${copyHeight}px`;
                targetCtx.drawImage(sourceCanvas, 0, 1, copyWidth * scale, copyHeight * scale, 0, 0, copyWidth * scale, copyHeight * scale);

                const sourceCtx = sourceCanvas.getContext('2d');

                // Normalize coordinate system to use css pixels.
                sourceCtx.clearRect(0, 0, copyWidth, copyHeight);
                this.rectangleSet = true;
              }
            },
          }
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
    methods: {
      commarize(value) {
        const min = 1e3;

        const negative = value < 0;
        if (negative) value *= -1;

        // Alter numbers larger than 1k
        if (value >= min && this.unit !== '%') {
          const units = ["K", "M", "B", "T"];

          const order = Math.floor(Math.log(value) / Math.log(1000));

          const unitName = units[(order - 1)];
          let num = Math.floor(value / 1000 ** order);

          // output number remainder + unitname
          if (negative) {
            num *= -1;
            num = num.toString().slice(0, 1)+this.unit+ num.toString().slice(1)
          }
          return num + unitName
        }

        if (this.unit === '%' && negative) {
          value *= -1;
        }

        // return formatted original number
        return value.toLocaleString()
      }
    },
    mounted() {
      this.renderChart(this.chartData, this.options)
    }
  }
</script>

<style scoped>

</style>
