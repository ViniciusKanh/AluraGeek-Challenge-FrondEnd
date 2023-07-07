function iniciarLogin() {
  const botaologin = document.querySelector('[data-login-button]');
  botaologin.addEventListener('click', () => {
    window.location.href = "../pages/login.html";
  });

  function verificar(event) {
    event.preventDefault();

    const email = document.querySelector('#email');
    const senha = document.querySelector('#senha');

    if (email.value === '') {
      email.classList.add('input-erro');
      email.focus();
      Swal.fire({
        title: 'O campo email é obrigatório.',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return false;
    } else if (email.value.indexOf('@') === -1 || email.value.indexOf('.') === -1 || (email.value.indexOf('.') - email.value.indexOf('@') === 1)) {
      email.focus();
      Swal.fire('Complete o email corretamente.');
      return false;
    } else {
      email.classList.add('input-sucesso');
    }

    if (senha.value === '') {
      senha.focus();
      senha.classList.add('input-erro');
      Swal.fire({
        title: 'Digite sua senha.',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return false;
    } else if (senha.value.length >= 7) {
      Swal.fire('Digite no máximo 6 caracteres');
      return false;
    } else {
      senha.classList.add('input-sucesso');
    }

    // Adicione aqui a lógica para verificar as credenciais de login
    // Por exemplo:
    if (email.value === 'teste@gmail.com' && senha.value === '123456') {
      window.location.href = "../index.html";
    } else {
      Swal.fire({
        title: 'Credenciais inválidas.',
        text: 'Verifique seu email e senha e tente novamente.',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  }

  const btnEntrar = document.querySelector('[data-form-button]');
  btnEntrar.addEventListener('click', verificar);
}

document.addEventListener('DOMContentLoaded', iniciarLogin);
