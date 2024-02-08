import { BaseService }from "./base.service";

export class BankService extends BaseService {
  async getBanks() {
    const baseUrl = `${process.env.API_AFFILIATE}/banks`;

    try {
      return await this.get(baseUrl);
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
