'use strict';
let Book = require("./books/book.js");
let mongoose = require("mongoose");
let Schema = mongoose.Schema;
mongoose.connect( "mongodb://localhost/schoolLibrary" );

let BookSchema = new Schema( {
    title: String,
    authorsFirstName: String,
    authorsSurname : String
} );

let PersonSchema = new Schema( {
    firstName: String,
    secondName: String
} );

let DataManager = (function () {
    let manager;

    function createInstance() {
        return {
            getBooks: function() {
                return [
                    new Book("360 градуса преди края", "Силвия", "Дончева", 123),
                    new Book("Аз, детективът-нобелист", "Георги", "Спиров", 124),
                    new Book("Атомният човек", "Любен", "Дилов", 125),
                    new Book("Без сенки", "Атанас", "Наковски", 126)
                ]
            }
        };
    }

    return {
        getInstance: function () {
            if (!manager) {
                manager = createInstance();
            }
            return manager;
        }
    };
})();

module.exports = DataManager;