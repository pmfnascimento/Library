const mongoose = require('mongoose');

// A Model -> Collections

mongoose.model("Book",{
   
    // Title, author, mumberPages, publisher

    title: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    mumberPages: {
        type: Number,
        require: false
    },
    publisher: {
        type: String,
        require: true
    }

});