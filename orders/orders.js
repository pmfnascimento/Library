const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const axios = require('axios');

// CustomerID
// BookID
// gotDate
// Delivery

// Load Mongoose
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://pedro:12307554@cluster0.bgmta.mongodb.net/orders-service', () => {
    console.log('Database Connected');
});

// Import Model
require('./Order');
const Order = mongoose.model('Order');

app.post('/order', (req, res) => {
    var newOrder = {
        customerID: mongoose.Types.ObjectId(req.body.customerID),
        BookID: mongoose.Types.ObjectId(req.body.BookID),
        initialDate: req.body.initialDate,
        deliveryDate: req.body.deliveryDate
    }

    var order = new Order(newOrder);

    order.save().then(() => {
        console.log("New Order was created!");
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });
    res.send('A new Order created success!');
});

app.get('/orders', (req, res) => {

    Order.find().then((orders) => {
        res.json(orders);
    }).catch((err) => {
        throw err;
    });
});

app.get('/order/:id', (req, res) => {

    Order.findById(req.params.id).then((orders) => {
        if (orders){
            axios.get("http://localhost:5555/customer/" + orders.customerID).then((rep) => {
                var orderObject = {customerName: rep.data.name, bookTitle: ''}

                axios.get("http://localhost:4545/book/" + orders.BookID).then((rep) => {
                    orderObject.bookTitle = rep.data.title;
                    res.json(orderObject);
                });

            });
        }else{
            res.send("Invalid Order");
        }
    }).catch((err) => {
        throw err;
    });
});

app.listen("7777", () => {
    console.log('Up and running -- This is our Orders service');
});