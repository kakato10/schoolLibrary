/**
 * Created by kakato10 on 11/6/2015.
 */
//var mongoose = require("mongoose");
//var Schemas = require('./schemas.js');
//var nw = require('nw.gui');
var ejs = require("ejs");
var fs = require("fs");

function Book(title, name, surname) {
    this.title = function () {
        return title;
    };

    this.setTitle = function (newTitle) {
        title = newTitle;
    };

    this.name = function () {
        return name;
    };

    this.setName = function (newName) {
        name = newName;
    };

    this.surname = function () {
        return surname;
    };

    this.getSurname = function (newSurname) {
        surname = newSurname;
    }
}

Book.prototype.render = function (parentIdentifier) {
    var template = fs.readFileSync('./templates/book.ejs', 'utf-8');
    var book = {
        title: this.title(),
        name: this.name(),
        surname: this.surname()
    };
    var html = ejs.render(template, book);
    $(parentIdentifier).append(html);
};

module.exports = Book;
