import { BaseService }from "./base.service";
import cep from "../utils/endpoints/cep";

export class CepService extends BaseService {
  async getStates() {
      return this.get(cep.states());
  }

  async getAddress(postalCode) {
    return this.get(cep.address(postalCode))
  }

  async getCities(stateID) {
    return this.get(cep.cities(stateID));
  }
  async getStates(countryID = 1) {
    return this.get(cep.states(countryID))
  }
}
