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