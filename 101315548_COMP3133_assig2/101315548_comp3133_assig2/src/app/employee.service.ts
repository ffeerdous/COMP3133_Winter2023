import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { HttpLink, ApolloLink, ApolloClient, InMemoryCache, ApolloQueryResult } from '@apollo/client';
import { Observable, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private client: ApolloClient<any>;

  constructor() {
    const httplink = new HttpLink({
      uri: 'http://localhost:4000/graphql'
    });

    const link = ApolloLink.from([httplink])

    this.client = new ApolloClient({
      link,
      cache: new InMemoryCache()
    })
   }

   // Gets All the Employees
  getEmployees(): Observable<any>{
    return from(
      this.client.query({
        query: gql`
          query {
            getEmployees {
              firstname
              lastname
              email
              city
              designation
              gender
              salary
            }
          }
        `
      })
    ).pipe(
      map((result: ApolloQueryResult<any>) => result.data ? result.data.getEmployees : null)
    );
  }

  // Adds new employees
  addEmployee(firstname: string, lastname: string, email: string, gender: string, city: string, designation: string,  salary: number): Observable<any> {
    const mutation = gql`
      mutation AddEmployee($firstname: String!, $lastname: String!, $email: String!, $gender: String!, $city: String!, $designation: String!, $salary: Float!) {
        addEmployee(firstname: $firstname, lastname: $lastname, email: $email, gender: $gender, city: $city, designation: $designation, salary: $salary) {
          firstname
          lastname
          email
          gender
          city
          designation
          salary
        }
      }   
    `;
  
    return from(
      this.client.mutate<any>({
        mutation: mutation,
        variables: {
          firstname: firstname,
          lastname: lastname,
          email: email,
          gender: gender,
          city: city,
          designation: designation,
          salary: salary
        }
      }).catch(error => {
        console.log(error);
        throw error;
      })
    ).pipe(
      map(result => result.data.addEmployee)
    );
  }

  //Delete Employee
  deleteEmployee(id: string): Observable<any> {
    const mutation = gql`
      mutation DeleteEmployee($deleteEmployeeId: String!) {
        deleteEmployee(id: $deleteEmployeeId) {
          id
        }
      }
    `;
  
    return from(
      this.client.mutate<any>({
        mutation: mutation,
        variables: {
          deleteEmployeeId: id
        }
      }).catch(error => {
        console.log(error);
        throw error;
      })
    ).pipe(
      map(result => result.data.deleteEmployee)
    );
  }

  //Login
  login(username: string, password: string): Observable<any> {
    const query = gql`
      query login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
          user {
            username
            password
          }
        }
      }
    `;
    
    return from(
      this.client.query<any>({
        query: query,
        variables: {
          username: username,
          password: password
        }
      }).catch(error => {
        console.log(error);
        throw error;
      })
    ).pipe(
      map(result => result.data.login)
    );
  }

  //sign up
  signup(username: string, email: string, password: string): Observable<any> {
    const mutation = gql`
      mutation Signup($username: String!, $email: String!, $password: String!) {
        signup(username: $username, email: $email, password: $password) {
          user {
            username
            email
            password
          }
        }
      }
    `;
  
    return from(
      this.client.mutate<any>({
        mutation: mutation,
        variables: {
          username: username,
          email: email,
          password: password
        }
      }).catch(error => {
        console.log(error);
        throw error;
      })
    ).pipe(
      map(result => result.data.signup)
    );
  }

}
