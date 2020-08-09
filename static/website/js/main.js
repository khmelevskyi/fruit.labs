if (document.readyState == 'loading') { // save our ass if html is still not loaded, but js is done
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

/*!
    * Start Bootstrap - Agency v6.0.2 (https://startbootstrap.com/template-overviews/agency)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
    */
   (function ($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (
            location.pathname.replace(/^\//, "") ==
                this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length
                ? target
                : $("[name=" + this.hash.slice(1) + "]");
            if (target.length) {
                $("html, body").animate(
                    {
                        scrollTop: target.offset().top - 72,
                    },
                    1000,
                    "easeInOutExpo"
                );
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $(".js-scroll-trigger").click(function () {
        $(".navbar-collapse").collapse("hide");
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $("body").scrollspy({
        target: "#mainNav",
        offset: 74,
    });

    // Collapse Navbar
    var navbarCollapse = function () {
        if ($("#mainNav").offset().top > 100) {
            $("#mainNav").addClass("navbar-shrink");
        } else {
            $("#mainNav").removeClass("navbar-shrink");
        }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);
})(jQuery); // End of use strict


// fffffffffffffffffffff



function ready() { // main function
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) { // links the event listeners and related 
        var button = removeCartItemButtons[i] // function to all remove-cart-item buttons
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}


function removeCartItem(event) {
    var buttonClicked = event.target
    // console.log(buttonClicked)
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0 || input.value >= 30) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div') // creates div element
    cartRow.classList.add('cart-row') // adds 'cart-row' class
    var cartItems = document.getElementsByClassName('cart-items')[0] // gets the 'cart-items' div
    var cartItemsNames = cartItems.getElementsByClassName('cart-item-title')  // gets the name of all items in the cart
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title & cartItemsNames[i].innerText != 'HANDMADE') {
            alert('This item is already added to the cart')
            return 
        }
    }
    var cartRowContents = `
            <div class="cart-item cart-column">
                <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
                <span class="cart-item-title">${title}</span>
            </div>
            <span class="cart-price cart-column">${price}</span>
            <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" type="number" value="1">
                <button class="btn btn-danger" type="button">Х</button>
            </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem) // adds EL to newly added items
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function purchaseClicked(event) {
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var names = cartItems.getElementsByClassName('cart-item-title')
    var quantities = cartItems.getElementsByClassName('cart-quantity-input')
    var total = document.getElementsByClassName('cart-total-price')[0].innerText
    var prices = cartItems.getElementsByClassName('cart-price')
    var hooman_name = document.getElementById('InputName').value
    var hooman_contact = document.getElementById('InputNumber').value
    if (total == '0 грн') {
        alert('Sorry, but you have nothing in the cart')
        return
    }
    var name = document.getElementById('id_name') // gets the form's name input field
    var quantity = document.getElementById('id_quantity')
    var text_field = document.getElementById('id_text')
    var total_field = document.getElementById('id_total')
    var price_field = document.getElementById('id_price')

    var names_array = [] // the array to store all the names in the cart
    var quantities_array = []
    var prices_array = []

    for (var i = 0; i < names.length; i++) { // storing all the names and quantities in the arrays respectively
        names_array.push(names[i].innerText)
        quantities_array.push(quantities[i].value)
        prices_array.push(prices[i].innerText)
    }

    name.value = `${names_array}` // push the array to form's input field
    quantity.value = `${quantities_array}`
    text_field.value = `Имя: ${hooman_name}    Контакты: ${hooman_contact}\n`
    total_field.value = `${total.replace(' грн', '')}`
    price_field.value = `${prices_array}`

    while (cartItems.hasChildNodes()) { // deletes all the items in the cart
        cartItems.removeChild(cartItems.firstChild)
    }
    alert('Thank u for ur purchase')
    updateCartTotal()
}

function updateCartTotal() { // updates the total sum of the order
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('грн', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)

    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = total + " грн"

    if (total == 0) {
        var message = document.getElementsByClassName('message-empty-cart')[0]
        message.classList.remove('d-none')
    }
    else {
        var message = document.getElementsByClassName('message-empty-cart')[0]
        message.classList.add('d-none')
    }

}


// function httprequest(content) {
    // const Http = new XMLHttpRequest();
    // const Http2 = new XMLHttpRequest();
    // const url=`https://api.telegram.org/bot(token)/sendMessage?chat_id=(chat_id)&text="${content}"`;
    // const url2=`https://api.telegram.org/bot(token)/sendMessage?chat_id=(chat_id)&text="${content}"`;
    // const url=`https://api.telegram.org/bot(token)/getUpdates`;
    // Http.open("GET", url);
    // Http.send();

    // Http.onreadystatechange = (e) => {
    //    console.log(Http.responseText)
    // }

    // Http2.open("GET", url2);
    // Http2.send();

    // Http2.onreadystatechange = (e) => {
    // console.log(Http2.responseText)
    // }
// }

