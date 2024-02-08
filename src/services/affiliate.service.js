import { BaseService }from "./base.service";
import affiliate from "../utils/endpoints/affiliate";
import https from "https";

export class AffiliateService extends BaseService {
  async getContacts() {
    return this.get(affiliate.affiliates.contacts());
  }

  async getResponsiblePicture(userId) {
    return this.get(`${affiliate.affiliates.picture()}?userId=${userId}`, { responseType: "arraybuffer", getHeaders: true });
  }

  async getResponsible() {
    return this.get(affiliate.affiliates.responsible());
  }

  async getAffiliates() {
    return this.get(affiliate.affiliates.base());
  }

  async getBanks() {
    return await this.get(affiliate.banks.banks());
  }
}
