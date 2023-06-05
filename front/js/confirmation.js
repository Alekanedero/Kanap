// récupération id (numéro de commande)
const idUrl = new URL(window.location.href);
const idGet = idUrl.searchParams.get("id");

// ajout du numéro de commande
const orderNumber = document.getElementById("orderId");
orderNumber.innerText = `${idGet}`;

// vider le local storage
localStorage.clear();
