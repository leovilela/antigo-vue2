<template>
  <section
    class="page-financiamentos-auto page-financiamentos-auto--simulacao container-fluid"
  >
    <div class="row">
      <div id="report" class="col-xs-12">
        <div class="panel panel-default">
          <div class="panel-heading">
            <span class="buscar-financiamentos">{{
              $t("titles.buscarFinanciamentos")
            }}</span>
          </div>
          <div class="panel-body">
            <div class="row">
              <div class="col-xs-3">
                <Base-DatePickerGroup
                  :label="$t('labels.relatorios.dataInicial')"
                  id="startDate"
                  v-model="filters.start"
                  @change="updateStartDate($event)"
                  :not-before="new Date('2015-01-01')"
                  :not-after="new Date()"
                />
              </div>
              <div class="col-xs-3">
                <Base-DatePickerGroup
                  :label="$t('labels.relatorios.dataFinal')"
                  id="endDate"
                  v-model="filters.end"
                  @change="updateEndDate($event)"
                  :disabled="isEndDateDisabled"
                  :not-before="filters.start"
                  :not-after="new Date()"
                />
              </div>
              <div class="col-xs-4">
                <Base-FormGroup
                  v-mask="['###.###.###-##']"
                  :label="$t('labels.relatorios.numeroCPF')"
                  id="numero-cpf"
                  name="numero-cpf"
                  type="text"
                  v-model="filters.documentNumber"
                  class="form__input"
                  @copy.prevent
                  @paste.prevent
                />
              </div>
              <div class="col-xs-2">
                <Base-Button
                  class="form-button"
                  @click="loadItemsReportsFinancing(filters, true)"
                  >Buscar</Base-Button
                >
              </div>
            </div>
            <div class="row">
              <div class="col-xs-12">
                <ul class="status-list">
                  <li>{{ $t("labels.relatorios.status") }}:</li>
                  <li
                    v-for="contractStatus in contractsStatus"
                    :key="contractStatus.id"
                  >
                    <Base-Checkbox
                      id="filter-carro"
                      v-model="filters.statusList"
                      :native-value="contractStatus.id"
                      >{{ contractStatus.registerLoanStatus }}</Base-Checkbox
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <div class="col-xs-2">
          <p class="exportar-resultados">
            {{ $t("labels.relatorios.exportarResultados") }}:
          </p>
        </div>
        <div class="col-xs-2">
          <Base-Button class="btn-pdf" report @click="reportURL('pdf')">
            <img src="~/assets/img/ico-pdf-pq.png" class="btn-icon" />
            {{ $t("buttons.pdf") }}
          </Base-Button>
        </div>
        <div class="col-xs-2">
          <Base-Button class="btn-excel" report @click="reportURL('excel')">
            <img src="~/assets/img/ico-excel-pq.png" class="btn-icon" />
            {{ $t("buttons.excel") }}
          </Base-Button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <div class="panel panel-default">
          <div class="panel-heading">
            <div class="resultados">{{ $t("titles.resultados") }}</div>
          </div>
          <div class="panel-body panel-resultados">
            <Base-Table
              :rows="rows"
              :columns="columns"
              :totalPages="totalPages"
              :perPage="filters.pageSize"
              :perPageDropdown="perPageDropdown"
              @onPageChange="onPageChange"
              @onPerPageChange="onPerPageChange"
              ref="table"
              editTableRows
              actions
              custom-column="status"
            >
              <template #default="{ props }">
                <div v-if="props.column.field === 'actions'">
                  <i
                    @click="btnDetails(props.row, props.row.registerLoanId)"
                    class="icon-search clickable"
                    v-tooltip.top="'Ver detalhes'"
                  ></i>
                </div>
                <div v-else-if="props.column.field === 'status'">
                  <span
                    v-if="props.row.transactionErrorMessage"
                    v-tooltip.top="props.row.transactionErrorMessage"
                    class="report-status"
                    >{{ props.formattedRow[props.column.field] }}</span
                  >
                  <span v-else>{{
                    props.formattedRow[props.column.field]
                  }}</span>
                </div>
                <span v-else>
                  {{ props.formattedRow[props.column.field] }}
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
import * as dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import utc from "dayjs/plugin/utc";
import Printd from "printd";
import {
  mapState,
  mapActions,
  mapMutations,
} from "vuex";
import { log } from "util";
import { phoneRegexMobile } from "~/utils/regex.utils";
import { validaDocumento } from "~/utils/validate.utils";

dayjs.extend(isBetween);
dayjs.extend(utc);

export default {
  data() {
    return {
      uniqueTableID: 0,
      name: "",
      totalPages: 1,
      perPageDropdown: [20, 30, 40],
      filters: {
        documentNumber: null,
        statusList: [],
        pageNumber: 1,
        pageSize: 20,
        start: dayjs()
          .startOf("month")
          .toDate(),
        end: dayjs().toDate(),
      },
      columns: [
        {
          label: "CPF",
          field: "documentNumber",
          type: "number",
        },
        {
          label: "Automóvel",
          field: "vehicle",
        },
        {
          label: "Placa",
          field: "licensePlate",
        },
        {
          label: "Entrada",
          field: "inputValue",
        },
        {
          label: "Financ.",
          field: "financeValue",
        },
        {
          label: "Data",
          field: "dateText",
        },
        {
          label: "Status",
          field: "status",
        },
      ],
      rows: [],
    };
  },
  validations: {
    filters: {
      documentNumber: {
        validaDocumento,
      },
    },
  },
  destroyed() {
    this.cleanState();
    this.cleanTable();
  },
  methods: {
    ...mapActions({
      getContractStatus: "simulacao/relatorio/getContractStatus",
      getReportFinancing: "simulacao/relatorio/getReportFinancing",
      getReportFinancingFile: "simulacao/relatorio/getReportFinancingFile",
    }),
    ...mapMutations({
      cleanState: "simulacao/relatorio/CLEAN_STATE//REPORT",
      setSelectedContract: "simulacao/relatorio/SET_SELECTED_CONTRACT//REPORT",
      startLoading: "startLoading",
      finishLoading: "finishLoading",
    }),
    async loadContractStatus() {
      try {
        this.startLoading();
        await this.getContractStatus();
        this.filters.statusList = this.contractsStatus.map(cs => cs.id);
      } catch (error) {
        this.cleanState();
      } finally {
        this.finishLoading();
      }
    },
    async loadItemsReportsFinancing(
      requestObject = this.filters,
      resetPageNumber = false,
    ) {
      try {
        // this.uniqueTableID += 1;
        this.startLoading();
        const filterRequestObject = { ...requestObject };
        filterRequestObject.documentNumber = filterRequestObject.documentNumber
          ? filterRequestObject.documentNumber.replace(/\D/g, "")
          : null;
        if (resetPageNumber) {
          filterRequestObject.pageNumber = 1;
          this.filters.pageNumber = 1;
        }
        if (!filterRequestObject.start) {
          delete filterRequestObject.start;
          delete filterRequestObject.end;
        }
        if (!filterRequestObject.end) {
          delete filterRequestObject.end;
          this.filters.start = null;
        }
        const totalPages = await this.getReportFinancing(filterRequestObject);
        this.totalPages = totalPages;
        this.rows = this.rowsFinancing.map(rowFinancing => {
          const row = { ...rowFinancing };
          if (!rowFinancing.transactionErrorMessage) {
            return row;
          }
          return {
            ...row,
          };
        });
      } catch (error) {
        if (error.status === 204) {
          this.cleanTable();
          return;
        }
        console.error({ error });
        this.cleanState();
        this.$swal({
          title: "Desculpe",
          text:
            "Tivemos um problema\n Por favor, tente novamente, se o problema persistir entre em contato com a Listo.",
          icon: "error",
          confirmButtonText: "OK",
          showCloseButton: true,
          customClass: "swal-listo",
        });
      } finally {
        this.finishLoading();
      }
    },
    cleanTable() {
      this.rows = [];
      this.filters.pageNumber = 1;
      this.totalPages = 1;
    },
    cleanTable() {
      this.rows = [];
      this.filters.pageNumber = 1;
      this.totalPages = 1;
    },
    updateStartDate(value) {
      if (!value) {
        return;
      }
      this.filters.startDate = dayjs(this.filters.start);
    },
    updateEndDate(value) {
      if (!value) {
        return;
      }
      this.filters.endDate = dayjs(this.filters.end)
        .hour(20)
        .minute(59)
        .second(59);
    },
    async onPageChange(currentPage) {
      this.filters.pageNumber = currentPage;
      await this.loadItemsReportsFinancing();
    },
    async onPerPageChange(currentPerPage) {
      this.filters.pageSize = currentPerPage;
      this.filters.pageNumber = 1;
      await this.loadItemsReportsFinancing();
    },
    async reportURL(fileExtensionType) {
      this.startLoading();
      switch (fileExtensionType) {
        case "excel":
          fileExtensionType = 1;
          break;

        case "pdf":
          fileExtensionType = 0;
          break;
      }

      try {
        const responseReport = await this.getReportFinancingFile({
          start: this.filters.start,
          end: this.filters.end,
          fileExtension: fileExtensionType,
          statusList: this.filters.statusList,
          documentNumber: this.filters.documentNumber ? this.filters.documentNumber.replace(/\D/g, "") : null,
        });

        if (!requestObjFile.start) {
          delete requestObjFile.start;
          delete requestObjFile.end;
        }
        if (!requestObjFile.end) {
          delete requestObjFile.end;
          this.filters.start = null;
        }
        const response = await this.getReportFinancingFile(requestObjFile);
        const blobURL = window.URL.createObjectURL(new Blob([responseReport.data]));
        const link = document.createElement("a");
        const disposition = response.headers["content-disposition"].split(";");
        const filename = disposition.filter(
          x => x.indexOf("filename=") != -1,
        )[0];
        link.href = blobURL;
        link.setAttribute("download", filename.split("=")[1]);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(blobURL);
      } catch (error) {
        if (error.status === 204) {
          return this.$swal({
            title: "Relatório não encontrado",
            text: "Nenhum relatório foi encontrado com os filtros informados.",
            icon: "error",
            confirmButtonText: "OK",
            showCloseButton: true,
            customClass: "swal-listo",
          });
        }
        return this.$swal({
          title: "Desculpe",
          text:
            "Tivemos um problema\n Por favor, tente novamente, se o problema persistir entre em contato com a Listo.",
          icon: "error",
          confirmButtonText: "OK",
          showCloseButton: true,
          customClass: "swal-listo",
        });
      } finally {
        this.finishLoading();
      }
    },
    btnDetails(value) {
      this.$router.push(
        `/financiamentos/auto/relatorio/financiamento/${value.registerLoanId}`,
      );
    },
  },
  async mounted() {
    await this.loadContractStatus();
    await this.loadItemsReportsFinancing();
  },
  watch: {
    filters: {
      deep: true,
      handler(val) {
        if (!val.start) {
          val.end = null;
        }
      },
    },
  },
  computed: {
    ...mapState({
      contractsStatus: state => state.simulacao.relatorio.contractsStatus,
      reportsFinancing: state => state.simulacao.relatorio.reportsFinancing,
      reportsFinancingFile: state => state.simulacao.relatorio.reportsFinancingFile,
    }),
    rowsFinancing() {
      return this.reportsFinancing.map(report => ({
        ...report,
        date: dayjs(report.date),
        dateText: dayjs(report.date).format("DD/MM/YYYY"),
        registerLoanId: report.registerLoanId,
      }));
    },
    isEndDateDisabled() {
      return !this.filters.start;
    },
  },
};
</script>

<style lang="less">
@import "~assets/vars.less";
.page-financiamentos {
  .clickable {
    cursor: pointer;
  }
  .form-button {
    margin-top: 30px;
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
  li {
    font-size: @ftSizeSmall;
    font-family: @mainFontRegular;
    font-weight: bold;
    list-style-type: none;
    margin: 0 5px;
    display: inline-block;
  }
}
.exportar-resultados {
  font-size: @ftSizeSmall;
  font-family: @mainFontRegular;
  font-weight: bold;
  margin-left: 10px;
}
.btn-pdf {
  color: @color12 !important;
  border-color: @color12 !important;
}
.btn-excel {
  color: @color11 !important;
  border-color: @color11 !important;
}
.report-status {
  border-bottom: 1px dashed black;
}
</style>
