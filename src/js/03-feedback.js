let throttle = require('lodash.throttle');

const FORM_INPUTS = 'feedback-form-state';
const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};
let formData = { email: '', message: '' };

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

function onFormSubmit(evt) {
  evt.preventDefault();

  evt.currentTarget.reset();
  localStorage.removeItem(FORM_INPUTS);
}

function onFormInput(event) {
  console.log(event.target.value);
  console.log(formData[event.target.name]);
  console.log(event.target.value);
  formData[event.target.name] = event.target.value;
  localStorage.setItem(FORM_INPUTS, JSON.stringify(formData));
}

function getFormData() {
  try {
    formData = JSON.parse(localStorage.getItem(FORM_INPUTS));
    for (let k in formData) {
      refs.form.elements[k].value = formData[k];
    }
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  }
}

