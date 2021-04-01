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

const minActivity = 1.2,
      lowActivity = 1.375,
      medActivity = 1.55,
      highActivity = 1.725,
      maxActivity = 1.9;
 
let age = document.querySelector('#age').value,
    height = document.querySelector('#height').value,
    weight = document.querySelector('#weight').value,
    genderSwitch = document.querySelector('.switcher'),
    gender = '',
    genderIdx = 0,
    actRate = minActivity;

let switcherTarget = function(event) {
    if(event.target.innerText == "Мужчина"){
        gender = 'male';
        genderIdx = 161;
        console.log(`gender is ${gender} anf ${genderIdx}`);
    } else if (event.target.innerText == "Женщина") {
        gender = 'female';
        genderIdx = -5;
        console.log(`gender is ${gender} and ${genderIdx}`);
    }
}

function activityRate(event){
    let actValue = event.target.control.value;
    switch(actValue) {
        case 'low': 
            actRate = lowActivity;
            break;
        case 'medium':
            actRate = medActivity;
            break;
        case 'high':
            actRate = highActivity;
            break;
        case 'max':
            actRate = maxActivity;
            break;
        default:
            actRate = minActivity;
    }
}

console.log(actRate);
document.addEventListener('click', activityRate);
document.addEventListener('click', switcherTarget);



// if(genderSwitch.innerText == "Мужчина") {
//     gender = 'male';
//     console.log(`gender is ${gender}`);
// } else {
//     gender = 'female';
//     console.log(`gender is ${gender}`);