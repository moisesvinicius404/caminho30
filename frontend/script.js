// -------------------- CADASTRO --------------------
const formCadastro = document.getElementById('form-cadastro');
const btnCadastro = document.getElementById('btn-cadastrar');

if (formCadastro) {
  formCadastro.addEventListener('submit', (e) => {
    e.preventDefault();

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

    // Validação de senha
    const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!senhaRegex.test(senha)) {
      alert("A senha deve ter no mínimo 8 caracteres, incluindo letras maiúsculas, minúsculas, números e símbolos.");
      return;
    }

    // Salva no localStorage
    localStorage.setItem('usuario', JSON.stringify({ nome, email, senha }));
    localStorage.setItem('logado', 'true');

    // Redireciona
    window.location.href = 'boas-vindas/boas-vindas.html';
  });
}

// Botão de ir para cadastro (se existir)
if (btnCadastro) {
  btnCadastro.addEventListener('click', () => {
    window.location.href = 'cadastro.html';
  });
}

// -------------------- LOGIN --------------------
const formLogin = document.getElementById('form-login');

if (formLogin) {
  formLogin.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      alert("Digite um email válido.");
      return;
    }

    // Validação de senha
    const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!senhaRegex.test(senha)) {
      alert("A senha deve ter no mínimo 8 caracteres, incluindo letras maiúsculas, minúsculas, números e símbolos.");
      return;
    }

    // Aqui você chamaria o backend para verificar login
    alert("Login validado no front-end! Depois você conecta ao backend.");
  });
}
