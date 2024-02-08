<template>
  <article class="base-custos">
    <div class="base-custos__options" v-for="(custoOption, index) in custoOptions" :key="index">
      <label class="base-custos__label">{{custoOption.label}}</label>
      <Base-RadioGroup :radios="custoOption.options" @input="onCustoSelected" />
    </div>
  </article>
</template>

<script>
export default {
  name: 'LCustos',
  props: {
    options: {
      type: Array ,
      default: () => []
    },
  },
  computed: {
    custoOptions(){
      return this.options.map(custoOption => {
        return {
          label: `Custo ${custoOption.feeOwner}`,
          options: custoOption.options.map(option => {
            return {
              label: `Cartão de ${option.type}`,
              value: {transactionTypeID: option.typeId, transactionTypeName: option.transactionTypeName },
              name: 'custo-option',
            }
          })
        }
      })
    }
  },
  methods: {
    onCustoSelected(value) {
      this.$emit('onCustoSelected', value)
    }
  }
}
</script>

<style lang="less" scoped>
  @import "./style.less";
</style>
