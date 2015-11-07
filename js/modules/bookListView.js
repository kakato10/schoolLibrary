/**
 * Created by kakato10 on 11/6/2015.
 */
var fs = require("fs");
var ejs = require("ejs");
var Book = require("./book.js");

var bookListView = (function () {
    var view;

    function createInstance() {
        return {};
    }

    function render() {
    }

    return {
        getInstance: function (type) {
            if (!view) {
                view = createInstance();
                render();
            }
            return view;
        }
    };
})();

module.exports = bookListView;