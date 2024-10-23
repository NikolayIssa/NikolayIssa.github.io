const NewItemsData = [
    {
        title:'Китайский яичный суп',
        discription:'Традиционный китайский суп с яйцом и томатами черри',
        cost:'350',
        image:'./src-resto/images/new_product/image1.jpg',
        isSubcomponentNeed: true,
        subcomponentsnum: [6],
    },
    {
        title:'Паэлья',
        discription:'Традиционное испанское блюдо — рис, колбаски чоризо, куриное бедро, кальмар, кукуруза, горошек, специи',
        cost:'660',
        image:'./src-resto/images/new_product/image2.jpg',
        isSubcomponentNeed: true,
        subcomponentsnum: [6],
    },
    {
        title:'Биф Бургеньон',
        discription:'Блюдо французской кухни — тушёные кусочки говядины с картофелем и болгарским перцем',
        cost:'630',
        image:'./src-resto/images/new_product/image3.jpg',
        isSubcomponentNeed: false,
    },
    {
        title:'Битые огурцы',
        discription:'Салат из свежих битых огурцов с уйгурским соусом, кешью и кунжутом',
        cost:'320',
        image:'./src-resto/images/new_product/image4.jpg',
        isSubcomponentNeed: true,
        subcomponentsnum: [6],
    },
]

const PopularItemsData = [
    {
        title:'Пепперони',
        discription:'Просто и вкусно - томатная основа маринара, колбаски пепперони и сыр моцарелла',
        cost:'660',
        image:'./src-resto/images/new_product/image5.jpg',
        isSubcomponentNeed: true,
        subcomponentsnum: [6],
    },
    {
        title:'Груша Горгонзола',
        discription:'Нежная пицца на основе сливочного соуса с сыром горгондзола, грушей, медом и кедровыми орехами',
        cost:'780',
        image:'./src-resto/images/new_product/image6.jpg',
        isSubcomponentNeed: true,
        subcomponentsnum: [6],
    },
    {
        title:'Фо Бо',
        discription:'Вьетнамский суп с рисовой лапшой, в котором используется говядина, свежая зелень и ростки сои. Подают с добавками, такими как мята, долька лайма, острый соус шрирача, азиатский уксус и лаоганма',
        cost:'490',
        isSubcomponentNeed: false,
        image:'./src-resto/images/new_product/image7.jpg',
    },
    {
        title:'Том Ям с морепродуктами',
        discription:'Просто и вкусно - томатная основа маринара, колбаски пепперони и сыр моцарелла',
        cost:'590',
        image:'./src-resto/images/new_product/image8.jpg',
        isSubcomponentNeed: true,
        subcomponentsnum: [5,4],
    },
]

const renderItems = (dataArray, listSelector) => {
    const list = document.querySelector(listSelector);
    
    dataArray.forEach(data => {
        const item = document.createElement('article');
        item.className = `${listSelector.includes('new-products') ? 'new-products' : 'popular-products'}__item`;
        
        const badges = [
            './src-resto/images/icons/badge/beef.svg',
            './src-resto/images/icons/badge/chief.svg',
            './src-resto/images/icons/badge/hit.svg',
            './src-resto/images/icons/badge/new.svg',
            './src-resto/images/icons/badge/seafood.svg',
            './src-resto/images/icons/badge/sharp.svg',
            './src-resto/images/icons/badge/vegetarian.svg',
        ];

        let badgesHTML = '';
        if (data.isSubcomponentNeed) {
            data.subcomponentsnum?.forEach(index => {
                if (badges[index]) {
                    badgesHTML += `<img class="${listSelector.includes('new-products') ? 'new-products' : 'popular-products'}__item-badge" src="${badges[index]}" alt="badge ${index}"/>`;
                }
            });
        }

        item.innerHTML = `
            <img
                class="${listSelector.includes('new-products') ? 'new-products' : 'popular-products'}__item-img"
                src="${data.image}"
                alt="${data.title}"
                loading="lazy"
            />
            <div class="${listSelector.includes('new-products') ? 'new-products' : 'popular-products'}__item-badges">
                ${badgesHTML}
            </div>
            <div class="${listSelector.includes('new-products') ? 'new-products' : 'popular-products'}__item-discription">
                <h2 class="discription-title">${data.title}</h2>
                <p class="discription-text">${data.discription}</p>
            </div>
            <button class="${listSelector.includes('new-products') ? 'new-products' : 'popular-products'}__item-button">
                <span>${data.cost} ₽</span>
            </button>
            <a class="${listSelector.includes('new-products') ? 'new-products' : 'popular-products'}__link" href="#"></a>
        `;

        list.appendChild(item);
    });
}

renderItems(NewItemsData, ".new-products__list");
renderItems(PopularItemsData, ".popular-products__list");