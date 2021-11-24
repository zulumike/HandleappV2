// DATABASECONNECTION
// *******************
// Funksjon for å koble til mysql database
// *******************
function dbConnect() {
    let mysql = require('mysql');
    let con = mysql.createConnection({
      host: "dingseboms2.mysql.domeneshop.no",
      user: "dingseboms2",
      password: "Perkele1803!"
    });
  
    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
    });
  }