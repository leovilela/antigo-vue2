export default {
  VehicleTypes: () => `${process.env.API_FIPE}/Fipe/VehicleTypes`,
  brands: (typeId, zeroKm) => `${process.env.API_FIPE}/Fipe/Brands/VehicleTypes/${typeId}?zeroKm=${zeroKm}`,
  models: (brandId, vehicleId, zeroKm) => `${process.env.API_FIPE}/Fipe/Brands/${brandId}/VehicleTypes/${vehicleId}/Models?zeroKm=${zeroKm}`,
  years: (modelId, zeroKm) => `${process.env.API_FIPE}/Fipe/Models/${modelId}/Years?zeroKm=${zeroKm}`,
};
