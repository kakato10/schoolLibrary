'use strict';

let fs            = require("fs");
let ejs           = require("ejs");
let Student       = require("./student");
let DataManager   = require("./../dataManager").getInstance();
const NewItemForm = require("./../Generics/NewItemForm");

class NewStudentForm extends NewItemForm {
    constructor(parent) {
        super(parent);
        this._itemLabel      = "students";
        this._pathToTemplate = "./templates/newStudentForm.ejs";
        this._item           = Student;
        this._onDelete       = DataManager.dropStudents;
    }
}

module.exports = NewStudentForm;