var rowDiv = document.querySelector(".divOfBestSeller");
console.log(rowDiv)
var catDiv = document.querySelector(".divOfCategories");
var categRow = document.querySelector(".categRow");

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
    //Start of setting IDs for buttons

    var column = document.createElement("div");
    column.classList.add("col-md-4", "mt-2","mb-3", "swiper-slide", "card");
    column.innerHTML = `   
    <div class="card-body">
    <div class="card-img-actions">
        <img src="${item.images[0]}" class="card-img img-fluid" width="96" height="350" alt="">
    </div>
</div>
<div class="card-body contOfCardBody bg-light text-center">
    <div class="mb-2">
        <h6 class="font-weight-semibold mb-2">
            <a href="#" class="mb-2 nameOfProduct mb-3" data-abc="true" id="${item.id}">${item.title}</a>
        </h6>
        <a href="#" class="text-muted" data-abc="true">${item.category}</a>
    </div>
    <h3 class="mb-0 font-weight-semibold">$${item.price} </h3>
    <div>
        <i class="fa fa-star star"></i>
        <i class="fa fa-star star"></i>
        <i class="fa fa-star star"></i>
        <i class="fa fa-star star"></i>
    </div>
    <button type="button" class="btn bg-cart cart my-4" id="${item.id}"><i class="bi bi-cart-plus mr-2"></i> Add to
        cart</button>
</div>          
    `;
    rowDiv.appendChild(column);
  }

  //Add products To Cart
  var buttons = document.getElementsByClassName("cart");
  var login = document.getElementById("login");
  var cartProduct;

  var addToCart = function () {
    var users = JSON.parse(localStorage.getItem("users"));
    var currentUser = JSON.parse(localStorage.getItem("login"));
    console.log(currentUser);
    console.log(users);
    productId = this.id;
    for (item of data) {
      if (productId == item.id) {
        item.quantity = 1;
        cartProduct = item;
      }
    }
    console.log(cartProduct);
    console.log(item);
   //  console.log(currentUser.email);

    if (localStorage.getItem("login") != null) {
      console.log(currentUser.email);
      for (var user of users) {
        if (user.email == currentUser.email) {
          console.log(user.email);
          var result = user.cart.find((item) => item.id == productId);
          if (result == undefined) {
            user.cart.push(cartProduct);
            localStorage.setItem("users", JSON.stringify(users));
            console.log(user.cart);
          } else {
            console.log("already added");
            console.log(user.cart);
          }
        }
      }
    } else {
      console.log("login please");
      $(login).modal("show");
    }
  };
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", addToCart);
  }
});

getData().then((data) => {
  var categ = [data[0].category];

  for (var item of data) {
    if (!categ.includes(item.category)) {
      categ.push(item.category);
    }
  }


  var names = document.getElementsByClassName("nameOfProduct");

  
  for (var i = 0; i < names.length; i++) {
    names[i].addEventListener("click", showDetails);
  }
});

let allProducts = JSON.parse(localStorage.getItem("allProducts"));

var productDetails = [];

localStorage.setItem("productDetails", JSON.stringify(productDetails));

var categorydetails = [];
localStorage.setItem("category", JSON.stringify(categorydetails));
function categoryFunction(categoryName) {
  var categoryItems = JSON.parse(localStorage.getItem("category"));
  console.log(categoryItems);
  var categg = allProducts.filter(function (el) {
    console.log(el.category);

    return el.category == categoryName;
  });
  console.log(categg);
  localStorage.setItem("category", JSON.stringify(categg));
}


var users = JSON.parse(localStorage.getItem("users"));
var currentUser = JSON.parse(localStorage.getItem("login"));
console.log(currentUser);
var showDetails = function () {
  var displayedProduct = JSON.parse(localStorage.getItem("productDetails"));
  var currentProductId = this.id;
  console.log(currentUser.email);
  if (localStorage.getItem("login") != null) {
    var onlineUser = users.find((item) => item.email == currentUser.email);
    var cartProduct = onlineUser.cart.find(
      (prod) => prod.id == currentProductId
    )
      ? onlineUser.cart.find((prod) => prod.id == currentProductId)
      : allProducts.find((item) => (item.id = currentProductId));
    console.log(cartProduct);
    localStorage.setItem("productDetails", JSON.stringify(cartProduct));
  }
  else {
    displayedProduct = allProducts.find((item) => (item.id = currentProductId));
    console.log(displayedProduct);
    localStorage.setItem("productDetails", JSON.stringify(displayedProduct));
  }
};
