import { gql } from "apollo-server";

export default gql`
  type Employee {
    _id: String
    firstName: String!
    lastName: String!
    emailID: String!
  }
  type MongoUpdateResult {
    acknowledged: Boolean
    modifiedCount: Int
    upsertedId: String
    upsertedCount: Int
    matchedCount: Int
  }
  type MongoDeleteResult {
    acknowledged: Boolean
    deletedCount: Int
  }

  type Query {
    getEmployees: [Employee]
    getEmployee(_id: String): Employee!
  }
  type Mutation {
    createEmployee(
      firstName: String!
      lastName: String!
      emailID: String!
    ): Employee!

    updateEmployee(
      _id: String
      firstName: String!
      lastName: String!
      emailID: String
    ): MongoUpdateResult

    deleteEmployee(_id: String): MongoDeleteResult
  }
`;
