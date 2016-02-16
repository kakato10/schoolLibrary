'use strict';
const fs   = require("fs");
const ejs  = require("ejs");
const View = require("./../Generics/View");

class StudentView extends View {
    constructor(student) {
        super(student);
        this._pathToTemplate = './templates/studentView.ejs';
        this._itemLabel      = "student";
    }

    get student() {
        return super.item;
    }

}

module.exports = StudentView;