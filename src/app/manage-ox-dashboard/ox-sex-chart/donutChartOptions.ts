import { Options, color } from 'highcharts';

export const donutChartOptions: Options = {
  chart: {
    type: 'pie',
    plotShadow: false,
  },
  credits: {
    enabled: false,
  },
  plotOptions: {
    pie: {
      innerSize: '99%',
      borderWidth: 40,
      borderColor: 'transparent',
      slicedOffset: 20,
      dataLabels: {
        connectorWidth: 0,
      },
    },
  },
  title: {
    verticalAlign: 'middle',
    floating: true,
    text: '42%',
  },
  legend: {
    enabled: false,
  },
  series: [
    {
      type: 'pie',
      data: [
        { name: 'Macho', y: 1, color: '#eeeeee' },
        { name: 'Fêmea', y: 2, color: '#393e46' },
      ],
    },
  ],
};