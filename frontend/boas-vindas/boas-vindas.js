// Só roda se estivermos na página de boas-vindas
const saudacao = document.getElementById('saudacao');
const btnIrMissao = document.getElementById('btn-ir-missao');

if (saudacao) {
  // Recupera o usuário do localStorage
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  // Se existir, mostra o nome
  if (usuario && usuario.nome) {
    saudacao.textContent = `🎉 Bem-vindo(a), ${usuario.nome}! 🎉`;
  } else {
    saudacao.textContent = "🎉 Bem-vindo(a)! 🎉";
  }
}

// Botão para iniciar missão
if (btnIrMissao) {
  btnIrMissao.addEventListener('click', () => {
    // Marca como logado e redireciona para a página de missões
    localStorage.setItem('logado', 'true');
    window.location.href = '../missoes.html'; // ajuste o caminho se necessário
  });
}
