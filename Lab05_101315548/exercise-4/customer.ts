export class Customer{
    private firstname: string;
    private lastname: string;
    private age: Number;

    constructor(firstname: string, lastname: string, age: Number){
        this.firstname = firstname;
        this.lastname = lastname;
        this.age = age
    }

    public greeter(){
        console.log(`Hello ${this.firstname} ${this.lastname}`);
    }

    public GetAge(){
        console.log(`Age: ${this.age}`)
    }
}

let customer = new Customer("John", "Smith", 25)
customer.greeter()
customer.GetAge()