import { AffiliateService } from "./affiliate.service";
import { AuthService } from "./auth.service";
import { BankService } from "./bank.service";
import { CepService } from "./cep.service";
import { ClientService } from "./client.service";
import { CustomerDataService } from "./customerData.service";
import { DetranService } from "./detran.service";
import { LoanService } from "./loan.service";
import { PinPadService } from "./pinpad.service";
import { ReportService } from "./report.service";
import { SimulationService } from "./simulation.service";
import { SwalService } from './swal.service';
import { ToolsService } from "./tools.service";
import { TransactionService } from "./transaction.service";
import { UploadService } from "./upload.service";
import { WebSocketService } from "./websocket.service";

export class Services {
  constructor($axios, $store, $router, $swal) {
    this.auth = new AuthService($axios, $store, $router)
    this.bank = new BankService($axios, $store)
    this.upload = new UploadService($axios, $store)
    this.simulation = new SimulationService($axios, $store)
    this.cep = new CepService($axios, $store)
    this.detran = new DetranService($axios, $store)
    this.transaction = new TransactionService($axios, $store)
    this.affiliate = new AffiliateService($axios, $store)
    this.ws = new WebSocketService()
    this.report = new ReportService($axios)
    this.tools = new ToolsService()
    this.pinpad = new PinPadService($axios)
    this.swal = (title, text) => SwalService($swal, title, text)
    this.loan = new LoanService($axios)
    this.customerData = new CustomerDataService($axios, $store),
    this.client = new ClientService($axios, $store)
  }
}
