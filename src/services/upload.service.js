/* eslint-disable no-underscore-dangle */

import { BaseService }from "./base.service";

export class UploadService extends BaseService {
  // eslint-disable-next-line no-useless-constructor
  constructor($axios) {
    super($axios);
    this.options = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
  }

  async uploadFile(file, documentType) {
    const fileUploadFormData = new FormData();
    fileUploadFormData.append("file", file);
    fileUploadFormData.append("type", documentType);
    await this._fileUpload(`${process.env.API_AFFILIATE}/affiliates/files`, fileUploadFormData);
  }

  async uploadFilesReport(file, type, contractId) {
    const fileUploadFormData = new FormData();
    fileUploadFormData.append("file", file);
    fileUploadFormData.append("type", type);
    await this._fileUpload(`${process.env.API_ACCOUNT}/File/Vehicle/Contract/${contractId}`, fileUploadFormData);
  }

  async _fileUpload(url, fileUploadFormData) {
    try {
      return await this.post(url, fileUploadFormData, this.options);
    } catch (error) {
      throw error;
    }
  }
}
