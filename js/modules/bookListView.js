/**
 * Created by kakato10 on 11/6/2015.
 */
var fs = require("fs");
var ejs = require("ejs");
var Book = require("./book.js");
var DataManager = require("./dataManager").getInstance();
var elementSelector = "#tab-books";

var bookListView = (function () {
    var view;

    function createInstance() {
        return {
            render: function () {
                var books = DataManager.getBooks();
                books.forEach(function (book) {
                    book.render(elementSelector);
                })
            }
        };
    }

    return {
        getInstance: function () {
            if (!view) {
                view = createInstance();
            }
            return view;
        }
    };
})();

module.exports = bookListView;