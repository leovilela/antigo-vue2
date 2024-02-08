<template>
  <section class="page-pagamentos-auto page-pagamentos-auto--simulacao container-fluid page-pagamentos">
    <!-- this.actualFields{{detran.actualFields}} -->
    <!-- <pre>detran {{detran}}</pre> -->
    <!-- <pre>{{$v.detran}}</pre> -->
    <div  v-if="detran.resultDetranPayments" class="row">
      <div id="pre-cadastro">
        <div class="panel panel-default">
          <div class="panel-heading">
            <span>{{$t('titles.consultaDetran')}}</span>
          </div>
          <div class="panel-body">
            <Base-Alert type="danger" v-if="$v.detran.$error"> {{$t('alerts.errors.field_errors')}}</Base-Alert>
            <form @submit.prevent="handleSubmit">
              <div class="row">
                <div class="col-xs-2">
                  <label for="stateGroup">{{ $t('labels.detran.estado') }}</label>
                    <select placeholder="Escolha" v-model="detran.estado" :disabled="detran.sendConsulta" id="stateGroup" name="stateGroup">
                        <option
                              v-for="(state, index) in statesGroup.options"
                              :value="state.value"
                              :key="index">
                              {{ state.text }}
                          </option>
                    </select>
                </div>

                <div class="col-xs-5" v-for="(field, index) in detran.actualFields" :value="field.state" :key="index" :class="{'form__field__error': $v.detran[field.name].$error}">
                  <label :for="field.name">{{$t(field.label)}}</label>
                  <div v-if="field.name !== 'email'">
                    <input v-if="field.name !== 'email'" type="text" v-model="$v.detran[field.name].$model" :placeholder="$t(field.placeholder)" :name="field.name" :id="field.name" v-mask="[...field.mask]" :disabled="detran.sendConsulta">
                  </div>
                  <div v-else>
                    <the-mask type="text" v-model="$v.detran[field.name].$model"
                  :placeholder="$t(field.placeholder)" :name="field.name" :id="field.name" :disabled="detran.sendConsulta" :tokens="emailToken" mask="EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE" ></the-mask>
                  </div>


                </div>
              </div>
              <div class="row">
                <!-- $v.detran.$invalid {{$v.detran.$invalid}} -->
                <div class="btn-wrapper col-xs-3 col-xs-offset-9" v-if="!detran.sendConsulta">
                   <button :disabled="$v.detran.$invalid" :name="$t('buttons.avancar')" class="button">{{$t('buttons.avancar')}} </button>
                </div>
              </div>
            </form>
            <div class="row">
              <div class="btn-wrapper col-xs-3 col-xs-offset-9" v-if="detran.sendConsulta">
                  <Base-Button type="button" @click="resetDisplay()">{{$t('buttons.novaConsulta')}}</Base-Button>
                </div>

            </div>
          </div>
        </div>
      </div>
      <div v-if="statusBusca !== 200">
        <div id="pre-cadastro" class="col-xs-12">
          <Base-Alert type="danger" ><strong>{{$t('error.erro_afiliar')}}</strong></Base-Alert>
        </div>
      </div>
    </div>
    <div v-else>
      <div id="pre-cadastro" class="col-xs-12">
        <div class="panel panel-default">
          <div class="panel-heading">
            <span>Operação não permitida</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
/* eslint-disable func-names */
import {
  required, minLength, maxLength, helpers, renavan, email, requiredIf,
} from "vuelidate/lib/validators";

import { mapState, mapActions, mapMutations } from "vuex";
import { log } from "util";
import {
  phoneRegexMobile,
} from "~/utils/regex.utils";
import {
  validaDocumento,
} from "~/utils/validate.utils";


export default {
  data() {
    return {
      emailToken: {
        E: {
          pattern: /[0-9a-zA-Z-_.@]/,
        },
      },
      detran: {
        actualFields: [],
        resultDetranPayments: true,
        cpfCnpj: "",
        placa: "",
        renavan: "",
        estado: "",
        email: "",
        serviceId: "",
        serviceName: "",
        sendConsulta: false,
        dadosVariaveis: {
          dadosTransacao: {},
        },
        estados: [],
      },

    };
  },
  validations: {
    detran: {
      dadosVariaveis: {
        dadosTransacao: {},
      },
      estado: {
        required,
      },
      cpfCnpj: {
        minLength: minLength(14),
        required: requiredIf(function validateIf(nestedModel) {
          const val = this.detran.actualFields.filter(st => st.name == "cpfCnpj");
          if (validaDocumento && val.length) {
            return true;
          }
          return false;
        }),
      },
      renavan: {
        minLength: minLength(9),
        maxLength: maxLength(11),
        required: requiredIf(function validateIf(nestedModel) {
          const val = this.detran.actualFields.filter(st => st.name == "renavan");
          return val.length;
        }),
      },
      placa: {
        minLength: minLength(7),
        required: requiredIf(function validateIf(nestedModel) {
          const val = this.detran.actualFields.filter(st => st.name == "placa");
          return val.length;
        }),
      },
      email: {
        email,
      },
    },
  },
  async mounted() {
    try {
      this.startLoading();
      this.getServiceDetran();
      this.statusBuscaFn(200);
      await this.getRequiredFields();
      this.cleanClient();
      const detranPayments = this.typesOfservices;
      let resultDetranPayments = false;
      if (detranPayments) {
        resultDetranPayments = detranPayments.find(service => service.serviceName === "DETRAN - Pagamento de Taxas");
      } else {
        this.detran.resultDetranPayments = false;
        return false;
      }
      this.detran.serviceId = resultDetranPayments.serviceId;
      this.detran.serviceName = resultDetranPayments.serviceName;
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
  filters: {
    removeMask(value) {
      if (!value) {
        return;
      }
      return value.replace(/[^\d]/g, "");
    },
  },
  watch: {
    "detran.placa": function (newValue, oldValue) {
      this.detran.placa = newValue.toUpperCase();
    },
    requiredFields(newValue, oldValue) {
      this.detran.estados = this.requiredFields;
    },
    "detran.estado": function (newValue, oldValue) {
      this.detran.actualFields = this.requiredFields.filter(st => st.state == newValue)[0].fields;
    },
  },
  destroyed() {
    // this.cleanClient();
  },
  computed: {
    statesGroup() {
      return {
        id: "estados",
        options: this.detran.estados.map(pos => ({
          text: `${pos.state}`,
          value: pos.state,
        })),
      };
    },
    ...mapState({
      states: state => state.cep.states,
      fee: state => state.detran.fee,
      cpfCnpj: state => state.detran.cpfCnpj,
      email: state => state.detran.email,
      estado: state => state.detran.estado,
      placa: state => state.detran.placa,
      renavan: state => state.detran.renavan,
      transactionType: state => state.transaction.transactionTypes,
      typesOfservices: state => state.transaction.typesOfservices,
      fields: state => state.transaction.fields,
      requiredFields: state => state.detran.requiredFields,
      statusBusca: state => state.detran.statusBusca,
    }),
  },
  methods: {
    ...mapActions({
      saveData: "detran/saveData",
      cleanClient: "detran/cleanClient",
      getRequiredFields: "detran/requiredFields",
      statusBuscaFn: "detran/statusBusca",
      getServiceDetran: "detran/getServiceDetran",
    }),
    ...mapMutations(["startLoading", "finishLoading"]),

    resetDisplay() {
      this.cleanClient();
      this.statusBuscaFn(200);
      this.detran.sendConsulta = false;
    },

    async checkEstado(value) {
      if (this.detran.estado == value) return true;
      return false;
    },
    async handleSubmit() {
      try {
        this.startLoading();
        this.detran.sendConsulta = true;
        this.$v.$touch();
        if (this.$v.$invalid) {
          return;
        }
        const objc = { ...this.detran };
        objc.cpfCnpj = this.$options.filters.removeMask(objc.cpfCnpj);
        await this.saveData(objc);
        this.finishLoading();
        this.$emit("onResultConsultIpva");
        this.statusBuscaFn(200);
      } catch (error) {
        this.finishLoading();
        if (!error.response) return;
        this.statusBuscaFn(error.response.status);
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
.page-pagamentos {
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
.page-pagamentos-auto {
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
