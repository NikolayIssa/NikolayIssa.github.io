document.addEventListener('click', (event) => {
    if (event.target.classList.contains('chart-main__option-arrow')) {
        console.log('click');
        const blockToOpen = document.querySelector('.chart-main__option');

        if (blockToOpen.style.height !== '32px') {
            blockToOpen.style.height = '32px'; // Скрываем блок
        } else {
            blockToOpen.style.height = '64px'; // Показываем блок
        }
    }
});



