export function scrollButtonsListeners(listItems){
    // console.log('done');
    // const list = document.querySelector('.slider__items-inner');
    const list = document.querySelector(listItems);
    const prevButton = document.querySelector('.--left');
    const nextButton = document.querySelector('.--right');
    const maskPosition = document.querySelector('.crypto-blocks-wrapper');
    const itemWidth = list.querySelector('.crypto-blocks__item').offsetWidth + 30; // ширина элемента плюс отступ
    let scrollPosition = 0;

        function updateButtons() {
        // Если прокрутили до начала списка
        if (scrollPosition <= 0) {
            prevButton.classList.remove('active');
            nextButton.classList.add('active');
            maskPosition.style.setProperty("mask", "linear-gradient(90deg, #000 90%, transparent)");
        } 
        // Если прокрутили до конца списка
        else if (scrollPosition >= list.scrollWidth - list.clientWidth) {
            prevButton.classList.add('active');
            nextButton.classList.remove('active');
            maskPosition.style.setProperty("mask", "linear-gradient(270deg, #000 90%, transparent)");
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

   