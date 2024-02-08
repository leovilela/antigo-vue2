<template>
  <div id="form-pagamentos">
    <form @submit.prevent v-show="controls.formActive" :class="{'form-no-edit': controls.paymentCode == '200'}">
      <!-- <p>{{content.paymentInfo}}</p> -->
      <!-- <p>{{content.operationDescription}}</p> -->
      <!-- <p>Code {{controls.paymentCode}}</p> -->
      <!-- <p>Form Complete {{controls.formComplete}}</p> -->
      <!-- <p>Loading {{controls.loading}}</p> -->
      <!-- <p>{{content.currentDate}}</p> -->
      <!-- <p>checar {{checarAgendamento}}</p> -->

      <pagamento-ipva v-if="controls.paymentType != undefined && controls.paymentType == 'ipva'" :currentState="controls.selectedState"></pagamento-ipva>
      <pagamento-dpvat v-if="controls.paymentType != undefined && controls.paymentType == 'dpvat'" :currentState="controls.selectedState"></pagamento-dpvat>
    </form>

    <div id="operationDescription" class="row form-group" v-show="controls.formActive">
      <div class="col-xs-12">
        <!-- <label for="operationDescription">{{text.operationDescription}}</label> -->
        <textarea v-model.trim="content.operationDescription" :placeholder="text.operationDescription"></textarea>
      </div>
    </div>

    <div class="row form-group" v-show="controls.formActive">

      <div class="form-button" :class="{'col-xs-12 col-sm-6 col-lg-5': !controls.formComplete, 'col-xs-12': controls.formComplete}">
        <button style="width:100%;margin-top:0" :disabled="!controls.formComplete || controls.paymentCode == '200'" @click="sendPayment">{{text.payButton}}</button>
      </div>

      <div class="col-xs-12 col-sm-6 col-lg-7 form-group" v-if="controls.paymentCode == null">
        <div v-if="!controls.formComplete" class="alert alert-warning">{{text.alertIncomplete}}</div>
      </div>

    </div>

    <div class="row form-group" v-if="controls.loading">
      <div class="col-xs-12">
        <p class="alert alert-info">{{text.sending}}</p>
      </div>
    </div>

    <div class="row form-group" v-if="controls.paymentCode != null">
      <div class="col-xs-12">
        <p v-if="controls.paymentCode == '200' && checarAgendamento" class="alert alert-success">{{text.successMsg}}<br><span id="newPayment" @click="newPayment"><strong>{{text.newPayment}}</strong></span></p>
        <p v-else-if="controls.paymentCode == '200' && !checarAgendamento" class="alert alert-success">{{text.successMsgSchedule}}<br><span id="newPayment" @click="newPayment"><strong>{{text.newPayment}}</strong></span></p>

        <p v-if="controls.paymentCode == '400' && checarAgendamento" class="alert alert-danger">{{text.formError}}</p>
        <p v-else-if="controls.paymentCode == '400' && !checarAgendamento" class="alert alert-danger">{{text.formErrorSchedule}}</p>

        <p v-if="controls.paymentCode == '500' && checarAgendamento" class="alert alert-danger">{{text.serverError}}</p>
        <p v-else-if="controls.paymentCode == '500' && !checarAgendamento" class="alert alert-danger">{{text.serverErrorSchedule}}</p>
      </div>
    </div>
  </div>
</template>

<style lang="less">
#form-pagamentos {
  max-width: 940px;
  #operationDescription {
    textarea {
      resize: vertical;
      width: 100%;
      min-height: 40px;
      height: 40px;
    }
  }
  #newPayment {
    cursor: pointer;
  }
}
</style>


<script>
/* eslint-disable quote-props */
/* eslint-disable no-return-assign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable vue/no-parsing-error */

import { Money } from "v-money";
import { TheMask } from "vue-the-mask";

// componentes de pagamentos
import ipva from "./ipva.vue";
import dpvat from "./dpvat.vue";


export default {
  data() {
    return {
      controls: {
        formActive: false,
        formComplete: false,
        paymentType: null,
        loading: false,
        paymentCode: null,
        money: {
          decimal: ",",
          thousands: ".",
          prefix: "R$ ",
          suffix: " ",
          precision: 2,
          masked: false,
        },
      },
      text: {
        payButton: "Pagar",
        alertIncomplete: "Preencha todos os campos corretamente!",
        payment: "Pagamento",
        schedule: "Agendamento",
        sending: "Enviando...",
        successMsg: "Pagamento realizado com sucesso!",
        successMsgSchedule: "Agendamento realizado com sucesso!",
        formError: "Não conseguimos enviar seu pagamento por causa de erro no preenchimento dos campos. Tente outra vez.",
        formErrorSchedule: "Não conseguimos enviar seu agendamento por causa de erro no preenchimento dos campos. Tente outra vez.",
        serverError: "Seu pagamento não foi enviado. Tente outra vez.",
        serverErrorSchedule: "Seu agendamento não foi enviado. Tente outra vez.",
        newPayment: "Clique aqui para novo pagamento.",
        operationDescription: "Descrição da operação",
      },
      content: {
        paymentInfo: {},
        operationDescription: "",
        currentDate: new Date(),
      },
    };
  },
  components: {
    Money,
    TheMask,
    "pagamento-ipva": ipva,
    "pagamento-dpvat": dpvat,
  },
  methods: {
    // envia pagamento para API
    sendPayment() {
      const self = this;

      self.controls.loading = true;
      self.controls.paymentCode = null;

      const id = Number($nuxt.$store.state.usuario.clientID.trim()); // Converte o ID de string para Number
      // console.log(typeof id, id, $nuxt.$store.state.usuario.clientID);

      self.$axios
        .post(`${process.env.API_CORBAN}/api/Payment`, {
          scheduleDate: self.content.paymentInfo.paymentDate,
          operationType: self.controls.paymentType,
          sourceKey: id,
          operationDescription: self.content.operationDescription,
          data: [self.content.paymentInfo],
        })
        .then((response) => {
          // console.log(response);
          self.controls.paymentCode = "200";
          self.controls.loading = false;
          // self.content.paymentInfo = {};
        })
        .catch((error) => {
          // console.log(error);
          self.controls.paymentCode = error.response.status;
          self.controls.loading = false;
        });
    },

    // reinicia pagamento
    newPayment() {
      const self = this;

      self.controls.paymentType = null;
      self.controls.formActive = false;
      self.controls.formComplete = false;
      self.controls.loading = false;
      self.controls.paymentCode = null;
      self.content.operationDescription = "";
      self.controls.selectedState = null;

      self.$nuxt.$emit("newPayment");
    },
  },
  mounted() {
    const self = this;

    self.$nuxt.$on("showPayment", (data) => {
      // console.log("Show Payment");
      self.controls.formActive = true;
    });

    self.$nuxt.$on("hidePayment", (data) => {
      // console.log("Hide Payment");
      // self.controls.paymentType = null;
      self.controls.formActive = false;
      self.controls.formComplete = false;
    });

    self.$nuxt.$on("clearPayment", () => {
      self.controls.paymentType = null;
      self.content.paymentInfo = {};
    });

    self.$nuxt.$on("setPaymentType", (data) => {
      // console.log("set", data);
      self.controls.paymentType = data.type;
      self.controls.selectedState = data.state != undefined ? data.state : null;
      self.content.operationDescription = "";
    });

    self.$nuxt.$on("paymentFormComplete", (data) => {
      self.controls.formComplete = data.toggle;
      self.content.paymentInfo = data.payment;
    });
  },
  watch: {
    // eslint-disable-next-line func-names
    "controls.formComplete": function (newVal, oldVal) {
      // console.log("Old", oldVal, "\nNew", newVal);
      if (oldVal == true && newVal == false) {
        if (this.controls.paymentCode != null) this.controls.paymentCode = null;
      }
    },
    // eslint-disable-next-line func-names
    "content.paymentInfo": function (newVal, oldVal) {
      // console.log("new", newVal, "\nold", oldVal);
      this.controls.paymentCode = null;
    },
  },
  computed: {
    checarAgendamento() {
      const self = this;

      const currentDay = self.content.currentDate.getDate();
      const currentMonth = self.content.currentDate.getMonth();
      const currentYear = self.content.currentDate.getFullYear();

      // console.log("current", `${currentDay}-${currentMonth}-${currentYear}`);

      if (self.content.paymentInfo.paymentDate != undefined) {
        const paymentDay = self.content.paymentInfo.paymentDate.getDate();
        const paymentMonth = self.content.paymentInfo.paymentDate.getMonth();
        const paymentYear = self.content.paymentInfo.paymentDate.getFullYear();

        // console.log("payment", `${paymentDay}-${paymentMonth}-${paymentYear}`);

        if (`${currentDay}-${currentMonth}-${currentYear}` == `${paymentDay}-${paymentMonth}-${paymentYear}`) {
          return true;
        }
      }

      return false;
    },
  },
};
</script>
