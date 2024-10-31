const navigation = [
    {
        img:'./src-crypto/public/src/img/icons/element-3.svg',
        name:'Overview',
        link:'#',
    },
    {
        img:'./src-crypto/public/src/img/icons/graph.svg',
        name:'Chart',
        link:'#',
    },
    {
        img:'./src-crypto/public/src/img/icons/wallet-2.svg',
        name:'Transactions',
        link:'#',
    },
    {
        img:'./src-crypto/public/src/img/icons/wallet-minus.svg',
        name:'Wallet',
        link:'#',
    },
    {
        img:'./src-crypto/public/src/img/icons/sms.svg',
        name:'News',
        link:'#',
    },
    {
        img:'./src-crypto/public/src/img/icons/message-text.svg',
        name:'Mail Box',
        link:'#',
    },
]

let ShowData = (list,arr) => {
    const listItems = document.querySelector(list);
    arr.forEach((data, index)=>{
        const li = document.createElement('li');  
        li.classList.add('aside__nav-item');

        if (index === 0) {
            li.classList.add('onpage');
        }

        li.innerHTML = `
            <img src="${data.img}" alt="" class="aside__nav-img" />
            <p class="aside__nav-item-p">${data.name}</p>
            <a href="${data.link}" class="aside__nav-link"></a>
        `;

        listItems.append(li);
    })
}

ShowData('.aside__nav-list',navigation);