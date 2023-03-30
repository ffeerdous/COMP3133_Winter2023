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
}
