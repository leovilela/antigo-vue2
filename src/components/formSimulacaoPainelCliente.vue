<template>
  <div class="container-simulacao" v-if="typesOfservices.length !== 0">
    <div id="formSimulacao" class="container-fluid">

      <form id="form-simular" class="row" v-on:submit.prevent @keyup.enter.prevent="noSend">
        <div class="container-fluid">
          <div id="simulationValue" class="row">
            <div class="col-xs-12"><label for="value" class="titleLabel">{{text.valor_a_simular}}</label></div>
            <div class="col-xs-12 col-lg-6"><Money v-model="number_valor_transacao" v-bind="money" type="text" name="simulation" id="value" :placeholder="text.placeholder_digite_valor_a_simular"></Money></div>
          </div>
          <div id="simulationResult" class="form-group row">
            <div>
              <div class="box row">
                <ul class="tabrow" v-show="listaRetornos.length > 1 && valueTotal > 0 ">
                  <li class="opcao" v-bind:class="{ ativo: toggleParcela}" @click="ftoggleParcela">{{text.parcelas}}</li>
                  <li class="opcao" v-bind:class="{ ativo: !toggleParcela}" @click="ftoggleParcela">{{text.transacao}}</li>
                  </ul>
                <div class="valores row">
                  <div class="col-xs-12 col-md-12 col-lg-5 no-padding" :class="{'form-no-edit': valueTotal <= 0}">
                    <fieldset  v-for="(custo, index) in transactionType" :key="index" v-if="custo.enabled">
                      <legend>{{custo.label}}</legend>
                      <div class="col-xs-12 " v-for="(tipotransacao, index) in custo.opcoes" :key="index" v-if="tipotransacao.enabled">
                        <label class="" :for="tipotransacao.id"><input type="radio" name="transaction" v-model="dadosVariaveis.transactionTypeID" :id="tipotransacao.id"  :value="tipotransacao.value"><span>{{tipotransacao.label}}</span></label>
                      </div>
                    </fieldset>

                  </div>

                    <div class="no-gutters col-xs-12  col-md-12  col-lg-7 no-padding loading" v-show="controls.loading">
                      <div class="col-xs-12 loadImage">
                        <img src="~assets/img/loading.gif" alt="Carregando">
                      </div>
                    </div>

                  <ul class="tabrow tabrowRetorno  col-xs-12  col-md-12  col-lg-7" v-show="listaRetornos.length > 1 && valueTotal > 0 && !toggleParcela">
                    <li class="opcao" @click="ftoggleRetorno($event)" v-for="(retorno, index) in listaRetornos" :key="index" :value="retorno" :id="retorno" :class="{ativo: retorno == retornoAtivo}">R{{retorno}}</li>
                  </ul>


                  <form id="form-parcelas" class="col-xs-12  col-md-12  col-lg-7 no-padding form-group" v-on:submit.prevent v-show="(simulationInstalment.length > 0) && valueTotal > 0">
                  <table class="tabelavalores">

                    <thead v-if="typeTransaction == 1 || typeTransaction == 8">
                      <th><span>&nbsp;</span></th>
                      <th>{{$t('labels.transacao.valor_liberado')}}</th>
                      <th>{{$t('labels.transacao.valor_transacao')}}</th>
                    </thead>

                    <thead v-if="typeTransaction == 4">
                      <th>&nbsp;</th>
                      <th>{{$t('labels.transacao.valor_parcela')}}</th>
                      <th v-if="!toggleParcela">{{$t('labels.transacao.valor_liberado')}}</th>
                      <th>{{$t('labels.transacao.valor_total')}}</th>
                    </thead>

                    <thead v-if="typeTransaction == 2">
                      <th>&nbsp;</th>
                      <th>{{$t('labels.transacao.valor_parcela')}}</th>
                      <th>{{$t('labels.transacao.valor_liberado')}}</th>
                      <th>{{$t('labels.transacao.valor_total_liberado')}}</th>
                    </thead>

                    <tbody>
                        <tr v-for="(parcela, index) in simulationInstalment" :key="index">


                          <td v-if="typeTransaction == 1" class="optionValorParcela">
                            <label v-if="parcela.value && parcela.ParcelaComCoeficiente"><input type="radio" name="installment" v-model="parcelaSelecionada"
                            @change.stop="showVariables(parcela)" :value="parcela.parcela" :v-if="!parcela.ParcelaComCoeficiente">
                            <span v-if="typeTransaction == 1 || typeTransaction == 8">{{$t('labels.transacao.parcela_unica')}}</span>
                            <span v-else>{{parcela.parcela}}x</span>
                            </label>
                          </td>
                          <td v-if="typeTransaction == 8" class="optionValorParcela">
                            <label v-if="parcela.ParcelaComCoeficiente && parcela.value"><input type="radio" name="installment" v-model="parcelaSelecionada"
                            @change.stop="showVariables(parcela)" :value="parcela.parcela" :v-if="!parcela.ParcelaComCoeficiente">
                            <span v-if="typeTransaction == 1 || typeTransaction == 8">{{$t('labels.transacao.parcela_unica')}}</span>
                            <span v-else>{{parcela.parcela}}x</span>
                            </label>
                          </td>
                          <td v-if="typeTransaction == 4" class="optionValorParcela">
                            <label v-if="parcela.ParcelaComCoeficiente && parcela.liberadoComCoeficiente && parcela.totalParcelas"><input type="radio" name="installment" v-model="parcelaSelecionada"
                            @change.stop="showVariables(parcela)" :value="parcela.parcela" :v-if="!parcela.ParcelaComCoeficiente">
                            <span v-if="typeTransaction == 1 || typeTransaction == 8">{{$t('labels.transacao.parcela_unica')}}</span>
                            <span v-else>{{parcela.parcela}}x</span>
                            </label>
                          </td>
                          <td v-if="typeTransaction == 2" class="optionValorParcela">
                            <label v-if="parcela.valorParcelaOriginal && parcela.ParcelaComCoeficiente && parcela.totalParcelas"><input type="radio" name="installment" v-model="parcelaSelecionada"
                            @change.stop="showVariables(parcela)" :value="parcela.parcela" :v-if="!parcela.ParcelaComCoeficiente">
                            <span v-if="typeTransaction == 1 || typeTransaction == 8">{{$t('labels.transacao.parcela_unica')}}</span>
                            <span v-else>{{parcela.parcela}}x</span>
                            </label>
                          </td>


                          <td v-if="typeTransaction == 1"><span v-if="parcela.value && parcela.ParcelaComCoeficiente">{{parcela.value | currency}}</span></td>
                          <td v-if="typeTransaction == 1"><span v-if="(parcela.value && parcela.ParcelaComCoeficiente)">{{parcela.ParcelaComCoeficiente | currency}}</span></td>

                          <td v-if="typeTransaction == 8"><span v-if="(parcela.ParcelaComCoeficiente && parcela.value)">{{parcela.ParcelaComCoeficiente | currency}}</span></td>
                          <td v-if="typeTransaction == 8"><span v-if="parcela.ParcelaComCoeficiente && parcela.value">{{parcela.value | currency}}</span></td>

                          <td v-if="typeTransaction == 4"><span v-if="(parcela.ParcelaComCoeficiente && parcela.liberadoComCoeficiente) && parcela.totalParcelas">{{parcela.ParcelaComCoeficiente | currency}}</span></td>
                          <td v-if="typeTransaction == 4 && !toggleParcela"><span v-if="parcela.ParcelaComCoeficiente && parcela.liberadoComCoeficiente && parcela.totalParcelas">{{parcela.liberadoComCoeficiente | currency}}</span></td>
                          <td v-if="typeTransaction == 4"><span v-if="parcela.ParcelaComCoeficiente && parcela.liberadoComCoeficiente && parcela.totalParcelas">{{parcela.totalParcelas | currency}}</span></td>

                          <td v-if="typeTransaction == 2"><span v-if="parcela.valorParcelaOriginal && parcela.ParcelaComCoeficiente && parcela.totalParcelas">{{parcela.valorParcelaOriginal | currency}}</span></td>
                          <td v-if="typeTransaction == 2"><span v-if="parcela.valorParcelaOriginal && parcela.ParcelaComCoeficiente && parcela.totalParcelas">{{parcela.ParcelaComCoeficiente | currency}}</span></td>
                          <td v-if="typeTransaction == 2"><span v-if="parcela.valorParcelaOriginal && parcela.ParcelaComCoeficiente && parcela.totalParcelas">{{parcela.totalParcelas | currency}}</span></td>

                        </tr>
                      </tbody>
                  </table>
                </form>
                </div>

              </div>
            </div>

            <div class="row" v-show="simulationInstalment.length > 0 && valueTotal > 0 && parcelaSelecionada && !controls.loading">

              <!-- <div v-if="$mq !== 'mobile' && $mq !== 'tablet'" class="col-xs-12 col-sm-6"> -->
              <div v-if="$mq !== 'mobile' && $mq !== 'tablet'" class="col-xs-12">
                <button class="finishButtons" id="novatransacao" @click="novaTransacao"><span class="icotransacao">&nbsp;</span><span class="text">{{text.botao_nova_transacao}}</span></button>
              </div>

              <div v-if="$mq !== 'mobile' && $mq !== 'tablet'" class="col-xs-12 col-sm-6">
                <button class="finishButtons" id="imprimir" @click="printSimulation()"><span class="glyphicon glyphicon-print"></span><span class="text">{{text.botao_imprimir}}</span></button>
              </div>

              <div class="col-xs-12 col-sm-6" >
                <button class="finishButtons" :class="{'mobile': $mq === 'mobile' || $mq == 'tablet'}" id="email" @click="sendSimulation()"><span class="glyphicon glyphicon-envelope"></span><span class="text">Email</span></button>
              </div>

              <!-- <div class="col-xs-12 col-sm-6" >
                <button class="finishButtons" :class="{'mobile': $mq === 'mobile' || $mq == 'tablet'}" id="whatsapp"><span class="glyphicon glyphicon-earphone"></span><span class="text">WhatsApp</span></button>
              </div> -->
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-return-assign */
/* eslint-disable no-extend-native */
/* eslint-disable func-names */
import map from "lodash/map";
import head from "lodash/head";
import { Money } from "v-money";
import { mapState, mapActions, mapMutations } from "vuex";
import { email, required } from "vuelidate/lib/validators";
import { showNumberAsCurrency } from "~/utils/currency.utils";

export default {
  components: { Money },

  data() {
    return {
      controls: {
        loading: false,
      },
      typeTransaction: null,
      transactionType: {
        cliente: {
          enabled: false,
          label: "Custo Cliente",
          opcoes: [
            {
              id: "client-debit",
              label: "Cartão de débito",
              value: 1,
              enabled: false,
            },
            {
              id: "client-credit",
              label: "Cartão de crédito",
              value: 4,
              enabled: false,
            },
          ],
        },
        lojista: {
          label: "Custo Lojista",
          enabled: false,
          opcoes: [
            {
              id: "seller-debit",
              label: "Cartão de débito",
              value: 8,
              enabled: false,
            },
            {
              id: "seller-credit",
              label: "Cartão de crédito",
              value: 2,
              enabled: false,
            },
          ],
        },
      },
      parcelaSelecionada: null,
      tipo_transacao: null,
      submitStatus: null,
      toggleParcela: true,
      number_valor_transacao: 0.0,
      firstService: null,
      text: {
        parcela_unica: "Parcela única",
        valor_a_simular: "Valor a simular",
        placeholder_digite_valor_a_simular: "Digite o valor a simular",
        tipos_de_transacao: "Tipos de transação",
        custo_cliente: "Custo cliente",
        custo_lojista: "Custo lojista",
        cartao_de_debito: "Cartão de débito",
        cartao_de_credito: "Cartão de crédito",
        cartao_de_debito_custo_lojista: "Cartão de débito",
        cartao_de_credito_custo_lojista: "Cartão de crédito",
        simulacao_de_pagamento: "Simulação de Pagamento",
        parcelas: "Parcelas",
        transacao: "Transação",
        opcao_de_parcelamento: "Opção de parcelamento",
        titulo_valor_da_parcela: "Valor da Parcela",
        imprimir: "Imprimir",
        nova_simulacao: "Nova Simulação",
        fazer_transacao: "Fazer Transação",
        simular: "Simular",
        opcao: "Opção",
        total: "Total",
        parcela: "Parcela",
        icone_imprimir: "Imprimir",
        agora_pode_enviar:
          "Agora você já pode enviar a simulação para seu cliente de forma rápida.",
        agora_pode_enviar_subtitulo:
          "Officia aliquip consectetur consequat minim. Dolore commodo proident non dolore velit labore. Amet ipsum anim dolor velit sint dolore excepteur exercitation magna do deserunt dolor consectetur. Aliqua duis laboris id cillum cillum officia cupidatat ut officia laboris tempor nulla. Pariatur veniam nulla amet duis cupidatat.",
        enviar_simulacao: "Enviar simulação",
        placeholder_digite_email: "Digite o e-mail",
        email_obrigatorio: "E-mail é obrigatório.",
        botao_enviar: "Enviar",
        botao_imprimir: "Imprimir",
        botao_nova_transacao: "Nova Transação",
        valor_liberado: "Valor liberado",
        valor_transacao: "Valor transação",
        valor_parcela: "Valor parcela",
        valor_total: "Total",
        valor_total_liberado: "Total liberado",
      },
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "",
        suffix: " ",
        precision: 2,
        // ,
        // masked: true
      },
    };
  },
  computed: {
    ...mapState({
      typesOfservices: state => state.transaction.typesOfservices,
      transactionTypes: state => state.transaction.transactionTypes,
      valueTotal: state => state.transaction.valueTotal,
      simulationInstalment: state => state.transaction.simulationInstalment,
      selectInstalment: state => state.transaction.selectInstalment,
      affiliate: state => state.affiliate.affiliate,
      affiliateContact: state => state.affiliate.affiliateContact,
      listaRetornos: state => state.transaction.listaRetornos,
      dadosVariaveis: state => state.transaction.dadosVariaveis,
      retornoAtivo: state => state.transaction.retornoAtivo,
      transacaoSelecionada: state => state.transaction.transactionType,
      serviceId: state => state.detran.serviceId,
    }),
  },
  validations: {
    email: {
      email,
      required,
    },
  },
  watch: {
    // sempre que a pergunta mudar, essa função será executada
    "dadosVariaveis.transactionTypeID": async function (newValue, oldValue) {
      try {
        this.startLoading();
        await this.getCoefficients(this.dadosVariaveis.transactionTypeID);
        await this.updateRetornoAtivo(0);
        this.saveTransactionType(newValue);
        this.parcelaSelecionada = null;
        this.typeTransaction = this.dadosVariaveis.transactionTypeID;
        this.finishLoading();
      } catch (error) {
        this.finishLoading();
        console.log(error);
        return this.$swal({
          title: "Desculpe",
          text: "Tivemos um problema\n Por favor, tente novamente, se o problema persistir entre em contato com a Listo.",
          icon: "error",
          confirmButtonText: "OK",
          showCloseButton: true,
          customClass: "swal-listo",
        });
      }

      // console.log(this.affiliate);
    },
    async number_valor_transacao(el) {
      try {
        this.startLoading();
        this.saveTotalValue(el);
        this.tipo_transacao = false;
        if (this.dadosVariaveis.transactionTypeID != null) {
          await this.getCoefficients(this.dadosVariaveis.transactionTypeID);
        }
        this.finishLoading();
      } catch (error) {
        this.finishLoading();
        console.log(error);
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
  filters: {
    currency(value) {
      if (!value) {
        return;
      }
      return showNumberAsCurrency(value);
    },
  },
  created() {
    this.startLoading();
    this.cleanClient();
    this.clearTransaction();
    this.clearSimulation();
    this.externalProductPayment(false);
    this.finishLoading();
  },
  async mounted() {
    this.startLoading();
    try {
      await this.updateRetornoAtivo(0);
      if (this.typesOfservices.length === 0) return;
      const selservice = map(head(this.typesOfservices));
      this.firstService = selservice[0];
      await this.getTransactionTypes({ serviceId: this.firstService });
      await this.typeTransactions();
    } catch (error) {
      this.finishLoading();
      console.log(error);
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
    noSend(event) {
      event.preventDefault();
    },
    async showVariables(el) {
      this.startLoading();
      try {
        this.parcelaSelecionada = el.parcela;
        await this.getCoefficients(this.dadosVariaveis.transactionTypeID);
        await this.installmentSelect(this.simulationInstalment.filter(x => x.parcela == el.parcela));
      } catch (error) {
        this.finishLoading();
        console.log(error);
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
    ...mapActions({
      updateTypeOfService: "transaction/updateTypeOfService",
      clearSimulation: "transaction/clearSimulation",
      installmentSelect: "transaction/installmentSelect",
      updateRetornoAtivo: "transaction/updateRetornoAtivo",
      saveTransactionType: "transaction/saveTransactionType",
      clearTransaction: "transaction/clearTransaction",
      saveTotalValue: "transaction/saveTotalValue",
      getContacts: "affiliate/getContacts",
      getAffiliate: "affiliate/getAffiliate",
      externalProductPayment: "externalProductPayment",
      getTransactionTypes: "transaction/getTransactionTypes",
      getCoefficients: "transaction/getTransactionCoefficients",
      cleanClient: "detran/cleanClient",
    }),
    ...mapMutations(["startLoading", "finishLoading"]),
    async printSimulation() {
      this.loading = true;
      let telefones = null;
      let nomeFantasia = null;
      this.startLoading();
      try {
        telefones = await this.getContacts();
        this.loading = false;
        nomeFantasia = this.affiliate.simpleName;
        const telefone = telefones[0].phones[0].value;
        const printObj = {
          valorSimulado: this.valueTotal,
          tipoTransacao: this.transacaoSelecionada,
          dadosParcela: this.selectInstalment,
          parcelas: this.simulationInstalment,
          parcelaSelecionada: this.selectInstalment,
          nomeFantasia,
          telefone,
        };
        this.$nuxt.$emit("printComponent", { printElement: true, printObject: printObj, printType: "simulacao" });
      } catch (error) {
        this.finishLoading();
        console.log(error);
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
    typeTransactions() {
      Object.keys(this.transactionTypes).map((k) => {
        Object.keys(this.transactionType.cliente.opcoes).map((j) => {
          if (this.transactionType.cliente.opcoes[j].value === this.transactionTypes[k].transactionTypeID) {
            this.transactionType.cliente.opcoes[j].enabled = true;
          }
        });
        Object.keys(this.transactionType.lojista.opcoes).map((y) => {
          if (this.transactionType.lojista.opcoes[y].value === this.transactionTypes[k].transactionTypeID) {
            this.transactionType.lojista.opcoes[y].enabled = true;
          }
        });
      });

      Object.keys(this.transactionType.cliente.opcoes).map((j) => {
        if (this.transactionType.cliente.opcoes[j].enabled === true) {
          this.transactionType.cliente.enabled = true;
        }
      });

      Object.keys(this.transactionType.lojista.opcoes).map((j) => {
        if (this.transactionType.lojista.opcoes[j].enabled === true) {
          this.transactionType.lojista.enabled = true;
        }
      });
    },
    sendSimulation() {
      const printObj = {
        valorSimulado: this.valueTotal,
        tipoTransacao: this.transacaoSelecionada,
        dadosParcela: this.selectInstalment,
      };

      this.$nuxt.$emit("toggleModal", {
        api: "send",
        code: "200",
        modalContent: printObj,
      });
    },
    novaTransacao() {
      event.preventDefault();


      const valores = {
        retorno: this.retornoAtivo,
        tipo_transacao: this.transacaoSelecionada,
        number_valor_transacao: this.valueTotal,
        parcelaSelecionada: this.selectInstalment,
        affiliateID: $nuxt.$store.state.usuario.clientID,
      };
      if (typeof this.transacaoSelecionada !== "number") {
        return;
      }
      if (this.valueTotal <= 0) {
        return;
      }
      if (!this.parcelaSelecionada) {
        return;
      }
      if (this.parcelaSelecionada.length == 0) {
        return;
      }
      $nuxt.$store.commit("novaTransacao", valores);
      $nuxt.$store.commit("criaSimulacao", true);
      this.updateTypeOfService(this.firstService);
      this.$router.push("/nova-transacao", () => {});
    },
    enviarSimulacao() {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    },
    ftoggleParcela() {
      this.toggleParcela = !this.toggleParcela;
    },
    async ftoggleRetorno(el) {
      try {
        this.startLoading();
        await this.updateRetornoAtivo(el.target.id);
        await this.getCoefficients(this.dadosVariaveis.transactionTypeID);
      } catch (error) {
        this.finishLoading();
        console.log(error);
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
    submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        // do your submit logic here
        this.submitStatus = "PENDENTE";
        setTimeout(() => {
          this.submitStatus = "OK";
        }, 500);
      }
    },
  },
};
</script>


<style lang="less" scoped>
@import "~assets/vars.less";
@import "~assets/variables.less";
.container-simulacao {
    border-bottom: 1px solid #ccc;
    border-left: 1px solid #ccc;
    padding: 5px;
    border-right: 1px solid #ccc;
}
.radioLabel-tipotransacao {
  width: auto !important;
  padding-left: 15px !important;
  text-align: left !important;
}
#formSimulacao {


  #simulationValue {
    margin-bottom: 10px;
    .titleLabel {
      font-family: @mainFont;
      font-size: @ftSizeNormal;
      margin: 0;
      padding: 0;
      padding-bottom: 5px;
    }
    #value {
      margin-bottom: 0;
    }

  }
  button {
    width: 100%;

    &.finishButtons {
      color: @color7;

      .text {
        display: none;
        max-height: 40px;
      }

      span.icotransacao {
        background: transparent url("~assets/img/ico-nova-transacao-pq.png")
          no-repeat scroll 0px 0px;
        background-size: contain;
        width: 20px;
        height: 20px;
        display: inline-block;
      }

      &:hover {
        span.icotransacao {
          display: none;
        }

        .glyphicon {
          display: none;
        }

        .text {
          display: inline-block;
        }
      }

      &#novatransacao {
        &:hover {
          padding: 0;
          line-height: initial;
        }
      }

      &#email {
        &:hover, &.mobile {
          background-color: @color12;
          border: 1px solid @color12;
          color: @color2;
        }
      }

      &#imprimir {
        &:hover {
          border: 1px solid @color12;
          color: @color12;
          background-color: @color2;
        }
      }

      &#whatsapp {

        &:hover,&.mobile {
          color: @color2;
          background-color: @color11;
          border: 1px solid @color11;
          padding: 0;
          line-height: initial;

          span {
            &:before {
              border-color: @color11;
            }
          }
        }

        span {
          &:before {
            border: 1px solid @color7;
            border-radius: 100%;
            padding: 3px;
            font-size: @ftSizeTiny;
          }
        }

      }
    }
  }
  .valor-simular {
    display: inline-block;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    padding-right: 5px;
    width: 107px;
  }
  input.valor-simular {
    border: 1px solid @color20;
    padding-right: 0px;
    width: calc(100% - 110px);
    font-size: @ftSizeLarge;
    color: @color11;
    font-family: @mainFontBold;
  }
  #formEnviarSimulacao {
    .enviar {
      background-color: rgba(5, 181, 46, 0.116);
      color: @color11;
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
      border: solid 1px @color11;
      display: inline-block;
      margin: 0 auto;
      padding: 13px;
      width: 27%;
      font-family: @mainFontLight;
      font-size: @ftSizeLarge;
      text-decoration: none;
    }

    .whatsApp {
      background-color: rgba(5, 181, 46, 0.116);
      color: @color11;
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
      border: solid 1px @color11;
      display: inline-block;
      margin: 0 auto;
      padding: 7px;
      vertical-align: middle;
      width: 100%;
      font-family: @mainFontLight;
      font-size: @ftSizeLarge;
      text-decoration: none;
      @media (max-width: @screen-xs-max) {
      }
      @media (min-width: @screen-sm-min) {
      }
      @media (min-width: @screen-md-min) {
      }
      @media (min-width: @screen-lg-min) {
      }
      .ico {
        background: transparent url("~assets/img/ico-whatsapp.png") no-repeat
          scroll 0px 7px;
        background-size: contain;
        display: inline-block;
        width: 30px;
        height: 38px;
      }
      span {
        margin-top: -10px;
        display: inline-block;
        position: relative;
        bottom: 7px;
        margin-left: 10px;
      }
    }
  }

  fieldset {
    padding: 0;

    @media (max-width: @screen-xs-max) {
      margin-bottom: 10px;
    }
    @media (min-width: @screen-sm-min) {
    }
    @media (min-width: @screen-md-min) {
    }
    @media (min-width: @screen-lg-min) {
    }
  }
  .form-title {
    margin: 0;
    margin-bottom: 10px;
    font-family: @mainFont;
    font-size: @ftSizeLarge;
  }

  .btn-paragraph {
    text-align: right;
    margin: 5px 0;
  }

  #btnSimular,
  #btnNovaSimulacao,
  #btnFazerTransacao {
    font-family: @mainFont;
    font-size: @ftSizeLarge;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 4px 6px 0 rgba(191, 191, 191, 0.4);
  }

  #btnSimular {
    // definir largura do botão Simular
    @media (max-width: @screen-xs-max) {
      width: 100%;
    }
    @media (min-width: @screen-sm-min) {
      width: 100%;
    }
    @media (min-width: @screen-md-min) {
      width: 100%;
      //min-width: 300px;
    }
    @media (min-width: @screen-lg-min) {
      width: 100%;
      //width: 300px;
    }
  }

  #btnFazerTransacao,
  #btnNovaSimulacao {
    // definir largura dos botões Fazer Transacao e Nova Simulacao
    width: 100%;
  }

  #btnSimular,
  #btnFazerTransacao {
    background-color: @color11;
    color: @color2;
    border: none;
  }

  #btnNovaSimulacao {
    background-color: @color2;
    color: @color11;
    border: 1px solid @color11;
  }
  #formSubmit {
    text-align: right;
    padding-top: 10px;
  }

  #simulationResult {
    margin-bottom: 0;
    .box {
      padding-bottom: 5px;
      &:first-child {
        margin-bottom: 5px;
      }
      &.pad10 {
        padding: 5px;
      }
      .title24Normal {
        font-size: @ftSizeLarge;
      }
      .subtitle {
        font-size: @ftSizeNormal;
        color: @color10;
      }
      .titleSubSection {
        font-family: @mainFontBold;
        font-size: @ftSizeExtraLarge;
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

      .valores {
        padding: 0 25px;

        .containervalor {
          display: table;
          padding: 10px;
          width: 100%;
          overflow: hidden;
          border-bottom: 1px solid @color20;

          .textovalor {
            display: table-cell;
            font-family: @mainFont;
            font-size: @ftSizeNormal;
            width: 50%;
          }
          .valor {
            display: table-cell;
            font-size: @ftSizeExtraLarge;
            color: @color11;
            font-family: @mainFontBold;
            width: 50%;
            text-align: right;
            overflow: hidden;
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
      }

      @media (min-width: @screen-sm-min) {
        margin-bottom: 15px;
      }

      @media (min-width: @screen-lg-min) {
        margin-bottom: initial;
      }
    }
    #buttons {
      text-align: right;
      position: relative;
      padding-top: 10px;
      margin-top: 5px;

      div:first-of-type {
        &:before {
          content: "";
          width: calc(100% - 30px);
          //border-top: 1px solid @color14;
          position: absolute;
          left: 15px;

          @media (min-width: @screen-sm-min) {
            top: -15px;
          }
          @media (min-width: @screen-md-min) {
            top: -10px;
          }
        }
      }
    }
  }
}
</style>
