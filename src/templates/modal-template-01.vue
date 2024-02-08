<template>
  <div id="modalHistoricoTransacoes">
    <!-- <p>{{transactionObj}}</p> -->
    <!-- <p>{{fluxoDeCancelamento}}</p> -->
    <!-- <p>{{fluxoStatus}}</p> -->

    <div class="container-fluid">
      <div v-show="loading" class="row">
        <p class="col-xs-12">{{ text.carregando }}</p>
      </div>
      <div class="row form-group" v-show="!loading">
        <table class="col-xs-12">
          <caption>
            {{
              text.tituloDetalheTransacao
            }}
          </caption>
          <tr>
            <td width="35%">{{ text.th_installmentValue }}</td>
            <td width="65%">
              {{ showNumberAsCurrency(transactionDetails.installmentValue) }}
            </td>
          </tr>
          <tr>
            <td width="35%">{{ text.th_cardbin }}</td>
            <td width="65%">{{ transactionDetails.cardBin }}</td>
          </tr>
          <tr>
            <td width="35%">{{ text.th_cardBrand }}</td>
            <td width="65%">{{ transactionDetails.cardBrand }}</td>
          </tr>
          <tr>
            <td width="35%">{{ text.th_cardIssuer }}</td>
            <td width="65%">{{ transactionDetails.cardIssuer }}</td>
          </tr>
          <tr>
            <td width="35%">R</td>
            <td width="65%">{{ transactionDetails.rType }}</td>
          </tr>
          <tr v-if="transactionDetails.rValue > 0">
            <td width="35%">{{ text.th_rValue }}</td>
            <td width="65%">
              {{ showNumberAsCurrency(transactionDetails.rValue) }}
            </td>
          </tr>
        </table>
      </div>
      <div class="row form-group" v-show="!loading">
        <table id="fieldKeys" class="col-xs-12">
          <caption>
            {{
              text.tituloDadosTransacao
            }}
          </caption>
          <tr
            v-for="(field, index) in fieldKeys"
            :key="index"
            :id="field.fieldKey"
          >
            <td width="35%">{{ field.label }}</td>
            <td width="65%">
              {{
                field.typeContent == "Numeric"
                  ? showNumberAsCurrency(field.fieldValue)
                  : field.fieldValue
              }}
            </td>
          </tr>
        </table>
      </div>
      <section class="row" v-show="!loading">
        <div
          class="col-xs-12 form-group alert alert-danger"
          v-show="fluxoDeCancelamento"
        >
          <div v-if="fluxoStatus == 201">
            <p>{{ text.texto_fluxo }}</p>
            <div class="col-xs-6 form-button">
              <button
                @click="sendCancelamento('true')"
                :disabled="sendingCancellation"
              >
                {{ text.sim }}
              </button>
            </div>
            <div class="col-xs-6 form-button">
              <button
                @click="sendCancelamento('false')"
                :disabled="sendingCancellation"
              >
                {{ text.nao }}
              </button>
            </div>
          </div>

          <div v-if="fluxoStatus > 203">
            <p>{{ text.alert_aprovado }}</p>
          </div>

          <div v-if="fluxoStatus == 203">
            <p>{{ text.alert_revogado }}</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style lang="less">
@import "~assets/main.less";
@import "~assets/vars.less";

#modalHistoricoTransacoes {
  table {
    caption {
      font-weight: bold;
      font-size: @ftSizeExtraLarge;
      padding-top: 10px;
      padding-bottom: 10px;
    }

    tr {
      td {
        padding: 2px 0;
        &:nth-child(odd) {
          padding-left: 10px;
        }
        &:nth-child(even) {
          padding-right: 10px;
        }
      }
    }
  }
}
</style>


<script>
export default {
  data() {
    return {
      text: {
        tituloDetalheTransacao: "Detalhes da transação",
        tituloDadosTransacao: "Dados da transação",
        carregando: "Carregando",
        titulo_fluxo: "Fluxo de Cancelamento",
        texto_fluxo: "Confirma o cancelamento da transação?",
        sim: "Sim",
        nao: "Não",
        th_installmentValue: "Valor da parcela",
        th_cardbin: "Bin do cartão",
        th_cardBrand: "Bandeira",
        th_cardIssuer: "Emissor",
        th_rValue: "Valor do Retorno",
        alert_aprovado: "Cancelamento solicitado",
        alert_revogado: "Cancelamento revogado"
      },
      fluxoDeCancelamento: false,
      fluxoStatus: null,
      transactionDetails: {},
      fieldKeys: {},
      code: null,
      loading: false,
      sendingCancellation: false
    };
  },
  props: {
    transactionObj: {
      type: Object,
      required: true
    }
  },
  methods: {
    sendCancelamento(auth, button) {
      const self = this;

      self.sendingCancellation = true;

      self.$axios
        .delete(
          `${process.env.API_TRANSACTION}/transaction/${self.code}/cancelation/affiliate?isAuth=${auth}`
        )
        .then(response => {
          self.fluxoDeCancelamento = true;

          if (auth == "true") {
            const transactionDate = new Date(
              self.transactionObj.transactionDate
            );
            transactionDate.setHours(0, 0, 0, 0);

            self.$axios
              .post(`${process.env.API_REPORT}/Transaction/Historic`, {
                getXHeaders: false,
                authorize: self.transactionObj.authorize,
                start: transactionDate,
                page: 1,
                pageSize: 10
              })
              .then(response => {
                const transacao = response.data[0];

                self.sendingCancellation = false;

                self.fluxoStatus = transacao.statusId;
              })
              .catch(err => console.log("Err:", err));
          } else {
            self.sendingCancellation = false;
            self.fluxoStatus = 203;
          }
        })
        .catch(err => console.log("Err:", err));
    },
    showNumberAsCurrency(number) {
      if (number) {
        const numero =
          typeof number == "number" ? String(number.toFixed(2)) : number;
        const currency = numero.split(".");
        currency[0] = `R$ ${currency[0].split(/(?=(?:...)*$)/).join(".")}`;
        return currency.join(",");
      }
    },
    formatDocument(valor) {
      let val = valor;
      if (val.length == 11) {
        const cpf = val.split("");
        cpf.splice(3, 0, ".");
        cpf.splice(7, 0, ".");
        cpf.splice(11, 0, "-");
        val = cpf.join("");
      } else if (val.length > 11) {
        const cnpj = val.split("");
        cnpj.splice(2, 0, ".");
        cnpj.splice(6, 0, ".");
        cnpj.splice(10, 0, "/");
        cnpj.splice(15, 0, "-");
        val = cnpj.join("");
      }
      return val;
    }
  },
  mounted() {
    const self = this;

    self.loading = true;


    self.code = self.transactionObj.codigo;
    self.$axios
      .post(
        `${process.env.API_REPORT}/Transaction/HistoricDetails/${self.code}`
      )
      .then(response => {
        if (response.data.statusId > 200) {
          self.fluxoStatus = response.data.statusId;
          self.fluxoDeCancelamento = true;
        } else {
          self.fluxoStatus == null;
          self.fluxoDeCancelamento = false;
        }
        self.transactionDetails = response.data.transactionDetail;
        self.fieldKeys = self.transactionDetails.fieldKeys;
        self.loading = false;
      })
      .catch(err => console.log("Err:", err));
  }
};
</script>

<style lang="less" scoped>
@import "~assets/vars.less";
@import "~assets/variables.less";

#modalHistoricoTransacoes {
  table {
    // width: 100%;
    // display: block;

    tr {
      // width: inherit;
      &:nth-child(even) {
        background: @color9;
      }

      // td {
      //   width: 50%;
      // }
    }
  }
}
</style>
