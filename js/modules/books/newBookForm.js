'use strict';

let fs = require("fs");
let ejs = require("ejs");
let Book = require("./book");
let DataManager = require("./../dataManager").getInstance();

//TODO: find a way to make add book and edit book to use one form
let bookListView = (function () {
    let instance;

    function attachEvents() {
        $("#add-book-modal").on("hidden.bs.modal", function (e) {
            //empty the modal
            $("#add-book-modal").find(".modal-body").html("");
        });

        $("#add-book").on("click", function(e) {
            //TODO: find a way to pass directly edit as mode for the book
            let newBook = new Book(undefined, undefined, undefined, undefined, "edit");
            newBook.render("#add-book-modal .modal-body");
        });
    }

    function createInstance() {
        return {
            render: function (parentSelector) {
                let template = fs.readFileSync('./templates/newBook.ejs', 'utf-8');
                let html = ejs.compile(template);
                $(parentSelector).append(html);
                attachEvents();
            }
        };
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

module.exports = bookListView;