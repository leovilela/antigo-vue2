import { BaseService } from "./base.service";
import client from "../utils/endpoints/client";

export class ClientService extends BaseService {

  async getAllPermissions(canDoTransaction, services) {
    const response = await this.post(client.allPermissions(), {canDoTransaction, services})
    return response.data
  }
  /**
   *
   * @param {string} userId
   */
  async getUserPermissions(userId) {
    const response = await this.get(client.getAffiliateUserDataByAffiliateUserId(userId))
    return response.data.map(permission => permission.code)
  }
}
