'use strict';

const fs          = require("fs");
const ejs         = require("ejs");
const DataManager = require("./../dataManager").getInstance();


class NewItemForm {
    constructor(parent) {
        this._parent         = parent;
        this._itemLabel      = "item";
        this._pathToTemplate = "";
    }

    get identifier() {
        return "#" + this.containerId;
    }

    get addButtonId() {
        return "add-" + this._itemLabel;
    }

    get deleteButtonId() {
        return "delete-" + this._itemLabel;
    }

    get containerId() {
        return this._itemLabel + "-creator"
    }

    get dataForTemplate() {
        return {
            addButtonId   : this.addButtonId,
            deleteButtonId: this.deleteButtonId,
            containerId   : this.containerId
        }
    }

    render() {
        const template = fs.readFileSync(this._pathToTemplate, 'utf-8');
        const html     = ejs.render(template, this.dataForTemplate);
        $(this._parent.identifier).append(html);
        this.attachEvents();
    }

    attachEvents() {
        const that = this;
        console.log("#" + this.addButtonId, "#" + this.deleteButtonId);
        $("#" + this.addButtonId).on("click", function (e) {
            const newItem = new that._item(undefined, that);
            newItem.switchView();
            newItem.render();
        });
        $("#" + this.deleteButtonId).on("click", function () {
            that._onDelete();
            that._parent.render();
        });
    }

    renderItems(err, items) {
        const that = this;
        if (err) {
            console.log(err);
        } else {
            items.forEach(function (item) {
                item = new that._item(item, that);
                item.render();
            });
        }
    }

    itemCreated() {
        this.closeForm();
        debugger;
        this._parent.render();
    }

    closeForm() {
        $(this.identifier).html("");
    }
}

module.exports = NewItemForm;