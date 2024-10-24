const burgerBtn = document.querySelector('.header-mobile__button');

burgerBtn.addEventListener("click", () => {
    const listBurger = document.querySelector('.header-mobile__nav');
    listBurger.classList.toggle('show');
});

// Создаем элемент подсветки
const light = document.createElement('div');
light.classList.add('mouse-light');
document.body.appendChild(light);

// Обработчик движения мыши
document.addEventListener('mousemove', function(e) {
    const mouseX = e.clientX; // Координата X курсора
    const mouseY = e.clientY; // Координата Y курсора

    // Центрируем элемент по координатам мыши
    light.style.left = `${mouseX}px`;
    light.style.top = `${mouseY}px`;
});