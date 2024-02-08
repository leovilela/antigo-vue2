<template>
  <section class="page-financiamentos-auto page-financiamentos-auto--simulacao container-fluid" id="simulacao-de-entrada">
    <div class="row">
      <div id="dados-veiculo" class="col-xs-12">
        <div class="panel panel-default">
          <div class="panel-heading">
            <span>{{$t('titles.simulacao')}} </span>

          </div>
          <div class="panel-body">
              <div class="row">
                <div class="col-xs-12">
                  {{$t('labels.simulacaoFinanciamento.entradaMinima')}}: <b> {{simulation.valueEntrance | formatPrice}} </b>
                </div>
              </div>
            <div class="row">
              <div class="col-xs-12">

                  <vue-slider
                  v-model="downPayment"
                  height="8px"
                  :stepStyle="slider.styles.step"
                  :railStyle="slider.styles.rail"
                  :processStyle="slider.styles.process"
                  :tooltipFormatter="slider.formatter"
                  :labelFormatter="slider.formatter"
                  :process="processed"
                  :direction="'rtl'"
                  :interval="0.1"
                  :max="car.marketValue"
                  :dotSize="15"
                  :dotOptions="{  min: simulation.valueEntrance, max: maxValueFounded, style: { backgroundColor: 'white', border: '4px solid black' }}"
                  >

                  </vue-slider>
              </div>
            </div>
            <div class="row">
              <div class="col-xs-4">
                <div class="pull-left">
                  <p>
                  Valor Financiado
                  <br>
                    <money v-model="simulationData.fundedValue" disabled  class="paymentInput" v-bind="money"></money>
                  </p>
                </div>
              </div>
              <div class="col-xs-4 col-xs-push-4">
                <div class="pull-right">
                  <p>
                    Valor de entrada

                  <br>
                    <money v-model="downPayment"  :key="downPayment"  class="paymentInput" v-bind="money"></money>
                  </p>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-xs-4">
                <span>{{$t('labels.simulacaoFinanciamento.contratarTC3')}} <span class="btn btn-link is-clickable" @click="showTC3Modal = true"> {{$t('labels.simulacaoFinanciamento.oQueE')}}</span> </span>
              </div>
              <div class="col-xs-5">
                <Base-Radio id="tc3" name="tc3" :native-value="true" v-model="simulationData.hasTC3"  style="width: 50px; margin-left: 30px;  display: inline-block;" >
                  {{$t('labels.simulacaoFinanciamento.sim')}}
                </Base-Radio>
                <Base-Radio  id="tc3" name="tc3" :native-value="false" v-model="simulationData.hasTC3" style="width: 50px; margin-left: 30px;  display: inline-block;">
                  NÃO
                </Base-Radio>
              </div>
            </div>
            <div class="row">
              <div class="col-xs-4">
                <span>{{$t('labels.simulacaoFinanciamento.parcelarPagarEntradaComCartao')}}</span>
              </div>
              <div class="col-xs-4">
                <Base-Radio class="form-radio" name="installment" :native-value="true" v-model="simulationData.hasInstallments" style="width: 50px; margin-left: 30px;  display: inline-block;" >
                  {{$t('labels.simulacaoFinanciamento.sim')}}
                </Base-Radio>
                <Base-Radio  class="form-radio" name="installment" :native-value="false"  v-model="simulationData.hasInstallments" style="width: 50px; margin-left: 30px;  display: inline-block;">
                  NÃO
                </Base-Radio>
              </div>
              <div class="col-xs-3 col-xs-push-1">
                <Base-Button :class="{'is-disabled': isButtonDisabled}" :disabled="isButtonDisabled" @click="onCalcSimulation" >{{$t('buttons.calcular')}}</Base-Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Base-Tc3Modal :active="showTC3Modal" @close="showTC3Modal = false" @print="console.log('print')"></Base-Tc3Modal>
    </div>
  </section>
</template>

<script>

import { Money } from "v-money";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";
import { format } from "money-formatter";

import { mapState, mapActions, mapMutations } from "vuex";
import { DEFAULT_PRODUCT_TYPE, DEFAULT_TRANSACTION_TYPE } from "./index.vue";


export default {
  components: {
    VueSlider,
    Money,
  },
  computed: {
    maxValueFounded() {
      return this.car.marketValue - this.minValueFinancing;
    },
    downPayment: {
      set(value) {
        if (value >= this.maxValueFounded) {
          this.simulationData.downPaymentValue = this.maxValueFounded;
          this.simulationData.fundedValue = this.minValueFinancing;
          return;
        }
        if (value < this.simulation.valueEntrance) {
          this.simulationData.downPaymentValue = this.simulation.valueEntrance;
          return;
        }
        this.simulationData.downPaymentValue = value;
        this.simulationData.fundedValue = this.car.marketValue - value;
      },
      get() {
        return this.simulationData.downPaymentValue;
      },
    },
    processed() {
      return (val) => {
        const arr = [[0, this.percentageDownPay]];
        arr.unshift([
          0,
          val,
          {
            backgroundColor: "#cadbe8",
          },
        ]);
        return arr;
      };
    },
    isButtonDisabled() {
      return !(this.simulationData.hasInstallments !== null && this.simulationData.hasTC3);
    },

    ...mapState({
      simulation: state => state.simulacao.financiamento.simulation,
      minValueFinancing: state => state.simulacao.financiamento.simulation.validationData.valueLimitMin,
      car: state => state.simulacao.fipe.vehicle,
      documentNumber: state => state.simulacao.preCadastro.documentNumber,
      serviceId: state => state.transaction.financeService[0].serviceID,
    }),
  },
  filters: {
    formatPrice(value) {
      return format("BRL", value);
    },
  },
  data() {
    return {
      simulationData: {
        hasTC3: null,
        hasInstallments: null,
        downPaymentValue: 0,
        fundedValue: 0,
      },
      percentageDownPay: 0,
      showTC3Modal: false,
      slider: {
        styles: {
          rail: { backgroundColor: "yellow", border: "1px solid black" },
          process: { backgroundColor: "black" },
          step: {
            backgroundColor: "white", border: "2px solid black", display: "block", width: "8px", height: "8px", transform: "translate(-2px, -2px)",
          },
        },
        formatter: value => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
      },
      minValueFounded: 0,
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        suffix: "",
        precision: 2,
        masked: false,
      },
    };
  },
  destroyed() {
    this.cleanState();
  },
  watch: {
    simulationData: {
      deep: true,
      handler(val, oldVal) {
        this.$emit("changeSimulation");
        if (!val.hasTC3 && val.hasTC3 !== null) {
          this.showTC3Modal = true;
          val.hasTC3 = null;
        }
        if (val.fundedValue < this.minValueFinancing) {
          this.$nextTick(() => {
            val.downPaymentValue = this.maxValueFounded;
          });
        }
      },
    },
  },
  methods: {
    async onCalcSimulation() {
      this.startLoading();
      try {
        const coefficients = await this.getCoefficient({
          downPayValue: this.simulationData.downPaymentValue,
          document: this.documentNumber,
          modelYearId: this.car.year.id,
          transactionTypeId: DEFAULT_TRANSACTION_TYPE,
          rType: 0,
          releasedValue: this.car.marketValue,
          serviceType: this.serviceId,
          productType: DEFAULT_PRODUCT_TYPE,
        });
        this.finishLoading();
        this.$emit("finishSimulation", {
          simulationData: this.simulationData, coefficients, downPayment: this.simulationData.downPaymentValue, hasInstallments: this.simulationData.hasInstallments,
        });
      } catch (error) {
        this.finishLoading();
        console.log(error);
        if (error.status === 204) {
          return this.$swal({
            title: "Atenção!",
            text: "Nas condições apresentadas, não foi possível dar sequência a este financiamento. Altere os dados do bem que se pretende financiar e/ou valor de entrada e calcule novamente. Obrigado!",
            icon: "error",
            confirmButtonText: "OK",
            showCloseButton: true,
            customClass: "swal-listo",
          });
        }
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
    onBlurValidation() {
      if (this.isDownPaymentValid(this.simulationData.downPaymentValue)) {
        // this.simulationData.downPaymentValue = 0;
        this.$nextTick(() => {
          this.simulationData.downPaymentValue = this.simulation.valueEntrance;
        });
      }
    },
    isDownPaymentValid(value) {
      return value >= this.simulation.valueEntrance || value <= this.maxValueFounded;
    },
    ...mapActions(
      {
        cleanState: "simulacao/financiamento/cleanState",
        getCoefficient: "simulacao/financiamento/getCoefficients",
      },
    ),
    ...mapMutations(["startLoading", "finishLoading"]),
  },
  mounted() {
    this.simulationData.fundedValue = this.simulation.valueLimitLoan;
    this.simulationData.downPaymentValue = this.simulation.valueEntrance;
    this.percentageDownPay = Math.round((this.simulation.valueEntrance / this.car.marketValue) * 100);
  },
};
</script>

<style lang="less" >
@import "~assets/vars.less";

button {
  background: @color1;
  color: @color7;
  text-transform: uppercase;
}


.is-clickable {
  cursor: pointer;
  border-bottom: 1px solid #000;
  color: blue;
}
.paymentInput {
      border-bottom: 1px solid #000;
    width: 110px;
    background-color: transparent;
    border-top: none;
    border-left: none;
    border-right: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: unset;
    outline: none;
}

  .custom-mark {
    position: absolute;
    top: 10px;
    transform: translateX(-5%);
    white-space: nowrap;
  }

.page-financiamentos {
  .panel {
    &-default {
      .panel-heading {
        background-color: @color1;
        color: @color2;
      }
    }
  }
}
.page-financiamentos-auto {
  &--simulacao {
    #dados-veiculo {
      .field-veiculo-novo {
        margin-top: 10px;
        padding-bottom: 10px;
      }
      #slider-financiamento {
        margin: 15px 0
      }
    }
  }
}

.labelTotalFinanciado {
  margin: 0;
  padding: 0;
  float: right;
}
</style>
