import { Options } from "highcharts";
import { jsonChart } from "src/app/interfaces/jsonChart-interface";

async function fetchDataFromAPI(): Promise<jsonChart[]> {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirecionar para o login ou tratar a falta de token de acordo com a lógica do seu aplicativo
      return [];
    }

    const response = await fetch('http://localhost:8081/monthlyOxWeight/get', {
      headers: {
        Authorization: `Bearer ${token}`, // Inclui o token JWT no cabeçalho de autorização
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar os dados da API');
    }

    const jsonData: jsonChart[] = await response.json();
     console.log(jsonData);
    return jsonData;
  } catch (error) {
    console.error('Erro ao buscar dados da API:', error);
    return []; // Retorna um array vazio em caso de erro
  }
}

export async function generateChartOptions() {
  try {
    const jsonData = await fetchDataFromAPI();

    // Processar os dados do JSON para extrair meses e pesos médios
    const months = jsonData.map((data) => data.month);
    const averageWeights = jsonData.map((data) => data.averageWeight);

    // Configurar as opções do gráfico com os dados obtidos da API
    const areaChartOptions: Options = {
      chart: {
        styledMode: true,
      },
      plotOptions: {
        series: {
          marker: {
            enabled: false,
          },
        },
      },
      legend: {
        enabled: false,
      },
      credits: {
        enabled: false,
      },
      title: {
        text: "Average Weight by Month",
      },
      yAxis: {
        visible: false,
      },
      xAxis: {
        visible: false,
        categories: months, // Update categories with extracted months
      },
      defs: {
        gradient0: {
          tagName: "linearGradient",
          id: "gradient-0",
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1,
          children: [
            {
              tagName: "stop",
              offset: 0,
            },
            {
              tagName: "stop",
              offset: 1,
            },
          ],
        },
      } as any,
      series: [
        {
          color: "red",
          type: "areaspline",
          keys: ["y", "selected"],
          data: averageWeights, // Update data with extracted average weights
        },
      ],
    };

    return areaChartOptions;
  } catch (error) {
    console.error('Erro ao gerar opções do gráfico:', error);
    return null; // Retorna null em caso de erro
  }
}

// Chamada da função para gerar as opções do gráfico
generateChartOptions().then((chartOptions) => {
  if (chartOptions) {
    // Use as opções do gráfico (chartOptions) conforme necessário
    console.log(chartOptions);
  } else {
    console.error('Erro ao gerar opções do gráfico');
  }
});
