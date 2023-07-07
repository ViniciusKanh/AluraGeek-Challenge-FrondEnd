// Função para carregar os dados do arquivo DB.json
function carregarProdutos() {
    fetch('./db.json') // Substitua pelo caminho correto para o arquivo DB.json
      .then(response => response.json())
      .then(data => {
        substituirProdutos('Star Wars', data.starWars);
        substituirProdutos('Consoles', data.consoles);
        substituirProdutos('Diversos', data.diversos);
      })
      .catch(error => console.error(error));
  }
  
  // Função para substituir os produtos de uma categoria
  function substituirProdutos(categoria, produtos) {
    const section = document.querySelector(`.produtos__titulo:has(p:contains(${categoria}))`).parentElement;
  
    const produtosSection = section.nextElementSibling;
    produtosSection.innerHTML = '';
  
    produtos.forEach(produto => {
      const produtoInfo = document.createElement('div');
      produtoInfo.classList.add('produto__info');
  
      const imagem = document.createElement('img');
      imagem.src = produto.imagem;
      imagem.alt = produto.alt;
      produtoInfo.appendChild(imagem);
  
      const descricao = document.createElement('p');
      descricao.classList.add('produto__descricao');
      descricao.textContent = produto.descricao;
      produtoInfo.appendChild(descricao);
  
      const preco = document.createElement('p');
      preco.classList.add('produto__preco');
      preco.textContent = produto.preco;
      produtoInfo.appendChild(preco);
  
      const link = document.createElement('a');
      link.href = produto.link;
      link.classList.add('produto__link');
      link.textContent = 'Ver produto';
      produtoInfo.appendChild(link);
  
      produtosSection.appendChild(produtoInfo);
    });
  }
  
  // Chamar a função para carregar os produtos ao carregar a página
  document.addEventListener('DOMContentLoaded', carregarProdutos);
  