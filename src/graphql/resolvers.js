export default {
  Query: {
    getEmployees: async (_, _args, context) => {
      return context.dataSources.employees.getEmployees();
    },
    getEmployee: async (_, { _id }, { dataSources: { employees } }) => {
      return employees.getEmployee(_id);
    },
  },
  Mutation: {
    createEmployee: (_, args, { dataSources: { employees } }, _info) => {
      return employees.createEmployee(args);
    },
    updateEmployee: (_, args, { dataSources: { employees } }, _info) => {
      return employees.updateEmployee(args);
    },
    deleteEmployee: (_, { _id }, { dataSources: { employees } }, _info) => {
      return employees.deleteEmployee(_id);
    },
  },
};
