const DataAboutMe = [
    'About me',
    'Я начинающий разработчик с хорошим знанием ',
    'HTML, CSS и JavaScript. Имею опыт работы с',
    'React и использую BEM для структурирования CSS.',
    'Знаком с основами Docker, умею настраивать кроссбраузерную ',
    'верстку и адаптировать страницы под различные устройства.',
    'Постоянно стремлюсь улучшать свои навыки и изучаю современные',
    'инструменты и технологии для разработки.',
    '',
    'Skills',
    'HTML5, CSS3, адаптивная и кроссбраузерная верстка',
    'JavaScript (ES6+) React. Методология BEM',
    'Docker (основы) Оптимизация производительности и UX',
    'Работа с Git',

]

const SkillsArr = [
    {
        img:'./src/images/icons/about.me/Skills/html5-fill.svg',
        range:'80',
        title: 'HTML',
        discription:'Опыт создания адаптивных и кроссбраузерных интерфейсов, знание методологии BEM. Умение вёрстать с макетов, стремление к pixel-perfect результатам.',
    },
    {
        img:'./src/images/icons/about.me/Skills/css3-fill.svg',
        range:'90',
        title: 'CSS',
        discription:'Знание основ CSS, включая работу с Flexbox и Grid, а также адаптивную вёрстку.',
    },
    {
        img:'./src/images/icons/about.me/Skills/javascript-fill.svg',
        range:'45',
        title: 'JS',
        discription:'Основы JavaScript, включая работу с DOM, событиями и асинхронными запросами.',
    },
    {
        img:'./src/images/icons/about.me/Skills/reactjs-line.svg',
        range:'30',
        title: 'REACT',
        discription:'Знания в создании компонентов, управлении состоянием и маршрутизации с использованием React Router.',
    },
    {
        img:'./src/images/icons/footer/Frame.svg',
        range:'25',
        title: 'GIT',
        discription:'Знание основных команд для создания и управления репозиториями.',
    },
]

function ArrayDataInputSkills (data,list){
    const listAppend = document.querySelector(list);

    data.forEach(data =>{
        const listItem = document.createElement('article');
        listItem.className = 'about-me__skills-item';
        listItem.innerHTML = `
                 <img
                    src="${data.img}"
                    alt="CSS"
                    class="about-me__skills-item_img"
                  />
                  <div class="about-me__range">
                    <div class="about-me__range-inner" style="width:${data.range}%"></div>
                  </div>

                  <div class="about-me__value">
                    <p class="about-me__value-p">0</p>
                    <p class="about-me__value-p">100</p>
                  </div>

                  <div class="about-me__discription" style="height: 30px;">
                    <p class="about-me__discription-title">Подробнее о ${data.title}</p>
                    <p class="about-me__discription-text">
                    ${data.discription}
                    </p>

                    <img
                      src="./src/images/icons/about.me/Skills/arrow-down-s-line.svg"
                      alt=""
                      class="about-me__discription-arrow"
                    />
                  </div>
        `

        listAppend.appendChild(listItem);
    });
}

function ArrayDataInput (data,list){
    const listAppend = document.querySelector(list);
    let counter = 2;

    data.forEach(item =>{
        const listItem = document.createElement('li');
        listItem.className = 'about-me__item';
        listItem.innerHTML = `
                  <span class="about-me__span">${counter}</span>
                  <p class="about-me__text">${item}</p>
        `
        listAppend.appendChild(listItem);
        counter++;
    });
}

ArrayDataInput(DataAboutMe,".about-me__list")
ArrayDataInputSkills(SkillsArr,".about-me__skills")

const arrowDiscription = document.querySelector('.about-me__discription-arrow');


let openInfoArrow = () => {
    arrowDiscription.style.transform = 'rotate(0deg)';
}

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('about-me__discription-arrow')) {
        event.target.style.transform = 'rotate(0deg)';
        const blockToOpen = event.target.parentNode;
        console.log(blockToOpen);

        if (blockToOpen.style.height != '30px') {
            blockToOpen.style.height = '30px'; // Скрываем блок
            event.target.style.transform = 'rotate(90deg)';
        } else {
            blockToOpen.style.height = blockToOpen.scrollHeight + 'px'; // Показываем блок
        }
        openInfoArrow();
    }
});
