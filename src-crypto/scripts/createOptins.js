export let CreateOptions = (name, symbol) => {
    let select = document.querySelector('.chart-main__select');
    
    //Добавляет атрибут для поля cost
    let cost = document.querySelector('.chart-main__coin-cost');
    cost.setAttribute('data-country', 'usd');
    // Создаём новый элемент option
    const option = document.createElement('option');
    option.value = symbol; // Устанавливаем значение option (можно использовать символ)
    option.textContent = `${name}/${symbol}`; // Устанавливаем текст для отображения

    // Добавляем новый option в select
    select.appendChild(option);
}
