let submitButton = document.querySelector('.form__submit-button');
let resetButton = document.querySelector('.form__reset-button');
let resultPanel = document.querySelector('.counter__result');

let coefficients = {
  'activity-minimal' : 1.2,
  'activity-low' : 1.375,
  'activity-medium': 1.55,
  'activity-high': 1.725,
  'activity-maximal': 1.9
};

function getData() {
  let data = {
    gender: document.querySelector('input[name="gender"]:checked').id,
    age: document.querySelector('#age').value,
    height: document.querySelector('#height').value,
    weight: document.querySelector('#weight').value,
    activity: document.querySelector('input[name="activity"]:checked').id
  }
  data.isCompleted = data.age.length != 0  && data.height.length != 0 && data.weight.length != 0;
  return data;
}

//получаем значения по умолчанию 
let defaultData = getData();

function checkData() {
  let data = getData();
  if((data.isCompleted && submitButton.disabled) || (!data.isCompleted && !submitButton.disabled)) {
    submitButton.toggleAttribute('disabled');
  }
  if((defaultData !== getData() && resetButton.disabled) || (!(defaultData !== getData()) && !resetButton.disabled)) {
    resetButton.toggleAttribute('disabled');
  }
}

function resetButtons() {
  if (!submitButton.disabled){ 
    submitButton.toggleAttribute('disabled');
  } else if (!resetButton.disabled) {
    resetButton.toggleAttribute('disabled');
  }
}

function calculateResult(data) {
  if (data.gender == 'gender-male') {
    return coefficients[data.activity] * ((10 * data.weight) + (6.25 * data.height) - (5 * data.height) + 5);
  } else if (data.gender == 'gender-female') {
    return coefficients[data.activity] * ((10 * data.weight) + (6.25 * data.height) - (5 * data.height) - 161);
  } 
  return null;
}

function showResult() {
  let caloriesNorm = document.querySelector('#calories-norm');
  let caloriesMinimal = document.querySelector('#calories-minimal');
  let caloriesMaximal = document.querySelector('#calories-maximal');
  let norm = calculateResult(getData());
  let minimal = norm - norm*0.15;
  let maximal = norm + norm*0.15;
  caloriesNorm.textContent = Math.round(norm);
  caloriesMinimal.textContent = Math.round(minimal);
  caloriesMaximal.textContent = Math.round(maximal);
  resultPanel.classList.remove('counter__result--hidden');
}

document.querySelectorAll('input[type="text"]').forEach((it) => {
  it.addEventListener('input', checkData);
});

document.querySelector('.counter__form').addEventListener('reset', resetButtons);

document.addEventListener('submit', (event) => {    
  event.preventDefault();
  showResult();
});
