// Load Express
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Load Mongoose
const mongoose = require('mongoose');

// Import Model
require('./Customer');
const Customer = mongoose.model('Customer');
mongoose.connect('mongodb+srv://pedro:12307554@cluster0.tdm1h.mongodb.net/customers-service', () => {
    console.log('Database Connected');
});

// Create Funcionality

app.post('/customer', (req, res) => {
    var newCustomer = {
        name: req.body.name,
        age: req.body.age,
        address: req.body.address
    }

    var customer = new Customer(newCustomer);

    customer.save().then(() => {
        console.log("New Customer was created!");
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });
    res.send('A new Customer created success!');
});

app.get('/customers', (req, res) => {

    Customer.find().then((customers) => {
        res.json(customers);
    }).catch((err) => {
        throw err;
    });
});

app.get('/customer/:id', (req, res) => {

    Customer.findById(req.params.id).then((customers) => {
        res.json(customers);
    }).catch((err) => {
        throw err;
    });
});

app.delete('/customer/:id', (req, res) => {

    Customer.findByIdAndRemove(req.params.id).then((customers) => {
        console.log("Customer was deleted!");
    }).catch((err) => {
        throw err;
    });
    res.send('Customer was deleted success!');
});

app.listen("5555", () => {
    console.log('Up and running -- This is our Customers service');
});