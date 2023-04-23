let items = window.localStorage.getItem('products');

// Requette API
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

// Création du dom
function genererItems(items) {
  for (let i = 0; i < items.length; i++) {

    const article = items[i];

    const sectionFiches = document.querySelector(".items");

    const linkElement = document.createElement ("a");
    linkElement.href = `./product.html?id=${items[i]._id}`;

    const articleElement = document.createElement ("article"); 

    const imageElement = document.createElement ("img");
    imageElement.src = article.imageUrl;
    imageElement.alt = article.altTxt;

    const nameElement = document.createElement ("h3");
    nameElement.innerText = article.name;
 
    const descriptionElement = document.createElement ("p");
    descriptionElement.innerText = article.description;

    sectionFiches.appendChild(linkElement);
    linkElement.appendChild(articleElement)
    articleElement.appendChild(imageElement);
    articleElement.appendChild(nameElement);
    articleElement.appendChild(descriptionElement);
  } 
  console.log("Les canapés sont afficher !");
}    

genererItems(items)