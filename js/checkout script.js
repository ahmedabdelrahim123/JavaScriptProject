////////////////////////////////////////////////////////////////////////////fetching current user Data

var cpns = [{ name: "Hey50", value: 50 }, { name: "Hey70", value: 70 }]
localStorage.setItem("coupons", JSON.stringify(cpns));

var loggedin = JSON.parse(localStorage.getItem("login"));
var users = JSON.parse(localStorage.getItem("users"));

//////////////////////////////////////////////////////////////////////////////
// users.forEach(user => {
//     user.cart = [{ img: "../img/products/headphones.jpg", quantity: 2, name: "headphones", price: 100, color: "black" },
//     { img: "../img/products/necklace.jpg", quantity: 3, name: "necklace", price: 50, color: "gold" }];
// })
// localStorage.setItem("users", JSON.stringify(users));

////////////////////////////////////////////////////////////////////////////

function showItems() {
    var parent = document.getElementById("parent");
    users.forEach(user => {
        if (user.email == loggedin.email) {
            user.cart.forEach(product => {

                var mainDiv = document.createElement("div");
                mainDiv.className = "item-card  ";
                var prodImg = document.createElement("img");
                prodImg.className = "image shadow";
                prodImg.setAttribute("src", product.thumbnail)
                // mainDiv.appendChild(prodImg);

                var mainInfoDiv = document.createElement("div");
                mainInfoDiv.className = "mainInfoDiv";
                var titleHeader = document.createElement("h4");
                var itemName = document.createTextNode(product.title);
                titleHeader.appendChild(itemName);
                var colorHeader = document.createElement("p");
                colorHeader.className = "Item-Color";
                var itemCol = document.createTextNode(`Category: ${product.category}`);
                colorHeader.appendChild(itemCol);
                mainInfoDiv.appendChild(titleHeader);
                mainInfoDiv.appendChild(colorHeader);

                var extraDiv = document.createElement("div");
                extraDiv.className = "extra"
                extraDiv.appendChild(prodImg);
                extraDiv.appendChild(mainInfoDiv)

                mainDiv.appendChild(extraDiv)

                var secInfoDiv = document.createElement("div");
                secInfoDiv.className = "secInfoDiv";
                var priceHeader = document.createElement("h5");
                var itemprice = document.createTextNode(`Price: ${product.price}`);
                priceHeader.appendChild(itemprice);
                var qtyHeader = document.createElement("p");
                var itemqty = document.createTextNode(`Quantity: ${product.quantity}`);
                qtyHeader.appendChild(itemqty);
                secInfoDiv.appendChild(priceHeader);
                secInfoDiv.appendChild(qtyHeader);
                mainDiv.appendChild(secInfoDiv)

                parent.appendChild(mainDiv);

            });
        }

    });
}
showItems();
//showing user delivery data saved in local storage 
function showData() {
    var name = document.getElementById("lsName");
    name.innerText = loggedin.username;
    var add = document.getElementById("lsAddress");
    add.innerText = loggedin.address;
    var city = document.getElementById("lsCity");
    city.innerText = loggedin.city;
    var email = document.getElementById("lsEmail");
    email.innerText = loggedin.email;

}
showData();

function edit() {

    //editting user saved delivery data

    document.getElementById("oldSection").setAttribute("style", "display:none;");
    document.getElementById("newSection").removeAttribute("style");

    var name = document.getElementById("uname");
    var add = document.getElementById("add");
    var city = document.getElementById("city");
    var email = document.getElementById("dEmail");

    name.value = loggedin.username;
    add.value = loggedin.address;
    city.value = loggedin.city;
    email.value = loggedin.email;

    name.setAttribute("disabled", "")
    email.setAttribute("disabled", "")

}

//saving delivery data to customer data in local storage
function save() {
    var add = document.getElementById("add");
    var city = document.getElementById("city");


    if (add.value != "" && city.value != "") {

        // saving info if valid
        loggedin.address = add.value;
        loggedin.city = city.value;


        users.forEach(user => {
            if (user.email == loggedin.email) {
                user.address = add.value;
                user.city = city.value;
            }
        });

        // localStorage.removeItem("users");
        localStorage.setItem("users", JSON.stringify(users));

        // localStorage.removeItem("loggedin");
        localStorage.setItem("login", JSON.stringify(loggedin));

        document.getElementById("newSection").setAttribute("style", "display:none;");
        document.getElementById("oldSection").removeAttribute("style");
        showData();

    }

}

//saving mobile number
var mobile_flag = 0;
function saveMob() {
    const mobReg = /^(012|015|011|010)[0-9]{8}/;

    var mobile = document.getElementById("mob");


    if (mobReg.test(mobile.value) === false) {
        document.getElementById("alertm").innerText = "Please enter a valid mobile number";
        mobile.style.border = "2px solid red";
        mobile_flag++;
    } else {
        mobile.removeAttribute("style");
        document.getElementById("alertm").innerHTML = "";
        mobile.style.border = "1px solid lightgray important!";
        mobile_flag = 0;
    }

    if (mobile.value != "" && mobile_flag == 0) {
        mobile.removeAttribute("style");
        loggedin.mobile = mobile.value;
        mobile.style.border = "1px solid lightgray important!";
        // console.log("phone number saved")
        document.getElementById("savedMob").innerText = mobile.value;
        document.getElementById("mobileField").setAttribute("style", "display:none;");
        document.getElementById("showMob").removeAttribute("style");
    }

    // localStorage.removeItem("login");
    localStorage.setItem("login", JSON.stringify(loggedin));

}

//changing view if mobile number is already saved
function mobileCheck() {
    var mobile = document.getElementById("mob");

    if (loggedin.mobile) {
        document.getElementById("savedMob").innerText = loggedin.mobile;
        document.getElementById("mobileField").setAttribute("style", "display:none;");
        document.getElementById("showMob").removeAttribute("style");
    }
    else{
        mobile_flag++;
    }
}
mobileCheck();

//calculating bill
var discount = 0;
function bill() {
    var sub = document.getElementById("subTot");
    var tax = document.getElementById("tax");
    var tot = document.getElementById("total");

    var subtot = 0;
    var total = 0;
    users.forEach(user => {
        if (user.email === loggedin.email) {
            user.cart.forEach(product => {
                subtot += (product.price * product.quantity);
            });
        }
    });
    sub.innerText = `$ ${subtot}`;
    var taxes =Math.floor(subtot * 0.1) ;
    tax.innerText = `$ ${taxes}`;
    total = subtot + taxes + 10.00 - discount;
    tot.innerText = `$ ${total}`;
}
bill();

//applying discount to bill
var couponVal = document.createElement("td");
function applyCoupon() {
    couponVal.innerHTML = "";
    var found = false;
    var cpn = document.getElementById("coupon");
    var coupons = JSON.parse(localStorage.getItem("coupons"));
    var cpnval = document.getElementById("cpnVal");

    //searching for coupon
    for (let i = 0; i < coupons.length; i++) {
        if (cpn.value == coupons[i].name) {
            found = true;
            cpnval.innerText = "";
            discount = coupons[i].value;
            cpnval.innerText = `- $ ${discount}`;
            break;
        }
        else {
            found = false;
        }
    }
    var alert = document.getElementById("alertC");
    if (found === false) {
        alert.removeAttribute("class");
        alert.setAttribute("class", "alert-box");
        cpn.style.border = "2px solid red";

        if (cpn.value == "") {
            alert.innerHTML = "No coupon entered";
        } else {
            alert.innerHTML = "Sorry, coupon not fond";
        }
        discount = 0;
        cpnval.innerHTML = "$ 0.00";

    } else {
        alert.removeAttribute("class");
        alert.setAttribute("class", "green-flag");
        alert.innerHTML = "Enjoy your discount!"
        cpn.style.border = "none";
    }

    bill();

}

function redirect() {
    location.href = "../src/home.html";
    users.forEach(user => {
        if (user.email == loggedin.email) {
            user.cart = [];
            loggedin.cart = [];
        }
    })
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("login", JSON.stringify(loggedin));

}
//processing order
function submit() {

    var email = document.getElementById("email");
    var cardHolder = document.getElementById("cardHolder");
    var cardNo = document.getElementById("cardNo");
    // var exp = document.getElementById("exp");
    var cvc = document.getElementById("cvc");

    //form validation
    var flag = 0;

    const eReg = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/;
    const nReg = /[A-Za-z]{3,10}(\s)[A-Za-z]{3,10}/;
    const numReg = /[0-9]{16}/;
    // const expReg = /[0-9]{2}(-)[0-9]{2}/;
    const cvcReg = /[0-9]{3}/;

    if (eReg.test(email.value) === false) {
        document.getElementById("alert1").innerHTML = "Please enter a valid email address";
        email.style.border = "2px solid red";
        flag++;
    } else {
        document.getElementById("alert1").innerHTML = "";
        email.style.border = "none";

    }
    if (nReg.test(cardHolder.value) === false) {
        document.getElementById("alert2").innerHTML = " Please enter the card holder name as written on the card";
        cardHolder.style.border = "2px solid red";
        flag++;
    } else {
        document.getElementById("alert2").innerHTML = "";
        cardHolder.style.border = "none";
    }
    if (numReg.test(cardNo.value) === false) {
        document.getElementById("alert3").innerHTML = " Card number should consist of 16 digits";
        cardNo.style.border = "2px solid red";
        flag++;
    } else {
        document.getElementById("alert3").innerHTML = "";
        cardNo.style.border = "none";
    }

    if (cvcReg.test(cvc.value) === false) {
        document.getElementById("alert5").innerHTML = "CVC should be 3 digits only";
        cvc.style.border = "2px solid red";
        flag++;
    } else {
        document.getElementById("alert5").innerHTML = "";
        cvc.style.border = "none";
    }

    var pop = document.getElementById("pop-up");
    var img = document.getElementById("done");

    //confirm purchase
    if (MOP === "cc") {
        if (cardHolder.value != "" && cvc.value != "" && cardSelected && email.value != "" && flag === 0 && mobile_flag == 0) {
            // console.log("good data");
            setTimeout(() => {
                redirect();
            }, 2000);
            // pop.setAttribute("style", "color:black !important;");
            // pop.innerHTML = "Thank you for your payment!";
            // img.setAttribute("src", "../images/paid2.png")
            $(thankYou).modal("show");

        } else {
            // // console.log(cardHolder.value, exp.value, cvc.value, cardSelected, email.value)
            // pop.setAttribute("style", "color:red !important;");
            // pop.innerHTML = "Incomplete Data!";
            // img.setAttribute("src", "../images/no.png")
            // // console.log("missing data");
            $(declined).modal("show");
        }
    }
    else {
        if (mobile_flag == 0) {
            setTimeout(() => {
                redirect();
            }, 2000);
            // console.log(mobile_flag)
            // pop.setAttribute("style", "color:black; !important");
            // pop.innerHTML = "Purchase confirmed!";
            // img.setAttribute("src", "../images/confirm.png");
            $(pay).modal("show");
        }
        else {
            // pop.setAttribute("style", "color:red !important;");
            // pop.innerHTML = "Incomplete Data!";
            // img.setAttribute("src", "../images/no.png")
            $(declined).modal("show");

        }

    }
}

var MOP = "cod";
var cardSelected = false;

//to change style based on which payment method is selected
function check() {
    let cod = document.getElementById("radio1").checked;
    let cc = document.getElementById("radio2").checked;
    let payBTN = document.getElementById("payBTN");

    if (cod) {
        MOP = "cod";
        var cardInfo = document.getElementById("card-info");
        cardInfo.setAttribute("style", "display:none;");
        payBTN.innerHTML = "Confirm";
        // console.log("cod selected")
    }
    else {
        MOP = "cc";
        var cardInfo = document.getElementById("card-info");
        cardInfo.setAttribute("style", "display:block;");
        payBTN.innerHTML = "Pay";
        // console.log("cc selected")

    }
}

//to highlight the card selected
document.addEventListener('click', (e) => {
    let elementClass = e.target.className;
    if (elementClass === "card-type") {
        cardSelected = true;
        // console.log(cardSelected)
        let imgID = e.target.getAttribute('id');
        // var card = document.getElementById(imgID);
        e.target.setAttribute("style", "border:2px solid green;border-radius:25px;");
        var otherCards = document.getElementsByClassName("card-type");
        for (let i = 0; i < otherCards.length; i++) {
            if (otherCards[i].id != imgID) {
                otherCards[i].setAttribute("style", "border:none;");
            }
        }
    }
}
);

