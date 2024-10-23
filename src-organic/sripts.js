// const arr = [
//     {
//         id: 1,
//         name:'Munch Crunchy Cookies',
//         cost:'text',
//     },
//     {
//         id: 1,
//         name:'Munch Crunchy Cookies',
//         cost:'text2',
//         img:'/src/products-images/product-thumb-1.png',
//     }
// ]


// const html = arr.map((item) => `
// <li>
//                     <img src=${item.img} alt="">
//                     <p>${item.name}</p>
//                     <p class="item--cost">${item.cost}</p>
//                     <div class="item--rating">
//                         <img src="/src/icons/ic_round-star-rate.svg" alt="">
//                         <img src="/src/icons/ic_round-star-rate.svg" alt="">
//                         <img src="/src/icons/ic_round-star-rate.svg" alt="">
//                         <img src="/src/icons/ic_round-star-rate.svg" alt="">
//                         <img src="/src/icons/ic_round-star-rate.svg" alt="">
//                     </div>

//                     <div class="hover--content">
//                         <div class="item--buttonsCount">
//                             <button class="buttonCount--button minus transparentButtons">-</button>
//                             <input type="text" class="transparentButtons">
//                             <button class="buttonCount--button plus transparentButtons">+</button>
//                         </div>
//                         <div class="item--buttons">
//                             <button class="buttons--button Add"><p>add to cart</p></button>
//                             <button class="buttons--button like">
//                                 <svg width="20" height="20" viewBox="0 0 19 14" xmlns="http://www.w3.org/2000/svg">
//                                     <g clip-path="url(#clip0_3_1683)">
//                                     <path d="M9.50035 1.4207C8.68315 0.669275 7.61351 0.252232 6.50335 0.252197C5.91576 0.252809 5.33408 0.369617 4.79181 0.595899C4.24953 0.82218 3.75735 1.15347 3.3436 1.5707C1.57885 3.34295 1.5796 6.11495 3.3451 7.8797L8.8441 13.3787C8.9716 13.6029 9.2176 13.7477 9.50035 13.7477C9.61645 13.7466 9.73067 13.7182 9.83383 13.665C9.93699 13.6117 10.0262 13.535 10.0944 13.4409L15.6556 7.8797C17.4211 6.1142 17.4211 3.34295 15.6541 1.5677C15.2406 1.15123 14.7488 0.82062 14.207 0.59486C13.6653 0.369099 13.0843 0.252647 12.4974 0.252197C11.3872 0.252379 10.3176 0.669402 9.50035 1.4207ZM14.5936 2.6282C15.7659 3.80645 15.7666 5.64695 14.5951 6.8192L9.50035 11.9139L4.4056 6.8192C3.2341 5.64695 3.23485 3.80645 4.4041 2.6312C4.9741 2.0642 5.7196 1.7522 6.50335 1.7522C7.2871 1.7522 8.0296 2.0642 8.5951 2.6297L8.9701 3.0047C9.03969 3.07441 9.12235 3.12971 9.21333 3.16744C9.30432 3.20518 9.40185 3.2246 9.50035 3.2246C9.59885 3.2246 9.69639 3.20518 9.78737 3.16744C9.87836 3.12971 9.96101 3.07441 10.0306 3.0047L10.4056 2.6297C11.5396 1.49795 13.4611 1.50095 14.5936 2.6282Z" fill="black"/>
//                                     </g>
//                                     <defs>
//                                     <clipPath id="clip0_3_1683">
//                                     <rect width="18.959" height="13.4955" fill="white" transform="translate(0.0205078 0.252197)"/>
//                                     </clipPath>
//                                     </defs>
//                                     </svg>
                                    
//                             </button>
//                         </div>
//                     </div>
//                 </li>`).join('');
// document.querySelector('.items__list--table').innerHTML = html;

document.addEventListener('DOMContentLoaded', function() {
    const list = document.querySelector('.popular_items--list');
    const prevButton = document.querySelector('.pagination__button.prev');
    const nextButton = document.querySelector('.pagination__button.next');
    const itemWidth = list.querySelector('li').offsetWidth; // ширина элемента плюс отступ
    let scrollPosition = 0;

    function updateButtons() {
        // Если прокрутили до начала списка
        if (scrollPosition <= 0) {
            prevButton.classList.remove('active');
            nextButton.classList.add('active');
        } 
        // Если прокрутили до конца списка
        else if (scrollPosition >= list.scrollWidth - list.clientWidth) {
            prevButton.classList.add('active');
            nextButton.classList.remove('active');
        } 
        // В промежуточном состоянии
        else {
            prevButton.classList.remove('active');
            nextButton.classList.add('active');
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

    // Инициализация начального состояния кнопок
    updateButtons();
});

document.addEventListener('DOMContentLoaded', function() {
    const list = document.querySelector('.short');
    const prevButton = document.querySelector('.pagination__button.prev.bestSeilingBlock');
    const nextButton = document.querySelector('.pagination__button.next.bestSeilingBlock');
    const itemWidth = list.querySelector('li').offsetWidth; // ширина элемента плюс отступ
    let scrollPosition = 0;

    function updateButtons() {
        // Если прокрутили до начала списка
        if (scrollPosition <= 0) {
            prevButton.classList.remove('active');
            nextButton.classList.add('active');
        } 
        // Если прокрутили до конца списка
        else if (scrollPosition >= list.scrollWidth - list.clientWidth) {
            prevButton.classList.add('active');
            nextButton.classList.remove('active');
        } 
        // В промежуточном состоянии
        else {
            prevButton.classList.remove('active');
            nextButton.classList.add('active');
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

    // Инициализация начального состояния кнопок
    updateButtons();
});

document.addEventListener('DOMContentLoaded', function() {
    const list = document.querySelector('.ProdOnSaleList');
    const prevButton = document.querySelector('.pagination__button.prev.ProdOnSaleBlock');
    const nextButton = document.querySelector('.pagination__button.next.ProdOnSaleBlock');
    const itemWidth = list.querySelector('li').offsetWidth; // ширина элемента плюс отступ
    let scrollPosition = 0;

    function updateButtons() {
        // Если прокрутили до начала списка
        if (scrollPosition <= 0) {
            prevButton.classList.remove('active');
            nextButton.classList.add('active');
        } 
        // Если прокрутили до конца списка
        else if (scrollPosition >= list.scrollWidth - list.clientWidth) {
            prevButton.classList.add('active');
            nextButton.classList.remove('active');
        } 
        // В промежуточном состоянии
        else {
            prevButton.classList.remove('active');
            nextButton.classList.add('active');
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

    // Инициализация начального состояния кнопок
    updateButtons();
});

document.querySelectorAll('.item--buttonsCount').forEach((counterElement) => {
    const minusButton = counterElement.querySelector('.minus');
    const plusButton = counterElement.querySelector('.plus');
    const inputField = counterElement.querySelector('input');

    // Устанавливаем начальное значение
    let count = 0;
    inputField.value = count;

    // Уменьшение количества
    minusButton.addEventListener('click', () => {
        if (count > 0) {
            count--;
            inputField.value = count;
        }
    });

    // Увеличение количества
    plusButton.addEventListener('click', () => {
        count++;
        inputField.value = count;
    });

    // Обработка ручного ввода
    inputField.addEventListener('input', () => {
        let value = parseInt(inputField.value);
        if (isNaN(value) || value < 0) {
            value = 0;
        }
        count = value;
        inputField.value = count;
    });
});


document.querySelectorAll('.buttons-button.like')