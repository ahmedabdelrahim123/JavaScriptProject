var usersimg = document.getElementById("image");
var userstitle = document.getElementById("title");
var usersprice = document.getElementById("price");
var buy=document.getElementsByClassName("buy");
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
  //  console.log(pageindex);
  //  console.log(previousimage)
   usersimg.setAttribute("src",previousimage);}

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

//  async function purchase(){
//    var response=await fetch ("https://dummyjson.com/products");
//     var data = await response.json();
//     var product=localStorage.getItem("show-item")
//     product=JSON.parse(product)
//     console.log(product.id);
//     var index= (product.id)-1;
//     var temp= {id:data.products[index].id,
//       brand:data.products[index].brand,
//       category:data.products[index].category,
//       description:data.products[index].description,
//       title:data.products[index].title,
//       quantity:i }
//       console.log("temp");
//     console.log( temp);
//     localStorage.setItem("show-item",JSON.stringify(temp))
//    // var product=localStorage.getItem("show-item")
//    //  console.log(product);  
// }
async function chart() {
  var response = await fetch("https://dummyjson.com/products");
  var data = await response.json();
  var product = localStorage.getItem("productDetails");
  var logineduser= localStorage.getItem("login");
  product = JSON.parse(product);
  console.log("login ls")
  // console.log(product.cart);
  var index = product.id - 1;
  var temp = {
    // id: data.products[index].id,
    // brand: data.products[index].brand,
    price: data.products[index].price,
    title: data.products[index].title,
    quantity: i
  };
  console.log(temp)
  //  logineduser.cart.push(temp);
   localStorage.setItem("login", JSON.stringify(logineduser.cart));
   console.log(users)

  // if (product[index].quantity !=0)
  // {item.push(product[index]);
  // localStorage.setItem("users", JSON.stringify(item));
  // console.log(users)}

  // console.log("item");
  // console.log(item);

  const box = document.createElement("div");
  box.setAttribute("class",`alert alert-success`);
box.innerHTML = 'sucessfly added to chart';
console.log(box);
document.body.appendChild(box);
}

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
  // console.log(product);

  products = JSON.parse(product);
  console.log(products);
  var index= (products.id)-1;
  console.log(index);

usersimg.setAttribute("src",data.products[index].images[0]);
userstitle.innerHTML=`${data.products[index].title}`;
usersprice.innerHTML=`${data.products[index].price}`;

  // console.log(data.products[0]);
}
// displaydata().then(()=>{

// })
displaydata();

// function restore(){

// var product=localStorage.getItem("show-item")
// product=JSON.parse(product)
// // console.log(product)
// console.log("this is restore func")
// // console.log(product.brand)
// console.log(product.id)
// console.log(product.price)
// // document.getElementById("product").innerHTML=+`<p>${product.brand}</p>`
// }

//  restore();

//  function deletefromstorage(){
//     var product=localStorage.getItem("product")
//    //  console.log(product)
//    var productobj=JSON.parse(product)
// //    var x=productobj;
//     console.log(productobj)
//     productobj={}
//     // localStorage.removeItem("product")
//     localStorage.setItem("product","")

//  }

//   deletefromstorage()
