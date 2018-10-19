require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const pgp = require('pg-promise')(); 
const db = pgp({
  host: 'localhost',
  port: 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD
});
app.use('/static', express.static('static'));
app.set('view engine', 'hbs');
app.use(bodyParser.json());


//GET REQUESTS
app.get('/', function(req, res){
  res.render('index');
});

app.get("/api/menudata", function(req, res) {
  db.any(
    `SELECT * FROM menudata`
  )
    .then(function(data) {
      res.json(data);
    })
    .catch(function(error) {
      res.json({ error: error.message });
    });
});
app.get("/api/menudata/:id", function(req, res) {
  const menudata_id = req.params.id
  db.one(
    `SELECT name, price FROM menudata\
     WHERE id =$1`,[menudata_id]
  )
    .then(function(data) {
      res.json(data);
    })
    .catch(function(error) {
      res.json({ error: error.message });
    });
});

app.get("/api/orders", function(req, res) {
  db.any(
    `SELECT * FROM orders_purchased`
     
  )
    .then(function(data) {
      res.json(data);
    })
    .catch(function(error) {
      res.json({ error: error.message });
    });
});

app.get("/api/orders/:id", function(req, res) {
  const orderId = req.params.id
  db.one(
    ``
    )
    .then(function(data) {
      res.json(data);
    })
    .catch(function(error) {
      res.json({ error: error.message });
    });
});


//POST REQUESTS
app.post("/api/orders", function(req,res){
  db.one(
    `INSERT INTO orders (id)
     VALUES (default) RETURNING id`
  )
  .then(data =>{
    const orderId = data.id
    const orders = req.body  // may need to take away brckets from orders

    return Promise.all(orders.map(order =>{
      return db.none(
        `INSERT INTO orders_purchased (menuitem_id,order_id,quantity)
         VALUES ($1, $2, $3)`,
         [order.id, orderId, order.quantity]  // they need to match the values passed it . look at console log of order whe pushed // maybe just need to change menuitem_id to order.id
         //change in the fecth order tp + data.order_id in the alert
      );
    })).then(() => orderId)
  })
  .then(orderId => res.json({orderId: orderId}))
  .catch(error => res.json({error: error.message}))
})


// const order ={
//     2: {menuitem: 2, quantity: 2},
//     1: {menuitem: 1, quantity: 3}
//   }


  // const newId = (Object.keys(orders).length) ? Math.max(...Object.keys(orders)) + 1 : 1;
  // const date = new Date();
  // const orderData = {'orderId': newId, 'orderStatus': 'new', 'placedAt': date.toLocaleString(), 'order': order};
  // orders[newId] = orderData;
  // console.log('new order received!');
  // return orderData;


app.listen(8080, function(){
  console.log('Listening on port 8080');
});


// app.post("/api/orders/", function(req,res){
//   let {menuitem_id, quantity} = req.body;
//   db.one(
//       `INSERT INTO orders (id)
//        VALUES (default) RETURNING id`,
//   )
//   .then(data => {
//     // Get orders and map over them
//     const order = req.body
//     Object.values(order).map(currentOrder =>{
//       menuitem_id = currentOrder.menuitem_id
//       quantity = currentOrder.quantity
//     db.one(
//       `INSERT INTO orders_purchased (order_id,menuitem_id,quantity)
//        VALUES($1 ,$2 ,$3)`,
//        [data.id,menuitem_id,quantity]
//       )
//     })
//   }) 
//   .then(data => {
//     res.json(Object.assign({},{id: data.id}, req.body))
    
//   })
//   .catch(error => {
//     res.json({error: error.message})
//   })
// })