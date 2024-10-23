const CloseBtn = document.querySelector('.about-me__tab-close');
const OpenBtn = document.querySelector('.bio');
const OpenSkillsBtn = document.querySelector('.skills');

// CloseBtn.addEventListener('click', function() {
//     const tabCls = document.querySelector('.about-me__tab');
//     const windowCls = document.querySelector('.about-me__main');
//     OpenBtn.className = 'about-me__accordeon-p bio';
//     tabCls.style.display = 'none';
//     windowCls.style.display = 'none';
// });

document.querySelector('.about-me__info-header').addEventListener('click', function(event){
    if (event.target.classList.contains('close')) {
        const close = event.target.closest('.about-me__tab');
        
        if (close) {
            close.style.display = 'none';  // Скрываем текущий таб
            console.log(close);
            
            // Проверяем наличие класса "about"
            if (close.classList.contains('about')) {
                const aboutMain = document.querySelector('.about-me__main');
                if (aboutMain) {
                    aboutMain.style.display = 'none';  // Скрываем блок about-me__main
                    OpenBtn.className = 'about-me__accordeon-p bio';
                }
            } else {
                const skillsBlock = document.querySelector('.about-me__skills');
                if (skillsBlock) {
                    skillsBlock.style.display = 'none';  // Скрываем блок about-me__skills
                    OpenSkillsBtn.className = 'about-me__accordeon-p skills';
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

document.querySelector('.about-me__navigation').addEventListener('click', function(event){
    if (event.target.classList.contains('bio')) {
        const tabCls = document.querySelector('.about-me__tab.about');
        const windowCls = document.querySelector('.about-me__main');
        OpenBtn.className = 'about-me__accordeon-p bio active';
        tabCls.style.display = 'flex';
        windowCls.style.display = 'flex';
    }

    if (event.target.classList.contains('skills')) {
        const tabCls = document.querySelector('.about-me__tab.skill');
        const windowCls = document.querySelector('.about-me__skills');
        OpenSkillsBtn.className = 'about-me__accordeon-p skills active';
        tabCls.style.display = 'flex';
        windowCls.style.display = 'flex';
    }

})

