const questions = [
    {
      category: "CIÊNCIAS",
      question: "Qual é o maior planeta do Sistema Solar?",
      answers: ["Terra", "Saturno", "Júpiter", "Marte"],
      correct: 2,
      explanation: "Júpiter é o maior planeta do Sistema Solar."
    },
    {
      category: "CURIOSIDADES",
      question: "Quantos corações tem um polvo?",
      answers: ["Um", "Dois", "Três", "Quatro"],
      correct: 2,
      explanation: "O polvo possui três corações."
    },
    {
      category: "GEOGRAFIA",
      question: "Qual é o maior oceano do planeta?",
      answers: ["Atlântico", "Índico", "Pacífico", "Ártico"],
      correct: 2,
      explanation: "O Oceano Pacífico é o maior do mundo."
    },
    {
      category: "CULTURA GERAL",
      question: "Quantos lados tem um hexágono?",
      answers: ["Cinco", "Seis", "Sete", "Oito"],
      correct: 1,
      explanation: "Um hexágono é um polígono de seis lados."
    },
    {
      category: "CINEMA",
      question: "Qual é o nome da escola de Harry Potter?",
      answers: ["Nárnia", "Hogwarts", "Camelot", "Westeros"],
      correct: 1,
      explanation: "Harry Potter estuda em Hogwarts."
    },
    {
      category: "NATUREZA",
      question: "Por que os flamingos têm penas rosadas?",
      answers: [
        "Por causa do sol",
        "Por causa da alimentação",
        "Por causa da idade",
        "Por causa da água"
      ],
      correct: 1,
      explanation:
        "Pigmentos carotenoides presentes na alimentação contribuem para a cor rosa."
    },
    {
      category: "ASTRONOMIA",
      question: "Quanto tempo a luz do Sol leva para chegar à Terra?",
      answers: ["8 segundos", "8 minutos", "1 hora", "24 horas"],
      correct: 1,
      explanation: "A luz solar leva aproximadamente 8 minutos e 20 segundos."
    },
    {
      category: "LÓGICA",
      question: "O que pesa mais: 1 kg de ferro ou 1 kg de algodão?",
      answers: [
        "O ferro",
        "O algodão",
        "Os dois pesam o mesmo",
        "Depende do tamanho"
      ],
      correct: 2,
      explanation: "Ambos têm massa de 1 kg."
    },
    {
      category: "ESPORTES",
      question: "Quantos jogadores de um time ficam em campo no início de uma partida oficial de futebol?",
      answers: ["9", "10", "11", "12"],
      correct: 2,
      explanation: "Cada equipe começa com 11 jogadores em campo."
    },
    {
      category: "PEGADINHA",
      question: "Quantos meses do ano têm pelo menos 28 dias?",
      answers: ["Um", "Seis", "Onze", "Doze"],
      correct: 3,
      explanation: "Todos os 12 meses têm pelo menos 28 dias."
    }
  ];
  
  const intro = document.getElementById("intro");
  const quiz = document.getElementById("quiz");
  const result = document.getElementById("result");
  
  const startBtn = document.getElementById("startBtn");
  const nextBtn = document.getElementById("nextBtn");
  const restartBtn = document.getElementById("restartBtn");
  
  const category = document.getElementById("category");
  const questionText = document.getElementById("question");
  const answersBox = document.getElementById("answers");
  const questionCount = document.getElementById("questionCount");
  const scoreLabel = document.getElementById("scoreLabel");
  const progress = document.getElementById("progress");
  const timerDisplay = document.getElementById("timer");
  const feedback = document.getElementById("feedback");
  
  let currentQuestion = 0;
  let score = 0;
  let correctAnswers = 0;
  let timeLeft = 15;
  let timerId = null;
  let answered = false;
  
  function startQuiz() {
    currentQuestion = 0;
    score = 0;
    correctAnswers = 0;
  
    intro.classList.add("hidden");
    result.classList.add("hidden");
    quiz.classList.remove("hidden");
  
    showQuestion();
  }
  
  function showQuestion() {
    clearInterval(timerId);
    answered = false;
    timeLeft = 15;
  
    const q = questions[currentQuestion];
  
    category.textContent = q.category;
    questionText.textContent = q.question;
    questionCount.textContent =
      `Pergunta ${currentQuestion + 1} de ${questions.length}`;
  
    scoreLabel.textContent = `${score} pontos`;
  
    progress.style.width =
      `${(currentQuestion / questions.length) * 100}%`;
  
    feedback.textContent = "";
    feedback.className = "feedback";
    nextBtn.classList.add("hidden");
  
    answersBox.replaceChildren();
  
    q.answers.forEach((answer, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "answer";
  
      const letter = document.createElement("span");
      letter.className = "answer-letter";
      letter.textContent = String.fromCharCode(65 + index);
  
      const label = document.createElement("span");
      label.textContent = answer;
  
      button.append(letter, label);
      button.addEventListener("click", () => selectAnswer(index));
  
      answersBox.appendChild(button);
    });
  
    updateTimer();
    timerId = setInterval(countdown, 1000);
  }
  
  function updateTimer() {
    timerDisplay.textContent = `⏱️ ${timeLeft}s`;
    timerDisplay.classList.toggle("warning", timeLeft <= 5);
  }
  
  function countdown() {
    timeLeft--;
    updateTimer();
  
    if (timeLeft <= 0) {
      clearInterval(timerId);
      selectAnswer(-1);
    }
  }
  
  function selectAnswer(selectedIndex) {
    if (answered) return;
  
    answered = true;
    clearInterval(timerId);
  
    const q = questions[currentQuestion];
    const buttons = answersBox.querySelectorAll(".answer");
    const isCorrect = selectedIndex === q.correct;
  
    buttons.forEach((button, index) => {
      button.disabled = true;
  
      if (index === q.correct) {
        button.classList.add("correct");
      } else if (index === selectedIndex) {
        button.classList.add("wrong");
      }
    });
  
    if (isCorrect) {
      const points = 10 + timeLeft;
      score += points;
      correctAnswers++;
  
      feedback.textContent =
        `✓ Correto! ${q.explanation} +${points} pontos`;
      feedback.classList.add("good");
    } else {
      feedback.textContent =
        `${selectedIndex === -1 ? "⏰ Tempo esgotado!" : "✗ Não foi dessa vez!"} ${q.explanation}`;
      feedback.classList.add("bad");
    }
  
    scoreLabel.textContent = `${score} pontos`;
    progress.style.width =
      `${((currentQuestion + 1) / questions.length) * 100}%`;
  
    nextBtn.textContent =
      currentQuestion === questions.length - 1
        ? "Ver resultado 🏆"
        : "Próxima pergunta →";
  
    nextBtn.classList.remove("hidden");
  }
  
  function nextQuestion() {
    if (!answered) return;
  
    currentQuestion++;
  
    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }
  
  function showResult() {
    clearInterval(timerId);
    quiz.classList.add("hidden");
    result.classList.remove("hidden");
  
    const maxScore = questions.length * 25;
    const percentage = Math.round((score / maxScore) * 100);
  
    document.getElementById("finalScore").textContent =
      `${score}/${maxScore}`;
  
    document.getElementById("finalProgress").style.width =
      `${percentage}%`;
  
    document.getElementById("correctCount").textContent =
      `${correctAnswers} de ${questions.length} respostas corretas`;
  
    let title;
    let message;
    let icon;
  
    if (correctAnswers >= 9) {
      title = "Você é incrível!";
      message = "Seu conhecimento está afiado. Parabéns pelo resultado!";
      icon = "🏆";
    } else if (correctAnswers >= 7) {
      title = "Mandou muito bem!";
      message = "Você conhece bastante coisa. Continue assim!";
      icon = "🥇";
    } else if (correctAnswers >= 4) {
      title = "Bom trabalho!";
      message = "Você está no caminho certo. Que tal tentar novamente?";
      icon = "🎯";
    } else {
      title = "Vamos aprender!";
      message = "Cada pergunta é uma oportunidade de descobrir algo novo.";
      icon = "🧠";
    }
  
    document.getElementById("resultTitle").textContent = title;
    document.getElementById("resultMessage").textContent = message;
    document.getElementById("resultIcon").textContent = icon;
  }
  
  startBtn.addEventListener("click", startQuiz);
  nextBtn.addEventListener("click", nextQuestion);
  restartBtn.addEventListener("click", startQuiz);