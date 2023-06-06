const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", () => {
  filterProducts();
});

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    filterProducts();
  }
});

function filterProducts() {
  const searchQuery = searchInput.value.toLowerCase();
  const products = document.querySelectorAll(".product-container");

  if (searchQuery === "") {
    products.forEach((product) => {
      product.style.display = "block";
    });
  } else {
    products.forEach((product) => {
      const productName = product
        .querySelector(".product-name")
        .textContent.toLowerCase();
      if (productName.includes(searchQuery)) {
        product.style.display = "block";
      } else {
        product.style.display = "none";
      }
    });
  }
}

filterProducts();

// sessionStorage.clear();
// sessionStorage.clear();

const items = document.querySelector("#items");
const shipping = document.querySelector("#shipping");
const totalBeforeTax = document.querySelector("#totalBeforeTax");
const tax = document.querySelector("#tax");
const total = document.querySelector("#total");

let quantity = 0;
let cartCount = 0;
const cartCountDisplay = document.querySelector("#cart-items-count");

let cartCountTemp = sessionStorage.getItem("cartCountTemp") || quantity;
cartCountTemp = Number(cartCountTemp);
cartCount = Number(cartCountTemp);

if (cartCountDisplay !== null) {
  cartCountDisplay.innerHTML = cartCountTemp;
}

const orderSummaryObject = {
  items: 0,
  shipping: 0,
  totalBeforeTax: 0,
  tax: 0,
  total: 0,
};

let shippingLevel1;
let shippingLevel2;
let shippingLevel3;

shippingDate();
function shippingDate() {
  for (let i = 1; i <= 10; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    if (i == 2) {
      shippingLevel1 = `${dayName}, ${day} ${month}.`;
    } else if (i == 4) {
      shippingLevel2 = `${dayName}, ${day} ${month}.`;
    } else if (i == 10) {
      shippingLevel3 = `${dayName}, ${day} ${month}.`;
    }
  }
}

//define shipping levels

const savedCurrentShippingLevel = JSON.parse(
  sessionStorage.getItem("currentShippingLevel")
);

//define shipping selector
let currentShippingLevelSelector = [];

const savedCurrentShippingLevelSelector =
  JSON.parse(sessionStorage.getItem("currentShippingSelector")) || [];

window.onload = function () {
  // cartCountDisplay;

  document.querySelector(
    "#checkoutItems"
  ).textContent = `Checkout (${cartCount} items)`;
  const temp = document.querySelector("#cart-page-content-products");

  for (let i = 0; i < boughtItems.length; i++) {
    //setting default shipping level
    if (currentShippingLevel[i] == null) {
      currentShippingLevel[i] = shippingLevel3;
    }

    if (currentShippingLevelSelector[i] == null) {
      currentShippingLevelSelector[i] = 0;
    }

    const newItem = document.createElement("div");
    newItem.innerHTML = `<div id="cart-page-content-review">
    <div class="cart-page-content-review-header">Delivery date: ${currentShippingLevel[i]}</div>
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
    <div class="cart-page-content-review-delivery">
      <div class="delivery-header">Choose a delivery option:</div>
      <div class="delivery-option-container">
        <input
          type="radio"
          name="cart-delivery-button${i}"
          
          class="cart-delivery-selector"
        />
        <div id="cart-delivery-options">
          <div id="cart-product-delivery-date">${shippingLevel3}</div>
          <div id="cart-product-shipping-date">FREE Shipping</div>
        </div>
      </div>
      <div class="delivery-option-container">
        <input
          type="radio"
          name="cart-delivery-button${i}"
          class="cart-delivery-selector"
        />
        <div id="cart-delivery-options">
          <div id="cart-product-delivery-date">${shippingLevel2}</div>
          <div id="cart-product-shipping-date">$4.99 - Shipping</div>
        </div>
      </div>
      <div class="delivery-option-container">
        <input
          type="radio"
          name="cart-delivery-button${i}"
          class="cart-delivery-selector"
        />
        <div id="cart-delivery-options">
          <div id="cart-product-delivery-date">${shippingLevel1}</div>
          <div id="cart-product-shipping-date">$9.99 - Shipping</div>
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
        currentShippingLevel.splice(currentIndex, 1);
        currentShippingLevelSelector.splice(currentIndex, 1);

        sessionStorage.setItem(
          "currentShippingSelector",
          JSON.stringify(currentShippingLevelSelector)
        );
        sessionStorage.setItem(
          "currentShippingLevel",
          JSON.stringify(currentShippingLevel)
        );
      }
      sessionStorage.setItem("productsStorage", JSON.stringify(boughtItems));

      orderSummary();
      shippingSelect();
      updateCheckout();
    });

    //update checkout when deleting items
    function updateCheckout() {
      let cartCount = 0;
      for (let i = 0; i < boughtItems.length; i++) {
        cartCount += boughtItems[i].quantity;
      }

      document.querySelector(
        "#checkoutItems"
      ).textContent = `Checkout (${cartCount} items)`;
    }

    sessionStorage.setItem("cartCount", cartCount);

    // boughtItems = storedData;
  });

  shippingSelect();
  function shippingSelect() {
    console.log("asdsad");
    //default settings

    const productSelector = document.querySelectorAll(
      ".cart-page-content-review-delivery"
    );

    for (let i = 0; i < productSelector.length; i++) {
      const productDeliverySelector = productSelector[i].querySelectorAll(
        ".delivery-option-container"
      );

      ///////////////////////////////
      /////////////////////////////
      const defaultSelectors = productSelector[i].querySelectorAll(
        ".cart-delivery-selector"
      );
      for (let k = 0; k < defaultSelectors.length; k++) {
        if (currentShippingLevelSelector[i] == k) {
          defaultSelectors[k].setAttribute("checked", "checked");
        }
      }

      //////////////////////////
      ////////////////////////
      for (let j = 0; j < productDeliverySelector.length; j++) {
        const deliveryHeader = document.querySelectorAll(
          ".cart-page-content-review-header"
        );

        const productDeliverySelectorButton = productDeliverySelector[
          j
        ].querySelector(".cart-delivery-selector");
        productDeliverySelector[j].addEventListener("click", changeShipping);

        function changeShipping() {
          productDeliverySelectorButton.checked = true;

          if (j == 0) {
            currentShippingLevel[i] = shippingLevel3;
          } else if (j == 1) {
            currentShippingLevel[i] = shippingLevel2;
          } else if (j == 2) {
            currentShippingLevel[i] = shippingLevel1;
          }
          deliveryHeader[
            i
          ].textContent = `Delivery date: ${currentShippingLevel[i]}`;

          sessionStorage.setItem(
            "currentShippingLevel",
            JSON.stringify(currentShippingLevel)
          );

          currentShippingLevelSelector[i] = j;
          sessionStorage.setItem(
            "currentShippingSelector",
            JSON.stringify(currentShippingLevelSelector)
          );
          orderSummary();
        }
      }
    }
  }

  orderSummary();
  function orderSummary() {
    //items
    if (boughtItems.length !== 0) {
      let shippingTotal = 0;
      orderSummaryObject.items = 0;
      for (let i = 0; i < boughtItems.length; i++) {
        // boughtItems[i].price = boughtItems[i].price.slice(1);
        boughtItems[i].price = Number(boughtItems[i].price).toFixed(2);

        orderSummaryObject.items +=
          boughtItems[i].price * boughtItems[i].quantity;

        items.textContent = `$${orderSummaryObject.items.toFixed(2)}`;

        //shipping
        currentShippingLevelSelector[i] == 1
          ? (shippingTotal += 4.99)
          : (shippingTotal = shippingTotal);
        currentShippingLevelSelector[i] == 2
          ? (shippingTotal += 9.99)
          : (shippingTotal = shippingTotal);
        shipping.textContent = `$${shippingTotal.toFixed(2)}`;
      }

      //total before tax
      orderSummaryObject.totalBeforeTax = (
        orderSummaryObject.items + shippingTotal
      ).toFixed(2);
      totalBeforeTax.textContent = `$${orderSummaryObject.totalBeforeTax}`;

      //tax
      orderSummaryObject.tax = (
        orderSummaryObject.totalBeforeTax * 0.1
      ).toFixed(2);

      tax.textContent = `$${orderSummaryObject.tax}`;

      //total

      orderSummaryObject.total = (
        Number(orderSummaryObject.tax) +
        Number(orderSummaryObject.totalBeforeTax)
      ).toFixed(2);
      total.textContent = `$${orderSummaryObject.total}`;
    } else {
      orderSummaryObject.items = 0;
      orderSummaryObject.totalBeforeTax = 0;
      orderSummaryObject.tax = 0;
      orderSummaryObject.total = 0;
      items.textContent = `$0.00`;
      shipping.textContent = `$0.00`;
      totalBeforeTax.textContent = `$0.00`;
      tax.textContent = `$0.00`;
      total.textContent = `$0.00`;
    }
  }
};

let currentShippingLevel = [];
currentShippingLevel = savedCurrentShippingLevel || [currentShippingLevel];
currentShippingLevelSelector = savedCurrentShippingLevelSelector || [];

let boughtItems = JSON.parse(sessionStorage.getItem("productsStorage")) || [];

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
  //start from zero to make sure deleted items are deleted
  let cartCount = 0;
  for (let i = 0; i < boughtItems.length; i++) {
    cartCount += boughtItems[i].quantity;
  }
  cartCountDisplay.textContent = cartCount;
  for (let i = 0; i < product.addToCart.length; i++) {
    product.addToCart[i].addEventListener("click", addToCart);
    product.addToCart[i].addEventListener("click", addText);
    function addToCart() {
      quantity = Number(product.quantity[i].value);
      cartCount += quantity;

      cartCountDisplay.textContent = cartCount;
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
  });
});
