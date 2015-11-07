'use strict';

let fs = require("fs");
let ejs = require("ejs");
let Book = require("./book.js");
let DataManager = require("./dataManager").getInstance();
let elementSelector = "#tab-books";

let bookListView = (function () {
    let view;

    function createInstance() {
        return {
            render: function () {
                $(elementSelector).html("");
                let books = DataManager.getBooks();
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