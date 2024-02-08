import { BaseService }from "./base.service";
import account from "../utils/endpoints/account";
import fipe from "../utils/endpoints/fipe";
import { format } from "money-formatter";

export class SimulationService extends BaseService {
  async savePreRegistration(registration) {
    try {
      return await this.post(
        `${account.client.base}`,
        registration,
      );
    } catch (error) {
      throw error;
    }
  }

  async updateContacts(clientId, { cellPhone, email }) {
    try {
      await this.put(account.client.contacts(clientId), { cellPhone, email });
    } catch (error) {
      throw error;
    }
  }

  async resendSMSToClient(cpf, sendTypes) {
    try {
      return await this.post(`${account.client.resendSMS(cpf)}`, { sendType: sendTypes });
    } catch (error) {
      throw error;
    }
  }

  async getClientValid(cpf) {
    try {
      return await this.get(account.client.clientValid(cpf));
    } catch (error) {
      throw error;
    }
  }

  async hasClientRestrictions(cpf) {
    try {
      return await this.get(account.client.hasRestriction(cpf));
    } catch (error) {
      throw error;
    }
  }

  async getFipeBrands(vehicleTypeId, zeroKm) {
    try {
      return await this.get(fipe.brands(vehicleTypeId, zeroKm));
    } catch (error) {
      throw error;
    }
  }

  async getFipeVehiclesTypes() {
    try {
      return await this.get(fipe.VehicleTypes());
    } catch (error) {
      throw error;
    }
  }

  async getFipeModels(brandId, vehicleId, zeroKm) {
    try {
      return await this.get(
        fipe.models(brandId, vehicleId, zeroKm),
      );
    } catch (error) {
      throw error;
    }
  }

  async getFipeYears(modelId, zeroKm) {
    try {
      return await this.get(fipe.years(modelId, zeroKm));
    } catch (error) {
      throw error;
    }
  }

  mapInstallments(separatedSimulation, price) {
    return separatedSimulation.map((foundedValue) => {
      const installment = this.getInstallment(
        price,
        foundedValue,
      );

      return {
        text: `${installment.installmentText}x`,
        totalPrice: format("BRL", this.calculateTotals(installment.installmentValue, installment.installmentText)),
        price: format("BRL", installment.installmentValue),
        ...installment,
      };
    });
  }

  mapDownPayInstallments(separatedDownPay, downPayment) {
    return separatedDownPay
      .filter(
        downPayValue => downPayValue.rType === 0 && [1, 6, 12].includes(downPayValue.installmentModeId),
      )
      .map((foundedValue) => {
        const installment = this.getInstallment(
          downPayment,
          foundedValue,
        );

        return {
          text: `${installment.installmentText}x`,
          price: format("BRL", installment.installmentValue),
          totalPrice: format("BRL", this.calculateTotals(installment.installmentValue, installment.installmentText)),
          ...installment,
        };
      });
  }

  async sendChassi(data) {
    try {
      return await this.post(`${account.form.chassi()}`, data);
    } catch (error) {
      throw error;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  calculateTotals(price, parcels) {
    return parcels * price;
  }

  // eslint-disable-next-line class-methods-use-this
  getInstallment(value, otherValue) {
    let installmentText = otherValue.installmentModeId;
    const installmentValue = value * otherValue.coefficient;
    if (installmentText < 10) {
      installmentText = `0${installmentText}`;
    }

    return { installmentText, installmentValue, ...otherValue };
  }
}
