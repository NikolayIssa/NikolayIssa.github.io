const root = document.querySelector(':root');
const body = document.querySelector('.body');

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

const onSwitchBtnClick = () => {
    root.classList.toggle('dark');
    window.scrollTo(0,0);
    const currentTheme = root.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
    if (root.classList.contains('dark')){
        setScrollbarColor('#ffffff','#b3bac2');
    } else {
        setScrollbarColor('#31353f','#1b2028');
    }
}

document.addEventListener('click', (event) =>{
    if (event.target.classList.contains('theme-switcher')){
        onSwitchBtnClick();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const root = document.documentElement;
    if (savedTheme === 'dark') {
        root.classList.add('dark');
        setScrollbarColor('#ffffff','#b3bac2');
    } else {
        root.classList.remove('dark');
        setScrollbarColor('#31353f','#1b2028');
    }
});
