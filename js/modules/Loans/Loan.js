'use strict';
const ejs               = require("ejs");
const fs                = require("fs");
const LoanView          = require("./LoanView");
const LoanForm          = require("./LoanForm");
const DataManager       = require("./../dataManager").getInstance();
const moment            = require("moment");
const newLoanId         = "new";
const loanDefaultPeriod = 1;

class Loan {

    constructor(loan, container) {
        if (loan) {
            this._copy    = loan.copy;
            this._student = loan.student;

            let startDate   = loan.startDate.getFullYear() + "-" +
                loan.startDate.getMonth() + "-" + loan.startDate.getDate();
            this._startDate = moment(startDate).format("YYYY-MM-DD");

            let endDate   = loan.endDate.getFullYear() + "-" +
                loan.endDate.getMonth() + "-" + loan.endDate.getDate();
            this._endDate = moment(loan.endDate).format("YYYY-MM-DD");

            this._id = loan._id;
            debugger;
        } else {
            this._id        = newLoanId;
            let startDate   = moment();
            this._startDate = startDate.format("YYYY-MM-DD");
            this._endDate   = startDate.add(loanDefaultPeriod, "month").format("YYYY-MM-DD");
        }
        this._container      = container;
        this._view           = new LoanView(this);
        this._pathToTemplate = './templates/loanContainer.ejs';
        debugger;
        this._identifier = "#loan-" + this._id;
    }

    get copy() {
        return this._copy;
    }

    get student() {
        return this._student;
    }

    get startDate() {
        return this._startDate;
    }

    get endDate() {
        return this._endDate;
    }

    get container() {
        return this._container;
    }

    get identifier() {
        return this._identifier;
    }

    get id() {
        return this._id;
    }

    processTemplate() {
        let template = fs.readFileSync(this._pathToTemplate, 'utf-8');
        return ejs.render(template, {
            loan: this
        });
    }

    render() {
        $(this.container.identifier).append(this.processTemplate());
        this._view.render();
    }

    extendLoan(returnDate) {
        console.log(returnDate);
        if (moment(returnDate).isBefore(moment(this._endDate))) {
            swal({
                title: "Incorrect return date!",
                text : "The new return date you've entered is before the old one!",
                type : "error"
            })
        } else {
            debugger;
            DataManager.extendLoan(this._id, returnDate, this.loanExtended.bind(this));
        }
    }

    loanExtended(err, returnDate) {
        if (err) {
            swal({
                title: "An error occurred",
                text : "Something went wrong while saving the new return date. Please try again!",
                type : "error"
            })
        } else {
            swal({
                title: "Success!!!",
                text : "Inventory number successfully saved!",
                type : "success",
                timer: 2000
            });
            this._endDate = returnDate;
            this._view.render();
        }
    }

    terminateLoan() {
        DataManager.terminateLoan(this.id, this.loanTerminated.bind(this));
    }

    loanTerminated(err) {
        if (err) {
            swal({
                type : "error",
                title: "Something went wrong!",
                text : "Error while terminating the loan. Please try again later!"
            });
        } else {
            swal({
                type : "success",
                title: "Success",
                text : "Book copy is successfully returned",
                timer: 2000
            });
            debugger;
            this.container.render();
        }
    }

    switchView() {
        if (this._view instanceof LoanView) {
            this._view = new LoanForm(this);
        } else {
            this._view = new LoanView(this);
        }
        $(this.identifier).empty();
        this._view.render();
    }

    differs(loan) {
        return !(loan.copy === this._copy &&
        loan.student === this._student &&
        loan.endDate === this.endDate);
    }

    update(newData) {
        this._copy    = newData.copy;
        this._student = newData.student;
        if (this._id === newLoanId) {
            this._endDate = newData.endDate;
        } else {
            this._endDate = newData.endDate;
        }
        if (this.id === newLoanId) {
            DataManager.createLoan(Loan.getBasicDataObject(this));
            this.container.itemCreated();
        } else {
            DataManager.updateLoan(Loan.getFullDataObject(this));
            this.switchView();
        }
    }

    cancelChanges() {
        if (this.id === newLoanId) {
            this.container.closeForm();
        } else {
            this.switchView();
        }
    }

    static getBasicDataObject(loan) {
        return {
            student  : loan.student,
            copy     : loan.copy,
            startDate: loan.startDate,
            endDate  : loan.endDate
        }
    }

    static getFullDataObject(loan) {
        let object = Loan.getBasicDataObject(loan);
        object._id = loan.id;
        return object;
    }

}

module.exports = Loan;