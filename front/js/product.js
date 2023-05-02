// récupération de l'id du produit

const url = window.location.search
const idSearch = new URLSearchParams(url)
const idGet = idSearch.get('id')
console.log(idGet);


// const id = event.target.dataset._id;
// fetch(`http://localhost:3000/api/products/${id}`)

//récupération des données du produit spécifique via l'API
fetch(`http://localhost:3000/api/products/` + idGet)
  .then(function (response) {
      return response.json()
    })
  .then(function (data) {
      displayProducts(data)
    })


function displayProducts(data) {  

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
  const choiseColor = data.colors;

  // Boucle le choix des couleurs disponible
  for (let i = 0; i < choiseColor.length; i++) {
    
    const colorOption = document.createElement('option');
    colorOption.setAttribute('value', choiseColor[i]);
    
    console.log(colorOption);
    colors.appendChild(colorOption);
    colorOption.innerText = choiseColor[i]
  }
}
