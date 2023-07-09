function verificar(event) {
  event.preventDefault();

  const email = document.querySelector('#email');
  const senha = document.querySelector('#senha');

  if (email.value === '' || senha.value === '') {
    Swal.fire({
      title: 'Campos vazios.',
      text: 'Por favor, preencha todos os campos.',
      icon: 'error',
      confirmButtonText: 'Ok'
    });
    return false;
  }

  fetch('/data/usuario.json')
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Erro na resposta do servidor.');
  })
  .then(usuarios => {
    const usuarioEncontrado = usuarios.find(usuario => usuario.email === email.value && usuario.senha === senha.value);
    if (usuarioEncontrado) {
      window.location.href = "../index.html";
    } else {
      Swal.fire({
        title: 'Credenciais inválidas.',
        text: 'Verifique seu email e senha e tente novamente.',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  })
  .catch(error => {
    console.error('Erro ao realizar o login:', error);
    Swal.fire({
      title: 'Erro no servidor.',
      text: 'Ocorreu um erro ao tentar fazer o login. Por favor, tente novamente mais tarde.',
      icon: 'error',
      confirmButtonText: 'Ok'
    });
  });

}

const btnEntrar = document.querySelector('[data-form-button]');
btnEntrar.addEventListener('click', verificar);

