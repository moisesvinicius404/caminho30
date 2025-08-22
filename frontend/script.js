// -------------------- CADASTRO --------------------
const formCadastro = document.getElementById('form-cadastro');
const btnCadastro = document.getElementById('btn-cadastrar');

if (formCadastro) {
  formCadastro.addEventListener('submit', async (e) => {
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

    //  Envia para o backend Django
    try {
      const response = await fetch("8000", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha })
      });

      const data = await response.json();
      alert(data.msg);

      if (response.ok) {
        
        window.location.href = 'boas-vindas/boas-vindas.html';
      }
    } catch (error) {
      alert("Erro ao conectar com servidor.");
      console.error(error);
    }

  });
}


if (btnCadastro) {
  btnCadastro.addEventListener('click', () => {
    window.location.href = 'cadastro.html';
  });
}

// -------------------- LOGIN --------------------
const formLogin = document.getElementById('form-login');

if (formLogin) {
  formLogin.addEventListener('submit', async (e) => {
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

    // Envia para o backend Django
    try {
      const response = await fetch("8000", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha })
      });

      const data = await response.json();
      alert(data.msg);

      if (response.ok) {
        // Exemplo: salvar usuário
        localStorage.setItem("usuario", JSON.stringify(data.user));
        localStorage.setItem("logado", "true");

        // Redireciona
        window.location.href = 'dashboard.html';
      }
    } catch (error) {
      alert("Erro ao conectar com servidor.");
      console.error(error);
    }

  });
}

// -------------------- VER SENHA --------------------
const senhaInput = document.getElementById('senha');
const toggleSenha = document.getElementById('toggleSenha');

if (toggleSenha && senhaInput) {
  toggleSenha.addEventListener('click', () => {
    if (senhaInput.type === 'password') {
      senhaInput.type = 'text';
      toggleSenha.classList.remove('bi-eye');
      toggleSenha.classList.add('bi-eye-slash');
    } else {
      senhaInput.type = 'password';
      toggleSenha.classList.remove('bi-eye-slash');
      toggleSenha.classList.add('bi-eye');
    }
  });
}
