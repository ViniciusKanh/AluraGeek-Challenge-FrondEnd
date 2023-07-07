document.addEventListener('DOMContentLoaded', function() {
  const adicionarBotao = document.querySelector('[data-adicionar-botao]');
  adicionarBotao.addEventListener('click', adicionarProduto);

  function adicionarProduto(event) {
    event.preventDefault();

    const imagem = document.getElementById('picture').src;
    const nome = document.getElementById('produto').value;
    const descricao = document.getElementById('descricao').value;
    const preco = document.getElementById('preco').value;
    const categoria = document.getElementById('categoria').value;

    const novoProduto = {
      "image": imagem,
      "alt": nome,
      "description": descricao,
      "price": preco
    };

    fetch('http://localhost:3000/adicionar-produto', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(novoProduto)
    })
      .then(response => response.json())
      .then(data => {
        alert('Produto adicionado com sucesso!');
      })
      .catch(error => {
        console.error('Ocorreu um erro ao adicionar o produto:', error);
      });
  }
});
