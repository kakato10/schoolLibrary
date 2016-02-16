'use strict';
const fs   = require("fs");
const ejs  = require("ejs");
const Form = require("./../Generics/Form");

class StudentForm extends Form {
    constructor(book) {
        super(book);
        this._pathToTemplate        = "./templates/bookForm.ejs";
        this._titleInputId          = "title-" + this.book.id;
        this._authorsNameInputId    = "authors-name-" + this.book.id;
        this._authorsSurnameInputId = "authors-surname-" + this.book.id;
        this._itemLabel             = "book";
    }

    get book() {
        return super.item;
    }

    getFormContent() {
        const studentId = this.book.id;
        const bookInfo  = {
            title           : this.getFieldValue(this._titleInputId),
            authorsFirstName: this.getFieldValue(this._authorsNameInputId),
            authorsSurname  : this.getFieldValue(this._authorsSurnameInputId)
        };
        return bookInfo;
    }

    get dataForTemplate() {
        let dataForTemplate                      = super.dataForTemplate;
        dataForTemplate["titleInputId"]          = this._titleInputId;
        dataForTemplate["authorsNameInputId"]    = this._authorsNameInputId;
        dataForTemplate["authorsSurnameInputId"] = this._authorsSurnameInputId;
        return dataForTemplate;
    }
}

module.exports = StudentForm;