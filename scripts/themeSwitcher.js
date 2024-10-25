const switchbtn = document.getElementById("themeBtn");
const root = document.querySelector(':root');
const body = document.querySelector('body');

function addButton(){
    const bodyInner = document.querySelector('.body_inner');
    const switchbtn = `
    <div class="theme-switcher">
      <button type="button" id="themeBtn">
      <img src="./src/images/icons/theme/moon.png" alt="theme" class="theme-img">
      </button>
    </div>
    `;
    bodyInner.insertAdjacentHTML('beforebegin', switchbtn);
}

function setScrollbarColor(trackColor, thumbColor) {
    // Проверяем, есть ли уже стиль для scrollbar, и если нет, создаем его
    let styleSheet = document.getElementById('scrollbar-style');
    if (!styleSheet) {
        styleSheet = document.createElement('style');
        styleSheet.id = 'scrollbar-style';
        document.head.appendChild(styleSheet);
    }

    // Заменяем или добавляем правило для всех элементов
    styleSheet.innerHTML = `* {
        scrollbar-width: auto;
        scrollbar-color: ${thumbColor} ${trackColor};
    }`;
}

addButton();

const onSwitchBtnClick = () => {
    root.classList.toggle('dark');
    const imgPath = document.querySelector('.theme-img');
    const currentTheme = root.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);

    if (root.classList.contains('dark')){
        body.style.backgroundImage = 'url(./src/images/background/protruding-squares-light.svg)';
        imgPath.setAttribute("src", "./src/images/icons/theme/moon.png");
        setScrollbarColor('#ffffff','#607b96');
    } else {
        body.style.backgroundImage = 'url(./src/images/background/protruding-squares.svg)';
        imgPath.setAttribute("src", "./src/images/icons/theme/sun.png");
        setScrollbarColor('#607b96','#011627');
    }
}

document.addEventListener('click', (event) =>{
    console.log('click');
    if (event.target.closest('.theme-switcher')){
        onSwitchBtnClick();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const root = document.documentElement;
    const imgPath = document.querySelector('.theme-img');
    if (savedTheme === 'dark') {
        root.classList.add('dark');
        document.body.style.backgroundImage = 'url(./src/images/background/protruding-squares-light.svg)';
        imgPath.setAttribute("src", "./src/images/icons/theme/moon.png");
    } else {
        root.classList.remove('dark');
        document.body.style.backgroundImage = 'url(./src/images/background/protruding-squares.svg)';
        imgPath.setAttribute("src", "./src/images/icons/theme/sun.png");
    }
});
