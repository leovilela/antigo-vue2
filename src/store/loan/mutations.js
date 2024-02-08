
export const UPDATE_BLOCK_MODEL = "UPDATE_BLOCK_MODEL//LOAN"
export const SET_REGISTER_FORM_ID = "SET_REGISTER_FORM_ID//LOAN"
export const SET_BLOCK_ID = "SET_ID//LOAN"
export const SET_REGISTER_FORM_SIGN_KEY = "SET_REGISTER_FORM_SIGN_KEY//LOAN"
export const SIGN_REGISTER_FORM = "SIGN_REGISTER_FORM//LOAN"
export const SET_BLOCKS_AGGREGATION = "SET_BLOCKS_AGGREGATION//LOAN"
export const SET_STATUS_REGISTER = "SET_STATUS_REGISTER//LOAN"
export const SET_STATUS_REGISTER_ID = "SET_STATUS_REGISTER_ID//LOAN"
export const SET_ORDER_REGISTER = "SET_ORDER_REGISTER//LOAN"
export const CLEAN_REGISTER = "CLEAN_REGISTER//LOAN"
export const CLEAN_STATUS = "CLEAN_STATUS//LOAN"
export const SET_HAS_STEP_SAVED = "SET_HAS_STEP_SAVED//LOAN"

export default {
  [UPDATE_BLOCK_MODEL](state, { name, content }) {
    state.blocks = state.blocks.map(block => {
      if (block.name === name) {
        block.model = content
      }
      return block
    })
  },
  [SET_HAS_STEP_SAVED](state) {
    state.hasStepSaved = true
  },
  [SET_REGISTER_FORM_ID](state, id) {
    state.registerFormId = id
  },
  [SIGN_REGISTER_FORM](state) {
    state.regiterFormSigned = true
  },
  [SET_REGISTER_FORM_SIGN_KEY](state, payload) {
    state.registerFormSignKey = payload
  },
  [SET_BLOCK_ID](state, { name, id }) {
    state.blocks = state.blocks.map(block => {
      if (block.name === name) {
        block.id = id
      }
      return block
    })
  },
  [SET_STATUS_REGISTER](state, payload) {
    state.status = payload
  },
  [SET_ORDER_REGISTER](state, payload) {
    state.orderFlow = payload
  },
  [SET_BLOCKS_AGGREGATION](state, payload) {
    state.blocks.blocksAggregation = payload
  },
  [CLEAN_REGISTER](state) {
    state.registerFormId = 0
    state.blocks = [
      {
        name: "registerDataPf",
        model: {},
        order: 1,
      },
      {
        name: "registerDataPj",
        model: {},
        order: 1,
      },
      { name: "spouse", model: {}, order: 2, type: 'personal' },
      { name: "personalAddress", model: {}, order: 3, type: 'personal' },
      { name: "dataProfessional", model: {}, order: 4, type: 'personal' },
      { name: "bankReferences", model: {}, order: 5, type: 'personal' },
      { name: "dataPatrimony", model: {}, order: 6, type: 'personal' },
      { name: "pep", model: {}, order: 7, type: 'both' },
      { name: "shareholder", model: {}, order: 2, type: "legal" },
      { name: "corporatePartnerShareHolder", model: {}, order: 3, type: "legal" },
      { name: "dataPatrimony", model: {}, order: 4, type: "legal" },
      { name: "bankReferences", model: {}, order: 5, type: "legal" },
      { name: "revenues", model: {}, order: 6, type: "legal" },
      { name: "vehicleFinancing", model: {}, order: 7, type: "legal" },
    ];
    state.regiterFormSigned = false
    state.hasStepSaved = false
  },
  [CLEAN_STATUS](state) {
    state.status = {
      completed: false,
      signed: false,
      signedCcbCet: false,
      active: false,
      transaction: false
    };
    state.orderFlow = {
      order: 1,
      position: 1,
    };
  }
}

