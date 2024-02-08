<template>
  <div class="page-emprestimos" id="form-limites" v-if="!controls.loading">
    <!-- <p>Controls: {{controls}}</p> -->
    <!-- <p>Emprestimos: {{$nuxt.$store.state.emprestimos}}</p> -->
    <!-- <p>{{getLoanFormCompleted}}</p> -->
    <!-- <p>{{getLoanFormSigned}}</p> -->
    <!-- <p>{{getLoanFormActive}}</p> -->

    <div v-if="showCCBtoSign">
      <sign-document></sign-document>
    </div>
    <div v-else>
      <div v-if="!getLoanFormActive">

        <div v-if="!controls.showRegistrationForm">
          <div class="row" v-if="(getLoanFormCompleted && getLoanFormSigned) || (!getLoanFormCompleted && !getLoanFormSigned)">
            <div class="col-xs-12">
              <h3>{{text.conhecerLimites}}</h3>
            </div>
            <div class="col-xs-12 form-button">
              <button @click="controls.showRegistrationForm = true">{{text.atualizarCadastro}}</button>
            </div>
          </div>
          <div class="row form-clicksign" v-else>
            <sign-document></sign-document>
          </div>
        </div>

        <div v-if="controls.showRegistrationForm && ((getLoanFormCompleted && getLoanFormSigned) || (!getLoanFormCompleted && !getLoanFormSigned))">
          <div class="row form-pessoa-fisica" v-if="controls.affiliationType == 1">

            <div class="col-xs-12">
              <ficha-pessoa-fisica></ficha-pessoa-fisica>
            </div>

          </div>

          <div class="row form-pessoa-juridica" v-if="controls.affiliationType == 2">

            <div class="col-xs-12">
              <ficha-pessoa-juridica></ficha-pessoa-juridica>
            </div>

          </div>
        </div>

      </div>

      <div v-else>
        <div class="row tabela-limites">
          <lista-limites></lista-limites>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import fichaPessoaFisica from "~/components/emprestimos/fichaCadastral/pessoaFisica.vue";
import fichaPessoaJuridica from "~/components/emprestimos/fichaCadastral/pessoaJuridica.vue";
import listaLimites from "~/components/emprestimos/limites/listaProdutosLimites.vue";
import signDocument from "~/components/emprestimos/signDocument.vue";

export default {
  components: {
    fichaPessoaFisica,
    fichaPessoaJuridica,
    listaLimites,
    signDocument,
  },
  data() {
    return {
      text: {
        conhecerLimites: "Quer conhecer seus limites?",
        atualizarCadastro: "Atualizar cadastro",
      },
      controls: {
        affiliationType: null,
        loading: true,
        showRegistrationForm: false,
        showCCB: false,
      },
      content: {
      },
    };
  },
  created() {
    const self = this;

    self.$axios
      .get(`${process.env.API_AFFILIATE}/affiliates`)
      .then((response) => {
        self.controls.affiliationType = response.data.affiliationTypeID;
        self.controls.loading = false;
      }).catch(err => console.log("Err:", err));


    self.$nuxt.$on("toggleRegistrationForm", (data) => {
      self.controls.showRegistrationForm = data;
    });

    // self.$socket.start({
    //   log: false, // Active only in development for debugging.
    // });
  },
  methods: {
    // exibe valores numéricos no formato de moeda
    showNumberAsCurrency(number) {
      return number.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    },
  },
  computed: {
    getLoanFormCompleted() {
      return $nuxt.$store.state.emprestimos.completed;
    },
    getLoanFormSigned() {
      return $nuxt.$store.state.emprestimos.signed;
    },
    getLoanFormActive() {
      return $nuxt.$store.state.emprestimos.active;
    },
    showCCBtoSign() {
      return $nuxt.$store.state.emprestimos.ccbStatus;
    },
  },
};
</script>

<style lang="less">
@import "~assets/vars.less";
@import "~assets/main.less";

.page-emprestimos {
  .tipo-ficha {
    margin: 10px 20px;
    .tipo-ficha-text {
      text-align: center;

      p, h3 {
        display: inline-block;
        margin: 0;
        color: @color3;
      }

      p {
        font-size: @ftSizeLarge;
      }
      h3 {
        font-size: @ftSizeBig;
      }
    }
  }
  .inline-radio {
    margin: 0;
    margin-right: 10px;
    input {
      margin: 0 5px;
      padding: 0;
    }
    input, span {
      vertical-align: middle;
    }
  }
  .inline-input {
    margin: 0;
    padding: 0;
    span, input {
      display: inline-block;
      vertical-align: super;
    }
    input {
      width: unset;
      height: unset;
      border: none;
      background-color: @color9;
      padding: 0;
      padding-top: 5px;
      margin: 0;
    }
  }
  .ficha-secao {
    table {
      border-collapse: separate;
      width: 100%;
      border-color: @color1;
      border-width: 1px;
      border-style: solid;
      padding: 0;

      thead {
        text-align: left;
        background-color: @color9;
        th {
          padding-left: 8px;
          border-bottom: 1px solid @color1;
        }
      }

      tbody {
        tr {
          td {
            padding: 8px;
            text-align: center;
            border-right: 1px solid @color1;

            &:last-child {
              border-right: none;
            }

            label {
              text-align: left;
              display: block;
            }
          }
        }
      }
    }
  }
  .panel-default {
    .panel-heading{
      background-color:@color5;
      color: @color2;
    }
  }
  .lista-limites {
    padding-top: 16px;
    padding-bottom: 16px;
    .tipo-emprestimo, .limite-emprestimo {
      vertical-align: middle;
      p {
        margin: 0;
        padding: 0;
      }

    }

    .labelLimite{
        position: absolute;
        margin-top: -45px;
      }

    .limite-emprestimo {
        .visualizar-limite {
          width: 100%;
          border-bottom: 8px solid @color10;
          border-radius: 6px;
          position: relative;
          margin: 8px 0;
          .valor-limite {
            position: absolute;
            top: 15px;
            text-align: right;
          }

          .indicador-limite {
            position: absolute;
            top: -6px;
            border-radius: 20px;
            border: 10px solid @color10;
            width: 20px;
            height: 20px;
            box-shadow: 0px 0px 0px 0.5px black;
            .labelBalance{
              position: absolute;
              top: 10px;
              .valor{
                position: relative;
                margin-left: -100%;
              }
            }
          }


        }
    }
    .row{
      padding-top: 40px;
      &:first-child {
        padding-top: 0;
      }
    }
  }
}

</style>
