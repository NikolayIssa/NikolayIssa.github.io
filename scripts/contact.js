const inputs = document.querySelectorAll('.feedback__input');


inputs.forEach(input => {
    input.addEventListener('input', function() {

      const inputValue = this.value.trim(); // Удаляем пробелы в начале и конце строки
      const inputName = this.name; // Получаем имя текущего инпута
  
      // Формируем селектор класса для вывода значения
      const outputElement = document.querySelector('.output' + inputName);
  
      if (outputElement) { // Если элемент найден, обновляем его текстовое содержимое
        outputElement.textContent = inputValue;
      }
    });
  });