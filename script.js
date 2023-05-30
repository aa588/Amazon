//update list on github

let boughtItems = [];
const storedData = JSON.parse(sessionStorage.getItem("productsStorage"));
const cartCountDisplay = document.querySelector("#cart-items-count");
window.onload = function () {
  const temp = document.querySelector("#cart-page-content-products");

  for (let i = 0; i < storedData.length; i++) {
    const newItem = document.createElement("div");
    newItem.innerHTML = `<div id="cart-page-content-review">
    <div id="cart-page-content-review-header">Delivery date:</div>
    <div id="cart-page-content-review-details">
      <div id="cart-product-picture">x</div>
      <div id="cart-product-details">
        <div>${storedData[i].name}</div>
        <div>Price</div>
        <div id="cart-product-quantity-container">
          <div id="cart-product-quantity">Quantity: ${storedData[i].quantity}</div>
          <label id="cart-update-quantity">Update</label>
          <label id="cart-delete-quantity">Delete</label>
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
  boughtItems = storedData;
//   sessionStorage.clear();

};

let cartCount = 0;
let quantity = 0;

// boughtItems = storedData;


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
    let productQuantity = parent.querySelector(
      '[name="product-quantity"]'
    ).value;

    productQuantity = parseInt(productQuantity);
    const existingItem = boughtItems.find((item) => item.name === productName);
    if (existingItem) {
      existingItem.quantity += parseInt(productQuantity);
    } else {
      boughtItems.push({ name: productName, quantity: productQuantity });
    }
    createElements();
  });
});

function createElements() {
  for (let i = 0; i < boughtItems.length; i++) {
    const nameDiv = document.createElement("div");
    const quantityDiv = document.createElement("div");
    nameDiv.textContent = boughtItems[i].name;
    quantityDiv.textContent = boughtItems[i].quantity;
    sessionStorage.setItem("productsStorage", JSON.stringify(boughtItems));
  }
}
