var rowDiv = document.querySelector(".divOfBestSeller");
var catDiv = document.querySelector(".divOfCategories");

//fetch data from dummy json
var fetchedData;
async function getData() {
  var response = await fetch("https://dummyjson.com/products");
  fetchedData = await response.json();
  return fetchedData.products;
}

getData().then((data) => {
  localStorage.setItem("allProducts", JSON.stringify(data));

  for (var item of data) {
    //start of Todays Best Dails For You! HTML
    var cardDiv = document.createElement("div");
    cardDiv.classList.add("card", "shadow", "cardCont");
    cardDiv.setAttribute("id", "card");
    var imgDiv = document.createElement("div");
    imgDiv.classList.add("imgContainer");

    var img = document.createElement("img");
    img.classList.add("card-img-top");
    img.setAttribute("src", item.images[0]);
    imgDiv.append(img);

    var cardBodyDiv = document.createElement("div");
    cardBodyDiv.classList.add("card-body");

    var NameAndPrice = document.createElement("div");
    NameAndPrice.classList.add("containerOfNameAndPrice");

    var price = document.createElement("p");
    var productPrice = document.createTextNode(item.price);
    price.appendChild(productPrice);

    var name = document.createElement("h5");
    name.classList.add("card-title");
    var productName = document.createTextNode(item.title);
    name.appendChild(productName);

    NameAndPrice.append(name, price);
    descDiv = document.createElement("div");
    descDiv.classList.add("descContainer");

    var pDescription = document.createElement("p");
    pDescription.classList.add("card-text");
    var description = document.createTextNode(item.description);

    var buttonAndQuantity = document.createElement("div");
    buttonAndQuantity.classList.add("containerOfButtonAndQuantity");

    var addToCart = document.createElement("button");
    addToCart.classList.add("cart");
    addToCart.setAttribute("id", "carti");
    var cartButtonName = document.createTextNode("Add to cart");
    addToCart.appendChild(cartButtonName);

    var details = document.createElement("button");
    details.classList.add("details");
    var detailsButtonName = document.createTextNode("Details");
    details.appendChild(detailsButtonName);

    buttonAndQuantity.append(addToCart, details);

    pDescription.appendChild(description);

    descDiv.append(pDescription);

    cardBodyDiv.append(NameAndPrice, descDiv);
    cardDiv.append(imgDiv, cardBodyDiv, buttonAndQuantity);
    rowDiv.appendChild(cardDiv);
    //End of Todays Best Dails For You! HTML

    //Start of setting IDs for buttons
    var buttons = document.getElementsByClassName("cart");
    for (let i = 0; i < buttons.length; i++) {
      addToCart.setAttribute("id", `${item.id}`);
    }
    var cards = document.getElementsByClassName("details");
    for (let i = 0; i < cards.length; i++) {
      details.setAttribute("id", `${item.id}`);
    }

    //End of setting IDs for buttons
  }

  //Add products To Cart
  var buttons = document.getElementsByClassName("cart");

  var currentUser = JSON.parse(localStorage.getItem("currentUser"));
  var cart = [{ userID: currentUser.id, products: [] }];

  var addFunction = function () {
    var cartProduct;
    var currentId = this.id;
    console.log(currentId);
    for (var item of data) {
      if (currentId == item.id) {
        console.log(currentId);
        cartProduct = {
          id: item.id,
          title: item.title,
          category: item.category,
          price: item.price,
          image: item.images[1],
          quantity: 1,
        };
        cart[0].products.push(cartProduct);
      }
    }
    // console.log(typeof(cart.products))
    console.log(cart);
    console.log(cart[0].products);

    localStorage.setItem("cart", JSON.stringify(cart));

    // console.log(currentId);
    document.getElementById(currentId).style.backgroundColor = "red";
    document.getElementById(currentId).innerHTML = "Remove";
    document.getElementById(currentId).style.borderColor = "red";
    // document.getElementsByClassName("cart").style.backgroundColor = "red";
  };

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", addFunction);
  }
});

getData().then((data) => {
  // console.log(item.category);
  var categ = [data[0].category];
  // console.log(categ)
  // console.log(typeof categ)

  for (var item of data) {
    if (!categ.includes(item.category)) {
      categ.push(item.category);
    }
  }

  for (var i = 0; i < categ.length; i++) {
    var cardDiv = document.createElement("div");
    cardDiv.classList.add("card", "mb-3");

    var rowCardDiv = document.createElement("div");
    rowCardDiv.classList.add("row", "g-0");

    imgColDiv = document.createElement("div");
    imgColDiv.classList.add("col-md-4");

    var img = document.createElement("img");
    img.classList.add("img-fluid", "rounded-start");
    img.setAttribute(
      "src",
      "https://cdn.shopify.com/s/files/1/0410/9608/5665/t/3/assets/pf-7115f8d1--cover-image-2.jpg?v=1614833751"
    );
    imgColDiv.append(img);

    colDiv = document.createElement("div");
    colDiv.classList.add("col-md-8");

    cardBodyDiv = document.createElement("div");
    cardBodyDiv.classList.add("card-body");

    var header5 = document.createElement("h5");
    header5.classList.add("card-title");
    var header5Text = document.createTextNode(categ[i]);
    header5.appendChild(header5Text);

    cardBodyDiv.append(header5);
    colDiv.append(cardBodyDiv);
    rowCardDiv.append(imgColDiv, colDiv);
    cardDiv.append(rowCardDiv);
    catDiv.appendChild(cardDiv);
  }

  productDetailes = {
    id: "",
    title: "",
    description: "",
    price: "",
    discountPercentage: "",
    rating: "",
    stock: "",
    brand: "",
    category: "",
    thumbnail: "",
    images: [],
  };

  var cards = document.getElementsByClassName("details");

  var showDetails = function () {
    for (var item of allProducts) {
      var currentId = this.id;
      if (item.id == currentId) {
        console.log(item.id);
        productDetailes.id = item.id;
        productDetailes.title = item.title;
        productDetailes.description = item.description;
        productDetailes.price = item.price;
        productDetailes.discountPercentage = item.discountPercentage;
        productDetailes.rating = item.rating;
        productDetailes.stock = item.stock;
        productDetailes.brand = item.brand;
        productDetailes.category = item.category;
        productDetailes.thumbnail = item.thumbnail;
        for (var i = 0; i < item.images.length; i++) {
          productDetailes.images[i] = item.images[i];
        }
      }
    }
    localStorage.setItem("productDetails", JSON.stringify(productDetailes));
    window.location = "details.html";

    console.log(productDetailes);
  };
  for (var i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", showDetails);
  }
});

let allProducts = JSON.parse(localStorage.getItem("allProducts"));
