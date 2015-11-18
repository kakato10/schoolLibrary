'use strict';
let Book = require("./book.js");
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
                    new Book("360 градуса преди края", "Силвия", "Дончева"),
                    new Book("Аз, детективът-нобелист", "Георги", "Спиров"),
                    new Book("Атомният човек", "Любен", "Дилов"),
                    new Book("Без сенки", "Атанас", "Наковски")
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