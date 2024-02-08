export default {
  states: (countryId = 1) => `${process.env.API_CEP}/ZipCode/country/${countryId}/states`,
  cities: stateID => `${process.env.API_CEP}/ZipCode/state/${stateID}/cities`,
  address: (postalCode) => `${process.env.API_CEP}/${postalCode}`,
  city: (cityId) => `${process.env.API_CEP}/city/${cityId}/`,
};
