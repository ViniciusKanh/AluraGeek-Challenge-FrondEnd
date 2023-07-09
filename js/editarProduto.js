var urlParams = new URLSearchParams(window.location.search);
var id = urlParams.get('id');



// Chamar a função para carregar as informações do produto quando a página for carregada
document.addEventListener('DOMContentLoaded', function() {
  carregarInformacoesProduto(id);
});

function carregarInformacoesProduto(id) {
  fetch(`http://localhost:3000/produto/${id}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Erro ao obter informações do produto');
      }
    })
    .then(data => {
      document.getElementById('produto').value = data.produto;
      document.getElementById('preco').value = data.price;
      document.getElementById('categoria').value = data.categoria;
      document.getElementById('descricao').textContent = data.description;

      console.log('Valor de data.image:', data.image);

      if (data.image) {
        const imageUrl = '../assets/Imagens-salvas/' + data.image;
        console.log('Caminho completo da imagem:', imageUrl);
        let dropZone = document.querySelector(".imagem");
        let imgTag = `<img src="${imageUrl}" alt="">`;
        dropZone.innerHTML = imgTag;
      } else {
        console.log('Nenhuma imagem encontrada.');
      }
    })
    .catch(error => {
      console.error('Erro ao carregar informações do produto:', error);
    });
}



/*
function carregarInformacoesProduto(id) {
  fetch(`http://localhost:3000/produto/${id}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Erro ao obter informações do produto');
      }
    })
    .then(data => {
      document.getElementById('produto').value = data.produto;
      document.getElementById('preco').value = data.price;
      document.getElementById('categoria').value = data.categoria;
      document.getElementById('descricao').textContent = data.description;
      document.getElementById('imagem').value = data.image;
      if (data.image) {
        let dropZone = document.querySelector(".imagem");
        let imgTag = `<img src="../assets/Imagens-salvas/${data.image}" alt="">`;
        dropZone.innerHTML = imgTag;
      }
    })
    .catch(error => {
      console.error('Erro ao carregar informações do produto:', error);
    });
}
*/
function editarProduto(id) {
  var produto = document.getElementById('produto').value;
  var preco = document.getElementById('preco').value;
  var categoria = document.getElementById('categoria').value;
  var descricao = document.getElementById('descricao').value;
  var imagem = document.getElementById('imagem').files[0]; // Obtém o objeto de arquivo

  // Verifica se um arquivo de imagem foi selecionado
  if (imagem) {
    var nomeArquivo = imagem.name; // Obtém o nome do arquivo
  } else {
    var nomeArquivo = ''; // Define como vazio caso nenhum arquivo tenha sido selecionado
  }

  // Crie um objeto com os dados atualizados do produto
  var data = {
    produto: produto,
    preco: preco,
    categoria: categoria,
    descricao: descricao,
    imagem: nomeArquivo // Atribui o nome do arquivo ao objeto data
  };
// Envie a requisição PUT para a rota /produto/:id
fetch(`http://localhost:3000/produto/${id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
  .then(response => {
    if (response.ok) {
      console.log('Produto editado com sucesso!');
      exibirMensagem('Produto atualizado com sucesso!'); // Exibe a mensagem de sucesso
    } else {
      console.error('Erro ao editar produto:', response.status);
    }
  })
  .catch(error => {
    console.error('Erro ao editar produto:', error);
  });
}


function exibirMensagem(mensagem) {
  var mensagemElemento = document.getElementById('mensagem');
  mensagemElemento.textContent = mensagem;
  mensagemElemento.style.display = 'block';
}

function excluirProduto(id) {
  if (confirm('Tem certeza que deseja excluir o produto?')) {
    fetch(`http://localhost:3000/produto/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          console.log('Produto excluído com sucesso!');
          // Redirecionar para a página de todos os produtos
          window.location.href = '../pages/todos-produtos.html';
        } else {
          console.error('Erro ao excluir produto:', response.status);
        }
      })
      .catch(error => {
        console.error('Erro ao excluir produto:', error);
      });
  }
}

// Adicionar evento de clique ao botão "Salvar Informações do Produto"
document.querySelector('[data-editar-botao]').addEventListener('click', function() {
  editarProduto(id);
});

// Adicionar evento de clique ao botão "Excluir Produto"
document.querySelector('[data-excluir-botao]').addEventListener('click', function() {
  excluirProduto(id);
});
