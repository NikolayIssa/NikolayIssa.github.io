const burgerBtn = document.querySelector('.header-mobile__button');

burgerBtn.addEventListener("click", () => {
    const listBurger = document.querySelector('.header-mobile__nav');
    listBurger.classList.toggle('show');
});