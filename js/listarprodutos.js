document.addEventListener('DOMContentLoaded', function() {
  fetch('../data/db.json')
    .then(response => response.json())
    .then(data => {
      const starWarsSection = document.getElementById('starWarsProducts');
      const starWarsProducts = data.starWars;
      replaceProducts(starWarsSection, starWarsProducts);

      const consolesSection = document.getElementById('consolesProducts');
      const consolesProducts = data.consoles;
      replaceProducts(consolesSection, consolesProducts);

      const diversosSection = document.getElementById('diversosProducts');
      const diversosProducts = data.diversos;
      replaceProducts(diversosSection, diversosProducts);
    })
    .catch(error => console.error(error));

  function replaceProducts(section, products) {
    section.innerHTML = '';

    products.forEach(product => {
      const productInfo = document.createElement('div');
      productInfo.classList.add('produto__info');

      const image = document.createElement('img');
      image.src = product.image;
      image.alt = product.alt;
      productInfo.appendChild(image);

      const description = document.createElement('p');
      description.classList.add('produto__descricao');
      description.textContent = product.description;
      productInfo.appendChild(description);

      const price = document.createElement('p');
      price.classList.add('produto__preco');
      price.textContent = product.price;
      productInfo.appendChild(price);

      const iconsContainer = document.createElement('div');
      iconsContainer.classList.add('produto__icons');

      const editIconLink = document.createElement('a');
      editIconLink.href = '#';
      const editIcon = document.createElement('i');
      editIcon.classList.add('fas', 'fa-pencil-alt');
      editIconLink.appendChild(editIcon);
      iconsContainer.appendChild(editIconLink);
      
      const deleteIconLink = document.createElement('a');
      deleteIconLink.href = '#';
      const deleteIcon = document.createElement('i');
      deleteIcon.classList.add('fas', 'fa-trash');
      deleteIconLink.appendChild(deleteIcon);
      iconsContainer.appendChild(deleteIconLink);
      
      productInfo.appendChild(iconsContainer);

      section.appendChild(productInfo);
    });
  }
});
