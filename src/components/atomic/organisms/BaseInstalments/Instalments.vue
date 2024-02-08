<template>
  <section class="instalments-auto instalments-auto--simulacao container-fluid instalments" v-if="requiredFieldKeysValue">  
  <div id="transacao-passo-4">
            <div id="transaction-value" class="panel panel-default">
              <div class="panel-heading">
                <span>{{$t('labels.transacao.valores')}}</span>
              </div>
              <div class="panel-body">
                <Money :value="valueTotal" v-bind="money" type="text" name="simulation" id="value" :placeholder="$t('labels.transacao.placeholder_digite_valor_a_simular')" disabled></Money>

                <ul class="tabrow" v-show="listaRetornos.length > 1 && valueTotal > 0 ">
                  <li class="opcao" v-bind:class="{ ativo: toggleParcela}" @click="ftoggleParcela">{{$t('labels.transacao.parcelas')}}</li>
                  <li class="opcao" v-bind:class="{ ativo: !toggleParcela}" @click="ftoggleParcela">{{$t('labels.transacao.transacao')}}</li>
                </ul>

                <ul class="tabrow tabrowRetorno col-xs-12 " v-show="listaRetornos.length > 1 && valueTotal > 0 && !toggleParcela">
                  <li class="opcao" @click="ftoggleRetornoLimpa($event)" v-for="(retorno, index) in listaRetornos" :key="index" :value="retorno" :id="retorno" :class="{ativo: retorno == retornoAtivo}">R{{retorno}}</li>
                </ul>

                <form id="form-parcelas" class="col-xs-12 no-padding form-group" v-on:submit.prevent v-show="(simulationInstalment.length > 0) && valueTotal > 0">
                  <table class="tabelavalores">

                    <thead v-if="transactionType == 1 || transactionType == 8">
                      <th><span>&nbsp;</span></th>
                      <th>{{$t('labels.transacao.valor_liberado')}}</th>
                      <th>{{$t('labels.transacao.valor_transacao')}}</th>
                    </thead>

                    <thead v-if="transactionType == 4">
                      <th>&nbsp;</th>
                      <th>{{$t('labels.transacao.valor_parcela')}}</th>                      
                      <th>{{$t('labels.transacao.valor_total')}}</th>
                    </thead>

                    <thead v-if="transactionType == 2">
                      <th>&nbsp;</th>
                      <th>{{$t('labels.transacao.valor_parcela')}}</th>
                      <th>{{$t('labels.transacao.valor_total_liberado')}}</th>
                    </thead>

                    <tbody>
                      <tr v-for="(parcela, index) in simulationInstalment" :key="index">


                          <td v-if="transactionType == 1" class="optionValorParcela">
                            <label v-if="parcela.value && parcela.ParcelaComCoeficiente"><input type="radio" name="installment" v-model="parcelaSelecionada"
                            @change.stop="showVariables(parcela)" :value="parcela.parcela" :v-if="!parcela.ParcelaComCoeficiente">
                            <span v-if="transactionType == 1 || transactionType == 8">{{$t('labels.transacao.parcela_unica')}}</span>
                            <span v-else>{{parcela.parcela}}x</span>
                            </label>
                          </td>
                          <td v-if="transactionType == 8" class="optionValorParcela">
                            <label v-if="parcela.ParcelaComCoeficiente && parcela.value"><input type="radio" name="installment" v-model="parcelaSelecionada"
                            @change.stop="showVariables(parcela)" :value="parcela.parcela" :v-if="!parcela.ParcelaComCoeficiente">
                            <span v-if="transactionType == 1 || transactionType == 8">{{$t('labels.transacao.parcela_unica')}}</span>
                            <span v-else>{{parcela.parcela}}x</span>
                            </label>
                          </td>
                          <td v-if="transactionType == 4" class="optionValorParcela">
                            <label v-if="parcela.ParcelaComCoeficiente && parcela.liberadoComCoeficiente && parcela.totalParcelas"><input type="radio" name="installment" v-model="parcelaSelecionada"
                            @change.stop="showVariables(parcela)" :value="parcela.parcela" :v-if="!parcela.ParcelaComCoeficiente">
                            <span v-if="transactionType == 1 || transactionType == 8">{{$t('labels.transacao.parcela_unica')}}</span>
                            <span v-else>{{parcela.parcela}}x</span>
                            </label>
                          </td>
                          <td v-if="transactionType == 2" class="optionValorParcela">
                            <label v-if="parcela.valorParcelaOriginal && parcela.ParcelaComCoeficiente && parcela.totalParcelas"><input type="radio" name="installment" v-model="parcelaSelecionada"
                            @change.stop="showVariables(parcela)" :value="parcela.parcela" :v-if="!parcela.ParcelaComCoeficiente">
                            <span v-if="transactionType == 1 || transactionType == 8">{{$t('labels.transacao.parcela_unica')}}</span>
                            <span v-else>{{parcela.parcela}}x</span>
                            </label>
                          </td>


                          <td v-if="transactionType == 1"><span v-if="parcela.value && parcela.ParcelaComCoeficiente">{{parcela.value | currency}}</span></td>
                          <td v-if="transactionType == 1"><span v-if="(parcela.value && parcela.ParcelaComCoeficiente)">{{parcela.ParcelaComCoeficiente | currency}}</span></td>

                          <td v-if="transactionType == 8"><span v-if="(parcela.ParcelaComCoeficiente && parcela.value)">{{parcela.ParcelaComCoeficiente | currency}}</span></td>
                          <td v-if="transactionType == 8"><span v-if="parcela.ParcelaComCoeficiente && parcela.value">{{parcela.value | currency}}</span></td>

                          <td v-if="transactionType == 4"><span v-if="(parcela.ParcelaComCoeficiente && parcela.liberadoComCoeficiente) && parcela.totalParcelas">{{parcela.ParcelaComCoeficiente | currency}}</span></td>                          
                          <td v-if="transactionType == 4"><span v-if="parcela.ParcelaComCoeficiente && parcela.liberadoComCoeficiente && parcela.totalParcelas">{{parcela.totalParcelas | currency}}</span></td>

                          <td v-if="transactionType == 2"><span v-if="parcela.valorParcelaOriginal && parcela.ParcelaComCoeficiente && parcela.totalParcelas">{{parcela.valorParcelaOriginal | currency}}</span></td>
                          <td v-if="transactionType == 2"><span v-if="parcela.valorParcelaOriginal && parcela.ParcelaComCoeficiente && parcela.totalParcelas">{{parcela.totalParcelas | currency}}</span></td>

                        </tr>
                      </tbody>
                  </table>
                </form>

                <div v-show="valueTotal > valor_minimo"  >
                  <button class="btnEditinstalments finishButton" @click.stop="finishTransaction" :disabled="parcelaSelecionada == null  || btConcluirTransacao || !requiredFieldKeysValue">{{$t('labels.transacao.concluir_transacao')}}</button>
                  <div class="alert alert-warning" v-if="parcelaSelecionada == null">{{$t('labels.transacao.alerta_selecionar_parcela')}}</div>
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
import { mapState, mapActions, mapMutations } from "vuex";
import {
  showNumberAsCurrency,
} from "~/utils/currency.utils";

export default {
  components: { Money, TheMask },
  data() {
    return {
      valor_minimo: 0.00,
      money: {
        decimal: ",",
        thousands: ".",
        // prefix: "R$ ",
        suffix: " ",
        precision: 2,
        masked: false,
      },
      toggleParcela: true,
      parcelaSelecionada: null,
      requiredFieldKeys: false,
    };
  },
  validations: {},
  async mounted() {
    this.startLoading();
    if (this.criouSimulacao && this.simulacaoParcelas.value > 0) {
      this.parcelaSelecionada = this.simulacaoParcelas.length <= 0 && !this.simulacaoParcelas ? 0 : this.simulacaoParcelas.parcela;
    }
    if (this.externalProductPayment) {
      this.parcelaSelecionada = this.selectInstalment.length <= 0 && !this.simulacaoParcelas ? 0 : this.selectInstalment[this.selectInstalment.length - 1].parcela;
    }
     this.installmentSelect(this.simulationInstalment.filter(x => x.parcela == 1));
    if (!this.dadosVariaveis.dadosTransacao) {
      this.finishLoading();
      return;
    }

    const transactionDataLenght = Object.keys(this.dadosVariaveis.dadosTransacao).length;
    if (transactionDataLenght >= this.requiredFieldKeysIDs.length && this.dadosVariaveis.number_valor_transacao > 0) {
      this.requiredFieldKeys = true;
      this.finishLoading();
      return;
    }

    this.requiredFieldKeys = false;
    this.finishLoading();
  },
  filters: {
    removeMask(value) {
      if (!value) {
        return;
      }
      return value.replace(/[^\d]/g, "");
    },
    currency(value) {
      if (!value) {
        return;
      }
      return showNumberAsCurrency(value);
    },
  },
  computed: {
    ...mapState({
      valueTotal: state => state.transaction.valueTotal,
      historyUrl: state => state.utils.historyUrl,
      listaRetornos: state => state.transaction.listaRetornos,
      transactionType: state => state.transaction.transactionType,
      simulationInstalment: state => state.transaction.simulationInstalment,
      selectInstalment: state => state.transaction.selectInstalment,
      dadosVariaveis: state => state.transaction.dadosVariaveis,
      fields: state => state.transaction.fields,
      retornoAtivo: state => state.transaction.retornoAtivo,
      btConcluirTransacao: state => state.transaction.btConcluirTransacao,
      requiredFieldKeysValue: state => state.transaction.requiredFieldKeys,
      criouSimulacao: state => state.criouSimulacao,
      simulacaoParcelas: state => state.novaTransacao.parcelas,
      simulacaoRetorno: state => state.novaTransacao.retorno,
      simulacaoTipoTransacao: state => state.novaTransacao.tipo_transacao,
      simulacaoValorTotal: state => state.novaTransacao.valorTotal,
      externalProductPayment: state => state.externalProductPayment,
    }),

    requiredFieldKeysIDs() {
      return this.fields.map((input) => {
        if (input.isRequired) { return input.fieldKey; }
      });
    },
  },
  watch:{
    valueTotal: function(val){
      this.installmentSelect(this.simulationInstalment.filter(x => x.parcela == this.parcelaSelecionada));  
    },
    transactionType: function(val){
      
      if (val == 1 || val == 8){
        this.parcelaSelecionada =  null;
        this.installmentSelect(this.simulationInstalment.filter(x => x.parcela == this.parcelaSelecionada));  
        
      }      
      if (val == 2 || val == 4){        
        this.installmentSelect(this.simulationInstalment.filter(x => x.parcela == this.parcelaSelecionada));  
      }
      
    },
    retornoAtivo: function(val){      
      if (val == 0 && this.transactionType == 1 || val == 0 && this.transactionType == 8) {
        this.parcelaSelecionada =  null
      }
    }
  },
  methods: {
    ...mapActions({
      installmentSelect: "transaction/installmentSelect",
      enviarDadosTransacao: "transaction/enviarDadosTransacao",
      updateRetornoAtivo: "transaction/updateRetornoAtivo",
      getCoefficients: "transaction/getTransactionCoefficients",
      updateBtConcluirTransacao: "transaction/updateBtConcluirTransacao",
    }),
    ...mapMutations(["startLoading", "finishLoading"]),
    ftoggleParcela() {
      this.toggleParcela = !this.toggleParcela;
    },

    async showVariables(el) {
      try {
        this.startLoading();
        this.parcelaSelecionada = el.parcela;
        this.installmentSelect(this.simulationInstalment.filter(x => x.parcela == el.parcela));
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

    async ftoggleRetornoLimpa(el) {
      try {
        this.startLoading();
        await this.ftoggleRetorno(el, "simulacao");
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

    async ftoggleRetorno(el, limpa) {
      try {
        this.startLoading();
        if (limpa) {
          this.updateRetornoAtivo(el.target.id);
        }
        this.installmentSelect(this.simulationInstalment.filter(x => x.parcela == this.parcelaSelecionada));        
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
    async finishTransaction() {
      try {
        this.startLoading();
        this.updateRetornoAtivo(this.retornoAtivo);
        await this.enviarDadosTransacao();
        this.finishLoading();
      } catch (error) {
        console.warn( error );
        this.finishLoading();
        this.updateBtConcluirTransacao(false);
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
.select{
  margin-bottom:0px!important;
  select{
    margin-bottom:0px!important;
  }
}
button {
  background: #000;
  color: @color7;
  text-transform: uppercase;
}

#transacao-passo-4 {
  #instalments,
  #transactionData {
    padding: 0;
  }

  ul {
    list-style-type: none;
    padding-left: 2px;
    margin: 0;
  }
}
.travaModal{
      position: absolute;
      width: 100vw;
      height: 100vh;
      background: rgba(0,0,0,0.53333);
      top: 0;
      left: 0;
      z-index: 800;
    }
    .disabled {
      opacity: 0.5;
      pointer-events: none;
      cursor: initial;
    }
    .panel-heading{
      background-color:@color5;
      color: @color2;
    }

    #form-parcelas {
      overflow-x: auto;
    }
    .tabelavalores {
      width: 100%;
      thead {
        th {
          text-align: center;

          &:first-child {
            padding-left: 38px;
            text-align: left;
          }

          &:last-child {
            text-align: right;
            padding-right: 10px;
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
    .tabrow,.tabrowRetorno {
      text-align: center;
      list-style: none;
      margin: 0px 0 3px;
      padding: 0;
      line-height: 35px;
      height: 37px;
      overflow: hidden;
      font-size: 12px;
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

        @media (max-width: @screen-md-max) {
          width: 25%;
        }
      }
    }
    .finishButton{
      width: 100%;
      color: @color7;
    }
.instalments {
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
.instalments-auto {
  margin: 10px 0;
}
</style>
