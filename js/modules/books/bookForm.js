'use strict';
let fs = require("fs");
let ejs = require("ejs");
let Book = require("./book");

class BookForm {
    constructor(book) {
        this._book = book;
    }

    get book() {
        return this._title;
    }

    render(parentIdentifier) {
        let template = fs.readFileSync('./templates/bookForm.ejs', 'utf-8');
        var html = ejs.render(template, {
            book: this._book
        });
        $(parentIdentifier).append(html);
    }
}

module.exports = BookForm;