export class Question {
  static create(question) {
    return fetch('https://podcast-app-fd2e1.firebaseio.com/questions.json', {
      method: 'POST',
      body: JSON.stringify(question),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(resp => resp.json())
      .then(data => {
        question.id = data.name;
        return question;
      })
      .then(addToLocalStorage)
      .then(Question.renderList())
  }

  static renderList() {
    const questions = getQuestionsFromLocalStorage();

    const html = questions.length
      ? questions.map(toCard).join('')
      : `<div class="mui--text-headline">Вопросов пока нет</div>`;

    const list = document.getElementById('list');
    list.innerHTML = html;
  }

  static fetch(token) {
    if (!token) {
      return Promise.resolve('<p class="error">Отсутствует токен!</p>');
    }
    return fetch(`https://podcast-app-fd2e1.firebaseio.com/questions.json?auth=${token}`)
      .then(resp => resp.json())
      .then(data => {
        if (data.error) {
          return `<p class="error">${data.error}</p>`
        }

        return data
         ? Object.keys(data).map(key => ({
            ...data[key],
            id: key
          }))
          : [];
      })
  }
};

function addToLocalStorage(question) {
  const questions = getQuestionsFromLocalStorage();
  questions.push(question);
  localStorage.setItem('questions', JSON.stringify(questions));
}

function getQuestionsFromLocalStorage() {
  return JSON.parse(localStorage.getItem('questions') || '[]');
}

function toCard(question) {
  return `
  <div class="mui--text-black-54">
    ${new Date(question.date).toLocaleDateString()}
    ${new Date(question.date).toLocaleTimeString()}
  </div>
  <div>${question.text}</div>
  <br>
  `;
}