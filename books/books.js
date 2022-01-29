// Load Express
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Load Mongoose
const mongoose = require('mongoose');

// Import Model
require('./Book');
const Book = mongoose.model('Book');

mongoose.connect('mongodb+srv://pedro:12307554@cluster0.tdm1h.mongodb.net/books-service', () => {
    console.log('Database Connected');
});

app.get('/', (req, res) => {
    res.send('another');
});

// Create Funcionality

app.post('/book', (req, res) => {
    var newBook = {
        title: req.body.title,
        author: req.body.author,
        numberPages: req.body.numberPages,
        publisher: req.body.publisher
    }

    var book = new Book(newBook);

    book.save().then(() => {
        console.log("New Book created!");
    }).catch((err) => {
        if(err){
            throw err;
        }
    });
    res.send('A new Book created success!');
});

app.get('/books',(req, res) => {

    Book.find().then((books) => {
        res.json(books);
    }).catch((err) => {
        throw err;
    });
});

app.get('/book/:id', (req, res) => {

    Book.findById(req.params.id).then((books) => {
        res.json(books);
    }).catch((err) => {
        throw err;
    });
});

app.delete('/book/:id', (req, res) => {

    Book.findByIdAndRemove(req.params.id).then((books) => {
        console.log("Book was deleted!");
    }).catch((err) => {
        throw err;
    });
    res.send('The Book was deleted success!');
});

app.listen("4545", () => {
    console.log('Up and running -- This is our Books service');
});