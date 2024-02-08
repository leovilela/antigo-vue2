export default {
  customerData: {
    function: () => `${process.env.API_CUSTOMER_DATA}/Function`,
    profession: () => `${process.env.API_CUSTOMER_DATA}/Profession/GetOccupations`,
    maritalStatus: () => `${process.env.API_CUSTOMER_DATA}/MaritalStatus`,
  },
};
