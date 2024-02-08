<template>
  <Base-Modal v-if="active" class="cet">
    <template #header>
      <img src="~/assets/img/logo-carro-custo.png" alt="" />
      <Base-Button
        aria-label="Close modal"
        class="area-chassi__close"
        @click="closeModal"
        >x</Base-Button
      >
    </template>
    <template #body>
      <h3>CET - Resumida</h3>
      <h4>Custo Efetivo Total</h4>
      <ul>
        <li>
          <p>
            <strong>Valor do bem:</strong>
            {{ cet.shortCet.value | convertMoney }}
          </p>
        </li>
        <li>
          <p>
            <strong>Entrada:</strong>
            {{ cet.shortCet.inputValue | convertMoney }}
          </p>
        </li>
        <li>
          <p><strong>Marca:</strong> {{ cet.shortCet.brand }}</p>
        </li>
        <li>
          <p><strong>Modelo:</strong> {{ cet.shortCet.model }}</p>
        </li>
        <li>
          <p><strong>Cor:</strong> {{ cet.shortCet.color }}</p>
        </li>
        <li>
          <p>
            <strong>Ano de fabricação:</strong> {{ cet.shortCet.modelYear }}
          </p>
        </li>
        <li>
          <p><strong>Placa:</strong> {{ cet.shortCet.licensePlate }}</p>
        </li>
        <li>
          <p>
            <strong>Data do primeiro Vencimento:</strong>
            {{ cet.shortCet.firstDate }}
          </p>
        </li>
        <li>
          <p>
            <strong>Data do último vencimento:</strong>
            {{ cet.shortCet.lastDate }}
          </p>
        </li>
        <li>
          <p>
            <strong>Valor do IOF:</strong>
            {{ cet.shortCet.iofValue | convertMoney }}
          </p>
        </li>
        <li>
          <p><strong>CET ao mês:</strong> {{ cet.shortCet.cetMonth }} %</p>
        </li>
        <li>
          <p><strong>CET ao ano:</strong> {{ cet.shortCet.cetYear }} %</p>
        </li>
        <li>
          <p>
            <strong>Taxa de juros efetiva ao mês:</strong>
            {{ cet.shortCet.interestRateMonth }} %
          </p>
        </li>
        <li>
          <p>
            <strong>Valor da TC3:</strong>
            {{ cet.shortCet.tc3Value | convertMoney }}
          </p>
        </li>
        <li>
          <p>
            <strong>Taxa de avaliação do veículo:</strong>
            {{ cet.shortCet.vehicleEvaluationFee | convertMoney }}
          </p>
        </li>
      </ul>
    </template>
    <template #footer>
      <section class="area-chassi">
        <Base-FormGroup
          v-if="form"
          type="text"
          name="chassiNumber"
          :label="$t('labels.veiculo.numero_chassi')"
          v-model.trim="$v.chassi.$model"
          @input="delayTouch($v.chassi)"
          @keydown.enter="payNow"
          :class="{ 'area-chassi--error': $v.chassi.$error }"
          class="area-chassi__information"
        >
          <span
            class="area-chassi__error-mesage"
            v-if="$v.chassi.$error && !$v.chassi.required"
          >
            {{ $t("error.chassi_obrigatorio") }}
          </span>
          <span
            class="area-chassi__error-mesage"
            v-if="
              $v.chassi.$error && $v.chassi.required && !$v.chassi.minLength
            "
          >
            {{ $t("error.chassi_min_length") }}
          </span>
          <span
            class="area-chassi__error-mesage"
            v-if="
              $v.chassi.$error &&
                !$v.chassi.validateChassi &&
                $v.chassi.required &&
                $v.chassi.minLength
            "
          >
            {{ $t("error.chassi_invalido") }}
          </span>
        </Base-FormGroup>

        <div class="area-chassi__buttons">
          <Base-Button
            class="area-chassi__button area-chassi__button--close"
            aria-label="Close modal"
            type="button"
            @click="closeCET"
            >PAGAR DEPOIS</Base-Button
          >

          <Base-Button
            aria-label="Close modal"
            :disable="$v.chassi.$invalid && form"
            :class="inputClass"
            @click="payNow"

            >PAGAR AGORA</Base-Button
          >
        </div>
      </section>
    </template>
  </Base-Modal>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";
import { mapMutations, mapState, mapActions } from "vuex";
import { CLOSE_SIMULATION } from "~/store/simulacao/mutations";
import { validateChassi } from "~/utils/validate.utils";

const touchMap = new WeakMap();

export default {
  filters: {
    convertMoney(value) {
      return `R$ ${value}`;
    },
  },
  validations: {
    chassi: {
      required,
      minLength: minLength(17),
      validateChassi,
    },
  },
  data() {
    return {
      chassi: '',
      form: false,
      button: false,
    };
  },
  props: {
    cet: {
      type: Object,
      required: true,
    },
    active: {
      type: Boolean,
      required: false,
      default: false,
    },
    affiliateId: {
      type: Number,
      required: true,
    },
    registerLoanId: {
      type: Number,
      default: 0,
    },
    zeroKm: {
      type: Boolean,
      default: false,
    },
    hasRescueOperation: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    ...mapMutations({
      closeSimulation: `simulacao/${CLOSE_SIMULATION}`,
      startLoad: "startLoading",
      finishLoad: "finishLoading",
    }),
    ...mapActions({
      createChassi: "simulacao/fipe/createChassi",
    }),
    async closeCET() {
      try {
        if (!this.hasRescueOperation) {
          await this.finishLater();
          return;
        }

        this.closeModal();
      } catch (error) {
        console.error(error);
      } finally {
        this.form = false;
      }
    },
    async finishLater() {
      const result = await this.$swal({
        title: "Finalizar mais tarde",
        text:
          "Para resgatar esta operação acesse a aba Relatórios e busque pelo status Simulação.\n Lembre-se, a aprovação tem validade de sete dias corridos a contar da data de hoje.",
        icon: "info",
        confirmButtonText: "Acessar Relátorios",
        cancelButtonText: "Fechar",
        showCancelButton: true,
        showConfirmButton: true,
        customClass: "swal-listo",
      });

      if (result.value) {
        this.$router.push("/financiamentos/auto/relatorio");
      } else {
        this.closeSimulation();
      }
    },
    async isPinPadConnected() {
      try {
        await this.$services.pinpad.isPinpadConnected(this.affiliateId);
        this.$emit("continue");
      } catch (error) {
        console.error({ error });
        throw this.$swal({
          title: "Atenção!",
          text:
            "Sua maquininha (PinPad) não está conectada. Conecte-a agora ou resgate esta operação na sua página de Relatórios de financiamento",
          type: "warning",
          confirmButtonText: "OK",
          showCloseButton: true,
          customClass: "swal-listo",
        });
        this.finishLoad();
      }
    },

    async payNow() {
      if (!this.form && this.statusCar) {
        this.form = true;
        return false;
      }
      try {
        this.startLoad();
        await this.sendChassi();
        await this.isPinPadConnected()
      } catch (error) {
        this.form = false;
        this.finishLoad();
        console.error(error);
      }
    },
    async sendChassi() {
      let registerChassi = {
        registerLoanId: this.registerLoanId,
      };
      if (this.statusCar) {
        if (this.chassi.length <= 0) {
          return false;
        }
        registerChassi = {...registerChassi, chassi: this.chassi.toUpperCase().replace(/\s/g, ""),}
      }
      try {
        await this.createChassi(registerChassi);
      } catch (error) {
        console.error(error);        
        if (this.vehicle.status === 'new') {
          return
        }
        await this.deniedChassi(error)
        throw error
      }
    },
    async deniedChassi(error) {      
      const msgError = error.response.data.errors.map((el, index) => {
        return `${el}. `
      })
      this.form = false;
      this.chassi = ''
      this.finishLoad();
      const isNewCar = this.vehicle.status === 'new'
      const typeText = isNewCar ? 'Chassi' : 'Placa'
      const errorText = `${typeText} não encontrad${isNewCar? 'o': 'a'} na base de Índice Nacional (BIN). \n Cancele a operação${isNewCar ? ' ou mude o número do chassi.' : '.'} `;
      const swalOptions = {
        title: "Erro",
        text: msgError,
        icon: "error",
        cancelButtonText: "Cancelar",
        customClass: "swal-listo",
        showCancelButton: true,
        showConfirmButton: false
      }
      if (isNewCar) {
        swalOptions.confirmButtonText = "Editar"
        swalOptions.showConfirmButton = true
      }
      const result = await this.$swal(swalOptions);
      if (!result.value) {
        this.closeModal();
      }
    },
    closeModal() {
      this.closeSimulation();
      this.$emit("close");
      this.form = false;
    },
    delayTouch($v) {
      $v.$reset();

      if (touchMap.has($v)) {
        clearTimeout(touchMap.get($v));
      }

      touchMap.set($v, setTimeout($v.$touch, 2000));
    },
  },
  computed: {
    ...mapState({
      vehicle: state => state.simulacao.fipe.vehicle,
      iszerokm: state => state.simulacao.fipe.iszerokm
    }),
    statusCar() {
      let statusCar = this.vehicle.status || this.zeroKm;

      if (statusCar === "new") {
        statusCar = true;
      } else if (statusCar === "used") {
        statusCar = false;
      }

      return statusCar;
    },
    inputClass() {
      return {
        "area-chassi__button": true,
        "area-chassi__button--next": true,
        "is-disabled": this.$v.chassi.$invalid && this.form,
      };
    },
  },
  watch: {
    cet(newValue, value) {
      this.chassi = newValue.shortCet.chassi || "";
    },
  },
};
</script>

<style lang="less">
@import "~assets/vars.less";
@import "vue2-dropzone/dist/vue2Dropzone.min.css";
.cet {
  width: 60%;
  h3 {
    font-family: "newjunebold";
    font-size: 20px;
    color: @color1;
    font-weight: bold;
    line-height: 18px;
  }
  h4 {
    font-family: "newjuneregular";
    font-size: 18px;
    color: @color1;
    font-weight: bold;
    margin: 0 0 30px 0;
    line-height: 14px;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  p {
    font-family: "newjuneregular";
    font-size: 16px;
    color: @color1;
    text-align: left;
    margin: 0;
  }
}

.modal-header {
  position: relative;
}

.area-chassi {
  width: 100%;
  max-width: 330px;
  flex-wrap: wrap;

  &,
  &__buttons {
    display: flex;
  }

  &__information,
  &__buttons {
    width: 100%;
  }

  &__label {
    margin: 0 0 3px 0;
  }

  &__buttons {
    margin-top: 15px;
    justify-content: space-between;
  }

  &__button {
    font-size: 14px;
    width: 48%;
    border: none;
    transition: background 0.5s ease-in-out;
  }

  &__error-mesage {
    color: red;
    display: block;
  }

  // TODO: Botao fechar modal - refatorar
  &__close {
    position: absolute;
    top: -10px;
    right: -10px;
    background: transparent !important;
    border: none;
    outline: none;
    color: #ccc !important;
    padding: 0;
    margin: 0;
    width: 1.2em;
    font-family: "newjunebook" !important;
    font-size: 14px;
    transition: color 0.1s ease-out;

    &:hover {
      color: #f27474 !important;
    }
  }

  //TODO: Essa area precisa ser apagada em uma refatoracao
  &--error {
    .base-input {
      border-color: red !important;
    }
  }

  .base-input {
    box-sizing: border-box;
    height: 35px !important;
    padding: 0 10px !important;
    margin: 0 !important;
    text-transform: uppercase;
  }

  .is-disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  .area-chassi {
    &__button {
      margin: 0;
    }

    &__button {
      color: #fff;

      &--next {
        background-color: #27a114;

        &:hover {
          background-color: lighten(#27a114, 5%);
        }
      }

      &--close {
        &:hover {
          background-color: lighten(#000, 10%);
        }
      }
    }
  }
}
</style>
