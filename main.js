import "./style.css";

const form = document.querySelector("#form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const invoiceSum = document.querySelector("#invoiceSum").value;
  const deliveryFee = document.querySelector("#deliveryFee").value;
  const invoicePriceWithoutDeliveryFee =
    Number(invoiceSum) - Number(deliveryFee);
  const quantityOfProductsInRow = document.querySelector(
    "#quantityOfProductsInRow"
  ).value;
  const priceOfUnit = document.querySelector("#priceOfUnit").value;

  const quantityPrice = quantityOfProductsInRow * priceOfUnit;
  const percentageOfShare = quantityPrice / invoicePriceWithoutDeliveryFee;
  const additionalMoneyToQuantityPrice = deliveryFee * percentageOfShare;
  const additionMoneyToUnit =
    additionalMoneyToQuantityPrice / quantityOfProductsInRow;

  const newUnitPrice = Number(priceOfUnit) + Number(additionMoneyToUnit);

  const result = document.querySelector("#result");
  result.innerHTML = `Click on the result to copy it: <span id="price" class="price">${newUnitPrice.toFixed(
    4
  )}</span><span class="copied">Copied!</span>`;

  const price = document.querySelector("#price");
  price.onclick = function () {
    document.execCommand("copy");
    document.querySelector(".copied").style.display = "block";
  };
  price.addEventListener("copy", function (event) {
    event.preventDefault();
    if (event.clipboardData) {
      event.clipboardData.setData("text/plain", price.textContent);
    }
  });

  document.querySelector("#priceOfUnit").value = "";
  document.querySelector("#quantityOfProductsInRow").value = "";
});
