'use strict';
/**
 * Created by kakato10 on 11/6/2015.
 */
//var mongoose = require("mongoose");
//var Schemas = require('./schemas.js');
//var nw = require('nw.gui');
var ejs = require("ejs");
var fs = require("fs");
var BookView = require("./bookView");
var BookForm = require("./bookForm");

class Book {
    //TODO add id-s to the html elements of every book
    constructor(title, authorsFirstName, authorsSurname, id, mode) {
        this._id = id || "new";
        this._title = title;
        this._authorsName = authorsFirstName;
        this._authorsSurname = authorsSurname;
        if (mode == "edit") {
            this._view = new BookForm(this);
        } else {
            this._view = new BookView(this);
        }
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

    get id() {
        return this._id;
    }

    render(parentSelector) {
        let template = fs.readFileSync('./templates/bookContainer.ejs', 'utf-8');
        let html = ejs.render(template, {
            book: this
        });
        $(parentSelector).append(html);
        this._view.render("#book-" + this._id);
    }

    switchView(currentView) {
        if (currentView instanceof BookView) {
            this._view = new BookForm(this);
        } else {
            this._view = new BookView(this);
        }
        $("#book-" + this.id).empty();
        this._view.render("#book-" + this._id);
    }
}

module.exports = Book;
