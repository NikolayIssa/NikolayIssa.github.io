import { scrollButtonsListeners } from './slider.js';
import { CreateOptions } from './createOptins.js';
import { fetchCryptoHourlyData } from './mainChart.js';
import  {symbolsLiked} from "./search.js";

export let monthlyData = [];
let likedOne = [...symbolsLiked];
// console.log(likedOne);

export async function fetchCryptoData(symbol) {
    const response = await fetch(`https://min-api.cryptocompare.com/data/v2/histoday?fsym=${symbol}&tsym=USD&limit=30`);
    const data = await response.json();
    monthlyData.splice(0, monthlyData.length, ...data.Data.Data); // Обновляем содержимое monthlyData
    return monthlyData;
}

async function fetchSelectedCryptoIcons(symbols) {
    try {
        const response = await fetch("https://min-api.cryptocompare.com/data/all/coinlist");
        const data = await response.json();

        // Проверяем, получены ли данные
        if (!data || !data.Data) {
            throw new Error("Invalid data received from the API");
        }

        // Фильтруем и собираем нужные иконки
        const filteredIcons = symbols.map(symbol => {
            const coinData = data.Data[symbol];
            if (coinData) {
                return {
                    name: coinData.CoinName,
                    symbol: symbol,
                    iconUrl: `https://www.cryptocompare.com${coinData.ImageUrl}`
                };
            } else {
                console.warn(`Icon for ${symbol} not found`); // Используем console.warn для предупреждений
                return null;
            }
        }); // Убираем значения null

        return filteredIcons;
    } catch (error) {
        console.error("Error fetching crypto icons:", error);
        return []; // Возвращаем пустой массив в случае ошибки
    }
}


async function renderCryptoBlocks() {
    const container = document.querySelector(".crypto-blocks-wrapper");
    const symbols = ["BTC", "ETH", "LTC", "ADA", "DOG","HMSTR","TON","NOT","POPCAT"]; // Необходимые символы криптовалют
    const imageData = await fetchSelectedCryptoIcons(symbols);
    const onloadBlock = document.querySelector(".onload-block");
    const onloadBlockm30 = document.querySelector(".onload-block_m30");
    imageData.forEach(image => {
        CreateOptions(image.name, image.symbol);
    });

    // Сохраняем все промисы в массив
    const promises = symbols.map(async (symbol, index) => {
        try {
            const data = await fetchCryptoData(symbol);
            // console.log(data);
            const latestData = data[data.length - 1];
            const prevData = data[data.length - 2];
            const price = latestData.close;
            const percentageChange = (((price - prevData.close) / prevData.close) * 100).toFixed(2);

            // Находим данные иконки для текущего символа
            const iconData = imageData[index] || { iconUrl: "defaultIconUrl.png" }; // Используем индекс для доступа к иконкам

            // Создаем блок для криптовалюты
            const cryptoBlock = document.createElement("article");
            cryptoBlock.classList.add("crypto-blocks__item");

            cryptoBlock.innerHTML = `
                <div class="crypto-blocks__item-wrapper">
                    <div class="crypto-blocks__item-img list-img-default">
                        <img src="${iconData.iconUrl}" alt="${symbol}" />
                    </div>
                    <div class="crypto-blocks__item-name">
                        <h3 class="name-default">${symbol}</h3>
                        <p>${symbol}</p>
                    </div>
                    <img src="./src-crypto/public/src/img/icons/vall/Icon/Icon/arrow-${percentageChange >= 0 ? "up" : "down"}.svg" alt="" class="crypto-blocks__item-state" />
                </div>
                <div class="crypto-blocks__item-wrapper">
                    <div class="crypto-blocks__item-name cost">
                        <h3>$${price.toFixed(3)}</h3>
                        <p class="${percentageChange >= 0 ? "" : "minus"}">${percentageChange}%</p>
                    </div>
                    <div class="crypto-blocks__item-chart">
                        <canvas id="chart-${symbol}" width="100" height="50"></canvas>
                    </div>
                </div>
            `;

            container.appendChild(cryptoBlock);

            // Пример вызова функции для создания опций из массива ImageData

            // CreateOptions(data[index].name, data[index].symbol);

            // Отрисовываем график с помощью Chart.js
            renderChart(data, `chart-${symbol}`);
        } catch (error) {
            console.error(`Ошибка при отображении данных для ${symbol}:`, error);
        }
    });

    // Дождаться завершения всех промисов
    await Promise.all(promises);

    onloadBlock.style.display = 'none';
    onloadBlockm30.style.display = 'none';
    // Теперь вызываем функцию слайдера
    scrollButtonsListeners('.crypto-blocks-wrapper');
}

export async function renderPortfolio() {
    const container = document.querySelector(".portfolio__list");
    const symbols = [...likedOne]; // Необходимые символы криптовалют
    const imageData = await fetchSelectedCryptoIcons(symbols);
    // Сохраняем все промисы в массив
    const promises = symbols.map(async (symbol, index) => {
            try {
                const data = await fetchCryptoData(symbol);
                const latestData = data[data.length - 1];
                const prevData = data[data.length - 2];
                const price = latestData.close;
                const percentageChange = (((price - prevData.close) / prevData.close) * 100).toFixed(2);
                const randomValueInWallet = Math.random().toFixed(3);
                const MoneyInWallet = price.toFixed(3) * randomValueInWallet;

                let MoneyInWalletChanged = (num,decimals) => Number(num.toFixed(decimals))

                // Находим данные иконки для текущего символа
                const iconData = imageData[index] || { iconUrl: "./public/src/default.png" }; // Используем индекс для доступа к иконкам

                // Создаем блок для криптовалюты
                const cryptoBlock = document.createElement("article");
                cryptoBlock.classList.add("portfolio__list-item");
                cryptoBlock.setAttribute('data-name', symbol)
                cryptoBlock.innerHTML = `
                    <div class="portfolio__list-img list-img-default" data-name="${symbol}">
                    <img
                        src="${iconData.iconUrl}" alt="${symbol}"
                        alt="${symbol}"
                        data-js="${symbol}"
                    />
                    
                    <img
                        src="./src-crypto/public/src/img/icons/close-circle-fill.svg" alt="${symbol}"
                        alt="${symbol}"
                        class="portfolio__list-delete-coin"
                        data-name="${symbol}"
                    />
                    </div>

                    <div class="portfolio__list-item-wrapper">
                    <p class="name-default p-sb">
                        ${symbol}
                        <span class="portfolio__list-item-span ${percentageChange >= 0 ? "state" : "minus"}">${percentageChange >= 0 ? "+" : ""}${percentageChange}%</span>
                    </p>
                    <p class="portfolio__list-item-p p-sb">
                        $${MoneyInWalletChanged(MoneyInWallet, 4)}<span class="portfolio__list-item-span_wallet"
                        >${randomValueInWallet} ${symbol}</span
                        >
                    </p>
                    </div>
                `;

                container.appendChild(cryptoBlock);
            } catch (error) {
                console.error(`Ошибка при отображении данных для ${symbol}:`, error);
            }
    });

    await Promise.all(promises);

}

function renderChart(data, chartId) {
    const ctx = document.getElementById(chartId).getContext("2d");
    const labels = data.map(item => new Date(item.time * 1000).toLocaleDateString());
    const prices = data.map(item => item.close);
    new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: false,
                data: prices,
                borderColor: getRandomColor(),
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                fill: false,
                pointStyle: false
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false // отключение отображения легенды
                }
            },
            responsive: true,
            scales: {
                x: {
                    display: false,
                    title: {
                        display: true,
                        text: "Дата"
                    }
                },
                y: {
                    display: false,
                    title: {
                        display: true,
                        text: "Цена в USD"
                    }
                }
            }
        }
    });
}

function getRandomColor(opacity = 1) {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

document.addEventListener("DOMContentLoaded", renderCryptoBlocks);
document.addEventListener("DOMContentLoaded", renderPortfolio);

fetchCryptoHourlyData("BTC", 1);




