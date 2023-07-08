function exibirProdutos(produtos) {
  // Montar o HTML com os produtos
  let html = '';

  produtos.forEach(produto => {
    const imagemUrl = `../assets/Imagens-salvas/${produto.image}`;
    html += `
    <div class="produto__info">
      <img src="${imagemUrl}" alt="${produto.description}">
      <p class="produto__descricao">${produto.produto}</p>
      <p class="produto__preco">R$ ${produto.price.toFixed(2)}</p>
      <p class="produto__codigo">#${produto.id}</p>
      <div class="produto__icons">
        <a href="#"><i class="fas fa-pencil-alt"></i></a>
        <a href="#"><i class="fas fa-trash"></i></a>
      </div>
      <a href="../pages/produtos-similares.html?id=${produto.id}" class="produto__link">Ver produto</a>
    </div>
  `;
  });

  // Adicionar o HTML ao elemento desejado
  const productsSection = document.getElementById('productsSection');
  productsSection.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', () => {
  const categorias = ['starwars', 'consoles', 'diversos'];

  categorias.forEach(categoria => {
    exibirProdutosPorCategoria(categoria);
  });
});

function buscarProdutosPorCategoria(categoria) {
  return fetch(`http://localhost:3000/produtos?categoria=${categoria}`)
    .then(response => response.json())
    .catch(error => {
      console.error('Erro ao buscar os produtos:', error);
      return [];
    });
}

function exibirProdutosPorCategoria(categoria) {
  buscarProdutosPorCategoria(categoria)
    .then(produtos => {
      console.log(`Produtos da categoria ${categoria}:`, produtos); // Adicione essa linha para depurar

      const produtosSection = document.getElementById(`${categoria}Products`);
      let html = '';

      produtos.forEach(produto => {
        const imagemUrl = `../assets/Imagens-salvas/${produto.image}`;
        html += `
          <div class="produto__info">
            <img src="${imagemUrl}" alt="${produto.description}">
            <p class="produto__descricao">${produto.produto}</p>
            <p class="produto__preco">R$ ${produto.price.toFixed(2)}</p>
            <p class="produto__codigo">#${produto.id}</p>
            <div class="produto__icons">
              <a href="#"><i class="fas fa-pencil-alt"></i></a>
              <a href="#"><i class="fas fa-trash"></i></a>
            </div>
            <a href="../pages/produtos-similares.html?id=${produto.id}" class="produto__link">Ver produto</a>
          </div>
        `;
      });

      produtosSection.innerHTML = html;
    });
}


// Função para buscar os produtos do arquivo JSON
function buscarProdutos() {
  return fetch('../data/produtos.json')
    .then(response => response.json())
    .catch(error => {
      console.error('Erro ao buscar os produtos:', error);
      return [];
    });
}

// Função principal que busca os produtos e exibe no HTML
function exibirProdutosAtualizados() {
  buscarProdutos()
    .then(produtos => {
      exibirProdutos(produtos);
    });
}

// Chamar a função para exibir os produtos atualizados
exibirProdutosAtualizados();

// Restante do código do arquivo listarprodutos.js...
