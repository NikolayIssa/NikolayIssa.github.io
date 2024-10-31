import { monthlyData, fetchCryptoData } from './app.js';
let currentChart; // Переменная для хранения текущего графика
let selectedOption = "BTC"; // Дефолтное значение при загрузке страницы

async function initializeChart(symbol, timeFrame = 1,isDailyFormat) {
    // Ждём пока monthlyData обновится
    await fetchCryptoData(symbol);

    // console.log('Данные для графика:', monthlyData);

    // Используем monthlyData для построения графика
    renderChartMain(monthlyData, `chartmain-${symbol}`, timeFrame,isDailyFormat);
}

export async function fetchCryptoHourlyData(symbol, timeFrame = 1) {
    try {
        const response = await fetch(`https://min-api.cryptocompare.com/data/v2/histohour?fsym=${symbol}&tsym=USD&limit=24`);
        const data = await response.json();

        if (!data.Data || !data.Data.Data) throw new Error("Неверный формат данных");
        const chartData = data.Data.Data;
        const latestPrice = chartData[chartData.length - 1]?.close ?? 'N/A';

        document.querySelector('.chart-main__coin-cost').textContent = `$${latestPrice}`;
        document.querySelector('.chart-main__chart').innerHTML = `<canvas id="chartmain-${symbol}"></canvas>`;

        renderChartMain(chartData, `chartmain-${symbol}`, timeFrame);
    } catch (error) {
        console.error("Ошибка загрузки данных:", error);
    }
}

function renderChartMain(data, chartId, timeFrame, isDailyFormat) {
    if (currentChart) currentChart.destroy();
    // console.log('timeFrame', timeFrame)
    const ctx = document.getElementById(chartId).getContext("2d");
    const prices = data.map(item => item.close);

    const labels = data.map(item => formatTimestamp(item.time,isDailyFormat));

    currentChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                data: prices,
                borderColor: "#3A6FF8",
                backgroundColor: "rgba(58, 112, 248, 0.2)",
                fill: true,
                pointRadius: 0
            }]
        },
        options: {
            plugins: { legend: { display: false } },
            responsive: true,
            scales: {
                x: {
                    min: 0,
                    max: timeFrame,
                    display: true,
                    title: { display: true }
                },
                y: { display: true, title: { display: true } }
            }
        }
    });
}

function formatTimestamp(timestamp, isDailyFormat) {
    const date = new Date(timestamp * 1000);
    if (isDailyFormat){
        return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
    } else {
        // console.log('[eqeq');
        return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    }
}

function updateTimeFrame(time, symbol) {
    const timeFrameMap = { '1h': 1, '3h': 3, '24h': 24, '1w': 7,'1m': 31};
    const isDailyFormat = time === '1w' || time === '1m';

    if ( timeFrameMap[time] !== 7 && timeFrameMap[time] !== 31){
        fetchCryptoHourlyData(symbol, timeFrameMap[time] || 1);
        // console.debug('часы')
    } else {
        initializeChart(symbol, timeFrameMap[time] || 7, isDailyFormat);
        // console.debug('дни')
    }

}

function handleTimeChange(event) {
    const time = event.target.dataset.time;
    updateTimeFrame(time, selectedOption);
}

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('chart-main__button_time')) {
        handleTimeChange(event);
    }
});

document.querySelector('.chart-main__select').addEventListener('change', (event) => {
    selectedOption = event.target.value;
    // console.log(`Выбранная опция: ${selectedOption}`);
    fetchCryptoHourlyData(selectedOption, 1);
});

// Начальная загрузка данных
fetchCryptoHourlyData(selectedOption, 1);
