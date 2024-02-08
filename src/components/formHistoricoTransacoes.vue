<template>
  <form
    @submit.prevent
    id="formHistoricoTransacoes"
    class="container-fluid"
    :class="{ 'form-no-edit': controls.searching }"
  >
    <div id="formFiltersContainer" class="row">
      <div class="form-group col-xs-12 col-lg-8">
        <div class="row">
          <div class="form-input form-input-date col-xs-6 col-lg-4">
            <label for="startDate">{{
              content.text.historicoTransacoes_startDate
            }}</label>
            <date-picker
              id="startDate"
              v-model.trim="form.startDate"
              :lang="lang"
              :format="'DD/MM/YYYY'"
              v-mask="'##/##/####'"
              :not-before="new Date('2015-01-01')"
            ></date-picker>
          </div>
          <div class="form-input form-input-date col-xs-6 col-lg-4">
            <label for="endDate">{{
              content.text.historicoTransacoes_endDate
            }}</label>
            <date-picker
              id="endDate"
              v-model.trim="form.endDate"
              :disabled="!form.startDate"
              :lang="lang"
              :format="'DD/MM/YYYY'"
              v-mask="'##/##/####'"
              :not-before="form.startDate"
              :not-after="new Date()"
            ></date-picker>
          </div>
          <div
            class="form-input col-xs-6 col-lg-4"
            :class="{ 'form-invalid': $v.form.authorize.$invalid }"
          >
            <label for="authorizeCode">{{
              content.text.historicoTransacoes_authorizeCode
            }}</label>
            <the-mask
              type="text"
              id="authorizeCode"
              v-model.trim="$v.form.authorize.$model"
              :mask="'XXXXXX'"
            ></the-mask>
          </div>
          <div class="form-input col-xs-6 col-lg-4">
            <label for="user">{{
              content.text.historicoTransacoes_user
            }}</label>
            <!-- <input type="text" id="user" v-model="form.user"> -->
            <select id="user" v-model="form.user">
              <option disabled hidden :value="null">{{
                content.text.escolhaUsuario
              }}</option>
              <option :value="null">{{ content.text.field_Todos }}</option>
              <option
                v-for="(user, index) in affiliateUsers"
                :key="index"
                :value="user.userId"
                >{{ user.userName }}</option
              >
            </select>
          </div>
          <div class="form-input col-xs-6 col-lg-4">
            <label for="transactionData">{{
              content.text.historicoTransacoes_transactionData
            }}</label>
            <select
              type="text"
              id="transactionData"
              v-model="form.fieldKey"
              :disabled="content.fieldKeysList.length == 0"
            >
              <option disabled hidden :value="null">{{
                content.text.escolhaOpcao
              }}</option>
              <option :value="0">{{ content.text.field_Todos }}</option>
              <option
                v-for="(field, index) in content.fieldKeysList"
                :key="index"
                :value="field.fieldKeyGroupID"
                >{{ field.fieldKeyGroupName }}</option
              >
            </select>
          </div>
          <div
            class="form-input col-xs-6 col-lg-4"
            :class="{ 'form-invalid': $v.form.fieldValue.$invalid }"
          >
            <label for="fieldValue">{{
              content.text.historicoTransacoes_fieldValue
            }}</label>
            <input
              type="text"
              id="fieldValue"
              v-model="$v.form.fieldValue.$model"
              :disabled="!form.fieldKey"
            />
          </div>
        </div>
      </div>

      <div class="form-group col-xs-12 col-lg-4">
        <div class="row">
          <fieldset
            class="form-input col-xs-6 col-lg-12"
            v-for="(cost, index) in content.transactionTypes"
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
                v-model="form.selectedTransactionTypes"
              />
              <label :for="type.id">{{ type.label }}</label>
            </div>
          </fieldset>
        </div>
      </div>
    </div>

    <div
      id="formButtonContainer"
      class="row"
      :class="{ 'form-group': $mq == 'mobile' }"
    >
      <div class="form-button pull-right col-xs-6">
        <button
          @click="
            showTable(true, 1);
            resetPagination();
          "
          id="btnSearch"
          :disabled="$v.form.$invalid"
        >
          {{ content.text.historicoTransacoes_searchButton }}
        </button>
      </div>
    </div>
  </form>
</template>

<style lang="less" scoped>
@import "~assets/vars.less";
@import "~assets/variables.less";
#formHistoricoTransacoes {
  .formTitleContainer {
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

  #formFiltersContainer {
    max-width: 1200px;
  }
  #btnSearch {
    background-color: @color4;
    border-color: @color4;
    color: @color2;
    width: 100%;
  }
}
</style>

<script>
import {
  required,
  minValue,
  minLength,
  requiredIf
} from "vuelidate/lib/validators";
import { TheMask, mask } from "vue-the-mask";
import DateMixin from '~/components/atomic/mixins/date.mixin'
import dayjs from "dayjs";
export default {
  mixins: [DateMixin],
  components: {
    TheMask
  },
  directives: {
    mask
  },
  methods: {
    resultsActiveControl() {
      this.controls.showTable = !this.controls.showTable;
    },

    // exibe tabela dos resultados
    showTable(headers, currentPage) {
      const self = this;

      self.content.transactionsHistory = [];
      self.controls.searching = true;

      self.$nuxt.$emit("listColumns", {
        columns: [
          {
            id: "codigo",
            label: "Código",
            checked: true
          },
          {
            id: "data",
            label: "Data e Hora",
            checked: true
          },
          {
            id: "autorizacao",
            label: "Autorização",
            checked: true
          },
          {
            id: "tipo",
            label: "Tipo",
            checked: true
          },
          {
            id: "status",
            label: "Status",
            checked: true
          },
          {
            id: "valorLiberado",
            label: "Valor liberado",
            checked: true
          },
          {
            id: "valorTransacao",
            label: "Valor da transação",
            checked: true
          },
          {
            id: "parcelas",
            label: "Parcelas",
            checked: true
          },
          {
            id: "retorno",
            label: "Retorno",
            checked: true
          }
        ]
      });

      self.$nuxt.$emit("showResultsTable", {
        toggle: false,
        content: ""
      });

      self.$nuxt.$emit("searching", {
        searching: true
      });

      const resquestHistoricObj = {
        transactionTypes:
          self.form.selectedTransactionTypes != []
            ? self.form.selectedTransactionTypes
            : [1, 2, 4, 8],
        authorize: self.form.authorize ? self.form.authorize.trim() : null,
        userId: self.form.user ? self.form.user : 0,
        fieldKey: self.form.fieldKey != null ? self.form.fieldKey : 0,
        fieldValue:
          self.form.fieldValue != null && self.form.fieldValue.trim().length
            ? self.form.fieldValue.trim()
            : null,
        pageNumber: currentPage,
        pageSize: 30,
        getXHeaders: headers
      };
      if (self.form.startDate) {
        resquestHistoricObj.start = self.form.startDate;
      }
      if (self.form.startDate && self.form.endDate) {
        resquestHistoricObj.end = self.form.endDate;
      }
      if (!self.form.startDate && self.form.endDate) {
        self.form.endDate = null;
      }
      self.$axios
        .post(
          `${process.env.API_REPORT}/Transaction/Historic`,
          resquestHistoricObj
        )
        .then(response => {
          self.$nuxt.$emit("searching", {
            searching: false
          });

          if (response.status == 200) {
            self.content.transactionsHistory = response.data;

            self.$nuxt.$emit("showResultsTable", {
              toggle: true,
              content: self.content.transactionsHistory
            });

            if (headers) {
              // PRECISA DAR JSON PARSE PARA UTILIZAR OS HEADERS
              const pagination = JSON.parse(response.headers["x-pagination"]);
              const summary = JSON.parse(response.headers["x-summary"]);

              self.$nuxt.$emit("createPagination", {
                total: pagination.Count, // a resposta traz o total de itens presentes no período/filtro selecionado, independente da paginação
                pages: pagination.Pages // total de páginas informado pela resposta para o período/filtro selecionado
              });

              self.$nuxt.$emit("consolidado", {
                title: self.content.text.consolidado_title,
                tableClass: "historicoTransacoes",
                rows: [
                  {
                    title: self.content.text.consolidado_transacoes,
                    value: pagination.Count
                  },
                  {
                    title: self.content.text.consolidado_transacionado,
                    value: summary.TransactionValue,
                    type: "currency"
                  },
                  {
                    title: self.content.text.consolidado_liberado,
                    value: summary.ReleasedValue,
                    type: "currency",
                    class: "total"
                  }
                ]
              });

              // EMITE OS PARÃMETROS PARA O REPORT SERVICE
              self.$nuxt.$emit("loadReportParameters", {
                start: self.form.startDate,
                end: self.form.endDate,
                serviceTypeId: 0,
                transactionId: 0,
                authorize: self.form.authorize
                  ? self.form.authorize.trim()
                  : null,
                transactionTypes:
                  self.form.selectedTransactionTypes != []
                    ? self.form.selectedTransactionTypes
                    : [1, 2, 4, 8],
                transactionStatuses: [1, 3, 5, 8, 9, 201], // "1|3|5|8|9|201",
                userId: self.form.user ? self.form.user : 0,
                fieldKey: self.form.fieldKey != null ? self.form.fieldKey : 0,
                fieldValue:
                  self.form.fieldValue != null &&
                  self.form.fieldValue.trim().length
                    ? self.form.fieldValue.trim()
                    : null
              });
            }
          } else if (response.status == 204) {
            self.$nuxt.$emit("emptySearch", {
              emptySearch: true
            });

            if (headers) {
              self.$nuxt.$emit("consolidado", {
                title: self.content.text.consolidado_title,
                tableClass: "historicoTransacoes",
                rows: [
                  {
                    title: self.content.text.consolidado_transacoes,
                    value: 0
                  },
                  {
                    title: self.content.text.consolidado_transacionado,
                    value: 0,
                    type: "currency"
                  },
                  {
                    title: self.content.text.consolidado_liberado,
                    value: 0,
                    type: "currency",
                    class: "total"
                  }
                ]
              });
            }
          }
          self.controls.searching = false;
        })
        .catch(err => {
          console.error(errr);
          self.controls.searching = false;
        });
    },
    // reinicia paginação
    // Usado no clique no botõa de pesquisar para quando fizer uma nova pesquisa, retornar para a primeira página da tabela
    resetPagination() {
      this.$nuxt.$emit("resetPagination"); // esse emitter não precisa de um segundo parâmetro
    }
  },
  data() {
    return {
      controls: {
        submitStatus: null,
        showTable: false,
        firstSearch: true,
        validSearch: false,
        searching: false,
        formActive: true
      },
      form: {
        startDate: null,
        endDate: null,
        selectedTransactionTypes: [],
        serviceType: null,
        fieldKey: null,
        authorize: null,
        fieldValue: null,
        user: null
      },
      content: {
        text: {
          historicoTransacoes_filters: "Filtros",
          historicoTransacoes_startDate: "Data inicial",
          historicoTransacoes_endDate: "Data final",
          historicoTransacoes_authorizeCode: "Autorização",
          historicoTransacoes_user: "Usuário",
          historicoTransacoes_fieldValue: "Valor do campo",
          historicoTransacoes_serviceType: "Tipo de serviços",
          historicoTransacoes_transactionData: "Dados da transação",
          historicoTransacoes_transactionTypes: "Tipos de transação",
          historicoTransacoes_clientCost: "Custo cliente",
          historicoTransacoes_sellerCost: "Custo lojista",
          historicoTransacoes_clientDebit: "Cartão de débito",
          historicoTransacoes_clientCredit: "Cartão de crédito",
          historicoTransacoes_sellerDebit: "Cartão de débito custo lojista",
          historicoTransacoes_sellerCredit: "Cartão de crédito custo lojista",
          historicoTransacoes_fieldsToShow: "Campos a exibir",
          historicoTransacoes_fieldsToShow_legend:
            "Escolha o que deseja exibir",
          historicoTransacoes_searchButton: "Ver relatório",
          historicoTransacoes_detalhe: "Detalhe",
          historicoTransacoes_imprimir: "Imprimir",
          multiselect_selectLabel: "Clique para selecionar",
          multiselect_selectGroupLabel: "Clique para selecionar grupo",
          multipleselect_selectedLabel: "Selecionado",
          multiselect_deselectLabel: "Clique para remover",
          multiselect_deselectGroupLabel: "Clique para remover grupo",
          consolidado_title: "Relatório de transações",
          consolidado_transacoes: "Transações: ",
          consolidado_transacionado: "Transacionado: ",
          consolidado_liberado: "Liberado",
          form_searchAgain: "Atualizar relatório",
          alerta_inicio: "Selecione um filtro para gerar o relatório",
          alert_vazio: "Não foram encontrados dados para o filtro selecionado",
          alert_buscando: "Buscando...",
          alerta_dataRecente: "Selecione uma data mais recente",
          alerta_dataVazia: "Selecione uma data",
          serviceType_selecione: "Selecione um serviço",
          serviceType_label: "Tipo de serviço",
          escolhaOpcao: "Escolha uma opção",
          escolhaUsuario: "Escolha um usuário",
          field_Todos: "Todos"
        },
        transactionsHistory: [],
        transactionTypes: [
          {
            group: "Custo cliente",
            types: [
              {
                label: "Cartão de débito",
                id: "clientDebit",
                value: 1
              },
              {
                label: "Cartão de crédito",
                id: "clientCredit",
                value: 4
              }
            ]
          },
          {
            group: "Custo lojista",
            types: [
              {
                label: "Cartão de débito",
                id: "sellerDebit",
                value: 8
              },
              {
                label: "Cartão de crédito",
                id: "sellerCredit",
                value: 2
              }
            ]
          }
        ],
        serviceTypeList: [],
        fieldKeysList: [],
        affiliateUsers: []
      }
    };
  },
  computed: {
    affiliateUsers() {
      return this.content.affiliateUsers.filter(affiliateUser => affiliateUser.roleId != 2)
    }
  },
  mounted() {
    const self = this;

    self.controls.searching = true;

    self.content.transactionTypes.map(group => {
      group.types.map(type => {
        self.form.selectedTransactionTypes.push(type.value);
      });
    });

    self.$axios
      .get(`${process.env.API_TRANSACTION}/affiliate/fields`)
      .then(response => {
        if (response.status == 200) {
          response.data.map(r => {
            self.content.fieldKeysList.push(r);
          });
        }
      })
      .catch(err => console.log("Err:", err));

    self.$axios
      .get(`${process.env.API_AFFILIATE}/affiliates/users`)
      .then(response => {
        response.data.map(user => {
          self.content.affiliateUsers.push(user);
        });
        self.controls.searching = false;
      })
      .catch(err => console.log("Err:", err));

    const today = new Date();

    self.form.startDate = dayjs();
    self.form.endDate = dayjs();

    self.showTable(true, 1);
  },
  created() {
    const self = this;

    // Listener para receber a atualização de página vinda da tabela
    // Chama a função que carrega os dados da API passando a página enviada pelo evento como parâmetro
    self.$nuxt.$on("updatePagination", data => {
      self.showTable(false, data);
    });
  },
  beforeDestroy() {
    this.$nuxt.$off("updatePagination");
  },
  validations() {
    const self = this;
    return {
      form: {
        fieldValue: {
          required: requiredIf(() => self.form.fieldKey)
        },
        authorize: {
          minLength: minLength(6),
          required: requiredIf(() => !self.form.startDate && !self.form.endDate)
        }
      }
    };
  },
  watch: {
    // eslint-disable-next-line func-names
    "form.fieldKey": function() {
      if (this.form.fieldKey == 0) {
        this.form.fieldValue = null;
      }
    },
    "form.startDate"(value) {
      const today = dayjs()
      if (!value) {
        this.form.endDate = null;
        return;
      }
    }
  }
};
</script>
