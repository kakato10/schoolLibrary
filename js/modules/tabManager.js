/**
 * Created by kakato10 on 11/6/2015.
 */
var fs = require("fs");
var ejs = require("ejs");
var Book = require("./book.js");

var TabManager = (function () {
    var manager;
    var tabs = {
        books: {
            label: "books",
            listView: "booksList"
        },
        students: {
            label: "students",
            listView: "studentsList"
        },
        teachers: {
            label: "teachers",
            listView: "teachersList"
        }
    };


    function createInstance() {
        return {};
    }

    function render() {
        var template = fs.readFileSync('./templates/tabManager.ejs', 'utf-8');
        var html = ejs.render(template, {
            tabs: tabs
        });
        $(window.document.body).append(html);
        $("#tabs").tabs({
            active: 0,
            activate: function (event, ui) {
                var containerId = $(".ui-state-active a").attr("href");
                var book = new Book(containerId, "Svetlin", "Nakov");
                book.render(containerId);
            }
        });
    }

    return {
        getInstance: function () {
            if (!manager) {
                manager = createInstance();
                render();
            }
            return manager;
        }
    };
})();

module.exports = TabManager;