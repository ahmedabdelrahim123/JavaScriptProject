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
   var product=localStorage.getItem("show-item")
   product=JSON.parse(product)
   // console.log(product.id);
   var index= (product.id)-1;
   // console.log(data.products[0].images[pageindex++])
   if (pageindex !=0)
  { 
   var previousimage=data.products[index].images[pageindex--];
   console.log(pageindex);
   console.log(previousimage)
   usersimg.setAttribute("src",previousimage);}

}
async function getnext(){
   var response=await fetch ("https://dummyjson.com/products");
   var data = await response.json();
   var product=localStorage.getItem("show-item")
   product=JSON.parse(product)
   // console.log(product.id);
   var index= (product.id)-1;
   // console.log(data.products[0].images[pageindex++])
   if (pageindex !=4)
   { 
      var nextimage=data.products[index].images[pageindex++];
      console.log(pageindex);
      console.log(nextimage)
      usersimg.setAttribute("src",nextimage);}

   
}

 async function purchase(){
   var response=await fetch ("https://dummyjson.com/products");
    var data = await response.json();
    var product=localStorage.getItem("show-item")
    product=JSON.parse(product)
    console.log(product.id);
    var index= (product.id)-1;
    var temp= {id:data.products[index].id,
      brand:data.products[index].brand,
      category:data.products[index].category,
      description:data.products[index].description,
      title:data.products[index].title,
      quantity:i }
      console.log("temp");
    console.log( temp);
    localStorage.setItem("show-item",JSON.stringify(temp))
   // var product=localStorage.getItem("show-item")
   //  console.log(product);  
}
async function chart(){
   var response=await fetch ("https://dummyjson.com/products");
   var data = await response.json();
   var product=localStorage.getItem("show-item")
   product=JSON.parse(product)
   console.log(product.id);
   var index= (product.id)-1;
   var temp= {id:data.products[index].id,
     brand:data.products[index].brand,
     category:data.products[index].category,
     description:data.products[index].description,
     title:data.products[index].title,
     quantity:i }
   item.push(temp);
   localStorage.setItem("add-to-cart",JSON.stringify(item));
   console.log("item");
   console.log( item);
}
async function back (){
   var response=await fetch ("https://dummyjson.com/products");
   var data = await response.json();
   var product=localStorage.getItem("show-item")
   product=JSON.parse(product)
   // if (product.quantity===0)
   // {   
      
   //    localStorage.removeItem("show-item")
   //    }
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

//local storage
var product=localStorage.getItem("show-item")
product=JSON.parse(product)
// var index= (product.id)-1;
// console.log(index);

usersimg.setAttribute("src",data.products[index].images[pageindex]);
userstitle.innerHTML=`${data.products[0].title}`;
usersprice.innerHTML=`${data.products[0].price}`;

// console.log(data.products[0]);

var arrofobj=Object.values(data.products[0])
var index=0;
var temp= {id:data.products[index].id,
   brand:data.products[index].brand,
   category:data.products[index].category,
   description:data.products[index].description,
   title:data.products[index].title,
   quantity:i ,
   
    images:data.products[index].images
  
}
   console.log("temp");
 console.log( temp);
 localStorage.setItem("show-item",JSON.stringify(temp))
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