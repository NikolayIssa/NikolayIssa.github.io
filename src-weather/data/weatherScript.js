async function getData() {
    try {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
        } else {
            console.log('Геолокация не поддерживается этим браузером');
        }

        async function successCallback(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            console.log('Широта: ' + latitude + ', Долгота: ' + longitude);

            const geocodeUrl = `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`;
            try {
                const geocodeResponse = await fetch(geocodeUrl);
                const geocodeData = await geocodeResponse.json();
                let city = geocodeData.address.city || 'Москва'; // Если не удалось получить город, используем "Москва"
                console.log('Город: ' + city);
                
                // Запрашиваем погоду
                await fetchWeatherData(city);
            } catch (error) {
                console.error('Ошибка геокодирования:', error);
            }
        }

        function errorCallback(error) {
            console.log('Ошибка при получении геопозиции: ' + error.message);
            alert('Важно! Если вы откажетесь от предоставления геолокации, приложение автоматически определит его как Москва.');
            alert('Но вы можете найти свой город в поиске!');
            fetchWeatherData('Москва'); // По умолчанию используем "Москва"
        }

    } catch (error) {
        console.error('Ошибка:', error);
    }
}

async function fetchWeatherData(city) {
    const weatherUrl = `https://api.weatherapi.com/v1/forecast.json?key=6e40db2d40af4681bce15022242210&q=${encodeURIComponent(city)}&days=5&aqi=no&alerts=no`;
    const loadingMessage = document.getElementById('loader');
    loadingMessage.style.display = 'flex';
    
    try {
        const response = await fetch(weatherUrl);
        if (!response.ok) {
            throw new Error('Ошибка запроса');
        }
        const data = await response.json();
        console.log(data)
        SomeTest(data);
        setPressureInfo(data);
        setHumidityInfo(data);
        sliderOptions(data);
        setVisibilityInfo(data);
        setSunriseAndSunset(data);  
        windIconChange(data);
        setWindSpeed(data);
    } catch (error) {
        console.error('Ошибка:', error);
    } finally {
        loadingMessage.style.display = 'none'; // Скрываем сообщение "Загрузка..."
    }
}
getData();

    const input = document.getElementById('header-search');
    const searchBtn = document.getElementById('search-icon');

    searchBtn.addEventListener('click', function() {
        const inputValue = input.value.trim(); // Удаляем пробелы в начале и конце строки
        fetchWeatherData(inputValue); // Передаем введенный город
    });

    let SomeTest = (data) => {
        const currentCity = document.querySelector('.weather__city');
        currentCity.innerHTML = data.location.name;
        document.querySelector('.weather__state-text').innerHTML = data.current.condition.text;
        document.querySelector('.weather__temp-value').innerHTML = Math.floor(data.current.temp_c) + "&deg;";
        document.querySelector('.weather__feels-like').innerHTML = "Ощущается как " + Math.floor(data.current.feelslike_c) + "&deg;";
        document.querySelector('.weather__state-icon').src = data.current.condition.icon;
    }

    let setHumidityInfo = (data) => {
        //Влажность
        const humidityItem = document.querySelector('.humidity');
        humidityItem.querySelector('.weather__details-value').textContent = data.current.humidity +"%";
        humidityItem.querySelector('.weather__details-range--substract').style.setProperty('--maskPosition', data.current.humidity + '%');
    }

    // Давление
    let setPressureInfo = (data) => {
        let preassureValue = data.current.pressure_in * 25.4;

        let preassureRange = (preassureValue/100)*10;

        let preassureClass = '';

            if (preassureValue < 350) {
            preassureClass = 'Пониженное';
            } else if (preassureValue >= 350 && preassureValue <= 500) {
                preassureClass = 'Оптимальное';
            } else if (preassureValue > 500) {
                preassureClass = 'Повышенное';
            } else {
            preassureClass = 'Ошибка';;
            }

                const pressureItem = document.querySelector('.pressure');
                pressureItem.querySelector('.weather__details-value').textContent = Math.floor(preassureValue);
                pressureItem.querySelector('.weather__details-range--substract').style.setProperty('--mask-position', preassureRange + '%');
                pressureItem.querySelector('.weather__details-range-text').textContent = preassureClass;
    }
    // Видимость
    let setVisibilityInfo = (data) => {
        let visibilityValue = data.current.vis_km;

        if (visibilityValue > 100) {
            visibilityValue = 93;
        }

        let visibilityClass = '';

        if (visibilityValue <= 5) {
            visibilityClass = 'Недостаточная';
        } 
        else if (visibilityValue > 5 && visibilityValue <= 30) {
            visibilityClass = 'Нормальная';
        } 
        else if (visibilityValue > 30) {
            visibilityClass = 'Отличная';
        } 
        else {
        visibilityClass = 'Ошибка';;
        }

        const visibilityItem = document.querySelector('.visibility');

        visibilityItem.querySelector('.weather__details-value').textContent = `${visibilityValue} км`;
        visibilityItem.querySelector('.weather__details-range--substract').style.setProperty('--maskPosition', visibilityValue * 2.5 + '%');
        visibilityItem.querySelector('.weather__details-range-text').textContent = visibilityClass;
    }

    // Рассвет и закат
    let setSunriseAndSunset = (data) => {
        let sunset = data.forecast.forecastday[0].astro.sunset;
        let sunrise = data.forecast.forecastday[0].astro.sunrise;

        function convertTo24Hour(time) {
            let [hours, minutes] = time.split(/[: ]/);
            const period = time.slice(-2).toUpperCase();
            hours = parseInt(hours, 10);

            if (period === 'PM' && hours !== 12) {
              hours += 12;
            } else if (period === 'AM' && hours === 12) {
              hours = 0;
            }
          
            return `${hours.toString().padStart(2, '0')}:${minutes}`;
          }

          let calculatedSunrise = convertTo24Hour(sunrise);
          let calculatedSunset = convertTo24Hour(sunset);

          function calculateTimes(sunrise, sunset) {
            const now = new Date();

            // Преобразуем время рассвета и заката в объект Date // Данные из API в формате AM/PM
            const [sunriseHours, sunriseMinutes] = sunrise.split(':').map(Number);
            const [sunsetHours, sunsetMinutes] = sunset.split(':').map(Number);

            const today = now.toISOString().split('T')[0]; // Получаем сегодняшнюю дату (YYYY-MM-DD)
            // Создаем объекты Date для рассвета и заката
            const sunriseTime = new Date(`${today}T${sunriseHours.toString().padStart(2, '0')}:${sunriseMinutes.toString().padStart(2, '0')}:00`);
            const sunsetTime = new Date(`${today}T${sunsetHours.toString().padStart(2, '0')}:${sunsetMinutes.toString().padStart(2, '0')}:00`);
        
            // Вычисляем разницу между текущим временем и рассветом (в миллисекундах)
            const timeSinceSunrise = now - sunriseTime;
            const timeUntilSunset = sunsetTime - now;
        
            // Переводим миллисекунды в часы и минуты
            const hoursSinceSunrise = Math.floor(timeSinceSunrise / (1000 * 60 * 60));
            const minutesSinceSunrise = Math.floor((timeSinceSunrise % (1000 * 60 * 60)) / (1000 * 60));

            const hoursUntilSunset = Math.floor(timeUntilSunset / (1000 * 60 * 60));
            const minutesUntilSunset = Math.floor((timeUntilSunset % (1000 * 60 * 60)) / (1000 * 60));

            // Проверка: если закат уже был
            const isSunsetPassed = timeUntilSunset < 0; // Если время до заката меньше 0, значение true, иначе false
            const isSunrisePassed = hoursSinceSunrise > 14; // Если время после рассвета больше 14, значение true, иначе false

            // Считаем сколько осталось до рассвета
            const timeBeforeSunriceHour = 24 - hoursSinceSunrise;
            const timeBeforeSunriceMinute = 60 - minutesSinceSunrise;

            return {
                timeSinceSunrise: `${hoursSinceSunrise} ч. и ${minutesSinceSunrise} мин.`,

                timeUntilSunrice: `${timeBeforeSunriceHour} ч. и ${timeBeforeSunriceMinute} мин.`,
                timeUntilSunset: `${hoursUntilSunset} ч. и ${minutesUntilSunset} мин.`,
                isSunsetPassed, // возвращаем флаг, был ли закат;
                isSunrisePassed, // возвращаем флаг, сколько прошло ли достаточно времени после рассвета;
            };
        }
        
        // Использование функции
        const result = calculateTimes(calculatedSunrise, calculatedSunset);

        // Обновление DOM с проверкой на то, был ли закат
        document.querySelector('.sunrise .weather__details-value').textContent = convertTo24Hour(sunrise);
        document.querySelector('.sunrise .range-text.time').textContent = result.isSunrisePassed ? `Осталось: ${result.timeUntilSunrice}`  : `Прошло: ${result.timeSinceSunrise}`;
        
        document.querySelector('.sunset .weather__details-value').textContent = convertTo24Hour(sunset);
        document.querySelector('.sunset .range-text.time').textContent = result.isSunsetPassed ? 'Уже был' : `Осталось: ${result.timeUntilSunset}`;
    }
    // Сила ветра

    let windIconChange = (data) => {
        let windWay = data.current.wind_dir;
        let windText = 'Направление ветра';
    
        let windWaySourceNew = './public/icons/icons_info/direction.svg'; // Путь по умолчанию

        switch (windWay) {
            case 'NW':
            case "NNW":
                windWaySourceNew = './src-weather/public/icons/icons_info/direction.svg';
                windText = 'Северо-западный';
            break;
            case 'N':
                windWaySourceNew = './src-weather/public/icons/icons_info/arrow-north.svg';
                windText = 'Северный';
            break;
            case 'NE':
            case "NNE":
            case "ENE":
                windWaySourceNew = './src-weather/public/icons/icons_info/arrow-north-east.svg';
                windText = 'Северо-восточный';
            break;
            case 'E':
                windWaySourceNew = './src-weather/public/icons/icons_info/arrow-east.svg';
                windText = 'Восточный';
            break;
            case 'SE':
            case 'ESE':
            case 'SSE':
                windWaySourceNew = './src-weather/public/icons/icons_info/arrow-south-east.svg';
                windText = 'Юго-востоный';
            break;
            case 'S':
                windWaySourceNew = './src-weather/public/icons/icons_info/arrow-south.svg';
                windText = 'Южный';
            break;
            case 'SW':
            case "SSW":
            case 'WSW':
                windWaySourceNew = './src-weather/public/icons/icons_info/arrow-south-west.svg';
                windText = 'Юго-западный';
            break;
            case 'W':
            case "WNW":
                windWaySourceNew = './src-weather/public/icons/icons_info/arrow-west.svg';
                windText = 'Западный';
            break;
            default:
            console.log('Ошибка')
            }
    
        // Присваиваем новый источник изображения элементу
        document.querySelector('.windWay').src = windWaySourceNew;
        document.querySelector('.weather__details-range-text[data-windway="forjs"]').textContent = windText;
    }
    
    let setWindSpeed = (data) => {
        const windItem = document.querySelector('.wind');
        windItem.querySelector('.weather__details-value').textContent =  Math.floor((data.current.wind_kph * 10)/36)  + ' м/с';
    }

    let sliderOptions = (data) => {

        const dayButton = document.querySelector('.day');

        const show5DaysButton = document.querySelector('.week');

        const forecastList = document.querySelector('.slider__items-inner');  
        const list5day = document.querySelector('.days5'); 

        dayButton.addEventListener('click', () => {
            forecastList.style.display = 'grid';
            list5day.style.display = 'none';
            show5DaysButton.classList.remove('select');
            dayButton.classList.add('select');
            setTimeout(scrollButtonsListeners('.slider__items-inner'),100);
        });
        
        show5DaysButton.addEventListener('click', () => {
            forecastList.style.display = 'none';
            list5day.style.display = 'grid';
            dayButton.classList.remove('select');
            show5DaysButton.classList.add ('select');
            setTimeout(scrollButtonsListeners('.days5'),100);
        });

        function renderWeatherData(data) {
                const ulElement = document.querySelector('.slider__items-inner');
                const ulElement5days = document.querySelector('.days5');
                ulElement.innerHTML = ''; // Очищаем текущие элементы
                data.forecast.forecastday.forEach((item) => {
                    
                    let maxDayTempo = Math.floor(item.day.maxtemp_c);
                    let minDayTempo = Math.floor(item.day.mintemp_c);
                    let formatDate = formatDateFromApi(item.date);
                    function formatDateFromApi(dateString) {
                        // Создаем объект Date на основе строки, которую возвращает API
                        const date = new Date(dateString);
                        
                        // Массивы с днями недели и месяцами на русском языке
                        const daysOfWeek = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
                        const months = ['янв.', 'февр.', 'мар.', 'апр.', 'май', 'июн.', 'июл.', 'авг.', 'сент.', 'окт.', 'нояб.', 'дек.'];
                    
                        // Получаем день недели, число и месяц
                        const dayOfWeek = daysOfWeek[date.getDay()];
                        const dayOfMonth = date.getDate();
                        const month = months[date.getMonth()];
                    
                        // Формируем строку вида "Вт, 22 окт."
                        return `${dayOfWeek}, ${dayOfMonth} ${month}`;
                    }

                    let timeSetter5Days = () => { //Вводим 5 дней в слайдер
                            const li = document.createElement('li');
                            li.classList.add('items-inner__item');
                        
                            const dateParagraph = document.createElement('p');
                            dateParagraph.classList.add('items-inner__item-p');
                            dateParagraph.textContent = formatDate; // Используем hourItem для получения времени
                            li.appendChild(dateParagraph);
    
                            const img = document.createElement('img');
                            img.classList.add('items-inner__item-img');
                            img.src = item.day.condition.icon;
                            img.alt = 'weather-state';
                            img.loading = 'lazy';
                            li.appendChild(img);
    
                            const degreeParagraph = document.createElement('p');
                            degreeParagraph.classList.add('items-inner__item-p');
                            degreeParagraph.innerHTML = 'от ' + Math.floor(minDayTempo) + "&deg;" + ' до ' + Math.floor(maxDayTempo) + "&deg;";
                            li.appendChild(degreeParagraph);
    
                            ulElement5days.appendChild(li);
                    };
                    
                    timeSetter5Days();

                    item.hour.forEach((hourItem) => { //Вводим погоду на 24 часа
                        function compareTimeWithNow(time) {
                                const now = new Date();
                                const currentHours = now.getHours();
                                const currentMinutes = now.getMinutes();

                                const currentDateString  = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();

                                const currentTimeInMinutes = currentHours * 60 + currentMinutes;

                                const [hours, minutes] = time.split(':').map(Number);

                                const apiDateString = hourItem.time.slice(0, 10); // Получаем только дату из строки

                                let today;

                                if (currentDateString === apiDateString) {
                                    today = false; // Даты совпадают
                                } else {
                                    today = true; // Даты не совпадают
                                }
                                
                                const inputTimeInMinutes = hours * 60 + minutes;

                                let timeSetter = (timeHours) => {

                                    if ((timeHours % 3 === 0 || timeHours == 0) && today === false){
                                        if (inputTimeInMinutes > currentTimeInMinutes || (inputTimeInMinutes === 0 && today)) {
                                            const li = document.createElement('li');
                                            li.classList.add('items-inner__item');
                                            li.classList.toggle('today');

                                            const dateParagraph = document.createElement('p');
                                            dateParagraph.classList.add('items-inner__item-p');
                                            dateParagraph.textContent = hourItem.time.slice(-5); // Используем hourItem для получения времени
                                            li.appendChild(dateParagraph);
                    
                                            const img = document.createElement('img');
                                            img.classList.add('items-inner__item-img');
                                            img.src = hourItem.condition.icon;
                                            img.alt = 'weather-state';
                                            img.loading = 'lazy';
                                            li.appendChild(img);
                    
                                            const degreeParagraph = document.createElement('p');
                                            degreeParagraph.classList.add('items-inner__item-p');
                                            degreeParagraph.innerHTML = Math.floor(hourItem.temp_c) + "&deg;";
                                            li.appendChild(degreeParagraph);
                    
                                            ulElement.appendChild(li);
                                        }           
                                    } else if ((timeHours % 3 === 0 || timeHours == 0) && today === true){
                                        const li = document.createElement('li');
                                        li.classList.add('items-inner__item');
                
                                        const dateParagraph = document.createElement('p');
                                        dateParagraph.classList.add('items-inner__item-p');
                                        dateParagraph.textContent = hourItem.time.slice(-5); // Используем hourItem для получения времени
                                        li.appendChild(dateParagraph);
                
                                        const img = document.createElement('img');
                                        img.classList.add('items-inner__item-img');
                                        img.src = hourItem.condition.icon;
                                        img.alt = 'weather-state';
                                        img.loading = 'lazy';
                                        li.appendChild(img);
                
                                        const degreeParagraph = document.createElement('p');
                                        degreeParagraph.classList.add('items-inner__item-p');
                                        degreeParagraph.innerHTML = Math.floor(hourItem.temp_c) + "&deg;";
                                        li.appendChild(degreeParagraph);
                
                                        ulElement.appendChild(li);
                                    }
                                };

                                timeSetter(hours);
                        }
                        compareTimeWithNow(hourItem.time.slice(-5));
                    });
                });

                let ButtonDataActive = () => {
                    if ( data) {
                        dayButton.classList.add('select');
                        show5DaysButton.classList.remove('select');
                    } else {
                        weekButton.classList.add('select');
                        show5DaysButton.classList.remove('select');
                    }
                }

                ButtonDataActive();
        }
        // Изначально отображаем данные за 24 часа
        renderWeatherData(data);

        let scrollButtonsListeners = (listItems) => {

            const list = document.querySelector(listItems);
            const prevButton = document.querySelector('.--left');
            const nextButton = document.querySelector('.--right');
            const maskPosition = document.querySelector('.slider__items-wrapper');
            const itemWidth = list.querySelector('li').offsetWidth + 16; // ширина элемента плюс отступ
            let scrollPosition = 0;
        
            function updateButtons() {
                if (scrollPosition <= 0) {
                    prevButton.classList.remove('active');
                    nextButton.classList.add('active');
                    maskPosition.style.setProperty("mask", "linear-gradient(90deg, #000 95%, transparent)");
                } else if (scrollPosition >= list.scrollWidth - list.clientWidth) {
                    prevButton.classList.add('active');
                    nextButton.classList.remove('active');
                    maskPosition.style.setProperty("mask", "linear-gradient(270deg, #000 95%, transparent)");
                } else {
                    prevButton.classList.add('active');
                    nextButton.classList.add('active');
                    maskPosition.style.setProperty("mask", "radial-gradient(circle, #000 90%, transparent 100%)");
                }
            }
        
            function smoothScroll(targetPosition) {
                const startPosition = list.scrollLeft;
                const distance = targetPosition - startPosition;
                const duration = 400; // Длительность анимации в миллисекундах
                let startTime = null;
        
                function animation(currentTime) {
                    if (startTime === null) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
                    list.scrollLeft = run;
        
                    if (timeElapsed < duration) {
                        requestAnimationFrame(animation);
                    }
                }
        
                function easeInOutQuad(t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) return c / 2 * t * t + b;
                    t--;
                    return -c / 2 * (t * (t - 2) - 1) + b;
                }
        
                requestAnimationFrame(animation);
            }
        
            nextButton.addEventListener('click', () => {
                const remainingScroll = list.scrollWidth - list.clientWidth - scrollPosition;
                const scrollAmount = Math.min(itemWidth, remainingScroll);
        
                if (scrollAmount > 0) {
                    scrollPosition += scrollAmount;
                    smoothScroll(scrollPosition);
                    updateButtons();
                }
            });
        
            prevButton.addEventListener('click', () => {
                const scrollAmount = Math.min(itemWidth, scrollPosition);
        
                if (scrollAmount > 0) {
                    scrollPosition -= scrollAmount;
                    smoothScroll(scrollPosition);
                    updateButtons();
                }
            });
        
            updateButtons();
        };
        
        
        setTimeout(scrollButtonsListeners('.slider__items-inner'),100);
    }

