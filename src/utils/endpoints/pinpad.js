export default {
  base: affiliateId => `${process.env.CONNECTOR_HTTPS}/pinpad/status/?affiliate=${affiliateId}`,
};
