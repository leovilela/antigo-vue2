<template>
  <section class="page-financiamentos-auto page-financiamentos-auto--simulacao container-fluid page-financiamentos ">
    <div class="row">
      <div id="pre-cadastro" class="col-xs-12">
        <div class="panel panel-default">
          <div class="panel-heading">
            <span class="buscar-financiamentos">Buscar Comprovantes</span>
          </div>
          <div class="panel-body">
            <Base-Alert type="danger" v-if="$v.filters.$required"> {{$t('alerts.errors.field_errors')}}</Base-Alert>
            <form @submit.prevent="loadItemsReportsDetran">
            <div class="row">
              <div class="col-xs-2">
                <Base-DatePickerGroup :label="$t('labels.relatorios.dataInicial')" id="startDate" v-model.trim="$v.filters.startDate.$model" :class="{'form__field__error': $v.filters.startDate.$required}" :not-after="new Date()" />
                <!-- <template #errors>
                  <div class="error" v-if="!$v.filters.startDate.required">{{$t('documentNumber_obrigatorio')}}</div>
                </template> -->
              </div>
              <div class="col-xs-2">
                <Base-DatePickerGroup :label="$t('labels.relatorios.dataFinal')" id="endDate" v-model.trim="$v.filters.endDate.$model" :class="{'form__field__error': $v.filters.endDate.$required}" :disabled="isEndDateDisabled" :not-before="filters.startDate" :not-after="new Date()" />
                <!-- <template #errors>
                  <div class="error" v-if="!$v.filters.endDate.required">{{$t('documentNumber_obrigatorio')}}</div>
                </template> -->
              </div>
              <div class="col-xs-2">
                <Base-FormGroup :label="$t('labels.relatorios.numeroCPF')" v-mask="['###.###.###-##', '##.###.###/####-##']" id="numero-cpf" name="numero-cpf" type="text" v-model="filters.carOwnerDocument" class="form__input" />
              </div>
              <div class="col-xs-1">
                <Base-FormGroup :label="$t('labels.relatorios.placa')" id="placa"   v-mask="['XXXXXXX']" name="placa" type="text" v-model="filters.plate" class="form__input" />
              </div>
              <div class="col-xs-2">
                <Base-FormGroup :label="$t('labels.relatorios.renavan')" id="carDocument  " name="carDocument" type="text" v-model="filters.carDocument" class="form__input" />
              </div>
              <div class="col-xs-2">
                <label for="statusGroup">{{ $t('labels.relatorios.status') }}</label>
                    <select placeholder="Escolha" v-model="filters.status" id="statusGroup" name="statusGroup">
                        <option
                              v-for="(state, index) in statusGroup.options"
                              :value="state.value"
                              :key="index">
                              {{ state.text }}
                          </option>
                    </select>
              </div>
              <div class="col-xs-1">
                <label for="statusGroup"></label>
                <Base-Button type="submit" :disabled="$v.filters.$invalid">{{$t('buttons.enviar')}}</Base-Button>
              </div>
            </div>
            <div class="row">
              <div class="col-xs-12">
                <transition name="fade">
                  <Base-Modal v-show="isModalFormalizacaoConcluida" class="formalizacao">
                    <template #header>
                      <img src="~assets/img/logo-listo.png" alt="" />
                    </template>
                    <template #body>
                      <h3>Pedido {{nPedido}} concluído com sucesso</h3>
                      <p>Em alguns minutos você receberá o comprovante de quitação de débitos na aba "Relatórios"</p>
                    </template>
                    <template #footer>
                      <Base-Button
                        class="btn-modal-fechar"
                        aria-label="Imprimir"
                        @click="closeModal(); printCoupon();"
                        :disabled="!printButton"
                      >
                        <span v-if="!printButton">Carregando...</span><span v-else>Imprimir</span>
                      </Base-Button>
                      <Base-Button
                        class="btn-modal-fechar"
                        aria-label="Ver relatório"
                        @click="closeModal"
                      >
                        Ver relatório
                      </Base-Button>
                    </template>
                  </Base-Modal>
                </transition>
                <transition name="fade">
                  <Base-Modal v-show="couponDetran" class="couponDetran">
                    <template #body>
                      <div class="couponDiv">
                        <pre id="couponDetran">{{couponDetran}}</pre>
                      </div>
                    </template>
                    <template #footer>
                      <Base-Button
                        class="btn-modal-fechar"
                        aria-label="Imprimir"
                        @click="buttonPrinCoupoun(); couponDetran = false"
                      >
                        Imprimir
                      </Base-Button>
                      <Base-Button
                        class="btn-modal-fechar"
                        aria-label="Fechar"
                        @click="couponDetran = false"
                      >
                        Fechar
                      </Base-Button>
                    </template>
                  </Base-Modal>
                </transition>
                <transition name="fade">
                  <Base-Modal  class="formalizacao" v-show="modalError">
                    <template #header>
                      <!-- img src="~assets/img/logo-listo.png" alt="" /-->
                    </template>
                    <template #body>
                      <h3>Erro no envio!</h3>
                      <p>Favor tentar novamente mais tarde</p>
                    </template>
                    <template #footer>
                      <Base-Button
                        class="btn-modal-fechar"
                        aria-label="Cancelar"
                        @click="modalError = false"
                      >
                        Fechar
                      </Base-Button>
                    </template>
                  </Base-Modal>
                </transition>
                <transition name="fade">
                  <Base-Modal  class="formalizacao" v-show="isModalSendEmail && !modalError">
                    <template #header>
                      <img src="~assets/img/logo-listo.png" alt="" />
                    </template>
                    <template #body>
                      <h3>Enviar e-mail</h3>
                      <p>Enviar comprovante de pagamento para o e-mail:</p>
                      <p><strong>{{holderEmail}}</strong></p>
                    </template>
                    <template #footer>
                      <Base-Button
                        class="btn-modal-fechar"
                        aria-label="Cancelar"
                        @click="isModalSendEmail = false"
                      >
                        Cancelar
                      </Base-Button>
                      <Base-Button
                        class="btn-modal-fechar"
                        aria-label="Enviar e-mail"
                        @click="sendEmail"
                      >
                        Enviar
                      </Base-Button>
                    </template>
                  </Base-Modal>
                </transition>
                <transition name="fade">
                  <Base-Modal  class="formalizacao" v-show="sucessSendMail && !modalError">
                    <template #header>
                      <img src="~assets/img/logo-listo.png" alt="" />
                    </template>
                    <template #body>
                      <h3>E-mail enviado com Sucesso!</h3>
                    </template>
                    <template #footer>
                      <Base-Button
                        class="btn-modal-fechar"
                        aria-label="Cancelar"
                        @click="sucessSendMail = false"
                      >
                        Fechar
                      </Base-Button>

                    </template>
                  </Base-Modal>
                </transition>
              </div>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <div class="col-xs-2">
          <p class="exportar-resultados">{{$t('labels.relatorios.exportarResultados')}}:</p>
        </div>
        <div class="col-xs-2">
          <Base-Button :disabled="comprovantes" class="btn-pdf" @click="reportURL('pdf')">
            <img src="~/assets/img/ico-pdf-pq.png" class="btn-icon" />
            {{$t('buttons.pdf')}}
          </Base-Button>
        </div>
        <div class="col-xs-2">
          <Base-Button :disabled="comprovantes" class="btn-excel" @click="reportURL('excel')">
            <img src="~/assets/img/ico-excel-pq.png" class="btn-icon" />
            {{$t('buttons.excel')}}
          </Base-Button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <div class="panel panel-default">
          <div class="panel-heading">
            <div class="resultados">{{$t('titles.resultados')}}</div>
            <div class="icon-ccw clickable" @click="updateClient">Atualizar</div>
          </div>
          <div class="panel-body panel-resultados">
            <Base-Table editTableRows
              actions :rows="filterRows" :columns="columns" ref="table" >
              <template #default="{ props }">
                <div v-if="props.column.field === 'actions'">
                  <i @click="exportPDF(props)" v-tooltip.top="'Baixar PDF'" class="icon-pdf clickable" v-if="props.row.status == 'Concluído'"></i>
                  <i @click="openSendEmail(props)" class="glyphicon glyphicon-envelope clickable"  v-tooltip.left="'Enviar e-mail'" v-if="props.row.status == 'Concluído' && !!props.row.holderEmail"></i>
                </div>
                <span v-else>
                  {{props.formattedRow[props.column.field]}}
                </span>
              </template>
            </Base-Table>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
/* eslint-disable vue/no-side-effects-in-computed-properties */
import * as dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import Printd from "printd";
import {
  required,
} from "vuelidate/lib/validators";
import { mapActions, mapState, mapMutations } from "vuex";
import {
  showNumberAsCurrency,
} from "~/utils/currency.utils";

dayjs.extend(isBetween);

export default {
  name: "app",
  data() {
    return {
      printButton: false,
      isModalFormalizacaoConcluida: false,
      sucessSendMail: false,
      modalError: false,
      isModalSendEmail: false,
      couponDetran: false,
      objcEmail: {},
      name: "",
      nPedido: "123456",
      holderEmail: "",
      comprovantes: true,
      filters: {
        startDate: null,
        endDate: null,
        carOwnerDocument: null,
        plate: null,
        carDocument: null,
        status: null,
      },
      objStatus: [
        {
          id: null,
          name: "Escolha",
        },
        {
          id: 1,
          name: "Em Processamento",
        },
        {
          id: 2,
          name: "Concluído",
        },
        {
          id: 3,
          name: "Falha no pagamento",
        },
      ],
      columns: [
        {
          label: "Data",
          field: "dateText",
        },
        {
          label: "Descrição",
          field: "description",
        },
        {
          label: "Placa",
          field: "plate",
        },
        {
          label: "Transação",
          field: "idTransaction",
        },
        {
          label: "CPF",
          field: "carOwnerDocument",
        },
        {
          label: "Renavan",
          field: "carDocument",
        },
        {
          label: "Status",
          field: "status",
        },
        {
          label: "Valor",
          field: "operationValue",
          sortable: true,
          formatFn: this.formatFn,
        },
      ],
    };
  },
  validations: {
    filters: {
      startDate: {
        required,
      },
      endDate: {
        required,
      },
    },
  },
  methods: {
    async loadItemsReportsDetran() {
      const carDoc = this.$options.filters.removeMask(this.filters.carOwnerDocument);
      try {
        const requestObject = {
          carOwnerDocument: carDoc,
          plate: this.filters.plate,
          carDocument: this.filters.carDocument,
          status: this.filters.status,
          pageNumber: 1,
          rowsToPage: 9999,
          startDate: dayjs().date(1),
          endDate: dayjs().format(),
        };
        if (this.filters.startDate && this.filters.endDate) {
          requestObject.startDate = this.filters.startDate;
          requestObject.endDate = this.filters.endDate;
        }
        const reportOk = await this.getReportDetran(requestObject);
        this.rows = this.rowsDetran;
      } catch (error) {
        this.comprovantes = true;
        this.clearReportDetran();
        console.log({ error });
        if (error.status !== 204) {
          return this.$swal({
            title: "Desculpe",
            text: "Tivemos um problema\n Por favor, tente novamente, se o problema persistir entre em contato com a Listo.",
            icon: "error",
            confirmButtonText: "OK",
            showCloseButton: true,
            customClass: "swal-listo",
          });
        }
      }
    },
    formatFn(value) {
      if (!value) {
        return value;
      }
      return showNumberAsCurrency(value);
    },
    showModal() {
      this.isModalFormalizacaoConcluida = true;
      this.couponDetran = false;
    },
    closeModal() {
      this.isModalFormalizacaoConcluida = false;
    },
    ...mapActions({
      getReportDetran: "detran/relatorio/getReportDetran",
      cleanTransaction: "detran/cleanTransaction",
      clearReportDetran: "detran/relatorio/clearReportDetran",
      getReportDetranFile: "detran/relatorio/getReportDetranFile",
      getReportDetranCoupon: "detran/relatorio/getReportDetranCoupon",
      getReportDetranSendEmail: "detran/relatorio/getReportDetranSendEmail",
      getReportDetranTaxesCoupon: "detran/relatorio/getReportDetranTaxesCoupon",
    }),
    // updateStartDate(value) {
    //   if (!value) {
    //     return;
    //   }
    //   this.filters.startDate = dayjs(this.filters.startDate);
    //   this.loadItemsReportsDetran();
    // },
    // updateEndDate(value) {
    //   if (!value) {
    //     return;
    //   }
    //   this.filters.endDate = dayjs(this.filters.endDate);
    //   this.loadItemsReportsDetran();
    // },
    openSendEmail(value) {
      this.sucessSendMail = false;
      this.modalError = false;
      this.holderEmail = value.row.holderEmail;
      this.isModalSendEmail = true;
      this.objcEmail = {
        operationReferId: value.row.operationReferId,
        scheduleDate: value.row.scheduleDate,
      };
    },
    async sendEmail(value) {
      try {
        const response = await this.getReportDetranSendEmail(this.objcEmail);
        if (response.status === 202) {
          this.isModalSendEmail = false;
          this.sucessSendMail = true;
        }
      } catch (error) {
        this.modalError = true;
        throw (error);
      }
    },
    async reportURL(fileExtensionType) {
      switch (fileExtensionType) {
        case "excel":
          fileExtensionType = 1;
          break;

        case "pdf":
          fileExtensionType = 0;
          break;
      }

      try {
        const status = [];
        status["Em Processamento"] = 0;
        status["Concluído"] = 1;
        status["Falha no pagamento"] = 2;

        const carDoc = this.$options.filters.removeMask(this.filters.carOwnerDocument);

        const requestObject = {
          taxPayer: "",
          carOwnerDocument: carDoc,
          plate: this.filters.plate,
          carDocument: this.filters.carDocument,
          status: this.filters.status,
          pageNumber: 1,
          rowsToPage: 9999,
          startDate: dayjs().date(1),
          endDate: dayjs().format(),
          fileExtension: fileExtensionType,
        };

        if (this.filters.startDate && this.filters.endDate) {
          requestObject.start = this.filters.startDate;
          requestObject.end = this.filters.endDate;
        }

        const response = await this.getReportDetranFile(requestObject);

        const blobURL = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        const disposition = response.headers["content-disposition"].split(";");
        const filename = disposition.filter(x => x.indexOf("filename=") != -1)[0];
        link.href = blobURL;
        link.setAttribute("download", filename.split("=")[1]);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(blobURL);
      } catch (error) {
        throw (error);
      }
    },
    async exportPDF(value) {
      try {
        const requestObject = {
          operationReferID: value.row.operationReferId,
          scheduleDate: value.row.scheduleDate,
          fileExtension: 0,
        };
        const response = await this.getReportDetranCoupon(requestObject);
        const blobURL = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        const disposition = response.headers["content-disposition"].split(";");
        const filename = disposition.filter(x => x.indexOf("filename=") != -1)[0];
        link.href = blobURL;
        link.setAttribute("download", filename.split("=")[1]);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(blobURL);
      } catch (error) {
        throw (error);
      }
    },
    async buttonPrinCoupoun() {
      const p = new Printd();
      const element = document.getElementById("couponDetran");
      const css = `
      * {
        -webkit-print-color-adjust: exact !important;
        color-adjust: exact !important;
      }`;

      this.$nextTick(() => {
        p.print(element, [css]);
      });
    },
    async printCoupon(value) {
      try {
        const requestObject = {
          transactionId: this.nPedido,
        };

        const response = await this.getReportDetranTaxesCoupon(requestObject);

        const blb = new Blob([response.data], { type: "text/plain" });
        const reader = new FileReader();

        // This fires after the blob has been read/loaded.
        reader.addEventListener("loadend", (e) => {
          const text = e.srcElement.result;
          this.couponDetran = text;
        });

        // Start reading the blob as text.
        reader.readAsText(blb);

        // console.log(blb);
        // const blobURL = window.URL.createObjectURL(new Blob([response.data]));
        // const link = document.createElement("a");
        // link.href = blobURL;
        // document.body.appendChild(link);
        // link.click();
        // link.remove();
        // window.URL.revokeObjectURL(blobURL);

        // this.couponDetran;
      } catch (error) {
        throw (error);
      }
    },
    btnDetails(value) {
      this.$router.push(`/debitos-veiculares/detran/relatorios/${value.row.idTransaction}`);
    },
    updateClient() {
      this.loadItemsReportsDetran();
    },
  },
  created() {
    this.loadItemsReportsDetran();
  },
  mounted() {
    // this.loadItems();
    // this.loadItemsReportsDetran();

    if (this.transaction.id) {
      setTimeout(() => {
        this.printButton = true;
      }, 10000);
      this.nPedido = this.transaction.id;
      this.showModal();
      setTimeout(() => {
        this.cleanTransaction();
      }, 1000);
    }
  },
  computed: {
    ...mapState({
      transaction: state => state.detran.transaction,
      reportsDetran: state => state.detran.relatorio.reportsDetran.result,
    }),
    statusGroup() {
      return {
        id: "status",
        options: this.objStatus.map(state => ({
          text: `${state.name}`,
          value: state.id,
        })),
      };
    },
    isEndDateDisabled() {
      return !this.filters.startDate;
    },
    rowsDetran() {
      let reportDetran = this.reportsDetran;
      if (!reportDetran) {
        reportDetran = [{
          authenticationCode: null,
          carDocument: null,
          carOwnerDocument: null,
          description: null,
          holderEmail: null,
          idTransaction: null,
          operationReferId: null,
          operationValue: null,
          plate: null,
          requestDateTime: null,
          scheduleDate: null,
          status: null,
          name: null,
        }];
        return reportDetran;
      }
      const reportDetranLength = reportDetran.length;
      this.comprovantes = reportDetran.length > 0 ? false : true;
      return reportDetran
        .map(report => ({
          ...report, date: dayjs(report.scheduleDate), dateText: dayjs(report.scheduleDate).format("DD/MM/YYYY"), idTransaction: report.idTransaction, status: this.objStatus[report.status].name, plate: report.plate, carDocument: report.carDocument,
        }));
    },
    filterRows() {
      const keyFilters = Object.keys(this.filters);
      const rows = [...this.rowsDetran];
      const dateFiltered = false;
      // keyFilters.forEach((keyFilter) => {
      //   if (!this.filters[keyFilter]) return;
      //   if (keyFilter.includes("Date")) {
      //     if (!this.filters.endDate || dateFiltered) return;
      //     rows = rows.filter(row => row.date.isBetween(this.filters.startDate, this.filters.endDate));
      //     dateFiltered = true;
      //     return rows;
      //   }
      //   if (Array.isArray(this.filters[keyFilter]) && this.filters[keyFilter].length > 0) {
      //     // if (this.filters[keyFilter][0] === "Todos") {
      //     //   return;
      //     // }
      //     rows = rows.filter(row => this.filters[keyFilter].includes(row[keyFilter]));
      //   }
      //   rows = rows.filter(row => row[keyFilter].includes(this.filters[keyFilter]));
      // });

      return rows;
    },
  },
  filters: {
    removeMask(value) {
      if (!value) {
        return;
      }
      return value.replace(/[^\d]/g, "");
    },
  },
  // watch: {
  //   filters: {
  //     deep: true,
  //     handler(val) {
  //       if (!val.startDate) {
  //         val.endDate = null;
  //         this.rows = this.rowsDetran;
  //       }
  //       if (val.status === "ESCOLHA") {
  //         this.filters.status = "";
  //       }
  //     },
  //   },
  // },
};
</script>

<style lang="less" scoped>
@import "~assets/vars.less";
@import "~assets/variables.less";
.page-financiamentos {
  .couponDetran{
    pre{
      overflow-y: auto;
      height:500px;
    }
  }
  .clickable {
    cursor: pointer;
  }
  position: relative;
    .travaModal{
      position: absolute;
      width: 100vw;
      height: 100vh;
      background: rgba(0,0,0,0.53333);
      top: 0;
      left: 0;
      z-index: 800;
    }
  .panel {
    &-default {
      .panel-heading {
        background-color: @color1;
        color: @color2;
        justify-content: space-between;
        display: flex;
        .buscar-financiamentos {
          font-family: @mainFontRegular;
          font-size: @ftSizeNormal;
          color: @color2;
        }
        .resultados {
          font-family: @mainFontRegular;
          font-size: @ftSizeNormal;
          color: @color2;
        }
        .icon-ccw {
          font-family: @mainFontRegular;
          font-size: @ftSizeNormal;
          color: @color2;
        }
      }
    }
    .panel-resultados {
      padding: 0;
    }
  }
}
.page-financiamentos-auto {
  margin: 20px 0;
}
.status-list {
  padding-left: 0;
  li:first-child {
    margin-right: 15px;
  }
  li {
    font-size: @ftSizeSmall;
    font-family: @mainFontRegular;
    font-weight: bold;
    list-style-type: none;
    margin-right: 30px;
    display: inline-block;
  }
}
.label {
  font-weight: normal;
}
.exportar-resultados {
  font-size: @ftSizeSmall;
  font-family: @mainFontRegular;
  font-weight: bold;
  margin-left: 10px;
}
.btn-pdf {
  font-size: @ftSizeSmall;
  background: @color2;
  color: @color12;
  text-transform: uppercase;
  border-color: @color12;
  margin-bottom: 20px;
  .btn-icon {
    width: 20px;
    height: 20px;
    display: inline-block;
    vertical-align: bottom;
  }
}
.btn-excel {
  font-size: @ftSizeSmall;
  background: @color2;
  color: @color11;
  text-transform: uppercase;
  border-color: @color11;
  margin-bottom: 20px;
  .btn-icon {
    width: 20px;
    height: 20px;
    display: inline-block;
    vertical-align: bottom;
  }
}
</style>
