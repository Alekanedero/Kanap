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
            console.log(itemGetColor)

            for (item of cart) {
                if (itemGetId == item.id && itemGetColor == item.color) {
                    item.quantity = Number(input.value)
                    localStorage.setItem('cart', JSON.stringify(cart))
                }
            }
        }

        const div_delete = document.createElement('div')
        div_delete.setAttribute('class', 'cart__item__content__settings__delete')
        div_content__settings.appendChild(div_delete)

        // afficher btn supprimer
        const p_delete = document.createElement('p')
        p_delete.setAttribute('class', 'deleteItem')
        p_delete.innerText = 'Supprimer'
        div_delete.appendChild(p_delete)

        // supprimer l'élement
        p_delete.addEventListener('click', deleteItem) 
            
        function deleteItem() {
            const itemGet = input.closest('article')
            const itemGetId = itemGet.dataset.id
            const itemGetColor = itemGet.dataset.color

            for (let i = 0; i < cart.length; i++) {
                if (cart[i].id === itemGetId && cart[i].color === itemGetColor) {
                    // Supprime l'élément du tableau
                    cart.splice(i, 1);
                    localStorage.setItem('cart', JSON.stringify(cart));
                    // Supprime l'élément du DOM
                    itemGet.remove();
                    break;
                }
            }
        }
    }
}

// function getTotal() {
//     let cart = localStorage.getItem("cart");
//     let total = 0;
//     for (item in cart) {
//         total += item.quantity * item.price;
//         // console.log(total)
//     }
//     return total;
// }

// // getTotal()

// const inputQuantity = document.querySelector('input');
// console.log(inputQuantity)

// inputQuantity.addEventListener('input', function(event) {
//     let value = event.target.value;
//     console.log("Nouvelle valeur de l'input : ", value)
// })


// location.reload();



