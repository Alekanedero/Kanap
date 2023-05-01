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


function displayProducts(data)
