'use strict';
var ejs = require("ejs");
var fs = require("fs");

class Person {
    constructor(name, surname) {
        this._authorsName = name;
        this._authorsSurname = surname;
    }

    get name() {
        return this._authorsName;
    }

    get surname() {
        return this._authorsSurname;
    }

    show() {
        console.log(this.name, this.surname);
    }
}

module.exports = Person;
