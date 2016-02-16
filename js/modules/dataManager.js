'use strict';
const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

mongoose.connect("mongodb://localhost/schoolLibraryTest");

const BookModel = mongoose.model("BookModel", {
    title           : String,
    authorsFirstName: String,
    authorsSurname  : String,
    copies          : [String]
});

const PersonSchema = new Schema({
    firstName : String,
    secondName: String
});

const StudentModel = mongoose.model("StudentModel", {
    name         : String,
    surname      : String,
    grade        : Number,
    division     : String,
    numberInClass: Number
});

const LoanModel = mongoose.model("LoanModel", {
    copy     : String,
    student  : {
        type: Schema.Types.ObjectId,
        ref : "StudentModal"
    },
    startDate: Date,
    endDate  : Date
});

const DataManager = (function () {
    let manager;

    function createInstance() {
        return {
            getBooks: function (callback) {
                BookModel.find({}, function (err, books) {
                    callback(err, books);
                });
            },

            updateBook: function (book, callback) {
                BookModel.update({"_id": book._id.toString()}, {
                    title           : book.title,
                    authorsFirstName: book.authorsFirstName,
                    authorsSurname  : book.authorsSurname
                }, function (err) {
                    if (err) {
                        console.log(err);
                    }
                });
            },

            createBook: function (book) {
                console.log(book);
                new BookModel(book).save(function (err) {
                    if (err) {
                        console.log(err);
                    }
                })
            },

            getBookOfCopy: function (copyId, callback) {
                BookModel.findOne({
                    copies: {
                        "$all": [copyId]
                    }
                }, callback);
            },

            dropBooks: function () {
                BookModel.remove({}, function (err) {
                    console.log('collection removed')
                });
            },

            getStudents: function (callback) {
                StudentModel.find({}, function (err, students) {
                    callback(err, students);
                });
            },

            updateStudent: function (student, callback) {
                StudentModel.update({"_id": student._id.toString()}, {
                    name         : student.name,
                    surname      : student.surname,
                    grade        : student.grade,
                    division     : student.division,
                    numberInClass: student.numberInClass
                }, function (err) {
                    if (err) {
                        console.log(err);
                    }
                });
            },

            createStudent: function (student) {
                new StudentModel(student).save(function (err) {
                    if (err) {
                        console.log(err);
                    }
                });
            },

            getStudent: function (studentId, callback) {
                StudentModel.findOne({"_id": studentId}, callback);
            },

            addBookCopy: function (bookId, inventoryNumber, callback) {
                BookModel.update({
                    _id: bookId
                }, {
                    $push: {
                        copies: inventoryNumber
                    }
                }, callback);
            },

            dropStudents: function () {
                StudentModel.remove({}, function (err) {
                    console.log('collection removed')
                });
            },

            createLoan: function (loan, callback) {
                debugger;
                new LoanModel(loan).save(callback);
            },

            updateLoan: function (loan, callback) {
                LoanModel.update({"_id": loan._id}, {
                    student: loan.student,
                    copy   : loan.copy,
                    endDate: loan.endDate
                }, function (err) {
                    if (err) {
                        console.log(err);
                    }
                });
            },

            getLoans: function (callback) {
                LoanModel.find({}).sort({endDate: "asc"}).exec(callback);
            },

            getLoansOfStudent: function (studentId, callback) {
                LoanModel.find({student: studentId}, callback);
            },

            extendLoan: function (loanId, returnDate, callback) {
                LoanModel.update({_id: loanId}, {
                    $set: {
                        endDate: returnDate
                    }
                }, function (err) {
                    callback(err, returnDate)
                });
            },

            dropLoans: function () {
                LoanModel.remove({}, function (err) {
                    console.log('collection removed')
                });
            },

            terminateLoan: function (loanId, callback) {
                LoanModel.remove({_id: loanId}, callback);
            }

        };
    }

    return {
        getInstance: function () {
            if (!manager) {
                manager = createInstance();
            }
            return manager;
        }
    };
})();


module.exports = DataManager;