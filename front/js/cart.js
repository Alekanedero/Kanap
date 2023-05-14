// récupération dans le local du panier (dans un tableau)
const getCart = JSON.parse(localStorage.getItem('cart'));

for(element of getCart) {

    const id = element.id
    const quantity = element.quantity
    const color = element.color
    console.log(id, quantity, color)

    fetch(`http://localhost:3000/api/products/` + id)
    .then(function (response) {
        return response.json()
        })
    .then(function (data) {
        displayProduct(data);
        })

    function displayProduct(data) {

        const cart = document.querySelector('#cart__items')

        const article = document.createElement('article');
        article.setAttribute('class', 'cart__item')
        article.setAttribute('data-id', id)
        article.setAttribute('data-color', color)
        cart.appendChild(article);

        const div_img = document.createElement('div')
        div_img.setAttribute('class', 'cart__item__img')
        cart.appendChild(div_img)

        // img
        const img = document.createElement ('img');
        img.setAttribute('src', data.imageUrl)
        img.setAttribute('alt', element.altTxt)
        div_img.appendChild(img)

        const div_content = document.createElement('div')
        div_content.setAttribute('class','cart__item__content')
        cart.appendChild(div_content)

        const div_content__description = document.createElement('div')
        div_content__description.setAttribute('class', 'cart__item__content__description')
        cart.appendChild(div_content__description)

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
        div_content__settings.appendChild('div_quantity')

        // quantité
        const p_quantity = document.createElement('p')
        p_quantity.innerText = 'Qté' + quantity
        div_quantity.appendChild('p_quantity')

        // input
        const input = document.createElement('input')
        input.appendChild('type', 'number')
        input.appendChild('class', 'itemQuantity')
        input.appendChild('name', 'itemQuantity')
        input.appendChild('min', '1')
        input.appendChild('max', '100')
        input.appendChild('value', '42')
        div_content__settings.appendChild('input')

        const div_delete = document.createElement('div')
        div_delete.setAttribute('class', 'cart__item__content__settings__delete')
        div_content__settings.appendChild(div_delete)

        // supprimer
        const p_delete = document.createElement('p')
        p_delete.setAttribute('class', 'deleteItem')
        p_delete.innerText = Supprimer
        div_delete.appendChild('p_delete')
    }
}