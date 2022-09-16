const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cartRoutes = require('./routes/cart');
const cors = require('cors');

dotenv.config();        // loads .env config into process.env
const port = process.env.PORT || 8080;      // port 8080 hvis ikke definert

app.use(express.json());
app.use(cors());
app.use("/", cartRoutes);

app.listen(port, () => {
    console.log('A Node JS API is listening on port: ', port);
});


// Dette virker, men dårlig løsning

// const http = require('http');
// const url = require('url');
// const dotenv = require('dotenv');
// const dbWriteItem = require('./controllers/cart');

// dotenv.config();        // loads .env config into process.env
// const port = process.env.PORT || 8080;      // port 8080 hvis ikke definert

// http.createServer(function (req, res) {
//     res.write('Hello Wordl');
//     var q = url.parse(req.url, true).query;
//     // var doc = q.db + " " + q.collection + " " + q.itemName + " " + q.amount + " " + q.group + " " + q.shopped;
//     dbWriteItem(q.db, q.collection, q.name, q.amount, q.group, q.shopped).catch(console.dir);
//     res.end();
// }).listen(port);