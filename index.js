// const contentEnable = document.querySelector("#content");
const cartCountDisplay = document.querySelector("#cart-items-count");
let cartCount = 0;
let quantity = 0;

const product = {
  name: document.querySelectorAll(".product-name"),
  //   pic: document.querySelectorAll(".product-picture"),
  price: document.querySelectorAll(".product-price"),
  addToCart: document.querySelectorAll(".addToCartButton"),
  addedText: document.querySelectorAll(".product-added-container"),
  quantity: document.querySelectorAll("#product-quantity-choices"),
  variation: document.querySelectorAll(".product-variation-container"),
};

selectVariation();
updateCart();
function selectVariation() {
  //Select first variation as default
  let variations = [];
  for (let i = 0; i < product.variation.length; i++) {
    variations.push(product.variation[i]);
  }
  variations.forEach((element) => {
    const buttons = element.querySelectorAll("button");
    buttons[0].classList.add("product-variation-selected");
  });
}

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
