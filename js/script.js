let card_list = document.querySelector(".my-card")


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
            <img src="img/${my-card.image}">
            <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
          </div>`

}


   getProducts().then(function(products){
    products.forEach(function(products){
        card_list.innerHTML += getCardHtml(product)
   })
})