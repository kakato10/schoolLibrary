/**
 * Created by kakato10 on 11/6/2015.
 */
var fs = require("fs");
var ejs = require("ejs");
var Book = require("./book.js");
var BookListView = require("./bookListView");

var TabManager = (function () {
    var manager;
    var tabs = {
        books: {
            label: "Books",
            listView: BookListView.getInstance()
        },
        students: {
            label: "Students",
            listView: {
                render : function () {
                }
            }
        },
        teachers: {
            label: "Teachers",
            listView: {
                render : function () {
                }
            }
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

        //initialize tabs
        $("#tabs").tabs({
            active: 0,
            activate: function (event, ui) {
                var currentTab = $(".ui-state-active a").data("tab");
                tabs[currentTab].listView.render();
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