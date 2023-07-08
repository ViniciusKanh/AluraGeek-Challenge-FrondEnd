function exibirProdutoDetalhado(produto) {
    const produtoDetalhes = document.getElementById('produtoDetalhes');
    const produtoDiv = document.createElement('div');
    produtoDiv.classList.add('produto-detalhes');
  
    const produtoImagem = document.createElement('img');
    produtoImagem.src = `../assets/Imagens-salvas/${produto.image}`;
    produtoImagem.alt = produto.produto;
    produtoDiv.appendChild(produtoImagem);
  
    const detalhes = document.createElement('div');
    detalhes.classList.add('detalhes');
  
    const produtoTitulo = document.createElement('p');
    produtoTitulo.classList.add('produto__titulo');
    produtoTitulo.textContent = produto.produto;
    detalhes.appendChild(produtoTitulo);
  
    const produtoPreco = document.createElement('p');
    produtoPreco.classList.add('produto__preco');
    produtoPreco.textContent = `R$ ${produto.price.toFixed(2)}`;
    detalhes.appendChild(produtoPreco);
  
    const produtoDescricao = document.createElement('p');
    produtoDescricao.classList.add('detalhes__descricao');
    produtoDescricao.textContent = produto.description;
    detalhes.appendChild(produtoDescricao);


  
    produtoDiv.appendChild(detalhes);
    produtoDetalhes.appendChild(produtoDiv);
  }

  function exibirProdutosSimilares(produtos) {
    let html = '';
  
    produtos.forEach(produto => {
      const imagemUrl = `../assets/Imagens-salvas/${produto.image}`;
      html += `
      <div class="produto-detalhes">
        <img src="${imagemUrl}" alt="${produto.produto}">
          <div class="detalhes">
            <p class="produto__titulo">${produto.produto}</p>
            <p class="produto__preco">R$ ${produto.price.toFixed(2)}</p>
            <p class="produto__descricao">${produto.description}</p>
          </div>
        </div>
      `;
    });
  
    const produtosSimilaresSection = document.getElementById('produtosSimilaresSection');
    produtosSimilaresSection.innerHTML = html;
  }
  
  function buscarProdutoDetalhado(id) {
    return fetch('../data/produtos.json')
      .then(response => response.json())
      .then(produtos => {
        const produto = produtos.find(p => p.id === parseInt(id));
        if (produto) {
          exibirProdutoDetalhado(produto);
          const produtosSimilares = produtos.filter(p => p.category === produto.category && p.id !== parseInt(id));
          exibirProdutosSimilares(produtosSimilares);
        } else {
          console.error(`Produto com ID ${id} não encontrado.`);
        }
      })
      .catch(error => {
        console.error('Erro ao buscar os produtos similares:', error);
      });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const produtoId = urlParams.get('id');
    buscarProdutoDetalhado(produtoId);
  });
  