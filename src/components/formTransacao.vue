<template>
  <div id="formTransacao" class="container-fluid">
    <div>
      <!-- <div>serviceName {{serviceName.length}}</div>-->
    </div>
    <form id="form-transacao" class="row" v-on:submit.prevent>
      <div class="col-xs-12 col-md-2 col-lg-3">
        <div class="row">
          <div id="transacao-passo-1" :class="{'col-xs-12': $mq == 'laptop'}">
            <div id="serviceType" class="panel panel-default">
              <div class="panel-heading" :class="{'disabled': dadosVariaveis.serviceOptionType != false}">
                <span>{{text.servico_selecione}}</span>
              </div>
              <div class="panel-body">
                <ul>
                  <span v-if="historyUrl === '/debitos-veiculares/detran/ipva' && typeof serviceName === 'string' && serviceName.length !== 0">
                    <div v-for="(type, index) in typesOfservices" :key="index">
                      <li v-if="dadosVariaveis.serviceOptionType == type.serviceId">
                        <label :for="type.id">
                          <input type="radio" name="service" :id="type.serviceId" v-model="dadosVariaveis.serviceOptionType" :value="type.serviceId" @change.stop="[statusTransacao = 2, cardBrands()]">
                          {{type.serviceName}}
                        </label>
                      </li>
                    </div>                    
                  </span>
                  <span v-else>
                    <li v-for="(type, index) in typesOfservices" :key="index">
                      <label :for="type.id">
                        <input type="radio" name="service" :id="type.serviceId" v-model="dadosVariaveis.serviceOptionType" :value="type.serviceId" @change.stop="[statusTransacao = 2, cardBrands()]">
                        {{type.serviceName}}
                      </label>
                    </li>
                  </span>

                </ul>
              </div>
            </div>
          </div>
          <div id="transacao-passo-2" :class="{'col-xs-12': $mq == 'laptop'}">
            <div id="cardbrand-list" v-show="statusTransacao >= 2" class="panel panel-default">
              <div class="panel-heading" :class="{'disabled': statusTransacao > 2}">
                <span>{{ text.labels_bandeiras_cartoes }}</span>
              </div>
              <ul id="cardbrand-panel" class="panel-body row">
                <li class="cardbrand-selector col-xs-6" v-for="(cartao, index) in bandeiras_cartoes" :key="index">
                  <label :for="cartao.id">
                    <input type="radio" name="cardtransaction" v-model="cartao_escolhido" :value="cartao.id" :id="cartao.id" @change.stop="fieldsOfServices">
                    <div class="cardbrand-img" :style="{backgroundImage:`url(img/bandeira-${deburr(cartao.name).toLowerCase()}.png)`}"></div>
                  </label>
                </li>
              </ul>
            </div>
            <!-- <button class="btnEditServiceType" v-show="statusTransacao == 2" @click="statusTransacao = 1">{{text.servico_voltar}}</button> -->
          </div>
        </div>
      </div>

      <div class="col-xs-12 col-md-10 col-lg-9">
        <div class="row">
          <div id="transacao-passo-3" class="col-xs-12 col-md-7" v-show="dadosVariaveis.serviceOptionType != false && statusTransacao >= 3">
            <div id="transactionData" class="panel panel-default">
              <div class="panel-heading" :class="{'disabled': statusTransacao != 3}">
                <span>{{ text.dados_transacao }}</span>
              </div>
              <div class="panel-body">

                <div class="row">
                  <!-- <code>{{fieldsOfServicesInputs}}</code> -->
                  <div class="col-xs-12 col-sm-6 col-md-6" :class="{'form-group-error': validClientDocument != 0 && validClientDocument != 1, 'form-invalid': !dadosVariaveis.dadosTransacao[field.fieldKey]} && controls.loading" v-for="(field, index) in fieldsOfServicesInputs" :key="index">
                    <!-- <code>{{field}}</code> -->
                    <label :for="field.fieldKey">{{ field.label }}</label>

                    <fieldset v-if="field.typeContent !== 'Text'">
                      <Money v-bind="money" type="text" :field-key="field.fieldKey" name="currency" :id="field.fieldKey" :placeholder="field.placeholder" v-model="dadosVariaveis.dadosTransacao[field.fieldKey]" :disabled="blockFields[field.fieldKey]"></Money>
                    </fieldset>

                    <fieldset v-if="field.typeContent === 'Text' && field.fieldKeyTypeID === 4">
                      <Money v-bind="money" type="text" :field-key="field.fieldKey" name="currency" :id="field.fieldKey" :placeholder="field.placeholder" v-model="dadosVariaveis.dadosTransacao[field.fieldKey]" :disabled="blockFields[field.fieldKey]"></Money>
                    </fieldset>

                    <!-- CPF/CNPJ -->
                    <fieldset v-if="field.typeContent === 'Text' && field.fieldKeyTypeID === 21">
                      <the-mask :mask="['###.###.###-##', '##.###.###/####-##']" :placeholder="field.placeholder" :id="field.fieldKey" type="text" class="form__input" v-model.trim="dadosVariaveis.dadosTransacao[field.fieldKey]" :disabled="blockFields[field.fieldKey]" />
                    </fieldset>

                    <!-- CEP -->
                    <fieldset v-if="field.typeContent == 'Text' && field.fieldKeyTypeID == 16">
                      <the-mask :mask="'#####-###'" :placeholder="field.placeholder" v-model.trim="dadosVariaveis.dadosTransacao[field.fieldKey]" :id="field.fieldKey" type="text" class="form__input" :disabled="blockFields[field.fieldKey]"></the-mask>
                    </fieldset>

                    <!-- TELEFONE -->
                    <fieldset v-if="field.typeContent == 'Text' && field.fieldKeyTypeID == 40">
                      <the-mask :mask="['(##) #####-####', '(##) ####-####']" :placeholder="field.placeholder" v-model.trim="dadosVariaveis.dadosTransacao[field.fieldKey]" :id="field.fieldKey" type="text" class="form__input" :disabled="blockFields[field.fieldKey]"></the-mask>
                    </fieldset>

                    <fieldset v-if="field.typeContent === 'Text' && (field.fieldKeyTypeID !== 21 && field.fieldKeyTypeID !== 4) && (field.fieldKeyTypeID !== 16 && field.fieldKeyTypeID !== 40)">
                      <div v-if="field.fieldKeyTypeID === 32 || field.fieldKeyTypeID ===  33 || field.fieldKeyTypeID === 34 || field.fieldKeyTypeID === 47 || field.fieldKeyTypeID === 48">
                        <input :placeholder="field.placeholder" :id="field.fieldKey" type="text" class="form__input" v-mask="customTokens" v-model.trim="dadosVariaveis.dadosTransacao[field.fieldKey]" :disabled="blockFields[field.fieldKey]">
                      </div>
                      <div v-else>
                        <input :placeholder="field.placeholder" name="others" :id="field.fieldKey" :field-key="field.fieldKey" :type="field.typeContent == 'Text' ? 'text' : 'number'" v-model="dadosVariaveis.dadosTransacao[field.fieldKey]" :disabled="blockFields[field.fieldKey]">
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
                      <div v-for="(tipotransacao, index) in custo.opcoes" :key="index" v-if="tipotransacao.enabled">
                        <label class="" :for="tipotransacao.id"><input @change.stop="getCoefficients" type="radio" name="transaction" v-model="dadosVariaveis.transactionTypeID" :id="tipotransacao.id" :value="tipotransacao.value"><span>{{tipotransacao.label}}</span></label>
                      </div>
                    </fieldset>
                  </div>
                </div>

              </div>
            </div>
            <div class="row">
              <div class="form-button pull-right col-xs-12 col-sm-6" v-show="statusTransacao < 4 && $nuxt.$store.state.criouSimulacao">
                <button class="btnEditServiceType" @click.stop="getCoefficients">{{text.continuar}}</button>
              </div>
            </div>
          </div>

          <div id="transacao-passo-4" class="col-xs-12 col-md-5" v-show="statusTransacao >= 4" >
            <div id="transaction-value" class="panel panel-default" :class="{'disabled': statusTransacao > 4}">
              <div class="panel-heading">
                <span>{{ text.valores }}</span>
              </div>
              <div class="panel-body">
                <Money :value="dadosVariaveis.number_valor_transacao" v-bind="money" type="text" name="simulation" id="value" :placeholder="text.placeholder_digite_valor_a_simular" disabled></Money>
                <ul class="tabrow" v-show="listaRetornos.length > 1 && number_valor_transacao > 0 ">
                  <li class="opcao" v-bind:class="{ ativo: toggleParcela}" @click="ftoggleParcela">{{text.parcelas}}</li>
                  <li class="opcao" v-bind:class="{ ativo: !toggleParcela}" @click="ftoggleParcela">{{text.transacao}}</li>
                </ul>

                <ul class="tabrow tabrowRetorno col-xs-12 " v-show="listaRetornos.length > 1 && number_valor_transacao > 0 && !toggleParcela">
                  <li class="opcao" @click="ftoggleRetornoLimpa($event)" v-for="(retorno, index) in listaRetornos" :key="index" :value="retorno" :id="retorno" :class="{ativo: retorno == dadosVariaveis.retornoAtivo}">R{{retorno}}</li>
                </ul>

                <form id="form-parcelas" class="col-xs-12 no-padding form-group" v-on:submit.prevent v-show="(!controls.loading && parcelasSimulacao.options.length > 0) && number_valor_transacao > 0">
                  <table class="tabelavalores">

                    <thead v-if="dadosVariaveis.transactionTypeID == 1 || dadosVariaveis.transactionTypeID == 8">
                      <th><span>&nbsp;</span></th>
                      <th>{{text.title_valor_liberado}}</th>
                      <th>{{text.title_valor_transacao}}</th>
                    </thead>

                    <thead v-if="dadosVariaveis.transactionTypeID == 4">
                      <th>&nbsp;</th>
                      <th>{{text.title_valor_parcela}}</th>
                      <th v-if="!toggleParcela">{{text.title_valor_liberado}}</th>
                      <th>{{text.title_valor_total}}</th>
                    </thead>

                    <thead v-if="dadosVariaveis.transactionTypeID == 2">
                      <th>&nbsp;</th>
                      <th>{{text.title_valor_parcela}}</th>
                      <th>{{text.title_valor_liberado}}</th>
                      <th>{{text.title_valor_total_liberado}}</th>
                    </thead>

                    <tbody>
                        <tr v-for="(parcela, index) in parcelasSimulacao.options" :key="index">


                          <td v-if="dadosVariaveis.transactionTypeID == 1" class="optionValorParcela">
                            <label v-if="(showNumberAsCurrency(Number(parcela.value.toFixed(2))) &&  showNumberAsCurrency(Number(parcela.ParcelaComCoeficiente.toFixed(2))))"><input type="radio" name="installment" v-model="parcelaSelecionada"
                            @change.stop="showVariables(parcela)" :value="parcela.parcela" :v-if="!showNumberAsCurrency(Number(parcela.ParcelaComCoeficiente.toFixed(2)))">
                            <span v-if="dadosVariaveis.transactionTypeID == 1 || dadosVariaveis.transactionTypeID == 8">{{text.parcela_unica}}</span>
                            <span v-else>{{parcela.parcela}}x</span>
                            </label>
                          </td>
                          <td v-if="dadosVariaveis.transactionTypeID == 8" class="optionValorParcela">
                            <label v-if="(showNumberAsCurrency(Number(parcela.ParcelaComCoeficiente.toFixed(2))) && showNumberAsCurrency(Number(parcela.value.toFixed(2))))"><input type="radio" name="installment" v-model="parcelaSelecionada"
                            @change.stop="showVariables(parcela)" :value="parcela.parcela" :v-if="!showNumberAsCurrency(Number(parcela.ParcelaComCoeficiente.toFixed(2)))">
                            <span v-if="dadosVariaveis.transactionTypeID == 1 || dadosVariaveis.transactionTypeID == 8">{{text.parcela_unica}}</span>
                            <span v-else>{{parcela.parcela}}x</span>
                            </label>
                          </td>
                          <td v-if="dadosVariaveis.transactionTypeID == 4" class="optionValorParcela">
                            <label v-if="(showNumberAsCurrency(Number(parcela.ParcelaComCoeficiente.toFixed(2))) && showNumberAsCurrency(Number(parcela.liberadoComCoeficiente.toFixed(2))) && showNumberAsCurrency(Number(parcela.totalParcelas.toFixed(2))))"><input type="radio" name="installment" v-model="parcelaSelecionada"
                            @change.stop="showVariables(parcela)" :value="parcela.parcela" :v-if="!showNumberAsCurrency(Number(parcela.ParcelaComCoeficiente.toFixed(2)))">
                            <span v-if="dadosVariaveis.transactionTypeID == 1 || dadosVariaveis.transactionTypeID == 8">{{text.parcela_unica}}</span>
                            <span v-else>{{parcela.parcela}}x</span>
                            </label>
                          </td>
                          <td v-if="dadosVariaveis.transactionTypeID == 2" class="optionValorParcela">
                            <label v-if="(showNumberAsCurrency(Number(parcela.valorParcelaOriginal.toFixed(2))) && showNumberAsCurrency(Number(parcela.ParcelaComCoeficiente.toFixed(2))) && showNumberAsCurrency(Number(parcela.totalParcelas.toFixed(2))))"><input type="radio" name="installment" v-model="parcelaSelecionada"
                            @change.stop="showVariables(parcela)" :value="parcela.parcela" :v-if="!showNumberAsCurrency(Number(parcela.ParcelaComCoeficiente.toFixed(2)))">
                            <span v-if="dadosVariaveis.transactionTypeID == 1 || dadosVariaveis.transactionTypeID == 8">{{text.parcela_unica}}</span>
                            <span v-else>{{parcela.parcela}}x</span>
                            </label>
                          </td>

                          <td v-if="dadosVariaveis.transactionTypeID == 1"><span v-if="(showNumberAsCurrency(Number(parcela.value.toFixed(2))) && showNumberAsCurrency(Number(parcela.ParcelaComCoeficiente.toFixed(2))))">{{showNumberAsCurrency(Number(parcela.value.toFixed(2)))}}</span></td>
                          <td v-if="dadosVariaveis.transactionTypeID == 1"><span v-if="(showNumberAsCurrency(Number(parcela.value.toFixed(2))) && showNumberAsCurrency(Number(parcela.ParcelaComCoeficiente.toFixed(2))))">{{showNumberAsCurrency(Number(parcela.ParcelaComCoeficiente.toFixed(2)))}}</span></td>

                          <td v-if="dadosVariaveis.transactionTypeID == 8"><span v-if="(showNumberAsCurrency(Number(parcela.ParcelaComCoeficiente.toFixed(2))) && showNumberAsCurrency(Number(parcela.value.toFixed(2))))">{{showNumberAsCurrency(Number(parcela.ParcelaComCoeficiente.toFixed(2)))}}</span></td>
                          <td v-if="dadosVariaveis.transactionTypeID == 8"><span v-if="(showNumberAsCurrency(Number(parcela.ParcelaComCoeficiente.toFixed(2))) && showNumberAsCurrency(Number(parcela.value.toFixed(2))))">{{showNumberAsCurrency(Number(parcela.value.toFixed(2)))}}</span></td>

                          <td v-if="dadosVariaveis.transactionTypeID == 4"><span v-if="(showNumberAsCurrency(Number(parcela.ParcelaComCoeficiente.toFixed(2))) && showNumberAsCurrency(Number(parcela.liberadoComCoeficiente.toFixed(2))) && showNumberAsCurrency(Number(parcela.totalParcelas.toFixed(2))))">{{showNumberAsCurrency(Number(parcela.ParcelaComCoeficiente.toFixed(2)))}}</span></td>
                          <td v-if="dadosVariaveis.transactionTypeID == 4 && !toggleParcela"><span v-if="(showNumberAsCurrency(Number(parcela.ParcelaComCoeficiente.toFixed(2))) && showNumberAsCurrency(Number(parcela.liberadoComCoeficiente.toFixed(2))) && showNumberAsCurrency(Number(parcela.totalParcelas.toFixed(2))))">{{showNumberAsCurrency(Number(parcela.liberadoComCoeficiente.toFixed(2)))}}</span></td>
                          <td v-if="dadosVariaveis.transactionTypeID == 4"><span v-if="(showNumberAsCurrency(Number(parcela.ParcelaComCoeficiente.toFixed(2))) && showNumberAsCurrency(Number(parcela.liberadoComCoeficiente.toFixed(2))) && showNumberAsCurrency(Number(parcela.totalParcelas.toFixed(2))))">{{showNumberAsCurrency(Number(parcela.totalParcelas.toFixed(2)))}}</span></td>

                          <td v-if="dadosVariaveis.transactionTypeID == 2"><span v-if="showNumberAsCurrency(Number(parcela.valorParcelaOriginal.toFixed(2))) && showNumberAsCurrency(Number(parcela.ParcelaComCoeficiente.toFixed(2))) && showNumberAsCurrency(Number(parcela.totalParcelas.toFixed(2)))">{{showNumberAsCurrency(Number(parcela.valorParcelaOriginal.toFixed(2)))}}</span></td>
                          <td v-if="dadosVariaveis.transactionTypeID == 2"><span v-if="showNumberAsCurrency(Number(parcela.valorParcelaOriginal.toFixed(2))) && showNumberAsCurrency(Number(parcela.ParcelaComCoeficiente.toFixed(2))) && showNumberAsCurrency(Number(parcela.totalParcelas.toFixed(2)))">{{showNumberAsCurrency(Number(parcela.ParcelaComCoeficiente.toFixed(2)))}}</span></td>
                          <td v-if="dadosVariaveis.transactionTypeID == 2"><span v-if="showNumberAsCurrency(Number(parcela.valorParcelaOriginal.toFixed(2))) && showNumberAsCurrency(Number(parcela.ParcelaComCoeficiente.toFixed(2))) && showNumberAsCurrency(Number(parcela.totalParcelas.toFixed(2)))">{{showNumberAsCurrency(Number(parcela.totalParcelas.toFixed(2)))}}</span></td>

                        </tr>
                      </tbody>
                  </table>
                </form>

                <div v-show="statusTransacao == 4 && number_valor_transacao > valor_minimo"  >
                  <button class="btnEditServiceType finishButton" @click.stop="enviarDadosTransacao" :disabled="dadosVariaveis.selectedInstallment == null || !requiredFieldKeys || btConcluirTransacao">{{text.concluir_transacao}}</button>
                  <div class="alert alert-warning" v-if="dadosVariaveis.selectedInstallment == null">{{text.alerta_selecionar_parcela}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
    <div id="loadImage" v-show="controls.loading">
      <img src="../assets/img/loading.gif" alt="Carregando">
    </div>
  </div>
</template>

<style lang="less" scoped>
  @import "../assets/vars.less";
  @import "../assets/variables.less";
  #formTransacao {
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
    #transacao-passo-4 {
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
                background-image: url("../assets/img/visa-logo.png");
              }
            }

            &#mastercard {
              .card-logo {
                background-image: url("../assets/img/mastercard-logo.png");
              }
            }

            &#elo {
              .card-logo {
                background-image: url("../assets/img/elo-logo.png");
              }
            }

            &#banricompras {
              .card-logo {
                background-image: url("../assets/img/banricompras-logo.png");
              }
            }

            &#hipercard {
              .card-logo {
                background-image: url("../assets/img/hipercard-logo.png");
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
import { mapState, mapActions, mapMutations } from "vuex";
import deburr from "lodash/deburr";
import uniq from "lodash/uniq";
import { HandlerUtil } from "~/utils/handler.utils";

const Handler = HandlerUtil;

export default {
  components: { Money, TheMask },

  data() {
    return {
      formUrl: {
        url: "http://localhost:11573/",
        urlHttps: "https://local.listofacil.com.br:11574",
      },
      externalTransaction: false,
      blockFields: {},
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
      number_valor_transacao: 0.0,
      totalTransacao: null,
      validClientDocument: 0,
      toggleTransaction: false,
      toggleParcela: true,
      valor_minimo: 0.00,
      tipo_transacao: false,
      tipoTransacaoRetorno: "",
      nRetornos: 0,
      parcelas: "",
      retorno: "",
      taxa_atual: false,
      parcelaSelecionada: 1,
      toggleCartao: false,
      conclusao: false,
      cartao: false,
      statusTransacao: 1,
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
      },
      transactionType: {
        cliente: {
          enabled: false,
          label: "Custo Cliente",
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
          label: "Custo Lojista",
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
        number_valor_transacao: 0.0,
        selectedInstallment: null,
        retornoAtivo: 0,
        coeficiente: null,
        coeficienteTotal: null,
        dadosTransacao: {},
      },
      finalizaTransacao: null,
      parcelasSimulacao: {
        options: [],
      },
      btConcluirTransacao: false,
      text: {
        valor_transacao: "Valor",
        placeholder_digite_valor_transacao: "Digite o valor",
        valor_a_simular: "Valor a simular",
        placeholder_digite_valor_a_simular: "Digite o valor a simular",
        tipos_de_transacao: "Tipos de transação",
        custo_cliente: "Custo cliente",
        custo_lojista: "Custo lojista",
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
        nova_transacao: "Nova transação",
        concluir_transacao: "Concluir transação",
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
        dados_transacao: "Dados da Transação",
        tipo_servico: "Tipo de Serviço",
        servico_continue: "Continuar",
        servico_voltar: "Voltar",
        servico_selecione: "Tipo de serviço",
        parcela: "Parcela",
        opcao: "Opção",
        total: "TOTAL",
        labels_bandeiras_cartoes: "Bandeira do cartão",
        valores: "Valores",
        alerta_selecionar_parcela: "Selecione uma opção!",
        parcela_unica: "Parcela única",
        title_valor_liberado: "Valor liberado",
        title_valor_transacao: "Valor transação",
        title_valor_parcela: "Valor parcela",
        title_valor_total: "Total",
        title_valor_total_liberado: "Total liberado",
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

  async mounted() {
    if (this.historyUrl == "/debitos-veiculares/detran/ipva") {
      this.dadosVariaveis.serviceOptionType = this.serviceId;
      this.statusTransacao = 2;
      this.totalTransacao = this.totalDebits;
      this.parcelaSelecionada = this.selectInstalment.parcela;
      this.cardBrands();
    }

    if ($nuxt.$store.state.criouSimulacao && $nuxt.$store.state.novaTransacao.parcelas[$nuxt.$store.state.novaTransacao.parcelas.length - 1]) {
      this.number_valor_transacao = $nuxt.$store.state.novaTransacao.valorTotal;
      this.totalTransacao = $nuxt.$store.state.novaTransacao.valorTotal;
      this.parcelaSelecionada = $nuxt.$store.state.novaTransacao.parcelas[$nuxt.$store.state.novaTransacao.parcelas.length - 1].parcela;
    }
  },
  destroyed() {
    this.cleanClient();
    this.clearTransaction();
  },
  watch: {
    cartao_escolhido() {
      this.dadosVariaveis.cartao_escolhido = this.cartao_escolhido;
      if (this.cartao_escolhido != null) {
        // this.statusTransacao = 3;
      }
    },
    statusTransacao() {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and
      if (this.statusTransacao == 1) {
        this.dadosVariaveis.serviceOptionType = false;
      }
      if (this.statusTransacao == 2) {
        this.cartao_escolhido = null;
        this.dadosVariaveis.cartao_escolhido = null;
        // this.cardBrands();
      }
      if (this.statusTransacao == 3) {
        this.dadosVariaveis.transactionTypeID = null;
        if ($nuxt.$store.state.criouSimulacao) {
          this.dadosVariaveis.transactionTypeID = $nuxt.$store.state.novaTransacao.tipo_transacao;
        }

        if (this.transactionTypeDetran) {
          const comp = typeof this.transactionTypeDetran;
          if (comp !== "number") {
            return true;
          }
          this.dadosVariaveis.transactionTypeID = this.transactionTypeDetran;
        }
      }
    },
    number_valor_transacao() {
      this.parcelasSimulacao.options = [];
      this.tipo_transacao = false;
      this.dadosVariaveis.number_valor_transacao = this.number_valor_transacao;
      if (this.dadosVariaveis.transactionTypeID != null) {
        this.getCoefficients();
      }
    },
    dadosVariaveis: {
      handler(val) {
        const fieldKeys = [];
        const inputsList = [];


        Object.keys(val.dadosTransacao).map((x) => {
          fieldKeys.push(x);
        });

        Object.keys(val.dadosTransacao).map((x) => {
          if (this.dadosVariaveis.dadosTransacao[x] === "") {
            delete this.dadosVariaveis.dadosTransacao[x];
          }
        });

        fieldKeys.map((fk) => {
          if (document.querySelector(`input[field-key="${fk}"][name="currency"]`)) {
            inputsList.push(this.dadosVariaveis.dadosTransacao[fk]);
          }
        });

        let totalValue = 0;

        inputsList.map((x) => {
          totalValue += Number(x);
        });

        this.number_valor_transacao = totalValue;

        if (Object.keys(this.dadosVariaveis.dadosTransacao).length >= this.requiredFieldKeysIDs.length && this.dadosVariaveis.number_valor_transacao > 0) this.requiredFieldKeys = true;
        else this.requiredFieldKeys = false;
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions({
      cleanClient: "detran/cleanClient",
      newPayment: "detran/newPayment",
      saveTransaction: "detran/saveTransaction",
      updateRetornoAtivo: "transaction/updateRetornoAtivo",
    }),
    ...mapMutations(["startLoading", "finishLoading"]),
    showVariables(el) {
      this.parcelaSelecionada = el.parcela;
      this.dadosVariaveis.selectedInstallment = el;
      this.dadosVariaveis.selectedInstallment = this.parcelasSimulacao.options.filter(x => x.parcela == el.parcela);
    },
    getPicCartao(index) {
      return `/_nuxt/assets/img/${this.bandeiras_cartoes[index].imagem}`;
    },
    ftoggleRetornoLimpa(el) {
      $nuxt.$store.state.novaTransacao.retorno = null;
      this.ftoggleRetorno(el, "simulacao");
    },
    ftoggleRetorno(el, limpa) {
      if (limpa) {
        this.updateRetornoAtivo(el.target.id);
      }
      if (this.historyUrl == "/debitos-veiculares/detran/ipva") {
        this.dadosVariaveis.retornoAtivo = this.retornoAtivo;
      } else {
        this.dadosVariaveis.retornoAtivo = $nuxt.$store.state.novaTransacao.retorno === null ? el.target.id : $nuxt.$store.state.novaTransacao.retorno;
      }
      this.dadosVariaveis.selectedInstallment = $nuxt.$store.state.novaTransacao.parcelas != null ? $nuxt.$store.state.novaTransacao.parcelas : null;
      this.posicaoArrayRetornoFatores = el.target.id - 1;
      this.tabelaSimulacao();
    },
    getCoefficients() {
      const self = this;
      const el = { target: { id: 0 } };
      if (this.parcelaBefore != self.dadosVariaveis.transactionTypeID && this.dadosVariaveis.transactionTypeID != null) {
        this.controls.loading = true;
        this.$axios
          .get(`${process.env.API_TRANSACTION}/transaction/${self.dadosVariaveis.transactionTypeID}/coefficients`)
          .then((response) => {
            this.statusTransacao = 4;
            this.controls.loading = false;
            this.parcelaBefore = self.dadosVariaveis.transactionTypeID;
            this.preserveResponse = response;
            this.mountListInstallment(response);
            if (self.dadosVariaveis.transactionTypeID == 4) {
              this.ftoggleRetorno(el, null);
            }
          }).catch(err => console.log("Err:", err));
      } else {
        this.mountListInstallment(this.preserveResponse);
        if (self.dadosVariaveis.transactionTypeID == 4) {
          this.ftoggleRetorno(el, null);
        }
      }
    },
    mountListInstallment(coefficients) {
      const self = this;
      this.listaRetornos = [];
      self.listaCoeficientes = [];
      if (coefficients) {
        let nParcelas = coefficients.data.length;

        self.nRetornos = 0;
        coefficients.data.forEach((value, index) => {
          value.posicao = index;
          self.listaCoeficientes.push(value);
        });

        const rtypes = self.listaCoeficientes.map(x => x.rType);
        this.listaRetornos = uniq(rtypes);
        if (coefficients.data.length > 12) {
          self.nRetornos = coefficients.data.length / 12;
          nParcelas = 12;
        }

        if (self.nRetornos <= 1 || self.nRetornos == 0) {
          this.dadosVariaveis.retornoAtivo = 0;
        }
      }
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


      this.getGroupReturn(this.dadosVariaveis.retornoAtivo);


      if (this.listaRetornoFiltrado.length > 0) {
        this.parcelasSimulacao.options = [];
        for (const value of this.listaRetornoFiltrado) {
          value.installmentModeId = value.installmentModeId;
          valorParcela = this.number_valor_transacao / value.installmentModeId;
          valorParcelaComCoeficiente = this.number_valor_transacao * value.coefficient;

          totalComvalorParcelaComCoeficiente = valorParcelaComCoeficiente * value.installmentModeId;
          valorParcelaComCoeficienteNoRound = this.number_valor_transacao * value.coefficient;

          this.parcelasSimulacao.options.push({
            value: this.number_valor_transacao,
            parcela: value.installmentModeId,
            ParcelaComCoeficiente: valorParcelaComCoeficiente,
            valorParcelaOriginal: valorParcela,
            totalParcelas: totalComvalorParcelaComCoeficiente,
            parcelaOriginal: value.posicao,
            coeficienteTotal: value.coefficientTotal,
            rAliquot: value.rAliquot,
            coeficiente: value.coefficient,
            liberadoComCoeficiente: this.number_valor_transacao * (1 + (value.rAliquot / 100)),
          });

          if (self.dadosVariaveis.transactionTypeID == 4 || self.dadosVariaveis.transactionTypeID == 2) {
            self.parcelaSelecionada = self.parcelaSelecionada == 0 ? 1 : self.parcelaSelecionada;
          }

          if (self.dadosVariaveis.transactionTypeID == 1 || self.dadosVariaveis.transactionTypeID == 8) {
            self.parcelaSelecionada = 0;
            self.dadosVariaveis.selectedInstallment = {
              value: this.parcelasSimulacao.options[0].value,
              parcela: this.parcelasSimulacao.options[0].parcela,
              ParcelaComCoeficiente: this.parcelasSimulacao.options[0].ParcelaComCoeficiente,
              valorParcelaOriginal: this.parcelasSimulacao.options[0].valorParcelaOriginal,
              totalParcelas: this.parcelasSimulacao.options[0].totalParcelas,
              parcelaOriginal: this.parcelasSimulacao.options[0].parcelaOriginal,
              coeficienteTotal: this.parcelasSimulacao.options[0].coeficienteTotal,
              coeficiente: this.parcelasSimulacao.options[0].coeficiente,
            };
          }

          this.dadosVariaveis.selectedInstallment = this.parcelasSimulacao.options.filter(x => x.parcela == this.parcelaSelecionada);
        }
      }
    },
    fieldsOfServices() {
      const self = this;
      // self.dadosVariaveis.fieldsOfServices = [];
      if (self.statusTransacao < 3) {
        self.controls.loading = true;
        this.$axios
          .get(`${process.env.API_TRANSACTION}/service/${self.dadosVariaveis.serviceOptionType}/fields`)
          .then((response) => {
            self.fieldsOfServicesInputs = response.data;
            self.statusTransacao = 3;

            if (this.historyUrl == "/debitos-veiculares/detran/ipva") {
              self.externalTransaction = true;
              const numeric = self.fieldsOfServicesInputs.filter(x => x.typeContent == "Numeric");
              setTimeout(() => {
                self.fieldsOfServicesInputs.map((x, index) => {
                  if (x.fieldKeyTypeID == 3) {
                    self.dadosVariaveis.dadosTransacao[x.fieldKey] = this.totalDebits;
                    if (this.totalDebits != "") {
                      self.blockFields[x.fieldKey] = true;
                    }
                  }
                  if (x.fieldKeyTypeID == 4) {
                    self.dadosVariaveis.dadosTransacao[x.fieldKey] = this.fee;
                    if (this.fee != "") {
                      self.blockFields[x.fieldKey] = true;
                    }
                  }
                  if (x.fieldKeyTypeID == 49) {
                    self.dadosVariaveis.dadosTransacao[x.fieldKey] = this.renavan;
                    if (this.renavan != "") {
                      self.blockFields[x.fieldKey] = true;
                    }
                  }
                  if (x.fieldKeyTypeID == 51) {
                    self.dadosVariaveis.dadosTransacao[x.fieldKey] = this.estado;
                    if (this.estado != "") {
                      self.blockFields[x.fieldKey] = true;
                    }
                  }
                  if (x.fieldKeyTypeID == 21) {
                    self.dadosVariaveis.dadosTransacao[x.fieldKey] = this.cpfCnpj;
                    if (this.cpfCnpj != "") {
                      self.blockFields[x.fieldKey] = true;
                    }
                  }
                  if (x.fieldKeyTypeID == 37) {
                    self.dadosVariaveis.dadosTransacao[x.fieldKey] = this.placa;
                    if (this.placa != "") {
                      self.blockFields[x.fieldKey] = true;
                    }
                  }
                  if (x.fieldKeyTypeID == 32) {
                    // field "nome"
                    self.dadosVariaveis.dadosTransacao[x.fieldKey] = "";
                    // if (this.renavan != "") {
                    // self.blockFields[x.fieldKey] = true;
                    // }
                  }
                  if (x.fieldKeyTypeID == 24) {
                    self.dadosVariaveis.dadosTransacao[x.fieldKey] = this.email;
                    if (this.email != "") {
                      self.blockFields[x.fieldKey] = true;
                    }
                  }
                });
                self.controls.loading = false;
              }, 100);
            } else {
              self.controls.loading = false;
            }

            if ($nuxt.$store.state.criouSimulacao && !(this.historyUrl == "/debitos-veiculares/detran/ipva")) {
              const numeric = self.fieldsOfServicesInputs.filter(x => x.typeContent == "Numeric");
              setTimeout(() => {
                numeric.map((x, index) => {
                  if (index == numeric.length - 1) {
                    self.dadosVariaveis.dadosTransacao[x.fieldKey] = self.totalTransacao;
                  }
                });
                self.controls.loading = false;
              }, 100);
            } else {
              self.controls.loading = false;
            }
          }).catch(err => console.log("Err:", err));
        this.$axios
          .get(`${process.env.API_TRANSACTION}/service/${self.dadosVariaveis.serviceOptionType}/transactionTypes`)
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
      const md = this.$nuxt.$emit("toggleModal", data);
    },
    showNumberAsCurrency(number) {
      if (number) {
        const numero = number.toFixed(2).split(".");
        numero[0] = `${numero[0].split(/(?=(?:...)*$)/).join(".")}`;
        return numero.join(",");
      }
    },
    // envia dados do tipo de servico
    enviarDadosTransacao() {
      const self = this;
      let switchreleasedValue;
      let switchtransactionValue;
      let parcela;
      let tratParcela;

      if (!self.openTransaction) {
        self.openTransaction = true;
        self.btConcluirTransacao = true;

        const centroCusto = self.dadosVariaveis.transactionTypeID == 1 || self.dadosVariaveis.transactionTypeID == 4 ? "cliente" : "lojista";

        if (centroCusto == "cliente") {
          switchreleasedValue = self.dadosVariaveis.number_valor_transacao * (1 + (self.dadosVariaveis.selectedInstallment[0].rAliquot / 100));
          switchtransactionValue = self.dadosVariaveis.number_valor_transacao * self.dadosVariaveis.selectedInstallment[0].coeficienteTotal;
          parcela = self.dadosVariaveis.selectedInstallment[0].ParcelaComCoeficiente;
        } else {
          switchtransactionValue = self.dadosVariaveis.number_valor_transacao;
          switchreleasedValue = self.dadosVariaveis.number_valor_transacao * self.dadosVariaveis.selectedInstallment[0].coeficienteTotal;
          tratParcela = self.dadosVariaveis.selectedInstallment[0].parcela == 0 ? 1 : self.dadosVariaveis.selectedInstallment[0].parcela;
          parcela = self.dadosVariaveis.number_valor_transacao / tratParcela;
        }

        const finalizaTransacao = {
          affiliateId: $nuxt.$store.state.usuario.clientID,
          serviceType: self.dadosVariaveis.serviceOptionType,
          rType: self.dadosVariaveis.retornoAtivo,
          rAliquot: self.dadosVariaveis.selectedInstallment[0].rAliquot,
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
          finalizaTransacao.transactionData[f.fieldKey] = {
            fieldKey: f.fieldKey,
            typeContent: f.typeContent,
            fieldValue: self.dadosVariaveis.dadosTransacao[f.fieldKey],
          };
        });

        self.fieldsOfServicesInputs.map((f) => {
          finalizaTransacao.fieldKeys.push({
            fieldKey: f.fieldKey,
            typeContent: f.typeContent,
            fieldValue: self.dadosVariaveis.dadosTransacao[f.fieldKey],
          });
        });

        this.transactionObj = finalizaTransacao;

        this.concluirTransacao();
      }
    },

    clearTransaction() {
      $nuxt.$store.commit("criaSimulacao", false);
    },

    concluirTransacao() {
      // bloqueia botoes no modal
      this.pagando = true;

      // remove mensagens de alerta da resposta
      this.respostaText = null;
      this.respostaCode = null;

      // limpa simulação
      if ($nuxt.$store.state.criouSimulacao == true) {
        this.clearTransaction();
      }
      // https://local.listofacil.com.br:11574/

      const self = this;
      let externalForm;
      self.$axios.post(`${process.env.API_TRANSACTION}/transaction/create`, this.transactionObj).then(async (response) => {
        try {
          if (this.historyUrl == "/debitos-veiculares/detran/ipva") {
            await this.newPayment(response.data);
            this.saveTransaction(response.data);
          }
          self.formdata2 = JSON.stringify(response.data);
          this.sendServerHeaders(self.formdata2);
          this.modalControl({ api: "transacaostatus", modalContent: response.data });
          this.btConcluirTransacao = false;
          self.openTransaction = false;
        } catch (err) {
          this.btConcluirTransacao = false;
          self.openTransaction = false;
          this.modalControl({ api: "erro", modalContent: "Erro do servidor" });
          console.log(err);
        }
      }).catch((err) => { console.log("Err:", err.response); this.btConcluirTransacao = false; self.openTransaction = false; });
    },

    closeModal() {
      this.$nuxt.$emit("toggleModal", null);
    },

    sendServerHeaders() {
      const self = this;
      const url = self.formUrl.urlHttps;
      let objVerify;

      // url = this.protocolo === "http:" ? self.formUrl.url : self.formUrl.urlHttps;

      let resposta;
      let respostaServer;
      const dadosTransaction = JSON.parse(self.formdata2);
      const formData = new FormData();
      this.activateWindowBlock();
      formData.append("data", self.formdata2);
      const request = new XMLHttpRequest();

      request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          resposta = JSON.parse(this.response);

          self.closeModal();

          // console.log("transacaoresposta", resposta);

          self.$axios.put(`${process.env.API_TRANSACTION}/transaction/verify`, resposta).then((res) => {

          }).catch(err => console.log("Err:", err));

          self.modalControl({ api: "transacaoresposta", modalContent: resposta });

          // self.closeModal();
          self.respostaText = resposta.Message;
          self.respostaCode = resposta.Code;

          // resposta.Code -12 = aguarde o programa
          self.pagando = false;


          // console.log(resposta);
          if (self.respostaCode !== 0) {
            self.retentativa = true;
          }
        } else if (this.readyState == 4 && this.status == 0) {
          resposta = {
            AppVersion: "0", Answer: "0", Code: "0", Message: "Aplicativo não responde. Favor reiniciar o Listo Fácil.",
          };
          respostaServer = {
            AppVersion: "0", Answer: "0", Code: dadosTransaction.id, Message: "Aplicativo não responde. Favor reiniciar o Listo Fácil.",
          };
          self.closeModal();
          self.$axios.put(`${process.env.API_TRANSACTION}/transaction/verify`, respostaServer).then((res) => {

          }).catch(err => console.log("Err:", err));
          self.modalControl({ api: "transacaoresposta", modalContent: resposta });
          self.respostaText = "Aplicativo sem resposta";
          self.respostaCode = "0";
        }
      };

      request.open("POST", url, true);
      request.setRequestHeader("Accept", "*/*");
      request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      request.send(self.formdata2);
    },

    activateWindowBlock() {
      const unloadWindowEvent = window.attachEvent ? "onbeforeunload" : "beforeunload"; // / make IE7, IE8 compatible
      this.confirmExitlistenerID = Handler().addListener(window, unloadWindowEvent, this.confirmExitHandler);
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
  },

  computed: {
    ...mapState({
      debits: state => state.detran.debits,
      boletos: state => state.detran.boletos,
      userID: state => state.usuario.clientID,
      userName: state => state.usuario.userName,
      operation: state => state.detran.operation,
      serviceId: state => state.detran.serviceId,
      serviceName: state => state.detran.serviceName,
      totalDebits: state => state.detran.totalDebits,
      fee: state => state.detran.fee,
      generalData: state => state.detran.generalData,
      historyUrl: state => state.utils.historyUrl,
      placa: state => state.detran.placa,
      email: state => state.detran.email,
      renavan: state => state.detran.renavan,
      estado: state => state.detran.estado,
      cpfCnpj: state => state.detran.cpfCnpj,
      selectInstalment: state => state.transaction.selectInstalment,
      transactionTypeDetran: state => state.transaction.transactionType,
      retornoAtivo: state => state.transaction.retornoAtivo,
      typesOfservices: state => state.transaction.typesOfservices,
      // transactionType: state => state.transaction.transactionTypes,
      fields: state => state.transaction.fields,
    }),
    requiredFieldKeysIDs() {
      return this.fieldsOfServicesInputs.map((input) => {
        if (input.isRequired) { return input.fieldKey; }
      });
    },
  },
};
</script>
