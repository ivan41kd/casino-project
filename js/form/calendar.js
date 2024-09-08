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
   button.type = 'button';
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

   addDateClickEvents();
  };

  const addDateClickEvents = () => {
   const dateItems = dates.querySelectorAll('.main__datepicker-number');

   dateItems.forEach((item) => {
    if (!item.classList.contains('inactive')) {
     item.addEventListener('click', () => {
      const selectedDay = parseInt(item.textContent, 10);
      const selectedDate = new Date(
       date.getFullYear(),
       date.getMonth(),
       selectedDay
      );
      const inputDate = selectedDate.toLocaleDateString();
      inputCalendar.value = inputDate;

      const label = inputCalendar.nextElementSibling;
      if (inputCalendar.value !== '') {
       label.classList.add('top');
      } else {
       label.classList.toggle('top');
      }

      date = selectedDate;
      if (!inputCalendar.classList.contains('request')) {
       checkAge(inputDate);
      } else {
       inputCalendar.classList.add('valid');
      }
      datePicker.classList.remove('active');
     });
    }
   });
  };

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

  const validateDate = (dateStr) => {
   const [day, month, year] = dateStr.split('.').map(Number);
   const inputDate = new Date(`${year}-${month}-${day}`);
   const currentYear = new Date().getFullYear();

   if (
    inputDate.getFullYear() !== year ||
    inputDate.getMonth() + 1 !== month ||
    inputDate.getDate() !== day ||
    year > currentYear
   ) {
    return false;
   }
   return true;
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
   if (e.target.value.length === 10) {
    if (validateDate(e.target.value)) {
     inputCalendar.classList.remove('invalid');
     if (!inputCalendar.classList.contains('request')) {
      checkAge(e.target.value);
     } else {
      inputCalendar.classList.add('valid');
     }
    } else {
     inputCalendar.classList.add('invalid');
     inputCalendar.classList.remove('young', 'adult');
    }
   } else {
    inputCalendar.classList.add('invalid');
    inputCalendar.classList.remove('young', 'adult');
   }
  });

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
