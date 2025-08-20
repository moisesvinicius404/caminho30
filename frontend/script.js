
//CADASTRO

// Pega o formulário
const formCadastro = document.getElementById('form-cadastro');
const btnCadastro = document.getElementById('btn-cadastrar')


if (formCadastro) {
  formCadastro.addEventListener('submit', (e) => {
    e.preventDefault(); // impede o recarregamento da página

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value;

    // Validação de nome: só letras e espaços, mínimo 3 caracteres
    const nomeRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ ]{3,}$/;
    if (!nomeRegex.test(nome)) {
      alert("O nome deve ter pelo menos 3 letras e não pode conter números ou símbolos.");
      return;
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      alert("Digite um email válido.");
      return;
    }

    // Validação de senha: mínimo 8 caracteres, pelo menos 1 letra maiúscula, 1 minúscula, 1 número e 1 símbolo
    const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!senhaRegex.test(senha)) {
      alert("A senha deve ter no mínimo 8 caracteres, incluindo letras maiúsculas, minúsculas, números e símbolos.");
      return;
    }

    // Se passou na validação, salva no localStorage
    localStorage.setItem('usuario', JSON.stringify({ nome, email, senha }));
    localStorage.setItem('logado', 'true');

    // Redireciona para a página de boas-vindas
    window.location.href = 'boas-vindas/boas-vindas.html';
  });
}

// Evento após clique no botão cadastra da página inicial
btnCadastro.addEventListener('click', () => {
  window.location.href = 'cadastro.html'
})


// LOGIN



