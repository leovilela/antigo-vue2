import {
  CAPTURE_CHASSI,
  CLEAN_VEHICLE,
  CREATE_UPDATE_VEHICLE,
  UPDATE_BRANDS,
  UPDATE_MODELS,
  UPDATE_VEHICLES_TYPES,
  UPDATE_YEARS
} from "./mutations";

export default {
  async getFipeBrands({ commit }, payload) {
    try {
      const simulation = await this.$services.simulation.getFipeBrands(
        payload.vehicleTypeId,
        payload.zeroKm,
      );
      commit(UPDATE_BRANDS, simulation);
      return simulation;
    } catch (error) {
      throw error;
    }
  },
  createVehicle({ commit }, payload) {
    commit(CREATE_UPDATE_VEHICLE, payload);
  },
  cleanState({ commit }) {
    commit(UPDATE_BRANDS, []);
    commit(UPDATE_MODELS, []);
    commit(UPDATE_YEARS, []);
    commit(CLEAN_VEHICLE);
  },
  async getFipeModels({ commit }, { brandId, vehicleId, zeroKm }) {
    try {
      const simulation = await this.$services.simulation.getFipeModels(brandId, vehicleId, zeroKm);
      commit(UPDATE_MODELS, simulation);
      return simulation;
    } catch (error) {
      throw error;
    }
  },
  async getFipeYears({ commit }, { id, zeroKm }) {
    try {
      const simulation = await this.$services.simulation.getFipeYears(id, zeroKm);
      commit(UPDATE_YEARS, simulation);
      return simulation;
    } catch (error) {
      throw error;
    }
  },
  async getFipeVehiclesTypes({ commit, state }) {
    try {
      const simulation = await this.$services.simulation.getFipeVehiclesTypes();
      commit(UPDATE_VEHICLES_TYPES, simulation);
      return simulation;
    } catch (error) {
      throw error;
    }
  },
  async createChassi({ commit }, payload) {
    try {
      await this.$services.simulation.sendChassi({ ...payload });
      commit(CAPTURE_CHASSI, payload.number);
    } catch (error) {
      throw error;
    }
  },
};
