    let inputStateChange = () => {
    let input = document.getElementsByClassName('header__textfield')[0]; // берем первый элемент с таким классом, возможно в будущем он повторится еще где либо

    input.addEventListener('input', function() {
    console.log(input.value);
    });


    const inputIcon = document.getElementById('header-search');
    const button = document.getElementById('search-button');
    const icon = document.getElementById('search-icon');

    // Обработчик для отслеживания ввода текста
    inputIcon.addEventListener('input', function() {
    if (input.value.length > 0) {
    // Если есть введенный текст, меняем иконку на clear.svg
    icon.src = './public/icons/search_icons/clear.svg';
    } else {
    // Если поле пустое, меняем обратно на search.svg
    icon.src = './public/icons/search_icons/search.svg';
    }
    });

    // Обработчик нажатия на кнопку
    button.addEventListener('click', function() {
    if (input.value.length > 0) {
    // Очистить текстовое поле и вернуть иконку search.svg
    input.value = '';
    icon.src = './public/icons/search_icons/search.svg';
    }
    });

    // Дополнительные состояния (hover)
    button.addEventListener('mouseover', function() {
    button.classList.add('hover'); // Добавляем класс hover при наведении
    });

    button.addEventListener('mouseout', function() {
    button.classList.remove('hover'); // Убираем класс hover, когда курсор уходит
    });


    const textField = document.querySelector(".header__textfield");
    const form = document.querySelector(".header__form");

    // При фокусе на поле ввода добавляем класс active к форме
    textField.addEventListener("focus", () => {
    form.classList.add("active");
    });

    // При потере фокуса убираем класс active у формы
    textField.addEventListener("blur", () => {
    form.classList.remove("active");
    });
    } 

    let setDate = () => {

    let now = new Date();

    let minutes = String(now.getMinutes()).padStart(2, '0');

    let timeNow = now.getHours() + ':' + minutes;
    const currentTume = document.querySelector('.weather__time');
    currentTume.textContent = timeNow;

    // День недели
    let dayNow = now.getDay();
    let days = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота'
    ];
    let numberOfDay = dayNow;

    // Число и месяц

    //число
    let day = now.getDate();
    //месяц
    let mounthNow = now.getMonth();
    let mouths = [
    'Января',
    'Февраля',
    'Марта',
    'Апреля',
    'Мая',
    'Июня',
    'Июля',
    'Августа',
    'Сентября',
    'Октября',
    'Ноября',
    'Декабря',
    ];

    const currentWeekDay = document.querySelector('.weather__date');
    currentWeekDay.textContent = days[numberOfDay] + ', '+ day + ' ' + mouths[mounthNow];
    }

    // Изменения иконки направления ветра
    let windIconChange = () => {
    let windWay = 'Северо-западный';

    const windWaySource = document.querySelector('.windWay').src;

    let windWaySourceNew = './public/icons/icons_info/direction.svg'; // Путь по умолчанию
    console.log(windWaySource);

    switch (windWay) {
    case 'Северо-западный':
    windWaySourceNew = './public/icons/icons_info/direction.svg';
    break;
    case 'Северный':
    windWaySourceNew = './public/icons/icons_info/arrow-north.svg';
    break;
    case 'Северо-восточный':
    windWaySourceNew = './public/icons/icons_info/arrow-north-east.svg';
    break;
    case 'Восточный':
    windWaySourceNew = './public/icons/icons_info/arrow-east.svg';
    break;
    case 'Юго-восточный':
    windWaySourceNew = './public/icons/icons_info/arrow-south-east.svg';
    break;
    case 'Южный':
    windWaySourceNew = './public/icons/icons_info/arrow-south.svg';
    break;
    case 'Юго-западный':
    windWaySourceNew = './public/icons/icons_info/arrow-south-west.svg';
    break;
    case 'Западный':
    windWaySourceNew = './public/icons/icons_info/arrow-west.svg';
    break;
    default:
    alert("Нет таких значений");
    }

    // Присваиваем новый источник изображения элементу
    document.querySelector('.windWay').src = windWaySourceNew;
    }

    inputStateChange();
    setDate();
    windIconChange();
