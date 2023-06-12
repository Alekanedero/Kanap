// récupération id (numéro de commande)
const url = new URL(window.location.href);
const idOrder = url.searchParams.get("id");

// ajout du numéro de commande
const orderNumber = document.getElementById("orderId");
orderNumber.innerText = `${idOrder}`;

// vider le local storage
localStorage.clear();
