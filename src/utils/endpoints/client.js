export default {
  allPermissions: () => `${process.env.API_CLIENT}/api/AffiliatePermission/GetAll`,
  getAffiliateUserDataByAffiliateUserId: (userId) => `${process.env.API_CLIENT}/api/AffiliatePermission/getByUserId/${userId}`
}
