const emailInputs = document.querySelectorAll('.main__form-input.email');

// Функция для валидации email
const validateEmail = (email) => {
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 const isValid = emailRegex.test(email.value.trim());

 if (isValid) {
  email.classList.add('valid'); // Добавляем класс valid при успешной валидации
  email.classList.remove('invalid-format'); // Убираем класс invalid-format
 } else if (email.value.trim() !== '') {
  email.classList.add('invalid-format'); // Добавляем класс invalid-format, если формат неверный
  email.classList.remove('valid'); // Убираем класс valid при неуспешной валидации
 } else {
  // Если поле пустое, убираем оба класса
  email.classList.remove('valid');
  email.classList.remove('invalid-format');
 }
};

// Навешиваем обработчик на каждый input с классом .email
emailInputs.forEach((input) => {
 input.addEventListener('input', () => {
  validateEmail(input); // Вызываем функцию валидации при вводе
 });
});
