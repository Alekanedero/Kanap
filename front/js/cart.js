if (localStorage.getItem("cart")) {
  // récupération dans le local du panier (dans un tableau)
  const cart = JSON.parse(localStorage.getItem("cart"));

  for (item of cart) {
    const id = item.id;
    const quantity = item.quantity;
    const color = item.color;

    fetch(`http://localhost:3000/api/products/` + id)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        displayProduct(data);
      });

    function displayProduct(data) {
      const cartItem = document.querySelector("#cart__items");

      const article = document.createElement("article");
      article.setAttribute("class", "cart__item");
      article.setAttribute("data-id", id);
      article.setAttribute("data-color", color);
      cartItem.appendChild(article);

      const div_img = document.createElement("div");
      div_img.setAttribute("class", "cart__item__img");
      article.appendChild(div_img);

      // img
      const img = document.createElement("img");
      img.setAttribute("src", data.imageUrl);
      img.setAttribute("alt", item.altTxt);
      div_img.appendChild(img);

      const div_content = document.createElement("div");
      div_content.setAttribute("class", "cart__item__content");
      article.appendChild(div_content);

      const div_content__description = document.createElement("div");
      div_content__description.setAttribute(
        "class",
        "cart__item__content__description"
      );
      div_content.appendChild(div_content__description);

      // titre
      const title = document.createElement("h2");
      title.innerText = data.name;
      div_content__description.appendChild(title);

      // couleur
      const color_item = document.createElement("p");
      color_item.innerText = color;
      div_content__description.appendChild(color_item);

      // price
      const price = document.createElement("p");
      price.innerText = data.price + " €";
      div_content__description.appendChild(price);

      const div_content__settings = document.createElement("div");
      div_content__settings.setAttribute(
        "class",
        "cart__item__content__settings"
      );
      div_content.appendChild(div_content__settings);

      const div_quantity = document.createElement("div");
      div_quantity.setAttribute(
        "class",
        "cart__item__content__settings__quantity"
      );
      div_content__settings.appendChild(div_quantity);

      // quantité
      const p_quantity = document.createElement("p");
      p_quantity.innerText = "Qté : ";
      div_quantity.appendChild(p_quantity);

      // input
      const input = document.createElement("input");
      input.setAttribute("type", "Number");
      input.setAttribute("class", "itemQuantity");
      input.setAttribute("name", "itemQuantity");
      input.setAttribute("min", "1");
      input.setAttribute("max", "100");
      input.setAttribute("value", quantity);
      div_quantity.appendChild(input);

      // modifier de la quantité
      input.addEventListener("change", quantityModification);

      function quantityModification() {
        // récup balise article
        const itemGet = input.closest("article");
        const itemGetId = itemGet.dataset.id;
        const itemGetColor = itemGet.dataset.color;

        for (item of cart) {
          if (itemGetId == item.id && itemGetColor == item.color) {
            item.quantity = Number(input.value);
            localStorage.setItem("cart", JSON.stringify(cart));
            break;
          }
        }
        location.reload();
      }

      const div_delete = document.createElement("div");
      div_delete.setAttribute("class", "cart__item__content__settings__delete");
      div_content__settings.appendChild(div_delete);

      // afficher btn supprimer
      const btnDelete = document.createElement("p");
      btnDelete.setAttribute("class", "deleteItem");
      btnDelete.innerText = "Supprimer";
      div_delete.appendChild(btnDelete);

      // supprimer l'élement
      btnDelete.addEventListener("click", deleteItem);

      function deleteItem() {
        // permet de trouver l'élément article parent dans lequel se trouve l'élément btnDelete ('p')
        const itemGet = btnDelete.closest("article");
        const itemGetId = itemGet.dataset.id;
        const itemGetColor = itemGet.dataset.color;

        // permet de rechercher l'indice de l'élément correspondant dans le tableau (renvoie l'indice ou -1)
        const itemIndex = cart.findIndex(
          (item) => item.id === itemGetId && item.color === itemGetColor
        );

        if (itemIndex !== -1) {
          // Supprime l'élément du tableau (1 étant le nombre d'objet que l'on veut supprimer)
          cart.splice(itemIndex, 1);
          // mettre a jour le local
          localStorage.setItem("cart", JSON.stringify(cart));
          // Supprime l'élément du DOM
          itemGet.remove();
          // Rafraichir la page
          location.reload();
        }
      }
    }
  }

  // si pas de chargement de page, utiliser cette fonction
  function totalPrice() {
    let totalQuantity = 0;
    let totalPrice = 0;

    for (const item of cart) {
      totalQuantity += item.quantity;

      fetch(`http://localhost:3000/api/products/${item.id}`)
        .then((response) => response.json())
        .then((data) => {
          const price = data.price;
          const itemPrice = item.quantity * price;
          totalPrice += itemPrice;

          if (item === cart[cart.length - 1]) {
            const totalQuantityItem = document.getElementById("totalQuantity");
            const totalPriceItem = document.getElementById("totalPrice");

            totalQuantityItem.textContent = totalQuantity;
            totalPriceItem.textContent = totalPrice.toFixed(2);
          }
        });
    }
  }

  totalPrice();

  // Formulaire

  // Regex pour la vérification des champs de saisie
  const lettersPattern = /^[a-zA-ZÀ-ÿ-\s]+$/;
  const cityPattern = /^[a-zA-ZÀ-ÿ-\s]+$/;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  let error = false;

  // Vérification prénom
  const firstNameInput = document.getElementById("firstName");
  const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");

  firstNameInput.addEventListener("input", function () {
    const firstName = firstNameInput.value;
    if (lettersPattern.test(firstName)) {
      firstNameErrorMsg.textContent = "";
      error = false;
    } else {
      error = true;
      firstNameErrorMsg.textContent = "Veuillez saisir un prénom valide.";
    }
  });

  // Vérification nom
  const lastNameInput = document.getElementById("lastName");
  const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");

  lastNameInput.addEventListener("input", function () {
    const lastName = lastNameInput.value;
    if (lettersPattern.test(lastName)) {
      lastNameErrorMsg.textContent = "";
      error = false;
    } else {
      error = true;
      lastNameErrorMsg.textContent = "Veuillez saisir un nom valide.";
    }
  });

  // Vérification ville
  const cityInput = document.getElementById("city");
  const cityErrorMsg = document.getElementById("cityErrorMsg");

  cityInput.addEventListener("input", function () {
    const cityValue = city.value;
    if (cityPattern.test(cityValue)) {
      cityErrorMsg.innerText = "";
      error = false;
    } else {
      cityErrorMsg.innerText = "Veuillez rentrer votre ville";
      error = true;
    }
  });

  // Vérification adresse email
  const emailInput = document.querySelector("#email");
  const emailErrorMsg = document.querySelector("#emailErrorMsg");

  emailInput.addEventListener("input", function () {
    const email = emailInput.value;
    if (emailPattern.test(email)) {
      emailErrorMsg.innerText = "";
      error = false;
    } else {
      emailErrorMsg.innerText =
        "Veuillez rentrer une adresse mail valide exemple: jean@gmail.com";
      error = true;
    }
  });

  // Envoi du formulaire

  const submit = document.querySelector("form");
  submit.addEventListener("submit", (e) => {
    e.preventDefault();

    const contact = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      email: document.getElementById("email").value,
    };

    // tableau des produits
    const products = cart.map((product) => product.id);

    // vérifie que tous les champs sois remplis
    if (error === true) {
      alert("Veuillez remplir tous les champs, ou modifier les erreurs.");
    } else {
      fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        body: JSON.stringify({ contact, products }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          // redirection vers la page "confirmation + ajout de l'id dans url"
          document.location.href = `confirmation.html?id=${json.orderId}`;
        });
    }
  });
}
