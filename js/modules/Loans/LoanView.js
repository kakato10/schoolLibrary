'use strict';
const fs          = require("fs");
const ejs         = require("ejs");
const View        = require("./../Generics/View");
const DataManager = require("./../dataManager").getInstance();
const Book        = require("./../books/book");
const Student     = require("./../Student/student");
const moment      = require("moment");

class LoanView extends View {
    constructor(loan) {
        super(loan);
        this._pathToTemplate     = './templates/loanView.ejs';
        this._itemLabel          = "loan";
        this._extendButtonId     = "extend-loan-" + this.item.id;
        this._returnBookButtonId = "return-book-" + this.item.id;
    }


    attachEvents() {
        const that = this;
        super.attachEvents();
        $("#" + this._extendButtonId).on("click", that.extendLoan.bind(that));
        $("#" + this._returnBookButtonId).on("click", that.returnBook.bind(that));
    }

    extendLoan() {
        global.swal({
            title           : "Extend loan",
            text            : "Please enter new loan end date",
            type            : "input",
            inputType       : "date",
            inputValue      : this.item.endDate,
            showCancelButton: true,
            closeOnConfirm  : false,
            animation       : "slide-from-top"
        }, this.saveExtend.bind(this));
    }

    returnBook() {
        const that = this;
        swal({
            type              : "warning",
            title             : "Return of a book",
            text              : "Are you sure you want check this copy as returned?",
            showCancelButton  : true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText : "Confirm",
            closeOnConfirm    : false
        }, function (confirmed) {
            if (confirmed) {
                that._item.terminateLoan();
            }
        });
    }

    saveExtend(newEndDate) {
        this.item.extendLoan(newEndDate)
    }

    get dataForTemplate() {
        let dataForTemplate               = super.dataForTemplate;
        dataForTemplate["extendButtonId"] = this._extendButtonId;
        return dataForTemplate;
    }

    render() {
        let template = fs.readFileSync(this._pathToTemplate, 'utf-8');

        const that = this;
        DataManager.getStudent(super.item.student, function (err, student) {
            DataManager.getBookOfCopy(that.item.copy, function (err, book) {
                let dataForTemplate                = that.dataForTemplate;
                dataForTemplate.returnBookButtonId = that._returnBookButtonId;

                let returnDate = moment(that.item.endDate);
                let status     = "active";
                if (returnDate.isBefore(moment())) {
                    status = "expired";
                } else if (returnDate.isBefore(moment().add(7, "day"))) {
                    status = "expiring";
                }
                dataForTemplate.status = status;

                dataForTemplate.student = new Student(student);
                dataForTemplate.book    = new Book(book);
                debugger;
                const html = ejs.render(template, dataForTemplate);
                $(that._item.identifier).html(html);
                that.attachEvents();
            });
        });
    }

    get loan() {
        return super.item;
    }
}

module.exports = LoanView;