<template>
  <section class="base-dados-transacao">
    <Base-FieldSet
      title="Dados da transação"
      titleMaxWidth="95%"
      contentFlex="block"
      contentHeight="359px"
    >
      <div class="base-dados-transacao_secao">
        <Base-FormMoneyGroup
          v-bind="money"
          :placeholder="$t('pages.client-panel.placeholders.simulationValue')"
          :label="$t('pages.client-panel.labels.simulationValue')"
          name="simulationValue"
          type="text"
          class="base-new-transaction-simulation_input"
          v-model="$v.simulationValue.$model"
          :class="{ form__field__error: $v.simulationValue.$error }"
        >
         <div class="error" v-if="!$v.simulationValue.required">
            Valor a simular é obrigatório
          </div>
          <div class="error" v-if="!$v.simulationValue.minValue && simulationValue !== 0">
            Valor a simular mínimo deve ser {{limits.minimum | currency}}
          </div>
        </Base-FormMoneyGroup>
      </div>
      <div class="base-dados-transacao_seca o">
        <Base-NewCardBrands
          ref="cardBrands"
          :cardBrandsTransactions="cardBrandsTransaction"
          @onSelectedCardbrands="onSelectedCardbrand"
        />
      </div>
    </Base-FieldSet>
  </section>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators';
import { createNamespacedHelpers } from "vuex";
import { money } from "~/utils/currency.utils";
import { moneyFormatter } from "~/utils/currency.utils";
import cardBrandsTransaction from "./cardBrandsTransaction";

const { mapState: loanSimulationState} = createNamespacedHelpers('loan/simulation')

export default {

  data() {
    return {
      money,
      simulationValue: 0,
      cardBrandsTransaction: cardBrandsTransaction.map(cbt => ({...cbt, disabled: true}))
    };
  },
  validations() {
    return {
      simulationValue: {
        required,
        minValue: minValue(this.limits.minimum - 1)
      }
    }
  },
  filters: {
    currency(value) {
      if (!value) {
        return
      }
      return moneyFormatter(value)
    }
  },
  computed: {
    ...loanSimulationState(['limits'])
  },
  methods: {
    onSelectedCardbrand(cardBrand) {
      this.$emit("onFinishTransactionData", {
        simulationValue: this.simulationValue,
        cardBrandType: cardBrand
      });
    },
    resetState() {
      this.simulationValue = this.limits.minimum
      this.$refs.cardBrands.resetCardbrand()
    }
  },
  watch: {
    simulationValue(value) {
      if (value >= this.limits.available) {
        this.$nextTick(() => {
          this.simulationValue = this.limits.available
        })
      } else if (value >= this.limits.minimum) {
         this.cardBrandsTransaction = this.cardBrandsTransaction.map(cbt => ({...cbt, disabled:false}))
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "./style.less";
</style>
