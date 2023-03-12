"use strict";
exports.__esModule = true;
exports.Customer = void 0;
var Customer = /** @class */ (function () {
    function Customer(firstname, lastname, age) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.age = age;
    }
    Customer.prototype.greeter = function () {
        console.log("Hello ".concat(this.firstname, " ").concat(this.lastname));
    };
    Customer.prototype.GetAge = function () {
        console.log("Age: ".concat(this.age));
    };
    return Customer;
}());
exports.Customer = Customer;
var customer = new Customer("John", "Smith", 25);
customer.greeter();
customer.GetAge();
