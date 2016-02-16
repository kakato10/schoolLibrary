'use strict';
const fs          = require("fs");
const ejs         = require("ejs");
const View        = require("./../Generics/View");
const DataManager = require("./../dataManager").getInstance();
const moment      = require("moment");

class BookView extends View {
    constructor(book) {
        super(book);
        this._pathToTemplate  = './templates/bookView.ejs';
        this._addCopyButtonId = "add-copy-" + book.id;
        this._itemLabel       = "book";
    }

    get book() {
        return super.item;
    }

    get dataForTemplate() {
        let dataForTemplate             = super.dataForTemplate;
        dataForTemplate.addCopyButtonId = this._addCopyButtonId;
        return dataForTemplate;
    }

    attachEvents() {
        super.attachEvents();
        const that = this;
        $("#" + this._addCopyButtonId).on("click", that.addCopy.bind(this));
    }

    firstAvailableCopy(loans) {
        loans = loans.sort(function (a, b) {
            return new Date(a.endDate) - new Date(b.endDate);
        });

        const loansToExpire = loans.filter(function (loan) {
            return moment().isBefore(moment(loan.endDate));
        });

        return loansToExpire[0];
    }

    render() {
        let template = fs.readFileSync(this._pathToTemplate, 'utf-8');

        const that = this;
        DataManager.getLoans(function (err, loans) {
            let loanedCopies = loans.filter(function (loan) {
                if (that.item.copies.indexOf(loan.copy) !== -1) {
                    return true;
                }
            });

            const firstAvailableCopy = that.firstAvailableCopy(loanedCopies);

            let dataForTemplate        = that.dataForTemplate;
            dataForTemplate.freeCopies = that.item.copies.length - loanedCopies.length;

            if (that.item.copies.length && firstAvailableCopy) {
                dataForTemplate.firstAvailableCopyDate = moment(firstAvailableCopy.endDate).format("YYYY-MM-DD");
            }

            let html = ejs.render(template, dataForTemplate);
            $(that._item.identifier).html(html);
            that.attachEvents();
        });
    }

    addCopy() {
        global.swal({
            title           : "New copy of \"" + this.book.title + "\"",
            text            : "Inventory number:",
            type            : "input",
            showCancelButton: true,
            closeOnConfirm  : false,
            animation       : "slide-from-top"
        }, this.saveCopy.bind(this));
    }

    saveCopy(inventoryNumber) {
        this.book.addCopy(inventoryNumber);
    }


}

module.exports = BookView;