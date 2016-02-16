'use strict';

const newPersonId = "new";

class Person {
    constructor(person, container) {
        if (person) {
            this._name    = person.name;
            this._surname = person.surname;
            this._id      = person._id;
        } else {
            this._id = newPersonId;
        }
        this._container = container;
    }

    get name() {
        return this._name;
    }

    get surname() {
        return this._surname;
    }

    get id() {
        return this._id;
    }

    get container() {
        return this.container;
    }

    get newPersonId() {
        return newPersonId;
    }

    show() {
        console.log(this._name, this._surname);
    }

    differs(person) {
        return !(this.name === person.name &&
        this.surname === person.surname);
    }
}

module.exports = Person;
