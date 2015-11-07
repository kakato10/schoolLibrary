let Person = require("./person");
class Student extends Person {

    //division is used instead of class, because class is a reserved words
    coonstructor(name, surname, grade, division) {
        super.constructor(name, surname);
        this._grade = grade;
        this._division = division;
    }

    get grade() {
        return this._grade;
    }

    set grade(grade) {
        this._grade = grade;
    }

    get division() {
        return this._division;
    }

    set division(division) {
        this._division = division;
    }
}