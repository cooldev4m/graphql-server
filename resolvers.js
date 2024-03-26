import data from "./data.js";

export default resolvers = {
  Query: {
    employees: () => data.employees,
  },
  Mutation: {
    createEmployee: (_root, args, _context, _info) => {
      const newEmployee = { ...args };
      data.employees.push(newEmployee);
      return newEmployee;
    },
  },
};
