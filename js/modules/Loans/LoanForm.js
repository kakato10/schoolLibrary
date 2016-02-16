'use strict';
const fs          = require("fs");
const ejs         = require("ejs");
const Form        = require("./../Generics/Form");
const DataManager = require("./../dataManager").getInstance();
const Book        = require("./../books/book");
const Student     = require("./../Student/student");
const moment      = require("moment");
//const Book = require("./../books/book");
//const Student = require("./../Student/Student");


class LoanForm extends Form {
    constructor(loan) {
        super(loan);
        this._pathToTemplate  = "./templates/LoanForm.ejs";
        this._studentInputId  = "student-name-" + this.loan.id;
        this._bookCopyInputId = "book-copy-" + this.loan.id;
        this._endDateinputId  = "end-date-" + this.loan.id;
        this._itemLabel       = "loan";
        debugger;
    }

    get loan() {
        return super.item;
    }

    getFormContent() {
        const loanInfo = {
            student: this.getFieldValue(this._studentInputId),
            copy   : this.getFieldValue(this._bookCopyInputId),
            endDate: this.getFieldValue(this._endDateinputId)
        };
        return loanInfo;
    }

    saveChanges() {
        const data = this.getFormContent();
        const that = this;
        DataManager.getLoansOfStudent(data.student, function (err, loans) {
            const expiredLoans = loans.filter(function (loan) {
                return moment(loan.endDate).isBefore(moment());
            });
            if (expiredLoans.length > 0) {
                let label = "loans";
                if (expiredLoans.length === 1) {
                    label = "loan"
                }
                swal({
                    type             : "warning",
                    title            : "Expired " + label + "!",
                    text             : "The user has " + expiredLoans.length + " expired " + label + ". Are you sure you want" +
                    " to proceed?",
                    showCancelButton : true,
                    confirmButtonText: "Proceed"
                }, function () {
                    that._item.update(data);
                });
            } else {
                that._item.update(data);
            }
        });
    }

    get dataForTemplate() {
        let dataForTemplate                = super.dataForTemplate;
        dataForTemplate["studentInputId"]  = this._studentInputId;
        dataForTemplate["bookCopyInputId"] = this._bookCopyInputId;
        dataForTemplate["endDateInputId"]  = this._endDateinputId;
        dataForTemplate["DataManager"]     = DataManager;
        dataForTemplate["Student"]         = Student;
        dataForTemplate["Book"]            = Book;
        return dataForTemplate;
    }


    render() {
        const that     = this;
        const template = fs.readFileSync(this._pathToTemplate, 'utf-8');
        debugger;
        DataManager.getStudents(function (err, students) {
            DataManager.getBooks(function (err, books) {
                DataManager.getLoans(function (err, loans) {
                    let dataForTemplate         = that.dataForTemplate;
                    students                    = students.map(function (student) {
                        return new Student(student);
                    });
                    books                       = books.map(function (book) {
                        return new Book(book);
                    });
                    dataForTemplate["students"] = students;
                    dataForTemplate["books"]    = books;
                    dataForTemplate["loans"]    = loans;
                    const html                  = ejs.render(template, dataForTemplate);
                    $(that.item.identifier).html(html);
                    that.attachEvents();
                });
            });
        });
    }
}

module.exports = LoanForm;