<template>
  <div class="base-new-cardbrands">
    <div class="base-new-cardbrands_title">{{$t('labels.transacao.bandeiras_cartoes')}}</div>
    <ul class="base-new-cardbrands_list">
        <li class="base-new-cardbrands_item" v-for="(cartao, index) in cardBrandsTransaction" :key="index">
            <label :for="cartao.id">
                <Base-Radio
                  name="cardtransaction"
                  isInline
                  :id="cartao.id"
                  :nativeValue="cartao.id"
                  :disabled="cartao.disabled"
                  :value="cartao_escolhido"
                  @input="onSelectedCardbrands"
                />
                <div class="base-new-cardbrands_imagem" :style="cartao.styles"></div>
            </label>
        </li>
    </ul>
  </div>
</template>

<script>
import { convertString } from "~/utils/string.utils";


export default {
  data() {
    return {
      dadosVariaveis: {
        serviceOptionType: false,
      },
      cartao_escolhido: null,
    };
  },

  props: {
      cardBrandsTransactions: {
          type: Array,
          required: true
      },
  },
  computed: {
    cardBrandsTransaction() {
      return this.cardBrandsTransactions.map(cardBrand => ({
        ...cardBrand,
        styles: {
          backgroundImage: `url(../img/bandeira-${convertString(cardBrand.name).toLowerCase()}.png)`,
        },
      }));
    },
  },
  methods: {
    resetCardbrand() {
      this.cartao_escolhido = null
    },
    onSelectedCardbrands(installment) {
      this.$emit("onSelectedCardbrands", installment)
    }
  },

};
</script>

<style lang="less" scoped>
@import "./style.less";
</style>
