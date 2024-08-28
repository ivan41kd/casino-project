document
 .querySelectorAll('.main__form-input.calendar')
 .forEach((inputCalendar) => {
  const datePicker = inputCalendar
   .closest('.main__form')
   .querySelector('.main__datepicker');
  const dates = datePicker.querySelector('.main__datepicker-dates');
  const pickerMonth = datePicker.querySelector('.main__datepicker-month');
  const pickerYear = datePicker.querySelector('.main__datepicker-year');
  const nextMonth = datePicker.querySelector('.main__datepicker-next-date');
  const prevMonth = datePicker.querySelector('.main__datepicker-prev-date');
  const lastDate = datePicker.querySelector('.main__datepicker-last-date');
  const currentDateBtn = datePicker.querySelector(
   '.main__datepicker-current-date'
  );
  const calendarIcon = inputCalendar
   .closest('.main__form')
   .querySelector('.main__form-calendar-icon');

  const months = [
   'January',
   'February',
   'March',
   'April',
   'May',
   'June',
   'July',
   'August',
   'September',
   'October',
   'November',
   'December',
  ];

  let date = new Date();

  const createButton = (number, className) => {
   const button = document.createElement('button');
   button.className = 'main__datepicker-number';
   if (className) {
    button.classList.add(className);
   }
   button.textContent = number;
   dates.append(button);
  };

  const updateCalendar = () => {
   dates.innerHTML = '';

   const year = date.getFullYear();
   const month = date.getMonth();

   pickerYear.textContent = year;
   pickerMonth.textContent = months[month];

   const firstDayOfMonth = new Date(year, month, 1);
   const lastDayOfMonth = new Date(year, month + 1, 0);

   const prevLastDay = new Date(year, month, 0);
   const firstDayIndex =
    firstDayOfMonth.getDay() === 0 ? 7 : firstDayOfMonth.getDay();
   const lastDayIndex = lastDayOfMonth.getDay();
   const nextDays = 7 - (lastDayIndex === 0 ? 7 : lastDayIndex);

   for (let i = firstDayIndex - 1; i > 0; i--) {
    createButton(prevLastDay.getDate() - i + 1, 'inactive');
   }

   for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    const currentDate = new Date(year, month, i);
    if (currentDate.toDateString() === new Date().toDateString()) {
     createButton(i, 'today');
    } else if (currentDate > new Date()) {
     createButton(i, 'inactive');
    } else {
     createButton(i);
    }
   }

   for (let i = 1; i <= nextDays; i++) {
    createButton(i, 'inactive');
   }

   const dateItems = dates.querySelectorAll('.main__datepicker-number');

   dateItems.forEach((item) => {
    if (!item.classList.contains('inactive')) {
     item.addEventListener('click', () => {
      const selectedDay = parseInt(item.textContent, 10);
      const selectedDate = new Date(year, month, selectedDay);
      const inputDate = selectedDate.toLocaleDateString();
      inputCalendar.value = inputDate;

      const label = inputCalendar.nextElementSibling;
      inputCalendar.value !== ''
       ? label.classList.add('top')
       : label.classList.toggle('top');

      date = selectedDate;
      checkAge(inputDate); // Проверка возраста при выборе даты
      datePicker.classList.remove('active');
     });
    }
   });
  };

  inputCalendar.addEventListener('input', (e) => {
   let input = e.target.value.replace(/\D/g, '');
   if (input.length > 2) {
    input = input.slice(0, 2) + '.' + input.slice(2);
   }
   if (input.length > 5) {
    input = input.slice(0, 5) + '.' + input.slice(5);
   }
   e.target.value = input.slice(0, 10);

   // Проверка возраста только если введена валидная дата
   if (
    e.target.value.length === 10 &&
    /^[0-3]\d\.[01]\d\.\d{4}$/.test(e.target.value)
   ) {
    checkAge(e.target.value);
   } else {
    // Очистить возрастные классы, если дата некорректна
    inputCalendar.classList.remove('young', 'adult');
   }
  });

  const checkAge = (dob) => {
   const birthDate = new Date(dob.split('.').reverse().join('-'));
   const today = new Date();
   let age = today.getFullYear() - birthDate.getFullYear();
   const monthDifference = today.getMonth() - birthDate.getMonth();

   if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
   ) {
    age--;
   }
   inputCalendar.classList.remove('young', 'adult');
   if (age < 18) {
    inputCalendar.classList.add('young');
   } else {
    inputCalendar.classList.add('adult');
   }
  };

  calendarIcon.addEventListener('click', () => {
   if (!inputCalendar.disabled) {
    datePicker.classList.toggle('active');
   }
  });

  lastDate.addEventListener('click', () => {
   date.setFullYear(date.getFullYear() - 1);
   updateCalendar();
  });

  currentDateBtn.addEventListener('click', () => {
   date = new Date();
   updateCalendar();
  });

  nextMonth.addEventListener('click', () => {
   date.setDate(1);
   date.setMonth(date.getMonth() + 1);
   updateCalendar();
  });

  prevMonth.addEventListener('click', () => {
   date.setDate(1);
   date.setMonth(date.getMonth() - 1);
   updateCalendar();
  });

  updateCalendar();
 });
