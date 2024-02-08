<template>
  <div>
    <fieldset v-for="(custo, index) in transactionType" :key="index" class="col-xs-6">
      <div  v-if="custo.enabled">
      <legend>{{custo.label}}</legend>
        <div v-for="(tipotransacao, index) in custo.opcoes" :key="index">
          <div v-if="tipotransacao.enabled">
            <label class="" :for="tipotransacao.id"><input type="radio" name="transaction" v-model="dadosVariaveis.transactionTypeID" :id="tipotransacao.id" :value="tipotransacao.value"><span>{{tipotransacao.label}}</span></label>
          </div>
        </div>
      </div>
    </fieldset>
  </div>
</template>

<script>
/* eslint-disable func-names */
import {
  required,
} from "vuelidate/lib/validators";

import { mapState, mapActions, mapMutations } from "vuex";
import { log } from "util";


export default {

  data() {
    return {
      blockFields: {},
      dadosVariaveis: {
        transactionTypeID: false,
      },
      url: false,
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
    };
  },
  computed: {

    ...mapState({
      transactionTypes: state => state.transaction.transactionTypes,
      selectTransactionType: state => state.transaction.transactionType,
      historyUrl: state => state.utils.historyUrl,
      criouSimulacao: state => state.criouSimulacao,
      coefficients: state => state.transaction.coefficients,
      simulacaoTipoTransacao: state => state.novaTransacao.tipo_transacao,
      detranTypeTransaction: state => state.detran.typeTransaction,
      historyUrl: state => state.utils.historyUrl
    }),
  },
  watch: {
    dadosVariaveis: {
      handler(val) {
        const fieldKeys = [...Object.keys(val.dadosTransacao)];
        const inputsList = [];
      },
    },

    "dadosVariaveis.transactionTypeID": async function (oldValue, newValue) {
      try {        
        this.startLoading();
        await this.getCoefficients(this.dadosVariaveis.transactionTypeID);
        this.saveTransactionType(this.dadosVariaveis.transactionTypeID);        
        if(newValue){          
          this.updateRetornoAtivo(0);
          // this.clearSelectInstalment();
        }
        this.handleSubmit();
        this.finishLoading();
      } catch (error) {
        this.finishLoading();
        console.warn({ error });
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
  mounted() {
    // await this.getFields(this.typeOfservice);
    if (this.historyUrl == "/debitos-veiculares/detran/ipva") {
      this.dadosVariaveis.transactionTypeID = this.detranTypeTransaction;
      this.handleSubmit();
    }

    if (this.criouSimulacao) {
      this.dadosVariaveis.transactionTypeID = this.simulacaoTipoTransacao;
      this.handleSubmit();
    }

    this.transactionTypesUpdate();
  },
  methods: {
    ...mapActions({
      getCoefficients: "transaction/getTransactionCoefficients",
      saveTransactionType: "transaction/saveTransactionType",
      updateRetornoAtivo: "transaction/updateRetornoAtivo",
      clearSelectInstalment: "transaction/clearSelectInstalment"
    }),
    ...mapMutations(["startLoading", "finishLoading"]),


    transactionTypesUpdate() {
      try {
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
      } catch (error) {
        console.warn(error);
      }
    },

    handleSubmit() {
      try {
        this.$emit("onInstalments");
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
  },
};
</script>

<style lang="less" scoped>
@import "~assets/vars.less";
@import "~assets/variables.less";

.services-auto {
  margin: 10px 0;
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
</style>
