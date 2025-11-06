// --- DOM ELEMENTS ---
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const gameContainer = document.getElementById('game-container');
const endScreen = document.getElementById('end-screen');
const finalPlatformerScreen = document.getElementById('final-platformer-screen'); 
const epilogueScreen = document.getElementById('epilogue-screen');
const memoryGameScreen = document.getElementById('memory-game-screen');
const memoryGameBoard = document.getElementById('memory-game-board');
const continueToNextPhaseButton = document.getElementById('continue-to-next-phase-button');
const backToStartButton = document.getElementById('back-to-start-button');
const platformerCanvas = document.getElementById('platformer-canvas'); 
const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');
const playerHpBar = document.getElementById('player-hp-bar');
const playerHpText = document.getElementById('player-hp-text');
const enemyHpBar = document.getElementById('enemy-hp-bar');
const enemyHpText = document.getElementById('enemy-hp-text');
const enemyName = document.getElementById('enemy-name');
const enemyStatusContainer = document.getElementById('enemy-status-container');
const centralMessage = document.getElementById('central-message');
const pagesCollectedEl = document.getElementById('pages-collected');
const hintCountEl = document.getElementById('hint-count');
const narrativeView = document.getElementById('narrative-view');
// narrativeText etc. (mantidos mas não usados no fluxo principal)
const challengeButton = document.getElementById('challenge-button'); 
const combatView = document.getElementById('combat-view');
const timerBar = document.getElementById('timer-bar');
const questionCategory = document.getElementById('question-category');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const useHintButton = document.getElementById('use-hint-button');
const endTitle = document.getElementById('end-title');
const endMessage = document.getElementById('end-message');
const playerSpriteContainer = document.getElementById('player-sprite-container');
const enemySpriteContainer = document.getElementById('enemy-sprite-container');
const feedbackText = document.getElementById('feedback-text');
// Elementos da intro (Texto)
const introCrawlScreen = document.getElementById('intro-crawl-screen');
const skipIntroButton = document.getElementById('skip-intro-button');
// Elementos da intro de batalha (Sprites)
const battleIntroScreen = document.getElementById('battle-intro-screen');
const battleIntroTitle = document.getElementById('battle-intro-title');
const introPlayerSprite = document.getElementById('intro-player-sprite');
const introEnemySprite = document.getElementById('intro-enemy-sprite');
const introEnemyName = document.getElementById('intro-enemy-name');
const battleIntroMessage = document.getElementById('battle-intro-message');
// Novos elementos para a fase final de plataforma
const checkpointMessageBox = document.getElementById('checkpoint-message-box');
const checkpointText = document.getElementById('checkpoint-text');
const continuePlatformerButton = document.getElementById('continue-platformer-button');
// ** NOVOS ELEMENTOS PARA CONTROLES MOBILE **
const mobileControls = document.getElementById('mobile-controls');
const btnLeft = document.getElementById('btn-left');
const btnRight = document.getElementById('btn-right');
const btnJump = document.getElementById('btn-jump');
// Fim elementos
const ctx = platformerCanvas.getContext('2d');

// --- PERSONAGENS ---
const characterAssets = {
    // !!! Certifique-se que a imagem está na pasta 'images' e o nome está correto !!!
    player: 'https://i.imgur.com/j8v34A5.png', 
    // !!! 
    capanga: 'https://i.imgur.com/iFO0uaH.png', 
    guarda: 'https://i.imgur.com/ftH9KI2.png', 
    espectro: 'https://i.imgur.com/UWsKgT0.png', 
    golem: 'https://i.imgur.com/QjvZfY1.png', 
    dragao: 'https://i.imgur.com/qtEwGHx.png' 
};

// --- GAME DATABASE ---
const questions = {
     'entrada': [ { question: "Qual o Autor de Iracema", options: ["Machado de Assis", "José de Alencar", "Castro Alves"], correctAnswer: "José de Alencar", category: "Literatura Nacional" }, { question: "Qual autor de ficção científica escreveu 'Eu, Robô'?", options: ["Isaac Asimov", "Philip K.", "Arthur C. Clarke"], correctAnswer: "Isaac Asimov", category: "Ficção Científica" }, { question: "Qual destes livros é um famoso romance de Jane Austen?", options: ["O Morro dos Ventos Uivantes", "Orgulho e Preconceito", "Jane Eyre"], correctAnswer: "Orgulho e Preconceito", category: "Romance" }, { question: "Quem escreveu 'Dom Quixote', considerado o primeiro romance moderno?", options: ["Miguel de Cervantes", "William Shakespeare", "Dante Alighieri"], correctAnswer: "Miguel de Cervantes", category: "Escritores" }, { question: "'Frankenstein' foi escrito por qual autora?", options: ["Mary Shelley", "Virginia Woolf", "Emily Brontë"], correctAnswer: "Mary Shelley", category: "Terror" }, { question: "Em 'Grande Sertão: Veredas' de Guimarães Rosa, qual o nome do protagonista e narrador?", options: ["Riobaldo", "Diadorim", "Joca Ramiro"], correctAnswer: "Riobaldo", category: "Literatura Nacional" }, { question: "Qual autor escreveu 'Viagem ao Centro da Terra'?", options: ["Júlio Verne", "H. G. Wells", "Edgar Allan Poe"], correctAnswer: "Júlio Verne", category: "Ficção Científica" } ],
     'sala': [ { question: "Quem escreveu a saga 'O Senhor dos Anéis'?", options: ["C.S. Lewis", "George R.R. Martin", "J.R.R. Tolkien"], correctAnswer: "J.R.R. Tolkien", category: "Fantasia" }, { question: "Qual o nome do palhaço assustador no livro 'It: A Coisa' de Stephen King?", options: ["Pennywise", "Coringa", "Krusty"], correctAnswer: "Pennywise", category: "Terror" }, { question: "Qual o nome da protagonista de 'Jogos Vorazes'?", options: ["Hermione Granger", "Katniss Everdeen", "Tris Prior"], correctAnswer: "Katniss Everdeen", category: "Distopia" }, { question: "No universo de Harry Potter, qual o nome do diretor de Hogwarts?", options: ["Severo Snape", "Alvo Dumbledore", "Sirius Black"], correctAnswer: "Alvo Dumbledore", category: "Fantasia" }, { question: "'O Guia do Mochileiro das Galáxias' é uma série de comédia e ficção científica de qual autor?", options: ["Douglas Adams", "Júlio Verne", "H.G. Wells"], correctAnswer: "Douglas Adams", category: "Ficção Científica" }, { question: "Em 'As Crônicas de Nárnia', como as crianças Pevensie chegam a Nárnia pela primeira vez?", options: ["Através de um guarda-roupa", "Por um portal mágico", "Em um navio"], correctAnswer: "Através de um guarda-roupa", category: "Fantasia" }, { question: "'Fahrenheit 451' é uma obra distópica de qual autor?", options: ["Ray Bradbury", "George Orwell", "Aldous Huxley"], correctAnswer: "Ray Bradbury", category: "Distopia" } ],
     'quartos': [ { question: "'Vermelho, Branco e Sangue Azul' é um romance de qual autora?", options: ["Becky Albertalli", "Casey McQuiston", "Adam Silvera"], correctAnswer: "Casey McQuiston", category: "Literatura LGBTQI+" }, { question: "Qual desses escritores brasileiros fez parte do movimento modernista?", options: ["José de Alencar", "Mário de Andrade", "Aluísio Azevedo"], correctAnswer: "Mário de Andrade", category: "Escritores" }, { question: "A Biblioteca de Alexandria, uma das mais famosas da antiguidade, localizava-se em qual país atual?", options: ["Grécia", "Itália", "Egito"], correctAnswer: "Egito", category: "Origem da Literatura" }, { question: "'O Conto da Aia', um famoso romance distópico, foi escrito por quem?", options: ["Margaret Atwood", "Ursula K. Le Guin", "Suzanne Collins"], correctAnswer: "Margaret Atwood", category: "Distopia" }, { question: "Qual é o nome do navio baleeiro no livro 'Moby *****'?", options: ["Pequod", "Leviatã", "O Holandês Voador"], correctAnswer: "Pequod", category: "Romance" }, { question: "Qual o nome do protagonista de 'Me Chame Pelo Seu Nome' de André Aciman?", options: ["Elio", "Oliver", "Samuel"], correctAnswer: "Elio", category: "Literatura LGBTQI+" }, { question: "Quem é a autora de 'O Morro dos Ventos Uivantes'?", options: ["Emily Brontë", "Jane Austen", "Charlotte Brontë"], correctAnswer: "Emily Brontë", category: "Escritores" } ],
     'biblioteca': [ { question: "Em '1984' de George Orwell, qual é o nome do líder onipresente do Partido?", options: ["O Chanceler", "Grande Irmão", "O Comandante"], correctAnswer: "Grande Irmão", category: "Distopia" }, { question: "Qual autor é famoso por criar o universo de Cthulhu?", options: ["Edgar Allan Poe", "H.P. Lovecraft", "Bram Stoker"], correctAnswer: "H.P. Lovecraft", category: "Terror" }, { question: "Em 'A Revolução dos Bichos', os porcos assumem o controle. Qual o nome do porco líder?", options: ["Napoleão", "Bola-de-Neve", "Garganta"], correctAnswer: "Napoleão", category: "Literatura Clássica" }, { question: "Quem é o autor de 'Memórias Póstumas de Brás Cubas'?", options: ["Clarice Lispector", "Carlos Drummond de Andrade", "Machado de Assis"], correctAnswer: "Machado de Assis", category: "Literatura Nacional" }, { question: "Qual destes não é um dos sete reinos de Westeros em 'As Crônicas de Gelo e Fogo'?", options: ["O Norte", "O Condado", "Dorne"], correctAnswer: "O Condado", category: "Fantasia" }, { question: "Qual é o famoso detetive criado por Agatha Christie?", options: ["Sherlock Holmes", "Hercule Poirot", "Sam Spade"], correctAnswer: "Hercule Poirot", category: "Escritores" }, { question: "Em 'O Sol é para Todos', qual o nome do advogado que defende um homem negro?", options: ["Atticus Finch", "Tom Robinson", "Boo Radley"], correctAnswer: "Atticus Finch", category: "Literatura Clássica" } ],
     'subsolo': [ { question: "Qual livro de ficção científica narra a história da família Atreides no planeta Arrakis?", options: ["Fundação", "Duna", "O Guia do Mochileiro das Galáxias"], correctAnswer: "Duna", category: "Ficção Científica" }, { question: "Qual o autor de 'O Nome do Vento', primeiro livro da série 'A Crônica do Matador do Rei'?", options: ["Brandon Sanderson", "Patrick Rothfuss", "Neil Gaiman"], correctAnswer: "Patrick Rothfuss", category: "Fantasia" }, { question: "Machado de Assis é considerado o maior nome de qual movimento literário no Brasil?", options: ["Romantismo", "Realismo", "Barroco"], correctAnswer: "Realismo", category: "Escritores" }, { question: "Qual o nome do protagonista de 'O Apanhador no Campo de Centeio'?", options: ["Holden Caulfield", "Jay Gatsby", "Atticus Finch"], correctAnswer: "Holden Caulfield", category: "Literatura Clássica" }, { question: "Qual poeta português é famoso pela obra 'Os Lusíadas'?", options: ["Fernando Pessoa", "Luís de Camões", "Florbela Espanca"], correctAnswer: "Luís de Camões", category: "Escritores" }, { question: "'Odisseia', um dos poemas épicos da Grécia Antiga, é atribuído a qual autor?", options: ["Sófocles", "Homero", "Platão"], correctAnswer: "Homero", category: "Escritores" }, { question: "Qual é a primeira das Três Leis da Robótica de Asimov?", options: ["Um robô não pode ferir um ser humano", "Um robô deve obedecer as ordens dos humanos", "Um robô deve proteger sua própria existência"], correctAnswer: "Um robô não pode ferir um ser humano", category: "Ficção Científica" } ]
};

const phases = [
    { name: "Entrada do Castelo", enemy: "Capanga de Pedra", questions: questions['entrada'], timer: 40, asset: characterAssets.capanga }, 
    { name: "Sala do Trono", enemy: "Guarda Real Corrompido", questions: questions['sala'], timer: 40, asset: characterAssets.guarda }, 
    { name: "Quartos Assombrados", enemy: "Espectro do Castelo", questions: questions['quartos'], timer: 40, asset: characterAssets.espectro }, 
    { name: "Biblioteca Proibida", enemy: "Golem de Livros", questions: questions['biblioteca'], timer: 40, asset: characterAssets.golem }, 
    { name: "Covil do Dragão", enemy: "Dragão das Sombras", questions: questions['subsolo'], timer: 20, asset: characterAssets.dragao },
];

let state = {};
let platformerState = {};
let animationFrameId;

// --- FUNÇÕES DE INICIALIZAÇÃO E FLUXO ---

function initState() {
    state = { player: { hp: 5, maxHp: 5, hints: 1 }, enemy: { hp: 5, maxHp: 5 }, currentPhaseIndex: 0, pagesCollected: 0, currentQuestionIndex: 0, timer: null, hintUsed: false, answered: false };
}

function switchScreen(activeScreen) {
    [startScreen, gameScreen, endScreen, finalPlatformerScreen, epilogueScreen, memoryGameScreen, introCrawlScreen, battleIntroScreen].forEach(screen => {
        if (!screen) return; // Adiciona verificação se o elemento existe
        if (screen === activeScreen) {
            screen.classList.remove('hidden');
            setTimeout(() => screen.classList.add('active'), 10);
        } else {
            screen.classList.remove('active');
            // Atraso um pouco maior para garantir que a transição CSS termine antes do 'hidden'
            setTimeout(() => screen.classList.add('hidden'), 500); 
        }
    });
}

function playIntro() {
    switchScreen(introCrawlScreen);
    const crawlContent = document.querySelector('.crawl-content');
    if (crawlContent) {
        crawlContent.style.animation = 'none';
        void crawlContent.offsetWidth; // Trigger reflow
        crawlContent.style.animation = ''; 
    }
}

function playBattleIntroAnimation(onCompleteCallback) {
     const currentPhase = phases[state.currentPhaseIndex];
    if (!currentPhase) {
        console.error("Fase de batalha inválida:", state.currentPhaseIndex);
        switchScreen(startScreen);
        return;
    }

    // Garante que os elementos existem antes de usá-los
    if (battleIntroTitle) battleIntroTitle.textContent = `Fase ${state.currentPhaseIndex + 1}: ${currentPhase.name}`;
    if (battleIntroMessage) battleIntroMessage.textContent = `Prepare-se para enfrentar o ${currentPhase.enemy}!`;
    if (introPlayerSprite) introPlayerSprite.innerHTML = `<img src="${characterAssets.player}" alt="Atena">`;
    if (introEnemySprite) introEnemySprite.innerHTML = `<img src="${currentPhase.asset}" alt="${currentPhase.enemy}">`;
    if (introEnemyName) introEnemyName.textContent = currentPhase.enemy;

    switchScreen(battleIntroScreen);

    // Reinicia animações
    const elementsToReset = [
        introPlayerSprite, 
        introEnemySprite, 
        document.querySelector('.battle-intro-vs'), 
        ...document.querySelectorAll('.battle-intro-hp-container')
    ];

    elementsToReset.forEach(el => {
        if(el && el.style) { // Verifica se el e el.style existem
            el.style.animation = 'none';
            void el.offsetWidth; 
            el.style.animation = '';
        }
    });

    // Chama o callback após a animação
    setTimeout(() => {
        if (battleIntroScreen && battleIntroScreen.classList.contains('active')) {
            onCompleteCallback(); 
        }
    }, 3000); // 3 segundos de animação
}


function startGame() {
    initState();
    playBattleIntroAnimation(startCombat); 
}

function startAtPhase(phaseIndex) {
    initState();
    state.currentPhaseIndex = phaseIndex;
    playBattleIntroAnimation(startCombat);
}

function populatePhaseMenu() {
     const phaseButtonsContainer = document.getElementById('phase-buttons-container');
    if (!phaseButtonsContainer) return;
    phaseButtonsContainer.innerHTML = '';
    phases.forEach((phase, index) => {
        const button = document.createElement('button');
        button.textContent = `${index + 1}. ${phase.enemy}`;
        button.classList.add('btn-phase');
        button.onclick = () => startAtPhase(index); 
        phaseButtonsContainer.appendChild(button);
    });
}

// --- FUNÇÕES DE COMBATE ---

function startCombat() {
    switchScreen(gameScreen); 
    const phase = phases[state.currentPhaseIndex];
    if (!phase) { console.error("Fase inválida em startCombat"); return; } // Verificação extra
    
    state.currentQuestionIndex = 0;
    state.enemy = { hp: 5, maxHp: 5, name: phase.enemy };
    
    if (centralMessage) centralMessage.textContent = `Fase ${state.currentPhaseIndex + 1}: ${phase.name}`;
    
    if (narrativeView) narrativeView.classList.add('hidden');
    if (combatView) combatView.classList.remove('hidden');
    
    if (enemyStatusContainer) enemyStatusContainer.classList.remove('hidden');
    if (enemyName) enemyName.textContent = state.enemy.name;
    
    if (playerSpriteContainer) playerSpriteContainer.innerHTML = `<img src="${characterAssets.player}" alt="Atena">`;
    if (enemySpriteContainer) enemySpriteContainer.innerHTML = `<img src="${phase.asset}" alt="${phase.enemy}">`;
    
    updateUI();
    nextQuestion();
}

function nextQuestion() {
    state.answered = false;
    state.hintUsed = false;
    if (useHintButton) {
        useHintButton.disabled = false;
        useHintButton.classList.remove('opacity-50');
    }
    if (feedbackText) {
        feedbackText.textContent = '';
        feedbackText.classList.remove('pop-in');
    }
    
    const phase = phases[state.currentPhaseIndex];
    if (!phase || !phase.questions) { console.error("Fase ou perguntas inválidas em nextQuestion"); return; } 
    
    if (state.currentQuestionIndex >= phase.questions.length) {
        endGame(false, "Você usou todas as suas perguntas, mas o inimigo resistiu!");
        return;
    }

    const questionData = phase.questions[state.currentQuestionIndex];
    if (!questionData) { console.error("Dados da pergunta inválidos"); return; } 

    if (questionCategory) questionCategory.textContent = questionData.category;
    if (questionText) questionText.textContent = questionData.question;
    if (optionsContainer) optionsContainer.innerHTML = '';
    
    if (questionData.options && optionsContainer) {
        questionData.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.disabled = false;
            button.classList.add('btn-option', 'w-full', 'py-3', 'px-4', 'rounded-lg', 'text-lg'); // Revertido para text-lg, ajuste se necessário no CSS mobile
            button.onclick = () => selectAnswer(button, option, questionData.correctAnswer);
            optionsContainer.appendChild(button);
        });
    }
    
    startTimer(phase.timer);
}

function startTimer(duration) {
     clearTimeout(state.timer);
     if (!timerBar) return; // Verifica se timerBar existe
    timerBar.style.transition = 'none';
    timerBar.style.width = '100%';
    timerBar.offsetHeight; 
    timerBar.style.transition = `width ${duration}s linear`;
    timerBar.style.width = '0%';
    state.timer = setTimeout(() => {
        if (!state.answered) { 
            if (feedbackText) {
                feedbackText.textContent = "Tempo Esgotado!";
                feedbackText.className = `font-cinzel mb-4 text-red-400`;
                feedbackText.classList.add('pop-in');
            }
            handleAnswer(false); 
        }
    }, duration * 1000);
}

function selectAnswer(button, selected, correct) {
     if (state.answered || !button) return; // Verifica se botão existe
    state.answered = true;
    clearTimeout(state.timer);
    
    if (timerBar) {
        const computedWidth = window.getComputedStyle(timerBar).width;
        timerBar.style.transition = 'none';
        timerBar.style.width = computedWidth;
    }
    
    if (optionsContainer) {
        Array.from(optionsContainer.children).forEach(btn => btn.disabled = true);
    }
    
    const isCorrect = selected === correct;
    button.classList.add(isCorrect ? 'correct' : 'wrong');
    
    if (!isCorrect && optionsContainer) {
        Array.from(optionsContainer.children).forEach(btn => {
            if (btn.textContent === correct) { btn.classList.add('correct'); }
        });
    }
    
    if (feedbackText) {
        feedbackText.textContent = isCorrect ? "Correto!" : "Errado!";
        feedbackText.className = `font-cinzel mb-4 ${isCorrect ? 'text-green-400' : 'text-red-400'}`;
        feedbackText.classList.add('pop-in');
    }
    
    handleAnswer(isCorrect);
}

function handleAnswer(isCorrect) {
    let damageToPlayer = isCorrect ? 0 : (state.hintUsed ? 0.5 : 1);
    
    if (isCorrect) {
        state.enemy.hp--;
        if (enemySpriteContainer) enemySpriteContainer.classList.add('hit-effect');
    } else {
        state.player.hp -= damageToPlayer;
        if (playerSpriteContainer) playerSpriteContainer.classList.add('hit-effect');
        if (gameContainer) gameContainer.classList.add('shake');
    }
    
    updateUI();

    setTimeout(() => {
        if (playerSpriteContainer) playerSpriteContainer.classList.remove('hit-effect');
        if (enemySpriteContainer) enemySpriteContainer.classList.remove('hit-effect');
        if (gameContainer) gameContainer.classList.remove('shake');

        if (state.enemy.hp <= 0) {
            state.pagesCollected++;
            if (state.currentPhaseIndex >= phases.length - 1) {
                // Se for a última fase (Dragão), vai para o jogo de plataforma
                startFinalPlatformerStage(); 
            } else {
                // Se não, vai para o jogo da memória
                startMemoryGame();
            }
            return;
        }
        
        if (state.player.hp <= 0) {
            endGame(false);
            return;
        }

        // Se o jogo continua, vai para a próxima pergunta
        state.currentQuestionIndex++;
        nextQuestion();

    }, 2000); 
}

function useHint() {
    if (state.player.hints > 0 && !state.hintUsed && !state.answered) {
        state.hintUsed = true;
        state.player.hints--;
        if (useHintButton) {
            useHintButton.disabled = true;
            useHintButton.classList.add('opacity-50');
        }
        updateUI();
        
        const phase = phases[state.currentPhaseIndex];
        const questionData = phase.questions[state.currentQuestionIndex];
        const correctAnswer = questionData.correctAnswer;
        
        const wrongOptions = questionData.options.filter(opt => opt !== correctAnswer);
        
        if (wrongOptions.length > 0 && optionsContainer) {
            const optionToRemove = wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
            Array.from(optionsContainer.children).forEach(btn => {
                if (btn.textContent === optionToRemove) {
                    btn.disabled = true;
                    btn.classList.add('opacity-25', 'pointer-events-none');
                }
            });
        }
    }
}

// --- JOGO DA MEMÓRIA (CÓDIGO CORRIGIDO E ADICIONADO) ---
let memoryGame = { firstCard: null, secondCard: null, lockBoard: false, matchesFound: 0, totalPairs: 6 };
// URLs de imagens de exemplo para os pares de cartas
const cardImages = [
    'https://i.imgur.com/4jtQFY2.jpeg', // Espada
    'https://i.imgur.com/lGPG6Qg.jpeg', // Escudo
    'https://i.imgur.com/l8MIG27.jpeg', // Poção
    'https://i.imgur.com/Ov3qLQ1.jpeg', // Chave
    'https://i.imgur.com/SJm4Y66.jpeg', // Anel
    'https://i.imgur.com/fUNTp1L.jpeg'  // Pergaminho
];

/**
 * Inicia a tela e a lógica do jogo da memória.
 */
function startMemoryGame() {
    switchScreen(memoryGameScreen);
    // Esconde o botão de continuar até que o jogo seja ganho
    if(continueToNextPhaseButton) continueToNextPhaseButton.classList.add('hidden');
    
    // Reseta o estado do jogo da memória
    memoryGame.firstCard = null;
    memoryGame.secondCard = null;
    memoryGame.lockBoard = false;
    memoryGame.matchesFound = 0;
    memoryGame.totalPairs = cardImages.length; // Garante que o total de pares é dinâmico

    createMemoryBoard();
}

/**
 * Cria e embaralha o tabuleiro do jogo da memória.
 */
function createMemoryBoard() {
    if (!memoryGameBoard) return;
    memoryGameBoard.innerHTML = ''; // Limpa o tabuleiro anterior
    
    // Duplica os símbolos para formar pares
    const allCards = [...cardImages, ...cardImages];

    // Embaralha (Algoritmo Fisher-Yates)
    for (let i = allCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allCards[i], allCards[j]] = [allCards[j], allCards[i]];
    }

    // Cria os elementos HTML dos cards
    allCards.forEach(imageUrl => {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.dataset.image = imageUrl; // Guarda a URL da imagem no 'dataset' para verificação

        // Adiciona a frente (imagem) e o verso (livro)
        card.innerHTML = `
            <div class="card-front">
                <img src="${imageUrl}" alt="Símbolo da Carta" style="width: 100%; height: 100%; object-fit: contain; padding: 10px; box-sizing: border-box;">
            </div>
            <div class="card-back">
                📚
            </div>
        `;
        
        card.addEventListener('click', flipCard);
        memoryGameBoard.appendChild(card);
    });
}

/**
 * Lógica para virar um card quando clicado.
 */
function flipCard() {
    // 'this' se refere ao 'card' que foi clicado
    if (memoryGame.lockBoard) return; // Trava o tabuleiro enquanto 2 cartas são checadas
    if (this === memoryGame.firstCard) return; // Impede clique duplo no mesmo card

    this.classList.add('flipped');

    if (!memoryGame.firstCard) {
        // Este é o primeiro card virado
        memoryGame.firstCard = this;
        return;
    }

    // Este é o segundo card virado
    memoryGame.secondCard = this;
    memoryGame.lockBoard = true; // Trava o tabuleiro

    checkForMatch();
}

/**
 * Verifica se os dois cards virados são um par.
 */
function checkForMatch() {
    const isMatch = memoryGame.firstCard.dataset.image === memoryGame.secondCard.dataset.image;

    if (isMatch) {
        disableCards();
    } else {
        unflipCards();
    }
}

/**
 * Chamada se os cards formarem um par.
 */
function disableCards() {
    memoryGame.firstCard.classList.add('matched');
    memoryGame.secondCard.classList.add('matched');

    // Remove o listener para não serem mais clicáveis
    memoryGame.firstCard.removeEventListener('click', flipCard);
    memoryGame.secondCard.removeEventListener('click', flipCard);

    memoryGame.matchesFound++;

    // Verifica se o jogo acabou
    if (memoryGame.matchesFound === memoryGame.totalPairs) {
        // Vitória! Mostra o botão para avançar
        setTimeout(() => {
            if(continueToNextPhaseButton) {
                continueToNextPhaseButton.classList.remove('hidden');
                continueToNextPhaseButton.classList.add('pop-in'); // Adiciona animação (do CSS)
            }
        }, 1000); // Espera 1s para mostrar o botão
    }

    resetTurn();
}

/**
 * Chamada se os cards não formarem um par.
 */
function unflipCards() {
    setTimeout(() => {
        if (memoryGame.firstCard) memoryGame.firstCard.classList.remove('flipped');
        if (memoryGame.secondCard) memoryGame.secondCard.classList.remove('flipped');
        resetTurn();
    }, 1200); // Espera 1.2s antes de virar de volta
}

/**
 * Reseta o estado do turno (não o jogo inteiro).
 */
function resetTurn() {
    [memoryGame.firstCard, memoryGame.secondCard] = [null, null];
    memoryGame.lockBoard = false;
}

// --- FIM DE JOGO E UI ---
function endGame(isVictory, customMessage = "") {
    switchScreen(endScreen);
    if(endTitle) endTitle.textContent = isVictory ? "Vitória!" : "Fim de Jogo";
    if(endMessage) endMessage.textContent = customMessage || (isVictory ? "Você venceu!" : "A escuridão prevaleceu. Atena foi derrotada, mas a esperança ainda vive. Tente novamente!");
}

function updateUI() {
    if(playerHpText) playerHpText.textContent = Math.ceil(Math.max(0, state.player.hp));
    if(playerHpBar) playerHpBar.style.width = `${(Math.max(0, state.player.hp) / state.player.maxHp) * 100}%`;
    if(pagesCollectedEl) pagesCollectedEl.textContent = state.pagesCollected;
    if(hintCountEl) hintCountEl.textContent = state.player.hints;
    
    // Verifica se combatView existe e NÃO está hidden
    if(state.enemy && combatView && !combatView.classList.contains('hidden')) { 
        if(enemyHpText) enemyHpText.textContent = Math.max(0, state.enemy.hp);
        if(enemyHpBar) enemyHpBar.style.width = `${(Math.max(0, state.enemy.hp) / state.enemy.maxHp) * 100}%`;
    }
}

// --- FASE FINAL DE PLATAFORMA (MELHORADA COM PARALLAX E CONTROLES MOBILE) ---
const LEVEL_WIDTH = 2100; 
const PARALLAX_FACTOR = 0.2; 

function startFinalPlatformerStage() {
    if (!finalPlatformerScreen || !platformerCanvas) {
        console.error("Tela ou canvas da fase final não encontrados!");
        switchScreen(startScreen); // Volta pro início se algo deu errado
        return;
    }
    switchScreen(finalPlatformerScreen); 
    platformerCanvas.classList.remove('final-battle-background'); 
    
    platformerCanvas.width = 700;
    platformerCanvas.height = 400;

    const playerImg = new Image();
    console.log("Tentando carregar imagem do jogador:", characterAssets.player); 
    playerImg.src = characterAssets.player;
    playerImg.onerror = () => {
        console.error("ERRO: Não foi possível carregar a imagem do jogador em:", playerImg.src);
        if(platformerState) platformerState.assets.player = null; 
    };
    
    platformerState = { 
        player: { x: 50, y: 320, width: 40, height: 50, speed: 4.5, velocityX: 0, velocityY: 0, jumping: false, grounded: false }, 
        gravity: 0.65, 
        friction: 0.85, 
        keys: {}, 
        camera: { x: 0 }, 
        levelWidth: LEVEL_WIDTH,
        platforms: [ 
            { x: 0, y: 380, width: 250, height: 20 },      
            { x: 300, y: 340, width: 100, height: 20 },     
            { x: 450, y: 300, width: 80, height: 20 },     
            { x: 580, y: 300, width: 80, height: 20, type: 'movingX', speed: 1.0, direction: 1, range: 60, startX: 580 },
            { x: 600, y: 350, width: 120, height: 20 }, 
            { x: 780, y: 300, width: 60, height: 20, type: 'movingY', speed: 1.2, direction: 1, range: 70, startY: 300 }, 
            { x: 900, y: 250, width: 100, height: 20 },   
            { x: 1050, y: 300, width: 80, height: 20 },
            { x: 1180, y: 310, width: 80, height: 20, type: 'movingY', speed: 0.8, direction: 1, range: 50, startY: 310 },
            { x: 1200, y: 350, width: 150, height: 20 }, 
            { x: 1400, y: 310, width: 100, height: 20 },
            { x: 1530, y: 280, width: 70, height: 20, type: 'movingX', speed: 1.1, direction: 1, range: 50, startX: 1530 },
            { x: 1550, y: 270, width: 60, height: 20 }, 
            { x: 1700, y: 340, width: 100, height: 20, type: 'movingX', speed: 0.9, direction: 1, range: 50, startX: 1700 }, 
            { x: 1850, y: 300, width: 70, height: 20, type: 'movingY', speed: 1.0, direction: 1, range: 60, startY: 300 },
            { x: 1900, y: 380, width: 200, height: 20 }     
        ], 
        obstacles: [], 
        book: { x: 925, y: 200, width: 50, height: 50, glow: 10 }, 
        door: { x: 2000, y: 310, width: 40, height: 70 }, 
        assets: { player: playerImg },
        stars: Array.from({ length: 150 }, () => ({ 
            x: Math.random() * LEVEL_WIDTH, 
            y: Math.random() * platformerCanvas.height, 
            radius: Math.random() * 1.5, 
            opacity: Math.random() * 0.8 + 0.2 
        })), 
        paused: false,    
        atCheckpoint: false 
    };
    
    if (checkpointMessageBox) checkpointMessageBox.classList.add('hidden'); 

    document.removeEventListener('keydown', platformerKeyDown);
    document.removeEventListener('keyup', platformerKeyUp);
    document.addEventListener('keydown', platformerKeyDown);
    document.addEventListener('keyup', platformerKeyUp);

    removeMobileControlListeners(); 
    addMobileControlListeners(); 
    
    cancelAnimationFrame(animationFrameId);
    platformerLoop();
}

// --- FUNÇÕES DE CONTROLE E LÓGICA DA PLATAFORMA ---

function platformerKeyDown(e) { 
    if (platformerState && platformerState.keys) { // Verifica se state existe
       platformerState.keys[e.code] = true; 
    }
}
function platformerKeyUp(e) { 
     if (platformerState && platformerState.keys) {
        platformerState.keys[e.code] = false; 
     }
}

function checkCollision(shapeA, shapeB) {
    if (!shapeA || !shapeB) return null; 
    const vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2));
    const vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2));
    const hWidths = (shapeA.width / 2) + (shapeB.width / 2);
    const hHeights = (shapeA.height / 2) + (shapeB.height / 2);
    let colDir = null;
    
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
        const oX = hWidths - Math.abs(vX), oY = hHeights - Math.abs(vY);
        if (oX >= oY) {
            if (vY > 0) { colDir = "top"; shapeA.y += oY; } else { colDir = "bottom"; shapeA.y -= oY; }
        } else {
            if (vX > 0) { colDir = "left"; shapeA.x += oX; } else { colDir = "right"; shapeA.x -= oX; }
        }
    }
    return colDir;
}

function platformerLoop() {
      // Verifica se o estado existe antes de tentar acessá-lo
      if (!platformerState || !platformerState.player) {
           console.warn("Estado da plataforma não inicializado, parando loop.");
           cancelAnimationFrame(animationFrameId);
           return;
      }

    if (platformerState.paused) {
        drawPlatformerScene(); 
        animationFrameId = requestAnimationFrame(platformerLoop);
        return; 
    }

    const player = platformerState.player;
    const keys = platformerState.keys;
    const camera = platformerState.camera;
    const levelWidth = platformerState.levelWidth;
    const canvasWidth = platformerCanvas.width;
    
    // Movimento do Jogador (Lê o objeto `keys` que é atualizado por teclado OU touch)
    if (keys['ArrowRight'] || keys['KeyD']) { if (player.velocityX < player.speed) { player.velocityX++; } }
    if (keys['ArrowLeft'] || keys['KeyA']) { if (player.velocityX > -player.speed) { player.velocityX--; } }
    if ((keys['Space'] || keys['ArrowUp'] || keys['KeyW']) && !player.jumping && player.grounded) {
        player.jumping = true;
        player.grounded = false;
        player.velocityY = -player.speed * 2.8; 
    }
    
    player.velocityX *= platformerState.friction;
    player.velocityY += platformerState.gravity;
    player.grounded = false;
    
    // Atualiza plataformas móveis
     platformerState.platforms.forEach(platform => {
         if (platform.type === 'movingX') {
             platform.x += platform.speed * platform.direction;
             if (platform.x > platform.startX + platform.range || platform.x < platform.startX - platform.range) { 
                 platform.direction *= -1; 
             }
         } else if (platform.type === 'movingY') {
             platform.y += platform.speed * platform.direction;
              if (platform.y > platform.startY + platform.range || platform.y < platform.startY - platform.range) { 
                 platform.direction *= -1; 
             }
         }
     });

    // Colisão com Plataformas
    platformerState.platforms.forEach(platform => {
        const dir = checkCollision(player, platform);
        if (dir === "left" || dir === "right") { player.velocityX = 0; } 
        else if (dir === "bottom") { 
            player.grounded = true; 
            player.jumping = false;
             if (platform.type === 'movingX') { player.x += platform.speed * platform.direction; }
              if (platform.type === 'movingY' && platform.direction < 0 && player.velocityY >= 0) { 
                 player.y = platform.y - player.height; 
                 player.velocityY = platform.speed * platform.direction; 
             } else if(platform.type === 'movingY' && platform.direction > 0) {
                 // Deixa cair normalmente se a plataforma desce
             } else {
                 player.velocityY = 0; 
             }
        } 
        else if (dir === "top") { player.velocityY *= 0.5; } 
    });
    
    // Atualiza posição X
    player.x += player.velocityX;

    // Colisão Horizontal X
     platformerState.platforms.forEach(platform => {
         const dir = checkCollision(player, platform);
         if (dir === "left" || dir === "right") { 
             player.x -= player.velocityX; 
             player.velocityX = 0; 
         } 
     });

    // Atualiza posição Y
    player.y += player.velocityY;

    // Colisão Vertical Y
     platformerState.platforms.forEach(platform => {
         const dir = checkCollision(player, platform);
          if (dir === "bottom") { 
             player.grounded = true; 
             player.jumping = false;
             player.y = platform.y - player.height; 
             player.velocityY = 0; 
              if (platform.type === 'movingY' && platform.direction > 0) {
                   player.velocityY = platform.speed * platform.direction; 
              }
         } else if (dir === "top") { 
             player.y = platform.y + platform.height; 
             player.velocityY = 0; 
         }
     });

    // Limites do NÍVEL e Reset
    if (player.x < 0) { player.x = 0; player.velocityX = 0; }
    if (player.x + player.width > levelWidth) { player.x = levelWidth - player.width; player.velocityX = 0; }
    if (player.y > platformerCanvas.height + 100) { 
        resetPlayerPosition();
    }
    
    // ATUALIZA CÂMERA
    let targetCameraX = player.x + player.width / 2 - canvasWidth / 2;
    camera.x += (targetCameraX - camera.x) * 0.08; 
    camera.x = Math.max(0, Math.min(levelWidth - canvasWidth, camera.x));

    // Colisão com o Livro (Checkpoint)
    if (!platformerState.atCheckpoint && checkCollision(player, platformerState.book)) {
        platformerState.paused = true; 
        platformerState.atCheckpoint = true; 
        if(checkpointText) checkpointText.textContent = "Você encontrou uma página perdida! O conhecimento a fortalece.";
        if(checkpointMessageBox) checkpointMessageBox.classList.remove('hidden'); 
        
        if(continuePlatformerButton) {
            continuePlatformerButton.removeEventListener('click', handleContinueFromCheckpoint); // Remove para segurança
            continuePlatformerButton.addEventListener('click', handleContinueFromCheckpoint, { once: true }); // Adiciona com { once: true }
        }
    }
    
    // Colisão com a Porta (Fim)
    if (checkCollision(player, platformerState.door)) {
        document.removeEventListener('keydown', platformerKeyDown);
        document.removeEventListener('keyup', platformerKeyUp);
        removeMobileControlListeners(); 
        cancelAnimationFrame(animationFrameId);
        switchScreen(epilogueScreen); 
        return;
    }
    
    // Desenha tudo
    drawPlatformerScene();
    
    animationFrameId = requestAnimationFrame(platformerLoop);
}

// Handler para o botão "Continuar" do checkpoint
function handleContinueFromCheckpoint() {
    if (!platformerState) return; // Segurança extra
    platformerState.paused = false; 
    if(checkpointMessageBox) checkpointMessageBox.classList.add('hidden'); 
    // O { once: true } no addEventListener já remove automaticamente após o clique
}


// Função auxiliar para resetar a posição do jogador (COM FIX DO CHECKPOINT)
function resetPlayerPosition() {
    if (!platformerState || !platformerState.player) return; // Segurança extra
    platformerState.player.x = 50; 
    platformerState.player.y = 320; 
    platformerState.player.velocityX = 0; 
    platformerState.player.velocityY = 0;
    platformerState.player.jumping = false;
    platformerState.player.grounded = false;
    platformerState.camera.x = Math.max(0, platformerState.player.x - 100); 
    platformerState.atCheckpoint = false; // Reseta o estado do livro! 
}

// Função para desenhar a cena do platformer
function drawPlatformerScene() {
    // Verifica se platformerState e camera existem
    if (!platformerState || !platformerState.camera) {
        console.warn("Tentando desenhar cena sem estado de plataforma inicializado.");
        return; 
    }
    const cameraX = platformerState.camera.x;
    ctx.clearRect(0, 0, platformerCanvas.width, platformerCanvas.height);
    
    // Estrelas
    ctx.fillStyle = "white";
    if (platformerState.stars) { // Verifica se stars existem
        platformerState.stars.forEach(star => { 
            const parallaxX = (star.x - cameraX * PARALLAX_FACTOR);
            const drawX = (parallaxX % platformerCanvas.width + platformerCanvas.width) % platformerCanvas.width; 
            
            ctx.globalAlpha = star.opacity; 
            ctx.beginPath(); 
            ctx.arc(drawX, star.y, star.radius, 0, Math.PI * 2); 
            ctx.fill(); 
        });
    }
    ctx.globalAlpha = 1;

    const drawRelativeToCamera = (element) => {
        if (!element) return null;
        const drawX = Math.round(element.x - cameraX); 
        if (drawX + element.width > -50 && drawX < platformerCanvas.width + 50) {
             return drawX;
        }
        return null; 
    };

    // Plataformas
    const platformColor = "#a37b4c";
    const platformDetailColor = "#7a5c39"; 
    if (platformerState.platforms) { // Verifica se platforms existem
        platformerState.platforms.forEach(platform => { 
            const drawX = drawRelativeToCamera(platform);
            if (drawX !== null) {
                ctx.fillStyle = platformColor;
                ctx.fillRect(drawX, platform.y, platform.width, platform.height); 
                
                ctx.strokeStyle = platformDetailColor;
                ctx.lineWidth = 1;
                for(let i = 10; i < platform.width; i += 20) {
                    ctx.beginPath();
                    ctx.moveTo(drawX + i, platform.y);
                    ctx.lineTo(drawX + i, platform.y + platform.height);
                    ctx.stroke();
                }
                if(platform.height >= 15) {
                     ctx.beginPath();
                     ctx.moveTo(drawX, platform.y + platform.height / 2);
                     ctx.lineTo(drawX + platform.width, platform.y + platform.height / 2);
                     ctx.stroke();
                }
                ctx.strokeStyle = "#4d3a25"; 
                ctx.strokeRect(drawX, platform.y, platform.width, platform.height);
            }
        });
    }
    
    // Livro 
    if (platformerState.book) { // Verifica se book existe
        const bookDrawX = drawRelativeToCamera(platformerState.book);
         if (bookDrawX !== null) {
             ctx.save();
             ctx.shadowColor = 'rgba(255, 255, 150, 0.8)';
             ctx.shadowBlur = platformerState.book.glow;
             ctx.font = "40px serif"; 
             ctx.textAlign = "center";
             ctx.textBaseline = "middle";
             const bookXCenter = bookDrawX + platformerState.book.width / 2;
             const bookYCenter = platformerState.book.y + platformerState.book.height / 2;
             ctx.fillText('📖', bookXCenter, bookYCenter); 
             ctx.restore();
             platformerState.book.glow = 10 + Math.sin(Date.now() / 300) * 5; 
         }
    }
    
    // Porta
    if (platformerState.door) { // Verifica se door existe
        const doorDrawX = drawRelativeToCamera(platformerState.door);
         if (doorDrawX !== null) {
             ctx.fillStyle = "#6F4E37"; 
             ctx.fillRect(doorDrawX, platformerState.door.y, platformerState.door.width, platformerState.door.height);
             ctx.fillStyle = "#4d3a25"; 
             ctx.fillRect(doorDrawX + 5, platformerState.door.y + 5, platformerState.door.width - 10, platformerState.door.height - 10); 
             ctx.fillStyle = "#FAD02C"; 
             ctx.beginPath();
             ctx.arc(doorDrawX + platformerState.door.width * 0.8, platformerState.door.y + platformerState.door.height * 0.5, 4, 0, Math.PI * 2); 
             ctx.fill();
         }
    }

    // Jogador (Atena)
    if (platformerState.player && platformerState.assets) { // Verifica player e assets
        const playerDrawX = Math.round(platformerState.player.x - cameraX); 
        if (platformerState.assets.player && platformerState.assets.player.complete && platformerState.assets.player.naturalWidth !== 0) { 
           ctx.drawImage(platformerState.assets.player, playerDrawX, platformerState.player.y, platformerState.player.width, platformerState.player.height);
        } else { 
            ctx.fillStyle = "blue"; 
            ctx.fillRect(playerDrawX, platformerState.player.y, platformerState.player.width, platformerState.player.height);
        }
    }
}


// --- EVENT LISTENERS ---

// ** NOVAS FUNÇÕES E LISTENERS PARA CONTROLES MOBILE **
function handleTouchStart(e) {
    e.preventDefault(); 
    if (platformerState && platformerState.keys) { 
        // Identifica o botão pelo ID do elemento que recebeu o toque
        let targetId = e.target.id; 
        // Se o toque foi no ícone dentro do botão, pega o ID do botão pai
        if (!targetId && e.target.parentElement) {
            targetId = e.target.parentElement.id;
        }

        switch (targetId) {
            case 'btn-left':
                platformerState.keys['ArrowLeft'] = true;
                break;
            case 'btn-right':
                platformerState.keys['ArrowRight'] = true;
                break;
            case 'btn-jump':
                platformerState.keys['Space'] = true; 
                break;
        }
    }
}

function handleTouchEnd(e) {
    e.preventDefault();
     if (platformerState && platformerState.keys) {
         // Desliga TODAS as teclas simuladas quando qualquer botão de toque é solto
         platformerState.keys['ArrowLeft'] = false;
         platformerState.keys['ArrowRight'] = false;
         platformerState.keys['Space'] = false; 
     }
}

// Guarda os listeners para poder removê-los corretamente
const mobileListeners = [
    { element: btnLeft, type: 'touchstart', handler: handleTouchStart },
    { element: btnRight, type: 'touchstart', handler: handleTouchStart },
    { element: btnJump, type: 'touchstart', handler: handleTouchStart },
    { element: document, type: 'touchend', handler: handleTouchEnd }, // Listener global para touchend
    { element: document, type: 'touchcancel', handler: handleTouchEnd }, // Trata cancelamentos
    // Mouse listeners para teste
    { element: btnLeft, type: 'mousedown', handler: handleTouchStart },
    { element: btnRight, type: 'mousedown', handler: handleTouchStart },
    { element: btnJump, type: 'mousedown', handler: handleTouchStart },
    { element: document, type: 'mouseup', handler: handleTouchEnd } // Listener global para mouseup
];

function addMobileControlListeners() {
    mobileListeners.forEach(listener => {
        if (listener.element) { // Verifica se o elemento existe
           listener.element.addEventListener(listener.type, listener.handler, { passive: false });
        }
    });
}

function removeMobileControlListeners() {
     mobileListeners.forEach(listener => {
         if (listener.element) {
            listener.element.removeEventListener(listener.type, listener.handler);
         }
     });
}


// Listeners Padrão
document.addEventListener('DOMContentLoaded', () => {
    switchScreen(startScreen);
    populatePhaseMenu();
});

startButton.addEventListener('click', playIntro); 
restartButton.addEventListener('click', startGame);
if(useHintButton) useHintButton.addEventListener('click', useHint); // Verifica se existe

if(backToStartButton) {
    backToStartButton.addEventListener('click', () => {
        populatePhaseMenu();
        switchScreen(startScreen);
    });
}

if(continueToNextPhaseButton) {
    continueToNextPhaseButton.addEventListener('click', () => {
        // Esta é a lógica de progressão de nível
        state.currentPhaseIndex++;
        // Inicia a animação de batalha, que por sua vez chama startCombat()
        playBattleIntroAnimation(startCombat);
    });
}

if(skipIntroButton) skipIntroButton.addEventListener('click', startGame);

const crawlContentElement = document.querySelector('.crawl-content');
if (crawlContentElement) {
    crawlContentElement.addEventListener('animationend', () => {
        if (introCrawlScreen && introCrawlScreen.classList.contains('active')) {
            startGame();
        }
    });
} else {
    console.warn("Elemento .crawl-content não encontrado para adicionar listener de animationend.");
}
