<template>
  <section class="car-simulator-form" id="dados-do-bem-financiado">
    <header class="car-simulator-form__header">
      {{ $t("titles.veiculo") }}
    </header>

    <form @submit.prevent="onSubmit" class="car-simulator-form__form">
      <article
        class="car-simulator-form__content car-simulator-form__content-type"
      >
        <div class="car-simulator-form__box">
          <h3 class="car-simulator-form__title">
            {{ $t("labels.veiculo.tipoVeiculo") }}
          </h3>
          <Base-Radio
            name="tipo-de-veiculo"
            v-for="(type, index) in typesText"
            :key="index"
            @change.native="onSelectVehicleType(type)"
            v-model="vehicle.vehicleType"
            :nativeValue="type"
          >
            {{ type.description }}
          </Base-Radio>
        </div>

        <div class="car-simulator-form__box">
          <h3 class="car-simulator-form__title">
            {{ $t("labels.veiculo.statusVeiculo") }}
          </h3>
          <Base-Radio
            id="status-de-veiculo-carro-novo"
            name="status-de-veiculo"
            v-model="vehicle.status"
            :disabled="!vehicle.vehicleType"
            native-value="new"
            @change.native="onSelectVehicleStatus($event)"
          >
            {{ $t("labels.veiculo.statusNovo") }}
          </Base-Radio>

          <Base-Radio
            id="status-de-veiculo-carro-usado"
            name="status-de-veiculo"
            v-model="vehicle.status"
            :disabled="!vehicle.vehicleType"
            native-value="used"
            @change.native="onSelectVehicleStatus($event)"
          >
            {{ $t("labels.veiculo.statusUsado") }}
          </Base-Radio>
        </div>
      </article>

      <article class="car-simulator-form__content">
        <Base-Select
          id="brands"
          name="brands"
          class="car-simulator-form__select"
          placeholder="Selecione uma marca"
          :label="$t('labels.veiculo.marca')"
          v-model="vehicle.brand"
          @change="onSelectBrand($event)"
          :disabled="isBrandDisabled"
        >
          <option v-for="brand in brandsText" :value="brand" :key="brand.id">
            {{ brand.text }}
          </option>
        </Base-Select>

        <Base-Select
          id="models"
          name="models"
          class="car-simulator-form__select"
          placeholder="Selecione um Modelo"
          :label="$t('labels.veiculo.modelo')"
          :disabled="isModelDisabled"
          v-model="vehicle.model"
          @change="onSelectModel($event)"
        >
          <option v-for="model in modelsText" :value="model" :key="model.id">
            {{ model.text }}
          </option>
        </Base-Select>
      </article>

      <article class="car-simulator-form__content">
        <Base-Select
          class="car-simulator-form__group"
          placeholder="Selecione um Modelo"
          :label="$t('labels.veiculo.ano')"
          v-model="vehicle.year"
          @change="onSelectYear($event)"
          :disabled="isYearDisabled"
          id="years"
          name="years"
        >
          <option v-for="year in yearsText" :value="year" :key="year.id">
            {{ year.text }}
          </option>
        </Base-Select>

        <Base-FormMoneyGroup
          class="car-simulator-form__group form__input"
          placeholder="R$ 0,00"
          v-bind="vehicle.marketValue === 0 ? null : money"
          label="Valor na loja "
          id="markeValue"
          name="markeValue"
          type="text"
          v-model="vehicle.marketValue"
          :class="{ form__field__error: $v.vehicle.marketValue.$invalid }"
        >
          <div class="error" v-if="!$v.vehicle.marketValue.required">
            Valor na loja obrigatório
          </div>

        </Base-FormMoneyGroup>

        <Base-FormMoneyGroup
          class="car-simulator-form__group form__input"
          placeholder="R$ 0,00"
          v-bind="vehicle.entranceValue === 0 ? null : money"
          label="Valor da entrada"
          id="markeValue"
          name="markeValue"
          type="text"
          v-model="vehicle.entranceValue"
          :formClass="{ 'form__field__error': $v.vehicle.entranceValue.$invalid }"
        >
          <div class="error" v-show="!$v.vehicle.entranceValue.required">
            Valor de entrada é obrigatório
          </div>
          <div class="error" v-show="!$v.vehicle.entranceValue.minValue">
            Valor minimo deve ser 20% do valor na loja
          </div>
        </Base-FormMoneyGroup>
      </article>

      <article
        class="car-simulator-form__content car-simulator-form__content-parcel"
      >
        <h3 class="car-simulator-form__title car-simulator-form__title-parcel">
          Parcelar/pagar entrada com cartão?
        </h3>

        <Base-Radio
          class="car-simulator-form__radio car-simulator-form__radio-yes"
          id="installment-entrance"
          name="installment-entrance"
          v-model="hasInstallmentEntrance"
          native-value="yes"
        >
          Sim
        </Base-Radio>

        <Base-Radio
          class="car-simulator-form__radio car-simulator-form__radio-no"
          id="installment-entrance"
          name="installment-entrance"
          v-model="hasInstallmentEntrance"
          native-value="no"
        >
          Não
        </Base-Radio>
      </article>

      <Base-Button
        class="button__simulated car-simulator-form__button"
        :disabled="$v.$invalid"
        >Simular</Base-Button
      >
    </form>
  </section>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import {
  required,
  minLength,
  requiredIf,
  minValue,
  maxValue
} from "vuelidate/lib/validators";
import upperFirst from "lodash/upperFirst";

import {
  UPDATE_BRANDS,
  UPDATE_MODELS,
  UPDATE_YEARS
} from "~/store/simulacao/fipe/mutations";

export default {
  data() {
    return {
      locks: {
        brand: true,
        model: true,
        year: true
      },
      hasInstallmentEntrance: "",
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
        entranceValue: 0,
        status: null
      },
      modals: {
        invalidModal: false
      }
    };
  },
  validations() {
    return {
      hasInstallmentEntrance: {
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
        entranceValue: {
          required,
          minValue: minValue(Math.round(this.vehicle.marketValue * 0.2))
        },
        status: {
          required
        }
      }
    };
  },
  mounted() {
    this.getFipeVehiclesTypes();
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
      }
      this.vehicle.color = value.toUpperCase();
    },
    onSubmit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.createVehicle(this.vehicle);
      this.$emit("onSimulation", {
        vehicle: this.vehicle,
        hasInstallmentEntrance: this.hasInstallmentEntrance
      });
    },
    onSelectVehicleType(event) {
      this.locks.model = true;
      this.locks.year = true;
      this.updateBrands([{ description: "" }]);
      this.updateModels([]);
      this.updateYears([]);
      this.locks.brand = true;
      this.$emit("onClearSimulation");
    },
    async onSelectVehicleStatus() {
      this.cleanVehicleSimulation([
        "brand",
        "model",
        "year",
        "marketValue",
        "entranceValue"
      ]);
      this.locks.brand = false;
      this.locks.model = true;
      this.locks.year = true;
      await this.getFipeBrands({
        vehicleTypeId: this.vehicle.vehicleType.id,
        zeroKm: this.isZeroKM
      });
      this.$emit("onClearSimulation");
    },
    async onSelectBrand(event) {
      try {
        this.vehicle.brand = event;
        this.cleanVehicleSimulation([
          "model",
          "year",
          "marketValue",
          "entranceValue"
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
        this.$emit("onClearSimulation");
      } catch (error) {
        if (error.status === 204) {
          console.info({ error });
        }
      }
    },
    async onSelectModel(event) {
      this.vehicle.model = event;
      this.cleanVehicleSimulation(["year", "marketValue", "entranceValue"]);
      this.updateYears([{ description: "" }]);
      await this.getFipeYears({ id: event.id, zeroKm: this.isZeroKM });
      this.locks.brand = false;
      this.locks.model = false;
      this.locks.year = false;
      this.$emit("onClearSimulation");
    },
    onSelectYear(event) {
      this.cleanVehicleSimulation(["marketValue", "entranceValue"]);
      this.vehicle.year = event;
      this.$emit("onClearSimulation");
    },
    cleanSimulation() {
      this.cleanState();
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
      getDownPay: "simulacao/financiamento/getDownPayValues"
    })
  },
  destroyed() {
    this.cleanVehicleSimulation();
  },
  computed: {
    isBrandDisabled() {
      return this.locks.brand;
    },
    isModelDisabled() {
      return this.locks.model;
    },
    isYearDisabled() {
      return this.locks.year;
    },
    isEntranceDisabled() {
      return this.hasInstallmentEntrance !== "yes";
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
      documentNumber: state => state.simulacao.preCadastro.documentNumber,
      serviceId: state => state.transaction.financeService[0].serviceID,
      isSimulationClosed: state => state.simulacao.isSimulationClosed
    }),
    isZeroKM() {
      return this.vehicle.status === "new";
    }
  },
  watch: {
    "vehicle.marketValue"(value) {
      this.vehicle.entranceValue = value * 0.2;
      this.$emit("onClearSimulation");
    },
    "vehicle.entranceValue"(value, newValue) {
      if (value > this.vehicle.marketValue) {
        value = this.vehicle.marketValue;
      }
      this.$nextTick(() => {
        this.vehicle.entranceValue = value;
      });
      this.$emit("onClearSimulation");
    },
    hasInstallmentEntrance() {
      this.$emit("onClearSimulation");
    }
  }
};
</script>

<style lang="less" scoped>
@import "./style.less";
</style>
