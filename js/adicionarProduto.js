document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('[data-adicionar-botao]').addEventListener('click', function (event) {
    event.preventDefault(); // Impede o envio do formulário

    var produto = document.getElementById('produto').value;
    var preco = document.getElementById('preco').value;
    var categoria = document.getElementById('categoria').value;
    var descricao = document.getElementById('descricao').value;

    var fileInput = document.getElementById('imagem');
    var file = null;

    if (fileInput.files.length > 0) {
      file = fileInput.files[0];
    }

    var data = new FormData();
    data.append('produto', produto);
    data.append('preco', preco);
    data.append('categoria', categoria);
    data.append('descricao', descricao);
    data.append('imagem', file);

    fetch('http://localhost:3000/adicionar-produto', {
      method: 'POST',
      body: data
    })
    .then(function (response) {
      if (response.ok) {
        console.log('Produto adicionado com sucesso!');
      } else {
        console.log('Erro ao adicionar produto.');
      }
    })
    .catch(function (error) {
      console.error('Erro na solicitação:', error);
    });
  });
});
