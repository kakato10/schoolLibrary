'use strict';
let fs = require("fs");
let ejs = require("ejs");
let Book = require("./book");

class BookView {
    constructor(book) {
        this._book = book;
    }

    get book() {
        return this._title;
    }

    render(parentIdentifier) {
        let that = this;
        let template = fs.readFileSync('./templates/bookView.ejs', 'utf-8');
        let html = ejs.render(template, {
            book : this._book
        });
        $(parentIdentifier).append(html);
        $(parentIdentifier).find(".edit").on("click", function (e) {
            debugger;
            that._book.switchView(that);
        })
    }
}

module.exports = BookView;