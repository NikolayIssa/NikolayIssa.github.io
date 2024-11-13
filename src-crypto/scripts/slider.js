export function scrollButtonsListeners(listItems){
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
    
    }

   