const formCadastro = document.getElementById('form-cadastro');
const btnCadastro = document.getElementById('btn-cadastrar')

if (formCadastro) {
  formCadastro.addEventListener('submit', (e) => {
    e.preventDefault(); // impede o recarregamento da página

    const nome = document.getElementById('nome').value;
    const senha = document.getElementById('senha').value;

    // Salva no localStorage
    localStorage.setItem('usuario', JSON.stringify({ nome, senha }));
    localStorage.setItem('logado', 'true'); // marca como logado

    // Redireciona para a página de boas-vindas
    window.location.href = 'boas-vindas/boas-vindas.html';
  });
}

btnCadastro.addEventListener('click', () => {
  window.location.href = 'cadastro.html'
})
