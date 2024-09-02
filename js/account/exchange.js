const inputScores = document.querySelector('.main__form-input.total-scores');
const inputGet = document.querySelector('.main__form-input.get-scores');

const setDefault = (scoresInput, getInput) => {
 scoresInput.value = 100;
 getInput.value = 1;
 resetFormLabels();
};

const calculateValues = (scoresInput, getInput) => {
 if (scoresInput.value != '') {
  const exchange = 100;

  const score = parseFloat(scoresInput.value);

  const result = score / exchange;

  getInput.value = result;
 } else {
  setDefault(inputScores, inputGet);
 }
};
setDefault(inputScores, inputGet);

inputScores.addEventListener('input', () => {
 calculateValues(inputScores, inputGet);
});
