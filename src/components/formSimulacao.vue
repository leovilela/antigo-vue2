<template>
  <div id="formSimulacao" class="container-fluid">
    <form id="form-simular" class="row" v-on:submit.prevent>
      <div class="form-group col-xs-12 col-md-4">
        <label for="value" class="titleLabel">{{valor_a_simular}}</label>
        <Money v-model="number_valor_transacao" v-bind="money" type="text" name="simulation" id="value" class="form-control" :placeholder="placeholder_digite_valor_a_simular" @keyup.enter.stop.prevent></Money>
        <!-- the-mask :mask="['###.###.###-##']" v-model.trim="number_valor_transacao" type="text" name="simulation" id="value" class="form-control" :placeholder="placeholder_digite_valor_a_simular" / -->
        <!-- <label for="client-name">Nome cliente</label>
                <input type="text" name="simulation" id="client-name" class="form-control" placeholder="Digite o nome do cliente"> -->
      </div>
      <div class="form-group col-xs-12 col-md-8">
        <h3 class="form-title">{{tipos_de_transacao}}</h3>
        <fieldset class="col-xs-12 col-sm-5">
          <legend>{{custo_cliente}}</legend>
          <label class="radioLabel col-xs-12" for="client-debit"><input type="radio" name="transaction" id="client-debit" value="client-debit">{{cartao_de_debito}}</label>
          <label class="radioLabel col-xs-12" for="client-credit"><input type="radio" name="transaction" id="client-credit" value="client-credit">{{cartao_de_credito}}</label>
        </fieldset>
        <fieldset class="col-xs-12 col-sm-5 col-sm-offset-1">
          <legend>Custo lojista</legend>
          <label class="radioLabel col-xs-12" for="seller-debit"><input type="radio" name="transaction" id="seller-debit" value="seller-debit">{{cartao_de_debito_custo_lojista}}</label>
          <label class="radioLabel col-xs-12" for="seller-credit"><input type="radio" name="transaction" id="seller-credit" value="seller-credit">{{cartao_de_credito_custo_lojista}}</label>
        </fieldset>
      </div>
      <div id="formSubmit" class="form-group col-xs-12" v-if="!toggleSimulation">
        <fieldset>
          <button id="btnSimular" @click="enviarSimulacao">{{simular}}</button>
        </fieldset>
      </div>
      <div id="simulationResult" class="form-group col-xs-12" v-if="toggleSimulation">
        <div class="row">
          <div class="col-xs-12  col-md-12  col-lg-6">
            <div class="box">
              <ul class="tabs">
                <li class="opcao" v-bind:class="{ ativo: toggleParcela}" @click="ftoggleParcela">{{parcelas}}</li>
                <li class="opcao" v-bind:class="{ ativo: !toggleParcela}" @click="ftoggleParcela">{{transacao}}</li>
              </ul>
              <div class="valores">
                <div class="containervalor">
                  <span class="textovalor">{{valor_a_simular}}:</span>
                  <b class="valor">{{number_valor_transacao}}</b>
                </div>
                <form id="form-parcelas" class="row" v-on:submit.prevent v-if="toggleParcela">
                  <table class="tabelavalores">
                    <thead>
                      <tr>
                        <th>{{opcao_de_parcelamento}}</th>
                        <th>{{valor_da_parcela}}</th>

                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td class="optionValorParcela"><label class="radioLabel col-xs-6" for="1x"><input type="radio" id="1x" name="installment" value="1">1x</label></td>
                        <td class="valorParcela">1.078,00</td>
                      </tr>
                      <tr>
                        <td class="optionValorParcela"><label class="radioLabel col-xs-6" for="2x"><input type="radio" id="2x" name="installment" value="2">2x</label></td>
                        <td class="  valorParcela">1.078,00</td>
                      </tr>
                    </tbody>
                  </table>
                </form>

                <form id="form-parcelas" class="row" v-on:submit.prevent v-if="!toggleParcela">
                  <table class="tabelavalores">
                    <thead>
                      <tr>
                        <th>{{opcao_de_parcelamento}}</th>
                        <th>{{valor_da_parcela}}</th>

                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td class="optionValorParcela ">1x</td>
                        <td class="valorParcela ">1.078,00</td>
                      </tr>
                      <tr>
                        <td class="optionValorParcela">1x</td>
                        <td class="valorParcela">1.078,00</td>
                      </tr>
                      <tr>
                        <td class="optionValorParcela ">1x</td>
                        <td class="valorParcela ">1.078,00</td>
                      </tr>
                      <tr>
                        <td class="optionValorParcela">1x</td>
                        <td class="valorParcela">1.078,00</td>
                      </tr>
                      <tr>
                        <td class="optionValorParcela ">1x</td>
                        <td class="valorParcela ">1.078,00</td>
                      </tr>
                      <tr>
                        <td class="optionValorParcela">1x</td>
                        <td class="valorParcela">1.078,00</td>
                      </tr>
                      <tr>
                        <td class="optionValorParcela ">1x</td>
                        <td class="valorParcela ">1.078,00</td>
                      </tr>
                      <tr>
                        <td class="optionValorParcela">1x</td>
                        <td class="valorParcela">1.078,00</td>
                      </tr>
                      <tr>
                        <td class="optionValorParcela ">1x</td>
                        <td class="valorParcela ">1.078,00</td>
                      </tr>
                      <tr>
                        <td class="optionValorParcela">1x</td>
                        <td class="valorParcela">1.078,00</td>
                      </tr>
                      <tr>
                        <td class="optionValorParcela ">1x</td>
                        <td class="valorParcela ">1.078,00</td>
                      </tr>
                      <tr>
                        <td class="optionValorParcela">1x</td>
                        <td class="valorParcela">1.078,00</td>
                      </tr>
                      <tr>
                        <td class="optionValorParcela ">1x</td>
                        <td class="valorParcela ">1.078,00</td>
                      </tr>
                      <tr>
                        <td class="optionValorParcela">1x</td>
                        <td class="valorParcela">1.078,00</td>
                      </tr>
                      <tr>
                        <td class="optionValorParcela ">1x</td>
                        <td class="valorParcela ">1.078,00</td>
                      </tr>
                      <tr>
                        <td class="optionValorParcela">1x</td>
                        <td class="valorParcela">1.078,00</td>
                      </tr>
                    </tbody>
                  </table>
                </form>
              </div>

            </div>
          </div>
          <div class="col-xs-12 col-md-12 col-lg-6">
            <div class="box pad10">
              <p class="title24Normal"> {{agora_pode_enviar}}</p>
              <p class="subtitle">{{agora_pode_enviar_subtitulo}}</p>
              <h3 class="titleSubSection">{{enviar_simulacao}}</h3>
              <form id="formEnviarSimulacao" @submit.prevent="submit">

                <div>
                  <div class="form-group" :class="{ 'form-group--error': $v.email.$error }">
                    <label class="form__label">E-mail</label>
                    <input :placeholder="placeholder_digite_email" id="email" type="text" class="form__input" v-model.trim="$v.email.$model" />
                    <button type="submit" :disabled="submitStatus === 'PENDENTE'" class="enviar">{{botao_enviar}}</button>
                  </div>

                  <div class="error" v-if="!$v.email.required">{{email_obrigatorio}}</div>

                  <div class="form-group">
                    <label class="form__label">WhatsApp</label>
                    <button type="submit" :disabled="submitStatus === 'PENDENTE'" class="whatsApp">
                      <div class="ico"></div><span>WhatsApp</span>
                    </button>
                  </div>

                  <!--tree-view :data="$v" :options="{rootObjectKey: '$v', maxDepth: 2}"></tree-view-->
                </div>

              </form>
            </div>

          </div>
        </div>

        <div class="row" id="buttons">
          <div class="col-md-12 col-lg-6 col-lg-offset-6">
            <p class="btn-paragraph"><button id="btnFazerTransacao" @click.prevent="enviarSimulacao">{{fazer_transacao}}</button></p>
            <p class="btn-paragraph"><button id="btnNovaSimulacao" @click.prevent="enviarSimulacao">{{nova_simulacao}}</button></p>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<style lang="less" scoped>
@import "~assets/vars.less";
@import "~assets/variables.less";
#formSimulacao {
  #formEnviarSimulacao {
    // label {
    //   display: block;
    //   font-size: @ftSizeNormal !important;
    //   font-family: @mainFontRegular !important;
    // }
    .enviar {
      background-color: rgba(5, 181, 46, 0.116);
      color: @color11;
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
      border: solid 1px @color11;
      display: inline-block;
      margin: 0 auto;
      padding: 13px;
      width: 27%;
      font-family: @mainFontLight;
      font-size: @ftSizeLarge;

      text-decoration: none;
      @media (max-width: @screen-xs-max) {
      }
      @media (min-width: @screen-sm-min) {
      }
      @media (min-width: @screen-md-min) {
      }
      @media (min-width: @screen-lg-min) {
      }
    }

    .whatsApp {
      background-color: rgba(5, 181, 46, 0.116);
      color: @color11;
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
      border: solid 1px @color11;
      display: inline-block;
      margin: 0 auto;
      padding: 7px;
      vertical-align: middle;
      width: 100%;
      font-family: @mainFontLight;
      font-size: @ftSizeLarge;
      text-decoration: none;
      @media (max-width: @screen-xs-max) {
      }
      @media (min-width: @screen-sm-min) {
      }
      @media (min-width: @screen-md-min) {
      }
      @media (min-width: @screen-lg-min) {
      }
      .ico {
        background: transparent url("~assets/img/ico-whatsapp.png") no-repeat
          scroll 0px 7px;
        background-size: contain;
        display: inline-block;
        width: 30px;
        height: 38px;
      }
      span {
        margin-top: -10px;
        display: inline-block;
        position: relative;
        bottom: 7px;
        margin-left: 10px;
      }
    }
  }

  // label {
  //   font-family: @mainFont;
  //   font-size: @ftSizeTiny;
  //   &.titleLabel {
  //     font-size: @ftSizeLarge;
  //   }

  //   &:hover {
  //     cursor: pointer;
  //   }

  //   &.radioLabel {
  //     font-family: @mainFontLight;
  //     position: relative;
  //     user-select: none;
  //     font-weight: normal;

  //     &:after {
  //       content: "";
  //       user-select: none;
  //       position: absolute;
  //       top: 3px;
  //       left: -12px;
  //       width: 20px;
  //       height: 20px;
  //       border: 1px solid @color11;
  //       border-radius: 100%;
  //       background: white;
  //     }
  //   }
  // }
  input {
    margin: 5px 0;
    font-family: @mainFontLight;

    // &[type="radio"] {
    //   position: relative;
    //   right: 10px;
    //   margin-left: -15px;
    //   user-select: none;

    //   &:checked {
    //     &:before {
    //       content: "";
    //       position: absolute;
    //       top: -2px;
    //       left: -2px;
    //       width: 100%;
    //       height: 100%;
    //       border: 10px solid #05b52e;
    //       border-radius: 100%;
    //       z-index: 1;
    //       user-select: none;
    //     }
    //   }
    // }
  }
  // fieldset {
  //   // margin: 0;
  //   padding: 0;

  //   label {
  //     margin-left: 15px;
  //   }

  //   legend {
  //     font-size: @ftSizeNormal;
  //     font-family: @mainFont;
  //   }

  //   @media (max-width: @screen-xs-max) {
  //     margin-bottom: 10px;
  //   }
  //   @media (min-width: @screen-sm-min) {
  //   }
  //   @media (min-width: @screen-md-min) {
  //   }
  //   @media (min-width: @screen-lg-min) {
  //   }
  // }
  .form-title {
    margin: 0;
    margin-bottom: 10px;
    font-family: @mainFont;
    font-size: @ftSizeLarge;
  }

  .btn-paragraph {
    text-align: right;
    margin: 5px 0;
  }

  #btnSimular,
  #btnNovaSimulacao,
  #btnFazerTransacao {
    font-family: @mainFont;
    font-size: @ftSizeLarge;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 4px 6px 0 rgba(191, 191, 191, 0.4);
  }

  #btnSimular {
    // definir largura do botão Simular
    @media (max-width: @screen-xs-max) {
      width: 100%;
    }
    @media (min-width: @screen-sm-min) {
      width: 100%;
    }
    @media (min-width: @screen-md-min) {
      width: 50%;
      min-width: 300px;
    }
    @media (min-width: @screen-lg-min) {
      width: 300px;
    }
  }

  #btnFazerTransacao,
  #btnNovaSimulacao {
    // definir largura dos botões Fazer Transacao e Nova Simulacao
    width: 100%;
  }

  #btnSimular,
  #btnFazerTransacao {
    background-color: @color11;
    color: @color2;
    border: none;
  }

  #btnNovaSimulacao {
    background-color: @color2;
    color: @color11;
    border: 1px solid @color11;
  }
  #formSubmit {
    text-align: right;
    border-top: 1px solid @color14;
    padding-top: 10px;
  }

  #simulationResult {
    border-top: 1px solid @color14;
    padding-top: 10px;
    .box {
      border: 1px solid @color20;
      padding-bottom: 10px;
      &:first-child {
        margin-bottom: 10px;
      }
      &.pad10 {
        padding: 10px;
      }
      .title24Normal {
        font-size: @ftSizeLarge;
      }
      .subtitle {
        font-size: @ftSizeNormal;
        color: @color10;
      }
      .titleSubSection {
        font-family: @mainFontBold;
        font-size: @ftSizeExtraLarge;
      }
      .tabs {
        display: block;
        width: 100%;
        border-bottom: 1px solid @color20;
        padding: 0;
        margin: 0;

        .opcao {
          font-family: @mainFont;
          display: inline-block;
          text-align: center;
          font-size: @ftSizeLarge;
          padding: 15px 0;
          cursor: pointer;
          width: 50%;
          &.ativo {
            color: @color20;
            background: #16233e;
          }
        }
      }
      .valores {
        padding: 0 25px;

        .containervalor {
          display: table;
          padding: 20px;
          width: 100%;
          overflow: hidden;
          border-bottom: 1px solid @color20;

          .textovalor {
            display: table-cell;
            font-family: @mainFont;
            font-size: @ftSizeNormal;
            width: 50%;
          }
          .valor {
            display: table-cell;
            font-size: @ftSizeExtraLarge;
            color: @color11;
            font-family: @mainFontBold;
            width: 50%;
            text-align: right;
            overflow: hidden;
          }
        }
        .tabelavalores {
          width: 100%;
          thead {
            th {
              font-size: 15px;
              font-family: @mainFontBold;
              padding: 18px 0;
            }
          }
          tbody {
            tr {
              .optionValorParcela {
                padding: 15px;

                font-family: @mainFont;
                font-size: @ftSizeLarge;
              }
              .valorParcela {
                padding: 15px;
                font-family: @mainFont;
                font-size: @ftSizeLarge;
              }

              &:nth-child(even) {
                background-color: @color20;
              }

              &:last-child:nth-child(odd) {
                border-bottom: 1px solid @color14;
              }
            }
          }
        }
      }

      @media (min-width: @screen-sm-min) {
        margin-bottom: 15px;
      }

      @media (min-width: @screen-lg-min) {
        margin-bottom: initial;
      }
    }

    // label {
    //   font-family: @mainFont;
    //   font-size: @ftSizeTiny;
    //   &.titleLabel {
    //     font-size: @ftSizeLarge;
    //   }

    //   &:hover {
    //     cursor: pointer;
    //   }

    //   &.radioLabel {
    //     font-family: @mainFontLight;
    //     position: relative;
    //     user-select: none;
    //     font-weight: normal;

    //     &:after {
    //       content: "";
    //       user-select: none;
    //       position: absolute;
    //       top: 3px;
    //       left: -3px;
    //       width: 20px;
    //       height: 20px;
    //       border: 1px solid @color11;
    //       border-radius: 100%;
    //       background: white;
    //     }
    //   }
    // }
    // input {
    //   margin: 5px 0;
    //   font-family: @mainFontLight;

    //   &[type="radio"] {
    //     position: relative;
    //     right: 10px;
    //     margin-left: 0px;
    //     user-select: none;

    //     &:checked {
    //       &:before {
    //         content: "";
    //         position: absolute;
    //         top: -2px;
    //         left: -8px;
    //         width: 100%;
    //         height: 100%;
    //         border: 10px solid #05b52e;
    //         border-radius: 100%;
    //         z-index: 1;
    //         user-select: none;
    //       }
    //     }
    //   }
    // }

    #buttons {
      text-align: right;
      position: relative;
      padding-top: 10px;
      margin-top: 5px;

      div:first-of-type {
        &:before {
          content: "";
          width: calc(100% - 30px);
          border-top: 1px solid @color14;
          position: absolute;
          left: 15px;

          @media (min-width: @screen-sm-min) {
            top: -15px;
          }
          @media (min-width: @screen-md-min) {
            top: -10px;
          }
        }
      }
    }
  }
}
</style>

<script>
import { Money } from "v-money";
import { email, required } from "vuelidate/lib/validators";

export default {
  components: { Money },
  validations: {
    email: {
      email,
      required,
    },
  },
  methods: {
    enviarSimulacao() {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      this.toggleSimulation = !this.toggleSimulation;
    },
    ftoggleParcela() {
      this.toggleParcela = !this.toggleParcela;
    },
    submit() {
      const self = this;
      // console.log("enviado!");
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        // do your submit logic here
        self.submitStatus = "PENDENTE";
        setTimeout(() => {
          self.submitStatus = "OK";
        }, 500);
      }
    },
  },
  data() {
    return {
      submitStatus: null,
      email: "",
      toggleSimulation: false,
      toggleParcela: true,
      number_valor_transacao: 0.0,
      valor_a_simular: "Valor a simular",
      placeholder_digite_valor_a_simular: "Digite o valor a simular",
      tipos_de_transacao: "Tipos de transação",
      custo_cliente: "Custo cliente",
      cartao_de_debito: "Cartão de débito",
      cartao_de_credito: "Cartão de crédito",
      cartao_de_debito_custo_lojista: "Cartão de débito custo lojista",
      cartao_de_credito_custo_lojista: "Cartão de crédito custo lojista",
      simulacao_de_pagamento: "Simulação de Pagamento",
      parcelas: "Parcelas",
      transacao: "Transação",
      opcao_de_parcelamento: "Opção de parcelamento",
      valor_da_parcela: "Valor da Parcela",
      imprimir: "Imprimir",
      nova_simulacao: "Nova Simulação",
      fazer_transacao: "Fazer Transação",
      simular: "Simular",
      icone_imprimir: "Imprimir",
      agora_pode_enviar:
        "Agora você já pode enviar a simulação para seu cliente de forma rápida.",
      agora_pode_enviar_subtitulo:
        "Officia aliquip consectetur consequat minim. Dolore commodo proident non dolore velit labore. Amet ipsum anim dolor velit sint dolore excepteur exercitation magna do deserunt dolor consectetur. Aliqua duis laboris id cillum cillum officia cupidatat ut officia laboris tempor nulla. Pariatur veniam nulla amet duis cupidatat.",
      enviar_simulacao: "Enviar simulação",
      placeholder_digite_email: "Digite o e-mail",
      email_obrigatorio: "E-mail é obrigatório.",
      botao_enviar: "Enviar",
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        suffix: " ",
        precision: 2,
        masked: true,
      },
    };
  },
};
</script>
