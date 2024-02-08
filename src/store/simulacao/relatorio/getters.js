export default {
  clientID(state) {
    return selectedClientID => state.reportsFinancing.find(reportFinancing => reportFinancing.registerLoanId === selectedClientID);
  },
};
