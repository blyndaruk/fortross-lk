import { addZeroes } from '@/utils/addZeroes';

export function sortMinMaxTooltip(data, mode = 'min', colors) {
  let dataset = data;
  const dataArray = [];

  data.forEach((body) => {
    const str = body[0].split(': ');
    const value = addZeroes(parseFloat(str[1]).toFixed(2)).toLocaleString();
    dataArray.push(value);
  });

  let dataIndexes = dataArray.map((d, i) => i);

  dataIndexes.sort((a, b) => {
    return mode === 'min' ? dataArray[b] - dataArray[a] : dataArray[a] - dataArray[b];
  });

  const tempDatasets = [];
  const tempColors = [];

  dataIndexes.forEach(function (ind) {
    tempDatasets.push(dataset[ind]);
    tempColors.push(colors[ind]);
  });

  return {
    values: tempDatasets,
    colors: tempColors
  }
}
