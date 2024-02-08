<template>
  <section class="services-auto services-auto--simulacao container-fluid services">
    <div id="transacao-passo-1" :class="{'col-xs-12': $mq == 'laptop'}">
            <div id="serviceType" class="panel panel-default">
              <div class="panel-heading" :class="{'disabled': dadosVariaveis.serviceOptionType != false}">
                <span>{{$t('labels.transacao.servico_selecione')}}</span>
              </div>
              <div class="panel-body">
                <ul>
                  <span v-if="historyUrl === '/debitos-veiculares/detran/ipva' && typeof serviceName === 'string' && serviceName.length !== 0">
                    <div v-for="(type, index) in typesOfservices" :key="index">
                      <li  v-if="dadosVariaveis.serviceOptionType == type.serviceId">
                        <label :for="type.id">
                          <input type="radio" name="service" :id="type.serviceId" v-model="dadosVariaveis.serviceOptionType" :value="type.serviceId">
                          {{type.serviceName}}
                        </label>
                      </li>
                    </div>
                  </span>
                  <span v-else>
                    <li v-for="(type, index) in typesOfservices" :key="index">
                      <label :for="type.id">
                        <input type="radio" name="service" :id="type.serviceId" v-model="dadosVariaveis.serviceOptionType" :value="type.serviceId">
                        {{type.serviceName}}
                      </label>
                    </li>
                  </span>

                </ul>
              </div>
            </div>
          </div>
  </section>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {
      dadosVariaveis: {
        serviceOptionType: false,
      },
    };
  },
  mounted() {
    this.finishLoading();
    if (this.historyUrl == "/debitos-veiculares/detran/ipva") {      
      this.dadosVariaveis.serviceOptionType = this.serviceId;
    } else if (this.criouSimulacao) {      
      const type = typeof this.dadosVariaveis.serviceOptionType;
      if(type === 'number'){
        this.dadosVariaveis.serviceOptionType = this.typeOfservice;
      } else {
        this.dadosVariaveis.serviceOptionType =  this.typeOfservice.serviceId;
      } 
    } else {      
      this.externalProductPayment(false);
    }
    
  },
  computed: {

    ...mapState({
      typeOfservice: state => state.transaction.typeOfservice,
      typesOfservices: state => state.transaction.typesOfservices,
      historyUrl: state => state.utils.historyUrl,
      serviceName: state => state.detran.serviceName,
      serviceId: state => state.detran.serviceId,
      criouSimulacao: state => state.criouSimulacao,
    }),
  },
  watch: {
    "dadosVariaveis.serviceOptionType": async function (newValue, oldValue) {
      if (this.dadosVariaveis.serviceOptionType) {
        try {
          this.startLoading();
          const serviceId = typeof this.dadosVariaveis.serviceOptionType === 'number' ? this.dadosVariaveis.serviceOptionType : this.dadosVariaveis.serviceOptionType.serviceId;
          await this.getTransactionTypes({ serviceId: serviceId });
          this.updateTypeOfService(this.dadosVariaveis.serviceOptionType);
          await this.getCardBrands();
          await this.handleSubmit();
          this.finishLoading();
        } catch (error) {
          this.finishLoading();
          console.warn({ error });
          return this.$swal({
            title: "Desculpe",
            text: "Tivemos um problema\n Por favor, tente novamente, se o problema persistir entre em contato com a Listo.",
            icon: "error",
            confirmButtonText: "OK",
            showCloseButton: true,
            customClass: "swal-listo",
          });
        }
      }
    },
  },
  methods: {
    ...mapActions({
      updateTypeOfService: "transaction/updateTypeOfService",
      getTransactionTypes: "transaction/getTransactionTypes",
      getCardBrands: "transaction/getCardBrands",
      getFields: "transaction/getFields",
      updateBtConcluirTransacao: "transaction/updateBtConcluirTransacao",
      updateOpenTransaction: "transaction/updateOpenTransaction",
      clearInstalments: "transaction/clearInstalments",
      externalProductPayment: "externalProductPayment",
    }),
    ...mapMutations(["startLoading", "finishLoading"]),

    async handleSubmit() {
      try {
        const serviceId = typeof this.typeOfservice === 'number' ? this.typeOfservice : this.typeOfservice.serviceId;
        this.startLoading();
        this.updateBtConcluirTransacao(false);
        this.updateOpenTransaction(false);
        await this.getFields(serviceId);
        this.finishLoading();
        this.$emit("onCardBrands");
      } catch (error) {
        this.finishLoading();
        console.warn({ error });
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
#transacao-passo-1 {
  #serviceType,
  #transactionData {
    padding: 0;
  }

  ul {
    list-style-type: none;
    padding-left: 2px;
    margin: 0;
  }
}
.services {
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
.services-auto {
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
