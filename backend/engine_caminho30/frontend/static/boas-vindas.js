const btnIrMissao = document.getElementById('btn-ir-missao');

if (btnIrMissao) {
    btnIrMissao.addEventListener('click', () => {
        window.location.href = ' /missoes/';
    });
}