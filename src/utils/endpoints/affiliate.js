export default {
  affiliates: {
    contacts: () => `${process.env.API_AFFILIATE}/affiliates/contacts`,
    picture: () => `${process.env.API_AFFILIATE}/affiliates/ProfilePicture`,
    base: () => `${process.env.API_AFFILIATE}/affiliates`,
    responsible: () => `${process.env.API_AFFILIATE}/affiliates/responsible`,    
  },
  banks: {
    banks: () => `${process.env.API_AFFILIATE}/banks`,
  }
};
