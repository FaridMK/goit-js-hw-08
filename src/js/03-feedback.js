let throttle = require(‘lodash.throttle’);
const STORAGE_KEY = ‘feedback-form-state’;

const el = {
  form: document.querySelector(‘.feedback-form’),
};

el.form.addEventListener(‘submit’, onFormSubmit);
el.form.addEventListener(‘input’, throttle(onTextareaEmailInput, 500));
populateTextarea();

function onFormSubmit(evt) {
  evt.preventDefault();
  console.log(localStorage.getItem(STORAGE_KEY));
  localStorage.removeItem(STORAGE_KEY);
  evt.currentTarget.reset();
}

function onTextareaEmailInput() {
  let message = el.form.message.value;
  let email = el.form.email.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ email, message }));
}

function populateTextarea() {
  if (localStorage.getItem(STORAGE_KEY)) {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    for (let key in data) {
      el.form[key].value = data[key];
    }
  }
}
