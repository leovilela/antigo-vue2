<template>
  <section
    class="page-financiamentos-auto page-financiamentos-auto--simulacao container-fluid"
    id="dados-do-bem-financiado"
  >
    
    <div class="row">
      <div id="dados-veiculo" class="col-xs-12">
        <div class="panel panel-default">
          <div class="panel-heading">
            <span>{{ $t("titles.veiculo") }}</span>
          </div>
          <div class="panel-body">
            <form @submit.prevent="onSubmit">
              <div class="row">
                <div class="col-xs-12">
                  <Base-Alert type="danger" v-if="$v.vehicle.$error">
                    {{ $t("alerts.errors.field_errors") }}</Base-Alert
                  >
                </div>
              </div>
              <div class="row">
                <div class="col-xs-2">
                  <h3>{{ $t("labels.veiculo.tipoVeiculo") }}</h3>
                </div>
                <div class="col-xs-7" style="display: inline-block">
                  <Base-Radio
                    v-for="(type, index) in typesText"
                    isInline
                    @change.native="onSelectVehicleType(type)"
                    v-model="vehicle.vehicleType"
                    :nativeValue="type"
                    :key="index"
                    name="tipo-de-veiculo"
                  >
                    {{ type.description }}
                  </Base-Radio>
                </div>
              </div>
              <div class="row" v-show="vehicle.vehicleType">
                <div class="col-xs-2">
                  <h3>{{ $t("labels.veiculo.statusVeiculo") }}</h3>
                </div>
                <div class="col-xs-4">
                  <Base-Radio
                    id="status-de-veiculo-carro-novo"
                    isInline
                    v-model="vehicle.status"
                    native-value="new"
                    @change.native="onSelectVehicleStatus($event)"
                    name="status-de-veiculo"
                  >
                    {{ $t("labels.veiculo.statusNovo") }}
                  </Base-Radio>

                  <Base-Radio
                    id="status-de-veiculo-carro-usado"
                    isInline
                    v-model="vehicle.status"
                    native-value="used"
                    @change.native="onSelectVehicleStatus($event)"
                    name="status-de-veiculo"
                  >
                    {{ $t("labels.veiculo.statusUsado") }}
                  </Base-Radio>
                </div>
              </div>
              <div class="row" v-show="showVehicleBlock">
                <div class="col-xs-3">
                  <Base-Select
                    placeholder="Selecione uma marca"
                    :label="$t('labels.veiculo.marca')"
                    v-model="vehicle.brand"
                    @change="onSelectBrand($event)"
                    :disabled="isBrandDisabled"
                    id="brands"
                    name="brands"
                  >
                    <option
                      v-for="brand in brandsText"
                      :value="brand"
                      :key="brand.id"
                    >
                      {{ brand.text }}
                    </option>
                  </Base-Select>
                </div>
                <div class="col-xs-9">
                  <Base-Select
                    placeholder="Selecione um Modelo"
                    :label="$t('labels.veiculo.modelo')"
                    v-model="vehicle.model"
                    @change="onSelectModel($event)"
                    :disabled="isModelDisabled"
                    id="models"
                    name="models"
                  >
                    <option
                      v-for="model in modelsText"
                      :value="model"
                      :key="model.id"
                    >
                      {{ model.text }}
                    </option>
                  </Base-Select>
                </div>
              </div>
              <div class="row" v-show="showVehicleBlock">
                <div class="col-xs-3">
                  <div class="form-group">
                    <Base-Select
                      placeholder="Selecione um Ano"
                      :label="$t('labels.veiculo.ano')"
                      v-model="vehicle.year"
                      @change="onSelectYear($event)"
                      :disabled="isYearDisabled"
                      id="years"
                      name="years"
                    >
                      <option
                        v-for="year in yearsText"
                        :value="year"
                        :key="year.id"
                      >
                        {{ year.text }}
                      </option>
                    </Base-Select>
                  </div>
                </div>
                <div class="col-xs-3">
                  <Base-FormMoneyGroup
                    placeholder="R$ 0,00"
                    v-bind="vehicle.marketValue === 0 ? null : money"
                    label="Valor na loja "
                    id="markeValue"
                    name="markeValue"
                    type="text"
                    class="form__input"
                    v-model="vehicle.marketValue"
                    :class="{
                      form__field__error: $v.vehicle.marketValue.$error
                    }"
                  >
                    <div class="error">Valor de veiculo inválido</div>
                  </Base-FormMoneyGroup>
                </div>
                <div class="col-xs-3">
                  <Base-FormGroup
                    placeholder="ABC 1234 ou ABC 1F23"
                    v-mask="'AAA #X##'"
                    label="Placa "
                    id="plate"
                    name="plate"
                    type="text"
                    class="form__input"
                    v-model="vehiclePlate"
                    :class="{ form__field__error: $v.plate.$error }"
                  >
                    <div class="error">Valor de placa inválido</div>
                  </Base-FormGroup>
                </div>
                <div class="col-xs-3">
                  <Base-FormGroup
                    placeholder="Azul"
                    label="Cor "
                    id="color"
                    name="color"
                    type="text"
                    class="form__input"
                    v-model="vehicleColor"
                    :class="{ form__field__error: $v.color.$error }"
                  >
                    <div class="error">Cor obrigatória</div>
                  </Base-FormGroup>
                </div>
                <div class="col-xs-3 col-xs-push-3 bt-simular">
                  <Base-Button :disabled="$v.$invalid"
                    >SIMULAR</Base-Button
                  >
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <Base-CadastroDigitalInvalidoModal
      @cancel="modals.invalidModal = false"
      @sendSMS="resendSMS"
      :active="modals.invalidModal"
    />
  </section>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import {
  required,
  minLength,
  requiredUnless,
  requiredIf,
  minValue
} from "vuelidate/lib/validators";
import upperFirst from "lodash/upperFirst";
import { validaPlaca, validateIf } from "~/utils/validate.utils";

import {
  UPDATE_BRANDS,
  UPDATE_MODELS,
  UPDATE_YEARS
} from "~/store/simulacao/fipe/mutations";
import { DEFAULT_PRODUCT_TYPE, DEFAULT_TRANSACTION_TYPE } from "./index.vue";

export default {
  data() {
    return {
      locks: {
        brand: true,
        model: true,
        year: true
      },
      plate: "",
      color: "",
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        precision: 2,
        masked: false
      },
      vehicle: {
        brand: "",
        model: "",
        year: "",
        vehicleType: null,
        marketValue: 0,
        plate: "",
        color: "",
        status: null
      },
      showVehicleBlock: false,
      modals: {
        invalidModal: false
      }
    };
  },
  validations() {
    return {
      plate: {
        required: requiredIf(function () {
          return !this.isZeroKM
        }),
        validaPlaca: validateIf('plate', validaPlaca)
      },
      color: {
        required
      },
      vehicle: {
        brand: {
          required
        },
        model: {
          required
        },
        year: {
          required
        },
        marketValue: {
          required,
          minValue: minValue(1)
        },
        // plate: {
        //   required: requiredIf(function () {
        //     return !this.isZeroKM
        //   }),
        //   validaPlaca: validateIf('plate', validaPlaca)
        // },
        // color: {
        //   required
        // },
        status: {
          required
        }
      }
    };
  },
  async mounted() {
    await this.getFipeVehiclesTypes();
    this.syncDadosBemFinanciado();
  },

  watch: {
    vehicleStatus() {
      this.$nextTick(() => {
        this.$refs.vehicleBrand.$el.scrollIntoView({ behavior: "smooth" });
      });
    },
    isSimulationClosed() {
      this.$emit("changeSimulation");
      this.cleanVehicleSimulation([
        "vehicleType",
        "brand",
        "model",
        "year",
        "marketValue",
        "plate",
        "color",
        "status"
      ]);
    },
    plate: {
      deep: true,
      handler() {
        this.$emit("changeSimulation");
      }
    },
    color: {
      deep: true,
      handler() {
        this.$emit("changeSimulation");
      }
    },
    vehicle: {
      deep: true,
      handler() {
        this.$emit("changeSimulation");
      }
    }
  },
  props: {
    blockSaveButton: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    setColor(value) {
      if (!value) {
        this.vehicle.color = "";
        this.color = "";
      }
      this.vehicle.color = value.toUpperCase();
      this.color = value.toUpperCase();
    },
    syncDadosBemFinanciado() {
      this.vehicle = this.storeVehicle;
      if (this.vehicle.vehicleType) {
        this.locks.model = false;
        this.locks.year = false;
        this.locks.brand = false;
        this.showVehicleBlock = true;
      }
    },
    async resendSMS() {
      this.startLoading();
      try {
        await this.$services.simulation.resendSMSToClient(this.documentNumber, [
          "SMS"
        ]);
        this.modals.invalidModal = false;
        this.$v.$reset();
      } catch (error) {
        console.log({ error });
        this.$swal({
          title: "Desculpe",
          text: "Erro ao enviar o sms por favor re-envie",
          icon: "error",
          confirmButtonText: "OK",
          showCloseButton: true,
          customClass: "swal-listo"
        });
      } finally {
        this.finishLoading();
      }
    },
    async onSubmit() {
      if (this.blockSaveButton) {
        this.modals.invalidModal = true;
        return;
      }
      const requestSimulation = {
        document: `${this.documentNumber}`,
        modelYearId: this.vehicle.year.id,
        transactionTypeId: DEFAULT_TRANSACTION_TYPE,
        rType: 0,
        releasedValue: this.vehicle.marketValue,
        serviceType: this.serviceId,
        productType: DEFAULT_PRODUCT_TYPE
      };
      try {
        this.startLoading();
        this.vehicle.plate = this.plate;
        this.vehicle.color = this.color;
        this.createVehicle(this.vehicle);
        const downPayResponse = await this.getDownPay(requestSimulation);
        const percentageOfDownPay = Math.round(
          (downPayResponse.valueEntrance / this.vehicle.marketValue) * 100
        );
        if (
          percentageOfDownPay === 0 ||
          percentageOfDownPay < 0.1 ||
          percentageOfDownPay === 1
        ) {
          throw Object.assign({
            response: {
              data: {
                detail:
                  "Desculpe, tivemos um problema com a simulação \n Entre em contato com a listo!"
              },
              tech: downPayResponse
            }
          });
        }
        this.finishLoading();
        this.$emit("finishFillData");
      } catch (error) {
        this.finishLoading();
        this.$swal({
          title: "Desculpe",
          text: error.response.data.detail,
          icon: "error",
          confirmButtonText: "OK",
          showCloseButton: true,
          customClass: "swal-listo"
        });
        console.log({ error });
      }
    },
    onSelectVehicleType(event) {
      this.cleanVehicleSimulation([
        "brand",
        "model",
        "year",
        "marketValue",
        "plate",
        "color",
        "status"
      ]);
      this.locks.model = true;
      this.locks.year = true;
      this.updateBrands([{ description: "" }]);
      this.updateModels([]);
      this.updateYears([]);
      this.locks.brand = false;
      this.showVehicleBlock = false;
      this.$emit("changeSimulation");
    },
    async onSelectVehicleStatus() {
      this.cleanVehicleSimulation([
        "brand",
        "model",
        "year",
        "marketValue",
        "plate",
        "color"
      ]);
      this.locks.brand = false;
      this.locks.model = true;
      this.locks.year = true;
      this.showVehicleBlock = true;
      await this.getFipeBrands({
        vehicleTypeId: this.vehicle.vehicleType.id,
        zeroKm: this.isZeroKM
      });
      this.$emit("changeSimulation");
    },
    async onSelectBrand(event) {
      try {
        this.vehicle.brand = event;
        this.cleanVehicleSimulation([
          "model",
          "year",
          "marketValue",
          "plate",
          "color"
        ]);
        this.locks.brand = false;
        this.locks.year = true;
        this.updateModels([{ description: "" }]);
        this.updateYears([]);
        await this.getFipeModels({
          brandId: event.id,
          vehicleId: this.vehicle.vehicleType.id,
          zeroKm: this.isZeroKM
        });
        this.locks.model = false;
        this.$emit("changeSimulation");
      } catch (error) {
        if (error.status === 204) {
          console.log({ error });
        }
      }
    },
    async onSelectModel(event) {
      this.vehicle.model = event;
      this.cleanVehicleSimulation(["year", "marketValue", "plate", "color"]);
      this.updateYears([{ description: "" }]);
      await this.getFipeYears({ id: event.id, zeroKm: this.isZeroKM });
      this.locks.brand = false;
      this.locks.model = false;
      this.locks.year = false;
      this.$emit("changeSimulation");
    },
    onSelectYear(event) {
      this.cleanVehicleSimulation(["marketValue", "plate", "color"]);
      this.vehicle.year = event;
      this.$emit("changeSimulation");
    },
    cleanSimulation() {
      this.cleanState();
      this.showVehicleBlock = false;
    },
    cleanVehicleSimulation(cleanAtributes) {
      if (!cleanAtributes) {
        cleanAtributes = [""];
      }
      cleanAtributes.forEach(cleanAtribute => {
        this.vehicle[cleanAtribute] = "";
        this.marketValue = "";
      });
      this.$v.$reset();
    },
    ...mapMutations({
      updateBrands: `simulacao/fipe/${UPDATE_BRANDS}`,
      updateModels: `simulacao/fipe/${UPDATE_MODELS}`,
      updateYears: `simulacao/fipe/${UPDATE_YEARS}`,
      startLoading: "startLoading",
      finishLoading: "finishLoading"
    }),
    ...mapActions({
      getFipeBrands: "simulacao/fipe/getFipeBrands",
      getFipeModels: "simulacao/fipe/getFipeModels",
      getFipeYears: "simulacao/fipe/getFipeYears",
      getFipeVehiclesTypes: "simulacao/fipe/getFipeVehiclesTypes",
      cleanState: "simulacao/fipe/cleanState",
      createVehicle: "simulacao/fipe/createVehicle",
      getDownPay: "simulacao/financiamento/getDownPayValues",
    })
  },
  computed: {
    vehiclePlate: {
      get() {
        return this.plate;
      },
      set(value) {
        if (!value) {
          this.plate = "";
          this.$v.plate.$reset()
          return;
        }
        this.plate = value.toUpperCase();
        this.$v.plate.$touch()
      }
    },
    vehicleColor: {
      get() {
        return this.color;
      },
      set(value) {
        if (!value) {
          this.color = "";
          this.$v.color.$reset()
          return;
        }
        this.color = value.toUpperCase();
        this.$v.color.$touch()
      }
    },
    isBrandDisabled() {
      return this.locks.brand;
    },
    isModelDisabled() {
      return this.locks.model;
    },
    isYearDisabled() {
      return this.locks.year;
    },
    brandsText() {
      return this.brands.map(brand => ({
        ...brand,
        text: brand.description
      }));
    },
    modelsText() {
      return this.models.map(model => ({
        ...model,
        text: model.description
      }));
    },
    yearsText() {
      return this.years.map(year => ({
        ...year,
        text: `${year.manufactureYear}`
      }));
    },
    typesText() {
      return this.types.map(type => ({
        ...type,
        description: upperFirst(`${type.description}`.toLowerCase())
      }));
    },
    ...mapState({
      brands: state => state.simulacao.fipe.brands,
      models: state => state.simulacao.fipe.models,
      years: state => state.simulacao.fipe.years,
      types: state => state.simulacao.fipe.types,
      storeVehicle: state => state.simulacao.fipe.vehicle,
      documentNumber: state => state.simulacao.preCadastro.documentNumber,
      serviceId: state => state.transaction.financeService[0].serviceID,
      isSimulationClosed: state => state.simulacao.isSimulationClosed
    }),
    isZeroKM() {
      return this.vehicle.status === "new";
    }
  }
};
</script>

<style lang="less" scoped>
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

label {
  color: @color1;
}

button {
  background: @color1;
  color: @color7;
  text-transform: uppercase;
}

.form-radio {
  margin: 8px 10px 0 0;
  display: inline-block;
}

h3 {
  font-size: 12px;
  color: @color1;
  display: inline-block;
}

.page-financiamentos-auto {
  &--simulacao {
    #dados-veiculo {
      .field-veiculo-novo {
        margin-top: 10px;
        padding-bottom: 10px;
      }
      .inputs-financiamento {
        input {
          font-size: @ftSizeTiny;
          height: 24px;
          border: none;
          border-bottom: 1px solid @color1;
          margin-bottom: 0;
        }
      }
    }
  }
}

.bt-simular {
  left: 0;
  float: right;
}
</style>
