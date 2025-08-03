const genre = localStorage.getItem('selectedGenre');
const genreQuestions = questions[genre];
let current = 0;
let score = 0;
const total = 10;
const shuffled = genreQuestions.sort(() => Math.random() - 0.5).slice(0, total);

function showQuestion() {
  const q = shuffled[current];
  document.getElementById('question').textContent = q.question;
  const choices = document.getElementById('choices');
  choices.innerHTML = '';
  q.choices.forEach((choice, i) => {
    const btn = document.createElement('button');
    btn.textContent = choice;
    btn.onclick = () => checkAnswer(i);
    choices.appendChild(btn);
  });
  document.getElementById('feedback').textContent = '';
  document.getElementById('progress').textContent = `${current + 1} / ${total}`;
}

function checkAnswer(i) {
  const q = shuffled[current];
  const feedback = document.getElementById('feedback');
  if (i === q.answer) {
    score++;
    feedback.textContent = '正解！';
  } else {
    feedback.textContent = '不正解…';
  }
  current++;
  if (current < total) {
    setTimeout(showQuestion, 1000);
  } else {
    setTimeout(showResult, 1000);
  }
}

function showResult() {
  document.body.innerHTML = `
    <h2>結果</h2>
    <p>あなたの正解数は ${score} / ${total} です</p>
    <button onclick="location.href='quiz.html'">もう一度</button>
    <button onclick="location.href='index.html'">ジャンルに戻る</button>
  `;
}

window.onload = showQuestion;