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
      mensagem.innerText = '✅ Seu registro foi salvo! Continue firme, cada passo importa. 🌟';
      mensagem.style.display = 'block';

      setTimeout(() => {
        mensagem.style.display = 'none';
        textareaVitoria.value = '';
        textareaDesabafo.value = '';
        textareaMudanca.value = '';
      }, 4500);
    }
  });
}

// ----------------------
// CÓDIGO DAS MISSÕES ESPIRITUAIS
// ----------------------
const container = document.getElementById("missionsContainer");

if (container) {   // só roda se estiver na página das missões
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
        
      }
    });
    
  });
}
