// isso aqui é pro formulário. não deletesenão o html quebra.
let csrfToken = null;
const csrfMeta = document.querySelector('meta[name="csrf-token"]');
if (csrfMeta) {
    csrfToken = csrfMeta.getAttribute('content');
}
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

        // Dados do formulário
        const data = {
            nome: nome,
            email: email,
            senha: senha
        };

        // Envia os dados para o Django
        fetch('http://127.0.0.1:8000/cadastro/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken 
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.redirected) {
                window.location.href = response.url;
                return;
            }
            return response.json();
        })
        .then(result => {
            if (result && result.status === 'success') {
                alert(result.message);
               
                window.location.href = '/boas-vindas/'; 
            } else {
                alert('Erro ao cadastrar: ' + (result ? result.message : 'Resposta inválida do servidor.'));
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro de conexão com o servidor. Tente novamente mais tarde.');
        });
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

        // Dados do formulário
        const data = {
            email: email,
            senha: senha
        };

        // Envia os dados para o Django
        fetch('http://127.0.0.1:8000/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.redirected) {
                window.location.href = response.url;
                return;
            }
            return response.json();
        })
        .then(result => {
            if (result && result.status === 'success') {
                alert(result.message);
               
                window.location.href = '/boas-vindas/';
            } else {
                alert('Erro ao fazer login: ' + (result ? result.message : 'Resposta inválida do servidor.'));
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro de conexão com o servidor. Tente novamente mais tarde.');
        });
    });
}


// Funcionalidade de Ver senha
const senhaInput = document.getElementById('senha');
const toggleSenha = document.getElementById('toggleSenha');

if (senhaInput && toggleSenha) {
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