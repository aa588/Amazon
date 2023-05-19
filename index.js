// const contentEnable = document.querySelector("#content");
const cartCountDisplay = document.querySelector("#cart-items-count");
let cartCount = 0;
let quantity = 0;

const product = {
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
updateCart();
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
