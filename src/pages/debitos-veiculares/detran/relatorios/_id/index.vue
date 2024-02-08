<template>
  <section class="page-financiamentos-auto page-financiamentos-auto--simulacao container-fluid">
    <div class="row">
      <div id="details" class="col-xs-12">
        <div class="panel panel-default">
          <div class="panel-heading">
            <span>{{$t('titles.detalhesTransacao')}}</span>
          </div>
          <div class="panel-body">
            <div class="row">
              <div class="col-xs-7">
                <ul class="cliente-veiculo">
                  <li><p>CPF: {{ reportsFinancingDetails.cpf }}</p></li>
                  <li><p>CPF: {{ reportsFinancingDetails.cpf }}</p></li>
                  <li><p>CCB: {{ reportsFinancingDetails.contractId }}</p></li>
                  <li><p>Nome: {{ reportsFinancingDetails.name }}</p></li>
                  <li><p>E-mail: {{ reportsFinancingDetails.mail }}</p></li>
                  <li><p>Celular: {{ reportsFinancingDetails.cellphone }}</p></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Base-Button @click="goBack()" class="btn-voltar">Voltar ao início</Base-Button>
    <Base-FotosVeiculoModal :active="modals.fotos" @close="modals.fotos = false" :isNewCar="isNewCar" :documentNumber="documentNumber" />
  </section>
</template>

<script>
import {
  mapState, mapActions, mapMutations, mapGetters,
} from "vuex";

export default {
  name: "app",
  data() {
    return {
      modals: {
        fotos: false,
      },
    };
  },
  methods: {
    ...mapActions({
      getReportFinancingDetails: "simulacao/relatorio/getReportFinancingDetails",
      getStatusLoan: "simulacao/relatorio/getStatusLoan",
    }),
    async loadReportFinancingDetails() {
      try {
        const contractId = this.clientID(parseInt(this.$route.params.id, 10));
        await this.getReportFinancingDetails(contractId.contractID);
      } catch (error) {
        console.log({ error });
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
    async loadStatusLoan() {
      try {
        await this.getStatusLoan(this.$route.params.id);
      } catch (error) {
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
    goBack() {
      this.$router.push("/financiamentos/auto/relatorio");
    },
    pushNotification() {
      alert("Solicitar assinatura do contrato ao cliente.");
    },
  },
  mounted() {
    this.loadReportFinancingDetails();
    this.loadStatusLoan();
  },
  computed: {
    ...mapGetters({
      clientID: "simulacao/relatorio/clientID",
    }),
    ...mapState({
      reportsFinancingDetails: state => state.simulacao.relatorio.reportsFinancingDetails,
      statusLoan: state => state.simulacao.relatorio.statusLoan,
    }),
    isNewCar() {
      return this.reportsFinancingDetails.isZeroKm;
    },
    documentNumber() {
      return this.reportsFinancingDetails.cpf;
    },
  },
};
</script>

<style lang="less" scoped>
@import "~assets/vars.less";
@import "vue2-dropzone/dist/vue2Dropzone.min.css";


.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
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
.page-financiamentos-auto {
  padding-top: 32px;
}
button {
  background: @color1;
  color: @color7;
  text-transform: uppercase;
}
ul{
  list-style-type: none;
  padding: 0;
}
.cliente-veiculo {
  h3 {
    font-family: 'newjuneregular';
    font-size: @ftSizeNormal;
    color: @color1;
    margin: 8px 0 10px 0;
  }
  p {
    font-family: 'newjuneregular';
    font-size: @ftSizeNormal;
    color: @color1;
    line-height: 22px;
    margin: 0;
    padding: 0;
  }
}
.box-gray {
  background: @color15;
  margin-top: 20px;
  padding: 10px 15px;
  text-align: center;
  h3 {
    font-family: 'newjunebold';
    font-size: @ftSizeNormal;
    color: @color1;
    margin: 8px 0 10px 0;
  }
  p {
    font-family: 'newjuneregular';
    font-size: @ftSizeNormal;
    color: @color1;
    text-align: center;
    padding: 0
  }
  .btn-carregar {
    width: auto;
    font-family: 'newjunebold';
    font-size: @ftSizeNormal;
    color: @color7;
    background: @color1;
    text-transform: uppercase;
    padding: 5px 30px;
  }
  .btn-enviar {
    width: auto;
    font-family: 'newjunebold';
    font-size: @ftSizeNormal;
    color: @color7;
    background: @color1;
    text-transform: uppercase;
    padding: 5px 44px;
  }
}
.btn-voltar {
  width: auto;
  font-family: 'newjunebold';
  font-size: @ftSizeNormal;
  color: @color7;
  background: @color1;
  text-transform: uppercase;
  margin: 0 auto;
  padding: 5px 44px;
  justify-content: center;
  display: flex;
}
</style>
