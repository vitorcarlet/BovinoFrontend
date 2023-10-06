import { Options } from "highcharts";

export const areaChartOptions: Options = {
    chart: {
        styledMode: true,
    },
    plotOptions: {
        series: {
            marker: {
                enabled: false,
            }
        }
    },
    legend: {
        enabled: false
    },
    credits:{
        enabled: false,
    },
    title: {
        text: 'Média do Peso por mês'
    },
    yAxis: {
        visible: false,
    },
    xAxis: {
        visible: false,
        categories: [
            'Jan',
            'Fev',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ],
    },
    defs: {
        gradient0: {
            tagName: 'linearGradient',
            id: 'gradient-0',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
            children: [
                {
                    tagName: 'stop',
                    offset: 0
                },
                {
                    tagName: 'stop',
                    offset: 1
                }
            ]
        }
    } as any,
    series: [
        {
            color: 'red',
            type: 'areaspline',
            keys: ['y', 'selected'],
            data: [
                [29.9, false],
                [71.5, false],
                [99.8, false],
                [106.4, false],
                [116.2, false],
                [133.1, false],
                [152.5, false],
                [177.6, false],
                [183.9, false],
                [183.9, false],
                [183.9, false],
                [183.9, false],
            ]
        }
    ]
};