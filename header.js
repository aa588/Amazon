setTimeout(function logo() {
  window.innerWidth <= 400
    ? (document.querySelector("#logo").src = "pic/amazon-mobile-logo-white.png")
    : (document.querySelector("#logo").src = "pic/amazon-logo.png");
}, 0);

window.addEventListener("resize", function () {
  window.innerWidth <= 400
    ? (document.querySelector("#logo").src = "pic/amazon-mobile-logo-white.png")
    : (document.querySelector("#logo").src = "pic/amazon-logo.png");
});

// // Run the code on page refresh
// setTimeout(function () {
//   window.addEventListener("load", function () {});
// }, 0);

// window.innerWidth <= 400
//   ? (document.querySelector("#logo2").src = "pic/amazon-mobile-logo-black.png")
//   : (document.querySelector("#logo2").src = "pic/amazon-logo2.png");
// window.addEventListener("resize", function () {
//   window.innerWidth <= 400
//     ? (document.querySelector("#logo2").src =
//         "pic/amazon-mobile-logo-black.png")
//     : (document.querySelector("#logo2").src = "pic/amazon-logo2.png");
// });
