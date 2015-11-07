var Book = require("./book.js");
var DataManager = (function () {
    var manager;

    function createInstance() {
        return {
            getBooks: function() {
                return [
                    new Book("360 градуса преди края", "Силвия", "Дончева"),
                    new Book("Аз, детективът-нобелист", "Георги", "Спиров"),
                    new Book("Атомният човек", "Любен", "Дилов"),
                    new Book("Без сенки", "Атанас", "Наковски")
                ]
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