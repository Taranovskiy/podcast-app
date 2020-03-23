import { Question } from './question';
import { isValid, createModal } from './utils';
import './styles.css';

const form = document.getElementById('form');
const input = form.querySelector('#question-input');
const submitBtn = form.querySelector('#submit');
const modalBtn = document.getElementById('modal-btn');

window.addEventListener('load', Question.renderList);
form.addEventListener('submit', submitFormHandler);
input.addEventListener('input', inputHandler);
modalBtn.addEventListener('click', openModal);

function submitFormHandler(event) {
  event.preventDefault();

  if (isValid(input.value)) {
    const question = {
      text: input.value.trim(),
      date: new Date().toJSON(),
    };

    submitBtn.disabled = true;
    // Async request to server to save question
    Question.create(question).then(() => {
      input.value = '';
      input.className = '';
      submitBtn.disabled = false;
    });
  }
}

function inputHandler() {
  submitBtn.disabled = !isValid(input.value);
}

function openModal() {
  createModal('Авторизация', '<h1>Test</h1>');
}