// récupération de l'id du produit
const newUrl = new URL(window.location.href);
let idProduct = newUrl.searchParams.get('id');

//récupération des données du produit spécifique via l'API
fetch(`http://localhost:3000/api/products/` + idProduct)
  .then(function (response) {
      return response.json()
    })
  .then(function (data) {
      displayProduct(data);
    })


function displayProduct(data) {

  const img = document.querySelector('.item__img img');
  img.src = data.imageUrl;
  img.alt = data.altTxt;

  const title = document.querySelector('#title');
  title.innerText = data.name; 

  const prix = document.getElementById('price');
  prix.innerText = data.price;

  const description = document.getElementById('description');
  description.innerText = data.description;

  const colors = document.getElementById('colors');
  const choiceColor = data.colors;

  // Boucle le choix des couleurs disponible
  for (let i = 0; i < choiceColor.length; i++) {
    
    const colorOption = document.createElement('option');
    colorOption.setAttribute('value', choiceColor[i]);
    
    colors.appendChild(colorOption);
    colorOption.innerText = choiceColor[i]
  }
}


// Gestion du panier

const btnAddToCart= document.querySelector("#addToCart") 
btnAddToCart.addEventListener("click", addToCart)


function addToCart() {

  let choiceQuantity = document.querySelector('#quantity').value;
  let choiceColor = document.querySelector('option:checked').value;

  let item = {
    id : idProduct,
    quantity : Number(choiceQuantity),
    color : choiceColor
  }

  // si le localstorage est vide
  if (choiceQuantity != 0 && choiceColor != '' && localStorage.cart == null){ 

    const array = []
    localStorage.setItem('cart', array)
    array.push(item)
    localStorage.setItem('cart', JSON.stringify(array))

  // si le localstorage contient des datas
  } else if (choiceQuantity != 0 && choiceColor != '' && localStorage.cart != null) {

    // on récupère dans un tableau le panier du local
    const getItems = JSON.parse(localStorage.getItem('cart'));

    // cherche dans le tableau même id et même couleur, si rien return undefined
    let foundItem = getItems.find(item => item.id === idProduct && item.color === choiceColor);
    
    // si différent de undefined, c'est qui existe déja, donc quantité += avec origine
    if (foundItem != undefined) {
      foundItem.quantity += Number(choiceQuantity);
      localStorage.setItem('cart', JSON.stringify(getItems))

    // sinon quantity choix utilisateur, on le push dans le local
    }else {
      item.quantity = Number(choiceQuantity);
      getItems.push(item);
      localStorage.setItem('cart', JSON.stringify(getItems))
    }
  } 
}    

