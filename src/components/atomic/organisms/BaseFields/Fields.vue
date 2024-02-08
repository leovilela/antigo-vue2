<template>
  <section
    class="services-auto services-auto--simulacao container-fluid services"
  >
    <div id="transacao-passo-3">
      <div id="transactionData" class="panel panel-default">
        <div class="panel-heading">
          <span>{{ $t("labels.transacao.dados_transacao") }}</span>
        </div>
        <div class="panel-body">
          <div class="row">
            <div
              class="col-xs-12 col-sm-6 col-md-6"
              :class="{
                'form-group-error':
                  validClientDocument != 0 && validClientDocument != 1,
                'form-invalid': !field.fieldKeyValid
              }"
              v-for="(field, index) in fieldsEach"
              :key="index"
            >
              <label :for="field.fieldKey">{{ field.label }}</label>

              <fieldset v-if="field.typeContent !== 'Text'">

                <Money
                  v-bind="money"
                  type="text"
                  :field-key="field.fieldKey"
                  :ref="field.fieldKey"
                  name="currency"
                  :id="field.fieldKey"
                  :placeholder="field.placeholder"
                  v-model="dadosVariaveis.dadosTransacao[field.fieldKey]"
                  :disabled="externalProductPayment"
                ></Money>
              </fieldset>

              <fieldset
                v-if="
                  field.typeContent === 'Text' && field.fieldKeyTypeID === 4
                "
              >
                <Money
                  v-bind="money"
                  type="text"
                  :field-key="field.fieldKey"
                  :ref="field.fieldKey"
                  name="currency"
                  :id="field.fieldKey"
                  :placeholder="field.placeholder"
                  v-model="dadosVariaveis.dadosTransacao[field.fieldKey]"
                  :disabled="externalProductPayment"
                ></Money>
              </fieldset>

              <!-- CPF/CNPJ -->
              <fieldset
                v-if="
                  field.typeContent === 'Text' && field.fieldKeyTypeID === 21
                "
              >
                <the-mask
                  :mask="['###.###.###-##', '##.###.###/####-##']"
                  :placeholder="field.placeholder"
                  :id="field.fieldKey"
                  type="text"
                  class="form__input"
                  v-model.trim="dadosVariaveis.dadosTransacao[field.fieldKey]"
                  :disabled="blockFields[field.fieldKey]"
                />
              </fieldset>

              <!-- CEP -->
              <fieldset
                v-if="field.typeContent == 'Text' && field.fieldKeyTypeID == 16"
              >
                <the-mask
                  :mask="'#####-###'"
                  :placeholder="field.placeholder"
                  v-model.trim="dadosVariaveis.dadosTransacao[field.fieldKey]"
                  :id="field.fieldKey"
                  type="text"
                  class="form__input"
                  :disabled="blockFields[field.fieldKey]"
                ></the-mask>
              </fieldset>

              <!-- TELEFONE -->
              <fieldset
                v-if="field.typeContent == 'Text' && field.fieldKeyTypeID == 40"
              >
                <the-mask
                  :mask="['(##) #####-####', '(##) ####-####']"
                  :placeholder="field.placeholder"
                  v-model.trim="dadosVariaveis.dadosTransacao[field.fieldKey]"
                  :id="field.fieldKey"
                  type="text"
                  class="form__input"
                  :disabled="blockFields[field.fieldKey]"
                ></the-mask>
              </fieldset>

              <fieldset
                v-if="
                  field.typeContent === 'Text' &&
                    field.fieldKeyTypeID !== 21 && field.fieldKeyTypeID !== 4 &&
                    field.fieldKeyTypeID !== 16 && field.fieldKeyTypeID !== 40
                "
              >
                <div
                  v-if="
                    field.fieldKeyTypeID === 32 ||
                      field.fieldKeyTypeID === 33 ||
                      field.fieldKeyTypeID === 34 ||
                      field.fieldKeyTypeID === 47 ||
                      field.fieldKeyTypeID === 48
                  "
                >
                  <input
                    :placeholder="field.placeholder"
                    :id="field.fieldKey"
                    type="text"
                    class="form__input"
                    v-mask="customTokens"
                    v-model.trim="dadosVariaveis.dadosTransacao[field.fieldKey]"
                    :disabled="blockFields[field.fieldKey]"
                  />
                </div>
                <div v-else>
                  <input
                    :placeholder="field.placeholder"
                    name="others"
                    :id="field.fieldKey"
                    :field-key="field.fieldKey"
                    :type="field.typeContent == 'Text' ? 'text' : 'number'"
                    v-model.trim="dadosVariaveis.dadosTransacao[field.fieldKey]"
                    :disabled="blockFields[field.fieldKey]"
                  />
                </div>
              </fieldset>
            </div>
          </div>

          <div class="row">
            <div
              class="col-xs-12"
              :class="{ 'form-no-edit': !requiredFieldKeysValue }"
            >
              <Base-TransactionType
                @onInstalments="$emit('onInstalments')"
                :key="renderTransactionType"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
/* eslint-disable func-names */
import { Money } from "v-money";
import { TheMask } from "vue-the-mask";
import {
  required, minLength, maxLength, helpers, renavan, email, requiredIf,
} from "vuelidate/lib/validators";

import { mapState, mapActions, mapMutations } from "vuex";
import { log } from "util";
import {
  phoneRegexMobile,
} from "~/utils/regex.utils";
import {
  validaDocumento,
} from "~/utils/validate.utils";


export default {
  components: { Money, TheMask },
  props: {
    renderTransactionType: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      customTokens: {
        mask: "CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC",
        tokens: {
          C: {
            pattern: /[a-zA-Z\u00C0-\u00FF ]/,
            transform(v) {
              return v.toLocaleUpperCase();
            },
          },
        },
      },
      money: {
        decimal: ",",
        thousands: ".",
        // prefix: "R$ ",
        suffix: " ",
        precision: 2,
        masked: false,
      },
      blockFields: {},
      dadosVariaveis: {
        serviceOptionType: false,
        dadosTransacao: {},
        number_valor_transacao: 0.0,
      },
      validClientDocument: 0,
      fieldsOfServicesInputs: [],
    };
  },
  validations: {},
  filters: {
    removeMask(value) {
      if (!value) {
        return;
      }
      return value.replace(/[^\d]/g, "");
    },
  },
  computed: {

    ...mapState({
      typeOfservice: state => state.transaction.typeOfservice,
      fields: state => state.transaction.fields,
      historyUrl: state => state.utils.historyUrl,
      criouSimulacao: state => state.criouSimulacao,
      coefficients: state => state.transaction.coefficients,
      totalDebits: state => state.detran.totalDebits,
      requiredFieldKeysValue: state => state.transaction.requiredFieldKeys,
      simulacaoParcelas: state => state.novaTransacao.parcelas,
      simulacaoRetorno: state => state.novaTransacao.retorno,
      simulacaoTipoTransacao: state => state.novaTransacao.tipo_transacao,
      simulacaoValorTotal: state => state.novaTransacao.valorTotal,
      detranTypeTransaction: state => state.detran.typeTransaction,
      detranFee: state => state.detran.fee,
      externalProductPayment: state => state.externalProductPayment,
    }),
    fieldsEach() {
      return this.fields.map(field => ({
        ...field,
        fieldKeyValid: this.dadosVariaveis.dadosTransacao[field.fieldKey],
      }));
    },
    requiredFieldKeysIDs() {
      return this.fields.map((input) => {
        if (input.isRequired) { return input.fieldKey; }
      });
    },
  },
  watch: {
    dadosVariaveis: {
      async handler(val) {
        try {
          this.startLoading();
          const fieldKeys = [...Object.keys(val.dadosTransacao)];
          const inputsList = [];


          Object.keys(val.dadosTransacao).map((x) => {
            if (this.dadosVariaveis.dadosTransacao[x] === "") {
              delete this.dadosVariaveis.dadosTransacao[x];
            }
          });

          fieldKeys.map((fk) => {
            if (this.$refs[`${fk}`]) {
              inputsList.push(this.dadosVariaveis.dadosTransacao[fk]);
            }
          });

          const totalValue = inputsList.reduce((prevVal, elem) => prevVal + Number(elem), 0);

          this.number_valor_transacao = totalValue;

          this.saveTotalValue(this.number_valor_transacao);

          if (Object.keys(this.dadosVariaveis.dadosTransacao).length >= this.requiredFieldKeysIDs.length && totalValue > 0) this.requiredFieldsKeys(true);
          else this.requiredFieldsKeys(false);

          this.saveDadosVariaveis(this.dadosVariaveis);

          this.simulationTable();

        this.finishLoading();
        } catch (error) {
        this.finishLoading();
          console.warn(error);
          return this.$swal({
            title: "Desculpe",
            text: "Tivemos um problema\n Por favor, tente novamente, se o problema persistir entre em contato com a Listo.",
            icon: "error",
            confirmButtonText: "OK",
            showCloseButton: true,
            customClass: "swal-listo",
          });
        }
      },
      deep: true,
    },

    typeOfservice() {
      const fieldKeys = [...Object.keys(this.dadosVariaveis.dadosTransacao)];
      fieldKeys.map((fk) => {
        if (this.$refs[`${fk}`]) {
          this.dadosVariaveis.dadosTransacao[fk] = 0;
        } else {
          this.dadosVariaveis.dadosTransacao[fk] = null;
        }
      });
    },

    coefficients() {
        this.handleSubmit();
    },
    transactionTypes(oldValue, newValue) {
      this.fieldsOfServices();
    },

  },
  mounted() {
    if (this.criouSimulacao && this.simulacaoParcelas.value > 0) {
      this.number_valor_transacao = this.simulacaoValorTotal;
      this.totalTransacao = this.simulacaoValorTotal;
    }
    this.fieldsOfServices();
  },
  methods: {
    ...mapActions({
      saveDadosVariaveis: "transaction/saveDadosVariaveis",
      getCoefficients: "transaction/getTransactionCoefficients",
      requiredFieldsKeys: "transaction/requiredFieldsKeys",
      simulationTable: "transaction/simulationTable",
      saveTotalValue: "transaction/saveTotalValue",
    }),
    ...mapMutations(["startLoading", "finishLoading"]),


    fieldsOfServices() {
      this.fieldsOfServicesInputs = this.fields;
      if (this.historyUrl === "/debitos-veiculares/detran/ipva") {
        this.externalTransaction = true;
        this.setDetranFieldKeys();
        this.blockingFields();
        return;
      }

      if (this.criouSimulacao) {
        const firstNumericFieldKey = this.fieldsOfServicesInputs.filter(x => x.typeContent == "Numeric")[0];
        this.dadosVariaveis.dadosTransacao[firstNumericFieldKey.fieldKey] = this.totalTransacao;
      }
    },

    blockingFields() {
      const blockFieldsCandidates = ["totalDebits", "detranFee", "renavan", "estado", "cpfCnpj", "placa", "email"];
      blockFieldsCandidates.forEach((blockFieldCandidate) => {
        if (this[blockFieldCandidate] !== "") {
          this.blockFields[blockFieldCandidate] = true;
        }
      });
    },

    setDetranFieldKeys() {
      this.fieldsOfServicesInputs.forEach((fieldKey) => {
        this.setFieldKeysDetranValues(fieldKey.fieldKeyTypeID, fieldKey.fieldKey);
      });
    },

    setFieldKeysDetranValues(fieldKeyTypeID, fieldKeyName) {
      const totalDebitsFieldKeyId = 3;
      const detranFeeFieldKeyId = 4;
      const renavanFieldKeyId = 49;
      const stateFieldKeyId = 51;
      const documentNumberFieldKeyId = 21;
      const plateFieldKeyId = 37;
      const emptyFieldKeyId = 32;
      const emailFieldKeyId = 24;
      switch (fieldKeyTypeID) {
        case totalDebitsFieldKeyId:
          this.dadosVariaveis.dadosTransacao[fieldKeyName] = this.totalDebits;
          break;
        case detranFeeFieldKeyId:
          this.dadosVariaveis.dadosTransacao[fieldKeyName] = this.detranFee;
          break;
        case renavanFieldKeyId:
          this.dadosVariaveis.dadosTransacao[fieldKeyName] = this.renavan;
          break;
        case stateFieldKeyId:
          this.dadosVariaveis.dadosTransacao[fieldKeyName] = this.estado;
          break;
        case documentNumberFieldKeyId:
          this.dadosVariaveis.dadosTransacao[fieldKeyName] = this.cpfCnpj;
          break;
        case plateFieldKeyId:
          this.dadosVariaveis.dadosTransacao[fieldKeyName] = this.placa;
          break;
        case emptyFieldKeyId:
          this.dadosVariaveis.dadosTransacao[fieldKeyName] = "";
          break;
        case emailFieldKeyId:
          this.dadosVariaveis.dadosTransacao[fieldKeyName] = this.email;
          break;
        default:
          break;
      }
    },


    handleSubmit() {
      this.startLoading();
      if (!this.requiredFieldKeysValue) {
        return;
      }
      this.saveTotalValue(this.number_valor_transacao);
      this.saveDadosVariaveis(this.dadosVariaveis);
      this.finishLoading();
    },
  },
};
</script>

<style lang="less" scoped>
@import "~assets/vars.less";
@import "~assets/variables.less";
.button {
  background: black;
  color: #ffff00;
  text-transform: uppercase;
}
#transacao-passo-1 {
  #serviceType,
  #transactionData {
    padding: 0;
  }

  ul {
    list-style-type: none;
    padding-left: 2px;
    margin: 0;
  }
}
.services {
  position: relative;
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
.services-auto {
  margin: 10px 0;
}
.select {
  margin-bottom: 0px !important;
  select {
    margin-bottom: 0px !important;
  }
}
button {
  background: #000;
  color: @color7;
  text-transform: uppercase;
}
</style>
