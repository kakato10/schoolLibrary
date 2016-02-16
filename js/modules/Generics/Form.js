'use strict';
const fs  = require("fs");
const ejs = require("ejs");

class Form {
    constructor(item) {
        this._item                  = item;
        this._pathToTemplate        = "";
        this._saveChangesButtonId   = "save-changes-" + this.item.id;
        this._cancelChangesButtonId = "cancel-changes-" + this.item.id;
        this._itemLabel             = "item";
    }

    get item() {
        return this._item;
    }

    render() {
        const template = fs.readFileSync(this._pathToTemplate, 'utf-8');
        debugger;
        const html = ejs.render(template, this.dataForTemplate);
        $(this.item.identifier).append(html);
        this.attachEvents();
    }

    attachEvents() {
        const that = this;
        $("#" + this._saveChangesButtonId).on("click", this.saveChanges.bind(that));

        $("#" + this._cancelChangesButtonId).on("click", this.cancelChanges.bind(that));
    }

    get dataForTemplate() {
        let dataForTemplate               = {};
        dataForTemplate[this.itemLabel]   = this._item;
        dataForTemplate["cancelButtonId"] = this._cancelChangesButtonId;
        dataForTemplate["saveButtonId"]   = this._saveChangesButtonId;
        return dataForTemplate;
    }

    get itemLabel() {
        return this._itemLabel;
    }

    saveChanges() {
        const data = this.getFormContent();
        this._item.update(data);
    }

    cancelChanges() {
        const formContent = this.getFormContent();
        const that        = this;
        let confirmed     = true;
        if (this._item.differs(formContent)) {
            swal({
                type              : "warning",
                title             : "Unsaved data!",
                text              : "There's unsaved changes. Are you sure that you want to cancel them?",
                showCancelButton  : true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText : "Proceed"
            }, function (confrimed) {
                if (confrimed) {
                    that._item.cancelChanges();
                }
            });
        } else {
            that._item.cancelChanges();
        }
    }

    getFieldValue(fieldId) {
        return $("#" + fieldId).val();
    }

}

module.exports = Form;