'use strict';
const ejs         = require("ejs");
const fs          = require("fs");
const Person      = require("./../person/Person");
const StudentView = require("./StudentView");
const StudentForm = require("./StudentForm");
const DataManager = require("./../dataManager").getInstance();


class Student extends Person {

    //division is used instead of class, because class is a reserved words
    constructor(student, container) {
        super(student, container);
        if (student) {
            this._grade         = student.grade;
            this._division      = student.division;
            this._numberInClass = student.numberInClass;
        }
        this._view       = new StudentView(this);
        this._identifier = "#student-" + this._id;
    }

    get grade() {
        return this._grade;
    }

    set grade(grade) {
        this._grade = grade;
    }

    get container() {
        return this._container;
    }

    get division() {
        return this._division;
    }

    get identifier() {
        return this._identifier;
    }

    set division(division) {
        this._division = division;
    }

    get numberInClass() {
        return this._numberInClass;
    }

    render() {
        let template = fs.readFileSync('./templates/studentContainer.ejs', 'utf-8');
        let html     = ejs.render(template, {
            student: this
        });
        $(this.container.identifier).append(html);
        this._view.render();
    }

    switchView() {
        if (this._view instanceof StudentView) {
            this._view = new StudentForm(this);
        } else {
            this._view = new StudentView(this);
        }
        $(this.identifier).empty();
        this._view.render();
    }

    differs(student) {
        debugger;
        return super.differs(student) || !(
            this.grade === student.grade &&
            this.division === student.division &&
            this.numberInClass === student.numberInClass);
    }

    update(newData) {
        this._name          = newData.name;
        this._surname       = newData.surname;
        this._grade         = newData.grade;
        this._division      = newData.division;
        this._numberInClass = newData.numberInClass;

        if (this.id === super.newPersonId) {
            DataManager.createStudent(Student.getBasicDataObject(this));
            this.container.itemCreated();
        } else {
            DataManager.updateStudent(Student.getFullDataObject(this));
            this.switchView();
        }
    }

    cancelChanges() {
        if (this.id === this.newPersonId) {
            this.container.closeForm();
        } else {
            this.switchView();
        }
    }

    toString() {
        return this._name + " " + this._surname + "(" +
            this._grade + this._division + ", №" + this._numberInClass + ")";
    }

    static getBasicDataObject(student) {
        return {
            name         : student.name,
            surname      : student.surname,
            grade        : student.grade,
            division     : student.division,
            numberInClass: student.numberInClass
        }
    }

    static getFullDataObject(student) {
        let object = Student.getBasicDataObject(student);
        object._id = student.id;
        return object;
    }

}

module.exports = Student;