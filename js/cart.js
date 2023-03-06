
var table_body = document.querySelector("tbody")
var allPrice  = document.querySelector(".total-price")
var cart_Array = []
var users
var login
var userID
var total_price


function loadProductsFromLocalStorage(){
    if(window.localStorage.getItem("users") && window.localStorage.getItem("login")){
        users = JSON.parse(window.localStorage.getItem("users"))
        login = JSON.parse(window.localStorage.getItem("login"))
        users.forEach(user=>{
            if(login.email == user.email){
                cart_Array = user.cart
                userID = user.email
            }
        })
    }
}

function loadCart(){
    loadProductsFromLocalStorage()
    if(cart_Array.length > 0){
        updateProductsNumber(cart_Array.length)
        cart_Array.forEach(element=>{
            var tr = document.createElement('tr');
            tr.className = ""
            tr.setAttribute("name",element.title)
            tr.innerHTML = `
                <th scope="row" class="border-0 py-3">
                    <div class="p-2">
                        <img src=${element.images[0]}
                            alt="" width="70" class="img-fluid rounded shadow-sm me-3">
                        <div class="ml-3 d-inline-block align-middle">
                            <h5 class="mb-2"> <a href="#"
                                    class="text-dark d-inline-block align-middle name text-decoration-none">${element.title}</a></h5><span
                                class="text-muted font-weight-normal font-italic d-block">${element.category}</span>
                        </div>
                    </div>
                </th>
                <td class="border-0 align-middle text-center"><strong class="price">$${element.price}.00</strong></td>
                <td class="border-0 align-middle text-center px-5">
                    <div class="input-group text-center">
                        <span class="input-group-text minus">-</span>
                        <input type="text" class="form-control quantity" value=${element.quantity} disabled>
                        <span class="input-group-text plus">+</span>
                    </div>
                </td>
                <td class="border-0 align-middle text-center"><a href="#" class="text-dark delete-btn"><i
                            class="fa fa-trash"></i></a>
                </td>
            `
            table_body.appendChild(tr)
        })
        var delete_btns = document.querySelectorAll(".delete-btn")
        delete_btns.forEach((btn) => {
            btn.addEventListener('click', () => {
                var parent = (btn.parentNode).parentNode
                parent.remove()
                deleteTaskFromLocalStorage(parent.getAttribute("name"))
            })
        });

        var plus = document.querySelectorAll(".plus")
        plus.forEach((btn) => {
            btn.addEventListener('click', () => {
                var input = (btn.parentNode).querySelector("input")
                var value  = parseInt(input.value)
                input.value = value  + 1
                updateLocalStorage(input,"plus")
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
                }else if(value >= 1){
                    updateLocalStorage(input,"minus")
                }
            })
        });
        calculatePrice()
        document.querySelector(".checkout-btn").addEventListener('click',()=>{
            console.log(allPrice.textContent)
        })
    }
}

function updateLocalStorage(input,type){
    var quantity = input.value
    var parent = ((input.parentNode).parentNode).parentNode
    var name = parent.querySelector(".name").textContent
    if(type == "plus"){
        cart_Array.forEach(element=>{
            if(element.title == name){
                var price = element.price
                total_price = total_price + price
                allPrice.textContent = `$${total_price}.00`
                element.quantity = parseInt(quantity)
            }
        })
    }
    if(type == "minus"){
        cart_Array.forEach(element=>{
            if(element.title == name){
                var price = element.price
                total_price = total_price - price
                allPrice.textContent = `$${total_price}.00`
                element.quantity = parseInt(quantity)
            }
        })
    }
    for(let i=0;i<users.length;i++){
        if(users[i].email == userID){
            users[i].cart = cart_Array
        }
    }
    window.localStorage.setItem("users", JSON.stringify(users))
}

function calculatePrice(){
    total_price = 0
    cart_Array.forEach(element=>{
        var price = element.price * element.quantity
        total_price = total_price + price
    })
    total_price = total_price + 10
    allPrice.textContent = `$${total_price}.00`
}

function deleteTaskFromLocalStorage(name){
    cart_Array = cart_Array.filter((item) => item.title != name);
    deleteUpdateLocalStorage(name)
    calculatePrice()
}

function deleteUpdateLocalStorage(name){
    for(let i=0;i<users.length;i++){
        if(users[i].email == userID){
            users[i].cart = users[i].cart.filter((item) => item.title != name);
            updateProductsNumber((users[i].cart).length)
        }
    }
    window.localStorage.setItem("users", JSON.stringify(users))
}

function updateProductsNumber(length){
    document.querySelector(".products-number").textContent = length
}



loadCart()

