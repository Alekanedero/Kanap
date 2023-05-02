// récupération de l'id du produit
const url = window.location.search
const idSearch = new URLSearchParams(url)
const idGet = idSearch.get('id')
console.log(idGet);

//récupération des données du produit spécifique via l'API
let products = fetch('http://localhost:3000/api/products/'+ idGet)
.then(function (response) {
    return response.json()
  })
.then(function (data) {
    displayProducts(data)
  })


function displayProducts(data) {  

  const title = document.querySelector('#title');
  title.innerText = data.name; 

  const img = document.querySelector('.item__img');
  img.src = data.imageUrl;
  img.alt = data.altTxt;

  const prix = document.getElementById('price');
  prix.innerText = data.price;

  const description = document.getElementById('description');
  description.innerText = data.description;

  // const couleurs = document.getElementById('colors');
  // const choixCouleur = data.colors;

}

displayProducts(data);




