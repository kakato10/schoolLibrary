'use strict';
const Loan        = require("./../Loans/Loan.js");
const NewLoanForm = require("./newLoanForm");
const DataManager = require("./../dataManager").getInstance();
const ListView    = require("./../Generics/ListView");

class LoansListView extends ListView {
    constructor() {
        super();
        this._identifier  = "#tab-loans";
        this._newItemForm = NewLoanForm;
        this._item        = Loan;
        this._getItems    = DataManager.getLoans;
    }
}

module.exports = LoansListView;