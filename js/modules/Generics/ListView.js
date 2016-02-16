'use strict';
const fs          = require("fs");
const ejs         = require("ejs");
const DataManager = require("./../dataManager").getInstance();
const NewItemForm = require("./NewItemForm");

let instance = Symbol();

let singletonEnforcer = Symbol();

class ListView {
    constructor() {
        this._identifier  = "";
        this._newItemForm = NewItemForm;
        this._getItems    = undefined;
    }

    get identifier() {
        return this._identifier;
    }

    render() {
        $(this._identifier).html("");
        new this._newItemForm(this).render();
        this._getItems(this.renderItems.bind(this));
    }

    renderItems(err, items) {
        const that = this;
        debugger;
        console.log(items);
        if (err) {
            console.log(err);
        } else {
            items.forEach(function (item) {
                item = new that._item(item, that);
                item.render();
            });
        }
    }
}

module.exports = ListView;