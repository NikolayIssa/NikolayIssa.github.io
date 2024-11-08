import { monthlyData, fetchCryptoData } from './app.js';
let currentChart; // Переменная для хранения текущего графика
let selectedOption = "BTC"; // Дефолтное значение при загрузке страницы

async function initializeChart(symbol, timeFrame = 1,isDailyFormat) {
    // Ждём пока monthlyData обновится
    await fetchCryptoData(symbol);

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

export async function fetchCryptoMinutesData(symbol, timeFrame = 7) {
    try {
        const response = await fetch(`https://min-api.cryptocompare.com/data/v2/histominute?fsym=${symbol}&tsym=USD&limit=6&aggregate=10`);
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
                backgroundColor: "rgba(58, 112, 248, 0.03)",
                fill: true,
                pointRadius: 3,
                borderWidth:4,
                tension: 0
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
                    title: { display: true },
                    ticks: {color: '#ffffff'}
                },
                y: { display: true, title: { display: true },ticks: { color: '#ffffff', font:{size: 10}}}
            }
        }
    });
}

function formatTimestamp(timestamp, isDailyFormat) {
    const date = new Date(timestamp * 1000);
    
    if (isDailyFormat) {
        return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}`;
    } else {
        // Округляем минуты до ближайших 10
        let minutes = Math.floor(date.getMinutes() / 10) * 10;
        return `${date.getHours().toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }
}


function updateTimeFrame(time, symbol) {
    const timeFrameMap = { '1h': 1, '3h': 3, '24h': 24, '1w': 7,'1m': 31};
    const isDailyFormat = time === '1w' || time === '1m';

    if (timeFrameMap[time] == 1){
        fetchCryptoMinutesData(symbol, 7);
        console.log('correct')
    } else if ( timeFrameMap[time] !== 7 && timeFrameMap[time] !== 31 && timeFrameMap[time] !== 1){
        fetchCryptoHourlyData(symbol, timeFrameMap[time]);
        // console.debug('часы')
    } else {
        initializeChart(symbol, timeFrameMap[time] || 7, isDailyFormat);
        // console.debug('дни')
    }

}

function handleTimeChange(event) {
    const time = event.target.dataset.time;
    updateTimeFrame(time, selectedOption);
    console.log(time)
}

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('chart-main__button_time')) {
        handleTimeChange(event);
    }
});

const buttons = document.querySelectorAll('.chart-main__button_time');

    // Добавляем обработчик клика для каждой кнопки
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Удаляем класс 'active' у всех кнопок
            buttons.forEach(btn => btn.classList.remove('active'));
            
            // Добавляем класс 'active' только к выбранной кнопке
            button.classList.add('active');
        });
    });

document.querySelector('.chart-main__select').addEventListener('change', (event) => {
    selectedOption = event.target.value;
    console.log(`Выбранная опция: ${selectedOption}`);
    fetchCryptoMinutesData(selectedOption, 7);
});

// Начальная загрузка данных
fetchCryptoMinutesData(selectedOption, 7);

window.addEventListener('resize', function() {
    currentChart.resize();
});
