import '../css/common.css';
import '../css/03-feedback.css';

const throttle = require('lodash.throttle');
import throttle from 'lodash.throttle';
const STORAGE_KEY = 'feedback-form-state';
const refs = {
    form: document.querySelector('.feedback-form'),
    input: document.querySelector('input'),
    textarea: document.querySelector('textarea'),
}
populateFormOutput();
const formData = {};

refs.form.addEventListener('input', throttle(handlerFormOutput, 500))
function handlerFormOutput(evt) {
    formData[evt.target.name] = evt.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
    console.log(formData)
}
refs.form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    localStorage.removeItem(STORAGE_KEY);
    evt.target.reset();

    console.log(formData);
});

function populateFormOutput() {
    const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (savedMessage) {
        refs.input.value = savedMessage.email;
        refs.textarea.value = savedMessage.message;
    }
}





