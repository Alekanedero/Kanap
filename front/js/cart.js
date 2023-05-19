// récupération dans le local du panier (dans un tableau)
const cart = JSON.parse(localStorage.getItem('cart'));

for(item of cart) {

    const id = item.id
    const quantity = item.quantity
    const color = item.color

    fetch(`http://localhost:3000/api/products/` + id)
    .then(function (response) {
        return response.json()
        })
    .then(function (data) {
        displayProduct(data);
        })

    function displayProduct(data) {

        const cartItem = document.querySelector('#cart__items')

        const article = document.createElement('article');
        article.setAttribute('class', 'cart__item')
        article.setAttribute('data-id', id)
        article.setAttribute('data-color', color)
        cartItem.appendChild(article);

        const div_img = document.createElement('div')
        div_img.setAttribute('class', 'cart__item__img')
        article.appendChild(div_img)

        // img
        const img = document.createElement ('img');
        img.setAttribute('src', data.imageUrl)
        img.setAttribute('alt', item.altTxt)
        div_img.appendChild(img)

        const div_content = document.createElement('div')
        div_content.setAttribute('class','cart__item__content')
        article.appendChild(div_content)

        const div_content__description = document.createElement('div')
        div_content__description.setAttribute('class', 'cart__item__content__description')
        div_content.appendChild(div_content__description)

        // titre
        const title = document.createElement('h2')   
        title.innerText = data.name
        div_content__description.appendChild(title)

        // couleur
        const color_item = document.createElement('p')
        color_item.innerText = color
        div_content__description.appendChild(color_item)

        // price
        const price = document.createElement('p')
        price.innerText = data.price + ' €'
        div_content__description.appendChild(price)

        const div_content__settings = document.createElement('div')
        div_content__settings.setAttribute('class', 'cart__item__content__settings')
        div_content.appendChild(div_content__settings)

        const div_quantity = document.createElement('div')
        div_quantity.setAttribute('class', 'cart__item__content__settings__quantity')
        div_content__settings.appendChild(div_quantity)

        // quantité
        const p_quantity = document.createElement('p')
        p_quantity.innerText = 'Qté : '
        div_quantity.appendChild(p_quantity)

        // input
        const input = document.createElement('input')
        input.setAttribute('type', 'Number' )
        input.setAttribute('class', 'itemQuantity')
        input.setAttribute('name', 'itemQuantity')
        input.setAttribute('min', '1')
        input.setAttribute('max', '100')
        input.setAttribute('value', quantity)
        div_quantity.appendChild(input)

        // modifier de la quantité
        input.addEventListener('change', quantityModification)   
                
        function quantityModification() {
            // récup balise article
            const itemGet = input.closest('article')
            const itemGetId = itemGet.dataset.id
            const itemGetColor = itemGet.dataset.color

            for (item of cart) {
                if (itemGetId == item.id && itemGetColor == item.color) {
                    item.quantity = Number(input.value)
                    localStorage.setItem('cart', JSON.stringify(cart))
                }
            }
            updateTotalPrice();
        }

        const div_delete = document.createElement('div')
        div_delete.setAttribute('class', 'cart__item__content__settings__delete')
        div_content__settings.appendChild(div_delete)

        // afficher btn supprimer
        const btnDelete = document.createElement('p')
        btnDelete.setAttribute('class', 'deleteItem')
        btnDelete.innerText = 'Supprimer'
        div_delete.appendChild(btnDelete)

        // supprimer l'élement
        btnDelete.addEventListener('click', deleteItem) 
            
        function deleteItem() {
            // permet de trouver l'élément article parent dans lequel se trouve l'élément btnDelete ('p')
            const itemGet = btnDelete.closest('article')
            const itemGetId = itemGet.dataset.id
            const itemGetColor = itemGet.dataset.color

            // parcour les éléments du tableau cart pour trouver l'élément correspondant à l'ID et à la couleur spécifiés
            for (let i = 0; i < cart.length; i++) {
                if (cart[i].id === itemGetId && cart[i].color === itemGetColor) {
                    // Supprime l'élément du tableau (1 étant le nombre d'objet que l'on veut supprimer)
                    cart.splice(i, 1);
                    // mettre a jour le local
                    localStorage.setItem('cart', JSON.stringify(cart));
                    // Supprime l'élément du DOM
                    itemGet.remove();
                    break;
                }
            }
            updateTotalPrice();
            location.reload();
            
        }
        
    }
}


function updateTotalPrice() {
  let totalQuantity = 0;
  let totalPrice = 0;

  for (const item of cart) {
    totalQuantity += item.quantity;

    fetch(`http://localhost:3000/api/products/${item.id}`)
      .then(response => response.json())
      .then(data => {
        const price = data.price;
        const itemPrice = item.quantity * price;
        totalPrice += itemPrice;

        if (item === cart[cart.length - 1]) {
          const totalQuantityItem   = document.getElementById('totalQuantity');
          const totalPriceItem   = document.getElementById('totalPrice');

          totalQuantityItem.textContent = totalQuantity;
          totalPriceItem.textContent = totalPrice.toFixed(2);

        //   console.log(`Prix total : ${totalPrice} €`);
        }
    });
  }
}

updateTotalPrice()


// Formulaire

const form = document.querySelector('form')
console.log(form)