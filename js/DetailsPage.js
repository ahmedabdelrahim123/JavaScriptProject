var usersimg = document.getElementById("image");
var userstitle = document.getElementById("title");
var usersprice = document.getElementById("price");
var buy=document.getElementsByClassName("buy");

var i=0;

async function purchase(){

}

 function increase() {
   i=i+1;
   document.getElementById("quantity").setAttribute("value",`${i}`);  
}

 function decrease() {
if (i !=0){
   i=i-1;
   document.getElementById("quantity").setAttribute("value",`${i}`);
}
}


async function displaydata(){
var response=await fetch ("https://dummyjson.com/products");
var data = await response.json();
// console.log(data);

var product=localStorage.getItem("show-item")
product=JSON.parse(product)
var index= (product.id)-1;
console.log(index);
usersimg.setAttribute("src",data.products[index].thumbnail);
userstitle.innerHTML=`${data.products[index].title}`;
usersprice.innerHTML=`${data.products[index].price}`;
// console.log(data.products[0]);

// var arrofobj=Object.values(data.products[0])
// // console.log(arrofobj)

// var objtostore=data.products[0]

// localStorage.setItem("show-item",JSON.stringify( objtostore))
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