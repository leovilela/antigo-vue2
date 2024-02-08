<template>
  <div class="container-simulacao">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xs-5">
            <Base-FormMoneyGroup v-bind="money" :label="$t('labels.simulacaoFinanciamento.valorASimular')" @keyup.enter.stop.prevent v-model="price" type="text" class="form__input" />

            <Base-Select placeholder="Selecione um ano" :label="$t('labels.simulacaoFinanciamento.anoCarroASimular')" v-model="vehicleYear" id="years" name="years">
                <option
                    v-for="(year, index) in yearsVehicleAccepted"
                    :value="year.text"
                    :key="index">
                    {{ year.text }}
                </option>
            </Base-Select>

          <fieldset>
              <legend>{{$t('labels.simulacaoFinanciamento.cdcAuto')}}</legend>
              <div class="cdc-options" :class="{'disabled': !(isPriceGreaterThan1 && vehicleYear)} ">
                <Base-Radio name="opcao-simulacao"  v-model="optionSelected" :native-value="1">
                  {{$t('labels.simulacaoFinanciamento.entradaFinanciamento')}}
                </Base-Radio>
                <Base-Radio name="opcao-simulacao"  v-model="optionSelected" :native-value="2">
                  {{$t('labels.simulacaoFinanciamento.apenasFinanciamento')}}
                </Base-Radio>
              </div>
            </fieldset>
            <Base-Button @click="getFoundSimulationValues" :disabled="!(isPriceGreaterThan1 && vehicleYear && optionSelected)  " >Simular</Base-Button>
        </div>
          <div class="col-xs-6 col-xs-push-1" style="min-height: 300px">
            <Base-Loading />
            <div v-if="optionSelected ===  1 && price">
              <Base-FormMoneyGroup v-bind="money" :label="$t('labels.simulacaoFinanciamento.valorEntrada')" @keyup.enter.stop.prevent v-model="downPayment" type="text" class="form__input" />
              <label for="" class="titleLabel">
                  {{$t('labels.simulacaoFinanciamento.entradaMinima')}}: {{downPaymentMinimum.value | showNumberAsCurrency}}
              </label>
              <Base-SimulacaoCondicoesPanel v-if="showInstallmentsBox && !changingSimulation" @print="printComponent($event)" @onChooseInstallment="downPayInstallmentSelected = $event" :installments="downPayInstallments" labelInstallmentUnique="entrada" :select="selectDPrice" :headerTitle="$t('labels.simulacaoFinanciamento.entradaParcelada')" style="font-size: 13px;" />
              <Base-SimulacaoCondicoesPanel :showInstallments="changingSimulation" v-if="showInstallmentsBox && !changingSimulation" :enableActions="enableActions" @print="printComponent($event)" @onChooseInstallment="installmentSelected = $event" :installments="installments" labelInstallmentUnique="financiamento" :headerTitle="$t('labels.simulacaoFinanciamento.condicoesFinanciamento')" :hasActions="true" style="font-size: 13px; margin-top: 0" />
            </div>
            <Base-SimulacaoCondicoesPanel :showInstallments="changingSimulation" v-if="showInstallmentsBox && optionSelected === 2 && !changingSimulation" :enableActions="enableActions" @print="printComponent($event)" @onChooseInstallment="installmentSelected = $event" :installments="installments" :select="selectDPrice" :headerTitle="$t('labels.simulacaoFinanciamento.condicoesFinanciamento')" :hasActions="true" style="font-size: 13px; margin-top: 6px" />
          </div>
      </div>
    </div>
        <div id="impressao" style="border: 1px solid red; position: relative;" v-show="printer" >
          <div class="header" style="background: #343a40"><img src="~assets/img/logo-listo.jpg" width="151" height="22"></div>
          <div>
            <table width="100%" class="tabelavalores">
              <tr>
                <td>Valor a simular:</td>
                <td>{{transactionObj.valorSimulado}}</td>
              </tr>
              <tr v-if="transactionObj.numeroParcelas" class="installment-row">
                <td>Parcela de Entrada: </td>
                <td>{{transactionObj.numeroParcelas}} de {{transactionObj.valorParcela}}</td>
              </tr>
              <tr class="installment-row">
                <td>Parcela de Financiamento: </td>
                <td >{{transactionObj.numeroParcelasFinanciamento}} de {{transactionObj.valorParcelaFinanciamento}}</td>
              </tr>
              <tr class="total-row">
                <td>Total: </td>
                <td>{{transactionObj.valorTotal | showNumberAsCurrency}}</td>
              </tr>
            </table>
          </div>
          <div>
            <p style="text-align: center; font-family: Arial, sans-serif">Simulação realizada em <strong>{{transactionObj.nomeFantasia}}</strong></p>
            <p style="text-align: center; font-family: Arial, sans-serif">Telefone: <strong>{{transactionObj.telefone}}</strong></p>
          </div>
      </div>
  </div>
</template>

<script>
import Printd from "printd";
import { Money } from "v-money";
import dayjs from "dayjs";
import { format } from "money-formatter";
import { mapState, mapActions, mapMutations } from "vuex";

const minValueFounded = 150;
const minValueDownPayment = 0.01;
const MAX_VALUE_FOUNDED = 2000;

export default {
  components: {
    Money,
  },
  filters: {
    showNumberAsCurrency(number) {
      if (number) {
        const numero = number.toFixed(2).split(".");
        numero[0] = `R$ ${numero[0].split(/(?=(?:...)*$)/).join(".")}`;
        return numero.join(",");
      }
    },
  },
  computed: {
    ...mapState({
      separatedSimulation: state => state.simulacao.financiamento.separatedSimulation,
      separatedDownPay: state => state.simulacao.financiamento.separatedDownPay,
    }),
    price: {
      get() {
        return this.newPrice;
      },
      set(value) {
        this.newPrice = value;
        this.newDownPayment = value * 0.2;
        if (!value) {
          this.optionSelected = null;
        }
      },
    },
    yearsVehicleAccepted() {
      return new Array(25).fill(0).map((a, index) => {
        let today = dayjs();
        today = today.subtract(index, "y");
        return { text: `${today.year()}` };
      });
    },
    isPriceGreaterThan1() {
      return this.price >= minValueFounded;
    },
    isDownPayGreaterThan1() {
      return this.downPayment >= this.downPaymentMinimum.value;
    },
    installments() {
      if (this.downPayment && this.downPayment > 0) {
        return this.$services.simulation.mapInstallments(this.separatedSimulation, this.price - this.downPayment);
      }
      return this.$services.simulation.mapInstallments(this.separatedSimulation, this.price);
    },
    downPayInstallments() {
      return this.$services.simulation.mapDownPayInstallments(this.separatedDownPay, this.downPayment);
    },
    enableActions() {
      if (this.optionSelected === 1) {
        return !!this.installmentSelected && !!this.downPayInstallmentSelected;
      }
      return !!this.installmentSelected;
    },
    downPaymentMinimum() {
      const minimumPrice = this.price * 0.2;
      return {
        text: format("BRL", minimumPrice),
        value: minimumPrice,
      };
    },
    downPayment: {
      get() {
        if (this.optionSelected === 2) {
          return 0;
        }
        if (this.newDownPayment >= this.newPrice) {
          return this.newPrice;
        }
        if (this.newDownPayment <= this.downPaymentMinimum.value) {
          return this.downPaymentMinimum.value;
        }
        return this.newDownPayment;
      },
      set(value) {
        this.updateDownPaymentSimulation = false;
        this.newDownPayment = value;
      },
    },
  },
  data() {
    return {
      changingSimulation: false,
      printer: false,
      showInstallmentsBox: false,
      updateDownPaymentSimulation: false,
      vehicleYear: "",
      installmentSelected: null,
      downPayInstallmentSelected: null,
      selectDPrice: {
        id: "retorno-select",
        options: [{ value: "R0", text: "R0" }],
      },
      transactionObj: {},
      isGettingSimulationValues: false,
      newPrice: "",
      newDownPayment: "",
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        suffix: " ",
        precision: 2,
        masked: false,
      },
      optionSelected: null,
    };
  },
  watch: {
    optionSelected(value) {
      if (value === 2) {
        this.newDownPayment = "";
        return;
      }
      this.newDownPayment = this.downPaymentMinimum.value;
    },
    price() {
      this.changingSimulation = true;
    },
    downPayment() {
      this.changingSimulation = true;
      if ((!this.showInstallmentsBox || !this.isDownPayGreaterThan1) && this.downPayment > 0) {
        return;
      }
      if (this.downPayment === this.price) {
        this.$nextTick(() => {
          this.newDownPayment = this.price - MAX_VALUE_FOUNDED;
        });
      }
    },
  },
  methods: {
    async onSelectVehicleYear(year) {
      this.vehicleYear = year;
      if (this.showInstallmentsBox) {
        await this.getFoundSimulationValues();
      }
    },
    printComponent(event) {
      this.transactionObj = { ...event };
      this.imprimir();
    },
    imprimir() {
      this.printer = true;
      const p = new Printd();
      const css = `
      * {
        -webkit-print-color-adjust: exact !important;
        color-adjust: exact !important;
      }
      #impressao{
        display:inline;
        };
        .total-row {
          display: none;
        }
      #impressao div.header{
        /* background: #343a40; width: 100%; display:block*/
        }
      #impressao table tr td{
        font-family: arial;
        background: #e4e4e4;
      }

      #impressao .tabelavalores {
        width: 100%;
      }
      #impressao .tabelavalores thead th {
        text-align: center;
      }
      #impressao .tabelavalores thead th:first-child {
        padding-left: 10px;
        text-align: left;
      }
      #impressao .tabelavalores thead th:last-child {
        text-align: right;
      }
      #impressao .tabelavalores tbody tr .valorTotalParcela {
        text-align: center;
      }
      #impressao .tabelavalores tbody tr .optionValorParcela {
        padding-left: 8px;
        font-family: arial;
        font-size: 12px;
        position: relative;
      }
      #impressao .tabelavalores tbody tr .valorParcela {
        font-family: arial;
        font-size: 12px;
        text-align: right;
      }
      #impressao .tabelavalores tbody tr td {
        text-align: center;
      }
      #impressao .tabelavalores tbody tr td:first-child {
        text-align: left;
      }
      #impressao .tabelavalores tbody tr td:last-child {
        padding-right: 10px;
        text-align: right;
      }
      #impressao .tabelavalores tbody tr:nth-child(odd) {
        background-color: #cfd2d3 ;
      }
      #impressao .tabelavalores tbody tr:last-child:nth-child(even) {
        border-bottom: 1px solid #f0f0f0;
      }
        `;
      const element = document.getElementById("impressao");

      this.$nextTick(() => {
        p.print(element, [css]);
        this.printer = false;
      });
    },
    async getFoundSimulationValues() {
      if (!this.vehicleYear && !this.isDownPayGreaterThan1) {
        return;
      }
      const hasToDownPayValues = this.optionSelected === 2;
      try {
        this.isGettingSimulationValues = true;
        this.transactionObj = {};
        this.startLoading();
        await this.getSeparatedSimulationValues({
          downPayValue: this.downPayment || 0,
          vehicleValue: this.price,
          vehicleYear: this.vehicleYear,
        });
        this.showInstallmentsBox = true;
        this.isGettingSimulationValues = false;
        this.updateDownPaymentSimulation = false;
        this.installmentSelected = null;
        this.downPayInstallmentSelected = null;
        this.transactionObj = {};
        this.changingSimulation = false;
      } catch (error) {
        this.isGettingSimulationValues = false;
        this.installmentSelected = null;
        this.downPayInstallmentSelected = null;
        console.warn({ error });
      } finally {
        this.finishLoading();
      }
    },
    ...mapActions({
      getSeparatedSimulationValues: "simulacao/financiamento/getSeparatedSimulationValues",
    }),
    ...mapMutations(["startLoading", "finishLoading"]),
  },
  mounted() {
    this.finishLoading();
  },
};
</script>

<style lang="less" scoped>

@import "~assets/vars.less";
@import "~assets/variables.less";
.container-simulacao {
  border-bottom: 1px solid #ccc;
  border-left: 1px solid #ccc;
  padding: 10px 0;
  border-right: 1px solid #ccc;
}
.cdc-options {
  margin-left: 20px;
  &.disabled {
    pointer-events: none;
    opacity: .5;
  }
}

.form-value-simulation {
  margin-top: 5px;
}


.form-group {
  label {
      font-family: 'newjunebook';
    font-size: 16px;
    margin: 0;
    padding: 0;
    padding-bottom: 5px;
  }
}
#impressao{
  .tabelavalores {
    width: 100%;
    thead {
      th {
        text-align: center;

        &:first-child {
          padding-left: 10px;
          text-align: left;
        }

        &:last-child {
          text-align: right;
          // padding-right: 10px;
        }
      }
    }
    .total-row {
      display: none;
    }
    tbody {
      tr {
        .valorTotalParcela {
          text-align: center;
        }
        .optionValorParcela {
          padding-left: 8px;
          font-family: @mainFontLight;
          font-size: @ftSizeSmall;
          position: relative;
        }
        .valorParcela {
          font-family: @mainFontLight;
          font-size: @ftSizeSmall;
          text-align: right;
        }

        td {
          text-align: center;
          &:first-child {
            // padding-left: 10px;
            text-align: left;
          }

          &:last-child {
            padding-right: 10px;
            text-align: right;
          }
        }

        &:nth-child(odd) {
          background-color: @color20;
        }

        &:last-child:nth-child(even) {
          border-bottom: 1px solid @color14;
        }
      }
    }
  }
}
</style>
