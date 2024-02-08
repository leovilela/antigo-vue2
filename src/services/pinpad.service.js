import { BaseService }from "./base.service";
import pinpad from "../utils/endpoints/pinpad";

export class PinPadService extends BaseService {
  async isPinpadConnected(affiliateId) {
    try {
      const response = await this.get(pinpad.base(affiliateId));
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
