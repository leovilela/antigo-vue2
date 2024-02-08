import { BaseService }from "./base.service";
import endpoints from '../utils/endpoints/customerData'

const { customerData } = endpoints


export class CustomerDataService extends BaseService {

  async getFunction() {
    return this.get(customerData.function())
  }

  async getProfession() {
    return this.get(customerData.profession())
  }

  async getMaritalStatus() {
    return this.get(customerData.maritalStatus())
  }


}
