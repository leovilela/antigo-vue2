<template>
  <form
    id="formRelatoriosPagamento"
    class="container-fluid"
    :class="{ 'form-no-edit': controls.searching }"
    @submit.prevent
  >
    <div class="row formInputContainer">
      <div class="form-group col-xs-12 col-lg-8">
        <div class="row">
          <div
            id="startDate"
            class="form-input form-input-date col-xs-6 col-lg-4"
          >
            <label for="startDate">{{
              text.formRelatoriosPagamento_startDate
            }}</label>
            <date-picker
              id="startDate"
              v-model.trim="form.startDate"
              :lang="lang"
              :format="'DD/MM/YYYY'"
              :not-before="new Date('2015-01-01')"
            ></date-picker>
          </div>
          <div
            id="endDate"
            class="form-input form-input-date col-xs-6 col-lg-4"
          >
            <label for="endDate">{{
              text.formRelatoriosPagamento_endDate
            }}</label>
            <date-picker
              id="endDate"
              v-model.trim="form.endDate"
              :lang="lang"
              :format="'DD/MM/YYYY'"
              :not-before="form.startDate"
              v-mask="'##/##/####'"
            ></date-picker>
          </div>
          <div
            id="authorize"
            class="form-input col-xs-6 col-lg-4"
            :class="{ 'form-invalid': $v.form.authorize.$invalid }"
          >
            <label for="authorization">{{
              text.formRelatoriosPagamento_authorization
            }}</label>
            <the-mask
              v-model.trim="$v.form.authorize.$model"
              type="text"
              id="authorization"
              :mask="'XXXXXX'"
            ></the-mask>
          </div>
        </div>
      </div>

      <div class="form-group col-xs-12 col-lg-4">
        <div class="row">
          <fieldset
            class="form-input col-xs-6"
            v-for="(cost, index) in form.transactionTypes"
            :key="index"
          >
            <legend>{{ cost.group }}</legend>
            <div
              class="transactionTypeSelector"
              v-for="(type, index) in cost.types"
              :key="index"
            >
              <input
                type="checkbox"
                :id="type.id"
                :value="type.value"
                v-model="$v.form.selectedTransactionTypes.$model"
              />
              <label :for="type.id">{{ type.label }}</label>
            </div>
          </fieldset>
        </div>
      </div>
    </div>

    <div class="row formButtonContainer">
      <div class="form-group form-button col-xs-6 pull-right">
        <button
          id="btnSearch"
          @click="
            showTable(true, 1);
            resetPagination();
          "
          :disabled="$v.form.$invalid"
        >
          {{ text.formRelatoriosPagamento_search }}
        </button>
      </div>
    </div>
  </form>
</template>

<style lang="less" scoped>
@import "~assets/vars.less";
@import "~assets/variables.less";
#formRelatoriosPagamento {
  font-family: @mainFont;
  user-select: none;

  .formTitleContainer {
    border-bottom: 1px solid @color14;
    #formTitle {
      font-size: @ftSizeLarge;
      padding-left: 0;
      span {
        margin-left: 10px;
      }

      &:hover {
        cursor: pointer;
      }
    }

    #formOpenIcon {
      margin: 0;
      padding: 0;
      span {
        font-size: @ftSizeSmall;
        vertical-align: middle;
      }

      .glyphicon {
        font-size: @ftSizeLarge;
        margin-left: 10px;
      }

      &:hover {
        cursor: pointer;
      }
    }
  }

  .formInputContainer {
    max-width: 1200px;
  }

  #btnSearch {
    background-color: @color4;
    color: @color2;
  }
}
</style>

<script>
import { required, minValue, minLength, requiredIf } from "vuelidate/lib/validators";
import { mask } from "vue-the-mask";
import notice from "~/components/notice.vue";
import report from "../utils/endpoints/report";
import dayjs from 'dayjs';
import DateMixin from '~/components/atomic/mixins/date.mixin'
const date = value => (value != null ? value.toISOString().split("T")[0].length == 10 : false);

export default {
  mixins: [DateMixin],
  data() {
    return {
      text: {
        formRelatoriosPagamento_title: "Filtros",
        formRelatoriosPagamento_searchAgain: "Atualizar relatório",
        formRelatoriosPagamento_authorization: "Autorização",
        formRelatoriosPagamento_startDate: "Data inicial",
        formRelatoriosPagamento_endDate: "Data final",
        formRelatoriosPagamento_search: "Ver relatório",
        formRelatoriosPagamento_emptyResultsAlert: "Não foram encontrados pagamentos no período selecionado!",
        formRelatoriosPagamento_transactionTypes: "Tipos de transação",
        formRelatoriosPagamento_consolidado_aprovado: "Valor aprovado em ",
        formRelatoriosPagamento_consolidado_pago: "Valor pago em ",
        formRelatoriosPagamento_consolidado_codigo: "Pagamento com código ",
        formRelatoriosPagamento_consolidado_saldoAtual: "Saldo em ",
        formRelatoriosPagamento_consolidado_periodo: "Saldo no período selecionado",
        formRelatoriosPagamento_consolidado_filtro: "Saldo no filtro selecionado",
        formRelatoriosPagamento_consolidado_agendadas: "Agendadas",
        formRelatoriosPagamento_consolidado_antecipadas: "Antecipadas",
        formRelatoriosPagamento_consolidado_aprovadas: "Aprovadas",
        formRelatoriosPagamento_consolidado_total: "Total",
        consolidado_title_mesmo_dia: "Relatório de pagamentos em ",
        consolidado_title_entre: "Relatório de pagamentos entre ",
        consolidado_title_e: " e ",
      },
      controls: {
        formOpen: true,
        showTable: false,
        searching: false,
      },
      form: {
        transactionTypes: [
          {
            group: "Custo cliente",
            types: [
              {
                label: "Cartão de débito",
                id: "clientDebit",
                value: 1,
              },
              {
                label: "Cartão de crédito",
                id: "clientCredit",
                value: 4,
              },
            ],
          },
          {
            group: "Custo lojista",
            types: [
              {
                label: "Cartão de débito",
                id: "sellerDebit",
                value: 8,
              },
              {
                label: "Cartão de crédito",
                id: "sellerCredit",
                value: 2,
              },
            ],
          },
        ],
        selectedTransactionTypes: [],
        startDate: null,
        endDate: null,
        authorize: null,
      },
      content: {
        pagamentos: [],
      },
    };
  },
  methods: {
    // Controla exibição da tabela
    showTable(headers, currentPage) {
      const self = this;

      self.content.pagamentos = [];
      // self.controls.formOpen = true;
      self.controls.showTable = false;

      self.controls.searching = true;

      self.$nuxt.$emit("showResultsTable", {
        toggle: self.controls.showTable,
        content: "",
      });

      self.$nuxt.$emit("searching", {
        searching: true,
      });
      const requestSearchObj = {
          getXHeaders: headers,
          pageSize: 30,
          pageNumber: currentPage,
          authorize: self.form.authorize,
          types: self.form.selectedTransactionTypes,
      }

      if (self.form.startDate) {
        requestSearchObj.start = self.form.startDate;
      }
      if (self.form.endDate) {
        requestSearchObj.end = self.form.endDate;
      }

      self.$axios
        .post(`${report.list.settlement}`, requestSearchObj)
        .then((response) => {
          if (response.status == 200) {
            // self.controls.formOpen = false;
            self.controls.showTable = true;

            self.content.pagamentos = response.data;

            self.$nuxt.$emit("searching", {
              searching: false,
            });

            self.$nuxt.$emit("showResultsTable", {
              toggle: self.controls.showTable,
              content: self.content.pagamentos,
            });

            if (headers) {
              const pagination = JSON.parse(response.headers["x-pagination"]);
              const summary = JSON.parse(response.headers["x-summary"]);

              self.$nuxt.$emit("createPagination", {
                total: pagination.Count,
                pages: pagination.Pages,
              });

              self.$nuxt.$emit("consolidado", {
                title: `${self.text.consolidado_title_entre} ${self.showFormattedDate(self.form.startDate)} ${self.text.consolidado_title_e} ${self.showFormattedDate(self.form.endDate)}`,
                tableClass: "relatoriosPagamento",
                rows: [
                  {
                    title: self.text.formRelatoriosPagamento_consolidado_agendadas,
                    value: summary.ScheduledValue,
                    type: "currency",
                  },
                  {
                    title: self.text.formRelatoriosPagamento_consolidado_antecipadas,
                    value: summary.AnticipatedValue,
                    type: "currency",
                  },
                  {
                    title: self.text.formRelatoriosPagamento_consolidado_aprovadas,
                    value: summary.ApprovedValue,
                    type: "currency",
                  },
                  {
                    title: self.text.formRelatoriosPagamento_consolidado_total,
                    value: summary.ScheduledValue + summary.AnticipatedValue + summary.ApprovedValue,
                    type: "currency",
                    class: "total",
                  },
                ],
              });

              // EMITE OS PARÃMETROS PARA O REPORT SERVICE
              self.$nuxt.$emit("loadReportParameters", {
                start: self.form.startDate,
                end: self.form.endDate,
                authorize: self.form.authorize ? self.form.authorize.trim() : null,
                transactionTypes: self.form.selectedTransactionTypes != [] ? self.form.selectedTransactionTypes : [1, 2, 4, 8],
                transactionId: 0,
              });
            }
          } else if (response.status == 204) {
            self.$nuxt.$emit("searching", {
              searching: false,
            });
            self.$nuxt.$emit("emptySearch", {
              emptySearch: true,
            });
            self.$nuxt.$emit("consolidado", {
              title: `${self.text.consolidado_title_entre} ${self.showFormattedDate(self.form.startDate)} ${self.text.consolidado_title_e} ${self.showFormattedDate(self.form.endDate)}`,
              tableClass: "relatoriosPagamento",
              rows: [
                {
                  title: self.text.formRelatoriosPagamento_consolidado_agendadas,
                  value: 0,
                  type: "currency",
                },
                {
                  title: self.text.formRelatoriosPagamento_consolidado_antecipadas,
                  value: 0,
                  type: "currency",
                },
                {
                  title: self.text.formRelatoriosPagamento_consolidado_aprovadas,
                  value: 0,
                  type: "currency",
                },
                {
                  title: self.text.formRelatoriosPagamento_consolidado_total,
                  value: 0,
                  type: "currency",
                  class: "total",
                },
              ],
            });
          }

          self.controls.searching = false;
        })
        .catch((e) => {
          // console.log("Erro Relatórios de Pagamento", error);

          self.controls.showTable = true;
          self.controls.searching = false;

          self.$nuxt.$emit("searching", {
            searching: false,
          });

          self.$nuxt.$emit("emptySearch", {
            emptySearch: true,
          });

          self.$nuxt.$emit("consolidado", {
            title: `${self.text.consolidado_title_entre} ${self.showFormattedDate(self.form.startDate)} ${self.text.consolidado_title_e} ${self.showFormattedDate(self.form.endDate)}`,
            tableClass: "relatoriosPagamento",
            rows: [
              {
                title: self.text.formRelatoriosPagamento_consolidado_agendadas,
                value: 0,
                type: "currency",
              },
              {
                title: self.text.formRelatoriosPagamento_consolidado_antecipadas,
                value: 0,
                type: "currency",
              },
              {
                title: self.text.formRelatoriosPagamento_consolidado_aprovadas,
                value: 0,
                type: "currency",
              },
              {
                title: self.text.formRelatoriosPagamento_consolidado_total,
                value: 0,
                type: "currency",
                class: "total",
              },
            ],
          });
        });
    },
    // reinicia paginação
    // Usado no clique no botõa de pesquisar para quando fizer uma nova pesquisa, retornar para a primeira página da tabela
    resetPagination() {
      this.$nuxt.$emit("resetPagination"); // esse emitter não precisa de um segundo parâmetro
    },
    // exibe data formatada
    showFormattedDate(val) {
      const data = new Date(val);
      return `${data.getDate() < 10 ? `0${data.getDate()}` : data.getDate()}/${data.getMonth() + 1 < 10 ? `0${data.getMonth() + 1}` : data.getMonth() + 1}/${data.getFullYear()}`;
    },
  },
  components: {
    notice,
  },
  directives: {
    mask,
  },
  mounted() {
    const self = this;

    self.form.startDate = dayjs().startOf('month');

    self.form.endDate = dayjs().endOf('month');

    self.form.transactionTypes.map((x) => {
      x.types.map((y) => {
        self.form.selectedTransactionTypes.push(y.value);
      });
    });

    self.showTable(true, 1);
  },
  created() {
    const self = this;
    self.$nuxt.$on("updatePagination", (data) => {
      self.showTable(false, data);
    });
  },
  beforeDestroy() {
    this.$nuxt.$off("updatePagination");
  },
  watch: {
     "form.startDate"(value) {
      if (!value) {
        this.form.endDate = null;
        return;
      }
    },
  },
  validations() {
    return {
      form: {
        authorize: {
          minLength: minLength(6),
          required: requiredIf(() => !this.form.startDate && !this.form.endDate)
        },
        selectedTransactionTypes: {
          required,
          minLength: minLength(1),
        },
      },
    }
  },
};
</script>
