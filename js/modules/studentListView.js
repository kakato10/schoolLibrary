'use strict';

let fs = require("fs");
let ejs = require("ejs");
let DataManager = require("./dataManager").getInstance();

let studentListView = (function () {
    let view;

    function createInstance() {
        return {
            render: function (parentSelector) {
                //let newBookTemplate = fs.readFileSync('./templates/bookForm.ejs', 'utf-8');
                //let html = ejs.render(newBookTemplate);
                //$(parentSelector).html(html);
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

module.exports = studentListView;