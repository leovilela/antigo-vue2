export const getBlock = (state) => (name) => state.blocks.find(block => block.name === name)

export const steps = (state, _, rootState) => {
  const LEGAL_PERSON_ID = 2;

  if (rootState.affiliate.affiliate.affiliationTypeID === LEGAL_PERSON_ID) {
    return state.stepsLegalFlow;
  }
  return state.stepsPersonFlow;
}
