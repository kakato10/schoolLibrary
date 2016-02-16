'use strict';
const Book        = require("./book.js");
const NewBookForm = require("./newBookForm");
const DataManager = require("./../dataManager").getInstance();
const ListView    = require("./../Generics/ListView");

class BookListView extends ListView {
    constructor() {
        super();
        this._identifier  = "#tab-books";
        this._newItemForm = NewBookForm;
        this._item        = Book;
        this._getItems    = DataManager.getBooks;
    }
}

module.exports = BookListView;