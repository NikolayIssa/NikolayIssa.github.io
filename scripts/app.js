document.querySelector('.about-me__info-header').addEventListener('click', function(event){
    if (event.target.classList.contains('close')) {
        const close = event.target.closest('.about-me__tab');
        const OpenBtn = document.querySelector('.browse[data-accordeon="bio"]');
        const OpenSkillsBtn = document.querySelector('.browse[data-accordeon="skills"]');
        
        if (close) {
            close.style.display = 'none';  // Скрываем текущий таб
            console.log(close);
            
            // Проверяем наличие класса "about"
            if (close.classList.contains('about')) {
                const aboutMain = document.querySelector('.about-me__main');
                if (aboutMain) {
                    aboutMain.style.display = 'none';  // Скрываем блок about-me__main
                    document.querySelector('.inner[data-accordeon="bio"]').classList.remove('active');
                    console.debug(document.querySelector('.inner[data-accordeon="bio"]'));
                }
            } else {
                const skillsBlock = document.querySelector('.about-me__skills');
                if (skillsBlock) {
                    skillsBlock.style.display = 'none';  // Скрываем блок about-me__skills
                    document.querySelector('.inner[data-accordeon="skills"]').classList.remove('active');
                }
            }
        }
    }
})




// OpenBtn.addEventListener('click', function() {
//     const tabCls = document.querySelector('.about-me__tab');
//     const windowCls = document.querySelector('.about-me__main');
//     OpenBtn.className = 'about-me__accordeon-p bio active';
//     tabCls.style.display = 'flex';
//     windowCls.style.display = 'flex';
// });

document.querySelector('.about-me__navigation').addEventListener('click', function(event) {
    function handleToggle(event) {
        // Найдем кнопки для bio и skills отдельно
        const OpenBtn = document.querySelector('.browse[data-accordeon="bio"]');
        const OpenSkillsBtn = document.querySelector('.browse[data-accordeon="skills"]');
    
        function toggleDisplay(targetClass, button, tabSelector, windowSelector, dataJs) {
            const tabCls = document.querySelector(tabSelector);
            const windowCls = document.querySelector(windowSelector);
            const innerBio = document.querySelector(dataJs);

            console.log(event.target.classList.contains(targetClass));
            console.log(event.target.classList);
            console.log(event.target);
            
            if (event.target.classList.contains(targetClass) && !button.closest('.inner').classList.contains('active')) {
                button.closest('.inner').classList.add('active');
                tabCls.style.display = 'flex';
                windowCls.style.display = 'flex';
            } else if (event.target.classList.contains(targetClass)) {
                button.closest('.inner').classList.remove('active');
                tabCls.style.display = 'none';
                windowCls.style.display = 'none';
            }
        }

        // Переключение для блока "bio"
        toggleDisplay('bioB', OpenBtn, '.about-me__tab.about', '.about-me__main', '.about-me__accordeon.inner[data-accordeon="bio"]');

        // Переключение для блока "skills"
        toggleDisplay('skillsS', OpenSkillsBtn, '.about-me__tab.skill', '.about-me__skills', '.about-me__accordeon.inner[data-accordeon="skills"]');
    };
    handleToggle(event);
});

document.querySelector('.about-me__navigation').addEventListener('click', function(event) {
    handleToggle(event);
});

function handleToggle(event) {
    // Найдем кнопки для bio и skills отдельно
    const OpenBtn = document.querySelector('.about-me__accordeon-p.bio');
    const OpenSkillsBtn = document.querySelector('.about-me__accordeon-p.skills');

    function toggleDisplay(targetClass, button, tabSelector, windowSelector, dataJs) {
        const tabCls = document.querySelector(tabSelector);
        const windowCls = document.querySelector(windowSelector);
        const innerBio = document.querySelector(dataJs);
        
        if (event.target.classList.contains(targetClass) && !button.classList.contains('active')) {
            button.classList.add('active');
            innerBio.style.height = '20px';
            // tabCls.style.display = 'flex';
            // windowCls.style.display = 'flex';
        } else if (event.target.classList.contains(targetClass)) {
            button.classList.remove('active');
            innerBio.style.height = '0px';
            // tabCls.style.display = 'none';
            // windowCls.style.display = 'none';
        }
    }

    // Переключение для блока "bio"
    toggleDisplay('bio', OpenBtn, '.about-me__tab.about', '.about-me__main', '.about-me__accordeon.inner[data-accordeon="bio"]');

    // Переключение для блока "skills"
    toggleDisplay('skills', OpenSkillsBtn, '.about-me__tab.skill', '.about-me__skills', '.about-me__accordeon.inner[data-accordeon="skills"]');
}



