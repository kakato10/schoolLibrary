'use strict';

const ejs         = require("ejs");
const fs          = require("fs");
const BookView    = require("./bookView");
const BookForm    = require("./bookForm");
const DataManager = require("./../dataManager").getInstance();
const newBookId   = "new";

class Book {
    //TODO add id-s to the html elements of every book
    constructor(book, parent, mode) {
        if (book) {
            this._id               = book._id;
            this._title            = book.title;
            this._authorsFirstName = book.authorsFirstName;
            this._authorsSurname   = book.authorsSurname;
            this._copies           = book.copies || [];
        } else {
            this._id = newBookId;
        }
        this._parent     = parent;
        this._identifier = "#book-" + this._id;


        if (mode == "edit") {
            this._view = new BookForm(this);
        } else {
            this._view = new BookView(this);
        }
    }

    get title() {
        return this._title;
    }

    set title(newTitle) {
        this._title = newTitle;
    };

    get parent() {
        return this._parent;
    }

    get identifier() {
        return this._identifier;
    }

    get authorsFirstName() {
        return this._authorsFirstName;
    };

    set authorsFirstName(newFirstName) {
        this._authorsFirstName = newFirstName;
    };

    get copies() {
        return this._copies;
    }

    get authorsSurname() {
        return this._authorsSurname;
    };

    set authorsSurname(newSurname) {
        this._authorsSurname = newSurname;
    }

    get id() {
        return this._id;
    }

    render() {
        let template = fs.readFileSync('./templates/bookContainer.ejs', 'utf-8');
        let html     = ejs.render(template, {
            book: this
        });
        $(this.parent.identifier).append(html);
        this._view.render();
    }

    switchView() {
        if (this._view instanceof BookView) {
            this._view = new BookForm(this);
        } else {
            this._view = new BookView(this);
        }
        $(this.identifier).empty();
        this._view.render();
    }

    update(newBookInfo) {
        this._title            = newBookInfo.title;
        this._authorsFirstName = newBookInfo.authorsFirstName;
        this._authorsSurname   = newBookInfo.authorsSurname;

        if (this.id === newBookId) {
            DataManager.createBook(Book.getBasicDataObject(this));
            this.parent.itemCreated();
        } else {
            DataManager.updateBook(Book.getFullDataObject(this));
            this.switchView("view");
        }
    }

    differs(book) {
        return !(this.title === book.title &&
        this.authorsFirstName === book.authorsFirstName &&
        this.authorsSurname === book.authorsSurname);
    }

    cancelChanges() {
        if (this.id === newBookId) {
            this.parent.closeForm();
        } else {
            this.switchView();
        }
    }

    addCopy(inventoryNumber) {
        const that = this;
        DataManager.getBooks(function (err, books) {
            let copyIdExists = false;
            books.forEach(function (book) {
                book.copies.forEach(function (copy) {
                    if (copy === inventoryNumber) {
                        copyIdExists = true;
                    }
                });
            });
            if (!copyIdExists) {
                DataManager.addBookCopy(that.id, inventoryNumber, that.saveBookCopyUserFeedback.bind(that));
                that._copies.push(inventoryNumber);
                that._view.render();
            } else {
                global.swal({
                    title: "Inventory number already exists!!!",
                    text : "The inventory number you've entered already exists!",
                    type : "error"
                });
            }
        });
    }

    getUnloanedCopies(loans, copyToInclude) {
        return this._copies.filter(function (copy) {
            let isUnloaned = true;
            loans.forEach(function (loan) {
                if (loan.copy === copy && loan.copy !== copyToInclude) {
                    isUnloaned = false;
                }
            });
            return isUnloaned;
        });
    }

    saveBookCopyUserFeedback(err) {
        debugger;
        if (err) {
            global.swal({
                title: "Something went wrong!!!",
                text : "Error on saving" + err,
                type : "error"
            });
        } else {
            global.swal({
                title: "Success!!!",
                text : "Inventory number successfully saved!",
                type : "success",
                timer: 2000
            });
            this._view.render();
        }
    }

    static getBasicDataObject(book) {
        return {
            title           : book.title,
            authorsFirstName: book.authorsFirstName,
            authorsSurname  : book.authorsSurname
        };
    }

    static getFullDataObject(book) {
        let object = Book.getBasicDataObject(book);
        object._id = book.id;
        return object;
    }

    toString() {
        return "\"" + this.title + "\"" + " by " + this._authorsFirstName + " " + this.authorsSurname;
    }
}

module.exports = Book;
