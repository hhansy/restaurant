let card_list = document.querySelector(".menu-cards")
let cart_block = document.querySelector (".cart")

function getCookieValue(cookieName) {
    // Розділяємо всі куки на окремі частини
    const cookies = document.cookie.split(';')
    // Шукаємо куки з вказаним ім'ям
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim() // Видаляємо зайві пробіли
        // Перевіряємо, чи починається поточне кукі з шуканого імені
        if (cookie.startsWith(cookieName + '=')) {
            // Якщо так, повертаємо значення кукі
            return cookie.substring(cookieName.length + 1) // +1 для пропуску символу
            "="
        }
    }
    // Якщо кукі з вказаним іменем не знайдено, повертаємо порожній рядок або можна
    return ''
}






async function getData() {
    const response = await fetch("https://api.zerosheets.com/v1/qbj", {
        method: "GET",
        headers: {
            Authorization: "Bearer TEDEptOEXKS00SwqqD0CPC9kdX1MTQoC"
        }
    });
    const data = await response.json();

    // will return an array of objects with the _lineNumber
    return data;
}

async function getProducts() {
    // Виконуємо запит до файлу "store_db.json" та очікуємо на відповідь
    let response = await fetch("store_db.json")
    // Очікуємо на отримання та розпакування JSON-даних з відповіді
    let products = await response.json()
    // Повертаємо отримані продукти
    return products
};

function getCardHtml(item) {
    return `<div class="card" style="width: 18rem;">
            <img src="img/${item.image}">
            <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
              <p class="card-text">${item.price}грн</p>
              <a href="#" class="btn btn-outline-secondary">Детальніше</a>
            </div>
            <button type="button" class=" btn btn-secondary add-to-cart"
            data-product='${JSON.stringify(item)}' data-bs-toggle="modal" data-bs-target="#exampleModal"> 
            Додати в кошик</button>
          </div>`


}




class ShoppingCart {
    constructor() {
        this.items = {}
        this.loadCartFromCookies()
    }
    addItem(product) {
        if (this.items[product.title]) {
            this.items[product.title].quantity += 1
        } else {
            this.items[product.title] = product
            this.items[product.title].quantity = 1
        }
        this.saveCartToCookies()

    }
    // Зберігання кошика в кукі
    saveCartToCookies() {
        let cartJSON = JSON.stringify(this.items);
        document.cookie = `cart=${cartJSON}; max-age=${60 * 60 * 24 * 7}; path=/`;
    }
    // Завантаження кошика з кукі
    loadCartFromCookies() {
        let cartCookie = getCookieValue('cart');
        if (cartCookie && cartCookie !== '') {
            this.items = JSON.parse(cartCookie);
        }
    }

}


let cart = new ShoppingCart()

function itemHTML(item){
    return `<div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
              <div class="col-4">
                <img src="img/${item.image}" class="img-fluid rounded-start" alt="...">
              </div>
              <div class="col-8">
                <div class="card-body">
                  <h5 class="card-title">${item.title}</h5>
                  <p class="card-text"><small class="text-body-secondary">Кількість: ${item.quantity} шт</small></p>
                  <p class="card-text">${item.price * item.quantity} грн</p>

                </div>
              </div>
            </div>
          </div>`
}


function getToCart(event) {
    let productData = event.target.getAttribute('data-product')
    let product = JSON.parse(productData)
    cart.addItem(product)
    console.log(cart)
    cart_block.innerHTML = ''
        for (let item in cart.items){
        cart_block.innerHTML += itemHTML(cart.items[item])

    }
    let order_block = document.querySelector(".order")
    order_block.style.display = 'block'
}




getProducts().then(function (products) {
    card_list.innerHTML = ''
    products.forEach(function (product) {
        card_list.innerHTML += getCardHtml(product)
    })

    // Отримуємо всі кнопки "Купити" на сторінці
let buyButtons = document.querySelectorAll('.add-to-cart');
// Навішуємо обробник подій на кожну кнопку "Купити"
if (buyButtons) {
    buyButtons.forEach(function (button) {
        button.addEventListener('click', getToCart)
    });
}
})






let cart_list = document.querySelector('.cart-items-list')
if (cart_list){
    cart_list.innerHTML = ''
    for (let title in cart.items){
        cart_list.innerHTML+= getCardHtml(cart.items[title])
    }
}
