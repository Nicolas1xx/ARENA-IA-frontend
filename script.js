document.addEventListener('DOMContentLoaded', () => {
    const inputNome = document.getElementById('nome-jogadores');
    const inputFormacao = document.getElementById('formacao');
    const inputEstilo = document.getElementById('estilo-jogo');
    const selectJogadoresPredefinidos = document.getElementById('jogadores-predefinidos-select'); // Certifique-se que este ID está no seu HTML

    const btnSaberMais = document.getElementById('saber-mais-btn');
    const btnGerar = document.getElementById('gerar-esquema-btn');
    const btnLimpar = document.getElementById('limpar-campos-btn');

    const responseContainer = document.getElementById('response');
    const campoEsquemaContainer = document.getElementById('campo-esquema');
    const pitchContainerElement = document.querySelector('.football-pitch .pitch-lines');

    const infoTreinadoresSecao = document.getElementById('info-treinadores-secao');
    const listaTreinadoresContainer = document.getElementById('lista-treinadores-container');
    const btnFecharInfoTreinadores = document.getElementById('fechar-info-treinadores-btn');

    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) currentYearSpan.textContent = new Date().getFullYear();

    const treinadoresLendarios = [
        { nome: "Rinus Michels", filosofia: "Pai do 'Futebol Total', enfatizava a versatilidade, pressão alta e fluidez tática. Seu Ajax e a Holanda de 74 encantaram o mundo.", conquistasChave: "Eurocopa (1988), Copa dos Campeões da UEFA (Ajax)." },
        { nome: "Arrigo Sacchi", filosofia: "Revolucionou o Milan com marcação por zona agressiva, linha defensiva alta e compactação. Influenciou gerações.", conquistasChave: "2 Copas dos Campeões da UEFA (Milan), Mundial Interclubes." },
        { nome: "Johan Cruyff", filosofia: "Aprofundou o 'Futebol Total' no Barcelona, focando na posse de bola ('jogo de posição'), técnica e a filosofia de 'La Masia'.", conquistasChave: "Copa dos Campeões da UEFA (Barcelona), 4 La Ligas." },
        { nome: "Pep Guardiola", filosofia: "Evoluiu o 'jogo de posição', com extrema posse, pressão pós-perda (gegenpressing) e criação de superioridade numérica.", conquistasChave: "Múltiplas Ligas dos Campeões da UEFA, diversas ligas nacionais." },
        { nome: "Sir Alex Ferguson", filosofia: "Gestão de elenco magistral, adaptabilidade tática e mentalidade vencedora implacável. Priorizava ataques rápidos.", conquistasChave: "2 Ligas dos Campeões da UEFA (Man Utd), 13 Premier Leagues." },
        { nome: "José Mourinho", filosofia: "Mestre da organização defensiva, transições rápidas e pragmatismo tático. Foco em resultados e explorar fraquezas adversárias.", conquistasChave: "Múltiplas Ligas dos Campeões da UEFA (Porto, Inter)." },
        { nome: "Carlo Ancelotti", filosofia: "Flexibilidade tática e excelente gestão de estrelas ('mão de veludo'). Adapta sistemas ao elenco, promovendo harmonia.", conquistasChave: "Recordista de Ligas dos Campeões da UEFA, ligas nas 5 grandes da Europa." },
        { nome: "Jürgen Klopp", filosofia: "Popularizou o 'Gegenpressing' em alta intensidade e futebol vertical ('Heavy Metal Football'). Foco em energia e trabalho em equipe.", conquistasChave: "Liga dos Campeões da UEFA (Liverpool), Premier League, Bundesliga." },
        { nome: "Helenio Herrera", filosofia: "Pioneiro do 'Catenaccio' na Grande Inter, com defesa ultra-sólida, disciplina rígida e contra-ataques mortais.", conquistasChave: "2 Copas dos Campeões da UEFA (Inter), Mundiais Interclubes." },
        { nome: "Valeriy Lobanovskyi", filosofia: "Cientista do futebol, usou dados para otimizar o desempenho. Seu Dynamo Kyiv era conhecido pela intensidade e jogo coletivo.", conquistasChave: "2 Recopas Europeias (Dynamo Kyiv), Supercopa da UEFA." }
    ];

    function toggleSection(sectionElement, show) {
        if (!sectionElement) return;
        if (show) {
            sectionElement.classList.remove('hidden-initially');
            sectionElement.classList.add('shown', 'fade-in-section');
        } else {
            sectionElement.classList.remove('shown', 'fade-in-section'); 
            sectionElement.classList.add('hidden-initially');
        }
    }

    if (selectJogadoresPredefinidos && inputNome) {
        selectJogadoresPredefinidos.addEventListener('change', function() {
            if (this.value) {
                inputNome.value = this.value;
            }
        });
    }

    if (btnSaberMais && infoTreinadoresSecao && listaTreinadoresContainer && btnFecharInfoTreinadores) {
        btnSaberMais.addEventListener('click', () => {
            listaTreinadoresContainer.innerHTML = '<p class="text-center text-slate-400">Carregando...</p>';
            setTimeout(() => {
                listaTreinadoresContainer.innerHTML = '';
                treinadoresLendarios.forEach(treinador => {
                    const treinadorCardHTML = `
                        <div class="bg-slate-800/70 p-5 rounded-lg shadow-md border border-slate-700/50 hover:border-sky-500/70 transition-all duration-200 ease-in-out">
                            <h3 class="text-xl sm:text-2xl font-semibold text-sky-400 mb-2">${treinador.nome}</h3>
                            <p class="text-slate-300 text-sm sm:text-base mb-3 leading-relaxed"><strong class="font-medium text-sky-500/90">Filosofia:</strong> ${treinador.filosofia}</p>
                            <p class="text-slate-400 text-xs sm:text-sm"><strong class="font-medium text-sky-500/80">Conquistas Chave:</strong> ${treinador.conquistasChave}</p>
                        </div>
                    `;
                    listaTreinadoresContainer.insertAdjacentHTML('beforeend', treinadorCardHTML);
                });
            }, 100);
            toggleSection(infoTreinadoresSecao, true);
            toggleSection(responseContainer, false);
            toggleSection(campoEsquemaContainer, false);
        });
        btnFecharInfoTreinadores.addEventListener('click', () => {
            toggleSection(infoTreinadoresSecao, false);
        });
    }

    function aplicarFormacao(formacaoSelecionada) {
        const posicoesPadrao = {
            "4-4-2": [
                { id: "jogador1", left: "7%",  top: "50%" }, { id: "jogador2", left: "28%", top: "20%" }, { id: "jogador3", left: "22%", top: "43%" },
                { id: "jogador4", left: "22%", top: "57%" }, { id: "jogador5", left: "28%", top: "80%" }, { id: "jogador6", left: "50%", top: "25%" },
                { id: "jogador7", left: "45%", top: "45%" }, { id: "jogador8", left: "45%", top: "55%" }, { id: "jogador9", left: "50%", top: "75%" },
                { id: "jogador10",left: "72%", top: "40%" }, { id: "jogador11",left: "72%", top: "60%" }
            ],
            "4-3-3": [
                { id: "jogador1", left: "7%",  top: "50%" }, { id: "jogador2", left: "28%", top: "18%" }, { id: "jogador3", left: "22%", top: "40%" },
                { id: "jogador4", left: "22%", top: "60%" }, { id: "jogador5", left: "28%", top: "82%" }, { id: "jogador6", left: "48%", top: "30%" },
                { id: "jogador7", left: "45%", top: "50%" }, { id: "jogador8", left: "48%", top: "70%" }, { id: "jogador9", left: "70%", top: "20%" },
                { id: "jogador10",left: "75%", top: "50%" }, { id: "jogador11",left: "70%", top: "80%" }
            ],
            "3-5-2": [
                { id: "jogador1", left: "7%",  top: "50%" }, { id: "jogador2", left: "25%", top: "25%" }, { id: "jogador3", left: "25%", top: "50%" },
                { id: "jogador4", left: "25%", top: "75%" }, { id: "jogador5", left: "50%", top: "15%" }, { id: "jogador6", left: "45%", top: "35%" },
                { id: "jogador7", left: "45%", top: "50%" }, { id: "jogador8", left: "45%", top: "65%" }, { id: "jogador9", left: "50%", top: "85%" },
                { id: "jogador10",left: "75%", top: "40%" }, { id: "jogador11",left: "75%", top: "60%" }
            ],
            "4-2-3-1": [
                { id: "jogador1", left: "7%",  top: "50%" }, { id: "jogador2", left: "28%", top: "18%" }, { id: "jogador3", left: "22%", top: "40%" },
                { id: "jogador4", left: "22%", top: "60%" }, { id: "jogador5", left: "28%", top: "82%" }, { id: "jogador6", left: "40%", top: "40%" },
                { id: "jogador7", left: "40%", top: "60%" }, { id: "jogador8", left: "65%", top: "20%" }, { id: "jogador9", left: "60%", top: "50%" },
                { id: "jogador10",left: "65%", top: "80%" }, { id: "jogador11",left: "80%", top: "50%" }
            ],
            "5-3-2": [
                { id: "jogador1", left: "7%",  top: "50%" }, { id: "jogador2", left: "25%", top: "20%" }, { id: "jogador3", left: "25%", top: "50%" },
                { id: "jogador4", left: "25%", top: "80%" }, { id: "jogador5", left: "45%", top: "10%" }, { id: "jogador6", left: "50%", top: "30%" },
                { id: "jogador7", left: "50%", top: "50%" }, { id: "jogador8", left: "50%", top: "70%" }, { id: "jogador9", left: "45%", top: "90%" },
                { id: "jogador10",left: "75%", top: "40%" }, { id: "jogador11",left: "75%", top: "60%" }
            ],
            "4-1-4-1": [
                { id: "jogador1", left: "7%",  top: "50%" }, { id: "jogador2", left: "28%", top: "18%" }, { id: "jogador3", left: "22%", top: "40%" },
                { id: "jogador4", left: "22%", top: "60%" }, { id: "jogador5", left: "28%", top: "82%" }, { id: "jogador6", left: "38%", top: "50%" },
                { id: "jogador7", left: "55%", top: "20%" }, { id: "jogador8", left: "55%", top: "40%" }, { id: "jogador9", left: "55%", top: "60%" },
                { id: "jogador10",left: "55%", top: "80%" }, { id: "jogador11",left: "78%", top: "50%" }
            ],
            "3-4-3": [
                { id: "jogador1", left: "7%",  top: "50%" }, { id: "jogador2", left: "25%", top: "25%" }, { id: "jogador3", left: "25%", top: "50%" },
                { id: "jogador4", left: "25%", top: "75%" }, { id: "jogador5", left: "50%", top: "15%" }, { id: "jogador6", left: "48%", top: "40%" },
                { id: "jogador7", left: "48%", top: "60%" }, { id: "jogador8", left: "50%", top: "85%" }, { id: "jogador9", left: "75%", top: "20%" },
                { id: "jogador10",left: "78%", top: "50%" }, { id: "jogador11",left: "75%", top: "80%" }
            ]
        };
        const coordsParaAplicar = posicoesPadrao[formacaoSelecionada] || posicoesPadrao["4-4-2"];
        coordsParaAplicar.forEach((coordInfo) => {
            const jogadorElement = document.getElementById(coordInfo.id);
            if (jogadorElement) {
                jogadorElement.style.left = coordInfo.left;
                jogadorElement.style.top = coordInfo.top;
                jogadorElement.style.transform = `translate(-50%, -50%)`;
            }
        });
    }

    btnGerar.addEventListener('click', async () => {
        toggleSection(infoTreinadoresSecao, false);
        const jogadoresInputValor = inputNome.value.trim();
        const formacaoSelecionada = inputFormacao.value;
        const estiloJogoInput = inputEstilo.value.trim();

        if (!jogadoresInputValor || !formacaoSelecionada || !estiloJogoInput) {
            alert("Por favor, preencha os nomes dos jogadores (ou selecione um time), a formação e o estilo de jogo.");
            return;
        }

        const jogadoresArray = jogadoresInputValor.split(',').map(j => j.trim()).filter(j => j);
        if (jogadoresArray.length === 0) {
            alert("Por favor, insira pelo menos um jogador.");
            return;
        }
        if (jogadoresArray.length > 11) {
            alert("Por favor, insira no máximo 11 jogadores. Você inseriu " + jogadoresArray.length);
            return;
        }

        const loadingHTML = `
            <div class="bg-slate-700/70 backdrop-blur-sm border border-slate-600 rounded-xl shadow-xl p-6 sm:p-8 text-center">
                <p class="text-slate-300 text-xl animate-pulse">Gerando seu esquema tático com IA... 🧠⚽</p>
                <div class="mt-4 w-16 h-16 border-4 border-green-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>`;
        responseContainer.innerHTML = loadingHTML;
        toggleSection(responseContainer, true);
        toggleSection(campoEsquemaContainer, false);

        try {
            const res = await fetch('http://127.0.0.1:5000/esquema', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    jogadores: jogadoresArray,
                    formacao: formacaoSelecionada,
                    estilo_jogo: estiloJogoInput
                })
            });
            const data = await res.json();
            let conteudoRespostaHTML = '';
            if (!res.ok) {
                const errorMessage = data.error || (typeof data === 'string' ? data : "Erro desconhecido ao processar a solicitação.");
                throw new Error(errorMessage);
            }
            conteudoRespostaHTML = `
                <div class="bg-slate-700/70 backdrop-blur-sm border border-slate-600 rounded-xl shadow-xl p-6 sm:p-8">
                    <h2 class="text-3xl font-semibold text-green-400 mb-6">📋 Esquema Tático Gerado</h2>
                    <div class="space-y-4 text-slate-300">
                        <p><strong>Formação Sugerida:</strong> <span class="text-teal-300 font-medium">${data.formacao || formacaoSelecionada}</span></p>
                        <p><strong>Estilo de Jogo Chave:</strong> <span class="text-teal-300 font-medium">${data.estilo_de_jogo || estiloJogoInput}</span></p>
                        <div>
                            <h3 class="mt-5 pt-3 border-t border-slate-600 font-semibold text-green-400 text-xl mb-2">Posicionamento dos Jogadores:</h3>
                            <ul class="list-disc list-inside ml-1 space-y-1 text-slate-300">
                                ${data.posicionamento && data.posicionamento.length > 0 ?
                                    // MODIFICAÇÃO AQUI para adicionar número antes do nome do jogador
                                    data.posicionamento.slice(0, jogadoresArray.length).map((pos, index) => `<li><strong>${index + 1}. ${jogadoresArray[index] || `Jogador ${index + 1}`}:</strong> ${pos}</li>`).join('') :
                                    '<li>Informação de posicionamento não disponível. Tente refinar sua consulta.</li>'}
                            </ul>
                        </div>
                        <div>
                            <h3 class="mt-5 pt-3 border-t border-slate-600 font-semibold text-green-400 text-xl mb-2">Instruções Táticas Gerais:</h3>
                            <ul class="list-disc list-inside ml-1 space-y-1 text-slate-300">
                                ${data.instrucoes_gerais && data.instrucoes_gerais.length > 0 ?
                                    data.instrucoes_gerais.map(instrucao => `<li>${instrucao}</li>`).join('') :
                                    '<li>Instruções gerais não disponíveis.</li>'}
                            </ul>
                        </div>
                        <div>
                            <h3 class="mt-5 pt-3 border-t border-slate-600 font-semibold text-green-400 text-xl mb-2">Ponto Estratégico da IA:</h3>
                            <p class="text-slate-300 italic">${data.sugestao || 'Nenhuma sugestão estratégica específica da IA para esta combinação.'}</p>
                        </div>
                    </div>
                </div>`;
            responseContainer.innerHTML = conteudoRespostaHTML;

            for (let i = 1; i <= 11; i++) {
                const jogadorDiv = document.getElementById(`jogador${i}`);
                if (jogadorDiv) {
                    if (i <= jogadoresArray.length) {
                        jogadorDiv.textContent = i.toString(); 
                        jogadorDiv.title = jogadoresArray[i - 1]; 
                        jogadorDiv.style.display = 'flex';
                    } else {
                        jogadorDiv.style.display = 'none'; 
                    }
                }
            }
            aplicarFormacao(data.formacao || formacaoSelecionada);
            toggleSection(campoEsquemaContainer, true);
            const pitchInfo = document.querySelector('#campo-esquema p');
            if (pitchInfo) {
                pitchInfo.textContent = "Passe o mouse para destacar. Clique e arraste para reposicionar os jogadores.";
            }

        } catch (err) {
            const errorHTML = `
            <div class="bg-slate-700/70 backdrop-blur-sm border border-slate-600 rounded-xl shadow-xl p-6 sm:p-8 text-center">
                <h2 class="text-2xl font-semibold text-red-400 mb-4">⚠️ Erro ao Gerar Esquema</h2>
                <p class="text-red-300">${err.message || 'Ocorreu um problema ao processar sua solicitação. Verifique a conexão com o servidor ou tente novamente mais tarde.'}</p>
            </div>`;
            responseContainer.innerHTML = errorHTML;
        }
    });

    btnLimpar.addEventListener('click', () => {
        inputNome.value = '';
        if (selectJogadoresPredefinidos) {
            selectJogadoresPredefinidos.value = '';
        }
        inputFormacao.value = '';
        inputEstilo.value = '';
        toggleSection(responseContainer, false);
        toggleSection(campoEsquemaContainer, false);
        toggleSection(infoTreinadoresSecao, false);

        for (let i = 1; i <= 11; i++) {
            const jogadorDiv = document.getElementById(`jogador${i}`);
            if (jogadorDiv) {
                jogadorDiv.textContent = i.toString(); 
                jogadorDiv.title = `Jogador ${i}`;   
                jogadorDiv.style.display = 'flex';
            }
        }
        aplicarFormacao("4-4-2");
        const pitchInfo = document.querySelector('#campo-esquema p');
        if (pitchInfo) {
            pitchInfo.textContent = "Passe o mouse sobre os jogadores para destacá-los.";
        }
        inputNome.focus();
    });

    // --- SUA LÓGICA DE ARRASTAR JOGADOR OTIMIZADA ---
    let activePlayerElement = null;
    let offsetXValue, offsetYValue;
    let pitchRectCache = null;
    let lastKnownClientX = 0;
    let lastKnownClientY = 0;
    let ticking = false;

    function handleDragUpdate() {
        if (!activePlayerElement || !pitchRectCache) {
            ticking = false;
            return;
        }
        let newX = lastKnownClientX - pitchRectCache.left - offsetXValue;
        let newY = lastKnownClientY - pitchRectCache.top - offsetYValue;
        let newLeftPercent = (newX / pitchRectCache.width) * 100;
        let newTopPercent = (newY / pitchRectCache.height) * 100;
        newLeftPercent = Math.max(0, Math.min(100, newLeftPercent));
        newTopPercent = Math.max(0, Math.min(100, newTopPercent));
        activePlayerElement.style.left = `${newLeftPercent}%`;
        activePlayerElement.style.top = `${newTopPercent}%`;
        ticking = false;
    }

    function startDrag(e, player) {
        if (e.type === 'mousedown' && e.button !== 0) return;
        activePlayerElement = player;
        const playerRect = activePlayerElement.getBoundingClientRect();
        pitchRectCache = pitchContainerElement.getBoundingClientRect();
        const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
        offsetXValue = clientX - playerRect.left - (playerRect.width / 2);
        offsetYValue = clientY - playerRect.top - (playerRect.height / 2);
        lastKnownClientX = clientX;
        lastKnownClientY = clientY;
        activePlayerElement.classList.add('dragging');
        if (e.type === 'touchstart') {
            document.addEventListener('touchmove', dragPlayer, { passive: false });
            document.addEventListener('touchend', endDrag);
            document.addEventListener('touchcancel', endDrag);
        } else {
            document.addEventListener('mousemove', dragPlayer);
            document.addEventListener('mouseup', endDrag);
            document.addEventListener('mouseleave', endDragOnMouseLeave);
        }
        e.preventDefault();
        if (!ticking) {
            requestAnimationFrame(handleDragUpdate);
            ticking = true;
        }
    }

    function dragPlayer(e) {
        if (!activePlayerElement) return;
        e.preventDefault();
        lastKnownClientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        lastKnownClientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
        if (!ticking) {
            requestAnimationFrame(handleDragUpdate);
            ticking = true;
        }
    }

    function endDrag() {
        if (!activePlayerElement) return;
        activePlayerElement.classList.remove('dragging');
        if (activePlayerElement.touched) {
            document.removeEventListener('touchmove', dragPlayer);
            document.removeEventListener('touchend', endDrag);
            document.removeEventListener('touchcancel', endDrag);
            delete activePlayerElement.touched;
        } else {
            document.removeEventListener('mousemove', dragPlayer);
            document.removeEventListener('mouseup', endDrag);
            document.removeEventListener('mouseleave', endDragOnMouseLeave);
        }
        activePlayerElement = null;
        pitchRectCache = null;
        ticking = false;
    }
    
    function endDragOnMouseLeave(e) {
        if (e.buttons !== 1 && activePlayerElement) {
            endDrag();
        }
    }

    function initializeDraggablePlayers() {
        const playerMarkers = document.querySelectorAll('.player-marker');
        playerMarkers.forEach(player => {
            player.addEventListener('mousedown', (e) => startDrag(e, player));
            player.addEventListener('touchstart', (e) => {
                player.touched = true;
                startDrag(e, player);
            }, { passive: false });
        });
    }
    // --- FIM DA LÓGICA DE ARRASTAR JOGADOR ---

    // INICIALIZAÇÃO
    initializeDraggablePlayers();
    aplicarFormacao("4-4-2");
    for (let i = 1; i <= 11; i++) {
        const jogadorDiv = document.getElementById(`jogador${i}`);
        if (jogadorDiv) {
            jogadorDiv.textContent = i.toString();
            jogadorDiv.title = `Jogador ${i}`;
        }
    }
});