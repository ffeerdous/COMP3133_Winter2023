const Employee = require('./models/Employee');
const { merge } = require('lodash');
const User = require('./models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const resolver1 = {
    Query: {
        getEmployees: async (parent, args) => {
            return Employee.find({})
        },
        getEmployeeByID: async (parent, args) => {
            return Employee.findById(args.id)
        },
        getEmployeeByGender: async (parent, args) => {
            return Employee.find({"gender" : args.gender})
        }
    },

    Mutation: {
        addEmployee: async (parent, args) => {
            console.log(args)

            let newEmp = new Employee({
                firstname: args.firstname,
                lastname: args.lastname,
                email: args.email,
                gender: args.gender,
                city: args.city,
                designation: args.designation,
                salary: args.salary
            })

            return newEmp.save()
        },
        updateEmployee: async (parent, args) => {
            console.log(args)
            if (!args.id){
                return;
            }

            return await Employee.findOneAndUpdate(
            {
                _id: args.id
            },
            {
                $set: {
                    firstname: args.firstname,
                    lastname: args.lastname,
                    email: args.email,
                    gender: args.gender,
                    city: args.city,
                    designation: args.designation,
                    salary: args.salary
                }
            }, {new: true}, (err, employee) => {
                if (err) 
                {
                    console.log('Something went wrong when updating the employee');
                } else 
                {
                    return employee
                }
            }
        );
      },
      deleteEmployee: async (parent, args) => {
        console.log(args)
        if (!args.id){
            return JSON.stringify({status: false, "message" : "No ID found"});
        }
        return await Employee.findByIdAndDelete(args.id)
      }
    }
}

const resolver2 = {
    Query: {
        login: async (_, { username, password }) => {
            const user = await User.findOne({ username });
            if (!user) {
              throw new Error('Invalid login credentials');
            }
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
              throw new Error('Invalid login credentials');
            }
            return { user};
          }
    },

    Mutation: {
        signup: async (_, { username, email, password }) => {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({ username, email, password: hashedPassword });
            return { user };
        }
    }
}

const resolvers = merge(resolver1, resolver2);
module.exports = resolvers;