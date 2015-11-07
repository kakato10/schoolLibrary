'use strict';
var ejs = require("ejs");
var fs = require("fs");

class Person {
    constructor(name, surname) {
        this._name = name;
        this._surname = surname;
    }

    get name() {
        return this._name;
    }

    get surname() {
        return this._surname;
    }

    show() {
        console.log(this.name, this.surname);
    }
}

module.exports = Person;
