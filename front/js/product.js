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
    
    // console.log(colorOption);
    colors.appendChild(colorOption);
    colorOption.innerText = choiceColor[i]
  }
}

function addToCart (key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

console.log(addToCart())
  
