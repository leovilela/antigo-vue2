import { BaseService }from "./base.service";
import detran from "../utils/endpoints/detran";

export class DetranService extends BaseService {
  async getListDebits(payload) {
    try {
      return await this.get(`${detran.listDebits(payload)}`);
    } catch (error) {
      throw error;
    }
  }

  async getCheckBlockTime() {
    try {
      return await this.get(`${detran.checkBlockTime()}`);
    } catch (error) {
      throw error;
    }
  }

  async getRequiredFields() {
    try {
      return await this.get(`${detran.requiredFields()}`);
    } catch (error) {
      throw error;
    }
  }

  async newPayment(payload) {
    try {
      const dataDetran = this.$store.state.detran;
      const tributosData = [];
      dataDetran.boletos.forEach((val, index) => {
        tributosData.push(val);
      });
      const idTransaction = payload;
      const placa = dataDetran.placa ? dataDetran.placa : dataDetran.generalData.placa;
      const cpfCnpj = dataDetran.cpfCnpj ? `${dataDetran.cpfCnpj}` : null;
      const valorVenalVar = dataDetran.generalData.valorVenal ? `${dataDetran.generalData.valorVenal}` : null;
      const chassiVar = dataDetran.generalData.chassi ? `${dataDetran.generalData.chassi}` : null;
      const objc = {
        state: dataDetran.estado,
        transactionId: `${idTransaction.payload.id}`,
        detranData: {
          valorVenal: valorVenalVar,
          chassi: chassiVar,
          ano: `${dataDetran.generalData.ano}`,
          placa: `${placa}`,
          proprietarioDocumento: cpfCnpj,
          cor: dataDetran.generalData.cor,
          marca: dataDetran.generalData.marca,
          renavam: `${dataDetran.generalData.renavam}`,
          mensagem: dataDetran.generalData.mensagem,
          tributos: tributosData,
          proprietario: dataDetran.generalData.proprietario,
          municipioEmplacamento: dataDetran.generalData.municipioEmplacamento,
          restricao: dataDetran.generalData.restricao,
          roubo: dataDetran.generalData.roubo,
          situacao: dataDetran.generalData.situacao,
          ultimoLicenciamento: dataDetran.generalData.ultimoLicenciamento,
          holderEmail: `${dataDetran.email}`,
          fee: `${dataDetran.fee}`,
        },
      };
      return await this.post(`${detran.newPayment()}`, objc);
    } catch (error) {
      throw error;
    }
  }

  async getReportDetran(requestObj) {
    try {
      return await this.post(`${report.list.financing}`, requestObj, {
        headers: {
          "Access-Control-Expose-Headers": "X-Pagination",
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
