'use strict'

// Формулы
// Поддержание веса
    
// Для женщин:
    
// N = (10 × вес в килограммах) + (6,25 × рост в сантиметрах) − (5 × возраст в годах) − 161
    
// Для мужчин:
    
// N = (10 × вес в килограммах) + (6,25 × рост в сантиметрах) − (5 × возраст в годах) + 5
    
// Полученное значение (N) умножаем на коэффициент активности. Результат и будет нормой калорий для поддержания веса.
// Коэффициенты активности
    
//     Минимальная: 1.2.
//     Низкая: 1.375.
//     Средняя: 1.55.
//     Высокая: 1.725.
//     Очень высокая: 1.9.
    
// Формулы для набора и сброса веса
    
//     Набор веса: прибавляем 15% от нормы к этой норме.
//     Сброс веса: вычитаем 15% от нормы из этой нормы.

// perfectWeight = (10 * weight) + (6.25 * height) - (5 * age) - genderIndex;
// calorieNorm = perfectWeight * activityRate;
// weightGain = calorieNorm + (calorieNorm * 15 / 100);
// weightLoss = calorieNorm - (calorieNorm * 15 / 100);

const activityCoef = {
    min: 1.2,
    low: 1.375,
    med: 1.55,
    high: 1.725,
    max: 1.9
}

const genderSwitch = document.querySelector('.switcher'),
      humanParameters = document.querySelector('.inputs-group'),
      radioBtns = document.querySelector('.radios-group'),
      submitBtn = document.querySelector('.form__submit-button'),
      resetBtn = document.querySelector('.form__reset-button'),
      formSubmit = document.querySelector('.form__submit'),
      form = document.querySelector('#form'),
      counterResult = document.querySelector('.counter__result');
 
let age = 0,
    height = 0,
    weight = 0,
    gender = '',
    genderIndex = -5,
    radioValue = '',
    activityRate = activityCoef.min,
    perfectWeight,
    radioBtnValue = document.querySelector('input[name="activity"]:checked');

// Get users gender and set gender index
function switcherTarget(event) {
    if(event.target.htmlFor == "gender-male"){
        gender = 'male';
        genderIndex = -5;
    } else if (event.target.htmlFor == "gender-female") {
        gender = 'female';
        genderIndex = 161;
    }
}

genderSwitch.addEventListener('click', switcherTarget);

// Get users parameters
function personParams(event){
    let input = event.target;
    switch(input.id) {
        case 'age':
            age = input.value;
            break;
        case 'height':
            height = input.value;
            break;
        case 'weight':
            weight = input.value;
            break;
        default:
            console.log(`Пожалуйста введите данные`);
    }
}

humanParameters.addEventListener('change', personParams);

// Get users activity rate 
function activityChoice(){
    switch(radioBtnValue.value) {
        case 'low': 
            activityRate = activityCoef.low;
            radioValue = '';
            break;
        case 'medium':
            activityRate = activityCoef.med;
            radioValue = '';
            break;
        case 'high':
            activityRate = activityCoef.high;
            radioValue = '';
            break;
        case 'max':
            activityRate = activityCoef.max;
            radioValue = '';
            break;
        default:
            activityRate = activityCoef.min;
    }
    console.log(activityRate);
}

radioBtns.addEventListener('click', activityChoice);

// Set buttons 'enable'
function enableBtn(){
    if(genderIndex != 0 && activityRate != 0 && age != 0 && height != 0 && weight != 0) {
        submitBtn.removeAttribute('disabled');
        resetBtn.removeAttribute('disabled');
        console.log('кнопка активна');
    } else {
        submitBtn.setAttribute('disabled', 'disabled');
        resetBtn.setAttribute('disabled', 'disabled');
        console.log('кнопка dont активна');
    }
};

radioBtns.addEventListener('click', enableBtn);
humanParameters.addEventListener('keyup', enableBtn);

function resetForm(){
    submitBtn.setAttribute('disabled', 'disabled');
    resetBtn.setAttribute('disabled', 'disabled');
    counterResult.classList.add('counter__result--hidden');
    // form.reset();
}
resetBtn.addEventListener('click', resetForm);

// Form submitting
function onSubmit(event) {
    event.preventDefault();
    let formData = new FormData(form);
    let xhr = new XMLHttpRequest();

    xhr.open("GET", form.action, true);

    xhr.onload = function(e) {
        if (xhr.status === 200) {
            if(submitBtn.hasAttribute('disabled') == false){
                counterResult.classList.remove('counter__result--hidden');
            }
        } else {
            alert('Something went wrong please try again');
        }
    };
    xhr.send(formData);
}

form.addEventListener('submit', onSubmit);