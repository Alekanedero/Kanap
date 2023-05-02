
fetch('http://localhost:3000/api/Products')
  .then(function (response) {
    return response.json()
  })
  .then(function (data) {
    displayProducts(data)
  })


function displayProducts(data) {
  for (let i = 0; i < data.length; i++) {

    const article = data[i];

    //Récupération de l'élément du DOM
    const sectionFiches = document.querySelector(".items");

    // Création de lien
    const linkElement = document.createElement ("a");
    linkElement.href = `./product.html?id=${data[i]._id}`;

    // Création d’une balise dédiée a un canapé
    const articleElement = document.createElement ("article"); 

    // Création balise img
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
}
