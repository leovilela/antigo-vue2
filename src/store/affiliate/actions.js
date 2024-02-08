
import profileImage from "~/assets/img/profile.jpg";
import {
  GET_AFFILIATE,
  GET_AFFILIATECONTACT,
  CLEAR_AFFILIATE,
  GET_AFFILIATE_RESPONSIBLE,
  GET_AFFILIATE_RESPONSIBLE_PICTURE,
  GET_BANKS,
} from "./mutations";

export default {
  async getContacts({ commit }) {
    try {
      const contacts = await this.$services.affiliate.getContacts();
      if (!contacts) {
        return Promise.reject("Contatos do afiliado não encontrado");
      }
      commit(GET_AFFILIATECONTACT, contacts);
      return Promise.resolve(contacts);
    } catch (error) {
      if (error.status === 204) {
        return
      }
      throw error
    }
  },

  async getResponsible({ commit, dispatch }) {
    try {
      const responsible = await this.$services.affiliate.getResponsible();
      commit(GET_AFFILIATE_RESPONSIBLE, responsible);
      await dispatch('getResponsiblePicture')
      return Promise.resolve(responsible);
    } catch (error) {
      if (error.status === 204) {
        return
      }
      throw error
    }
  },

  async getResponsiblePicture({ commit, state }) {
    if (state.responsible.picture) {
      return
    }
    try {
      const response = await this.$services.affiliate.getResponsiblePicture(state.responsible.userId);
      const image = btoa(
        new Uint8Array(response.data)
          .reduce((data, byte) => data + String.fromCharCode(byte), ""),
      );
      const imgDataUrl = response.headers["content-type"] ? `data:${response.headers["content-type"].toLowerCase()};base64,${image}` : profileImage;
      commit(GET_AFFILIATE_RESPONSIBLE_PICTURE, imgDataUrl);
      return Promise.resolve(imgDataUrl);
    } catch (error) {
      if (error.status === 204) {
        return
      }
      throw error
    }
  },

  async getBanks({ commit, dispatch }) {
    const banks = await this.$services.affiliate.getBanks();
    if (!banks) {
      return Promise.reject("Erro na listagem de bancos");
    }

    commit(GET_BANKS, banks);
    return Promise.resolve(banks)
  },

  async getAffiliate({ commit, dispatch }) {
    const affiliates = await this.$services.affiliate.getAffiliates();
    if (!affiliates) {
      return Promise.reject("Afiliado não encontrado");
    }

    commit(GET_AFFILIATE, affiliates);
    return Promise.resolve(affiliates)
  },
  async clearTransactionTypes({ commit }) {
    commit(CLEAR_AFFILIATE, []);
  },
};
