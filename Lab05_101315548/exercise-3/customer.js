var Customer = /** @class */ (function () {
    function Customer(firstname, lastname) {
        this.firstname = firstname;
        this.lastname = lastname;
    }
    Customer.prototype.greeter = function () {
        console.log("Hello ".concat(this.firstname, " ").concat(this.lastname));
    };
    return Customer;
}());
var customer = new Customer("John", "Smith");
customer.greeter();
