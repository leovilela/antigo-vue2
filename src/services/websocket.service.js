import {
  HubConnectionBuilder,
  LogLevel,
} from "@aspnet/signalr";

import account from "../utils/endpoints/account";

export class WebSocketService {
  constructor() {
    this.connection = null;
  }

  getConnection(cpf) {
    const connection = new HubConnectionBuilder()
      .withUrl(`${account.notification.register}/?key=${cpf}`)
      .configureLogging(LogLevel.Information)
      .build();
    this.connection = connection;
    return connection;
  }

  getConnectionClickSign(cpf) {
    const connection = new HubConnectionBuilder()
      .withUrl(`${process.env.API_SIGNATURE}/notificationClickSign?signerKey=${cpf}`)
      .configureLogging(LogLevel.Information)
      .build();
    this.connection = connection;
    return connection;
  }
}
