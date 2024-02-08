/* eslint-disable func-names */
/* eslint-disable no-extend-native */
Date.prototype.toLocalISOString = Date.prototype.toLocalISOString || function () {
  return new Date(this.getTime() - (this.getTimezoneOffset() * 60000)).toISOString();
};
