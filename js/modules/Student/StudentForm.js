'use strict';
const fs   = require("fs");
const ejs  = require("ejs");
const Form = require("./../Generics/Form");

class StudentForm extends Form {
    constructor(student) {
        super(student);
        this._pathToTemplate       = "./templates/studentForm.ejs";
        this._nameInputId          = "student-name-" + this.student.id;
        this._surnameInputId       = "student-surname-" + this.student.id;
        this._gradeInputId         = "student-grade-" + this.student.id;
        this._divisionInputId      = "student-division-" + this.student.id;
        this._numberInClassInputId = "number-" + this.student.id;
        this._itemLabel            = "student";
    }

    get student() {
        return super.item;
    }

    getFormContent() {
        const studentId   = this.student.id;
        const studentInfo = {
            name         : this.getFieldValue(this._nameInputId),
            surname      : this.getFieldValue(this._surnameInputId),
            grade        : parseInt(this.getFieldValue(this._gradeInputId), 10),
            division     : this.getFieldValue(this._divisionInputId),
            numberInClass: parseInt(this.getFieldValue(this._numberInClassInputId), 10)
        };
        return studentInfo;
    }

    get dataForTemplate() {
        let dataForTemplate                     = super.dataForTemplate;
        dataForTemplate["nameInputId"]          = this._nameInputId;
        dataForTemplate["surnameInputId"]       = this._surnameInputId;
        dataForTemplate["gradeInputId"]         = this._gradeInputId;
        dataForTemplate["divisionInputId"]      = this._divisionInputId;
        dataForTemplate["numberInClassInputId"] = this._numberInClassInputId;
        return dataForTemplate;
    }
}

module.exports = StudentForm;