fetch('../db.json')
  .then(response => response.json())
  .then(data => {
    // Substituir produtos Star Wars
    const starWarsSection = document.querySelector('.todos-produtos');
    const starWarsProducts = data.starWars;
    replaceProducts(starWarsSection, starWarsProducts);

    // Substituir produtos Consoles
    const consolesSection = document.getElementById('console').parentElement;
    const consolesProducts = data.consoles;
    replaceProducts(consolesSection, consolesProducts);

    // Substituir produtos Diversos
    const diversosSection = document.querySelector('.produtos__titulo:last-child');
    const diversosProducts = data.diversos;
    replaceProducts(diversosSection, diversosProducts);
  })
  .catch(error => console.error(error));

function replaceProducts(section, products) {
  const productsContainer = section.nextElementSibling;
  productsContainer.innerHTML = '';

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

    const link = document.createElement('a');
    link.href = '../pages/produtos-similares.html';
    link.classList.add('produto__link');
    link.textContent = 'Ver produto';
    productInfo.appendChild(link);

    productsContainer.appendChild(productInfo);
  });
}
