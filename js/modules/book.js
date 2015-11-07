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
    constructor(title, name, surname) {
        this._title = title;
        this._name = name;
        this._surname = surname;
    }

    get title() {
        return this._title;
    }

    set title(newTitle) {
        this._title = newTitle;
    };

    get name() {
        return this._name;
    };

    set name(name) {
        this._name = name;
    };

    get surname() {
        return this._surname;
    };

    set surname(newSurname) {
        this._surname = newSurname;
    }

    render(parentIdentifier) {
        var template = fs.readFileSync('./templates/book.ejs', 'utf-8');
        var book = {
            title: this.title,
            name: this.name,
            surname: this.surname
        };
        var html = ejs.render(template, book);
        $(parentIdentifier).append(html);
    }
}

module.exports = Book;
