// -------------------- CONFIGURAÇÃO DO BACKEND --------------------
const API_BASE = "http://127.0.0.1:8000";

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

            if (response.ok) {
                alert(data.message || "Cadastro realizado com sucesso!");
                window.location.href = '/boas-vindas/';
            } else {
                alert(data.message || "Erro ao cadastrar.");
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
        const senha = document.getElementById('senha').value;

        // Validação de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!emailRegex.test(email)) {
            alert("Digite um email válido.");
            return;
        }

        // Validação de senha (opcional, dependendo do seu projeto)
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

            if (response.ok) {
                alert(data.message || "Login realizado com sucesso!");
                window.location.href = '/boas-vindas/';
            } else {
                alert(data.message || "E-mail ou senha inválidos.");
            }
        } catch (error) {
            alert("Erro ao conectar com o servidor.");
            console.error(error);
        }
    });
}