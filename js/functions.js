// *************
//  VARIABLER
// *************

// Variabler for HTML-elementene
const shopItemName = document.querySelector("#shopitem-name");
const shopItemAmount = document.querySelector("#shopitem-amount");
const shopItemGroup = document.querySelector('#shopitem-group');
const shopListTable = document.querySelector('#main-shoplisttable');



// ************************
// LEGG TIL VARE FUNKSJONER
// Når pluss-knapp trykkes startes denne funksjonen (trigget via html onclick).
// Funksjonen legger til vare som objekt vha funksjonen shopitem
// !! Funksjone må også sørge for oppdatering av database/localstorage.
// ************************


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
    const tdName = document.createElement("td");
    tdName.innerHTML = this.name;
    const tdDelBtn = document.createElement("object");
    tdDelBtn.setAttribute("data", "img/trash.svg")
    tdDelBtn.setAttribute("type", "image/svg+xml");
    tdDelBtn.setAttribute("width", "20px");
    tdDelBtn.setAttribute("height", "20px");
    shopListTable.appendChild(tr);
    tr.appendChild(tdAddBtn);
    tr.appendChild(tdName);
    tr.appendChild(tdDelBtn);
  }
} 

// Funksjon som oppretter objekt
function addToList() {
  let newItem = new ShopItem(shopItemName.value, shopItemAmount.value, shopItemGroup.value);
  newItem.updateShopList();
}


// ************************
// FLYTT VARER TIL HANDLEKURV
// Når handlekurv knapp trykkes skal den aktuelle varen flyttes til handlekurven
// 

// ************************
// HANDLELISTE KONSTRUKTØR
// For å opprette objekt av hvert item som legges til i listen, samt vise dette i listen
// ************************

// Objekt konstruktør for handlelisten. Lager et objekt pr vare som legges inn.
function shopitem(name, amount, group) {
  this.name = name; //Data skal komme fra html skjema
  this.amount = amount;
  this.group = group;
  this.display = function() {
    //Funksjon for å legge varene i listen på skjerm.
  }
}