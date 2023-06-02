const items = document.querySelector("#items");
const shipping = document.querySelector("#shipping");
const totalBeforeTax = document.querySelector("#totalBeforeTax");
const tax = document.querySelector("#tax");
const total = document.querySelector("#total");
// sessionStorage.clear();
const orderSummaryObject = {
  items: 0,
  shipping: 0,
  totalBeforeTax: 0,
  tax: 0,
  total: 0,
};

let boughtItems = JSON.parse(sessionStorage.getItem("productsStorage")) || [];
// let storedData = JSON.parse(sessionStorage.getItem("productsStorage"));
const cartCountDisplay = document.querySelector("#cart-items-count");

window.onload = function () {
  // cartCountDisplay;
  document.querySelector(
    "#checkoutItems"
  ).textContent = `Checkout (${cartCount} items)`;
  const temp = document.querySelector("#cart-page-content-products");

  for (let i = 0; i < boughtItems.length; i++) {
    const newItem = document.createElement("div");
    newItem.innerHTML = `<div id="cart-page-content-review">
    <div id="cart-page-content-review-header">Delivery date:</div>
    <div id="cart-page-content-review-details">
      <div id="cart-product-picture">x</div>
      <div id="cart-product-details">
        <div class = "proName">${boughtItems[i].name}</div>
        <div class="price">${boughtItems[i].price}</div>
        <div id="cart-product-quantity-container">
          <div id="cart-product-quantity">Quantity: ${boughtItems[i].quantity}</div>
          <label id="cart-update-quantity">Update</label>
          <button id="delete${i}" class="cart-delete-quantity" >Delete</button>
        </div>
      </div>
    </div>
    <div id="cart-page-content-review-delivery">
      <div id="delivery-header">Choose a delivery option:</div>
      <div id="delivery-option1-container">
        <input
          type="radio"
          name="cart-delivery-button"
          id="cart-delivery-selector"
        />
        <div id="cart-delivery-options">
          <div id="cart-product-delivery-date">Date1</div>
          <div id="cart-product-shipping-date">Shipping Details</div>
        </div>
      </div>
      <div id="delivery-option2-container">
        <input
          type="radio"
          name="cart-delivery-button"
          id="cart-delivery-selector"
        />
        <div id="cart-delivery-options">
          <div id="cart-product-delivery-date">Date1</div>
          <div id="cart-product-shipping-date">Shipping Details</div>
        </div>
      </div>
      <div id="delivery-option3-container">
        <input
          type="radio"
          name="cart-delivery-button"
          id="cart-delivery-selector"
        />
        <div id="cart-delivery-options">
          <div id="cart-product-delivery-date">Date1</div>
          <div id="cart-product-shipping-date">Shipping Details</div>
        </div>
      </div>
    </div>
  </div>`;
    temp.appendChild(newItem);
  }

  const deleteButtons = document.querySelectorAll(".cart-delete-quantity");
  deleteButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const parentDiv =
        button.parentElement.parentElement.parentElement.parentElement;
      parentDiv.remove();

      let proName =
        button.parentElement.parentElement.parentElement.querySelector(
          ".proName"
        ).textContent;

      let currentIndex = boughtItems.findIndex((item) => item.name === proName);
      if (currentIndex !== -1) {
        boughtItems.splice(currentIndex, 1); // remove the item at the index
      }
      sessionStorage.setItem("productsStorage", JSON.stringify(boughtItems));
      orderSummary();
    });

    // boughtItems = storedData;
  });
  orderSummary();
};

function orderSummary() {
  if (boughtItems.length !== 0) {
    orderSummaryObject.items = 0;
    for (let i = 0; i < boughtItems.length; i++) {
      // boughtItems[i].price = boughtItems[i].price.slice(1);
      boughtItems[i].price = Number(boughtItems[i].price);

      orderSummaryObject.items +=
        boughtItems[i].price * boughtItems[i].quantity;
      items.textContent = `$${orderSummaryObject.items}`;

      // console.log(orderSummaryObject.items);
    }
  } else {
    orderSummaryObject.items = 0;
    items.textContent = items.textContent = `$0.00`;
  }
}

let quantity = 0;
let cartCount = 0;
let cartCountTemp = sessionStorage.getItem("cartCountTemp", cartCount);
cartCountTemp = Number(cartCountTemp);
cartCount = Number(cartCountTemp);

// cartCountDisplay.textContent = cartCountTemp;

const product = {
  container: document.querySelectorAll(".product-container"),
  name: document.querySelectorAll(".product-name"),
  picture: document.querySelectorAll(".product-picture"),
  price: document.querySelectorAll(".product-price"),
  addToCart: document.querySelectorAll(".addToCartButton"),
  addedText: document.querySelectorAll(".product-added-container"),
  quantity: document.querySelectorAll("#product-quantity-choices"),
  variationFirst: document.querySelectorAll(".product-variation-container"),
  variationSecond: document.querySelectorAll(".product-variation-container"),
};

selectVariation();
function selectVariation() {
  let array = [];
  product.variationFirst.forEach((variation, index) => {
    const buttons = product.variationFirst[index].querySelectorAll("button");
    array.push(buttons);
  });
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      array[i][0].classList.add("product-variation-selected");
      array[i][j].addEventListener("click", select);

      function select() {
        for (let k = 0; k < array[i].length; k++) {
          array[i][k].classList.remove("product-variation-selected");
        }
        array[i][j].classList.add("product-variation-selected");
        product.picture[i].setAttribute("data-id", array[i][j].textContent);
        let pictureSRC = `pic/product${i + 1}-var${j + 1}.jpg`;
        product.picture[i].src = pictureSRC;
      }
    }
  }
}

updateCart();
function updateCart() {
  for (let i = 0; i < product.addToCart.length; i++) {
    product.addToCart[i].addEventListener("click", addToCart);
    product.addToCart[i].addEventListener("click", addText);
    function addToCart() {
      quantity = Number(product.quantity[i].value);
      cartCount += quantity;

      cartCountDisplay.innerHTML = cartCount;
      sessionStorage.setItem("cartCountTemp", cartCount);
    }
    function addText() {
      product.addedText[i].classList.add("product-added-container-added");
      setTimeout(removeText, 2000);
      function removeText() {
        product.addedText[i].classList.remove("product-added-container-added");
      }
    }
  }
}

product.addToCart.forEach((button) => {
  button.addEventListener("click", () => {
    const parent = button.parentElement.parentElement;
    const productName = parent.querySelector(".product-name").textContent;
    const productPrice = parent.querySelector(".product-price").textContent;

    let productQuantity = parent.querySelector(
      '[name="product-quantity"]'
    ).value;

    productQuantity = parseInt(productQuantity);
    const existingItem = boughtItems.find((item) => item.name === productName);
    if (existingItem) {
      existingItem.quantity += parseInt(productQuantity);
    } else {
      boughtItems.push({
        name: productName,
        quantity: productQuantity,
        price: productPrice,
      });
    }
    sessionStorage.setItem("productsStorage", JSON.stringify(boughtItems));

    // createElements();
  });
});

// function createElements() {
//   for (let i = 0; i < boughtItems.length; i++) {
//     const nameDiv = document.createElement("div");
//     const quantityDiv = document.createElement("div");
//     nameDiv.textContent = boughtItems[i].name;
//     quantityDiv.textContent = boughtItems[i].quantity;
//   }
// }
