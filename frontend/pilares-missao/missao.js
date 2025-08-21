const form = document.getElementById("diarioForm");
const mensagem = document.getElementById("mensagem");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Verificação
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
  
  };

});

