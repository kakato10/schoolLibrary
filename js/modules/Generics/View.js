'use strict';
let fs  = require("fs");
let ejs = require("ejs");

class View {
    constructor(item) {
        this._item           = item;
        this._pathToTemplate = "";
        this._editButtonId   = "edit-" + item.id;
        this._itemLabel      = "item";
    }

    get item() {
        return this._item;
    }

    get itemLabel() {
        return this._itemLabel;
    }

    render() {
        let template = fs.readFileSync(this._pathToTemplate, 'utf-8');
        let html     = ejs.render(template, this.dataForTemplate);
        $(this._item.identifier).html(html);
        this.attachEvents();
    }

    attachEvents() {
        let that = this;
        $("#" + this._editButtonId).on("click", function (e) {
            that._item.switchView();
        });
    }

    get dataForTemplate() {
        let dataForTemplate             = {};
        dataForTemplate[this.itemLabel] = this._item;
        dataForTemplate["editButtonId"] = this._editButtonId;
        return dataForTemplate;
    }
}

module.exports = View;