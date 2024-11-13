    let inputStateChange = () => {
        let input = document.getElementsByClassName('header__textfield')[0]; // берем первый элемент с таким классом, возможно в будущем он повторится еще где либо


        const inputIcon = document.getElementById('header-search');
        const button = document.getElementById('search-button');
        const icon = document.getElementById('search-icon');

        // Обработчик для отслеживания ввода текста
        inputIcon.addEventListener('input', function() {
            if (input.value.length > 0) {
                // Если есть введенный текст, меняем иконку на clear.svg
                icon.src = './src-weather/public/icons/search_icons/search.svg';
            } else {
                // Если поле пустое, меняем обратно на search.svg
                icon.src = './src-weather/public/icons/search_icons/search.svg';
            }
        });

    // Обработчик нажатия на кнопку
        button.addEventListener('click', function() {
            if (input.value.length > 0) {
            // Очистить текстовое поле и вернуть иконку search.svg
                input.value = '';
                icon.src = './src-weather/public/icons/search_icons/search.svg';
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

    let changeBackGround = () => {
        let now = new Date();
        const BackgroundBlock = document.querySelector('.body');
        if (0 <= now.getHours() && now.getHours() < 8 ){
            BackgroundBlock.style.backgroundImage = 'url(./src-weather/public/images/background-night.webp)';
            console.log('всм?')
        } 
        else if (8 <= now.getHours() && now.getHours() < 18){
            BackgroundBlock.style.backgroundImage = 'url(./src-weather/public/images/background-main@1x.jpg)';
            console.log('чо?')
        }
        else if (18 <= now.getHours() && now.getHours() < 24){
            BackgroundBlock.style.backgroundImage = 'url(./src-weather/public/images/background-evening.webp)';
            console.log('тут?')
        }
    }

    // Изменения иконки направления ветра
    changeBackGround();
    inputStateChange();
    setDate();
