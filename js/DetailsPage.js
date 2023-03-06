
var details = JSON.parse(localStorage.getItem("productDetails"))

var title = document.getElementById("title");
title.textContent=`${details.title}`

var desc=document.getElementById("desc");
desc.innerHTML=`${details.description}`

var rating =document.getElementById("rating");
rating.innerHTML=`${details.rating}/5`

var price = document.getElementById("price")
price.innerHTML=`$ ${details.price}`

var category = document.getElementById("category")
category.innerHTML = `${details.category}`

var brand = document.getElementById("brand")
brand.innerHTML=`${details.brand}`

var mainImg = document.getElementById("main_product_image")
mainImg.setAttribute("src",details.images[0])

var img1 = document.getElementById("img1")
img1.setAttribute("src",details.images[0])

var img2 = document.getElementById("img2")
img2.setAttribute("src",details.images[1])

var img3 = document.getElementById("img3")
img3.setAttribute("src",details.images[2])

var img4 = document.getElementById("img4")
img4.setAttribute("src",details.images[3])

var users
var addcartbtn = document.querySelector(".add-cart")
var quantity_input = document.querySelector(".quantity")


function addCart(cartProduct,quantity_input) {
  var users = JSON.parse(localStorage.getItem("users"));
  var currentUser = JSON.parse(localStorage.getItem("login"));    
  cartProduct.quantity = parseInt(quantity_input.value)
  if (localStorage.getItem("login") != null) {
      for (var user of users) {
          if (user.email == currentUser.email) {
              var result = user.cart.find((item) => item.id == cartProduct.id);
              if (result == undefined) {
                  user.cart.push(cartProduct);
                  localStorage.setItem("users", JSON.stringify(users));
                  $(addedCart).modal("show");
              } else {
                user.cart = user.cart.filter((item) => item.id != cartProduct.id);
                user.cart.push(cartProduct);
                localStorage.setItem("users", JSON.stringify(users));
                  $(inCart).modal("show");
              }
          }
      }
  } else {
      $(exampleModal1).modal("show");
  }
}


addcartbtn.addEventListener("click",()=>{
  addCart(details,quantity_input)
})

var plus = document.querySelectorAll(".plus")
plus.forEach((btn) => {
    btn.addEventListener('click', () => {
        var input = (btn.parentNode).querySelector("input")
        var value  = parseInt(input.value)
        input.value = value  + 1
    })
});

var minus = document.querySelectorAll(".minus")
minus.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        var input = (btn.parentNode).querySelector("input")
        var value  = parseInt(input.value)
        input.value = value  - 1
        if(value == 1){
            input.value = 1
            btn.style.cursor = "not-allowed";
        }
    })
});