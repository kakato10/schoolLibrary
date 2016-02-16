'use strict';

const fs          = require("fs");
const ejs         = require("ejs");
const Book        = require("./book");
const NewItemForm = require("./../Generics/NewItemForm");
const DataManager = require("./../dataManager").getInstance();

class NewBookForm extends NewItemForm {
    constructor(parent) {
        super(parent);
        this._itemLabel      = "books";
        this._pathToTemplate = "./templates/newBook.ejs";
        this._item           = Book;
        this._onDelete       = DataManager.dropBooks;
    }
}

module.exports = NewBookForm;