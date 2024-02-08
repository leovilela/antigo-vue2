<template>
  <Base-Modal v-if="active">
    <template #body>
      <div class="container-fluid">
        <div v-show="loading" class="row">
          <div id="loadingMsg" class="alert alert-warning">
            {{text.carregando}}
          </div>
        </div>
        <div class="row form-group" v-show="!loading">
          <h3>{{text.enviar_simulacao_email}}</h3>
        </div>
        <div class="row form-group" v-show="!loading">
          <table width="100%">
            <tr>
              <td>Valor a simular:</td>
              <td>{{transactionObj.valorSimulado }}</td>
            </tr>
            <tr>
              <td>Ano do veículo:</td>
              <td>{{transactionObj.anoVeiculo}}</td>
            </tr>
            <tr v-if="transactionObj.numeroParcelas">
              <td>Parcelas de entrada: </td>
              <td>{{transactionObj.numeroParcelas}} de {{transactionObj.valorParcela}}</td>
            </tr>
            <tr>
              <td>Parcelas do financiamento: </td>
              <td>{{transactionObj.numeroParcelasFinanciamento}} de {{transactionObj.valorParcelaFinanciamento}}</td>
            </tr>
            <tr>
              <td>Total: </td>
              <td>{{transactionObj.valorTotal }}</td>
            </tr>
          </table>
        </div>
        <div class="row form-group" v-show="!loading">
          <div class="col-xs-12 col-lg-6" :class="{ 'form-invalid': $v.destinatario.$error }">
            <label class="form__label">{{text.destinatario}}</label>
            <input :placeholder="text.digite_destinatario" id="destinatario" type="text" name="destinatario" class="form__input" v-model.trim="$v.destinatario.$model" />
            <div class="error" v-if="$v.destinatario.$error">{{text.destinatario_obrigatorio}}</div>
          </div>

          <div class="col-xs-12 col-lg-6" :class="{ 'form-invalid': $v.email_destinatario.$error  }">
            <label class="form__label">{{text.email_destinatario}}</label>
            <input :placeholder="text.digite_emaildestinatario" id="email_destinatario" type="text" name="email_destinatario" class="form__input" v-model.trim="$v.email_destinatario.$model" />
            <div class="error" v-if="$v.email_destinatario.$error">{{text.emaildestinatario_obrigatorio}}</div>
          </div>
        </div>
        <div class="row form-group" v-show="!loading" >
          <div class="col-xs-6">
            <button :disabled="$v.validaEmail.$invalid" @click="sendClientMessage">Enviar</button>
          </div>
          <div class="col-xs-6">
            <Base-Button @click="$emit('close')">Fechar</Base-Button>
          </div>
        </div>
      </div>

      <div class="container-fluid" v-if="emailStatus != null">
        <div id="emailStatusMessage" class="row alert" :class="{'alert-success': emailStatus == 200, 'alert-danger': emailStatus != 200}">
          <p class="sucesso" v-if="emailStatus == 200"><span class="glyphicon glyphicon-ok" style="margin-right: 15px;"></span>{{text.sucesso}}</p>
          <p class="falha" v-else><span class="glyphicon glyphicon-exclamation-sign"></span> {{text.falha}}</p>
        </div>
      </div>
    </template>
  </Base-Modal>
</template>

<script>
/* eslint-disable func-names */
import {
  email, required, helpers,
} from "vuelidate/lib/validators";

export default {
  data() {
    return {
      modalTimeOut: null,
      text: {
        destinatario: "Comprador",
        email_destinatario: "E-mail",
        digite_destinatario: "Nome do comprador",
        digite_emaildestinatario: "E-mail",
        destinatario_obrigatorio: "Nome do comprador obrigatório",
        emaildestinatario_obrigatorio: "E-mail inválido",
        enviar_simulacao_email: "Simulação",
        simulacao_listo: "Simulação de transação da Listo",
        sucesso: "E-mail enviado com sucesso",
        falha: "Falha no envio do e-mail",
        carregando: "Carregando...",
      },
      form: {
        subject: "",
        body: "",
      },
      emailStatus: null,
      destinatario: null,
      email_destinatario: null,
      loading: false,
      parcela: 0,
      coeficiente: 1,
      valor: 0,
      valorParcela: 0,
      totalParcelas: 0,
      dados: 0,
      tipoTransacaoLabel: [],
      transacao: "",
      infoLojista: {
        nomeFantasia: null,
        telefones: null,
      },
    };
  },
  props: {
    transactionObj: {
      type: Object,
      default: () => ({}),
    },
    active: {
      type: Boolean,
      required: true,
    },
  },
  mounted() {
    const self = this;
    self.protocolo = window.location.protocol;
    self.sendElement();

    self.loading = true;

    self.$axios
      .get(`${process.env.API_AFFILIATE}/affiliates/contacts`)
      .then((response) => {        
        self.infoLojista.telefones = response.data[0].phones;
      }).catch(err => console.warn("Err:", err));

    self.$axios
      .get(`${process.env.API_AFFILIATE}/affiliates`)
      .then((response) => {
        self.loading = false;
        self.infoLojista.nomeFantasia = response.data.simpleName;
      }).catch(err => console.warn("Err:", err));
  },
  validations: {
    destinatario: {
      required,
    },
    email_destinatario: {
      required,
      email,
    },
    validaEmail: [
      "destinatario",
      "email_destinatario",
    ],
  },
  computed: {
    valorSimulado() {
      return this.transactionObj.valorSimulado;
    },
  },
  methods: {
    // emitir toggle Modal
    closeModal() {
      this.destinatario = null;
      this.email_destinatario = null;
      this.emailStatus = null;
      this.$emit("close");
    },
    sendElement() {
      const self = this;
      this.valor = this.transactionObj.valorSimulado;
      this.dados = this.transactionObj;
      this.tipoTransacao = this.transactionObj.tipoTransacao;
    },
    // envia mensagem do cliente
    sendClientMessage() {
      const self = this;

      self.emailStatus = null;

      self.loading = true;

      const email = {
        body: "",
        subject: "",
        to: "",
      };

      email.body = self.createEmailBody(self.form.body, self.form.subject);
      console.warn(email.body);

      email.subject = self.createEmailSubject();
      email.to = self.email_destinatario;

      const formData = new FormData();

      Object.keys(email).map((k) => {        
        formData.append(k, email[k]);
      });

      

      const config = {
        // responseType: "json",
        headers: { "X-Requested-With": "XMLHttpRequest", "Content-Type": "multipart/form-data" },
      };

      self.$axios
        .post(`${process.env.API_AFFILIATE}/email`, formData, config)
        .then((response) => {      
          self.loading = false;

          self.emailStatus = response.status;

          if (response.status == 200) {
            this.$v.destinatario.$reset();
            this.$v.email_destinatario.$reset();
            setTimeout(() => {
              this.closeModal();
            }, 3000);
          }
        })
        .catch((error) => {
          self.loading = false;

          self.emailStatus = error.response.status;
        });
    },
    // create HTML for email body
    createEmailBody(msg, subj) {
      if (!this.infoLojista.telefones[0]) {
        this.infoLojista.telefones[0] = "";
      }
      console.warn(this.$filters);


      return `
      <html>
        <head></head>
        <body>
          <table border="0" width="600" align="center" cellpadding="0" cellspacing="0">
            <tr>
              <td><img src="https://sou.listofacil.com.br/img/email1-header.jpg" height="236" width="600" style="display: block"></td>
            </tr>
            <tr>
              <td>
                <table cellpadding="20">
                  <tr>
                    <td>
                      <p style="font-family:Arial, Helvetica, sans-serif"><strong style="font-family:Arial, Helvetica, sans-serif">Olá ${this.destinatario}</strong>. Esta é a sua simulação de transação com ${this.infoLojista.nomeFantasia}.</p>
                      <table width="100%">
                        <tr>
                          <td><strong style="font-family:Arial, Helvetica, sans-serif">Valor a simular:</strong></td>
                          <td style="font-family:Arial, Helvetica, sans-serif">${this.valorSimulado}</td>
                        </tr>
                        <tr>
                          <td><strong style="font-family:Arial, Helvetica, sans-serif">Ano do veículo:</strong></td>
                          <td style="font-family:Arial, Helvetica, sans-serif">${this.transactionObj.anoVeiculo}</td>
                        </tr>
                        ${
  this.transactionObj.numeroParcelas
    ? `
                            <tr>
                              <td><strong style="font-family:Arial, Helvetica, sans-serif">Parcela de entrada:</strong></td>
                              <td style="font-family:Arial, Helvetica, sans-serif">${this.transactionObj.numeroParcelas} de ${this.transactionObj.valorParcela}</td>
                            </tr>
                          `
    : ""
}
                        <tr>
                          <td><strong style="font-family:Arial, Helvetica, sans-serif">Parcela de financiamento:</strong></td>
                          <td style="font-family:Arial, Helvetica, sans-serif">${this.transactionObj.numeroParcelasFinanciamento} de ${this.transactionObj.valorParcelaFinanciamento}</td>
                        </tr>
                        <tr>
                          <td><strong style="font-family:Arial, Helvetica, sans-serif">Total:</strong></td>
                          <td style="font-family:Arial, Helvetica, sans-serif">${this.transactionObj.valorTotal}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

              </td>
            </tr>
            <tr>
              <td>
                <p style="font-family:Arial, Helvetica, sans-serif">Em caso de dúvidas, entre em contato com a loja no telefone ${this.infoLojista.telefones[0].value}</p>
              </td>
            </tr>
            <tr>
              <td><img src="https://sou.listofacil.com.br/img/email1-footer.jpg" height="38" width="600" style="display: block"></td>
            </tr>
          </table>
        </body>
      </html>
        `;
    },
    // create correct email subject
    createEmailSubject() {
      return `[${this.text.simulacao_listo}]`;
    },

  },
};
</script>

<style lang="less" scoped>
@import "~assets/vars.less";
@import "~assets/variables.less";

#modal-email-simulacao{
  table {
    caption {
      font-weight: bold;
      font-size: @ftSizeExtraLarge;
      padding-top: 10px;
      padding-bottom: 10px;
    }

    tr {
      &:nth-child(odd) {
        background-color: @color20;
      }
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

  #loadingMsg {
    margin: 20px 0;
    padding: 10px;
    text-align: center;
  }

  #emailStatusMessage {
    text-align: center;
    margin: 20px 0;
    p {
      padding: 10px 0;
      margin: 0;
    }
  }
}
</style>
