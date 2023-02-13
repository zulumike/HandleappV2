
// *************
//  VARIABLER
// *************

// Variabler for HTML-elementene
const shopItemName = document.querySelector("#shopitem-name");
const shopItemAmount = document.querySelector("#shopitem-amount");
const shopItemGroup = document.querySelector('#shopitem-group');
const shopListTable = document.querySelector('#main-shoplisttable');
const shoppedListTable = document.querySelector('#main-shoppedlisttable');
const toTopButton = document.querySelector('#totopbutton');
const dropDownMenu = document.querySelector('#dropDownMenu');
// const saveToDBURL = "http://localhost:7071/api/saveToDB";
// const readFromDBURL = "http://localhost:7071/api/readFromDB";
const saveToDBURL = window.location.href + "api/saveToDB";
const readFromDBURL = window.location.href + "api/readFromDB";
console.log(readFromDBURL);

let shopItemArr = [];
let categoriesArr = [];


// ***********************
// FUNKSJON FOR Å LUKKE MENY HVIS DET TRYKKES ET STED I NETTLESER
//
window.onclick = function(event) {
  if (!event.target.matches('.navbar-menu-btn')) {
    var dropdowns = document.getElementsByClassName("dropdown-menu");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show-menu')) {
        openDropdown.classList.remove('show-menu');
      }
    }
  }
}

// **********************
// TIL TOPPEN FUNKSJON
// Når det scrolles nedover dukker det opp en til toppen knapp som scroller til toppen og setter
// input felt aktivt
// ***********************

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
    toTopButton.style.display = "block";
  } else {
    toTopButton.style.display = "none";
  }
}

// FUNKSJON FOR Å SCROLLE TIL TOPPEN OG SETTE INPUTFELT I FOKUS
// 
function topFunction() {
  const inputName = document.querySelector('#shopitem-name');
  window.scroll({
    top: 0, 
    left: 0, 
    behavior: 'smooth'
  });

  inputName.focus();
}

// *****************
// FUNKSJON FOR Å VISE MENY
//
function showMenu() {
  dropDownMenu.classList.toggle("show-menu");
}


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
  saveToDB();
}

// ***********************
// LEGGER VARE FRA HANDLELISTE TIL HANDLEKURV
// Når handlekurv knapp trykkes flyttes aktuell vare til handlekurv

function addToCart(id) {
  shopItemArr[id].shopped = true;
  showShopItems();
  saveToLocal();
  saveToDB();
}


// ***********************
// LEGGER VARE FRA HANDLEKURV TILBAKE TIL HANDLELISTE
// Når handlekurv knapp trykkes flyttes aktuell vare tilbake til handleliste

function removeFromCart(id) {
  shopItemArr[id].shopped = false;
  showShopItems();
  saveToLocal();
  saveToDB();
}


// ***********************
// HENTER VARENE FRA LOCALSTORAGE
// Henter varer fra localstorage og inn i array

function restoreFromLocal() {
  var localStorageArr = JSON.parse(localStorage.getItem("shoplist"));
  shopItemArr = localStorageArr;
  showShopItems();
}


// ***********************
// LAGRER VARENE I LOCALSTORAGE
// Henter varer fra array og inn i localstorage

function saveToLocal() {
  // localStorage.removeItem("shoplist");
  localStorage.setItem("shoplist", JSON.stringify(shopItemArr))
}

// LESER VARENE FRA MONGODB
//

function readFromDB() {
  console.log('APi readFromDB is called');
  let xhr = new XMLHttpRequest();
  xhr.open("POST", readFromDBURL);
  xhr.setRequestHeader("Accept", "application(json");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = () => {
    shopItemArr = JSON.parse(xhr.responseText);
    console.log(xhr.responseText);
    showShopItems();
  }
  xhr.send();
}

// ***********************
// LAGRER VARENE I MONGODB
//

function saveToDB() {
  console.log('Function saveToDB starts');
  let xhr = new XMLHttpRequest();
  xhr.open("POST", saveToDBURL);
  xhr.setRequestHeader("Accept", "application(json");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = () => console.log(xhr.responseText);
  let data = JSON.stringify(shopItemArr);
  xhr.send(data);
}

// ***************************

function emptyShopItemArr() {
  shopItemArr = [];
  showShopItems();
  saveToLocal();
  saveToDB();
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
      tdAmount.classList.add("amountcol");
      const tdName = document.createElement("td");              // Legger til varenavn
      tdName.classList.add("shop-item-name");
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
      cartHeader.innerHTML = "I handlekurven:";
      shoppedListDiv.appendChild(cartHeader);
      cartHeaderExist = true;
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
    tdAmountInCart.classList.add("amountcol");
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
  if (shopItemName.value == "") {
    alert("Navn må inneholde tekst");
  } else {
    let shopItem = new ShopItem(shopItemName.value, parseInt(shopItemAmount.value), shopItemGroup.value);
    shopItemArr.push(shopItem);
    showShopItems();
    saveToLocal();
    saveToDB();
    shopItemName.value = ""
    shopItemAmount.value = "1";
  }
  topFunction();
}


// **********************
// FUNKSJON FOR Å VISE LISTE OVER KATEGORIER
//
function showCategories() {
  const categoriesDiv = document.createElement("div");
  categoriesDiv.classList.add("categories-div");
  const categoriesListDiv = document.createElement("div");
  categoriesListDiv.classList.add("categories-list-div");
  const categoryNameInput = document.createElement("input");
  categoryNameInput.classList.add("category-input");
  categoryNameInput.type = "text";
  categoryNameInput.placeholder = "Kategorinavn";
  categoryNameInput.name = "categoryName";
  categoryNameInput.id = "categoryName";
  const categoryAddBtn = document.createElement("button");
  categoryAddBtn.classList.add("addbtn");
  categoryAddBtn.innerHTML="+";
  document.body.appendChild(categoriesDiv);
  categoriesDiv.appendChild(categoriesListDiv);
  categoriesListDiv.appendChild(categoryNameInput);
  categoriesListDiv.appendChild(categoryAddBtn);
}


// ************************
// SJEKKER OM LOCALSTORAGE EKSISTERER OG KJØRER FUNKSJON FOR Å HENTE VARER
readFromDB();
// if (localStorage.shoplist) {
//   restoreFromLocal();
// }