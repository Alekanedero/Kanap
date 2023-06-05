// récupération id (numéro de commande)
const idSearch = new URLSearchParams(url)
const idGet = idSearch.get('id')

// ajout du numéro de commande
const orderNumber = document.getElementById('orderId')
orderNumber.innerText = `${idGet}`

localStorage.clear()