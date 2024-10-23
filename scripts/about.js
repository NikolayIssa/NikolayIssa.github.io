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
    },
    {
        img:'./src/images/icons/about.me/Skills/css3-fill.svg',
        range:'90',
    },
    {
        img:'./src/images/icons/about.me/Skills/javascript-fill.svg',
        range:'45',
    },
    {
        img:'./src/images/icons/about.me/Skills/reactjs-line.svg',
        range:'30',
    },
    {
        img:'./src/images/icons/footer/Frame.svg',
        range:'25',
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

