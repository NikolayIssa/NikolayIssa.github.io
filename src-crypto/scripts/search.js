import {renderPortfolio} from "./app.js";

const searchInput = document.getElementById('header-search');
const suggestionsContainer = document.getElementById('suggestions');
const tipoDobavil = document.querySelector('.header__form-search');

export let symbolsLiked = JSON.parse(localStorage.getItem('symbolsLiked')) || []; // Загрузка из localStorage
// Функция для сохранения символов в localStorage
export function saveSymbolsToLocalStorage() {
    localStorage.setItem('symbolsLiked', JSON.stringify(symbolsLiked));
}

let debounceTimeout

searchInput.addEventListener('input', async (event) => {
    const query = event.target.value.trim();

    if (query.length < 2) { // Минимальная длина для поиска
        suggestionsContainer.style.display = 'none';
        return;
    }

    clearTimeout(debounceTimeout);

    debounceTimeout = setTimeout(async () => {
        // Получение данных о криптовалютах из API
        const response = await fetch(`https://api.coingecko.com/api/v3/search?query=${query}`);
        const data = await response.json();

        // Отображение подсказок
        displaySuggestions(data.coins);
    }, 500); // Задержка в миллисекундах (300 мс)
});

function displaySuggestions(coins) {
    suggestionsContainer.innerHTML = ''; // Очистить предыдущие подсказки
    suggestionsContainer.style.display = 'flex'; // Показать контейнер подсказок

    coins.forEach(coin => {
        const suggestionItem = document.createElement('div');
        suggestionItem.className = 'suggestion';
        suggestionItem.textContent = coin.name + '/' +coin.symbol;

        // Обработчик клика для выбора подсказки
        suggestionItem.addEventListener('click', () => {
            searchInput.value = coin.name; // Установить выбранную подсказку в поле ввода

            // Добавление символа в массив и сохранение в localStorage
            if (!symbolsLiked.includes(coin.symbol)) {
                symbolsLiked.push(coin.symbol);
                saveSymbolsToLocalStorage(); // Сохранение в localStorage
            }

            suggestionsContainer.style.display = 'none'; // Скрыть подсказки
        });

        suggestionsContainer.appendChild(suggestionItem);
    });
}

// Закрыть подсказки при клике вне их
document.addEventListener('click', (event) => {
    if (!suggestionsContainer.contains(event.target) && event.target !== searchInput) {
        suggestionsContainer.style.display = 'none';
    }
});

tipoDobavil.addEventListener('click', ()=>{
    symbolsLiked = JSON.parse(localStorage.getItem('symbolsLiked'));
    console.log(symbolsLiked);
    renderPortfolio();  
    console.log('gay')
    // location.reload();
})

document.querySelectorAll('.portfolio__list-img').forEach((imgContainer) => {
    const deleteCoinIcon = imgContainer.querySelector('.portfolio__list-delete-coin'); // Получаем иконку удаления внутри контейнера
    imgContainer.addEventListener('mouseover', () => {
        deleteCoinIcon.style.display = 'block'; // Показываем иконку при наведении
    });

    imgContainer.addEventListener('mouseout', () => {
        deleteCoinIcon.style.display = 'none'; // Скрываем иконку при уходе курсора
    });
});


document.addEventListener('click', (event)=>{
   if (event.target.classList.contains('portfolio__list-delete-coin')){
    //    console.log('222');
       const deleteImg = document.querySelector('.portfolio__list-delete-coin')
       const articleToDelete = event.target.closest('.portfolio__list-item');
       const nameDefault = articleToDelete.getAttribute("data-name");

           // Логируем для отладки
        //    console.log(`Попытка удалить символ: ${nameDefault}`);
        //    console.log(`Текущий массив:`, symbolsLiked);

           // Удаляем имя из массива symbolsLiked
           const index = symbolsLiked.indexOf(nameDefault); // Находим индекс символа
           if (index > -1) {
               symbolsLiked.splice(index, 1); // Удаляем элемент из массива
            //    console.log(`Удалено: ${nameDefault}`);
            //    console.log(`Обновленный массив:`, symbolsLiked);

               // Сохраните обновленный массив в localStorage
               saveSymbolsToLocalStorage();

               // Также, при необходимости, можете удалить элемент из DOM
               articleToDelete.remove(); // Удаляем элемент из DOM
           } else {
            //    console.log(`${nameDefault} не найден в массиве.`);
           }
    }
});
