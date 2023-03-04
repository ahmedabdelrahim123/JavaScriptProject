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
    // console.log(item);
    //start of Todays Best Dails For You! HTML
    // var cardDiv = document.createElement("div");
    // cardDiv.classList.add("card", "shadow", "cardCont");
    // cardDiv.setAttribute("id", "card");
    // var imgDiv = document.createElement("div");
    // imgDiv.classList.add("imgContainer");

    // var img = document.createElement("img");
    // img.classList.add("card-img-top");
    // img.setAttribute("src", item.images[0]);
    // imgDiv.append(img);

    // var cardBodyDiv = document.createElement("div");
    // cardBodyDiv.classList.add("card-body");

    // var NameAndPrice = document.createElement("div");
    // NameAndPrice.classList.add("containerOfNameAndPrice");

    // var price = document.createElement("p");
    // var productPrice = document.createTextNode(item.price);
    // price.appendChild(productPrice);

    // var name = document.createElement("h5");
    // name.classList.add("card-title");
    // var productName = document.createTextNode(item.title);
    // name.appendChild(productName);

    // NameAndPrice.append(name, price);
    // descDiv = document.createElement("div");
    // descDiv.classList.add("descContainer");

    // var pDescription = document.createElement("p");
    // pDescription.classList.add("card-text");
    // var description = document.createTextNode(item.description);

    // var buttonAndQuantity = document.createElement("div");
    // buttonAndQuantity.classList.add("containerOfButtonAndQuantity");

    // var addToCart = document.createElement("button");
    // addToCart.classList.add("cart");
    // addToCart.setAttribute("id", "carti");
    // var cartButtonName = document.createTextNode("Add to cart");
    // addToCart.appendChild(cartButtonName);

    // var details = document.createElement("button");
    // details.classList.add("details");
    // var detailsButtonName = document.createTextNode("Details");
    // details.appendChild(detailsButtonName);

    // buttonAndQuantity.append(addToCart, details);

    // pDescription.appendChild(description);

    // descDiv.append(pDescription);

    // cardBodyDiv.append(NameAndPrice, descDiv);
    // cardDiv.append(imgDiv, cardBodyDiv, buttonAndQuantity);
    // rowDiv.appendChild(cardDiv);
    //End of Todays Best Dails For You! HTML

    //Start of setting IDs for buttons

    var column = document.createElement("div");
    column.classList.add("col-md-4", "mt-2");

    column.innerHTML = `
                    <div class="card">
                        <div class="card-body">
                            <div class="card-img-actions">
                                <img
                                    src="${item.images[0]}"
                                    class="card-img img-fluid" width="96"
                                    height="350" alt="">
                            </div>
                        </div>

                        <div class="card-body bg-light text-center">
                            <div class="mb-2">
                                <h6 class="font-weight-semibold mb-2">
                                    <a href="DetailsPage.html" class="text-default mb-2 nameOfProduct"
                                        data-abc="true" id="${item.id}">${item.title}</a>
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
                            <button type="button" class="btn bg-cart cart" id="${item.id}"><i
                                    class="bi bi-cart-plus mr-2"></i> Add to
                                cart</button>
                    </div>
                </div>
    `;
    rowDiv.appendChild(column);
  }

  //Add products To Cart
  var buttons = document.getElementsByClassName("cart");

  // var currentUser = JSON.parse(localStorage.getItem("currentUser"));
  // var cart = [{ userID: currentUser.id, products: [] }];

  // var addFunction = function () {
  //   var cartProduct;
  //   var currentId = this.id;
  //   console.log(currentId);
  //   for (var item of data) {
  //     if (currentId == item.id) {
  //       console.log(currentId);
  //       cartProduct = {
  //         id: item.id,
  //         title: item.title,
  //         category: item.category,
  //         price: item.price,
  //         image: item.images[1],
  //         quantity: 1,
  //       };
  //       cart[0].products.push(cartProduct);
  //     }
  //   }
  //   // console.log(typeof(cart.products))
  //   console.log(cart);
  //   console.log(cart[0].products);

  //   localStorage.setItem("cart", JSON.stringify(cart));

  //   // console.log(currentId);
  //   document.getElementById(currentId).style.backgroundColor = "red";
  //   document.getElementById(currentId).innerHTML = "Remove";
  //   document.getElementById(currentId).style.borderColor = "red";
  //   // document.getElementsByClassName("cart").style.backgroundColor = "red";
  // };

  // for (var i = 0; i < buttons.length; i++) {
  //   buttons[i].addEventListener("click", addFunction);
  // }
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

  

  var names = document.getElementsByClassName("nameOfProduct");

  var showDetails = function () {
    // prodDetail = {
    //   id: "",
    //   title: "",
    //   description: "",
    //   price: "",
    //   discountPercentage: "",
    //   rating: "",
    //   stock: "",
    //   brand: "",
    //   category: "",
    //   thumbnail: "",
    //   images: [],
    // };
    var prodDetail= JSON.parse(localStorage.getItem("productDetails"))
    console.log(prodDetail)
    for (var item of allProducts) {
      var currentId = this.id;
      if (item.id == currentId) {
        if((localStorage.getItem("productDetails")!=null)){
        console.log(item.id);
        prodDetail.id = item.id;
        prodDetail.title = item.title;
        prodDetail.description = item.description;
        prodDetail.price = item.price;
        prodDetail.discountPercentage = item.discountPercentage;
        prodDetail.rating = item.rating;
        prodDetail.stock = item.stock;
        prodDetail.brand = item.brand;
        prodDetail.category = item.category;
        prodDetail.thumbnail = item.thumbnail;
        for (var i = 0; i < item.images.length; i++) {
          prodDetail.images[i] = item.images[i];
        }
      }
    }
      console.log(currentId);
    }
    console.log(prodDetail)

    localStorage.setItem("productDetails", JSON.stringify(prodDetail));
    // window.location = "details.html";

    console.log(productDetails);
  };
  for (var i = 0; i < names.length; i++) {
    names[i].addEventListener("click", showDetails);
  }
});

let allProducts = JSON.parse(localStorage.getItem("allProducts"));

var productDetails = {
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
localStorage.setItem("productDetails", JSON.stringify(productDetails));
