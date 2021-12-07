// *************
//  VARIABLER
// *************

// Variabler for HTML-elementene
const shopItemName = document.querySelector("#shopitem-name");
const shopItemAmount = document.querySelector("#shopitem-amount");
const shopItemGroup = document.querySelector('#shopitem-group');
const shopListTable = document.querySelector('#main-shoplisttable');
const shoppedListTable = document.querySelector('#main-shoppedlisttable');
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

// ************************
// SLETT VARER FRA HANDLELISTEN
// Når sletteknapp trykkes skal den aktuelle varen slettes fra listen
// 

function deleteItem(id) {
  shopItemArr.splice(id, 1);
  showShopItems();
  saveToLocal();
}

// ***********************
// LEGGER VARE FRA HANDLELISTE TIL HANDLEKURV
// Når handlekurv knapp trykkes flyttes aktuell vare til handlekurv

function addToCart(id) {
  shopItemArr[id].shopped = true;
  showShopItems();
  saveToLocal();
}


// ***********************
// LEGGER VARE FRA HANDLEKURV TILBAKE TIL HANDLELISTE
// Når handlekurv knapp trykkes flyttes aktuell vare tilbake til handleliste

function removeFromCart(id) {
  shopItemArr[id].shopped = false;
  showShopItems();
  saveToLocal();
}


// ***********************
// HENTER VARENE FRA LOCALSTORAGE
// Henter varer fra localstorage og inn i array

function restoreFromLocal() {
  var localStorageArr = JSON.parse(localStorage.getItem("shoplist"));
  console.log(localStorageArr);
  shopItemArr = localStorageArr;
  showShopItems();
}


// ***********************
// LAGRER VARENE I LOCALSTORAGE
// Henter varer fra array og inn i localstorage

function saveToLocal() {
  // localStorage.removeItem("shoplist");
  localStorage.setItem("shoplist", JSON.stringify(shopItemArr));
}

// Funksjon som skriver shopItemArr ut på nettleseren
function showShopItems() {
  if (document.querySelector('#shopListDiv')) {  // Tømmer handlelisten på skjermen hvis den eksisterer
    document.querySelector('#shopListDiv').remove();
  }
  const shopListDiv = document.createElement("div");
  shopListDiv.id = "shopListDiv";
  shopListTable.appendChild(shopListDiv);

  if (document.querySelector('#shoppedListDiv')) {  // Tømmer handlekurven på skjermen hvis den eksisterer
    document.querySelector('#shoppedListDiv').remove();
  }
  const shoppedListDiv = document.createElement("div");
  shoppedListDiv.classList.add("cartdiv")
  shoppedListDiv.id = "shoppedListDiv";
  shopListTable.appendChild(shoppedListDiv);

  let cartHeaderExist = false;
  // loop som går gjennom alle items i array og presenterer dem på skjerm
  for (let i = 0; i < shopItemArr.length; i++) {
    if (shopItemArr[i].shopped == false) {                      // Hvis vare ikke er lagt i handlekurv
      const tr = document.createElement("tr");                  // Ny rad i tabellen
      const tdAddBtn = document.createElement("img");           // Knapp for å legge vare i handlekurven
      tdAddBtn.classList.add("cartbtn");
      tdAddBtn.setAttribute("src", "img/cart-check.svg")
      tdAddBtn.setAttribute("type", "image/svg+xml");
      tdAddBtn.setAttribute("width", "20px");
      tdAddBtn.setAttribute("height", "20px");
      tdAddBtn.addEventListener("click", event => {
        addToCart(i);
      })
      const tdAmount = document.createElement("td");            // Legger til mengde
      tdAmount.innerHTML = shopItemArr[i].amount;
      const tdName = document.createElement("td");              // Legger til varenavn
      tdName.innerHTML = shopItemArr[i].name;
      const tdDelBtn = document.createElement("img");           // Legger til Sletteknapp
      tdDelBtn.classList.add("delbtn");
      tdDelBtn.setAttribute("src", "img/trash.svg")
      tdDelBtn.setAttribute("type", "image/svg+xml");
      tdDelBtn.setAttribute("width", "20px");
      tdDelBtn.setAttribute("height", "20px");
      tdDelBtn.addEventListener('click', event => {             // Eventlistener for sletteknapp
        deleteItem(i);
      })
      shopListDiv.appendChild(tr);                              // Legger til i DOM
      tr.appendChild(tdAddBtn);
      tr.appendChild(tdAmount);
      tr.appendChild(tdName);
      tr.appendChild(tdDelBtn);
  } else {        
      if (cartHeaderExist == false) {
        const cartHeader = document.createElement("th");
        cartHeader.colSpan = 4;
        cartHeader.innerHTML = "Handlekurv";
        shoppedListDiv.appendChild(cartHeader);
        cartHeaderExist = true;
        console.log(cartHeaderExist);
      }
      const trCart = document.createElement("tr");              // Ny rad i tabellen                                              // Hvis vare er lagt i handlekurv
      const tdRemBtn = document.createElement("img");            // Knapp for å flytte vare tilbake til handlelisten
      tdRemBtn.classList.add("cartbtn");
      tdRemBtn.setAttribute("src", "img/cart-x.svg");
      tdRemBtn.setAttribute("type", "image/svg+xml");
      tdRemBtn.setAttribute("width", "20px");
      tdRemBtn.setAttribute("height", "20px");
      tdRemBtn.addEventListener("click", event =>{
        removeFromCart(i);
      })
      const tdAmountInCart = document.createElement("td");      // Legger til mengde
      tdAmountInCart.innerHTML = shopItemArr[i].amount;
      const tdNameInCart = document.createElement("td");        // Legger til varenavn
      tdNameInCart.innerHTML = shopItemArr[i].name;
      const tdDelCartBtn = document.createElement("img");       //Legger til sletteknapp
      tdDelCartBtn.classList.add("delbtn");
      tdDelCartBtn.setAttribute("src", "img/trash.svg")
      tdDelCartBtn.setAttribute("type", "image/svg+xml");
      tdDelCartBtn.setAttribute("width", "20px");
      tdDelCartBtn.setAttribute("height", "20px");
      tdDelCartBtn.addEventListener("click", event => {         // Eventlistener for sletteknapp
        deleteItem(i);
      })
      shoppedListDiv.appendChild(trCart);                       // Legger til elementer i DOM
      trCart.appendChild(tdRemBtn);
      trCart.appendChild(tdAmountInCart);
      trCart.appendChild(tdNameInCart);
      trCart.appendChild(tdDelCartBtn);
  }
  }
  topFunction();
}

// Objekt konstruktør som oppretter et objekt av varenavn, antall og gruppe
function ShopItem(grName, grAmount, grGroup) {
  this.name = grName;
  this.amount = grAmount;
  this.group = grGroup;
  this.shopped = false;
} 

// Funksjon som oppretter objekt
function addToList() {
  let shopItem = new ShopItem(shopItemName.value, shopItemAmount.value, shopItemGroup.value);
  shopItemArr.push(shopItem);
  showShopItems();
  saveToLocal();
  shopItemName.value = ""
  shopItemAmount.value = 1;
}


// ************************
// SJEKKER OM LOCALSTORAGE EKSISTERER OG KJØRER FUNKSJON FOR Å HENTE VARER

if (localStorage.shoplist) {
  restoreFromLocal();
}