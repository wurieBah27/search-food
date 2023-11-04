let showcart = document.querySelector(".basket");
const closeShoopingCart = document.querySelector(".closeShoopingCart");
const cartSection = document.querySelector(".cart_section");
const cards = document.querySelector(".cards");
const quantity = document.querySelector(".quantity");
const cartSummary = document.querySelector(".cart_lists");
let mycart1 = document.querySelector(".cart_section-container");

const salestotal = document.querySelector(".price_total");

showcart.addEventListener("click", function () {
  cartSection.style.display = "block";
});

closeShoopingCart.addEventListener("click", () => {
  cartSection.style.display = "none";
});

let products = [
  {
    id: 1,
    img: "images/img_13.jpg",
    price: 25,
    pro_name: "Spanish Latte",
  },
  {
    id: 2,
    img: "images/img_14.jpg",
    price: 20,
    pro_name: "Almond Latte",
  },
  {
    id: 3,
    img: "images/img_1.jpeg",
    price: 15,
    pro_name: "americano Latte",
  },
  {
    id: 4,
    img: "images/img_7.jpg",
    price: 30,
    pro_name: "Acai Bowl",
  },
  {
    id: 5,
    img: "images/cafe_bg.jpg",
    price: 30,
    pro_name: "Acai Bowl",
  },
  {
    id: 6,
    img: "images/img_15.jpg",
    price: 30,
    pro_name: "Oreo Shake",
  },
  {
    id: 7,
    img: "images/img_12.jpg",
    price: 30,
    pro_name: "Oreo Shake",
  },
  {
    id: 8,
    img: "images/cake_1.jpg",
    price: 30,
    pro_name: "Oreo Shake",
  },
];
const find = (basket, ids) => basket.find((x) => x.id === ids);

let myCart = JSON.parse(localStorage.getItem("bah")) || [];

function displayProducts() {
  products.forEach((x, y) => {
    let myDiv = document.createElement("div");
    myDiv.classList.add("list-cards");
    myDiv.innerHTML = `
    <img src="../${x.img}" alt="" />
    <div class="contain">
      <h2 class="price">Aed ${x.price}</h2>
      <p class="title">${x.pro_name}</p>
      <div class="btn__section">
        <button class="add_toCart" onclick="addtoCart(${x.id})">ADD TO CART</button>
        <i class="bi bi-cart-dash"></i>
      </div>
    </div>
    `;
    cards.appendChild(myDiv);
  });
}

displayProducts();

function addtoCart(id) {
  if (myCart.some((item) => item.id === id)) return;
  else {
    let search = find(products, id);
    myCart.push({
      ...search,
      quantity: 1,
    });
  }

  updateMycart();

  calculatio();
  singleItemsPrice();
}

function updateMycart() {
  renderCartitems();
}

let xy;
function renderCartitems() {
  mycart1.innerHTML = "";
  myCart.forEach((x) => {
    /* let search = find() */
    mycart1.innerHTML += `
            <div class="cart_lists">
            <div class="img-container">
              <img src="../${x.img}" alt="" />
              <p class="product_name">${x.pro_name} </p>
            </div>

            <h2 class="${x.id} products_price">price: ${x.price}</h2>
            <div class="total-products"> Total: ${x.quantity * x.price}</div>
            <div class="btn--container">
              <button class="decrement" onclick ="decrement(${
                x.id
              })" >-</button>
              <span class="products_quantity" id = ${x.id}>${x.quantity}</span>
              <button class="increment" onclick ="increment(${x.id})">+</button>
            </div>
            <div class="deleteBtn" onclick ="deleteItem(${
              x.id
            })"><i class="bi bi-trash3"></i></div>
          </div>
          
    `;
    xy = document.querySelectorAll(".total-products");
  });
}

//// DECREMENT --

function xxy() {
  myCart = myCart.filter((x) => x.quantity !== 0);
  renderCartitems();
}
xxy();
function decrement(id) {
  let search = find(myCart, id);
  if (search.quantity === 0) return;
  search.quantity--;

  update(search.id);
  singleItemsPrice();
  totallin(search.id);
  xxy();
  renderCartitems();
}

/// INCREMENT ++
function increment(id) {
  let search = find(myCart, id);

  if (search) {
    search.quantity++;
  } else {
    return;
  }
  update(search.id);
}
function update(id) {
  let search = find(myCart, id);
  document.getElementById(id).innerHTML = search.quantity;

  calculatio();
  renderCartitems();
}

function calculatio() {
  quantity.innerHTML = myCart.map((x) => x.quantity).reduce((x, y) => x + y, 0);
  singleItemsPrice();
}

/// REMOVING ITEMS FROM THE CART

function singleItemsPrice() {
  let total = 0;

  let calculate = myCart
    .map((x) => x.price * x.quantity)
    .reduce((x, y) => x + y, 0);

  salestotal.innerHTML = `Total: Aed ${calculate}`;
  localStorage.setItem("bah", JSON.stringify(myCart));
}
singleItemsPrice();
calculatio();
renderCartitems();
function totallin() {}

function deleteItem(id) {
  /* let search = find(myCart, id); */

  myCart = myCart.filter((x) => x.id !== id);

  console.log(id);
  renderCartitems();
  localStorage.setItem("bah", JSON.stringify(myCart));
}
