var rowDiv = document.querySelector(".divOfBestSeller");
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
    column.classList.add("col-md-4", "mt-2", "mb-3", "swiper-slide", "card");
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
    productId = this.id;
    for (item of data) {
      if (productId == item.id) {
        item.quantity = 1;
        cartProduct = item;
      }
    }
    if (localStorage.getItem("login") != null) {
      for (var user of users) {
        if (user.email == currentUser.email) {
          var result = user.cart.find((item) => item.id == productId);
          //  console.log(result)
          if (result == undefined) {
            user.cart.push(cartProduct);
            console.log(cartProduct);
            localStorage.setItem("users", JSON.stringify(users));
          } else {
          }
        }
      }
    } else {
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
  localStorage.setItem("categories", JSON.stringify(categ));

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
    return el.category == categoryName;
  });
  localStorage.setItem("category", JSON.stringify(categg));
}

var showDetails = function () {
  var currentUser = JSON.parse(localStorage.getItem("login"));
  var users = JSON.parse(localStorage.getItem("users"));
  var allproducts = JSON.parse(localStorage.getItem("allProducts"));
  //var prodDetail = JSON.parse(localStorage.getItem("productDetails"));
  var productId = this.id;
  if (localStorage.getItem("login") != null) {
    var user = users.find((user) => user.email == currentUser.email);
    if (user) {
      var userCart = user.cart.find((item) => item.id == productId);
      if (userCart) {
        // exist in user cart
        localStorage.setItem("productDetails", JSON.stringify(userCart));
      } else {
        //not add to cart before
        userCart = allproducts.find((item) => item.id == productId);
        localStorage.setItem("productDetails", JSON.stringify(userCart));
      }
    }
  } else {
    var show = allproducts.find((item) => item.id == productId);
    localStorage.setItem("productDetails", JSON.stringify(show));
    console.log("welcome unknown");
  }
};

function findItemFromAllProducts() {
  currentProductId = this.id;
  var productss;
  for (var item of allProducts) {
    if (item.id == currentProductId) {
      productss = item;
    }
  }
  return productss;
}
var categories = localStorage.getItem("categories");

// localStorage.clear();
