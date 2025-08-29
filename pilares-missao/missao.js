// ----------------------
// CÓDIGO DO DIÁRIO
// ----------------------
const form = document.getElementById("diarioForm");
const mensagem = document.getElementById("mensagem");

if (form && mensagem) {   // só roda se estiver na página do diário
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const textareaVitoria = document.getElementById('vitoria');
    const textareaDesabafo = document.getElementById('desabafo');
    const textareaMudanca = document.getElementById('mudanca');

    if (textareaVitoria.value.trim() === '' || textareaDesabafo.value.trim() === '' || textareaMudanca.value.trim() === '') {
      mensagem.innerText = 'Ei, eu sei que você consegue preencher todos os campos 😁';
      mensagem.style.display = 'block';
    } else {
      mensagem.innerText = '✅ Parabéns por ser corajoso(a) e colocar suas vitórias e derrotas';
      mensagem.style.display = 'block';

      setTimeout(() => {
        mensagem.style.display = 'none';
        textareaVitoria.value = '';
        textareaDesabafo.value = '';
        textareaMudanca.value = '';
      }, 4500);

      alert('Lembrando: esse site não grava nenhum dado seu, então pode ficar tranquilo(a). Coloquei esse diário apenas para você colocar pra fora o que sente 🙂');
    }
  });
}



// ----------------------
// CÓDIGO DAS MISSÕES ESPIRITUAIS
// ----------------------
const container = document.getElementById("missionsContainer");

if (container) {   // só roda se estiver na página das missões espirituais
  const missions = [
    "Medite por 10 minutos",
    "Leia um Salmo",
    "Caminhe ao ar livre",
    "Escreva 3 coisas pelas quais é grato",
    "Ore por alguém que você ama",
    "Faça 15 minutos de silêncio total",
    "Leia um provérbio e reflita",
    "Ouça uma música espiritual",
    "Anote seus sonhos",
    "Visualize seus objetivos",
    "Ajude alguém hoje",
    "Passe 24h sem reclamar",
    "Leia uma parábola de Jesus",
    "Faça uma oração da manhã",
    "Contemple o céu por 5 minutos",
    "Faça jejum de redes sociais",
    "Cuide de uma planta ou animal",
    "Escreva suas bênçãos do dia",
    "Ore antes de dormir",
    "Reflexão sobre seus valores",
    "Pratique respiração profunda",
    "Leia João capítulo 1",
    "Escreva uma carta de gratidão",
    "Doe algo que não usa mais",
    "Faça uma boa ação em segredo",
    "Agradeça conscientemente por 3 coisas",
    "Releia suas anotações antigas",
    "Ouça um sermão ou palestra espiritual",
    "Passe tempo em contato com a natureza",
    "Escreva uma carta para si mesmo"
  ];

  let completed = JSON.parse(localStorage.getItem("completedMissions")) || [];

  missions.forEach((mission, index) => {
    const day = index + 1;
    const isDone = completed.includes(day);

    const col = document.createElement("div");
    col.className = "col-md-4";

    col.innerHTML = `
      <div class="card mission-card">
        <div class="card-body">
          <div class="mission-day">Dia ${day}</div>
          <h5 class="card-title">${mission}</h5>
          <button class="btn ${isDone ? 'btn-success done' : 'btn-outline-primary'} mark-btn" data-day="${day}">
            ${isDone ? "✔ Feito" : "Marcar como Feito"}
          </button>
        </div>
      </div>
    `;

    container.appendChild(col);
  });

  document.querySelectorAll(".mark-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const day = parseInt(btn.getAttribute("data-day"));

      if (!completed.includes(day)) {
        completed.push(day);
        localStorage.setItem("completedMissions", JSON.stringify(completed));
        btn.classList.remove("btn-outline-primary");
        btn.classList.add("btn-success", "done");
        btn.textContent = "✔ Feito";

        // 🚨 Se todas foram concluídas
        if (completed.length === missions.length) {
          alert("🎉 Parabéns! Você concluiu todos os 30 dias da missão espiritual!");
        }
      }
    });
  });
}



// ----------------------
// MISSÕES MENTAIS
// ----------------------
(function(){
  const container = document.getElementById("missionsMentalContainer");
  if(!container) return; // só roda nesta página

  const missionsMental = [
    {t:"Respiração Box 4x4x4x4", d:"5 minutos: inspire 4s, segure 4s, expire 4s, segure 4s. Treina sistema nervoso e foco.", tags:["Regulação","Atenção"]},
    {t:"Dieta de Dopamina (2h)", d:"2 horas sem redes/estímulos rápidos.", tags:["Dopamina","Disciplina"]},
    {t:"Diário Estoico — dicotomia de controle", d:"Liste 3 coisas que você controla e 3 que não.", tags:["Estoicismo","Clareza"]},
    {t:"Deep Work 25’", d:"Sessão Pomodoro sem interrupções.", tags:["Foco","Meta"]},
    {t:"Reavaliação Cognitiva", d:"Reescreva um pensamento automático negativo.", tags:["CBT","Emoções"]},
    {t:"Regra dos 2 minutos", d:"Se levar < 2min, faça agora.", tags:["Hábito","Ação"]},
    {t:"Leitura — Meditações (Marco Aurélio)", d:"10–15 min. Anote 1 princípio.", tags:["Estoicismo","Leitura"]},
    {t:"Exposição ao Desconforto (leve)", d:"Escolha 1 tarefa que evita e faça.", tags:["Antifragilidade","Coragem"]},
    {t:"Silêncio Deliberado 10’", d:"Sem música, sem tela.", tags:["Mindfulness","Atenção"]},
    {t:"Visualização de Processo", d:"Veja mentalmente os passos.", tags:["Neurociência","Execução"]},
    {t:"Regra 30-30", d:"Trabalhe 30 min no seu projeto-chave.", tags:["Rotina","Prioridade"]},
    {t:"Ancoragem de Hábito", d:"Cole um novo hábito após um fixo.", tags:["Hábitos","Design"]},
    {t:"Diálogo Interno de Treinador", d:"Fale consigo como coach, não crítico.", tags:["Autocompaixão","Desempenho"]},
    {t:"Leitura — Cartas de Sêneca", d:"10–15 min. Extraia 1 regra prática.", tags:["Estoicismo","Leitura"]},
    {t:"Regra dos 5 porquês", d:"Pergunte 5x 'por quê?'", tags:["Análise","Raiz"]},
    {t:"Desligar Notificações 24h", d:"Controle o contexto.", tags:["Ambiente","Foco"]},
    {t:"Mapa de Valores", d:"Liste seus 5 valores + 1 ação hoje.", tags:["Valores","Ação"]},
    {t:"Julgamento Lento", d:"Antes de reagir, dê 10s.", tags:["Autocontrole","Frequência"]},
    {t:"Regra da Única Coisa", d:"Qual é a única coisa que faz diferença?", tags:["Prioridade","Clareza"]},
    {t:"Leitura — Epicteto (Enchirídion)", d:"Substitua expectativa por preparo.", tags:["Estoicismo","Leitura"]},
    {t:"Jornal de Gratidão (3 itens)", d:"Treine o cérebro a notar o bem.", tags:["Neuroplasticidade","Gratidão"]},
    {t:"Rotina Matinal Simples", d:"Água, respiração, 1 tarefa chave.", tags:["Rotina","Disciplina"]},
    {t:"Regra 1% Melhor", d:"1 micro melhoria hoje.", tags:["Kaizen","Constância"]},
    {t:"Limpeza Mental", d:"Escreva tudo 10 min.", tags:["Clareza","Organização"]},
    {t:"Treino de Atenção Externa", d:"Observe ambiente 10 min.", tags:["Atenção","Presença"]},
    {t:"Compromisso Público", d:"Diga a alguém sua meta.", tags:["Compromisso","Accountability"]},
    {t:"Regra Não Negociável", d:"1 ação diária inegociável.", tags:["Identidade","Padrões"]},
    {t:"Negativa Visualização", d:"Imagine perder algo valioso.", tags:["Estoicismo","Apreciação"]},
    {t:"Bloco Sem Multitarefa", d:"1 hora em 1 coisa só.", tags:["Foco","Monotarefa"]},
    {t:"Fechamento do Dia", d:"Revisão: acertos e melhorias.", tags:["Reflexão","Loop"]}
  ];

  const storageKey = "completedMissionsMental";
  let completed = JSON.parse(localStorage.getItem(storageKey)) || [];

  const progressText = document.getElementById("progressTextMental");
  const progressBar  = document.getElementById("progressBarMental");
  const pctMental    = document.getElementById("pctMental");

  function updateProgress(){
    const total = missionsMental.length;
    const done = completed.length;
    const pct = Math.round((done/total)*100);
    if(progressText) progressText.textContent = `${done} / ${total}`;
    if(progressBar){
      progressBar.style.width = `${pct}%`;
      progressBar.setAttribute("aria-valuenow", String(pct));
    }
    if(pctMental) pctMental.textContent = `${pct}%`;
  }

  function render(){
    container.innerHTML = "";
    missionsMental.forEach((m, i)=>{
      const day = i+1;
      const isDone = completed.includes(day);

      const col = document.createElement("div");
      col.className = "col-12 col-md-6 col-lg-4 fade-up";

      col.innerHTML = `
        <div class="mission-card h-100">
          <div class="d-flex align-items-center justify-content-between">
            <span class="mission-day">Dia ${day}</span>
            <div>
              ${m.tags.slice(0,2).map(tag=>`<span class="badge-psy">${tag}</span>`).join("")}
            </div>
          </div>
          <h5 class="mission-title">${m.t}</h5>
          <p class="mission-desc">${m.d}</p>
          <div class="d-flex gap-2">
            <button class="btn ${isDone ? "btn-mark done" : "btn-outline-primary btn-mark"}" data-day="${day}">
              ${isDone ? "✔ Feito" : "Marcar como Feito"}
            </button>
            <button class="btn btn-outline-secondary btn-sm" data-tip="${day}">Dica</button>
          </div>
        </div>
      `;
      container.appendChild(col);
    });

    // evento marcar feito
    container.querySelectorAll(".btn-mark").forEach(btn=>{
      btn.addEventListener("click", ()=>{
        const day = parseInt(btn.getAttribute("data-day"));
        if(!completed.includes(day)){
          completed.push(day);
          localStorage.setItem(storageKey, JSON.stringify(completed));
          btn.classList.remove("btn-outline-primary");
          btn.classList.add("done");
          btn.textContent = "✔ Feito";
          updateProgress();

          if(progressBar){
            progressBar.classList.add("pulse");
            setTimeout(()=>progressBar.classList.remove("pulse"), 900);
          }

          // 🚨 Se todas foram concluídas
          if (completed.length === missionsMental.length) {
            alert("🎉 Parabéns! Você concluiu todos os 30 dias da missão mental!");
          }
        }
      });
      
    });

    // evento dicas
    container.querySelectorAll("[data-tip]").forEach(tipBtn=>{
      tipBtn.addEventListener("click", ()=>{
        const n = tipBtn.getAttribute("data-tip");
        const tips = [
          "Respire pelo nariz. Ritmo cria estado.",
          "Ambiente é metade da batalha.",
          "Escreva à mão: cérebro foca melhor.",
          "Tempo curto + tarefa clara = ação rápida.",
          "Nomeie a emoção → você a regula.",
          "Pequeno começo derruba a inércia.",
          "Leia devagar, mastigue ideias.",
          "Desconforto leve hoje = força amanhã.",
          "Observe sem julgar, só notar.",
          "Processo > Resultado.",
          "Primeiro bloco do dia decide o tom.",
          "Cole hábitos.",
          "Fale consigo como treinador.",
          "1 ideia aplicada vale por 100 lidas.",
          "Procure a causa, não o sintoma.",
          "Quem controla notificação controla a mente.",
          "Valores guiam quando a motivação falha.",
          "Pausa cria escolha.",
          "Proteja sua única coisa.",
          "Prepare-se para o que pode dar errado.",
          "Gratidão treina o cérebro.",
          "Manhã simples = dia forte.",
          "1% hoje, 1% amanhã.",
          "Tire da cabeça, ponha no papel.",
          "Olhe ao redor: esteja no mundo.",
          "Conte seus planos a alguém.",
          "Defina padrões inegociáveis.",
          "Valorize o agora.",
          "Uma coisa de cada vez.",
          "Feche o dia: aprenda e siga."
        ];
        alert(`Dica rápida — Dia ${n}:\n\n${tips[Number(n)-1] || "Mantenha simples. Faça o essencial."}`);
      });
    });

    updateProgress();
  }

  render();
})();
