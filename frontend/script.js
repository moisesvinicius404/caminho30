// -------------------- CONFIGURAÇÃO DO BACKEND --------------------
const API_BASE = "https://7fc5bcc23bc1.ngrok-free.app/"; 

// -------------------- CADASTRO --------------------
const formCadastro = document.getElementById('form-cadastro');

if (formCadastro) {
  formCadastro.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value;

    // Validação de nome
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

    // Envia para o backend Django
    try {
      const response = await fetch(`${API_BASE}/api/cadastro/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha })
      });

      const data = await response.json();
      alert(data.msg || "Cadastro realizado com sucesso!");

      if (response.ok) {
        // Redireciona para página de boas-vindas
        window.location.href = 'boas-vindas/boas-vindas.html';
      }
    } catch (error) {
      alert("Erro ao conectar com o servidor.");
      console.error(error);
    }
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
      const response = await fetch(`${API_BASE}/api/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha })
      });

      const data = await response.json();
      alert(data.msg || "Login realizado com sucesso!");

      if (response.ok) {
        if (data.user) localStorage.setItem("usuario", JSON.stringify(data.user));
        localStorage.setItem("logado", "true");

        // Redireciona para página de boas-vindas
        window.location.href = 'boas-vindas/boas-vindas.html';
      }
    } catch (error) {
      alert("Erro ao conectar com o servidor.");
      console.error(error);
    }
  });
}


// BOTÃO CADASTRO
const btnCadastro = document.getElementById('btn-cadastrar');

if (btnCadastro) {
  btnCadastro.addEventListener('click', () => {
    window.location.href = 'cadastro.html';
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
