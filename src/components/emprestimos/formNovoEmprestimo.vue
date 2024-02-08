<template>
  <div id="formSimulacaoEmprestimo" class="container-fluid">
    <form id="form-SimulacaoEmprestimo" class="row" v-on:submit.prevent v-if="!controls.showCCB">
      <div class="col-xs-12 col-md-2 col-lg-3">
        <div class="row">
          <div id="SimulacaoEmprestimo-passo-1" :class="{'col-xs-12': $mq == 'laptop'}">
            <div id="serviceType" class="panel panel-default">
              <div class="panel-heading" :class="{'disabled': dadosVariaveis.serviceOptionType != false}">
                <span>{{text.servico_selecione}}</span>
              </div>
              <div class="panel-body">
                <ul>
                  <li v-for="(type, index) in serviceTypesList" :key="index">
                    <label :for="type.id">
                      <input type="radio" name="service" :id="type.serviceId" v-model="dadosVariaveis.serviceOptionType" :value="type.serviceId" @change.stop="[statusSimulacaoEmprestimo = 2, cardBrands(), getServiceTypeLimits(type.serviceId)]">
                      {{type.serviceName}}
                    </label>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div id="SimulacaoEmprestimo-passo-2" :class="{'col-xs-12': $mq == 'laptop'}">
            <div id="cardbrand-list" v-show="statusSimulacaoEmprestimo >= 2" class="panel panel-default">
              <div class="panel-heading" :class="{'disabled': statusSimulacaoEmprestimo > 2}">
                <span>{{ text.labels_bandeiras_cartoes }}</span>
              </div>
              <ul id="cardbrand-panel" class="panel-body row">
                <li class="cardbrand-selector col-xs-6" v-for="(cartao, index) in bandeiras_cartoes" :key="index">
                  <label :for="cartao.id">
                    <input type="radio" name="cardtransaction" v-model="cartao_escolhido" :value="cartao.id" :id="cartao.id" @change.stop="fieldsOfServices">
                    <div class="cardbrand-img" :style="{backgroundImage:`url(/img/bandeira-${deburr(cartao.name).toLowerCase()}.png)`}"></div>
                  </label>
                </li>
              </ul>
            </div>
            <!-- <button class="btnEditServiceType" v-show="statusSimulacaoEmprestimo == 2" @click="statusSimulacaoEmprestimo = 1">{{text.servico_voltar}}</button> -->
          </div>
        </div>
      </div>

      <div class="col-xs-12 col-md-10 col-lg-9">
        <div class="row">
          <div id="SimulacaoEmprestimo-passo-3" class="col-xs-12 col-md-7" v-show="dadosVariaveis.serviceOptionType != false && statusSimulacaoEmprestimo >= 3">
            <div id="transactionData" class="panel panel-default">
              <div class="panel-heading" :class="{'disabled': statusSimulacaoEmprestimo != 3}">
                <span>{{ text.dados_SimulacaoEmprestimo }}</span>
              </div>
              <div class="panel-body">

                <div class="row form-group">
                  <!-- <code>{{fieldsOfServicesInputs}}</code> -->
                  <div class="col-xs-12 col-sm-6 col-md-6" :class="{'form-group-error': validClientDocument != 0 && validClientDocument != 1, 'form-invalid': !dadosVariaveis.dadosSimulacaoEmprestimo[field.fieldKey]} && controls.loading" v-for="(field, index) in fieldsOfServicesInputs" :key="index">
                    <!-- <code>{{field}}</code> -->
                    <label :for="field.fieldKey" :class="{'form-invalid': field.typeContent !== 'Text' && $v.dadosVariaveis.number_valor_SimulacaoEmprestimo.$invalid}">{{ field.label }}</label>

                    <fieldset v-if="field.typeContent !== 'Text'" :class="{'form-invalid': $v.dadosVariaveis.number_valor_SimulacaoEmprestimo.$invalid }">
                      <!-- <p>{{$v.dadosVariaveis.number_valor_SimulacaoEmprestimo}}</p> -->
                      <Money v-bind="money" type="text" :field-key="field.fieldKey" name="currency" :id="field.fieldKey" :placeholder="field.placeholder" v-model="dadosVariaveis.dadosSimulacaoEmprestimo[field.fieldKey]"></Money>
                    </fieldset>

                    <fieldset v-if="field.typeContent === 'Text' && field.fieldKeyTypeID === 4">
                      <Money v-bind="money" type="text" :field-key="field.fieldKey" name="currency" :id="field.fieldKey" :placeholder="field.placeholder" v-model="dadosVariaveis.dadosSimulacaoEmprestimo[field.fieldKey]"></Money>
                    </fieldset>

                    <!-- CPF/CNPJ -->
                    <fieldset v-if="field.typeContent === 'Text' && field.fieldKeyTypeID === 21">
                      <the-mask :mask="['###.###.###-##', '##.###.###/####-##']" :placeholder="field.placeholder" :id="field.fieldKey" type="text" class="form__input" v-model.trim="dadosVariaveis.dadosSimulacaoEmprestimo[field.fieldKey]" :disabled="true"/>
                    </fieldset>

                    <!-- CEP -->
                    <fieldset v-if="field.typeContent == 'Text' && field.fieldKeyTypeID == 16">
                      <the-mask :mask="'#####-###'" :placeholder="field.placeholder" v-model.trim="dadosVariaveis.dadosSimulacaoEmprestimo[field.fieldKey]" :id="field.fieldKey" type="text" class="form__input" :disabled="true"></the-mask>
                    </fieldset>

                    <!-- DADA NASCIMENTO -->
                    <fieldset v-if="field.typeContent == 'Text' && field.fieldKeyTypeID == 50">
                      <!-- <p>{{new Date(dadosVariaveis.dadosSimulacaoEmprestimo[field.fieldKey])}}</p> -->
                      <input type="text" v-model="dadosVariaveis.dadosSimulacaoEmprestimo[field.fieldKey]" disabled>
                      <!-- <date-picker :lang="'pt-br'" :format="'DD/MM/YYYY'" v-mask="'##/##/####'" v-model="dadosVariaveis.dadosSimulacaoEmprestimo[field.fieldKey]" :id="field.fieldKey" :disabled="true" class="form__input"></date-picker> -->

                    </fieldset>

                    <!-- TELEFONE -->
                    <fieldset v-if="field.typeContent == 'Text' && field.fieldKeyTypeID == 40">
                      <the-mask :mask="['(##) #####-####', '(##) ####-####']" :placeholder="field.placeholder" v-model.trim="dadosVariaveis.dadosSimulacaoEmprestimo[field.fieldKey]" :id="field.fieldKey" :disabled="true" type="text" class="form__input"></the-mask>
                    </fieldset>

                    <fieldset v-if="field.typeContent === 'Text' && (field.fieldKeyTypeID !== 21 && field.fieldKeyTypeID !== 4) && (field.fieldKeyTypeID !== 16 && field.fieldKeyTypeID !== 40) && (field.fieldKeyTypeID !== 50)">
                      <div v-if="field.fieldKeyTypeID === 32 || field.fieldKeyTypeID ===  33 || field.fieldKeyTypeID === 34 || field.fieldKeyTypeID === 47 || field.fieldKeyTypeID === 48">
                        <input :placeholder="field.placeholder" :id="field.fieldKey" type="text" class="form__input" v-mask="customTokens" v-model.trim="dadosVariaveis.dadosSimulacaoEmprestimo[field.fieldKey]" :disabled="true">
                      </div>
                      <div v-else>
                        <input :placeholder="field.placeholder" name="others" :id="field.fieldKey" :field-key="field.fieldKey" :type="field.typeContent == 'Text' ? 'text' : 'number'" v-model="dadosVariaveis.dadosSimulacaoEmprestimo[field.fieldKey]">
                      </div>
                    </fieldset>


                      <!-- <fieldset v-if="field.typeContent === 'Text' && field.fieldKeyTypeID !== 21 && (field.fieldKeyTypeID === 32 || field.fieldKeyTypeID ===  33 || field.fieldKeyTypeID === 34 || field.fieldKeyTypeID === 47 || field.fieldKeyTypeID === 48)">
                      </fieldset> -->

                  </div>
                </div>

                <div class="row" v-show="!controls.loading">
                  <div class="col-xs-12" :class="{'form-no-edit': !requiredFieldKeys}">
                    <fieldset v-for="(custo, index) in transactionType" :key="index" class="col-xs-6" v-if="custo.enabled">
                      <legend>{{custo.label}}</legend>
                      <div v-for="(tipoSimulacaoEmprestimo, index) in custo.opcoes" :key="index" v-if="tipoSimulacaoEmprestimo.enabled">
                        <label class="" :for="tipoSimulacaoEmprestimo.id">
                          <!-- <input @change.stop="getCoefficients" type="radio" name="transaction" checked v-model="dadosVariaveis.transactionTypeID" :id="tipoSimulacaoEmprestimo.id" :value="tipoSimulacaoEmprestimo.value"> -->
                          <input type="radio" name="transaction" checked v-model="dadosVariaveis.transactionTypeID" :id="tipoSimulacaoEmprestimo.id" :value="tipoSimulacaoEmprestimo.value">
                          <span>{{tipoSimulacaoEmprestimo.label}}</span></label>
                      </div>
                    </fieldset>
                  </div>
                </div>

              </div>
            </div>
            <!-- <div class="row">
              <div class="form-button pull-right col-xs-12 col-sm-6" v-show="statusSimulacaoEmprestimo < 4">
                <button class="btnEditServiceType" @click.stop="getCoefficients">{{text.continuar}}</button>
              </div>
            </div> -->
          </div>

          <div id="SimulacaoEmprestimo-passo-4" class="col-xs-12 col-md-5" v-show="statusSimulacaoEmprestimo >= 4" >
            <div id="transaction-value" class="panel panel-default" :class="{'disabled': statusSimulacaoEmprestimo > 4}">
              <div class="panel-heading">
                <span>{{ text.valores }}</span>
              </div>
              <div class="panel-body">
                <!-- <Money :value="dadosVariaveis.number_valor_SimulacaoEmprestimo" v-bind="money" type="text" name="simulation" id="value" :placeholder="text.placeholder_digite_valor_a_simular" disabled></Money>
                <ul class="tabrow" v-show="listaRetornos.length > 1 && number_valor_SimulacaoEmprestimo > 0 ">
                  <li class="opcao" v-bind:class="{ ativo: toggleParcela}" @click="ftoggleParcela">{{text.parcelas}}</li>
                  <li class="opcao" v-bind:class="{ ativo: !toggleParcela}" @click="ftoggleParcela">{{text.SimulacaoEmprestimo}}</li>
                </ul>

                <ul class="tabrow tabrowRetorno col-xs-12 " v-show="listaRetornos.length > 1 && number_valor_SimulacaoEmprestimo > 0 && !toggleParcela">
                  <li class="opcao" @click="ftoggleRetornoLimpa($event)" v-for="(retorno, index) in listaRetornos" :key="index" :value="retorno" :id="retorno" :class="{ativo: retorno == dadosVariaveis.retornoAtivo}">R{{retorno}}</li>
                </ul> -->

                <form id="form-parcelas" class="col-xs-12 no-padding form-group" v-on:submit.prevent v-show="(!controls.loading && parcelasSimulacao.options.length > 0) && number_valor_SimulacaoEmprestimo > 0">
                  <table class="tabelavalores">

                    <thead>
                      <th>&nbsp;</th>
                      <th>{{text.title_valor_parcela}}</th>
                      <th>{{text.title_taxa}}</th>
                      <th>{{text.title_valor_total_liberado}}</th>
                    </thead>

                    <tbody>
                        <tr v-for="(parcela, index) in parcelasSimulacao.options" :key="index">

                          <td class="optionValorParcela"><label><input type="radio" name="installment" v-model="parcelaSelecionada"
                            @change.stop="showVariables(parcela)" :value="parcela.parcela">
                            <span v-if="dadosVariaveis.transactionTypeID == 1 || dadosVariaveis.transactionTypeID == 8">{{text.parcela_unica}}</span>
                            <span v-else>{{parcela.parcela}}x</span>
                            </label>
                          </td>

                          <td>{{showNumberAsCurrency(Number(parcela.ParcelaComCoeficiente.toFixed(2)))}}</td>
                          <td>{{showNumberAsCurrency((Number(parcela.liberadoComCoeficiente.toFixed(2)) - Number(parcela.totalParcelas.toFixed(2))) * -1)}}</td>
                          <td>{{showNumberAsCurrency(Number(parcela.liberadoComCoeficiente.toFixed(2)) + ((Number(parcela.liberadoComCoeficiente.toFixed(2)) - Number(parcela.totalParcelas.toFixed(2))) * -1))}}</td>

                        </tr>
                      </tbody>
                  </table>
                </form>

                <div v-show="statusSimulacaoEmprestimo == 4 && number_valor_SimulacaoEmprestimo > valor_minimo"  >
                  <!-- <p>dadosVariaveis.selectedInstallment: {{dadosVariaveis.selectedInstallment}}</p>
                  <p>requiredFieldKeys {{requiredFieldKeys}}</p>
                  <p>btConcluirSimulacaoEmprestimo {{btConcluirSimulacaoEmprestimo}}</p>
                  <p></p> -->
                  <button class="btnEditServiceType finishButton" type="submit" @click="enviarDadosSimulacaoEmprestimo" :disabled="dadosVariaveis.selectedInstallment == null || !requiredFieldKeys || btConcluirSimulacaoEmprestimo">{{text.concluir_SimulacaoEmprestimo}}</button>
                  <div class="alert alert-warning" v-if="dadosVariaveis.selectedInstallment == null">{{text.alerta_selecionar_parcela}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>

    <div v-else>
      <sign-document></sign-document>
    </div>
    <div id="loadImage" v-show="controls.loading">
      <img src="~assets/img/loading.gif" alt="Carregando">
    </div>
  </div>
</template>

<style lang="less" scoped>
@import "~assets/vars.less";
@import "~assets/variables.less";
#formSimulacaoEmprestimo {
  position: relative;
  .travaModal{
    position: absolute;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.53333);
    top: 0;
    left: 0;
    z-index: 800;
  }
  .disabled {
    opacity: 0.5;
    pointer-events: none;
    cursor: initial;
  }
  .panel-heading{
    background-color:@color5;
    color: @color2;
  }

  #form-parcelas {
    overflow-x: auto;
  }
  .tabelavalores {
    width: 100%;
    thead {
      th {
        text-align: center;

        &:first-child {
          padding-left: 38px;
          text-align: left;
        }

        &:last-child {
          text-align: right;
          padding-right: 10px;
        }
      }
    }
    tbody {
      tr {
        .valorTotalParcela {
          text-align: center;
        }
        .optionValorParcela {
          padding-left: 8px;
          font-family: @mainFontLight;
          font-size: @ftSizeSmall;
          position: relative;
        }
        .valorParcela {
          font-family: @mainFontLight;
          font-size: @ftSizeSmall;
          text-align: right;
        }

        td {
          text-align: center;
          &:first-child {
            text-align: left;
          }

          &:last-child {
            padding-right: 10px;
            text-align: right;
          }
        }

        &:nth-child(odd) {
          background-color: @color20;
        }

        &:last-child:nth-child(even) {
          border-bottom: 1px solid @color14;
        }
      }
    }
  }
  .tabrow,.tabrowRetorno {
    text-align: center;
    list-style: none;
    margin: 0px 0 3px;
    padding: 0;
    line-height: 35px;
    height: 37px;
    overflow: hidden;
    font-size: 12px;
    position: relative;

    &:before {
      position: absolute;
      content: "";
      width: 100%;
      bottom: 0;
      left: 0;
      border-top: 1px solid #aaa;
      z-index: 1;
    }

    li {
      border: 1px solid #aaa;
      background: #d1d1d1;
      background: linear-gradient(to bottom, #ececec 50%, #d1d1d1 100%);
      display: inline-block;
      position: relative;
      z-index: 0;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4), inset 0 1px 0 #fff;
      text-shadow: 0 1px #fff;
      margin: 0 -5px;
      //padding: 0 30px;
      width: 45%;
      cursor: pointer;

      &.ativo {
        background: #fff;
        color: #333;
        z-index: 2;
        border-bottom-color: #fff;

        &:before {
          box-shadow: 0px 2px 0 #fff;
        }

        &:after {
          box-shadow: 0px -2px 0 transparent;
        }
      }

      &:before,
      &:after {
        border: 1px solid #aaa;
        position: absolute;
        bottom: -1px;
        width: 6px;
        height: 6px;
        content: "";
      }

      &:before {
        right: -6px;
        border-bottom-left-radius: 6px;
        border-width: 0px 0px 1px 1px;
        box-shadow: 0px 2px 0 #ececec;
      }

      &:after {
        left: -6px;
        border-bottom-right-radius: 6px;
        border-width: 0px 1px 1px 0px;
        box-shadow: 0px 2px 0 #ececec;
      }
    }

    a {
      color: #555;
      text-decoration: none;
    }
  }
  .tabrowRetorno {
    display: block;
    margin: 5px 0 0 0;
    li {
      width: 22%;

      @media (max-width: @screen-md-max) {
        width: 25%;
      }
    }
  }
  .finishButton{
    width: 100%;
    color: @color7;
  }
  input {
    // margin: 5px 0;
    font-family: @mainFontLight;

    &[type="radio"] {
      margin-right: 5px;
      vertical-align: sub;
    }
  }
  .form-title {
    margin: 0;
    margin-bottom: 10px;
    font-family: @mainFont;
    font-size: @ftSizeLarge;
  }
  .btnEditServiceType {
    margin: 5px 0;
  }
  .form-group-error {
    color: @color26;
    input {
      border-color: @color26;
    }
  }
  #SimulacaoEmprestimo-passo-1 {
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
  #SimulacaoEmprestimo-passo-4 {
    .panel {
      margin-bottom: 5px;
    }

  }
  #formSubmit {
    text-align: right;
    border-top: 1px solid @color14;
    padding-top: 10px;
  }
  #transactionOptions {
    border-top: 1px solid @color14;
    padding-top: 10px;
    .box {
      border: 1px solid @color20;
      padding-bottom: 10px;
      &:first-child {
        margin-bottom: 10px;
      }
      &:last-of-type {
        padding-bottom: 0;
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
              .optionValorParcela,
              .valorParcela {
                padding: 5px 0;
                font-family: @mainFontLight;
                font-size: @ftSizeLarge;
              }
              .valorParcela {
                text-align: center;
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

    #card-select {
      padding: 0 15px;

      #cards {
        list-style-type: none;
        padding: 0;
        margin: 0;

        .card-brand {
          .card-logo {
            display: inline-block;
            height: 63px;
            width: 80px;
            background-repeat: no-repeat;
            background-size: contain;
            background-position: center center;
            vertical-align: middle;
          }

          &#visa {
            .card-logo {
              background-image: url("~assets/img/visa-logo.png");
            }
          }

          &#mastercard {
            .card-logo {
              background-image: url("~assets/img/mastercard-logo.png");
            }
          }

          &#elo {
            .card-logo {
              background-image: url("~assets/img/elo-logo.png");
            }
          }

          &#banricompras {
            .card-logo {
              background-image: url("~assets/img/banricompras-logo.png");
            }
          }

          &#hipercard {
            .card-logo {
              background-image: url("~assets/img/hipercard-logo.png");
            }
          }
        }
        input[type="radio"] {
          vertical-align: unset;
        }
      }
    }

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
  #simulationValue {
    margin-bottom: 10px;
    .titleLabel {
      font-family: @mainFont;
      font-size: @ftSizeNormal;
      margin: 0;
      padding: 0;
      padding-bottom: 5px;
    }
    #value {
      margin-bottom: 0;
    }

  }
  #simulationResult {
    margin-bottom: 0;
    .box {
      padding-bottom: 5px;
      &:first-child {
        margin-bottom: 5px;
      }
      &.pad10 {
        padding: 5px;
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
      .tabrow,
      .tabrowRetorno {
        text-align: center;
        list-style: none;
        margin: 0px 0 3px;
        padding: 0;
        line-height: 35px;
        height: 37px;
        overflow: hidden;
        font-size: 12px;
        position: relative;

        &:before {
          position: absolute;
          content: "";
          width: 100%;
          bottom: 0;
          left: 0;
          border-top: 1px solid #aaa;
          z-index: 1;
        }

        li {
          border: 1px solid #aaa;
          background: #d1d1d1;
          background: linear-gradient(to bottom, #ececec 50%, #d1d1d1 100%);
          display: inline-block;
          position: relative;
          z-index: 0;
          border-top-left-radius: 6px;
          border-top-right-radius: 6px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4), inset 0 1px 0 #fff;
          text-shadow: 0 1px #fff;
          margin: 0 -5px;
          //padding: 0 30px;
          width: 45%;
          cursor: pointer;

          &.ativo {
            background: #fff;
            color: #333;
            z-index: 2;
            border-bottom-color: #fff;

            &:before {
              box-shadow: 0px 2px 0 #fff;
            }

            &:after {
              box-shadow: 0px -2px 0 transparent;
            }
          }

          &:before,
          &:after {
            border: 1px solid #aaa;
            position: absolute;
            bottom: -1px;
            width: 6px;
            height: 6px;
            content: "";
          }

          &:before {
            right: -6px;
            border-bottom-left-radius: 6px;
            border-width: 0px 0px 1px 1px;
            box-shadow: 0px 2px 0 #ececec;
          }

          &:after {
            left: -6px;
            border-bottom-right-radius: 6px;
            border-width: 0px 1px 1px 0px;
            box-shadow: 0px 2px 0 #ececec;
          }
        }

        a {
          color: #555;
          text-decoration: none;
        }
      }

      .tabrowRetorno {
        display: block;
        margin: 5px 0 0 0;
        li {
          width: 22%;
        }
      }

      .valores {
        padding: 0 25px;

        .containervalor {
          display: table;
          padding: 10px;
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
              text-align: center;

              &:first-child {
                padding-left: 10px;
                text-align: left;
              }

              &:last-child {
                text-align: right;
                padding-right: 10px;
              }
            }
          }
          tbody {
            tr {
              .valorTotalParcela {
                text-align: center;
              }
              .optionValorParcela {
                font-family: @mainFontLight;
                font-size: @ftSizeSmall;
                position: relative;
                font-weight: normal;
              }
              .valorParcela {
                font-family: @mainFontLight;
                font-size: @ftSizeSmall;
                text-align: right;
                font-weight: normal;
              }

              td {
                text-align: center;
                font-family: @mainFontLight;
                &:first-child {
                  // padding-left: 10px;
                  text-align: left;
                }

                &:last-child {
                  padding-right: 10px;
                  text-align: right;
                }
              }

              &:nth-child(odd) {
                background-color: @color20;
              }

              &:last-child:nth-child(even) {
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
    #buttons {
      text-align: right;
      position: relative;
      padding-top: 10px;
      margin-top: 5px;

      div:first-of-type {
        &:before {
          content: "";
          width: calc(100% - 30px);
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
  #cardbrand-panel {
    list-style-type: none;
    padding-left: 20px;
    .cardbrand-selector {
      max-width: 120px;
      min-width: 100px;

      input, .cardbrand-img {
        display: inline-block;
        vertical-align: middle;
      }
      input {
        margin: 0;
      }
      .cardbrand-img {
        background-repeat: no-repeat;
        background-size: contain;
        background-position: 50% 50%;
        height: 60px;
        width: 60px;
      }
    }
  }
  #loadImage {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 995;
    top: 0;
    left: 0;
    background-color: rgba(255,255,255,0.75);

    img {
      position: absolute;
      margin: auto;
      right: 0;
      left: 0;
      bottom: 0;
      top: 0;

      @media (max-width: @screen-xs-max) {
        max-width: 160px;
      }

      @media (min-width: @screen-sm-min) {
        max-width: 240px;
      }

      @media (min-width: @screen-md-min) {
        max-width: 320px;
      }

      @media (min-width: @screen-lg-min) {
        max-width: 400px;
      }
    }
  }
}
</style>

<script>
/* eslint-disable no-extend-native */
/* eslint-disable func-names */


import { Money } from "v-money";
import { TheMask } from "vue-the-mask";
import deburr from "lodash/deburr";
import DatePicker from "vue2-datepicker";
import {
  required, between, decimal, maxValue,
} from "vuelidate/lib/validators";
import signDocument from "~/components/emprestimos/signDocument.vue";

const Handler = (function () {
  let i = 1;
  const listeners = {};

  return {
    addListener(element, event, handler, capture) {
      element.addEventListener(event, handler, capture);
      listeners[i] = {
        element,
        event,
        handler,
        capture,
      };
      return i++;
    },
    removeListener(id) {
      if (id in listeners) {
        const h = listeners[id];
        h.element.removeEventListener(h.event, h.handler, h.capture);
        delete listeners[id];
      }
    },
  };
}());


Array.prototype.unique = function () {
  return this.filter((value, index, self) => self.indexOf(value) === index);
};

export default {
  components: {
    Money, TheMask, DatePicker, signDocument,
  },
  mounted() {
    const self = this;
    self.typesOfServices();
    self.controls.showCCB = self.showCCBtoSign;
  },
  watch: {
    "dadosVariaveis.number_valor_SimulacaoEmprestimo": function (newValue, oldValue) {
      const self = this;
      const el = { target: { id: 0 } };

      const enableSimulation = !self.$v.dadosVariaveis.number_valor_SimulacaoEmprestimo.$invalid;

      if (newValue !== oldValue) {
        clearTimeout(self.controls.timeoutCoefficient);

        if (enableSimulation) {
          self.controls.timeoutCoefficient = setTimeout(() => {
            if (newValue !== oldValue) {
              self.controls.loading = true;
              self.$axios
                .post(`${process.env.API_TRANSACTION}/Loan/Coefficients`,
                  {
                    transactionTypeId: self.dadosVariaveis.transactionTypeID,
                    releasedValue: newValue,
                    serviceType: self.dadosVariaveis.serviceOptionType,
                  })
                .then((response) => {
                  self.statusSimulacaoEmprestimo = 4;
                  self.controls.loading = false;
                  self.parcelaBefore = self.dadosVariaveis.transactionTypeID;
                  self.preserveResponse = response;
                  self.mountListInstallment(response);
                })
                .catch((erro) => {
                  self.controls.loading = false;
                });
            }
          }, 1000);
        }
      }
    },
    cartao_escolhido() {
      this.dadosVariaveis.cartao_escolhido = this.cartao_escolhido;
      if (this.cartao_escolhido != null) {
        // this.statusSimulacaoEmprestimo = 3;
      }
    },
    statusSimulacaoEmprestimo() {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and
      if (this.statusSimulacaoEmprestimo == 1) {
        this.dadosVariaveis.serviceOptionType = false;
      }
      if (this.statusSimulacaoEmprestimo == 2) {
        this.cartao_escolhido = null;
        this.dadosVariaveis.cartao_escolhido = null;
        // this.cardBrands();
      }
      if (this.statusSimulacaoEmprestimo == 3) {
        this.dadosVariaveis.transactionTypeID = null;
      }
    },
    number_valor_SimulacaoEmprestimo() {
      // this.parcelasSimulacao.options = [];
      this.tipo_SimulacaoEmprestimo = false;
      this.dadosVariaveis.number_valor_SimulacaoEmprestimo = this.number_valor_SimulacaoEmprestimo;
    },
    dadosVariaveis: {
      handler(val) {
        const fieldKeys = [];
        const inputsList = [];


        Object.keys(val.dadosSimulacaoEmprestimo).map((x) => {
          fieldKeys.push(x);
        });

        Object.keys(val.dadosSimulacaoEmprestimo).map((x) => {
          if (this.dadosVariaveis.dadosSimulacaoEmprestimo[x] === "") {
            delete this.dadosVariaveis.dadosSimulacaoEmprestimo[x];
          }
        });

        fieldKeys.map((fk) => {
          if (document.querySelector(`input[field-key="${fk}"][name="currency"]`)) {
            inputsList.push(this.dadosVariaveis.dadosSimulacaoEmprestimo[fk]);
            this.dadosVariaveis.transactionTypeID = 4;
          }
        });

        let totalValue = 0;

        inputsList.map((x) => {
          totalValue += Number(x);
        });

        this.number_valor_SimulacaoEmprestimo = totalValue;

        if (Object.keys(this.dadosVariaveis.dadosSimulacaoEmprestimo).length >= this.requiredFieldKeysIDs.length && this.dadosVariaveis.number_valor_SimulacaoEmprestimo > 0) this.requiredFieldKeys = true;
        else this.requiredFieldKeys = false;
      },
      deep: true,
    },
  },
  methods: {
    showVariables(el) {
      this.parcelaSelecionada = el.parcela;
      this.dadosVariaveis.selectedInstallment = el;
      this.dadosVariaveis.selectedInstallment = this.parcelasSimulacao.options.filter(x => x.parcela == el.parcela);
    },
    getPicCartao(index) {
      return `/_nuxt/assets/img/${this.bandeiras_cartoes[index].imagem}`;
    },
    typesOfServices() {
      const self = this;

      self.controls.loading = true;

      this.$axios
        .get(`${process.env.API_TRANSACTION}/Loan/services`)
        .then((response) => {
          self.serviceTypesList = response.data;
          self.controls.loading = false;
        }).catch(err => console.log("Err:", err));
    },
    ftoggleRetornoLimpa(el) {
      $nuxt.$store.state.novaSimulacaoEmprestimo.retorno = null;
      this.ftoggleRetorno(el);
    },
    ftoggleRetorno(el) {
      const self = this;
      this.dadosVariaveis.retornoAtivo = $nuxt.$store.state.novaSimulacaoEmprestimo.retorno === null ? el.target.id : $nuxt.$store.state.novaSimulacaoEmprestimo.retorno;


      this.dadosVariaveis.selectedInstallment = $nuxt.$store.state.novaSimulacaoEmprestimo.parcelas != null ? $nuxt.$store.state.novaSimulacaoEmprestimo.parcelas : null;
      this.posicaoArrayRetornoFatores = el.target.id - 1;
      this.tabelaSimulacao();
    },
    mountListInstallment(coefficients) {
      const self = this;
      // this.listaRetornos = [];
      self.listaCoeficientes = [];
      const nParcelas = coefficients.data.length;

      self.nRetornos = 0;
      coefficients.data.forEach((value, index) => {
        value.posicao = index;
        self.listaCoeficientes.push(value);
      });


      this.dadosVariaveis.retornoAtivo = 0;

      this.tabelaSimulacao();
    },
    getGroupReturn(r) {
      const self = this;
      // filtragem de coeficientes de determinado retorno
      self.listaRetornoFiltrado = self.listaCoeficientes.filter(elementoatual => elementoatual.rType == r);
    },
    tabelaSimulacao() {
      const self = this;
      let valorParcela;
      let valorParcelaComCoeficiente;
      let valorParcelaComCoeficienteNoRound;
      let totalComvalorParcelaComCoeficiente;

      self.getGroupReturn(self.dadosVariaveis.retornoAtivo);

      if (self.listaRetornoFiltrado.length > 0) {
        // self.parcelasSimulacao.options = [];
        for (const [index, value] of self.listaRetornoFiltrado.entries()) {
          value.installmentModeId = value.installmentModeId;
          valorParcela = self.number_valor_SimulacaoEmprestimo / value.installmentModeId;
          valorParcelaComCoeficiente = self.number_valor_SimulacaoEmprestimo * value.coefficient;

          totalComvalorParcelaComCoeficiente = valorParcelaComCoeficiente * value.installmentModeId;
          valorParcelaComCoeficienteNoRound = self.number_valor_SimulacaoEmprestimo * value.coefficient;

          self.parcelasSimulacao.options[index] = {
            value: self.number_valor_SimulacaoEmprestimo,
            parcela: value.installmentModeId,
            ParcelaComCoeficiente: valorParcelaComCoeficiente,
            valorParcelaOriginal: valorParcela,
            totalParcelas: totalComvalorParcelaComCoeficiente,
            parcelaOriginal: value.posicao,
            coeficienteTotal: value.coefficientTotal,
            coeficiente: value.coefficient,
            liberadoComCoeficiente: self.number_valor_SimulacaoEmprestimo * (1 + (self.dadosVariaveis.retornoAtivo / 100)),
          };

          if (self.dadosVariaveis.transactionTypeID == 4 || self.dadosVariaveis.transactionTypeID == 2) {
            self.parcelaSelecionada = self.parcelaSelecionada == 0 ? 1 : self.parcelaSelecionada;
          }

          self.dadosVariaveis.selectedInstallment = self.parcelasSimulacao.options.filter(x => x.parcela == self.parcelaSelecionada);
        }
      }
    },
    fieldsOfServices() {
      const self = this;
      // self.dadosVariaveis.fieldsOfServices = [];
      if (self.statusSimulacaoEmprestimo < 3) {
        self.controls.loading = true;
        this.$axios
          .get(`${process.env.API_TRANSACTION}/service/${self.dadosVariaveis.serviceOptionType}/fields`)
          .then((response) => {
            self.fieldsOfServicesInputs = response.data;
            self.statusSimulacaoEmprestimo = 3;

            this.$axios
              .get(`${process.env.API_CUSTOMER_DATA}/Form/ClickSign/1`)
              .then((response) => {
                self.dadosVariaveis.formClicksign_full = response.data;
                self.dadosVariaveis.formClicksign = response.data.registrationData;

                if (self.dadosVariaveis.formClicksign.cpf) {
                  self.dadosVariaveis.document = self.dadosVariaveis.formClicksign.cpf;
                  self.dadosVariaveis.nome = self.dadosVariaveis.formClicksign.fullName;
                  self.dadosVariaveis.dadosSimulacaoEmprestimo[2211] = self.dadosVariaveis.nome;
                }
                if (self.dadosVariaveis.formClicksign.cnpj) {
                  if (self.dadosVariaveis.formClicksign_full.corporateStructurePjMembers.length != 0) {
                    self.dadosVariaveis.document = self.dadosVariaveis.formClicksign.cnpj;
                    self.dadosVariaveis.nome = self.dadosVariaveis.formClicksign_full.corporateStructurePjMembers[0].name;
                    self.dadosVariaveis.dadosSimulacaoEmprestimo[2211] = self.dadosVariaveis.nome;
                  } else {
                    self.dadosVariaveis.document = self.dadosVariaveis.formClicksign.cnpj;
                    self.dadosVariaveis.nome = self.dadosVariaveis.formClicksign_full.corporateStructurePjManagers[0].name;
                    self.dadosVariaveis.dadosSimulacaoEmprestimo[2211] = self.dadosVariaveis.nome;
                  }
                }
                self.dadosVariaveis.dadosSimulacaoEmprestimo[2209] = self.dadosVariaveis.document;
                if (self.dadosVariaveis.formClicksign.birthDate) {
                  self.dadosVariaveis.nascimento = self.dadosVariaveis.formClicksign.birthDate;
                }
                if (self.dadosVariaveis.formClicksign.foundationDate) {
                  self.dadosVariaveis.nascimento = self.dadosVariaveis.formClicksign.foundationDate;
                }
                self.dadosVariaveis.dadosSimulacaoEmprestimo[2210] = self.dadosVariaveis.nascimento;
                self.controls.loading = false;
              }).catch(err => console.log("Err:", err));
          }).catch(err => console.log("Err:", err));
        this.$axios
          .get(`${process.env.API_TRANSACTION}/Loan/${self.dadosVariaveis.serviceOptionType}/transactionTypes`)
          .then((response) => {
            Object.keys(response.data).map((k) => {
              Object.keys(self.transactionType.cliente.opcoes).map((j) => {
                if (self.transactionType.cliente.opcoes[j].value === response.data[k].transactionTypeID) {
                  self.transactionType.cliente.opcoes[j].enabled = true;
                }
              });
              Object.keys(self.transactionType.lojista.opcoes).map((y) => {
                if (self.transactionType.lojista.opcoes[y].value === response.data[k].transactionTypeID) {
                  self.transactionType.lojista.opcoes[y].enabled = true;
                }
              });
            });

            Object.keys(self.transactionType.cliente.opcoes).map((j) => {
              if (self.transactionType.cliente.opcoes[j].enabled === true) {
                self.transactionType.cliente.enabled = true;
              }
            });

            Object.keys(self.transactionType.lojista.opcoes).map((j) => {
              if (self.transactionType.lojista.opcoes[j].enabled === true) {
                self.transactionType.lojista.enabled = true;
              }
            });
          }).catch(err => console.log("Err:", err));
      }
    },
    cardBrands() {
      const self = this;

      self.controls.loading = true;

      self.$axios
        .get(`${process.env.API_TRANSACTION}/transaction/cardbrands`)
        .then((response) => {
          self.bandeiras_cartoes = response.data;
          self.controls.loading = false;
        }).catch(err => console.log("Err:", err));
    },
    ftoggleParcela() {
      this.toggleParcela = !this.toggleParcela;
    },
    ftoggleCartao() {
      this.toggleCartao = true;
    },
    submit() {
      const self = this;
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
    // abre modal de envio da transação
    modalControl(data) {
      const self = this;
      self.$nuxt.$emit("toggleModal", data);
    },
    showNumberAsCurrency(number) {
      if (number) {
        const numero = number.toFixed(2).split(".");
        numero[0] = `${numero[0].split(/(?=(?:...)*$)/).join(".")}`;
        return numero.join(",");
      }
    },
    // envia dados do tipo de servico
    enviarDadosSimulacaoEmprestimo() {
      const self = this;
      let switchreleasedValue;
      let switchtransactionValue;
      let parcela;
      let tratParcela;

      if (!self.openTransaction) {
        self.openTransaction = true;
        self.btConcluirSimulacaoEmprestimo = true;

        const centroCusto = self.dadosVariaveis.transactionTypeID == 1 || self.dadosVariaveis.transactionTypeID == 4 ? "cliente" : "lojista";

        if (centroCusto == "cliente") {
          switchreleasedValue = self.dadosVariaveis.number_valor_SimulacaoEmprestimo * (1 + (self.dadosVariaveis.retornoAtivo / 100));
          switchtransactionValue = self.dadosVariaveis.number_valor_SimulacaoEmprestimo * self.dadosVariaveis.selectedInstallment[0].coeficienteTotal;
          parcela = self.dadosVariaveis.selectedInstallment[0].ParcelaComCoeficiente;
        } else {
          switchtransactionValue = self.dadosVariaveis.number_valor_SimulacaoEmprestimo;
          switchreleasedValue = self.dadosVariaveis.number_valor_SimulacaoEmprestimo * self.dadosVariaveis.selectedInstallment[0].coeficienteTotal;
          tratParcela = self.dadosVariaveis.selectedInstallment[0].parcela == 0 ? 1 : self.dadosVariaveis.selectedInstallment[0].parcela;
          parcela = self.dadosVariaveis.number_valor_SimulacaoEmprestimo / tratParcela;
        }

        const finalizaSimulacaoEmprestimo = {
          affiliateId: $nuxt.$store.state.usuario.clientID,
          serviceType: self.dadosVariaveis.serviceOptionType,
          rType: self.dadosVariaveis.retornoAtivo,
          coefficient: self.dadosVariaveis.selectedInstallment[0].coeficienteTotal, // coeficiente total utilizado
          installmentModeId: self.dadosVariaveis.selectedInstallment[0].parcela,
          transactionValue: switchtransactionValue, // valor que o cliente pagará
          releasedValue: switchreleasedValue, // valor que o EC receberá
          paidInstallment: parcela, // valor da parcela
          transactionTypeId: self.dadosVariaveis.transactionTypeID,
          cardBrandType: self.dadosVariaveis.cartao_escolhido,
          fees: self.transactionData.fee,
          discount: 0, // campo prevendo descontos
          transactionData: {},
          fieldKeys: [],
        };

        self.fieldsOfServicesInputs.map((f) => {
          finalizaSimulacaoEmprestimo.transactionData[f.fieldKey] = {
            fieldKey: f.fieldKey,
            typeContent: f.typeContent,
            fieldValue: self.dadosVariaveis.dadosSimulacaoEmprestimo[f.fieldKey],
          };
        });

        self.fieldsOfServicesInputs.map((f) => {
          finalizaSimulacaoEmprestimo.fieldKeys.push({
            fieldKey: f.fieldKey,
            typeContent: f.typeContent,
            fieldValue: self.dadosVariaveis.dadosSimulacaoEmprestimo[f.fieldKey],
          });
        });

        this.transactionObj = finalizaSimulacaoEmprestimo;

        this.concluirSimulacaoEmprestimo();
      }
    },
    concluirSimulacaoEmprestimo() {
      // bloqueia botoes no modal
      this.pagando = true;

      // remove mensagens de alerta da resposta
      this.respostaText = null;
      this.respostaCode = null;

      // https://local.listofacil.com.br:11574/

      const self = this;
      let externalForm;
      let resposta;
      self.$axios.post(`${process.env.API_TRANSACTION}/loan/create`, self.transactionObj).then((response) => {
        // self.closeModal();
        if (response.data) {
          self.formdata2 = JSON.stringify(response.data);
          self.sendServerHeaders(self.formdata2);
          self.modalControl({ api: "emprestimostatus", modalContent: response.data });
          self.btConcluirSimulacaoEmprestimo = false;
          self.openTransaction = false;
        }
      }).catch((err) => {
        self.closeModal();
        resposta = {
          AppVersion: "0", Answer: "0", Code: err.response.data.status, Message: err.response.data.detail,
        };
        self.modalControl({ api: "emprestimoresposta", modalContent: resposta });
        self.btConcluirSimulacaoEmprestimo = false;
        self.openTransaction = false;
        return false;
      });
    },
    closeModal() {
      this.$nuxt.$emit("toggleModal", null);
    },
    sendServerHeaders(dados) {
      const self = this;
      const url = self.formUrl.urlHttps;
      let objVerify;

      // url = this.protocolo === "http:" ? self.formUrl.url : self.formUrl.urlHttps;
      const verify = false;
      let resposta;
      let respostaServer;
      const formData = new FormData();
      this.activateWindowBlock();
      const dadosTransaction = JSON.parse(self.formdata2);
      formData.append("data", self.formdata2);
      const request = new XMLHttpRequest();

      request.onreadystatechange = function () {
        // self.closeModal();
        if (this.readyState == 4 && this.status == 200) {
          resposta = JSON.parse(this.response);
          // self.closeModal();
          self.respostaText = resposta.Message;
          self.respostaCode = resposta.Code;
          // resposta.Code -12 = aguarde o programa
          self.pagando = false;
          // console.log(resposta);
          if (self.respostaCode !== 0) {
            self.retentativa = true;
          }
          self.verify = true;
        } else if (this.readyState == 4 && this.status == 0) {
          self.verify = false;
          resposta = {
            AppVersion: "0", Answer: "0", Code: "err", Message: "Aplicativo não responde. Favor reiniciar o Listo Fácil.",
          };
          respostaServer = {
            AppVersion: "0", Answer: "0", Code: dadosTransaction.id, Message: "Aplicativo não responde. Favor reiniciar o Listo Fácil.",
          };
          self.modalControl({ api: "emprestimoresposta", modalContent: resposta });
          self.respostaText = "Aplicativo sem resposta";
          self.respostaCode = "0";
        }

        if (self.verify) {
          self.$axios.put(`${process.env.API_TRANSACTION}/transaction/verify`, resposta).then((res) => {
            self.$axios.get(`${process.env.API_CUSTOMER_DATA}/Form/Status/2`).then((response) => {
              $nuxt.$store.commit("setLoanCCBStatus", response.data.active && response.data.completed && !response.data.signed);
              if (response.data.completed) {
                self.closeModal();
                self.modalControl({ api: "emprestimoresposta", modalContent: resposta });
                self.controls.showCCB = self.showCCBtoSign;
              }
            }).catch((err) => { console.log("Err:", err); return false; });
          }).catch((err) => {
            self.closeModal();
            resposta = {
              AppVersion: "0", Answer: "0", Code: err.response.data.status, Message: err.response.data.detail,
            };
            self.modalControl({ api: "emprestimoresposta", modalContent: resposta });
            self.btConcluirSimulacaoEmprestimo = false;
            self.openTransaction = false;
          });
          self.verify = false;
        }
      };

      request.open("POST", url, true);
      request.setRequestHeader("Accept", "*/*");
      request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      request.send(self.formdata2);
    },
    activateWindowBlock() {
      const unloadWindowEvent = window.attachEvent ? "onbeforeunload" : "beforeunload"; // / make IE7, IE8 compatible
      this.confirmExitlistenerID = Handler.addListener(window, unloadWindowEvent, this.confirmExitHandler);
    },
    confirmExitHandler(e) { // For >=IE7, Chrome, Firefox
      this.exited = true;
      setTimeout(() => {
        setTimeout(() => {
          // run only if user cancel exit
          this.exited = false;
        }, 1000);
      }, 1);

      (e || window.event).returnValue = confirmExitMessage;
      return confirmExitMessage;
    },
    // armazena dados de limites quando selecionar o tipo de empréstimo
    getServiceTypeLimits(service) {
      const self = this;

      const selectedService = self.serviceTypesList.filter(type => type.serviceId == service)[0];

      self.validateLoanLimits.maximum = selectedService.maximum;
      self.validateLoanLimits.minimum = selectedService.minimum;
      self.validateLoanLimits.available = selectedService.available;
    },
  },
  data() {
    return {
      formUrl: {
        url: "http://localhost:11573/",
        urlHttps: "https://local.listofacil.com.br:11574",
      },
      validateLoanLimits: {
        maximum: 0,
        minimum: 0,
        available: 0,
      },
      validateFields: false,
      openTransaction: false,
      protocolo: null,
      confirmExitlistenerID: null,
      exited: null,
      respostaText: null,
      respostaCode: null,
      retentativa: null,
      pagando: false,
      submitStatus: null,
      number_valor_SimulacaoEmprestimo: 0.0,
      totalSimulacaoEmprestimo: null,
      validClientDocument: 0,
      toggleTransaction: false,
      toggleParcela: true,
      valor_minimo: 0.00,
      tipo_SimulacaoEmprestimo: false,
      tipoSimulacaoEmprestimoRetorno: "",
      nRetornos: 0,
      parcelas: "",
      retorno: "",
      taxa_atual: false,
      parcelaSelecionada: 1,
      toggleCartao: false,
      conclusao: false,
      cartao: false,
      statusSimulacaoEmprestimo: 1,
      fieldsOfServicesInputs: [],
      transactionTypesOfServices: [],
      cartao_escolhido: null,
      listaRetornos: [],
      formdata: null,
      formdata2: null,
      transactionObj: {},
      transactionData: {
        serviceType: null,
        clientDocument: null,
        fee: 0,
      },
      controls: {
        loading: false,
        transactionValue: 0,
        timeoutCoefficient: null,
        showCCB: false,
      },
      transactionType: {
        cliente: {
          enabled: false,
          label: "Tipo de transação",
          opcoes: [
            {
              id: "client-debit",
              label: "Cartão de débito",
              value: 1,
              enabled: false,
            },
            {
              id: "client-credit",
              label: "Cartão de crédito",
              value: 4,
              enabled: false,
            },
          ],
        },
        lojista: {
          label: "Tipo de transação",
          enabled: false,
          opcoes: [
            {
              id: "seller-debit",
              label: "Cartão de débito",
              value: 8,
              enabled: false,
            },
            {
              id: "seller-credit",
              label: "Cartão de crédito",
              value: 2,
              enabled: false,
            },
          ],
        },
      },
      bandeiras_cartoes: null,
      dadosVariaveis: {
        serviceOptionType: false,
        transactionTypeID: null,
        cartao_escolhido: null,
        number_valor_SimulacaoEmprestimo: 0.0,
        selectedInstallment: null,
        retornoAtivo: 0,
        coeficiente: null,
        coeficienteTotal: null,
        dadosSimulacaoEmprestimo: {},
        formClicksign: null,
        formClicksign_full: null,
        nome: null,
        document: null,
        nascimento: null,
      },
      finalizaSimulacaoEmprestimo: null,
      parcelasSimulacao: {
        options: [],
      },
      btConcluirSimulacaoEmprestimo: false,
      text: {
        valor_SimulacaoEmprestimo: "Valor",
        placeholder_digite_valor_SimulacaoEmprestimo: "Digite o valor",
        valor_a_simular: "Valor a simular",
        placeholder_digite_valor_a_simular: "Digite o valor a simular",
        tipos_de_SimulacaoEmprestimo: "Tipos de transação",
        custo_cliente: "Custo cliente",
        custo_lojista: "Custo lojista",
        cartao_de_debito: "Cartão de débito",
        cartao_de_credito: "Cartão de crédito",
        cartao_de_debito_custo_lojista: "Cartão de débito custo lojista",
        cartao_de_credito_custo_lojista: "Cartão de crédito custo lojista",
        simulacao_de_pagamento: "Simulação de Pagamento",
        parcelas: "Parcelas",
        SimulacaoEmprestimo: "Transação",
        opcao_de_parcelamento: "Opção de parcelamento",
        valor_da_parcela: "Valor da Parcela",
        imprimir: "Imprimir",
        nova_SimulacaoEmprestimo: "Nova transação",
        concluir_SimulacaoEmprestimo: "Contratar",
        continuar: "Continuar",
        icone_imprimir: "Imprimir",
        valor_total: "Total",
        confirmar: "Confirmar",
        agora_pode_enviar:
          "Agora você já pode enviar a simulação para seu cliente de forma rápida.",
        agora_pode_enviar_subtitulo:
          "Officia aliquip consectetur consequat minim. Dolore commodo proident non dolore velit labore. Amet ipsum anim dolor velit sint dolore excepteur exercitation magna do deserunt dolor consectetur. Aliqua duis laboris id cillum cillum officia cupidatat ut officia laboris tempor nulla. Pariatur veniam nulla amet duis cupidatat.",
        enviar_simulacao: "Enviar simulação",
        botao_enviar: "Enviar",
        documento_cliente: "Documento do cliente",
        documento_Obrigatorio: "Documento é obrigatório",
        documento_formatoErrado: "Verifique o documento informado",
        documento_placeholder: "Digite o documento do cliente",
        honorarios_label: "Honorários",
        dados_SimulacaoEmprestimo: "Dados da Transação",
        tipo_servico: "Para o seu dia a dia",
        servico_continue: "Continuar",
        servico_voltar: "Voltar",
        servico_selecione: "Para o seu dia a dia",
        parcela: "Parcela",
        opcao: "Opção",
        total: "TOTAL",
        labels_bandeiras_cartoes: "Bandeira do cartão",
        valores: "Simulação",
        alerta_selecionar_parcela: "Selecione uma opção!",
        parcela_unica: "Parcela única",
        title_taxa: "Encargos",
        title_valor_SimulacaoEmprestimo: "Valor transação",
        title_valor_parcela: "Valor parcela",
        title_valor_total: "Total",
        title_valor_total_liberado: "Total transação",
      },
      customTokens: {
        mask: "CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC",
        tokens: {
          C: {
            pattern: /[a-zA-Z\u00C0-\u00FF ]/,
            transform(v) {
              return v.toLocaleUpperCase();
            },
          },
        },
      }, // [a-zA-Z\u00C0-\u00FF ]
      money: {
        decimal: ",",
        thousands: ".",
        // prefix: "R$ ",
        suffix: " ",
        precision: 2,
        masked: false,
      },
      serviceTypesList: [],
      requiredFieldKeys: false,
    };
  },
  computed: {
    requiredFieldKeysIDs() {
      return this.fieldsOfServicesInputs.map((input) => {
        if (input.isRequired) { return input.fieldKey; }
      });
    },
    showCCBtoSign() {
      return $nuxt.$store.state.emprestimos.ccbStatus;
    },
  },

  // self.validateLoanLimits.maximum = selectedService.maximum;
  // self.validateLoanLimits.minimum = selectedService.minimum;
  // self.validateLoanLimits.available = selectedService.available;

  validations() {
    const self = this;
    return {
      dadosVariaveis: {
        number_valor_SimulacaoEmprestimo: {
          required,
          validate(value) {
            if (value >= self.validateLoanLimits.minimum && value <= self.validateLoanLimits.available) {
              return true;
            }
            self.statusSimulacaoEmprestimo = 3;
            return false;
          },
          // between: between(self.validateLoanLimits.minimum, self.validateLoanLimits.available),
          // available: maxValue(self.validateLoanLimits.available),
        },
      },
    };
  },
};
</script>
