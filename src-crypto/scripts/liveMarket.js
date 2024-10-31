// async function fetchCryptoData() {
//     try {
//         const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin`);
//         if (!response.ok) throw new Error("Failed to fetch data");
//         return await response.json();
//     } catch (error) {
//         console.error("Error fetching data:", error);
//         return null; // Возвращаем null, если произошла ошибка
//     }
// }

// async function renderLiveMarket() {
//     const container = document.querySelector(".live");
//     const data = await fetchCryptoData();

//     // Проверка, что данные получены успешно
//     if (!data) {
//         container.innerHTML = "<p>Failed to load data</p>";
//         return;
//     }

//     const { current_price: price, ath_change_percentage: percentageChange, market_cap: marketCap, total_volume: volume24h, image: iconData } = data[0];

//     // Форматирование значений с разделителями разрядов
//     const formattedMarketCap = (marketCap / 1000000000).toFixed(1);
//     const formattedVolume24h = (volume24h / 1000000000).toFixed(1);
//     const formattedPrice = price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

//     // Создаем блок для криптовалюты
//     const cryptoBlock = document.createElement("div");
//     cryptoBlock.classList.add("table__content"); // Новый класс, чтобы не дублировать `table__content`
//     cryptoBlock.innerHTML = `
//         <p class="table__coin">
//             <img src="${iconData}" alt="Bitcoin Icon">
//             Bitcoin
//         </p>
//         <p class="table__coin_change ${percentageChange >= 0 ? "state" : "minus"}">${percentageChange.toFixed(2)}%</p>
//         <p>$${formattedMarketCap}B</p>
//         <p>$${formattedVolume24h}B</p>
//         <p>$${formattedPrice}</p>
//     `;

//     container.appendChild(cryptoBlock);
// }
// // Вызов функции
// renderLiveMarket();

document.addEventListener('click', (event)=>{
    if (event.target.classList.contains("close") || event.target.classList.contains("modal__market")){
        console.log('click');
        CloseModal();
    }

    if (event.target.classList.contains("open")){
        OpenModal();
    }
});

let CloseModal = () => {
    document.querySelector('.modal__market').style.display = 'none';
    document.body.style.overflow = "";
}

let OpenModal = () => {
    document.querySelector('.modal__market').style.display = 'flex';
    document.body.style.overflow = "hidden";
}