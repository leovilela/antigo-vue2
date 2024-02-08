<template>
  <section :class="{ 'page-simulacao-auto--simulacao page-simulacao-auto container-fluid ': $mq === 'bigScreen'}" v-if="totalDebits && valueTotal > 0" >
    <div>
      <!-- div class="row" v-if="debits.result.tributos.length > 0" -->
      <div>
        <div id="pre-cadastro">
          <div class="panel panel-default">
            <div class="panel-heading">
              <span>{{$t('titles.simulacaoTransacao')}}</span>
            </div>
            <div class="panel-body tableResultado">
              <Money :value="valueTotal" type="text" name="simulation" id="value" disabled></Money>
              <ul class="tabrow" v-show="listaRetornos.length > 1 && valueTotal > 0 ">
                  <li class="opcao" v-bind:class="{ ativo: toggleParcela}" @click="ftoggleParcela">{{$t('labels.detran.parcelas')}}</li>
                  <li class="opcao" v-bind:class="{ ativo: !toggleParcela}" @click="ftoggleParcela">{{$t('titles.transacao')}}</li>
                  </ul>
               <ul class="tabrow tabrowRetorno  col-xs-12  col-md-12  col-lg-12" v-show="listaRetornos.length > 1 && valueTotal > 0 && !toggleParcela">
                    <li class="opcao" @click="ftoggleRetorno($event)" v-for="(retorno, index) in listaRetornos" :key="index" :value="retorno" :id="retorno" :class="{ativo: retorno == retornoAtivo}">R{{retorno}}</li>
                  </ul>
              <form @submit.prevent="">


                    <table class="tabelavalores">

                      <thead v-if="typeTransaction == 1 || typeTransaction == 8">
                        <th><span>&nbsp;</span></th>
                        <th>{{$t('labels.transacao.valorLiberado')}}</th>
                        <th>{{$t('labels.transacao.valorTransacao')}}</th>
                      </thead>

                      <thead v-if="typeTransaction == 4">
                        <th>&nbsp;</th>
                        <th>{{$t('labels.transacao.valorParcela')}}</th>                        
                        <th style="text-align: right; padding-right: 10px;">{{$t('labels.transacao.valorTotal')}}</th>
                      </thead>

                      <thead v-if="typeTransaction == 2">
                        <th>&nbsp;</th>
                        <th>{{$t('labels.transacao.valorTransacao')}}</th>
                        <th>{{$t('labels.transacao.valorLiberado')}}</th>
                        <th>{{$t('labels.transacao.valorTotalLiberado')}}</th>
                      </thead>

                      <tbody>
                        <tr v-for="(parcela, index) in simulationInstalment" :key="index" >

                          <td class="optionValorParcela" v-if="typeTransaction == 1 && parcela.value && parcela.ParcelaComCoeficiente"><label><input type="radio" name="installment" v-model="parcelaSelecionada"
                            @change="showVariables(parcela)" :value="parcela.parcela">
                            <span v-if="typeTransaction == 1 || typeTransaction == 8">{{$t('labels.transacao.parcelaUnica')}}</span>
                            <span v-else>{{parcela.parcela}}x</span>
                            </label>
                          </td>

                          <td class="optionValorParcela" v-if="typeTransaction == 8 && parcela.ParcelaComCoeficiente && parcela.value"><label><input type="radio" name="installment" v-model="parcelaSelecionada"
                            @change="showVariables(parcela)" :value="parcela.parcela">
                            <span v-if="typeTransaction == 1 || typeTransaction == 8">{{$t('labels.transacao.parcelaUnica')}}</span>
                            <span v-else>{{parcela.parcela}}x</span>
                            </label>
                          </td>

                          <td class="optionValorParcela" v-if="typeTransaction == 4 && parcela.ParcelaComCoeficiente && parcela.liberadoComCoeficiente && parcela.totalParcelas"><label><input type="radio" name="installment" v-model="parcelaSelecionada"
                            @change="showVariables(parcela)" :value="parcela.parcela">
                            <span v-if="typeTransaction == 1 || typeTransaction == 8">{{$t('labels.transacao.parcelaUnica')}}</span>
                            <span v-else>{{parcela.parcela}}x</span>
                            </label>
                          </td>

                          <td class="optionValorParcela" v-if="typeTransaction == 2 && parcela.valorParcelaOriginal && parcela.ParcelaComCoeficiente && parcela.totalParcelas"><label><input type="radio" name="installment" v-model="parcelaSelecionada"
                            @change="showVariables(parcela)" :value="parcela.parcela">
                            <span v-if="typeTransaction == 1 || typeTransaction == 8">{{$t('labels.transacao.parcelaUnica')}}</span>
                            <span v-else>{{parcela.parcela}}x</span>
                            </label>
                          </td>

                          <td v-if="typeTransaction == 1 && parcela.value && parcela.ParcelaComCoeficiente">{{parcela.value | currency}}</td>
                          <td v-if="typeTransaction == 1 && parcela.value && parcela.ParcelaComCoeficiente">{{parcela.ParcelaComCoeficiente | currency}}</td>

                          <td v-if="typeTransaction == 8 && parcela.ParcelaComCoeficiente && parcela.value">{{parcela.ParcelaComCoeficiente | currency}}</td>
                          <td v-if="typeTransaction == 8 && parcela.ParcelaComCoeficiente && parcela.value">{{parcela.value | currency}}</td>

                          <td v-if="typeTransaction == 4 && parcela.ParcelaComCoeficiente && parcela.liberadoComCoeficiente && parcela.totalParcelas">{{parcela.ParcelaComCoeficiente | currency}}</td>
                          <td v-if="typeTransaction == 4 && parcela.ParcelaComCoeficiente && parcela.liberadoComCoeficiente && parcela.totalParcelas">{{parcela.totalParcelas | currency}}</td>

                          <td v-if="typeTransaction == 2 && parcela.valorParcelaOriginal && parcela.ParcelaComCoeficiente && parcela.totalParcelas">{{parcela.valorParcelaOriginal | currency}}</td>
                          <td v-if="typeTransaction == 2 && parcela.valorParcelaOriginal && parcela.ParcelaComCoeficiente && parcela.totalParcelas">{{parcela.ParcelaComCoeficiente | currency}}</td>
                          <td v-if="typeTransaction == 2 && parcela.valorParcelaOriginal && parcela.ParcelaComCoeficiente && parcela.totalParcelas">{{parcela.totalParcelas | currency}}</td>

                        </tr>
                      </tbody>
                    </table>
                  </form>

                  <div class="row" v-show="parcelaSelecionada">


                    <div v-if="$mq !== 'mobile' && $mq !== 'tablet'" class="col-xs-12">
                      <div class="col-xs-12 padding10">
                        <strong>{{$t('alerts.horario_limite')}}</strong>
                      </div>
                      <Base-Button type="submit" @click="handleSubmit" :disabled="!time">{{$t('buttons.pagar')}}</Base-Button>
                    </div>

                    <!-- div v-if="$mq !== 'mobile' && $mq !== 'tablet'" class="col-xs-12 col-sm-6">
                      <Base-Button type="submit"  @click="printSimulation()">{{$t('buttons.imprimir')}}</Base-Button>
                    </div>

                    <div class="col-xs-12 col-sm-6" >
                      <Base-Button type="submit"  @click="sendSimulation()">{{$t('buttons.enviarEmail')}}</Base-Button>
                    </div -->


                  </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

import { Money } from "v-money";
import { mapState, mapActions, mapMutations } from "vuex";

import {
  showNumberAsCurrency,
} from "~/utils/currency.utils";


export default {
  components: { Money },
  data() {
    return {
      detran: {
        nameOperation: "debitosVeiculares",
        time: "",
        date: "",
        generalData: {},
        operation: 0,
        fee: 0,
        serviceId: 0,
        boletos: [],
        totalDebits: 0,
        valorTotal: 0,
        activeIpva: {},
        typePayment: {},
        typePaymentTransactionActive: {},
        typePaymentVista: "vista",
        typePaymentParcelado: "parcelado",
        sumParcelas: {},
        dadosVeiculo: {
          ano: null,
          chassi: null,
          cor: null,
          marca: null,
          mensagem: null,
          renavan: null,
          valorVenal: null,
        },
        activeFilters: [{ valor: "multas" }, { valor: "licenciamento" }, { valor: "ipva" }, { valor: "outros" }],
      },
      toggleParcela: true,
      parcelaSelecionada: 0,
      parcelasSimulacao: {
        options: [],
      },
      posicaoArrayRetornoFatores: 0,
    };
  },
  filters: {
    currency(value) {
      if (!value) {
        return;
      }
      return showNumberAsCurrency(value);
    },
  },
  destroyed() {
    // this.cleanClient();
  },
  watch: {
    async valueTotal(newValue, oldValue) {
      try {
        this.startLoading();
        this.parcelaSelecionada = null;
        await this.getCheckBlockTime();
        await this.getCoefficients();
        this.clearSelectInstalment();
        this.finishLoading();
      } catch (error) {
        this.finishLoading();
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
    async typeTransaction(newValue, oldValue) {
      try {
        this.startLoading();
        this.parcelaSelecionada = null;
        await this.getCheckBlockTime();
        await this.getCoefficients();
        this.clearSelectInstalment();
        this.finishLoading();
      } catch (error) {
        console.warn({ error });
        this.finishLoading();
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
    simulationInstalment(oldValue, newValue) {
      const newInstallment = !this.parcelaSelecionada ? 1 : this.parcelaSelecionada;
      this.installmentSelect(this.simulationInstalment.filter(x => x.parcela == newInstallment));
    },
  },
  computed: {
    ...mapState({
      debits: state => state.detran.debits,
      fee: state => state.detran.fee,
      serviceId: state => state.detran.serviceId,
      totalDebits: state => state.detran.totalDebits,
      typeTransaction: state => state.detran.typeTransaction,
      retorno: state => state.detran.retorno,
      time: state => state.detran.time,
      valueTotal: state => state.transaction.valueTotal,
      simulationInstalment: state => state.transaction.simulationInstalment,
      selectInstalment: state => state.transaction.selectInstalment,
      coefficients: state => state.transaction.coefficients,
      retornoAtivo: state => state.transaction.retornoAtivo,
      listaRetornos: state => state.transaction.listaRetornos,
    }),
  },
  async mounted() {
    try {
      this.startLoading();
      await this.getCheckBlockTime();
      await this.getCoefficients();
      this.clearSelectInstalment();
      this.finishLoading();
    } catch (error) {
      console.warn({ error });
      this.finishLoading();
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
  methods: {
    ...mapActions({
      getCheckBlockTime: "detran/checkBlockTime",
      getTransactionCoefficients: "transaction/getTransactionCoefficients",
      installmentSelect: "transaction/installmentSelect",
      clearSelectInstalment: "transaction/clearSelectInstalment",
      updateRetornoAtivo: "transaction/updateRetornoAtivo",
      externalProductPayment: "externalProductPayment",
    }),
    ...mapMutations(["startLoading", "finishLoading"]),
    alterTypePayment(el, value) {
      el = value;
    },
    async getCoefficients() {
      try {
        this.startLoading();
        await this.getTransactionCoefficients(this.typeTransaction);
        this.finishLoading();
      } catch (error) {
        console.warn({ error });
        this.finishLoading();
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
    ftoggleParcela() {
      this.toggleParcela = !this.toggleParcela;
    },
    ftoggleRetorno(el) {
      this.updateRetornoAtivo(el.target.id);
      this.installmentSelect(this.simulationInstalment.filter(x => x.parcela == this.parcelaSelecionada));
    },

    showVariables(el) {
      this.installmentSelect(this.simulationInstalment.filter(x => x.parcela == this.parcelaSelecionada));
    },

    printSimulation() {
      const nomeFantasia = "";
      const printObj = {
        valorSimulado: this.valueTotal,
        tipoTransacao: this.typeTransaction,
        dadosParcela: this.selectInstalment,
        parcelas: this.simulationInstalment,
        parcelaSelecionada: this.simulationInstalment,
        nomeFantasia,
        telefone: "",
      };
      this.$nuxt.$emit("printComponent", { printElement: true, printObject: printObj, printType: "simulacao" });
    },
    sendSimulation() {
      const printObj = {
        valorSimulado: this.valueTotal,
        tipoTransacao: this.typeTransaction,
        dadosParcela: this.simulationInstalment,
      };

      self.$nuxt.$emit("toggleModal", {
        api: "send",
        code: "200",
        modalContent: printObj,
      });
    },
    handleSubmit() {
      const d = new Date();
      this.detran.urlOrigin = window.location.pathname;
      this.detran.operation = this.userID + this.userName + d.getTime();
      this.detran.totalDebits = this.valorTotalC;
      this.detran.generalData = {
        ano: this.debits.result.ano,
        chassi: this.debits.result.chassi,
        cor: this.debits.result.cor,
        marca: this.debits.result.marca,
        mensagem: this.debits.result.mensagem,
        renavan: this.debits.result.renavan,
        tributos: this.debits.result.tributos,
        valorVenal: this.debits.result.valorVenal,
      };

      const objc = { ...this.detran };
      this.externalProductPayment(true);
      this.$router.push("/nova-transacao");
    },
  },
};
</script>

<style lang="less" scoped>
  @import "~assets/vars.less";
  .page-simulacao {
    .panel {
      &-default {
        .panel-heading {
          background-color: @color1;
          color: @color2;
        }
      }
    }
  }
  .padding10{
    padding:10px;
  }
  .tabrow,
      .tabrowRetorno {
        text-align: center;
        list-style: none;
        margin: 0px 0 3px;
        padding: 0;
        line-height: 35px;
        height: 37px;
        overflow: hidden;
        font-size: @ftSizeSmall;
        position: relative;

        &:before {
          position: absolute;
          content: "";
          width: 100%;
          bottom: 0;
          left: 0;
          border-top: 1px solid #aaa;
          z-index: 1;
        }

        li {
          border: 1px solid #aaa;
          background: #d1d1d1;
          background: linear-gradient(to bottom, #ececec 50%, #d1d1d1 100%);
          display: inline-block;
          position: relative;
          z-index: 0;
          border-top-left-radius: 6px;
          border-top-right-radius: 6px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4), inset 0 1px 0 #fff;
          text-shadow: 0 1px #fff;
          margin: 0 -5px;
          //padding: 0 30px;
          width: 45%;
          cursor: pointer;

          &.ativo {
            background: #fff;
            color: #333;
            z-index: 2;
            border-bottom-color: #fff;

            &:before {
              box-shadow: 0px 2px 0 #fff;
            }

            &:after {
              box-shadow: 0px -2px 0 transparent;
            }
          }

          &:before,
          &:after {
            border: 1px solid #aaa;
            position: absolute;
            bottom: -1px;
            width: 6px;
            height: 6px;
            content: "";
          }

          &:before {
            right: -6px;
            border-bottom-left-radius: 6px;
            border-width: 0px 0px 1px 1px;
            box-shadow: 0px 2px 0 #ececec;
          }

          &:after {
            left: -6px;
            border-bottom-right-radius: 6px;
            border-width: 0px 1px 1px 0px;
            box-shadow: 0px 2px 0 #ececec;
          }
        }

        a {
          color: #555;
          text-decoration: none;
        }
      }

      .tabrowRetorno {
        display: block;
        margin: 5px 0 0 0;
        li {
          width: 22%;
        }
      }
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
  .page-simulacao-auto {
    padding-top: 32px;
  }
  button {
    background: #000;
    color: @color7;
    text-transform: uppercase;
  }
  .tablesimulacao {
    table {
      width: 100%;
      display: block;
      & > thead {
        border-bottom: 1px solid @color10;
        border-top: 1px solid @color10;

        th {
          // text-align: left;
          padding: 5px 10px;
          // padding-right: 15px;
          // padding-left: 15px;

          &#codBarras {
            max-width: 40px;
          }

          &#descricao{
            min-width: 455px;

            @media (min-width: @screen-lg-min) {
              // width: 33%;
            }
          }

          &#vencimento {
            min-width: 100px;
          }

          &#valor {
            width: 100%;
          }
        }
      }

      &> tbody {
        tr {
          &:nth-child(odd) {
            background-color: @color18;
          }
          td{
            white-space:nowrap;
          }
        }
      }

      &> tfoot {
        tr{
          td {
            &.valorTotal{

                font-family: @mainFontBold;
                font-size: @ftSizeNormal;
                margin: 0;
                padding: 0;
                padding-bottom: 5px;

            }
          }
        }
      }
    }
  }

</style>
