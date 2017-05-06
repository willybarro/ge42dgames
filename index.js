var
  QUALIDADE_DOC = "qualidadeDoc",
  SUPORTE_MULTIPLAT = "suporteMultiPlat",
  SUPORTE_SPRITE = "suporteSprite",
  COLISAO = "colisao",
  LICENCIAMENTO_ROYALTIES = "licenciamentoRoyalties",
  LINGUAGENS_SUPORTADAS = "linguagensSuportadas"
  DEPURADOR = 7
;

var categorias = {};
categorias[QUALIDADE_DOC] = {
  nome: "Qualidade da documentação disponível",
  nota_unreal: 10,
  nota_unity: 10
};
categorias[SUPORTE_MULTIPLAT] = {
  nome: "Suporte a múltiplas plataformas",
  nota_unreal: 10,
  nota_unity: 10
};
categorias[SUPORTE_SPRITE] = {
  nome: "Suporte a sprites",
  nota_unreal: 10,
  nota_unity: 10
};
categorias[COLISAO] = {
  nome: "Detecção de colisão",
  nota_unreal: 10,
  nota_unity: 10
};
categorias[LICENCIAMENTO_ROYALTIES] = {
  nome: "Licenciamento e Royalties",
  nota_unreal: 10,
  nota_unity: 10
};
categorias[LINGUAGENS_SUPORTADAS] = {
  nome: "Linguagens suportadas",
  nota_unreal: 10,
  nota_unity: 10
};
categorias[DEPURADOR] = {
  nome: "Depurador e Ferramentas de profiling",
  nota_unreal: 10,
  nota_unity: 10
};

var originalQuestions = [
  {
    category: QUALIDADE_DOC,
    title: "Você é iniciante com desenvolvimento de jogos?"
  },
  {
    category: SUPORTE_MULTIPLAT,
    title: "Você sabe a diferença entre licenciamento e royalties?"
  },
  {
    category: LICENCIAMENTO_ROYALTIES,
    title: "Seu jogo demorará mais de 12 meses para ficar pronto?"
  }
];

var survey = {
  answers: [],
  questions: [],
  currentQuestionIndex: -1,
  init: function(questions) {
    // Shuffle questions
    survey.questions = questions;
    shuffle(survey.questions);

    // Initiate DOM elements
    $('#btn_yes').on('click', survey.yes);
    $('#btn_no').on('click', survey.no);
    $('#btn_reset').on('click', survey.reset);
    $('#progress').progress({
      showActivity: false,
      total: survey.questions.length+1,
      text: false
    });

    // Load the first question    
    survey.loadNextQuestion();
  },
  reset: function() {
    $('#finish-card').addClass('hide');
    $('#question-card').removeClass('hide');

    survey.init();
  },
  finish: function() {
    $('#finish-card').removeClass('hide');
    $('#question-card').addClass('hide');

    $('#finish-container .logo').removeClass('hide');
    $('#finish-container .unreal').addClass('hide');
  },
  yes: function() {
    survey.answers[survey.currentQuestionIndex] = 1;
    survey.loadNextQuestion();
  },
  no: function() {
    survey.answers[survey.currentQuestionIndex] = 0;
    survey.loadNextQuestion();
  },
  loadNextQuestion: function() {
    $('#progress').progress('increment');

    if (survey.currentQuestionIndex == survey.questions.length-1) {
      survey.finish();
    } else {
      survey.nextQuestion();
      survey.loadQuestion();
    }
  },
  loadQuestion: function() {
    question = survey.getQuestion(survey.currentQuestionIndex);
    $('.question .content').html(question.title);
  },
  getQuestion: function(num) {
    return survey.questions[num];
  },
  nextQuestion: function() {
    if (survey.currentQuestionIndex+1 < survey.questions.length) {
      survey.currentQuestionIndex++;
    }

    return survey.currentQuestionIndex;
  },
  previousQuestion: function() {
    if (survey.currentQuestionIndex-1 >= 0) {
      survey.currentQuestionIndex--;
    }

    return survey.currentQuestionIndex;
  }
};

var shuffle = function(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

$(function() {
  survey.init(originalQuestions);
});