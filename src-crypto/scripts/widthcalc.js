// function updateAsideWidth() {
//     const viewPort = document.documentElement.scrollWidth;
//     const main = document.querySelector('.main');
//     const mainWidth = main.offsetWidth; // Получаем текущую ширину aside
//     const aside = document.querySelector('.aside');
//     const asideWidth = aside.offsetWidth;
//     let calculateWidth = viewPort - asideWidth;
//     main.style.setProperty('width', `${calculateWidth}px`);
//     console.log(calculateWidth);
// }

// // Вызываем функцию при загрузке страницы и изменении размера окна
// window.addEventListener('load', updateAsideWidth);
// window.addEventListener('resize', updateAsideWidth);