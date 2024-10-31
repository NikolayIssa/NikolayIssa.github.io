document.addEventListener('click', (event)=>{
    if (event.target.classList.contains("close") || event.target.classList.contains("modal__market")){
        console.log('click');
        CloseModal();
    }

    if (event.target.classList.contains("open")){
        OpenModal();
    }
});

let CloseModal = () => {
    document.querySelector('.modal__market').style.display = 'none';
    document.body.style.overflow = "";
}

let OpenModal = () => {
    document.querySelector('.modal__market').style.display = 'flex';
    document.body.style.overflow = "hidden";
}