'use strict';
const Student        = require("./../Student/student.js");
const NewStudentForm = require("./newStudentForm");
const DataManager    = require("./../dataManager").getInstance();
const ListView       = require("./../Generics/ListView");

class StudentListVIew extends ListView {
    constructor() {
        super();
        this._identifier  = "#tab-students";
        this._newItemForm = NewStudentForm;
        this._item        = Student;
        this._getItems    = DataManager.getStudents;
    }
}

module.exports = StudentListVIew;