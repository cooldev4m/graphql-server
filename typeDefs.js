import { gql } from "apollo-server";

export default gql`
  type Employee {
    firstName: String!
    lastName: String!
    emailID: String!
  }

  type Query {
    employees: [Employee!]
    getEmployee(firstName: String): Employee!
  }
  type Mutation {
    createEmployee(
      firstName: String!
      lastName: String!
      emailID: String!
    ): Employee!
  }
`;
