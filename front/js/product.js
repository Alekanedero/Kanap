// récupération de l'id du produit
const url = window.location.search
const paramUrl = new URLSearchParams(url)
const idProduct = paramUrl.get('id')
console.log(idProduct)

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


// crée le panier
const addToCart= document.querySelector("#addToCart") 
addToCart.addEventListener("click", cart)

// ajouter dans le panier
function cart() {
  let quantity = document.querySelector('#quantity').value
  let colorChoice = document.querySelector('option:checked').value

  let cartJson = {
    id : idProduct,
    quantity : Number(quantity),
    color : colorChoice
  }
let cartStringify = JSON.stringify(cartJson);
    localStorage.setItem("cart", cartStringify)
    console.log(cartStringify)

  // si local vide
  if(quantity != 0 && color != "" && localStorage.cart != null){
    

  // si local a déja des donnée
  }else {
    let getCart = localStorage.getItem("cart");
    let objJson = JSON.parse(getCart)

  }

  
}




  
