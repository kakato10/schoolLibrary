'use strict';
/**
 * Created by kakato10 on 11/6/2015.
 */
//var mongoose = require("mongoose");
//var Schemas = require('./schemas.js');
//var nw = require('nw.gui');
var ejs = require("ejs");
var fs = require("fs");

class Book {
    constructor(title, authorsFirstName, authorsSurname) {
        this._title = title;
        this._authorsName = authorsFirstName;
        this._authorsSurname = authorsSurname;
    }

    get title() {
        return this._title;
    }

    set title(newTitle) {
        this._title = newTitle;
    };

    get authorsFirstName() {
        return this._authorsName;
    };

    set authorsFirstName(newFirstName) {
        this._authorsName = newFirstName;
    };

    get authorsSurname() {
        return this._authorsSurname;
    };

    set authorsSurname(newSurname) {
        this._authorsSurname = newSurname;
    }

    render(parentIdentifier) {
        var template = fs.readFileSync('./templates/book.ejs', 'utf-8');
        var book = {
            title: this.title,
            name: this.authorsFirstName,
            surname: this.authorsSurname
        };
        var html = ejs.render(template, book);
        $(parentIdentifier).append(html);
    }
}

module.exports = Book;
