'use strict';

let fs = require("fs");
let ejs = require("ejs");
let DataManager = require("./dataManager").getInstance();
const ELEMENT_SELECTOR = "#tab-students";

let bookListView = (function () {
    let view;

    function createInstance() {
        return {
            render: function () {
                //$(ELEMENT_SELECTOR).html("");
                //let students = DataManager.getStudents();
                //students.forEach(function (student) {
                //    student.render(ELEMENT_SELECTOR);
                //})
            }
        };
    }

    return {
        getInstance: function () {
            if (!view) {
                view = createInstance();
            }
            return view;
        }
    };
})();

module.exports = bookListView;