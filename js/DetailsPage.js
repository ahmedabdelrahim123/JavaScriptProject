var usersimg = document.getElementById("image");
var userstitle = document.getElementById("title");
var userdescribtion = document.getElementById("description");
var userdiscount = document.getElementById("discountPercentage");
var userrate = document.getElementById("rating");
var login =document.getElementById("login");
var usersprice = document.getElementById("price");
var buy=document.getElementsByClassName("buy");
var specify_quantity=document.getElementsByClassName("specify_quantity");
var pageindex=0;

var i=0;
var item =[];
async function getprevious(){
   var response=await fetch ("https://dummyjson.com/products");
   var data = await response.json();
   var product=localStorage.getItem("productDetails")
   product=JSON.parse(product)
   // console.log(product.id);
   var index= (product.id)-1;
   // console.log(data.products[0].images[pageindex++])
   if (pageindex !=0)
  { 
   var previousimage=data.products[index].images[pageindex--];
   console.log(pageindex);
   console.log(previousimage);
   usersimg.setAttribute("src",previousimage);
  }

}
async function getnext(){
   var response=await fetch ("https://dummyjson.com/products");
   var data = await response.json();
   var product=localStorage.getItem("productDetails")
   product=JSON.parse(product)
   // console.log(product.id);
   var index= (product.id)-1;
   // console.log(data.products[0].images[pageindex++])
   if (pageindex !=3)
   { 
      var nextimage=data.products[index].images[pageindex++];
      console.log(pageindex);
      console.log(nextimage)
      usersimg.setAttribute("src",nextimage);}

   
}
async function chart() {
  var response = await fetch("https://dummyjson.com/products");
  var data = await response.json();
  var items = localStorage.getItem("productDetails");
  var productts = localStorage.getItem("allProducts");
  var currentUser= localStorage.getItem("login");
  var userrs= localStorage.getItem("users");
  
  item = JSON.parse(items);
  currentUser = JSON.parse(currentUser);
  users = JSON.parse(userrs);
  products = JSON.parse(productts);
 console.log(products[(item.id)-1]);


  if (localStorage.getItem("login") != null) {
    
    for (var user of users) {
      if (user.email == currentUser.email) {
      // if (item.id==user.id)
        // console.log(item);
 if (i!=0){

var flag=0;
console.log(user.cart.length);
  for(var n=0; n<user.cart.length;n++){
    if(user.cart[n].id==item.id ){
      flag=1
      break;
    }
    }

  if(flag==0 ){
    cartProduct = {
      id: item.id,
      title: products[(item.id)-1].title,
      category: products[(item.id)-1].category,
      price: products[(item.id)-1].price,
      image: products[(item.id)-1].images,
      quantity: i,
      
    };
    user.cart.push(cartProduct)
      localStorage.setItem("users", JSON.stringify(users));
  }
  else{
    if (i !=user.cart[n].quantity){
      cartProduct = {
        id: item.id,
        title: products[(item.id)-1].title,
        category: products[(item.id)-1].category,
        price: products[(item.id)-1].price,
        image: products[(item.id)-1].images,
        quantity: i,
        
      };
      user.cart[n]=cartProduct;
      localStorage.setItem("users", JSON.stringify(users));

    }
    else {
      alert("this item is already added with same quantity before");
    flag=0;}
  }

  
}else{
  $(specify_quantity).modal("show");
}
      }
    }
  } else {
    $(login).modal("show");
  }


}
// chart().then(()=>{
//   avoidmultipleaddition();
// })

async function back (){
window.location.href="home.html";
}

function increase() {
  i = i + 1;
  document.getElementById("quantity").setAttribute("value", `${i}`);
}

function decrease() {
  if (i != 0) {
    i = i - 1;
    document.getElementById("quantity").setAttribute("value", `${i}`);
  }
}

async function displaydata() {
  
  var response = await fetch("https://dummyjson.com/products");
  var data = await response.json();
  //local storage
  var product = localStorage.getItem("productDetails");
  var users = localStorage.getItem("users");
  // console.log(product);

  products = JSON.parse(product);
  // console.log(products);
  var index= (products.id)-1;
  console.log(index);
// for (item of items)
// {
//   if 
// }
/*******************************Images  */
//usersimg.setAttribute("src",data.products[index].thumbnail);

userstitle.innerHTML=`${data.products[index].title}`;
usersprice.innerHTML=`$${data.products[index].price}`;
userdescribtion.innerHTML=`${data.products[index].description}`;
userdiscount.innerHTML=`${data.products[index].discountPercentage}`;
userrate.innerHTML=`rate: ${data.products[index].rating}/5`;


}
displaydata().then(()=>{
  checkquntity();
})



async function checkquntity() {
  var response = await fetch("https://dummyjson.com/products");
  var data = await response.json();
  var items = localStorage.getItem("productDetails");
  var productts = localStorage.getItem("allProducts");
  var currentUser= localStorage.getItem("login");
  var userrs= localStorage.getItem("users");
  
  item = JSON.parse(items);
  currentUser = JSON.parse(currentUser);
  users = JSON.parse(userrs);
  products = JSON.parse(productts);
 console.log(products[(item.id)-1]);



    
    for (var user of users) {
      if (user.email == currentUser.email) {
       for(var n=0; n<user.cart.length;n++){
         if(user.cart[n].id==item.id &&user.cart[n].quantity !=0){
          // console.log("hello");
          i=user.cart[n].quantity;
          document.getElementById("quantity").setAttribute("value", `${i}`);
         }
       }
        //  console.log(item);
      }
      break;
    }
}


async function avoidmultipleaddition() {
  var response = await fetch("https://dummyjson.com/products");
  var data = await response.json();
  var items = localStorage.getItem("productDetails");
  var productts = localStorage.getItem("allProducts");
  var currentUser= localStorage.getItem("login");
  var userrs= localStorage.getItem("users");
  
  item = JSON.parse(items);
  currentUser = JSON.parse(currentUser);
  users = JSON.parse(userrs);
  products = JSON.parse(productts);
 console.log(products[(item.id)-1]);



    
    for (var user of users) {
      if (user.email == currentUser.email) {
       for(var n=0; n<user.cart.length;n++){
         if(user.cart[n].id==item.id &&user.cart[n].quantity ==i){
           alert("this item is already added with same quantity before")
         }
       }
        //  console.log(item);
      }
      break;
    }
}