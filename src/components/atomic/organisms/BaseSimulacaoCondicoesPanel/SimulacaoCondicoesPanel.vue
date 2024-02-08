<template>
  <Base-Panel class="table-installments">
    <template #header>{{ headerTitle }}</template>
    <div class="row">
      <div class="col-xs-12">
        <table class="table table-striped box-retorno">
          <thead>
            <th class="retorno">
              <strong v-show="hideSelect">{{
                $t("labels.simulacaoCondicoes.retorno")
              }}</strong>
            </th>
            <th class="select-retorno">
              <Base-Select
                v-show="hideSelect"
                selectClass="simulacaoCondicoesSelect"
                :placeholder="'R0'"
                disabled
                :id="selectReturn.id"
                :name="selectReturn.id"
              >
              </Base-Select>
            </th>
            <th class="table-title">
              <strong>{{
                $t("labels.simulacaoCondicoes.valorParcela")
              }}</strong>
            </th>
            <th class="table-title">
              <strong>{{ $t("labels.simulacaoCondicoes.valorTotal") }}</strong>
            </th>
          </thead>
          <tbody>
            <tr v-for="(installment, index) in installments" :key="index">
              <td class="option-installment-select">
                <Base-Radio
                  isTextRelative
                  :name="`installment-choice-${labelInstallmentUnique}`"
                  @input="chooseInstallment(installment)"
                  :native-value="installment"
                  >{{ installment.text }}</Base-Radio
                >
              </td>
              <td class="installment-item" colspan="2">
                <ContentLoader v-if="showInstallments" :height="20" />
                <span v-else>{{ installment.price | replaceMoney }}</span>
              </td>
              <td class="installment-item" colspan="2">
                <ContentLoader v-if="showInstallments" :height="20" />
                <span v-else>{{ installment.totalPrice | replaceMoney }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="row" v-if="hasContractButton">
      <div class="col-xs-12">
        <Base-Button
          :disabled="!enableContract"
          :class="{ 'is-disabled': !enableContract }"
          @click="$emit('contract', installmentChoose)"
        >
          <span>CONTRATAR</span>
        </Base-Button>
      </div>
    </div>
    <div class="row" v-if="hasActions">
      <div class="col-xs-6">
        <Base-Button
          class="btn-action"
          :disabled="!enableActions"
          @click="printSimulation()"
        >
          <span class="glyphicon glyphicon-print"></span>
          <span class="text">{{ $t("buttons.imprimir") }}</span>
        </Base-Button>
      </div>
      <div class="col-xs-6">
        <Base-Button
          class="btn-action"
          :disabled="!enableActions"
          @click="sendSimulation()"
        >
          <span class="glyphicon glyphicon-envelope"></span>
          <span class="text">{{ $t("buttons.enviar") }}</span>
        </Base-Button>
      </div>
    </div>

    <Base-SimulacaoNovoFinanciamentoModal
      :active="modals.simulacaoNovoFinanciamento"
      :transactionObj="transactionObj"
      @close="modals.simulacaoNovoFinanciamento = false"
    />
  </Base-Panel>
</template>

<script>
import { ContentLoader } from "vue-content-loader";

export default {
  components: {
    ContentLoader
  },
  filters: {
    replaceMoney(value) {
      return value
        .replace(/,/gi, ".")
        .replace(/\.([^.]*)$/, ",$1")
        .replace("$", "$ ");
    }
  },
  computed: {
    selectReturn() {
      return this.select ? this.select : {};
    },
    hideSelect() {
      return this.select;
    }
  },
  data() {
    return {
      installmentChoose: {},
      transactionObj: {
        telefone: ""
      },
      print: false,
      modals: {
        simulacaoNovoFinanciamento: false
      }
    };
  },

  methods: {
    chooseInstallment($event) {
      this.$emit("onChooseInstallment", $event);
      this.installmentChoose = $event;
    },
    printSimulation() {
      let telefones = null;
      let nomeFantasia = null;

      this.$axios
        .get(`${process.env.API_AFFILIATE}/affiliates/contacts`)
        .then(response => {          
          telefones = response.data[0].phones;

          this.$axios
            .get(`${process.env.API_AFFILIATE}/affiliates`)
            .then(response => {
              self.loading = false;
              nomeFantasia = response.data.simpleName;
              this.transactionObj = {
                valorSimulado: this.$parent.newPrice,
                anoVeiculo: this.$parent.vehicleYear,
                numeroParcelasFinanciamento: this.$parent.installmentSelected
                  .text,
                valorParcelaFinanciamento: this.$parent.installmentSelected
                  .price,
                valorTotal:
                  this.$parent.installmentSelected.installmentValue *
                  this.$parent.installmentSelected.installmentModeId,
                transactionType: this.$parent.installmentSelected
                  .transactionTypeId,
                nomeFantasia,
                telefone: telefones[0].value
              };
              if (this.$parent.optionSelected === 1) {
                this.transactionObj = {
                  ...this.transactionObj,
                  numeroParcelas: this.$parent.downPayInstallmentSelected.text,
                  valorParcela: this.$parent.downPayInstallmentSelected.price
                };
              }
              this.$emit("print", this.transactionObj);
            })
            .catch(err => console.warn("Err:", err));
        })
        .catch(err => console.warn("Err:", err));
    },
    sendSimulation() {
      this.transactionObj = {
        valorSimulado: this.$parent.newPrice,
        anoVeiculo: this.$parent.vehicleYear,
        numeroParcelasFinanciamento: this.$parent.installmentSelected.text,
        valorParcelaFinanciamento: this.$parent.installmentSelected.price,
        valorTotal:
          this.$parent.installmentSelected.installmentValue *
          this.$parent.installmentSelected.installmentModeId
      };
      if (this.$parent.optionSelected === 1) {
        this.transactionObj = {
          ...this.transactionObj,
          numeroParcelas: this.$parent.downPayInstallmentSelected.text,
          valorParcela: this.$parent.downPayInstallmentSelected.price
        };
      }
      this.modals.simulacaoNovoFinanciamento = true;
    }
  },
  props: {
    showInstallments: {
      type: Boolean,
      default: false
    },
    enableActions: {
      type: Boolean,
      default: false
    },
    installments: {
      type: Array,
      required: true
    },
    enableContract: {
      type: Boolean,
      default: false
    },
    select: {
      type: Object,
      default: null
    },
    hasActions: {
      type: Boolean,
      default: false
    },
    hasContractButton: {
      type: Boolean,
      default: false
    },
    headerTitle: {
      type: String,
      default: ""
    },
    labelInstallmentUnique: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="less" scoped>
@import "~assets/vars.less";
@import "~assets/variables.less";
button {
  background: @color1;
  color: @color7;
  text-transform: uppercase;
}

.table-installments {
  thead {
    .retorno {
      text-align: left;
      width: 20%;
      padding-right: 10px;
    }

    .table-title {
      text-align: right;
    }
  }
  tbody {
    td {
      padding: 0;
    }
    tr {
      .option-installment-select {
        text-align: center;
        vertical-align: middle;
      }
      .installment-item {
        text-align: right;
        vertical-align: middle;
        padding-right: 5px;
        animation-name: animate;
        animation-duration: 2s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
      }
    }
  }
}

.btn-action {
  background: @color1;
  color: @color7;
  text-align: center;
  padding: 0;
  .text {
    display: none;
    max-height: 40px;
  }
  &:hover {
    .text {
      display: block;
    }
    .glyphicon {
      display: none;
    }
  }
}
#retorno-select {
  border: none;
  width: 30px !important;
}
.box-retorno {
  margin-bottom: 32px;
}
</style>
