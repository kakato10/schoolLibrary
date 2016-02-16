'use strict';
let ejs           = require("ejs");
let Loan          = require("./Loan");
let DataManager   = require("./../dataManager").getInstance();
const NewItemForm = require("./../Generics/NewItemForm");

class NewLoanForm extends NewItemForm {
    constructor(parent) {
        super(parent);
        this._itemLabel          = "loans";
        this._pathToTemplate     = "./templates/newLoan.ejs";
        this._item               = Loan;
        this._onDelete           = DataManager.dropLoans;
        this._extendLoanButtonId = "extend-loan";
    }
}

module.exports = NewLoanForm;