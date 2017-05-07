var
  QUALIDADE_DOC = "qualidadeDoc",
  SUPORTE_MULTIPLAT = "suporteMultiPlat",
  SUPORTE_SPRITE = "suporteSprite",
  COLISAO = "colisao",
  LICENCIAMENTO_ROYALTIES = "licenciamentoRoyalties",
  LINGUAGENS_SUPORTADAS = "linguagensSuportadas"
  DEPURADOR = "depurador"
;

var categorias = {};
categorias[QUALIDADE_DOC] = {
  nome: "Qualidade da documentação disponível",
  nota_unreal: 3.0,
  nota_unity: 4.5
};
categorias[SUPORTE_MULTIPLAT] = {
  nome: "Suporte a múltiplas plataformas",
  nota_unreal: 4.0,
  nota_unity: 4.3
};
categorias[SUPORTE_SPRITE] = {
  nome: "Suporte a sprites",
  nota_unreal: 3.0,
  nota_unity: 4.5
};
categorias[COLISAO] = {
  nome: "Detecção de colisão",
  nota_unreal: 3.7,
  nota_unity: 4.4
};
categorias[LICENCIAMENTO_ROYALTIES] = {
  nome: "Licenciamento e Royalties",
  nota_unreal: 0,
  nota_unity: 0
};
categorias[LINGUAGENS_SUPORTADAS] = {
  nome: "Linguagens suportadas",
  nota_unreal: 4.7,
  nota_unity: 4.2
};
categorias[DEPURADOR] = {
  nome: "Depurador e Ferramentas de profiling",
  nota_unreal: 4.8,
  nota_unity: 3.9
};

// Method for future translation, if needed.
var _t = function(ptbr, enus) {
  return ptbr;
}

// Questões
var
  NUMERO_DE_QUESTOES_POR_CATEGORIA = 3,
  RELEVANCIA_MAXIMA = 5
;
var originalQuestions = [
  // Qualidade Doc
  {
    category: QUALIDADE_DOC,
    title: _t("Você é iniciante em desenvolvimento?")
  },
  {
    category: QUALIDADE_DOC,
    title: _t("Você é iniciante em desenvolvimento de jogos?")
  },
  {
    category: QUALIDADE_DOC,
    title: _t("Você precisa de certificações para os membros da sua equipe?")
  },

  // Suporte Multiplatvocê
  {
    category: SUPORTE_MULTIPLAT,
    title: _t("Você pretende distribuir seu jogo em plataformas além das principais (PC, Sony, Microsoft)?")
  },
  {
    category: SUPORTE_MULTIPLAT,
    title: _t("Usuários de plataformas móveis são o principal público-alvo do seu projeto?")
  },
  {
    category: SUPORTE_MULTIPLAT,
    title: _t("Seu projeto precisa de suporte a Smart TVs?")
  },

  // Suporte Sprite
  {
    category: SUPORTE_SPRITE,
    title: _t("Seu projeto será completamente 2D?")
  },
  {
    category: SUPORTE_SPRITE,
    title: _t("Você pretende fazer animações quadro-a-quadro?")
  },
  {
    category: SUPORTE_SPRITE,
    title: _t("Suas animações serão feitas em um programa externo?")
  },

  // Colisão
  {
    category: COLISAO,
    title: _t('Você pretende usar efeitos de física de área? Ex.: Forte vento empurrando objetos pelo cenário')
  },
  {
    category: COLISAO,
    title: _t("Você pretende simular objetos complexos como correntes e tecidos?")
  },
  {
    category: COLISAO,
    title: _t('Seu jogo é baseado em física? Ex.: <a href="https://www.angrybirds.com/">Angry Birds</a>, <a href="https://kerbalspaceprogram.com/">Kerbal Space Program</a> ou <a href="https://www.cuttherope.net/">Cut The Rope</a>.')
  },

  // Licenciamento e Royalties
  {
    category: LICENCIAMENTO_ROYALTIES,
    title: _t("Você pretende investir mais de 12 meses no desenvolvimento desse projeto?")
  },
  {
    category: LICENCIAMENTO_ROYALTIES,
    title: _t("Você sabe a diferença entre licenciamento e royalties?")
  },
  {
    category: LICENCIAMENTO_ROYALTIES,
    title: _t("Você prevê mais de US$ 100 mil anuais de receita bruta apenas com esse projeto?")
  },

  // Linguagens suportadas
  {
    category: LINGUAGENS_SUPORTADAS,
    title: _t("Você já desenvolveu algum jogo em C++?")
  },
  {
    category: LINGUAGENS_SUPORTADAS,
    title: _t("Você tem interesse em programação visual?")
  },
  {
    category: LINGUAGENS_SUPORTADAS,
    title: _t("Você pretende usar linguagens de shading?")
  },

  // Depurador e profiling
  {
    category: DEPURADOR,
    title: _t("Você precisa de acesso ao código fonte da engine?")
  },
  {
    category: DEPURADOR,
    title: _t("Você faz questão de usar sua IDE favorita? Ex.: Visual Studio.")
  },
  {
    category: DEPURADOR,
    title: _t("Você precisa de métricas de performance de baixíssimo nível?")
  }
];

var survey = {
  answers: [],
  questions: [],
  currentQuestionIndex: -1,
  isInFreeMode: false,
  init: function(questions) {
    // Shuffle questions
    if (questions) {
      survey.questions = questions;
    }
    
    // Initiate DOM elements
    $('#btn_yes').on('click', survey.yes);
    $('#btn_no').on('click', survey.no);
    $('#btn_reset').on('click', survey.reset);
    $('#goto_freemode').on('click', survey.freeMode);
    $('#goto_questionmode').on('click', survey.questionMode);
    $('#btn_calcfreemode').on('click', survey.finish);
    $('#progress').progress({
      showActivity: false,
      total: survey.questions.length+1,
      text: false
    });
    $('#freemode_categories').on('change', 'input', function() {
      $(this).parent().find('.range_val_label').html($(this).val());
    })

    // Load the first question
    survey.loadFirstQuestion();
  },
  freeMode: function() {
    survey.isInFreeMode = true;

    $('#goto_questionmode').removeClass('hide');
    $('#goto_freemode').addClass('hide');

    $('#question-card').addClass('hide');
    $('#free-card').removeClass('hide');
    $('#finish-card').addClass('hide');

    // Monta a tabela
    var tb = '';
    for (i in categorias) {
      tb += '<tr>';
      tb += '<td style="width: 50%">' + categorias[i].nome + '</td>';
      tb += '<td><input class="small range_val_input" type="range" name="' + i+ '" min="1" max="5" value="3" step="0.1"> <span class="range_val_label">3</span></td>';
      tb += '</tr>';
    }
    $('#freemode_categories tbody').html(tb);
  },
  questionMode: function() {
    survey.reset();
  },
  loadFirstQuestion: function() {
    survey.currentQuestionIndex = -1;
    survey.answers = [];

    $('#progress').progress('reset');
    shuffle(survey.questions);  
    survey.loadNextQuestion();
  },
  reset: function() {
    survey.isInFreeMode = false;

    $('#goto_questionmode').addClass('hide');
    $('#goto_freemode').removeClass('hide');

    $('#finish-card').addClass('hide');
    $('#question-card').removeClass('hide');

    $('#free-card').addClass('hide');

    survey.loadFirstQuestion();
  },
  finish: function() {
    // Aplica a recomendação de capitulos
    $('#recommendation_chapters').html(survey.getChapterRecommendationText());

    var winner = survey.getWinner();

    $('#finish-card').removeClass('hide');
    $('#question-card').addClass('hide');
    $('#free-card').addClass('hide');

    $('#finish-card .logo').addClass('hide');
    $('#finish-card .logo.' + winner).removeClass('hide');
  },
  getWinner: function() {
    // Pega a relevancia
    var relevanceArr = survey.getCategoryRelevance();
    var sumUnity = 0;
    var sumUnreal = 0;
    for (i in relevanceArr) {
      sumUnreal += relevanceArr[i].relevance * categorias[i].nota_unreal;
      sumUnity += relevanceArr[i].relevance * categorias[i].nota_unity;
    }

    // Define o vencedor
    var unrealUnityRatio = (sumUnreal/sumUnity);
    if (unrealUnityRatio > 1) {
      return 'unreal';
    } else {
      return 'unity';
    }
  },
  getCategoryRelevance: function() {
    var relevanceArr = {};

    // Se estiver em free mode
    if (survey.isInFreeMode) {
      $('.range_val_input').each(function() {
        relevanceArr[$(this).attr('name')] = {relevance: $(this).val()};
      });
    } else {
      // Se estiver no modo questinário
      for (i in survey.questions) {
        var currentCategory = survey.questions[i].category;
        if (!relevanceArr[currentCategory]) {
          relevanceArr[currentCategory] = {relevance: 0};
        }

        // Se a questão teve resposta positiva, adiciona relevância.
        if (survey.answers[i]) {
          // Normaliza a relevância e adiciona à categoria
          relevanceArr[currentCategory].relevance += (1 * RELEVANCIA_MAXIMA) / NUMERO_DE_QUESTOES_POR_CATEGORIA;
        }
      }
    }

    return relevanceArr;
  },
  getChapterRecommendationText: function() {
    var relevanceArr = this.getCategoryRelevance();
    var categoryNames = [];
    for (i in relevanceArr) {
      // Só mostramos o que tiver mais de 3 de 5 relevância, senão vai aparecer muitos capitulos
      if (relevanceArr[i].relevance > 3) {
        categoryNames.push(categorias[i].nome);
      }
    }

    return categoryNames.join(', ');
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
    $('#question-card .content').html('<div class="ui top right attached label">' + categorias[question.category].nome + '</div>' + question.title);
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