// Obtenha uma referência para o botão "Criar Usuário"
var addButton = document.querySelector('[data-adduser-botao]');

// Adicione um ouvinte de evento para o clique do botão
addButton.addEventListener('click', function() {
  // Obtenha os valores dos campos de entrada
  var nome = document.getElementById('nomeUser').value;
  var email = document.getElementById('UserUsuario').value;
  var senha = document.getElementById('passworddUsuario').value;
  var confirmarSenha = document.getElementById('passworddUsuario2').value;

  // Verifique se os campos estão preenchidos corretamente
  if (nome && email && senha && confirmarSenha) {
    // Verifique se as senhas correspondem
    if (senha === confirmarSenha) {
      // Crie um objeto com os dados do usuário
      var userData = {
        nome: nome,
        email: email,
        senha: senha
      };

      fetch('/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })
      .then(function(response) {
        if (response.ok) {
          console.log('Usuário adicionado com sucesso!');
          // Faça algo após o usuário ter sido adicionado com sucesso
        } else {
          var errorMessage = response.statusText || 'Erro ao adicionar usuário';
          console.error('Erro ao adicionar usuário:', errorMessage);
          // Faça algo em caso de erro ao adicionar o usuário
        }
      })
      .catch(function(error) {
        console.error('Erro ao adicionar usuário:', error);
        // Faça algo em caso de erro na solicitação POST
      });
      
    } else {
      console.error('As senhas não correspondem');
      // Faça algo se as senhas não correspondem
    }
  } else {
    console.error('Preencha todos os campos');
    // Faça algo se algum campo não estiver preenchido
  }
});
