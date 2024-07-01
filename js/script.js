let card_list = document.querySelector(".menu-cards")

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

function getCardHtml(item){
    return`<div class="card" style="width: 18rem;">
            <img src="img/${item.image}">
            <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
              <p class="card-text">${item.price}грн</p>
              <a href="#" class="btn btn-outline-secondary">Детальніше</a>
            </div>
          </div>`

}


   getProducts().then(function(products){
    card_list.innerHTML = ''
    products.forEach(function(product){
        card_list.innerHTML += getCardHtml(product)
   })
})