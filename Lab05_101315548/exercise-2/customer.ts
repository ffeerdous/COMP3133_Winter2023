class Customer{
    firstname: string;
    lastname: string;

    public greeter(){
        console.log(`Hello ${this.firstname} ${this.lastname}`);
    }
}

let customer = new Customer();
customer.firstname = "John";
customer.lastname = "Smith";

customer.greeter();