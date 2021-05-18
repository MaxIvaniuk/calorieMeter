'use strict'

const activityCoef = {
    min: 1.2,
    low: 1.375,
    med: 1.55,
    high: 1.725,
    max: 1.9
}

const genderSwitch = document.querySelector('.switcher'),
      humanParameters = document.querySelector('.inputs-group'),
      radiosContainer = document.querySelector('.radios-group'),
      submitBtn = document.querySelector('.form__submit-button'),
      resetBtn = document.querySelector('.form__reset-button'),
      formSubmit = document.querySelector('.form__submit'),
      counterResult = document.querySelector('.counter__result');
 
let age = 0,
    height = 0,
    weight = 0,
    gender = '',
    genderIndex = -5,
    radioValue = '',
    activityRate = activityCoef.min,
    perfectWeight,
    radioBtns = document.getElementsByName('activity'),
    maintainingWeightResult = document.querySelector('#calories-norm'),
    weightLossResult = document.querySelector('#calories-minimal'),
    weightGainResult = document.querySelector('#calories-maximal'),
    maintainingWeight,
    calorieNorm = 0,
    weightGain = 0,
    weightLoss = 0;

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
            alert(`Пожалуйста введите данные`);
    }
}

humanParameters.addEventListener('change', personParams);

// Get users activity rate 
function activityChoice(){
    for(let i = 0; i < radioBtns.length; i++){
        if(radioBtns[i].checked == true){
            switch(radioBtns[i].value) {
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
        }
    }
}

radiosContainer.addEventListener('change', activityChoice);

// Set buttons 'enable' appearance
function enableBtn(){
    if(genderIndex != 0 && activityRate != 0 && age != 0 && height != 0 && weight != 0) {
        submitBtn.removeAttribute('disabled');
        resetBtn.removeAttribute('disabled');
    } else {
        submitBtn.setAttribute('disabled', 'disabled');
        resetBtn.setAttribute('disabled', 'disabled');
    }
}

radiosContainer.addEventListener('change', enableBtn);
humanParameters.addEventListener('keyup', enableBtn);

// Form resetting
function resetForm(event){
    event.target.parentElement.form.reset();
    submitBtn.setAttribute('disabled', 'disabled');
    resetBtn.setAttribute('disabled', 'disabled');
    counterResult.classList.add('counter__result--hidden');
}

resetBtn.addEventListener('click', resetForm);

// Calculate and show results
function calculateResults(){
    maintainingWeight = (10 * weight) + (6.25 * height) - (5 * age) - (genderIndex);
    calorieNorm = maintainingWeight * activityRate;
    weightGain = calorieNorm + (calorieNorm * 15 / 100);
    weightLoss = calorieNorm - (calorieNorm * 15 / 100);

    maintainingWeightResult.textContent = Math.round(calorieNorm);
    weightLossResult.textContent = Math.round(weightLoss);
    weightGainResult.textContent = Math.round(weightGain);
}

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
                calculateResults();
            }
        } else {
            alert('Something went wrong please try again');
        }
    };
    xhr.send(formData);
}

form.addEventListener('submit', onSubmit);