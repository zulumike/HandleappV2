// *************
//  VARIABLER
// *************

// Variabler for HTML-elementene
const shopItemName = document.querySelector("#shopitem-name");
const shopItemAmount = document.querySelector("#shopitem-amount");
const shopItemGroup = document.querySelector('#shopitem-group');
const shopListTable = document.querySelector('#main-shoplisttable');
let shopItemArr = [];

// Test av database connection
// ********************

// api.dbconnect();


// ************************
// LEGG TIL VARE FUNKSJONER
// Når pluss-knapp trykkes startes denne funksjonen (trigget via html onclick).
// Funksjonen legger til vare som objekt vha funksjonen shopitem
// !! Funksjone må også sørge for oppdatering av database/localstorage.
// ************************

// Eventhandler som trigger på enter i input-feltene

shopItemName.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    addToList();
  }
})

shopItemAmount.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    addToList();
  }
})


// Objekt konstruktør som oppretter et objekt av varenavn, antall og gruppe
function ShopItem(grName, grAmount, grGroup) {
  this.name = grName;
  this.amount = grAmount;
  this.group = grGroup;
  this.updateShopList = function() {
    const tr = document.createElement("tr");
    const tdAddBtn = document.createElement("object");
    tdAddBtn.setAttribute("data", "img/cart-check.svg")
    tdAddBtn.setAttribute("type", "image/svg+xml");
    tdAddBtn.setAttribute("width", "20px");
    tdAddBtn.setAttribute("height", "20px");
    const tdAmount = document.createElement("td");
    tdAmount.innerHTML = this.amount;
    const tdName = document.createElement("td");
    tdName.innerHTML = this.name;
    const tdDelBtn = document.createElement("object");
    tdDelBtn.setAttribute("data", "img/trash.svg")
    tdDelBtn.setAttribute("type", "image/svg+xml");
    tdDelBtn.setAttribute("width", "20px");
    tdDelBtn.setAttribute("height", "20px");
    shopListTable.appendChild(tr);
    tr.appendChild(tdAddBtn);
    tr.appendChild(tdAmount);
    tr.appendChild(tdName);
    tr.appendChild(tdDelBtn);
  }
} 


// Funksjon som oppretter objekt
function addToList() {
  let shopItem = new ShopItem(shopItemName.value, shopItemAmount.value, shopItemGroup.value);
  shopItem.updateShopList();
  shopItemName.value = ""
  shopItemAmount.value = 1;
}

// ************************
// FLYTT VARER TIL HANDLEKURV
// Når handlekurv knapp trykkes skal den aktuelle varen flyttes til handlekurven
// 