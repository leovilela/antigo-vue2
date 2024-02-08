<template>
  <div id="searchResultsTable" class="container-fluid">
    <!-- <h3>Search Results</h3> -->
    <!-- <p>Tabela: {{ controls.tableType }}</p> -->
    <!-- <p>Table Content: {{tableContent}}</p> -->
    <!-- <p>{{toggleColumns}}</p> -->
    <!-- <p>{{showFieldsCheckboxes}}</p> -->
    <!-- <p>Total: {{pagination.total}} Paginas: {{pagination.pages != null ? pagination.pages : null}} Atual: {{pagination.currentPage}}</p> -->
    <div class="exportButtons row form-group" v-if="controls.showTable && controls.tableType != 'editarUsuarios'">
      <div class="export-button form-input col-xs-6" v-if="!showFieldsCheckboxes">
        <button class="btnExport excel" @click="reportURL('excel')"><span class="exportIcon"></span>Excel</button>
      </div>
      <div class="export-button form-input col-xs-6" v-if="!showFieldsCheckboxes">
        <button class="btnExport pdf" @click="reportURL('pdf')"><span class="exportIcon"></span>PDF</button>
      </div>
      <div class="col-xs-12 col-lg-5" v-if="showFieldsCheckboxes">
        <div class="export-button form-input col-xs-6 col-lg-12">
          <button class="btnExport excel" @click="reportURL('excel')"><span class="exportIcon"></span>Excel</button>
        </div>
        <div class="export-button form-input col-xs-6 col-lg-12">
          <button class="btnExport pdf" @click="reportURL('pdf')"><span class="exportIcon"></span>PDF</button>
        </div>

      </div>
      <!-- <div class="col-xs-12" :class="{ 'col-lg-3': showFieldsCheckboxes }">
      </div> -->
      <div class="fieldsToShow col-xs-12 col-lg-7" v-if="showFieldsCheckboxes">
        <fieldset>
            <legend>{{text.fieldsToShow}}</legend>
            <div class="field" v-for="(field, index) in toggleColumns" :key="index">
              <input type="checkbox" :id="field.id" v-model="field.checked" :value="field.id">
              <label :for="field.id">{{field.label}}</label>
            </div>
          </fieldset>
      </div>
    </div>

    <div id="tableContainer" v-if="controls.showTable">
      <table-relatorios-pagamento v-if="controls.tableType == 'relatoriosPagamento'" :pagamentos="tableContent"></table-relatorios-pagamento>
      <table-editar-usuarios v-if="controls.tableType == 'editarUsuarios'" :usuarios="tableContent"></table-editar-usuarios>
      <table-movimentacao v-if="controls.tableType == 'movimentacao'" :transacoes="tableContent"></table-movimentacao>
      <table-extrato v-if="controls.tableType == 'extrato'" :liquidacoes="tableContent"></table-extrato>
      <table-conciliacao :conciliacoes="tableContent" v-if="controls.tableType == 'conciliacao'"></table-conciliacao>
      <table-historico-transacoes :transacoes="tableContent" :colunas="toggleColumns" v-if="controls.tableType == 'historicoTransacoes'"></table-historico-transacoes>
      <table-emprestimos :emprestimos="tableContent" v-if="controls.tableType == 'emprestimos'"></table-emprestimos>
    </div>


    <!-- Paginação -->
    <!-- Exibido se o total de páginas for maior que 0 -->
    <div id="paginationContainer" v-if="controls.showTable && pagination.pages > 1">
      <ul>
        <!-- Cria os controles de paginação -->
        <li v-for="(page, index) in pagination.pages" :key="index" :class="{active: page == pagination.currentPage}" @click="updatePage(page)">{{page}}</li>
      </ul>
    </div>

    <div class="searchAlertsContainer" v-show="!controls.showTable">
      <div class="searchAlert alert alert-info" v-show="controls.firstSearch">{{ text.alerta_inicio }}</div>
      <div class="searchAlert alert alert-info" v-show="!controls.validSearch && !controls.searching && !controls.firstSearch">{{ text.alert_vazio }}</div>
      <div class="searchAlert alert alert-info" v-show="controls.searching && !controls.showTable">{{ text.alert_buscando }}</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import "~assets/vars.less";
@import "~assets/variables.less";

#searchResultsTable {
  .exportButtons {
  // margin: 10px 0;

    // .export-button {
    //   max-width: 240px;
    // }

    .btnExport {
      border-style: solid;
      border-width: 1px;
      background: transparent;
      width:100%;
      min-width: 80px;
      padding: 0;
      font-size: @ftSizeSmall;

      .exportIcon {
        width: 20px;
        height: 20px;
        display: inline-block;
        vertical-align: bottom;
        background-size: contain;
        background-position: center center;
        background-repeat: no-repeat;
        margin-right: 5px;
      }

      &.excel {
        margin-right: 10px;
        border-color: @color11;
        color: @color11;

        .exportIcon {
          background-image: url("~assets/img/ico-excel-pq.png");
        }
      }

      &.pdf {
        border-color: @color12;
        color: @color12;
        .exportIcon {
          background-image: url("~assets/img/ico-pdf-pq.png");
        }
      }
    }
  }
  .fieldsToShow {
    .field {
      display: inline-block;
      padding-right: 20px;
      padding-bottom: 5px;

      * {
        vertical-align: text-top;
        margin: 0;
        padding: 0;
      }
    }
    @media (max-width: @screen-xs-max) {
      padding-top: 10px;
    }
    @media (min-width: @screen-sm-min) {
      padding-top: 10px;
    }
    @media (min-width: @screen-lg-min) {
      padding-top: 0;
    }
  }
  #tableContainer {
    overflow-y: auto;
    max-height: 50vh;

    @media (min-width: @screen-lg-min) {
      max-height: 60vh;
    }
  }
  #paginationContainer {
    ul {
      text-align: center;

      li {
        background-color: @color2;
        border: 1px solid @color5;
        color: @color1;
        display: inline-block;
        min-width: 30px;
        padding: 2px 5px;
        user-select: none;

        &:hover {
          cursor: pointer;
        }

        &.active {
          background-color: @color5;
          color: @color2;
          pointer-events: none;
        }
      }
    }
  }
}
</style>


<script>
import relatoriosPagamento from "~/templates/table-relatoriosPagamento.vue";
import editarUsuarios from "~/templates/table-editarUsuarios.vue";
import movimentacao from "~/templates/table-movimentacao.vue";
import extrato from "~/templates/table-extrato.vue";
import conciliacao from "~/templates/table-conciliacao.vue";
import historicoTransacoes from "~/templates/table-historicoTransacoes.vue";
import emprestimos from "~/templates/table-emprestimos.vue";
import BaseService from "../services/base.service";
import report from "../utils/endpoints/report";

export default {
  data() {
    return {
      controls: {
        showTable: false,
        tableType: null,
        emptySearch: false,
        firstSearch: true,
        searching: false,
      },
      tableContent: "",
      text: {
        alerta_inicio: "Selecione um período para gerar o relatório",
        alert_vazio: "Não foram encontrados dados para o período selecionado",
        alert_buscando: "Buscando...",
        fieldsToShow: "Campos a exibir",
      },
      pagination: {
        total: null, // recebe o total de itens da tabela para a busca, independente da paginação
        pages: null, // recebe o total de páginas da tabela para a busca, independente da paginação (baseada em 0)
        currentPage: 1, // controla a página atual (baseada em 1)
      },
      toggleColumns: [],
      reportParameters: {},
    };
  },

  components: {
    "table-relatorios-pagamento": relatoriosPagamento,
    "table-editar-usuarios": editarUsuarios,
    "table-movimentacao": movimentacao,
    "table-extrato": extrato,
    "table-conciliacao": conciliacao,
    "table-historico-transacoes": historicoTransacoes,
    "table-emprestimos": emprestimos,
  },

  created() {
    // controla o tipo de tabela que será exibido
    this.$nuxt.$on("setTableType", (data) => {
      this.controls.tableType = null;
      this.controls.tableType = data;
      // console.log("setTableType", this.controls.tableType);
    });

    // controla os alertas exibidos e o a exibição da tabela dos resultados
    this.$nuxt.$on("showResultsTable", (data) => {
      // console.log("showtable", data.content);
      this.controls.showTable = data.toggle;
      this.controls.firstSearch = false;
      this.controls.emptySearch = false;
      this.tableContent = data.content;
    });

    // controla alerta de nenhum resultado encontrado
    this.$nuxt.$on("emptySearch", (data) => {
      this.controls.emptySearch = data.emptySearch;
      this.controls.firstSearch = false;
      // console.log("Empty search", this.controls.emptySearch);
    });

    // controla o alerta exibido antes da primeira busca
    this.$nuxt.$on("firstSearch", (data) => {
      this.controls.firstSearch = data.firstSearch;
      // console.log("First search", this.controls.firstSearch);
      this.tableContent = "";
    });

    // controla o alerta exibido enquanto carrega os resultados da busca
    this.$nuxt.$on("searching", (data) => {
      this.controls.searching = data.searching;
      this.controls.firstSearch = false;
      // console.log("Searching", this.controls.searching);
    });

    // controla quais opçoes estarão disponiveis nos checkboxes de campos a exibir
    this.$nuxt.$on("listColumns", (data) => {
      this.toggleColumns = data.columns;
    });

    // cria a paginação baseada na pesquisa atual enviada pela página
    this.$nuxt.$on("createPagination", (data) => {
      // console.log("createPagination\n", data);
      this.pagination.total = data.total;
      this.pagination.pages = data.pages;
    });

    // Retorna a página atual para o valor inicial (1)
    // Chamado quando faz uma nova pesquisa
    this.$nuxt.$on("resetPagination", () => {
      this.pagination.currentPage = 1;
    });


    // EVENTO PARA RECEBER OS PARÂMETROS DE REPORT SERVICES
    this.$nuxt.$on("loadReportParameters", (data) => {
      // console.log(data);
      Object.keys(data).map((k) => {
        // console.log(k, data[k]);
        this.reportParameters[k] = data[k];
      });

      // console.log("this.reportParameters", this.reportParameters);
    });
  },
  methods: {
    // Atualiza a página baseada no valor do controlador de paginação selecionado
    updatePage(pageNumber) {
      // console.log("page", pageNumber);
      this.$nuxt.$emit("updatePagination", pageNumber);
      this.pagination.currentPage = pageNumber;
    },

    // Define qual URL será usada para gerar o report
    reportURL(fileExtension) {
      const self = this;

      let url;
      const parametros = {};

      Object.keys(self.reportParameters).map((x) => {
        // console.log(self.reportParameters[x]);
        self.reportParameters[x] != null ? parametros[x] = self.reportParameters[x] : false;
      });

      switch (fileExtension) {
        case "excel":
          parametros.fileExtension = "xls";
          break;

        case "pdf":
          parametros.fileExtension = "pdf";
          break;
      }

      // console.log("parametros", parametros);

      switch (self.controls.tableType) {
        case "extrato":
          url = `${report.list.transferFile}`;
          break;

        case "conciliacao":
          url = `${report.list.conciliationFile}`;
          break;

        case "historicoTransacoes":
          url = `${report.list.historicFile}`;
          break;

        case "relatoriosPagamento":
          url = `${report.list.settlementFile}`;
          break;

        case "emprestimos":
          url = `${process.env.API_CUSTOMER_DATA}/Report/LoanReport/File`;
          break;
      }

      this.$axios.post(url, parametros, { responseType: "blob" })
        .then((response) => {
          const blobURL = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          const disposition = response.headers["content-disposition"].split(";");
          const filename = disposition.filter(x => x.indexOf("filename=") != -1)[0];
          link.href = blobURL;
          link.setAttribute("download", filename.split("=")[1]); // or any other extension
          document.body.appendChild(link);
          link.click();
        }).catch(err => console.log("Err:", err));
    },
  },
  props: ["showFieldsCheckboxes"],
};
</script>
