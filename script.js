// Verifica se já mostrou o alerta antes
if (!localStorage.getItem("alertShown")) {
  setTimeout(() => {
    alert('Ei, antes de usar este site eu te recomendo ver os Termos de Uso.');
    // Marca no localStorage que já mostrou
    localStorage.setItem("alertShown", "true");
  }, 2000);
  
}

const btnIrmissoes = document.getElementById('btn-missoes');

if (btnIrmissoes) {
  btnIrmissoes.addEventListener('click', () => {
    window.location = 'missoes.html';
  });
}
