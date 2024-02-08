<template>
  <section class="cardbrands-auto cardbrands-auto--simulacao container-fluid cardbrands">
    <div id="transacao-passo-2">
            <div id="cardbrand-list" class="panel panel-default">
              <div class="panel-heading">
                <span>{{$t('labels.transacao.bandeiras_cartoes')}}</span>
              </div>
              <ul id="cardbrand-panel" class="panel-body row">
                <li class="cardbrand-selector col-xs-6" v-for="(cartao, index) in cardBrandsTransaction" :key="index">
                  <label :for="cartao.id">
                    <input type="radio" name="cardtransaction" v-model="cartao_escolhido" :value="cartao.id" :id="cartao.id">
                    <div class="cardbrand-img" :style="cartao.styles"></div>
                  </label>
                </li>
              </ul>
            </div>
          </div>
  </section>
</template>

<script>
/* eslint-disable func-names */
import { mapState, mapActions, mapMutations } from "vuex";
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
  computed: {
    cardBrandsTransaction() {
      return this.cardBrands.map(cardBrand => ({
        ...cardBrand,
        styles: {
          backgroundImage: `url(../img/bandeira-${convertString(cardBrand.name).toLowerCase()}.png)`,
        },
      }));
    },
    ...mapState({
      cardBrands: state => state.transaction.cardBrands,
      transactionTypes: state => state.transaction.transactionTypes,
      typeOfservice: state => state.transaction.typeOfservice,
    }),
  },
  watch: {
    cartao_escolhido(oldValue, newValue) {
      this.selectedCard(oldValue);
      this.handleSubmit();
    },
  },
  methods: {
    ...mapActions({
      selectedCard: "transaction/selectedCard",
    }),
    ...mapMutations(["startLoading", "finishLoading"]),

    handleSubmit() {
      try {
        this.$emit("onFields");
      } catch (error) {
        console.warn("error");
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
#cardbrand-panel{
      list-style-type: none;
      padding-left: 20px;
      .cardbrand-selector{
        .cardbrand-img{
          background-repeat: no-repeat;
          background-size: contain;
          background-position: 50% 50%;
          height: 60px;
          width: 60px;
          display: inline-block;
          vertical-align: middle;
      }
  }
}
.cardbrands {
  position: relative;
  .panel {
    &-default {
      .panel-heading {
        background-color: @color1;
        color: @color2;
        justify-content: space-between;
        display: flex;
      }
    }
  }
}
.cardbrands-auto {
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
