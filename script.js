// sessionStorage.clear();

window.addEventListener("resize", function () {
  window.innerWidth <= 400
    ? (document.querySelector("#logo").src = "pic/amazon-mobile-logo-white.png")
    : (document.querySelector("#logo").src = "pic/amazon-logo.png");
});

// Run the code on page refresh
setTimeout(function () {
  window.addEventListener("load", function () {
    window.innerWidth <= 400
      ? (document.querySelector("#logo").src =
          "pic/amazon-mobile-logo-white.png")
      : (document.querySelector("#logo").src = "pic/amazon-logo.png");
  });
}, 0);

window.innerWidth <= 400
  ? (document.querySelector("#logo2").src = "pic/amazon-mobile-logo-black.png")
  : (document.querySelector("#logo2").src = "pic/amazon-logo2.png");
window.addEventListener("resize", function () {
  window.innerWidth <= 400
    ? (document.querySelector("#logo2").src =
        "pic/amazon-mobile-logo-black.png")
    : (document.querySelector("#logo2").src = "pic/amazon-logo2.png");
});

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
  hideEmptycartDiv();
  function hideEmptycartDiv() {
    const emtpyCart = document.querySelector("#emptyCart");
    if (boughtItems.length == []) {
      emtpyCart.style.display = "block";
    } else {
      emtpyCart.style.display = "none";
    }
  }

  for (let i = 0; i < boughtItems.length; i++) {
    //setting default shipping level

    if (
      currentShippingLevel[i] !== shippingLevel1 &&
      currentShippingLevel[i] !== shippingLevel2 &&
      currentShippingLevel[i] !== shippingLevel3
    ) {
      currentShippingLevel[i] = shippingLevel3;
    }

    if (currentShippingLevelSelector[i] == null) {
      currentShippingLevelSelector[i] = 0;
    }

    const temp = document.querySelector("#cart-page-content-products");

    const newItem = document.createElement("div");
    newItem.innerHTML = `<div id="cart-page-content-review">
    <div class="cart-page-content-review-header">Delivery date: ${currentShippingLevel[i]}</div>
    <div id="cart-page-content-review-details">
      <div class="cart-product-picture-container">
      <img class="cart-product-picture" src="${boughtItems[i].picture}">
      </div>
      <div id="cart-product-details">

      <div id="cart-product-details-first-section${i}" class="cart-product-details-first-section">  
          <div class = "proName">${boughtItems[i].name}</div>
         <div class="price">Price: $${boughtItems[i].price}</div>
      </div>

        <div id="cart-product-quantity-container">
          <div id="cart-product-quantity">Quantity:      <input type="number" class="cart-product-quantity-input-hide cart-product-quantity-input" value="${boughtItems[i].quantity}">  <span class = "cart-product-product-quantity-number">${boughtItems[i].quantity}</span> </div>
  
          <button id="${i}" class="cart-update-quantity">Update</button>
          <button id="delete${i}" class="cart-delete-quantity" >Delete</button>
        </div>
      </div>
    </div>
    <div class="cart-page-content-review-delivery">
    <div class="cart-delivery-container">  
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
    </div>
  </div>`;
    temp.appendChild(newItem);
    appendVariation();

    function appendVariation() {
      const variationDiv = document.querySelectorAll(
        ".cart-product-details-first-section"
      );

      if (boughtItems[i].variationA) {
        const currentVariationDiv = variationDiv.item(i);
        const variationADiv = document.createElement("div");
        variationADiv.classList.add("varA");
        variationADiv.textContent = `Color: ${boughtItems[i].variationA}`;
        currentVariationDiv.appendChild(variationADiv);
      }
      if (boughtItems[i].variationB) {
        const currentVariationDiv = variationDiv.item(i);
        const variationBDiv = document.createElement("div");
        variationBDiv.classList.add("varB");
        variationBDiv.textContent = `Size: ${boughtItems[i].variationB}`;
        currentVariationDiv.appendChild(variationBDiv);
      }
    }
  }

  inputChange();
  function inputChange() {
    let inputChangers = document.querySelectorAll(
      ".cart-product-quantity-input"
    );
    let inputUpdaters = document.querySelectorAll(".cart-update-quantity");
    let inputNumbers = document.querySelectorAll(
      ".cart-product-product-quantity-number"
    );

    for (let i = 0; i < inputUpdaters.length; i++) {
      inputUpdaters[i].setAttribute("data-id", i);
      inputChangers[i].setAttribute("data-id", i);
      inputNumbers[i].setAttribute("data-id", i);
      let j = inputUpdaters[i].getAttribute("data-id");

      inputUpdaters[j].onclick = function () {
        this.textContent = this.textContent === "Update" ? "Save" : "Update";
        this.textContent === "Save"
          ? inputNumbers[j].classList.add(
              "cart-product-product-quantity-number-hide"
            )
          : inputNumbers[j].classList.remove(
              "cart-product-product-quantity-number-hide"
            );
        inputChangers[j].classList.toggle(
          "cart-product-quantity-input-hide",
          inputChangers[j].classList.contains(
            "cart-product-quantity-input-show"
          )
        );
        inputChangers[j].classList.toggle(
          "cart-product-quantity-input-show",
          !inputChangers[j].classList.contains(
            "cart-product-quantity-input-show"
          )
        );

        inputUpdaters[j].addEventListener("click", updateQuantity);
        function updateQuantity() {
          inputChangers[j].value <= 0
            ? (alert("Please Enter a Valid Number"),
              (inputChangers[j].value = boughtItems[j].quantity))
            : (inputNumbers[j].textContent = inputChangers[j].value);
          boughtItems[j].quantity = Number(inputNumbers[j].textContent);
          orderSummary();
          updateCheckout();
          sessionStorage.setItem(
            "productsStorage",
            JSON.stringify(boughtItems)
          );
        }
      };
    }
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
      hideEmptycartDiv();
      inputChange();
    });

    //update checkout when deleting items

    // boughtItems = storedData;
  });

  updateCheckout();
  function updateCheckout() {
    cartCount = 0;
    for (let i = 0; i < boughtItems.length; i++) {
      cartCount += Number(boughtItems[i].quantity);
    }
    document.querySelector(
      "#itemsCountText"
    ).textContent = `Items (${cartCount}):`;
    document.querySelector(
      "#checkoutItems"
    ).textContent = `Checkout (${cartCount} items)`;
    sessionStorage.setItem("checkoutCountDisplay", cartCount);
    sessionStorage.setItem("cartCount", cartCount);
  }

  shippingSelect();
  function shippingSelect() {
    const productSelector = document.querySelectorAll(
      ".cart-page-content-review-delivery"
    );

    for (let i = 0; i < productSelector.length; i++) {
      const productDeliverySelector = productSelector[i].querySelectorAll(
        ".delivery-option-container"
      );

      const defaultSelectors = productSelector[i].querySelectorAll(
        ".cart-delivery-selector"
      );
      for (let k = 0; k < defaultSelectors.length; k++) {
        if (currentShippingLevelSelector[i] == k) {
          defaultSelectors[k].setAttribute("checked", "checked");
        }
      }

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

    document.querySelector(
      "#checkoutItems"
    ).textContent = `Checkout (${cartCount} items)`;
  }

  orderSummary();
  function orderSummary() {
    //items
    if (boughtItems.length !== 0) {
      let shippingTotal = 0;
      orderSummaryObject.items = 0;
      for (let i = 0; i < boughtItems.length; i++) {
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
  variationFirst: document.querySelectorAll(".product-variationA-container"),
  variationSecond: document.querySelectorAll(".product-variationB-container"),
};

selectVariation();
function selectVariation() {
  let array = [];

  product.container.forEach((item, index) => {
    const itemSelector = item.querySelector(".product-picture");
    const itemSelectorPicture = itemSelector.setAttribute("data-id", index + 1);
    console.log(itemSelector);
  });

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

        const relatedPicture =
          array[i][j].parentElement.parentElement.querySelector(
            ".product-picture"
          );

        // product.picture[i].setAttribute("data-id", array[i][j].textContent);
        let relatedPictureId = relatedPicture.getAttribute("data-id");

        let pictureSRC = `pic/product${relatedPictureId}-var${j + 1}.jpg`;
        relatedPicture.src = pictureSRC;

        // product.picture[i].src = pictureSRC;
      }
    }
  }
}

selectVariationB();
function selectVariationB() {
  let array = [];
  product.variationSecond.forEach((variation, index) => {
    const buttons = product.variationSecond[index].querySelectorAll("button");
    array.push(buttons);
  });
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      array[i][0].classList.add("product-variationB-selected");
      array[i][j].addEventListener("click", select);

      function select() {
        for (let k = 0; k < array[i].length; k++) {
          array[i][k].classList.remove("product-variationB-selected");
        }
        array[i][j].classList.add("product-variationB-selected");
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

// sessionStorage.clear();
// sessionStorage.clear();

product.addToCart.forEach((button) => {
  button.addEventListener("click", () => {
    const parent = button.parentElement.parentElement;
    const productName = parent.querySelector(".product-name").textContent;
    const productPrice = parent.querySelector(".product-price").textContent;
    const productPicture = parent.querySelector(".product-picture").src;
    const productVariationA = parent.querySelector(
      ".product-variation-selected"
    );
    const productVariationB = parent.querySelector(
      ".product-variationB-selected"
    );
    let productQuantity = parent.querySelector(
      '[name="product-quantity"]'
    ).value;
    productQuantity = parseInt(productQuantity);

    let existingItem;

    if (productVariationA == null && productVariationB == null) {
      existingItem = boughtItems.find((item) => item.name === productName);
    } else if (productVariationA !== null && productVariationB == null) {
      existingItem = boughtItems.find(
        (item) =>
          item.name === productName &&
          item.variationA === productVariationA.textContent
      );
    } else if (productVariationA == null && productVariationB !== null) {
      existingItem = boughtItems.find(
        (item) =>
          item.name === productName &&
          item.variationB === productVariationB.textContent
      );
    } else if (productVariationA !== null && productVariationB !== null) {
      existingItem = boughtItems.find(
        (item) =>
          item.name === productName &&
          item.variationA === productVariationA.textContent &&
          item.variationB === productVariationB.textContent
      );
    }

    if (existingItem) {
      existingItem.quantity += parseInt(productQuantity);
    } else if (productVariationA !== null && productVariationB !== null) {
      boughtItems.push({
        name: productName,
        quantity: productQuantity,
        price: productPrice,
        picture: productPicture,
        variationA: productVariationA.textContent,
        variationB: productVariationB.textContent,
      });
    } else if (productVariationA !== null && productVariationB == null) {
      boughtItems.push({
        name: productName,
        quantity: productQuantity,
        price: productPrice,
        picture: productPicture,
        variationA: productVariationA.textContent,
      });
    } else if (productVariationA == null && productVariationB !== null) {
      boughtItems.push({
        name: productName,
        quantity: productQuantity,
        price: productPrice,
        picture: productPicture,
        variationB: productVariationB.textContent,
      });
    } else if (productVariationA == null && productVariationB == null) {
      boughtItems.push({
        name: productName,
        quantity: productQuantity,
        price: productPrice,
        picture: productPicture,
      });
    }

    sessionStorage.setItem("productsStorage", JSON.stringify(boughtItems));
  });
});

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
