
document.querySelectorAll('.projects__checkbox').forEach((checkbox) => {
    checkbox.addEventListener('change', function() {
      // Находим элемент-сосед
      const neighborElement = this.nextElementSibling;
      // Если чекбокс активен, то устанавливаем opacity в 1
      if (this.checked) {
        neighborElement.style.opacity = '1';
      } else {
        neighborElement.style.opacity = '0.4';
      }
    });
  });

  function filterItems(){
    const checkboxes = document.querySelectorAll('.projects__checkbox:checked');
    const selectedCategories = [];



    checkboxes.forEach(checkbox =>{
      selectedCategories.push(checkbox.value);
    });

    const items = document.querySelectorAll(".projects-examples__list article"); 

    items.forEach(item => {
      const itemCategory = item.getAttribute('data-category').split(',');

      const hasCategoryMatch = selectedCategories.some(category => itemCategory.includes(category.trim()));
      if (
        hasCategoryMatch || selectedCategories.length === 0// Если ничего не выбрано, показываем все элементы
      ) {
        item.style.display = ''; // Показываем элемент
      } else {
        item.style.display = 'none'; // Скрываем элемент
      }
    });
  }



  const ExamplesData = [
    {
        title:'_resto-app',
        image:'./src/images/sites-examples/resto.png',
        discription:'Сайт разработан в рамках проекта PREAX.',
        isSubcomponentNeed: true,
        subcomponentsnum: [1,2,4],
        link:'./indexresto.html',
        category: 'html,js,css',
    },
    {
        title:'_weather-app',
        image:'./src/images/sites-examples/weather.png',
        discription:'Сайт разработан в рамках проекта PREAX.',
        isSubcomponentNeed: true,
        subcomponentsnum: [1,2,4],
        link:'./index-weather.html',
        category: 'html,js,css',
    },
    {
        title:'_organic',
        image:'./src/images/sites-examples/show.png',
        discription:'Сайт сверстан с макета FIGMA, для практики.',
        isSubcomponentNeed: true,
        subcomponentsnum: [1,2],
        link:'./index-organic.html',
        category: 'html,css',
    },
]

const renderItems = (dataArray, listSelector) => {
    const list = document.querySelector(listSelector);
    
    let counter = 1;

    dataArray.forEach(data => {
        const item = document.createElement('article');
        item.className = `projects-examples__item animate__animated animate__fadeIn`;
        item.setAttribute('data-category', data.category);
        
        const badges = [
            `<div class="projects-examples__img-badge"> <svg width="2184" height="2500" viewBox="0 0 256 293" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><path d="M78.67 179.029c-4.65 2.907-11.656 7.619-17.076 12.743-8.898 8.403-10.76 20.059-6.066 22.782 4.342 2.517 14.479-.478 21.734-8.392 7.614-8.308 10.754-18.84 7.511-30.796-.381.227-.755.455-1.122.667l.008.017-.492.278c-1.893 1.13-3.44 2.063-4.497 2.7zm130.671-3.773c-2.634 5.725-2.766 7.566-1.966 8.14 3.822-1.373 10.145-4.682 10.195-13.55.008-1.328-.285-2.752-.755-4.242-4.086 3.618-6.441 7.406-7.474 9.652zm41.01-17.306c-10.21-1.19-18.177.242-24.36 2.818 1.145 2.98 2.025 6.083 2.149 9.21.287 6.863-4.437 11.942-9.36 15.569-2.875 2.114-5.934 3.523-8.502 4.374-2.053.865-4.782 1.76-6.719 1.365-4.27-.868-6.543-4.66-3.638-13.028 1.569-4.528 6.095-11.42 13.401-17.358-1.665-3.428-3.521-6.92-4.467-10.13-1.864-6.326-2.427-10.15-2.427-10.15s-6.022 12.486-13.791 23.84c-.448.66-.895 1.306-1.343 1.951 1.526 3.547 2.728 7.297 2.891 11.077.286 6.863-2.685 12.052-7.615 15.67-2.669 1.968-5.516 3.327-7.959 4.192-1.562.681-4.739 1.804-9.257 2.106-2.471.169-4.848.016-6.175-.99-1.827-1.38-2.047-3.084-1.101-5.41.8-1.976 6.785-8.808 11.803-14.79a123.815 123.815 0 0 0 3.887-4.903l-.029-.066s.909-1.173 2.384-3.221c-1.834-3.95-4.159-8.06-5.252-11.788-1.864-6.327-2.428-10.151-2.428-10.151s-6.104 15.649-12.463 28.14c-4.921 9.675-8.208 15.538-9.689 18.108l-.015.103s-.221.375-.602.962l-.285.476-.008-.044c-1.651 2.438-5.355 7.214-9.037 7.214-10.108 0-6.397-20.529-6.397-20.529s-2.955 7.605-6.286 14.13c-2.713 5.32-5.185 9.828-10.591 9.828-1.555 0-4.02-.044-6.067-1.99-4.643-4.411-8.193-15.612-7.497-24.287.594-7.376 1.731-12.486 3.286-16.748a336.981 336.981 0 0 0-9.242 5.219l-5.018 2.957.162.294c4.151 8.03 5.259 25.623-3.793 39.127-9.051 13.512-25.9 21.733-42.316 17.168-5.297-1.475-13.299-12.433-6.397-27.707 6.088-13.47 30.419-26.203 36.831-29.381l1.76-.97c-12.784-11.185-44.708-26.275-49.182-49.454-1.262-6.525 1.797-22.13 20.956-40.067 16.115-15.084 38.532-26.637 59.24-33.999 34.79-12.366 71.548-5.072 77.203 17.11 5.56 21.814-13.364 47.907-37.6 57.287-21.639 8.374-39.53 7.046-46.88 4.632-8.355-2.745-13.255-8.258-14.45-11.37-.47-1.219-1.278-3.266 0-3.97.784-.434 1.099-.33 3.197 1.989 1.996 2.202 10.02 8.11 25.263 6.4 40-4.484 64.095-35.584 56.481-52.319-5.332-11.713-36.162-16.998-74.68 2.21-47.019 23.442-49.571 42.768-49.974 50.108-1.101 20.192 24.902 30.813 38.972 45.829l.542.595c2.633-1.453 5.414-2.987 8.142-4.484a8176.293 8176.293 0 0 1 16.901-9.258c4.952-7.197 15-15.14 22.255-15.14 11.597 0 7.614 16.668 7.614 16.668s.235-.762.55-.77c.33-.008 1.607-2.196 5.187-.89 3.682 1.352 2.845 3.936 2.868 4.2.044.512-4.35 15.331-6.176 24.837-.874 4.536-.368 7.84-.11 7.84.359 0 1.093-1.154 1.775-2.393l-.015-.037s.513-.94 1.372-2.627l.169-.353.007.016a213.875 213.875 0 0 0 4.078-8.507c3.22-7.097 15.506-34.498 16.548-37.528 1.041-3.031 1.584-6.166 2.098-7.51.506-1.343 4.849-2.356 9.924-2.319 5.076.037 5.591 2.203 5.626 2.65.037.447-2.413 6.46-2.978 10.709-.557 4.25-.021 6.37.441 9.938.301 2.333 1.76 5.292 3.485 8.645 5.252-8.588 14.493-25.013 15.381-29.615.608-3.148 1.584-6.165 2.098-7.51.513-1.343 4.849-2.355 9.924-2.319 5.076.038 5.589 2.203 5.626 2.65.037.448-2.421 6.46-2.978 10.71-.558 4.242-.021 6.37.44 9.938.397 3.052 2.758 7.155 5.099 11.822 6.388-3.148 13.907-5.261 22.71-5.305 3.645-.022 7.878.344 10.064 1.026V80.055c0-4.954-2.539-9.52-6.829-11.993L134.616 1.855a13.78 13.78 0 0 0-13.812 0L6.573 68.03C2.289 70.504 0 75.076 0 80.022v132.47c0 4.946 2.303 9.519 6.58 11.992l114.415 66.225a13.645 13.645 0 0 0 13.76 0l114.467-66.226c4.283-2.48 6.778-7.047 6.778-11.992v-53.536c-1.453-.428-3.58-.765-5.649-1.006zm-123.232-6.938c-2.457 2.752-6.645 9.85-8.604 15.79-3.895 11.793-2.208 23.78.55 24.5 3.22.843 8.502-14.922 11.031-21.088 1.585-3.862 7.747-20.999 6.397-23.288-1.054-1.791-5.42-.345-9.374 4.087zm44.563 39.752s-.777.736-.441.94c.455.272 1.438-.08 2.509-.639 3.03-1.906 9.829-6.663 9.844-13.702 0-.206-.008-.404-.022-.617a276.359 276.359 0 0 1-4.284 5.475c-2.142 2.665-7.606 8.543-7.606 8.543z" fill="currentColor"/></svg></div>`,
            '<div class="projects-examples__img-badge"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 18.1778L16.6192 16.9222L17.2434 10.1444H9.02648L8.82219 7.88889H17.4477L17.6747 5.67778H6.32535L6.96091 12.3556H14.7806L14.5195 15.2222L12 15.8889L9.48045 15.2222L9.32156 13.3778H7.0517L7.38083 16.9222L12 18.1778ZM3 2H21L19.377 20L12 22L4.62295 20L3 2Z"></path></svg></div>',
            '<div class="projects-examples__img-badge"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5.00006 3L4.35006 6.34H17.9401L17.5001 8.5H3.92006L3.26006 11.83H16.8501L16.0901 15.64L10.6101 17.45L5.86006 15.64L6.19006 14H2.85006L2.06006 18L9.91006 21L18.9601 18L20.1601 11.97L20.4001 10.76L21.9401 3H5.00006Z"></path></svg></div>',
            '<div class="projects-examples__img-badge"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.001 13.5001C11.1725 13.5001 10.501 12.8285 10.501 12.0001C10.501 11.1716 11.1725 10.5001 12.001 10.5001C12.8294 10.5001 13.501 11.1716 13.501 12.0001C13.501 12.8285 12.8294 13.5001 12.001 13.5001ZM11.4733 16.4945C11.6479 16.705 11.8239 16.908 12.001 17.103C12.178 16.908 12.3541 16.705 12.5286 16.4945C12.3538 16.4982 12.1779 16.5001 12.001 16.5001C11.824 16.5001 11.6481 16.4982 11.4733 16.4945ZM9.47837 16.3694C8.6762 16.2846 7.91035 16.1603 7.19268 16.0016C7.11832 16.3512 7.06134 16.6904 7.02243 17.0166C6.83358 18.6 7.09805 19.5617 7.50098 19.7943C7.9039 20.0269 8.86893 19.7751 10.1458 18.8199C10.4088 18.6231 10.6741 18.4042 10.9397 18.1649C10.4434 17.6228 9.95287 17.0217 9.47837 16.3694ZM16.8093 16.0016C16.0916 16.1603 15.3257 16.2846 14.5236 16.3694C14.0491 17.0217 13.5585 17.6228 13.0622 18.1649C13.3279 18.4042 13.5931 18.6231 13.8562 18.8199C15.133 19.7751 16.0981 20.0269 16.501 19.7943C16.9039 19.5617 17.1684 18.6 16.9795 17.0166C16.9406 16.6904 16.8836 16.3512 16.8093 16.0016ZM18.2598 15.6136C18.8364 18.2526 18.5328 20.3533 17.251 21.0933C15.9691 21.8334 13.9981 21.046 12.001 19.2271C10.0038 21.046 8.03282 21.8334 6.75098 21.0933C5.46913 20.3533 5.16555 18.2526 5.74217 15.6136C3.16842 14.7935 1.50098 13.4802 1.50098 12.0001C1.50098 10.5199 3.16842 9.20668 5.74217 8.38654C5.16555 5.74754 5.46913 3.64687 6.75098 2.9068C8.03282 2.16673 10.0038 2.95415 12.001 4.77302C13.9981 2.95415 15.9691 2.16673 17.251 2.9068C18.5328 3.64687 18.8364 5.74754 18.2598 8.38654C20.8335 9.20668 22.501 10.5199 22.501 12.0001C22.501 13.4802 20.8335 14.7935 18.2598 15.6136ZM10.9397 5.83521C10.6741 5.59597 10.4088 5.37703 10.1458 5.18024C8.86893 4.22499 7.9039 3.97321 7.50098 4.20584C7.09805 4.43847 6.83358 5.4001 7.02243 6.9835C7.06134 7.30969 7.11832 7.6489 7.19268 7.99857C7.91035 7.83985 8.6762 7.71556 9.47837 7.63078C9.95287 6.97848 10.4434 6.37737 10.9397 5.83521ZM14.5236 7.63078C15.3257 7.71556 16.0916 7.83985 16.8093 7.99857C16.8836 7.6489 16.9406 7.30969 16.9795 6.9835C17.1684 5.4001 16.9039 4.43847 16.501 4.20584C16.0981 3.97321 15.133 4.22499 13.8562 5.18024C13.5931 5.37703 13.3279 5.59597 13.0622 5.83521C13.5585 6.37737 14.0491 6.97848 14.5236 7.63078ZM12.5286 7.50565C12.3541 7.29515 12.178 7.09211 12.001 6.89711C11.8239 7.09211 11.6479 7.29515 11.4733 7.50565C11.6481 7.50194 11.824 7.50007 12.001 7.50007C12.1779 7.50007 12.3538 7.50194 12.5286 7.50565ZM8.37252 14.7042C8.28191 14.5547 8.19233 14.4033 8.10386 14.2501C8.01539 14.0968 7.92906 13.9435 7.84488 13.7903C7.74985 14.0467 7.66205 14.3007 7.58169 14.5515C7.83908 14.6074 8.10295 14.6583 8.37252 14.7042ZM10.3049 14.9377C10.8579 14.9788 11.4251 15.0001 12.001 15.0001C12.5769 15.0001 13.144 14.9788 13.697 14.9377C14.0091 14.4793 14.3111 13.9988 14.5991 13.5001C14.887 13.0013 15.1522 12.4995 15.393 12.0001C15.1522 11.5006 14.887 10.9988 14.5991 10.5001C14.3111 10.0013 14.0091 9.52081 13.697 9.06246C13.144 9.02133 12.5769 9.00007 12.001 9.00007C11.4251 9.00007 10.8579 9.02133 10.3049 9.06246C9.99283 9.52081 9.69086 10.0013 9.4029 10.5001C9.11494 10.9988 8.8498 11.5006 8.60892 12.0001C8.8498 12.4995 9.11494 13.0013 9.4029 13.5001C9.69086 13.9988 9.99283 14.4793 10.3049 14.9377ZM16.1571 10.2098C16.2521 9.9534 16.3399 9.6994 16.4203 9.44859C16.1629 9.39278 15.899 9.34182 15.6294 9.29591C15.72 9.44543 15.8096 9.59683 15.8981 9.75007C15.9866 9.9033 16.0729 10.0566 16.1571 10.2098ZM6.13143 9.83671C5.79142 9.94714 5.46917 10.0674 5.16723 10.1968C3.70154 10.825 3.00098 11.5348 3.00098 12.0001C3.00098 12.4653 3.70154 13.1752 5.16723 13.8033C5.46917 13.9327 5.79142 14.053 6.13143 14.1634C6.35281 13.4625 6.6281 12.7371 6.95576 12.0001C6.6281 11.263 6.35281 10.5376 6.13143 9.83671ZM7.58169 9.44859C7.66205 9.6994 7.74985 9.9534 7.84488 10.2098C7.92906 10.0566 8.01539 9.9033 8.10386 9.75007C8.19233 9.59683 8.28191 9.44543 8.37252 9.29591C8.10295 9.34182 7.83908 9.39278 7.58169 9.44859ZM17.8705 14.1634C18.2105 14.053 18.5328 13.9327 18.8347 13.8033C20.3004 13.1752 21.001 12.4653 21.001 12.0001C21.001 11.5348 20.3004 10.825 18.8347 10.1968C18.5328 10.0674 18.2105 9.94714 17.8705 9.83671C17.6491 10.5376 17.3739 11.263 17.0462 12.0001C17.3739 12.7371 17.6491 13.4625 17.8705 14.1634ZM16.4203 14.5515C16.3399 14.3007 16.2521 14.0467 16.1571 13.7903C16.0729 13.9435 15.9866 14.0968 15.8981 14.2501C15.8096 14.4033 15.72 14.5547 15.6294 14.7042C15.899 14.6583 16.1629 14.6074 16.4203 14.5515Z"></path></svg></div>',
            '<div class="projects-examples__img-badge"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6 3C4.34315 3 3 4.34315 3 6V18C3 19.6569 4.34315 21 6 21H18C19.6569 21 21 19.6569 21 18V6C21 4.34315 19.6569 3 18 3H6ZM13.3344 16.055C14.0531 16.6343 14.7717 16.9203 15.4904 16.913C15.9304 16.913 16.2677 16.8323 16.5024 16.671C16.7297 16.517 16.8434 16.297 16.8434 16.011C16.8434 15.7177 16.7297 15.4683 16.5024 15.263C16.2677 15.0577 15.8241 14.8523 15.1714 14.647C14.3867 14.4197 13.7817 14.1263 13.3564 13.767C12.9384 13.4077 12.7257 12.9053 12.7184 12.26C12.7184 11.6513 12.9824 11.1417 13.5104 10.731C14.0237 10.3203 14.6801 10.115 15.4794 10.115C16.5941 10.115 17.4887 10.3863 18.1634 10.929L17.3934 12.128C17.1221 11.9153 16.8104 11.7613 16.4584 11.666C16.1064 11.556 15.7911 11.501 15.5124 11.501C15.1311 11.501 14.8267 11.5707 14.5994 11.71C14.3721 11.8493 14.2584 12.0327 14.2584 12.26C14.2584 12.5093 14.3977 12.722 14.6764 12.898C14.9551 13.0667 15.4317 13.2537 16.1064 13.459C16.9204 13.701 17.4997 14.0237 17.8444 14.427C18.1891 14.8303 18.3614 15.3437 18.3614 15.967C18.3614 16.605 18.1157 17.155 17.6244 17.617C17.1404 18.0717 16.4364 18.31 15.5124 18.332C14.3024 18.332 13.2904 17.969 12.4764 17.243L13.3344 16.055ZM7.80405 16.693C8.03872 16.8397 8.32105 16.913 8.65105 16.913C8.99572 16.913 9.28172 16.814 9.50905 16.616C9.73639 16.4107 9.85005 16.055 9.85005 15.549V10.247H11.3351V15.835C11.3131 16.7003 11.0637 17.3237 10.5871 17.705C10.3157 17.9323 10.0187 18.0937 9.69605 18.189C9.37339 18.2843 9.06172 18.332 8.76105 18.332C8.21105 18.332 7.72339 18.2367 7.29805 18.046C6.84339 17.8407 6.46205 17.4777 6.15405 16.957L7.18805 16.11C7.37872 16.3667 7.58405 16.561 7.80405 16.693Z"></path></svg></div>',
        ];

        let badgesHTML = '';
        if (data.isSubcomponentNeed) {
            data.subcomponentsnum?.forEach(index => {
                if (badges[index]) {
                    badgesHTML += `
                      ${badges[index]}
                    `;
                }
            });
        }


        item.innerHTML = `
                    <div class="projects-examples__title">
                      <h2>Project ${counter}</h2>
                      <p>${data.title}</p>
                    </div>
                    <div class="projects-examples__item-inner">
                      <div class="projects-examples__img">
                        <img
                          src=${data.image}
                          alt="site-preview"
                        />
                        <div class="projects-examples__img-badges">
                              ${badgesHTML}
                        </div>
                      </div>
                      <div class="projects-examples__about">
                        <p>
                        ${data.discription}
                        </p>
                        <a href=${data.link} target="_blank">view-project</a>
                      </div>
                       <a href=${data.link} target="_blank" class="hidden-link"></a>
                    </div>
        `;

        list.appendChild(item);

        counter++;
    });
}

renderItems(ExamplesData,".projects-examples__list")

document.querySelectorAll('.projects__checkbox').forEach(checkbox => {
  checkbox.addEventListener('change', filterItems); // Запуск фильтра при изменении чекбоксов
});