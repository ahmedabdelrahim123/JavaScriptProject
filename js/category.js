async function fetchData() {
    var request = await fetch('https://dummyjson.com/products');
    var data = await request.json();
    return data.products;
}

var lists = document.querySelectorAll(".list-group-item")
var products_container = document.querySelector(".product-container")
var checked_types = []
var all_data = []
var data_filtered = []


let getCategory = window.localStorage.getItem("category")
console.log(getCategory)
fetchData().then(data => {
    all_data = data

    if (getCategory) {
        checked_types.push(getCategory)
        showData(checked_types)
    } else {
        showData(checked_types)
    }
})


lists.forEach(list => {
    list.addEventListener('click', () => {
        list.classList.toggle("check")
        if (list.classList.contains("check")) {
            checked_types.push(list.getAttribute("type"))
        } else {
            checked_types = checked_types.filter(type => type != list.getAttribute("type"))
        }
        showData(checked_types)
    })
})


function showData(types) {
    console.log("entered");
    if (types.length == 0) { //All Data
        data_filtered = []
        data_filtered = all_data
    } else { // filtered data
        data_filtered = []
        for (let i = 0; i < types.length; i++) {
            all_data.forEach(data => {
                if (data.category == types[i]) {
                    data_filtered.push(data)
                }
            })
        }
    }
    console.log(data_filtered);
    updateHTML(data_filtered)
}

function updateHTML(data_filtered) {
    products_container.innerHTML = ""
    data_filtered.forEach(item => {
        var div = document.createElement("div")
        div.classList = "row p-3 mb-4 bg-white border rounded-4 shadow-lg list-item"
        div.innerHTML = `
                <div class="col-md-3 mt-1"><img class="img-fluid img-responsive rounded product-image" style="height: 168px;"
                    src="${item.images[0]}"></div>
                <div class="col-md-6 mt-3">
                    <h5 class="title">${item.title}</h5>
                    <div class="d-flex flex-row">
                        <div class="ratings mr-2"><i class="fa fa-star me-2"></i><span>${item.rating}/5</span></div>
                    </div>
                    <div class="mt-1 mb-1 spec-1"><span>${item.brand}</span></div>
                    <div class="mt-1 mb-1 spec-1"><span>${item.category}</span></div>
                    <p class="text-justify text-truncate para mb-0">${item.description}.<br><br></p>
                </div>
                <div class="align-items-center align-content-center col-md-3 border-left mt-1">
                    <div class="d-flex flex-row align-items-center">
                        <h4 class="mr-1">$${item.price}</h4>
                    </div>
                    <h6 class="text-success">Free shipping</h6>
                    <div class="d-flex flex-column mt-4">
                        <a href="DetailsPage.html" class="btn btn-sm details" type="button">Details</a>
                        <a class="btn btn-sm mt-2 add-cart" type="button">Add to Cart</a>
                    </div>
                </div>
                 `
        products_container.appendChild(div)
    })
    var pag_div = document.createElement("div")
    pag_div.classList = "d-flex justify-content-center justify-content-end"
    pag_div.innerHTML = `
                        <div id="pagination-container" class="mt-5"></div>
                        `
    products_container.appendChild(pag_div)
    // pagination using jquery
    var items = $(".list-item")
    var numItems = items.length
    var perPage = 5
    items.slice(perPage).hide();
    $('#pagination-container').pagination({
        items: numItems,
        itemsOnPage: perPage,
        prevText: "&laquo;",
        nextText: "&raquo;",
        onPageClick: function (pageNumber) {
            var showFrom = perPage * (pageNumber - 1);
            var showTo = showFrom + perPage;
            items.hide().slice(showFrom, showTo).show();
        }
    });
    var details = document.querySelectorAll(".details")
    details.forEach(btn => {
        btn.addEventListener("click", () => {
            var productName = (((btn.parentNode).parentNode).parentNode).querySelector(".title").textContent
            all_data.forEach(data => {
                if (data.title == productName) {
                    data.quantity = 1
                    window.localStorage.setItem("productDetails", JSON.stringify(data))
                }
            })
        })
    })
    var addToCart = document.querySelectorAll(".add-cart")
    addToCart.forEach(btn => {
        btn.addEventListener("click", () => {
            var productName = (((btn.parentNode).parentNode).parentNode).querySelector(".title").textContent
            all_data.forEach(data => {
                if (data.title == productName) {
                    addCart(data)
                }
            })
        })
    })
}


function addCart(cartProduct) {
    var users = JSON.parse(localStorage.getItem("users"));
    var currentUser = JSON.parse(localStorage.getItem("login"));    
    cartProduct.quantity = 1
    if (localStorage.getItem("login") != null) {
        for (var user of users) {
            if (user.email == currentUser.email) {
                var result = user.cart.find((item) => item.id == cartProduct.id);
                if (result == undefined) {
                    user.cart.push(cartProduct);
                    localStorage.setItem("users", JSON.stringify(users));
                    $(addedCart).modal("show");
                } else {
                    $(inCart).modal("show");
                }
            }
        }
    } else {
        $(exampleModal1).modal("show");
    }
}

function handleCategoryOnLoad() {
    if (getCategory) {
        lists.forEach(list => {
            if (list.getAttribute("type") == getCategory) {
                list.classList.add("check")
            }
        })
    }
}

handleCategoryOnLoad()

