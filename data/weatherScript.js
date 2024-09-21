
    import { weatherDataSlider24hours, weatherDataSliderWeek, weatherData } from "./data.js";

    let setHumidityInfo = () => {
        //Влажность
        const humidityItem = document.querySelector('.humidity');
        humidityItem.querySelector('.weather__details-value').textContent = `${weatherData.humidity.value} %`;
        humidityItem.querySelector('.weather__details-range--substract').style.setProperty('--mask-position', weatherData.humidity.value + '%');
    }
    // Давление
    let setPressureInfo = () => {
        let preassureValue = weatherData.pressure.value;

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
                pressureItem.querySelector('.weather__details-value').textContent = weatherData.pressure.value;
                pressureItem.querySelector('.weather__details-range--substract').style.setProperty('--mask-position', preassureRange + '%');
                pressureItem.querySelector('.weather__details-range-text').textContent = preassureClass;
    }
    // Видимость
    let setVisibilityInfo = () => {
        let visibilityValue = weatherData.visibility.value;

        let visibilityRange = visibilityValue;

        if (visibilityRange > 100) {
        visibilityRange = 93;
        }

        let visibilityClass = '';

        if (weatherData.visibility.value <= 5) {
        visibilityClass = 'Недостаточная';
        } else if (weatherData.visibility.value > 5 && weatherData.visibility.value <= 30) {
            visibilityClass = 'Нормальная';
        } else if (weatherData.visibility.value > 30) {
            visibilityClass = 'Отличная';
        } else {
        visibilityClass = 'Ошибка';;
        }

        const visibilityItem = document.querySelector('.visibility');
        visibilityItem.querySelector('.weather__details-value').textContent = `${weatherData.visibility.value} км`;
        visibilityItem.querySelector('.weather__details-range--substract').style.setProperty('--mask-position', visibilityRange + '%');
        visibilityItem.querySelector('.weather__details-range-text').textContent = visibilityClass;
    }
    // Рассвет и закат
    let setSunriseAndSunset = () => {
        document.querySelector('.sunrise .weather__details-value').textContent = weatherData.sunrise.value;
        document.querySelector('.sunrise .range-text.time').textContent = weatherData.sunrise.timePassed;

        document.querySelector('.sunset .weather__details-value').textContent = weatherData.sunset.value;
        document.querySelector('.sunset .range-text.time').textContent = weatherData.sunset.timeRemaining;
    }
    // Сила ветра
    let setWindSpeed = () => {
        const windItem = document.querySelector('.wind');
        windItem.querySelector('.weather__details-value').textContent = weatherData.windSpeed.value;
        windItem.querySelector('.weather__details-range-text').textContent = weatherData.windSpeed.windDirection;
    }


    let sliderOptions = () => {
        let currentData = weatherDataSlider24hours;

        const dayButton = document.querySelector('.day');

        const weekButton = document.querySelector('.week');

            function renderWeatherData(data) {
                const ulElement = document.querySelector('.slider__items-inner');
                ulElement.innerHTML = ''; // Очищаем текущие элементы

                data.forEach((item) => {
                    const li = document.createElement('li');
                    li.classList.add('items-inner__item');

                    const dateParagraph = document.createElement('p');
                    dateParagraph.classList.add('items-inner__item-p');
                    dateParagraph.textContent = item.date;
                    li.appendChild(dateParagraph);

                    const img = document.createElement('img');
                    img.classList.add('items-inner__item-img');
                    img.src = "./public/icons/weather_states/" + item.img;
                    img.alt = 'weather-state';
                    img.loading = 'lazy';
                    li.appendChild(img);

                    const degreeParagraph = document.createElement('p');
                    degreeParagraph.classList.add('items-inner__item-p');
                    degreeParagraph.textContent = item.degree;
                    li.appendChild(degreeParagraph);

                    ulElement.appendChild(li);
                });

                    let ButtonDataActive = () => {
                        if ( data === weatherDataSlider24hours) {
                            dayButton.classList.add('select');
                            weekButton.classList.remove('select');
                        } else {
                            weekButton.classList.add('select');
                            dayButton.classList.remove('select');
                        }
                    }

        ButtonDataActive();
    }

    // Изначально отображаем данные за 24 часа
    renderWeatherData(currentData);

    // Меняем данные при нажатии на кнопку
    let changeDataSlider = () => {
        weekButton.addEventListener('click', () => {
            currentData === weatherDataSlider24hours
            currentData = weatherDataSliderWeek;
            renderWeatherData(currentData);
        });

        dayButton.addEventListener('click', () => {
            currentData === weatherDataSliderWeek
            currentData = weatherDataSlider24hours;
            renderWeatherData(currentData);
        });
    }

    changeDataSlider();

    let scrollButtonsListeners = () => {

      const list = document.querySelector('.slider__items-inner');
      const prevButton = document.querySelector('.--left');
      const nextButton = document.querySelector('.--right');
      const maskPosition = document.querySelector('.slider__items-wrapper');
      const itemWidth = list.querySelector('li').offsetWidth + 16; // ширина элемента плюс отступ
      let scrollPosition = 0;

        function updateButtons() {
          // Если прокрутили до начала списка
          if (scrollPosition <= 0) {
              prevButton.classList.remove('active');
              nextButton.classList.add('active');
              maskPosition.style.setProperty("mask", "linear-gradient(90deg, #000 95%, transparent)");
          } 
          // Если прокрутили до конца списка
          else if (scrollPosition >= list.scrollWidth - list.clientWidth) {
              prevButton.classList.add('active');
              nextButton.classList.remove('active');
              maskPosition.style.setProperty("mask", "linear-gradient(270deg, #000 95%, transparent)");
          } 
          // В промежуточном состоянии
          else {
              prevButton.classList.add('active');
              nextButton.classList.add('active');
              maskPosition.style.setProperty("mask", "radial-gradient(circle, #000 90%, transparent 100%)");
          }
        }

        nextButton.addEventListener('click', () => {
          if (scrollPosition < list.scrollWidth - list.clientWidth) {
              scrollPosition += itemWidth; // Прокручиваем на 1 элемент вперед
              list.scrollTo({
                  left: scrollPosition,
                  behavior: 'smooth'
              });
              updateButtons();
            }
        });

        prevButton.addEventListener('click', () => {
            if (scrollPosition > 0) {
                scrollPosition -= itemWidth; // Прокручиваем на 1 элемент назад
                list.scrollTo({
                    left: scrollPosition,
                    behavior: 'smooth'
                });
                updateButtons();
            }
        });

      updateButtons();
    }

    setTimeout(scrollButtonsListeners,1000);
    }

    sliderOptions();
    setHumidityInfo();
    setPressureInfo();
    setVisibilityInfo();
    setSunriseAndSunset();
    setWindSpeed();
