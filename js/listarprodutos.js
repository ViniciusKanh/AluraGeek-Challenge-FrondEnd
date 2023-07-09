// Função para buscar os produtos por categoria
function buscarProdutosPorCategoria(categoria) {
  return fetch(`http://localhost:3000/produtos?categoria=${categoria}`)
    .then(response => response.json())
    .catch(error => {
      console.error('Erro ao buscar os produtos:', error);
      return [];
    });
}

// Função para exibir os produtos no HTML
function exibirProdutos(produtos, categoria) {
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
          <a href="../pages/editar-produto.html?id=${produto.id}"><i class="fas fa-pencil-alt"></i></a>
          <a href="#"><i class="fas fa-trash"></i></a>
        </div>
        <a href="../pages/produtos-similares.html?id=${produto.id}" class="produto__link">Ver produto</a>
      </div>
    `;
  });

  // Adicionar o HTML ao elemento desejado
  const produtosSection = document.getElementById(`${categoria}Products`);
  produtosSection.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', () => {
  const categorias = ['starwars', 'consoles', 'diversos'];

  categorias.forEach(categoria => {
    buscarProdutosPorCategoria(categoria)
      .then(produtos => {
        exibirProdutos(produtos, categoria);
      })
      .catch(error => {
        console.error('Erro ao buscar os produtos:', error);
      });
  });

  // Função para buscar todos os produtos
  function buscarTodosProdutos() {
    return fetch('http://localhost:3000/produtos')
      .then(response => response.json())
      .catch(error => {
        console.error('Erro ao buscar os produtos:', error);
        return [];
      });
  }

  function exibirTodosProdutos(produtos) {
    // Montar o HTML com os produtos
    let html = '';
  
    produtos.forEach(produto => {
      const imagemUrl = `../assets/Imagens-salvas/${produto.image}`;
      const precoFormatado = produto.price ? `R$ ${produto.price.toFixed(2)}` : 'Preço indisponível';
  
      html += `
        <div class="produto__info">
          <img src="${imagemUrl}" alt="${produto.description}">
          <p class="produto__descricao">${produto.produto}</p>
          <p class="produto__preco">${precoFormatado}</p>
          <p class="produto__codigo">#${produto.id}</p>
          <div class="produto__icons">
            <a href="../pages/editar-produto.html?id=${produto.id}"><i class="fas fa-pencil-alt"></i></a>
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

  // Buscar e exibir todos os produtos
  buscarTodosProdutos()
    .then(produtos => {
      exibirTodosProdutos(produtos);
    })
    .catch(error => {
      console.error('Erro ao buscar os produtos:', error);
    });
});

// Função principal que busca os produtos e exibe no HTML
function exibirProdutosAtualizados() {z
  buscarProdutos()
    .then(produtos => {
      exibirProdutos(produtos, 'todos');
    });
}

function exibirProdutosPorCategoria() {
  const selectElement = document.getElementById('categoriaSelect');
  const categoriaSelecionada = selectElement.value;

  // Verifique se a categoria selecionada é "todos" para buscar todos os produtos
  const url = categoriaSelecionada === 'todos' ? 'http://localhost:3000/produtos' : `http://localhost:3000/produtos?categoria=${categoriaSelecionada}`;

  fetch(url)
    .then(response => response.json())
    .then(produtos => {
      const productsSection = document.getElementById('productsSection');
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
              <a href="../pages/editar-produto.html?id=${produto.id}"><i class="fas fa-pencil-alt"></i></a>
              <a href="#"><i class="fas fa-trash"></i></a>
            </div>
            <a href="../pages/produtos-similares.html?id=${produto.id}" class="produto__link">Ver produto</a>
          </div>
        `;
      });

      productsSection.innerHTML = html;
    })
    .catch(error => {
      console.error('Erro ao buscar os produtos:', error);
    });
}

// Chame a função para exibir os produtos inicialmente
exibirProdutosPorCategoria();

// Adicione um evento de alteração no elemento select para atualizar os produtos exibidos quando a categoria for alterada
const selectElement = document.getElementById('categoriaSelect');
selectElement.addEventListener('change', exibirProdutosPorCategoria);

