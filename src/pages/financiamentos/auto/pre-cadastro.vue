<template>
  <section
    class="page-financiamentos-auto page-financiamentos-auto--simulacao container-fluid"
  >
    <div class="row">
      <div id="pre-cadastro" class="col-xs-12">
        <div class="panel panel-default">
          <div class="panel-heading">
            <span>{{ $t("titles.preCadastro") }}</span>
          </div>
          <div class="panel-body">
            <form @submit.prevent="handleSubmit">
              <div class="row">
                <div class="col-xs-6">
                  <Base-FormInputGroup
                    v-mask="['###.###.###-##']"
                    @onClick="fillPreCadastroForm"
                    :label="$t('labels.preCadastro.documento')"
                    :placeholder="$t('placeholder.cpf_digite')"
                    id="documentNumber"
                    name="documentNumber"
                    type="text"
                    class="form__input"
                    v-model.trim.lazy="$v.preCadastro.documentNumber.$model"
                    @input="delayTouch($v.preCadastro.documentNumber)"
                    @paste.prevent
                    @copy.prevent
                    :class="{
                      form__field__error: $v.preCadastro.documentNumber.$error
                    }"
                    :disabled="!$v.preCadastro.documentNumber.validaDocumento"
                  >
                    <template>
                      <span
                        class="glyphicon glyphicon-search"
                        aria-hidden="true"
                      ></span>
                    </template>
                    <template #errors>
                      <div
                        class="error"
                        v-if="!$v.preCadastro.documentNumber.required"
                      >
                        {{ $t("error.cpf_obrigatorio") }}
                      </div>
                      <div
                        class="error"
                        v-if="
                          !$v.preCadastro.documentNumber.validaDocumento &&
                            $v.preCadastro.documentNumber.required
                        "
                      >
                        {{ $t("error.cpf_invalido") }}
                      </div>
                    </template>
                  </Base-FormInputGroup>
                </div>
                <div class="col-xs-6">
                  <Base-FormGroup
                    :placeholder="$t('digite_name')"
                    :label="$t('labels.preCadastro.nome')"
                    ref="nameInput"
                    id="name"
                    name="name"
                    type="text"
                    class="form__input"
                    v-model="$v.preCadastro.name.$model"
                    @input="delayTouch($v.preCadastro.name)"
                    @copy.prevent
                    @paste.prevent
                    :class="{ form__field__error: $v.preCadastro.name.$error }"
                    :disabled="!allowFillForm"
                  >
                    <div class="error" v-if="!$v.preCadastro.name.required">
                      {{ $t("name_obrigatorio") }}
                    </div>
                    <div
                      class="error"
                      v-if="!$v.preCadastro.name.atLeastTwoNames"
                    >
                      {{ $t("two_names") }}
                    </div>
                    <div class="error" v-if="!$v.preCadastro.name.fullname">
                      Campo deve ter somente letras
                    </div>
                  </Base-FormGroup>
                </div>
              </div>
              <div class="row">
                <div class="col-xs-6">
                  <Base-FormGroup
                    v-mask="['(##) #####-####']"
                    :label="$t('labels.preCadastro.cellPhone')"
                    :placeholder="$t('digite_cellPhone')"
                    id="cellPhone"
                    name="cellPhone"
                    type="text"
                    class="form__input"
                    v-model.trim="$v.preCadastro.cellPhone.$model"
                    @input="delayTouch($v.preCadastro.cellPhone)"
                    @copy.prevent
                    @paste.prevent
                    :class="{
                      form__field__error: $v.preCadastro.cellPhone.$error
                    }"
                    :disabled="!allowFillForm && !allowFillCellPhoneField"
                  >
                    <div
                      class="error"
                      v-if="!$v.preCadastro.cellPhone.required"
                    >
                      {{ $t("cellPhone_obrigatorio") }}
                    </div>
                    <div
                      class="error"
                      v-if="
                        !$v.preCadastro.cellPhone.cellPhone &&
                          $v.preCadastro.cellPhone.required
                      "
                    >
                      {{ $t("cellphone_invalido") }}
                    </div>
                  </Base-FormGroup>
                </div>

                <div class="col-xs-6">
                  <Base-FormGroup
                    :placeholder="$t('digite_email')"
                    :label="$t('labels.preCadastro.email')"
                    id="email"
                    name="email"
                    type="email"
                    class="form__input"
                    v-model.trim="$v.preCadastro.email.$model"
                    @input="delayTouch($v.preCadastro.email)"
                    @copy.prevent
                    @paste.prevent
                    :class="{ form__field__error: $v.preCadastro.email.$error }"
                    :disabled="!allowFillForm && !allowFillEmailField"
                  >
                    <div class="error" v-if="!$v.preCadastro.email.required">
                      {{ $t("email_obrigatorio") }}
                    </div>
                    <div
                      class="error"
                      v-if="
                        !$v.preCadastro.email.email &&
                          $v.preCadastro.email.required
                      "
                    >
                      {{ $t("email_invalido") }}
                    </div>
                  </Base-FormGroup>
                </div>
              </div>
              <div class="row">
                <div class="col-xs-6">
                  <div class="sendtype_box">
                    <span>Enviar convite para o aplicativo por:</span>
                    <div class="sendtype_box__types">
                      <Base-Checkbox
                        name="sendType"
                        :disabled="!allowFillForm && !allowSelectType"
                        id="sendType"
                        v-model="preCadastro.sendTypes"
                        :native-value="'EMAIL'"
                        label="E-mail"
                      >
                        E-mail
                      </Base-Checkbox>
                      <Base-Checkbox
                        name="sendType"
                        :disabled="!allowFillForm && !allowSelectType"
                        id="sendType"
                        v-model="preCadastro.sendTypes"
                        :native-value="'SMS'"
                        label="SMS"
                      >
                        SMS
                      </Base-Checkbox>
                    </div>
                  </div>
                </div>
                <div class="btn-wrapper col-xs-6">
                  <div class="btn-container">
                    <Base-Button
                      v-show="hasEditionButtonShow"
                      type="button"
                      @click.prevent="allowEdition"
                      outlined
                      :class="{ 'is-disabled': isEditionUserBlocked }"
                      :disabled="isEditionUserBlocked"
                      class="custom-btn"
                      >{{ $t("buttons.editar") }}</Base-Button
                    >
                    <Base-Button
                      :disabled="$v.preCadastro.$invalid"
                      class="custom-submit-btn"
                      :class="{ 'is-disabled': isForwardBlocked }"
                      type="submit"
                      >{{ $t("buttons.avancar") }}</Base-Button
                    >
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Base-CadastroDigitalAguardandoModal
        :active="modals.waitingModal"
        @cancel="closeRegistrationWaitingModal"
      />
    </div>
  </section>
</template>

<script>
import {
  required,
  minLength,
  helpers,
  email,
  sameAs,
  requiredUnless
} from "vuelidate/lib/validators";

import { mapState, mapActions, mapMutations } from "vuex";

import { phoneRegexMobile } from "~/utils/regex.utils";
import { validaDocumento, atLeastTwoNames } from "~/utils/validate.utils";

const touchMap = new WeakMap();

export default {
  computed: {
    ...mapState({
      client: state => state.simulacao.preCadastro
    }),
    isClientExist() {
      return this.client.clientExist && this.client.documentNumber;
    },
    isConfirmApp() {
      return this.client.confirmApp;
    },
    isForwardBlocked() {
      return !this.allowFillForm && !this.blockForwardButton;
    },
    sendTypesHTML() {
      return this.preCadastro.sendTypes
        .map(sendType => {
          const channelObject = this.getLabelFromSendType(sendType);
          return `<li> ${channelObject.label} ${
            this.preCadastro[channelObject.key]
          }</li>`;
        })
        .join("");
    }
  },
  data() {
    return {
      hasEditionButtonShow: false,
      hasEditionSaveButtonShow: false,
      preCadastro: {
        documentNumber: "",
        name: "",
        cellPhone: "",
        email: "",
        sendTypes: ["EMAIL", "SMS"]
      },
      modals: {
        invalidModal: false,
        waitingModal: false
      },
      errorResendInviteLabel: "",
      connectionWS: null,
      allowContactEdition: false,
      allowSelectType: false,
      allowFillForm: false,
      allowFillCellPhoneField: false,
      allowFillEmailField: false,
      blockForwardButton: false,
      passToSimulation: false,
      isEditionUserBlocked: false
    };
  },
  validations: {
    preCadastro: {
      documentNumber: {
        required,
        validaDocumento
      },
      name: {
        required,
        atLeastTwoNames,
        fullname: helpers.regex("alpha", /[a-zA-Z]/),
      },
      email: {
        required,
        email
      },
      cellPhone: {
        required,
        phoneRegexMobile
      },
      sendTypes: {
        required: requiredUnless("allowContactEdition")
      }
    }
  },
  watch: {
    "preCadastro.documentNumber": function watch(value) {
      if (!value) {
        this.$v.preCadastro.documentNumber.$reset();
      }
      this.cleanClient();
      this.syncPreCadastro();
      this.$emit("changeSimulation");
      this.blockEdition();
      this.$v.preCadastro.$reset();
    }
  },
  mounted() {
    this.cleanClient();
    this.syncPreCadastro();
  },
  filters: {
    removeMask(value) {
      if (!value) {
        return;
      }
      return value.replace(/[^\d]/g, "");
    }
  },
  async destroyed() {
    this.cleanClient();
    if (this.connectionWS) {
      await this.connectionWS.stop();
    }
  },
  methods: {
    ...mapActions({
      getClient: "simulacao/preCadastro/getClient",
      cleanClient: "simulacao/preCadastro/cleanClient",
      savePreRegistration: "simulacao/preCadastro/savePreRegistration",
      addClientID: "simulacao/preCadastro/addClientID",
      updateContacts: "simulacao/preCadastro/updateContacts"
    }),
    ...mapMutations(["startLoading", "finishLoading"]),
    isPasswordEmpty() {
      if (!this.preCadastro.documentNumber) {
        this.$v.preCadastro.documentNumber.$reset();
      }
    },
    unblockForm() {
      this.allowFillForm = true;
      this.blockForwardButton = true;
    },
    blockForm(blockFormAllForm = true) {
      if (blockFormAllForm) {
        this.allowFillForm = false;
        this.blockForwardButton = false;
        return;
      }
      this.allowFillForm = false;
      this.blockForwardButton = true;
    },
    blockEdition() {
      this.allowFillCellPhoneField = false;
      this.allowFillEmailField = false;
      this.hasEditionButtonShow = false;
      this.allowSelectType = false;
      this.blockForwardButton = false;
    },

    async updateUser() {
      await this.getClient(
        this.$options.filters.removeMask(this.preCadastro.documentNumber)
      );
      this.syncPreCadastro();
    },

    showUserEditionBlockInformation() {
      this.isEditionUserBlocked = true;
      return this.$swal({
        title: "Usuário já criado!",
        text: "Alterações devem ser feitas direto no aplicativo.",
        type: "error",
        confirmButtonText: "OK",
        showCloseButton: true,
        customClass: "swal-listo"
      });
    },

    async allowEdition() {
      await this.updateUser();

      if (this.client.hasUser) {
        this.showUserEditionBlockInformation();
        return;
      }

      this.$emit("onEditForm");
      this.blockForwardButton = true;
      this.allowFillCellPhoneField = true;
      this.allowFillEmailField = true;
      this.hasEditionButtonShow = false;
      this.allowContactEdition = true;
      this.passToSimulation = false;
      this.allowSelectType = true;
    },

    async openSendTypesAlert() {
      this.blockEdition()
      const result = await this.$swal({
        icon: "info",
        title: "Cadastro digital incompleto",
        html: `
            <p>Informe ao cliente que é necessário finalizar o cadastro no aplicativo Listo, você pode re-enviar o convite ao cliente.</p>
            <div style=" margin: 0 auto;width: fit-content;">
              <label for="send_type_sms" style="display: flex; width: fit-content;">
                <input value="SMS" type="checkbox" id="send_type_sms"/>
                <span style="margin-top: auto;  margin-left: 4px">
                  SMS
                </span>
              </label>
              <label for="send_type_email" style="display: flex; width: fit-content;">
                <input value="EMAIL" type="checkbox" id="send_type_email"/>
                  <span style="margin-top: auto;  margin-left: 4px">
                    E-MAIL
                  </span>
              </label>
            </div>
              <label style="color:red">
                ${this.errorResendInviteLabel}
              </label>
          `,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: "ENVIAR",
        cancelButtonText: "FECHAR",
        customClass: "swal-listo",
        preConfirm: () => [
          {
            checked: document.getElementById("send_type_sms").checked,
            value: document.getElementById("send_type_sms").value
          },
          {
            checked: document.getElementById("send_type_email").checked,
            value: document.getElementById("send_type_email").value
          }
        ]
      });
      this.hasToEnableContactEdit()
      if (!result.value) {
        return;
      }
      if (result.value.every(r => !r.checked)) {
        this.errorResendInviteLabel = "Você deve escolher ao menos 1 tipo de envio";
        this.openSendTypesAlert();
        return;
      }

      await this.resendInvite(result.value.map(v => v.value));
    },
    async resendInvite(sendTypes) {
      this.startLoading();
      try {
        await this.$services.simulation.resendSMSToClient(
          this.client.documentNumber,
          sendTypes
        );
        this.modals.invalidModal = false;
        this.blockForm(false);
        this.passToSimulation = true;
      } catch (error) {
        console.log({ error });
        this.$swal({
          title: "Desculpe",
          text: "Erro ao enviar SMS ou E-mail",
          icon: "error",
          confirmButtonText: "OK",
          showCloseButton: true,
          customClass: "swal-listo"
        });
      } finally {
        this.finishLoading();
      }
    },
    async closeRegistrationWaitingModal() {
      this.hasToEnableContactEdit();
      this.blockForm(true);
      this.$v.preCadastro.$reset();
      this.modals.waitingModal = false;
      this.$emit("finishPreCadastro", true);
    },
    async closeInvalidModal() {
      this.$v.preCadastro.$reset();
      this.modals.invalidModal = false;
      if (this.isConfirmApp) {
        this.unblockForm();
        return;
      }
      this.openWSConnection(this.preCadastro.documentNumber, false);
      this.hasToEnableContactEdit();
      this.passToSimulation = true;
      this.$emit("finishPreCadastro", true);
      this.blockForm(true);
    },
    async fillPreCadastroForm() {
      this.passToSimulation = false;
      this.blockForm();
      this.$emit("changeSimulation");
      try {
        this.startLoading();
        await this.updateUser();
        this.isRegistrationFinishOnApp();
        this.hasToEnableContactEdit();
        this.passToSimulation = true;
        this.blockForm(false);
      } catch (error) {
        console.log({ error });
        if (error.hasRestriction) {
          this.cleanPreCadastro();
          return this.clientRestrictionAlert();
        }
        if (error.status === 204) {
          this.cleanPreCadastro();
          this.allowFillForm = true;
          this.allowContactEdition = false;
          this.$v.preCadastro.$reset();
        }
      }
      this.finishLoading();
    },
    hasToEnableContactEdit() {
      if (!this.client.hasUser) {
        this.hasEditionButtonShow = true;
      }
    },
    clientRestrictionAlert() {
      return this.$swal({
        title: "Atenção!",
        text: "Cliente com restrição de financiamento",
        icon: "error",
        confirmButtonText: "OK",
        showCloseButton: true,
        customClass: "swal-listo"
      });
    },
    getLabelFromSendType(sendType) {
      return sendType === "SMS"
        ? { label: "Celular: ", key: "cellPhone" }
        : { label: "E-mail: ", key: "email" };
    },
    showConfirmRegistrationAlert() {
      return this.$swal({
        type: "question",
        title: "Confirmar canal",
        html: `
          <p>O convite para acessar o aplicativo Listo Fácil será enviado pelos seguinte(s) canal(is): </p>
          <ul class="channels-confirm">
              ${this.sendTypesHTML}
          </ul>
        `,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: "ENVIAR",
        cancelButtonText: "EDITAR",
        customClass: "swal-listo"
      });
    },
    isRegistrationFinishOnApp() {
      if (!this.isConfirmApp) {
        this.blockForm();
        this.openSendTypesAlert();
        throw Object.assign(
          {},
          {
            status: 412,
            msg: "CLIENT_NOT_VALID"
          }
        );
      }
    },
    cleanPreCadastro() {
      this.cleanClient();
      this.syncPreCadastro();
    },
    syncPreCadastro() {
      const objc = { ...this.preCadastro };
      objc.documentNumber = objc.documentNumber;

      this.preCadastro = { ...this.client };
      this.preCadastro.documentNumber = objc.documentNumber;
    },
    async handleSubmit() {
      if (this.client.hasFinancing) {
        this.$swal({
          title: "Proposta Recusada",
          text:
            "Fora da Política de Crédito, face o cliente já possuir financiamento em andamento com a Listo.",
          icon: "error",
          confirmButtonText: "Fechar",
          customClass: "swal-listo"
        });

        return false;
      }

      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      if (this.passToSimulation) {
        this.$emit("finishPreCadastro", false);
        this.blockForwardButton = false
        return;
      }
      if (this.allowContactEdition) {
        this.editPreCadastro(this.preCadastro);
        this.blockForm();
        this.blockEdition();
        return;
      }
      const objc = { ...this.preCadastro };
      objc.documentNumber = this.$options.filters.removeMask(
        objc.documentNumber
      );
      this.blockForm();
      this.blockEdition();
      await this.savePreCadastro(objc);
    },
    async savePreCadastro(preCadastro) {
      const {
        value: proceedRegistration
      } = await this.showConfirmRegistrationAlert();
      if (!proceedRegistration) {
        this.unblockForm();
        return;
      }
      if (this.client.hasUser) {
        this.$emit("finishPreCadastro", true);
        this.openWSConnection(preCadastro.documentNumber, false);
        return;
      }
      this.startLoading();
      try {
        await this.savePreRegistration(preCadastro);
        await this.openWSConnection(preCadastro.documentNumber);
      } catch (error) {
        if (error.status === 400) {
          return this.clientRestrictionAlert();
        }
        console.log(error);
        return this.$swal({
          title: "Desculpe",
          text: error.response.data,
          icon: "error",
          confirmButtonText: "OK",
          showCloseButton: true,
          customClass: "swal-listo"
        });
      } finally {
        this.finishLoading();
      }
    },
    async openWSConnection(documentNumber, showWaitingModal = true) {
      try {
        const connection = await this.$services.ws.getConnection(
          documentNumber
        );
        this.connectionWS = connection;
        this.modals.waitingModal = showWaitingModal ? true : false;
        connection.on("ReceiverRegister", async ev => {
          await connection.stop();
          this.addClientID(JSON.parse(ev).clientId);
          this.modals.waitingModal = false;
          this.$emit("finishPreCadastro", false);
        });
        await connection.start({ jsonp: true });
      } catch (error) {
        console.log(error);
      } finally {
        this.finishLoading();
      }
    },
    async editPreCadastro(preCadastro) {
      try {
        this.startLoading();
        await this.updateContacts({
          email: preCadastro.email,
          cellPhone: preCadastro.cellPhone
        });
        await this.resendInvite(preCadastro.sendTypes);
        this.hasToEnableContactEdit();
        this.$emit("finishPreCadastro", true);
        this.openWSConnection(preCadastro.documentNumber, false);
        this.blockForwardButton = false
      } catch (error) {
        this.$swal({
          title: "Desculpe",
          text: error.response.data.error
            ? error.response.data.error
            : "Tivemos um problema, por favor contate a Listo",
          icon: "error",
          confirmButtonText: "OK",
          showCloseButton: true,
          customClass: "swal-listo"
        });
      } finally {
        this.finishLoading();
      }
    },
    delayTouch($v) {
      $v.$reset();

      if (touchMap.has($v)) {
        clearTimeout(touchMap.get($v));
      }

      touchMap.set($v, setTimeout($v.$touch, 500));
    }
  }
};
</script>

<style lang="less">
@import "~assets/vars.less";

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

button {
  background: #000;
  color: @color7;
  text-transform: uppercase;
}

.is-disabled {
  pointer-events: none;
  opacity: 0.5;
}

.channels-confirm {
  font-weight: bold;
  margin: 0 auto;
  text-align: left;
  line-height: 2;
  width: 350px;
}

.sendtype_box {
  display: flex;
  flex-direction: column;
  font-weight: bold;
  .sendtype_box__types {
    display: inline-flex;
    justify-content: space-between;
    max-width: 250px;
    .checkbox {
      margin: 10px 0;
    }
    .checkbox:last-child {
      margin-right: 10px;
    }
    label {
      font-weight: bold;
    }
  }
}

.custom-btn {
  margin-right: 10px;
  max-width: 190px;
}

.custom-submit-btn {
  max-width: 190px;
}

.btn-wrapper {
  display: flex;
  align-items: right;
  justify-content: flex-end;
}

.btn-container {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
// FIXME: REMOVE DUPLICATE CODE IN A SERVICE WAY
.send-types-swal-listo {
  width: 400px;
  height: 350px;
  line-height: 3.5em;
  border-radius: 0 !important;
  text-align: center;
  margin: 20px;
  .swal2-confirm {
    background: @color1 !important;
    color: @color2 !important;
    text-transform: uppercase !important;
    font-size: 16px !important;
    border-radius: 0 !important;
    width: auto !important;
    margin-bottom: 0;
    order: 1;
    height: 40px;
    line-height: initial;
  }
  .swal2-cancel {
    background: @color1 !important;
    color: @color2 !important;
    text-transform: uppercase !important;
    font-size: 16px !important;
    border-radius: 0 !important;
    width: auto !important;
    margin-bottom: 0;
    height: 40px;
    line-height: initial;
  }
  .swal2-title {
    font-size: 25px !important;
  }
  .swal2-content {
    font-size: 16px;
    font-weight: bold;
    margin: 0;
  }
  .swal2-actions {
    flex-wrap: nowrap !important;
    -webkit-box-align: center;
    margin: 0;
  }
  .swal2-popup {
    width: 40em;
    margin: 20px;

    #swal2-header {
      margin: 20px;
    }

    #swal2-content {
      margin: 5px 0;
      line-height: 30px;
    }
  }
}

.new-swal-listo {
  width: 564px;
  height: 356px;
  line-height: 1em;
  border-radius: 0 !important;
  text-align: center;
  margin: 20px;
  .swal2-confirm {
    background: @color1 !important;
    color: @color2 !important;
    text-transform: uppercase !important;
    font-size: 16px !important;
    border-radius: 0 !important;
    width: 245px !important;
    margin-bottom: 0;
    order: 1;
    height: 40px;
    line-height: initial;
  }
  .swal2-cancel {
    background: @color1 !important;
    color: @color7 !important;
    text-transform: uppercase !important;
    font-size: 16px !important;
    border-radius: 0 !important;
    width: 50% !important;
    height: 40px;
    line-height: initial;
  }
  .swal2-title {
    font-size: 25px !important;
  }
  .swal2-content {
    font-size: 16px;
    font-weight: bold;
    margin: 30px;
  }
  .swal2-actions {
    flex-wrap: nowrap !important;
    -webkit-box-align: center;
    margin: 0;
  }
  .swal2-popup {
    width: 40em;
    margin: 20px;

    #swal2-header {
      margin: 20px;
    }

    #swal2-content {
      margin: 5px 0;
      line-height: 30px;
    }
  }
}
</style>
