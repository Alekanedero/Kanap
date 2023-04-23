//Récupération des pièces eventuellement stockées dans le localStorage
let items = window.localStorage.getItem('products');

//requêter l'Api pour lui demander l'ensemble des produits
async function fetchProducts () {

  if (items === null) {
    const r = await fetch('http://localhost:3000/api/Products', {
      method: 'GET',
      headers: {
        "Accept" : "application/json"
      }
    });
    items = await r.json();

    const valeurItems = JSON.stringify(items);
    window.localStorage.setItem("products", valeurItems);
  }else {
    items = JSON.parse(items);
  }
}

fetchProducts().then(products => console.log(items))


// insérer dans la page l'ensemble des produits fournis par l'Api
function genererItems(items) {
  for (let i = 0; i < items.length; i++) {

    const article = items[i];

    //Récupération de l'élément du DOM
    const sectionFiches = document.querySelector(".items");

    // Création de lien
    const linkElement = document.createElement ("a");
    linkElement.href = `./product.html?id=${items[i]._id}`;

    // Création d’une balise dédiée a un canapé
    const articleElement = document.createElement ("article"); 

    //Création balise img
    const imageElement = document.createElement ("img");
    imageElement.src = article.imageUrl;
    imageElement.alt = article.altTxt;

    // Création balise h3 (titre)
    const nameElement = document.createElement ("h3");
    nameElement.innerText = article.name;
 
    // Création balise p (description)
    const descriptionElement = document.createElement ("p");
    descriptionElement.innerText = article.description;

    // On rattache le link a la section Fiches
    sectionFiches.appendChild(linkElement);

    // On rattache l'article au link
    linkElement.appendChild(articleElement)
    
    //Ajout dse autre élément a article
    articleElement.appendChild(imageElement);
    articleElement.appendChild(nameElement);
    articleElement.appendChild(descriptionElement);
  } 
  console.log("Les canapés sont afficher !");
}    

genererItems(items)
