import { MongoDataSource } from "apollo-datasource-mongodb";

export default class Employees extends MongoDataSource {
  async getEmployees() {
    return await this.model.find();
  }
  async getEmployee(_id) {
    return await this.model.findOne({ _id: _id });
  }
  async createEmployee({ firstName, lastName, emailID }) {
    return await this.model.create({ firstName, lastName, emailID });
  }
  async updateEmployee({ _id, firstName, lastName, emailID }) {
    return await this.model.updateOne(
      { _id: _id },
      { firstName, lastName, emailID }
    );
  }
  async deleteEmployee(_id) {
    return await this.model.deleteOne({
      _id: _id,
    });
  }
}
