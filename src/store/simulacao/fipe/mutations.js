export const UPDATE_BRANDS = "UPDATE_BRANDS//SIMULATION";
export const UPDATE_MODELS = "UPDATE_MODELS//SIMULATION";
export const UPDATE_YEARS = "UPDATE_YEARS//SIMULATION";
export const UPDATE_VEHICLES_TYPES = "UPDATE_VEHICLES_TYPES//SIMULATION";
export const CLEAN_VEHICLE = "CLEAN_VEHICLE//SIMULATION";
export const CREATE_UPDATE_VEHICLE = "CREATE_UPDATE_VEHICLE//SIMULATION";
export const CAPTURE_CHASSI = "CREATE_CHASSI//SIMULATION";

export default {
  [UPDATE_VEHICLES_TYPES](state, payload = []) {
    state.types = payload;
  },
  [UPDATE_BRANDS](state, payload = []) {
    state.brands = payload;
  },
  [UPDATE_MODELS](state, payload = []) {
    state.models = payload;
  },
  [UPDATE_YEARS](state, payload = []) {
    state.years = payload;
  },
  [CREATE_UPDATE_VEHICLE](state, {
    brand = "",
    model = "",
    year = "",
    vehicleType = "",
    valueEntrance = "",
    marketValue = "",
    hasInstallmentEntrance = 'no',
    status = "",
    plate = "",
    color = "",
  }) {
    state.vehicle = {
      brand,
      model,
      year,
      marketValue,
      status,
      plate,
      color,
      vehicleType,
      valueEntrance,
      hasInstallmentEntrance
    };
  },

  [CLEAN_VEHICLE](state) {
    state.vehicle = {
      brand: "",
      model: "",
      year: "",
      marketValue: 0,
      status: "",
      plate: "",
      color: "",
    };
  },
  [CAPTURE_CHASSI](state, chassi) {
    state.vehicle = {
      ...state.vehicle,
      chassi,
    };
  },
};
