const mask = (selector) => {
 class SetMask {
  constructor(input) {
   this.input = input;
   this.applyMask();
  }

  applyMask() {
   let matrix = '+###############';

   maskList.forEach((item) => {
    let code = item.code.replace(/[\s#]/g, ''),
     phone = this.input.value.replace(/[\s#-)(]/g, '');

    if (phone.includes(code)) {
     matrix = item.code;
    }
   });

   let i = 0,
    val = this.input.value.replace(/\D/g, '');

   this.input.value = matrix.replace(/(?!\+)./g, function (a) {
    return /[#\d]/.test(a) && i < val.length
     ? val.charAt(i++)
     : i >= val.length
     ? ''
     : a;
   });
  }
 }

 let inputs = document.querySelectorAll(selector);

 inputs.forEach((input) => {
  if (!input.value) input.value = '+';
  const setMaskInstance = new SetMask(input);

  input.addEventListener('input', () => setMaskInstance.applyMask());
  input.addEventListener('focus', () => setMaskInstance.applyMask());
  input.addEventListener('blur', () => setMaskInstance.applyMask());
 });
};
