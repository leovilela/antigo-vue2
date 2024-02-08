<template>
  <section class="page-resultado-auto--simulacao">
    <div  v-if="debits.result">
    <div v-if="debits.result.tributos">
      <div  v-if="debits.result.tributos.length > 0">
        <div id="pre-cadastro">
          <div class="panel panel-default">
            <div class="panel-heading">
              <span>{{$t('titles.resultadosDaBusca')}}</span>
            </div>
            <div class="panel-body tableResultado">
              <form @submit.prevent="handleSubmit">
              <table class="tableResultado" v-if="debits.result">
                <thead class="row">
                  <th class="col-xs-1" id="codBarras">
                    <Base-Checkbox name="checkAll" v-model.trim="checkAll"><span class="bold">Todos</span></Base-Checkbox>
                    </th>
                  <th class="col-xs-5 descricao">
                    {{ $t('labels.detran.descricao') }}
                  </th>

                  <th class="col-xs-3" id="vencimento">{{ $t('labels.detran.vencimento') }}</th>
                  <th class="col-xs-3 valor" id="valor" align="right">{{ $t('labels.detran.valor') }}</th>
                </thead>
                <tbody>
                  <tr>
                    <td colspan="5">
                      <div class="row" id="first">
                        <div class="displayRowFiltros"><span class="bold labelFiltros">Filtros:</span>  </div>
                        <div class="displayRowFiltros"  v-for="item in filters" v-bind:key="item">
                        <Base-Checkbox name="boleto" :id="item" v-model.trim="detran.activeFilters" :native-value="{valor: item}" :label="item" ></Base-Checkbox><label :for="item">{{$t('labels.detran.'+item)}}</label></div>
                      </div>
                    </td>
                  </tr>
                  <tr class="row" v-for="item in debits.result.tributos" v-bind:key="item.codBarra" v-if="filtroTributo(item.filterOT) && item.filterOT != 'ipva'">
                    <td class="col-xs-1"><Base-Checkbox :ref="item.codDebito+'boleto'" name="item" v-model.trim="$v.detran.boletos.$model" :native-value="{valorDesconto: item.valorDesconto, filterOT: item.filterOT, valorJuros: item.valorJuros,valorMulta: item.valorMulta, valorOriginal: item.valorOriginal, codDebito: item.codDebito, codSetor: item.codSetor, descricao: item.descricao, valor: item.valor, vencimento: item.vencimento, codBarra: item.codBarra, operationType: item.operationType, ano: item.ano}" ></Base-Checkbox></td>
                    <td class="col-xs-5">{{ item.descricao }}</td>
                    <td class="col-xs-3">{{ formatDate(item.vencimento) }}</td>
                    <td class="col-xs-3" align="right">{{ item.valor | currency }}</td>
                  </tr>
                  <tr class="row" v-for="item in debits.result.tributos" v-bind:key="item.codBarra" v-if="filtroTributo(item.filterOT) && item.filterOT == 'ipva'">

                    <td colspan="2">
                      <div class="col-xs-2">
                        <label v-if="item.parcelaUnica.codDebito"><Base-Checkbox name="item" :ref="'ipva'+item.ano" v-model.trim="detran.activeIpva[item.ano]" :value="detran.activeIpva[item.ano]" @input="removeAllContainerPayments({codDebito: mountParcelas(item), ano:item.ano}); fcheckTypePayment( item.parcelaUnica.codDebito, detran.typePaymentVista); checkTypePaymentClick($event, item)" ></Base-Checkbox></label>

                        <label v-else-if="item.parcela1.codDebito"><Base-Checkbox name="item" :ref="'ipva'+item.ano" v-model.trim="detran.activeIpva[item.ano]" :value="detran.activeIpva[item.ano]" @input="removeAllContainerPayments({codDebito: mountParcelas(item), ano:item.ano}); fcheckTypePayment( item.parcela1.codDebito, detran.typePaymentVista); checkTypePaymentClick($event, item)" ></Base-Checkbox></label>

                        <label v-else-if="item.parcela2.codDebito"><Base-Checkbox name="item" :ref="'ipva'+item.ano" v-model.trim="detran.activeIpva[item.ano]" :value="detran.activeIpva[item.ano]" @input="removeAllContainerPayments({codDebito: mountParcelas(item), ano:item.ano}); fcheckTypePayment( item.parcela2.codDebito, detran.typePaymentVista); checkTypePaymentClick($event, item)" ></Base-Checkbox></label>

                        <label v-else><Base-Checkbox name="item" :ref="'ipva'+item.ano" v-model.trim="detran.activeIpva[item.ano]" :value="detran.activeIpva[item.ano]" @input="removeAllContainerPayments({codDebito: mountParcelas(item), ano:item.ano}); fcheckTypePayment( item.parcela3.codDebito, detran.typePaymentVista); checkTypePaymentClick($event, item)" ></Base-Checkbox></label>
                      </div>
                      <div class="col-xs-5"><span class="cxLabel">{{ $t('labels.detran.ipva') }} {{item.ano}}</span></div>
                      <div class="col-xs-3">
                            <div v-show="detran.activeIpva[item.ano]">
                              <div v-if="item.parcelaUnica.codBarra">
                                <span>{{detran.typePayment[item.ano]}}</span>
                                <Base-Radio :ref="item.ano+'a-vista'" :id="item.ano+'a-vista'" :name="item.ano+''+item.filterOT" class="form__input" :label="$t('labels.detran.aVista')"
                                  :value="$v.detran.boletos.$model" @input="insertPaymets($event);removeParceladoPayment($event)" :native-value="returnNativeValueTypePayment(item,detran.typePaymentVista)" >
                                {{$t('labels.detran.aVista')}}
                                </Base-Radio>
                              </div>
                            </div>
                      </div>
                      <div class="col-xs-3">
                            <div  v-show="detran.activeIpva[item.ano]">
                              <span v-show="item.parcela1.valor || item.parcela2.valor || item.parcela3.valor">
                              <Base-Radio :ref="item.ano+'parcelado'" id="parcelado"  :name="item.ano+''+item.filterOT"  class="form__input" @input="ativarParcelas($event, item)" :label="$t('labels.detran.parcelado')"  :native-value="returnNativeValueTypePayment(item,detran.typePaymentParcelado)">{{$t('labels.detran.parcelado')}}
                              </Base-Radio>
                            </span>
                          </div>
                      </div>

                      <div  class="col-xs-12">
                                <div class="col-xs-4" v-show="detran.typePaymentTransactionActive[item.parcela1.codDebito] == detran.typePaymentParcelado">
                                  <span v-show="item.parcela1.valor"><Base-Checkbox :ref="item.ano+'parcela1'" name="boleto" v-model.trim="$v.detran.boletos.$model" :native-value="{parcela: item.parcela1.parcela, valorDesconto: item.parcela1.valorDesconto, filterOT: item.filterOT, valorJuros: item.parcela1.valorJuros, valorMulta: item.parcela1.valorMulta, valorOriginal: item.parcela1.valorOriginal, codDebito: item.parcela1.codDebito, codSetor: item.parcela1.codSetor, descricao: item.parcela1.descricao, valor: item.parcela1.valor, vencimento: item.parcela1.vencimento, codBarra: item.parcela1.codBarra, operationType: item.parcela1.operationType, ano: item.parcela1.ano}"></Base-Checkbox><label for="">{{$t('labels.detran.parcela1')}}</label></span>


                                </div>
                                <div class="col-xs-4" v-show="detran.typePaymentTransactionActive[item.parcela2.codDebito] == detran.typePaymentParcelado">
                                  <span v-show="item.parcela2.valor">
                                    <Base-Checkbox :ref="item.ano+'parcela2'" name="boleto" v-model.trim="$v.detran.boletos.$model" :native-value="{parcela: item.parcela2.parcela, valorDesconto: item.parcela2.valorDesconto, filterOT: item.filterOT, valorJuros: item.parcela2.valorJuros, valorMulta: item.parcela2.valorMulta, valorOriginal: item.parcela2.valorOriginal, codDebito: item.parcela2.codDebito, codSetor: item.parcela2.codSetor, descricao: item.parcela2.descricao, valor: item.parcela2.valor, vencimento: item.parcela2.vencimento, codBarra: item.parcela2.codBarra, operationType: item.parcela2.operationType, ano: item.parcela2.ano}" ></Base-Checkbox><label for="">{{$t('labels.detran.parcela2')}}</label>
                                  </span>

                                </div>
                                <div class="col-xs-4" v-show="detran.typePaymentTransactionActive[item.parcela3.codDebito] == detran.typePaymentParcelado">
                                  <span v-show="item.parcela3.valor">
                                    <Base-Checkbox :ref="item.ano+'parcela3'" name="boleto" v-model.trim="$v.detran.boletos.$model" :native-value="{parcela: item.parcela3.parcela, valorDesconto: item.parcela3.valorDesconto, filterOT: item.filterOT, valorJuros: item.parcela3.valorJuros, valorMulta: item.parcela3.valorMulta, valorOriginal: item.parcela3.valorOriginal, codDebito: item.parcela3.codDebito, codSetor: item.parcela3.codSetor, descricao: item.parcela3.descricao, valor: item.parcela3.valor, vencimento: item.parcela3.vencimento, codBarra: item.parcela3.codBarra, operationType: item.parcela3.operationType, ano: item.parcela3.ano}" ></Base-Checkbox><label for="">{{$t('labels.detran.parcela3')}}</label>
                                  </span>

                                </div>

                        </div>
                    </td>
                    <td class="col-xs-3"  valign="center">
                      <span v-if="detran.typePaymentTransactionActive[item.parcelaUnica.codDebito] != detran.typePaymentParcelado">
                        <div v-if="item.parcelaUnica.vencimento">
                        <div>{{ formatDate(item.parcelaUnica.vencimento) }}</div>
                        </div>
                        <div v-else>&nbsp;</div>
                      </span>
                    </td>
                    <td class="col-xs-3"  valign="center" align="right">
                        <span v-if="detran.typePaymentTransactionActive[item.parcelaUnica.codDebito] != detran.typePaymentParcelado">
                        <div v-if="item.parcelaUnica.valor">{{ item.parcelaUnica.valor | currency }}</div>
                        <div v-else>&nbsp;</div>
                        </span>
                        <span>
                        <div>{{detran.sumParcelas[mountParcelas(item)] | currency}}</div>
                        </span>
                    </td>
                  </tr>
                </tbody>
                <tfoot v-if="valorTotalC > 0">
                  <tr>
                    <td colspan=5>

                        <div class="col-xs-3">
                          <Base-FormMoneyGroup placeholder="R$ 0,00" label="Honorários" id="fee" name="fee" type="text"  :class="{'form__field__error': $v.detran.fee.$error}" class="form__input"  v-model="$v.detran.fee.$model" v-bind="money">
                          <label for="fee" class="error" v-if=" $v.detran.fee.$error">Valor negativo não aceito</label>
                          </Base-FormMoneyGroup>

                        </div>


                      <div class="col-xs-6" style="padding-top:25px">
                        <fieldset v-for="(custo, index) in transactionTypes" :key="index" class="col-xs-6">
                            <label class="" :for="custo.transactionTypeID"><input type="radio" name="transaction" v-model="detran.transactionTypeID" :id="custo.transactionTypeID" :value="custo.transactionTypeID"><span>{{custo.transactionTypeName}}</span></label>

                        </fieldset>
                      </div>
                      <div class="col-xs-3 valorTotal align-middle" style="padding-top:30px" align="right">
                        <span style="font-weight: bold">{{$t('labels.detran.valorTotal')}}: {{valorTotalC | currency}}</span>
                      </div>
                    </td>

                  </tr>
                </tfoot>
              </table>
              <div class="row">
                  <div class="btn-wrapper col-xs-3 col-xs-offset-9">
                    <Base-Button type="submit" :disabled="!passoSeguinte || $v.detran.$error" >{{$t('buttons.simular')}}</Base-Button>
                  </div>
                </div>
                </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-else>
        <div id="pre-cadastro" class="col-xs-12">
          <Base-Alert type="danger" ><strong>{{debits.result}}</strong></Base-Alert>
        </div>
    </div>
    </div>

    <div class="row">
        <div class="col-xs-12">
          <transition name="fade">
            <Base-Modal v-show="ishaveFee" class="formalizacao">
              <template #header>
                <img src="~assets/img/logo-listo.png" alt="" />
              </template>
              <template #body>
                <h3>E seus honorários?</h3>
                <p>Você deseja simular esta operação<br> sem incluir seus honorários?</p>
              </template>
              <template #footer>
                <Base-Button
                  class="btn-modal-fechar"
                  aria-label="Ver relatório"
                  @click="closeModal"
                >
                  Voltar e Incluir
                </Base-Button>
                <Base-Button
                  class="btn-modal-fechar"
                  aria-label="Imprimir"
                  @click="feeContinue = true; handleSubmit(); closeModal(); "
                >
                  Continuar
                </Base-Button>
              </template>
            </Base-Modal>
          </transition>
        </div>
      </div>
  </section>
</template>

<script>
/* eslint-disable func-names */
import {
  required, helpers, minValue,
} from "vuelidate/lib/validators";

import { mapState, mapActions, mapMutations } from "vuex";

import {
  showNumberAsCurrency,
} from "~/utils/currency.utils";


export default {
  data() {
    return {
      parc: 0,
      errorConsult: "",
      ishaveFee: false,
      feeContinue: false,
      checkAll: false,
      detran: {
        nameOperation: "debitosVeiculares",
        transactionTypeID: false,
        generalData: {},
        operation: 0,
        fee: 0,
        serviceId: 0,
        boletos: [],
        totalDebits: 0,
        valorTotal: 0,
        activeIpva: {},
        typePayment: {},
        typePaymentTransactionActive: {},
        typePaymentVista: "vista",
        typePaymentParcelado: "parcelado",
        sumParcelas: {},
        parcelas: [{ nameParc: "parcelaUnica" }, { nameParc: "parcela1" }, { nameParc: "parcela2" }, { nameParc: "parcela3" }],
        dadosVeiculo: {
          ano: null,
          chassi: null,
          cor: null,
          marca: null,
          mensagem: null,
          renavan: null,
          valorVenal: null,
        },
        activeFilters: [{ valor: "multas" }, { valor: "seguro_obrigatorio" }, { valor: "licenciamento" }, { valor: "ipva" }, { valor: "outros" }],
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
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        suffix: " ",
        precision: 2,
        masked: false,
      },
    };
  },
  validations: {
    detran: {
      boletos: {
        required,
      },
      fee: {
        minValue: minValue(0),
      },
    },
  },
  filters: {
    removeMask(value) {
      if (!value) {
        return;
      }
      return value.replace(/[^\d]/g, "");
    },
    currency(value) {
      if (!value) {
        return;
      }
      return showNumberAsCurrency(value);
    },
  },
  destroyed() {
    // this.cleanClient();
  },
  computed: {
    ...mapState({
      debits: state => state.detran.debits,
      boletos: state => state.detran.boletos,
      userID: state => state.usuario.clientID,
      userName: state => state.usuario.userName,
      operation: state => state.detran.operation,
      fee: state => state.detran.fee,
      serviceId: state => state.detran.serviceId,
      totalDebits: state => state.detran.totalDebits,
      filters: state => state.detran.filters,
      transactionTypes: state => state.transaction.transactionTypes,
      typeTransaction: state => state.detran.typeTransaction,
      installment: state => state.detran.installment,
      retorno: state => state.detran.retorno,
      statusBusca: state => state.detran.statusBusca,
    }),

    passoSeguinte() {
      if (!(this.detran.boletos.length >= 1 && this.detran.transactionTypeID)) {
        return false;
      }
      return true;
    },

    boletosLenght() {
      return this.detran.boletos.length < 1;
    },
    valorTotalC() {
      let valorT = 0;
      this.detran.boletos.forEach((value, index) => {
        if (!value.valor) return;
        valorT += value.valor;
      });
      return valorT;
    },
    checkTypePayment() {
      const v = false;
      return v;
    },
  },
  watch: {
    // eslint-disable-next-line func-names
    "detran.boletos": function (newValue, oldValue) {
      if (newValue.length <= 0) {
        // this.detran.activeIpva = [];
        this.checkAll = false;
      }

      this.fnSumParcelas();
    },
    debits(newValue, oldValue) {
      if (!newValue) {
        this.detran.boletos = [];
      }
    },
    "debits.result.tributos": function (newValue, oldValue) {
      if (this.debits.length <= 0) { this.detran.fee = 0; this.detran.transactionTypeID = false; }
      this.detran.activeFilters = [{ valor: "multas" }, { valor: "seguro_obrigatorio" }, { valor: "licenciamento" }, { valor: "ipva" }, { valor: "outros" }];
    },
    "detran.fee": function (newValue, oldValue) {
      this.feeContinue = false;
      this.saveTotalValue(0);
    },
    "detran.transactionTypeID": function (newValue, oldValue) {
      this.feeContinue = false;
      this.saveTransactionType(this.detran.transactionTypeID);
      this.saveTotalValue(0);
      this.updateRetornoAtivo(0);
    },
    "detran.activeFilters": function (newValue, oldValue) {
      this.detran.boletos = [];
      this.detran.activeIpva = [];
      this.detran.typePaymentTransactionActive = {};
      this.checkAll = false;
      return false;
    },
    valorTotalC(newValue, oldValue) {
      this.feeContinue = false;
      this.saveTotalValue(0);
    },
    checkAll(newValue, oldValue) {
      let position = {};
      if (newValue) {
        if (!this.debits.result) return;
        this.debits.result.tributos.forEach((item, index) => {
          position = {
            valorDesconto: item.valorDesconto, valorJuros: item.valorJuros, valorMulta: item.valorMulta, filterOT: item.filterOT, valorOriginal: item.valorOriginal, codDebito: item.codDebito, codSetor: item.codSetor, descricao: item.descricao, valor: item.valor, vencimento: item.vencimento, codBarra: item.codBarra, operationType: item.operationType, ano: item.ano,
          };
          if (!item.ipva) {
            this.detran.activeFilters.forEach((itemFilter, index) => {
              if (itemFilter.valor == item.filterOT) {
                this.detran.boletos.push(position);
              }
            });
          } else {
            this.detran.activeFilters.forEach((itemFilter, index) => {
              if (itemFilter.valor == item.filterOT) {
                this.detran.activeIpva[item.ano] = true;
                for (const key of Object.keys(this.$refs)) {
                  if (this.$refs[key].length) {
                    if (this.$refs[key][0].$el.children[0].name == "item") {
                      if (!this.$refs[key][0].$el.children[0].checked) {
                        this.$refs[key][0].$el.children[0].click();
                      }
                    }
                  }
                }
              }
            });
          }
        });
      } else {
        this.detran.boletos = [];
        this.detran.activeIpva = [];
        this.detran.typePaymentTransactionActive = {};
        for (const key of Object.keys(this.$refs)) {
          if (this.$refs[key].length) {
            if (this.$refs[key][0].$el.children[0].name == "item") {
              if (this.$refs[key][0].$el.children[0].checked) {
                this.$refs[key][0].$el.children[0].checked = false;
              }
            }
          }
        }
      }
    },
  },
  async mounted() {
    try {
      this.startLoading();
      await this.getTypeTransactions();
      this.finishLoading();
    } catch (error) {
      console.warn({ error });
      this.finishLoading();
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
  methods: {
    ...mapActions({
      saveBoletos: "detran/saveBoletos",
      getTransactionCoefficients: "transaction/getTransactionCoefficients",
      saveTotalValue: "transaction/saveTotalValue",
      saveTransactionType: "transaction/saveTransactionType",
      updateRetornoAtivo: "transaction/updateRetornoAtivo",
      getTypeTransactions: "detran/getTypeTransactions",
    }),
    ...mapMutations(["startLoading", "finishLoading"]),
    alterTypePayment(el, value) {
      el = value;
    },
    checkFilters() {
      this.detran.boletos.includes();
    },
    closeModal() {
      this.ishaveFee = false;
    },
    filtroTributo(value) {
      const lenghtActiveFilters = this.detran.activeFilters;
      if (lenghtActiveFilters.length <= 0) {
        // return true;
      }
      const result = this.detran.activeFilters.find(filter => filter.valor === value);

      if (result) {
        return true;
      }
      return false;
    },
    formatDate(data) {
      const d = new Date(data);
      const dateFormated = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
      return dateFormated;
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    async getCoefficients() {
      await this.getTransactionCoefficients(this.detran.transactionTypeID);
    },
    jump(hash) { location.replace(`#${hash}`); },
    async handleSubmit() {
      try {
        this.startLoading();
        if (this.detran.fee === 0 && !this.feeContinue) {
          this.ishaveFee = true;
          this.finishLoading();
          return;
        }
        const d = new Date();
        this.detran.urlOrigin = window.location.pathname;
        this.detran.operation = this.userID + this.userName + d.getTime();
        this.detran.totalDebits = this.valorTotalC;
        this.detran.typeTransaction = this.detran.transactionTypeID;
        this.detran.retorno = 0;
        this.detran.generalData = {
          ano: this.debits.result.ano,
          chassi: this.debits.result.chassi,
          cor: this.debits.result.cor,
          marca: this.debits.result.marca,
          mensagem: this.debits.result.mensagem,
          renavam: this.debits.result.renavam,
          tributos: this.debits.result.tributos,
          valorVenal: this.debits.result.valorVenal,
          placa: this.debits.result.placa,
          restricao: this.debits.result.restricao,
          roubo: this.debits.result.roubo,
          situacao: this.debits.result.situacao,
          municipioEmplacamento: this.debits.result.municipioEmplacamento,
        };

        const objc = { ...this.detran };
        // objc.cpfCnpj = this.$options.filters.removeMask(objc.cpfCnpj);
        if (this.saveBoletos(objc)) {
        // this.$router.push("/nova-transacao");
          this.jump("top");

          if (this.detran.totalDebits <= 0) {
            this.saveTotalValue(0);
            this.saveTransactionType(false);
          } else {
            await this.getCoefficients();
            this.saveTotalValue(this.detran.totalDebits + this.detran.fee);
            this.saveTransactionType(this.detran.transactionTypeID);
          }
          // this.saveTransactionType(this.detran.transactionTypeID);

          this.finishLoading();
          this.$emit("onSimulacaoIpva", { stepName: "SimulacaoDetran", target: objc });
        }
      // this.$emit("onFinishpagamentoIpva");
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
    insertPaymets(event) {
      const type = event.typePaymentComponent;

      if (!type) {
        this.fcheckTypePayment(event.codDebito, "vista");
        if (this.detran.boletos.some(boleto => boleto.codBarra === event.codBarra)) return;
        this.detran.boletos.push(event);
      }
    },
    insertVistaPayment(event) {
      if (this.detran.boletos.some(boleto => boleto.codBarra === event.codBarra)) return;
      this.detran.boletos.push(event);
    },

    removeVistaPayment(event) {
      if (!this.detran.boletos.some(boleto => boleto.codDebito === event.codDebito)) return;
      this.detran.boletos = this.detran.boletos.filter(boleto => boleto.codDebito !== event.codDebito);
    },
    removeParceladoPayment(event) {
      if (!this.detran.boletos.some(boleto => (boleto.parcela !== 0 && boleto.codDebito === event.codDebito))) return;
      this.detran.boletos = this.detran.boletos.filter(boleto => !boleto.parcela);
    },
    removeAllContainerPayments(event) {
      const labelItemLabel = this.$refs[`${event.ano}a-vista`] ? `${event.ano}a-vista` : `${event.ano}parcelado`;
      if (this.$refs[labelItemLabel]) {
        if (!this.$refs[labelItemLabel][0].$el) return;
        this.$refs[labelItemLabel][0].$el.children[1].checked = false;
      }
      if (!this.detran.boletos.some(boleto => boleto.codDebito === event.codDebito)) return;
      this.detran.boletos = this.detran.boletos.filter(boleto => boleto.codDebito !== event.codDebito);
    },
    fcheckTypePayment(cod, type) {
      this.detran.typePaymentTransactionActive[cod] = type;
    },

    checkTypePaymentClick(event, item) {
      const labelItemLabel = this.$refs[`${item.ano}a-vista`] ? `${item.ano}a-vista` : `${item.ano}parcelado`;
      const parcelas = this.$refs[`${item.ano}a-vista`] ? false : true;
      const parcela1 = `${item.ano}parcela1`;
      const parcela2 = `${item.ano}parcela2`;
      const parcela3 = `${item.ano}parcela3`;
      if (event) {
        this.detran.activeIpva[item.ano] = true;
        if (this.$refs[labelItemLabel]) {
          if (this.$refs[labelItemLabel][0]) {
            this.$refs[labelItemLabel][0].$el.children[1].click();
            if (labelItemLabel === `${item.ano}a-vista`) return;
            if (parcelas) {
              if (item.parcela1.valor) {
                this.$refs[parcela1][0].$el.children[0].click();
                return;
              }
              if (item.parcela2.valor) {
                this.$refs[parcela2][0].$el.children[0].click();
                return;
              }
              if (item.parcela3.valor) {
                this.$refs[parcela3][0].$el.children[0].click();
              }
            }
          }
        }
      } else if (this.$refs[labelItemLabel]) {
        this.$refs[labelItemLabel][0].$el.children[1].checked = false;
        if (!this.detran.boletos.some(boleto => boleto.codDebito === event.codDebito)) return;
        this.detran.boletos = this.detran.boletos.filter(boleto => boleto.codDebito !== event.codDebito);
      }
    },

    ativarParcelas(event, item) {
      const parcela1 = `${item.ano}parcela1`;
      const parcela2 = `${item.ano}parcela2`;
      const parcela3 = `${item.ano}parcela3`;
      if (item.parcela1.codDebito) {
        this.removeVistaPayment(event);
        this.fcheckTypePayment(item.parcela1.codDebito, this.detran.typePaymentParcelado);
        this.detran.boletos.push(item.parcela1);
        return false;
      }
      if (item.parcela2.codDebito) {
        this.removeVistaPayment(event);
        this.fcheckTypePayment(item.parcela2.codDebito, this.detran.typePaymentParcelado);
        this.detran.boletos.push(item.parcela2);
        return false;
      }
      if (item.parcela3.codDebito) {
        this.removeVistaPayment(event);
        this.fcheckTypePayment(item.parcela3.codDebito, this.detran.typePaymentParcelado);
        this.detran.boletos.push(item.parcela3);
        return false;
      }
    },

    returnNativeValueTypePayment(item, type) {
      let nameParcela = "parcelaUnica";
      let str = {};
      if (type === this.detran.typePaymentParcelado) {
        if (item.parcela1.codDebito) {
          nameParcela = "parcela1";
        } else if (item.parcela2.codDebito) {
          nameParcela = "parcela2";
        } else {
          nameParcela = "parcela3";
        }
        str = {
          parcela: item[nameParcela].parcela, codBarra: item[nameParcela].codBarra, valor: item[nameParcela].valor, typePaymentComponent: this.detran.typePaymentParcelado, codDebito: item[nameParcela].codDebito,
        };
      } else {
        str = {
          parcela: item[nameParcela].parcela, filterOT: item.filterOT, valorDesconto: item[nameParcela].valorDesconto, valorJuros: item[nameParcela].valorJuros, valorMulta: item[nameParcela].valorMulta, valorOriginal: item[nameParcela].valorOriginal, codDebito: item[nameParcela].codDebito, codSetor: item[nameParcela].codSetor, descricao: item[nameParcela].descricao, valor: item[nameParcela].valor, vencimento: item[nameParcela].vencimento, codBarra: item[nameParcela].codBarra, operationType: item[nameParcela].operationType, ano: item[nameParcela].ano,
        };
      }
      return str;
    },

    mountParcelas(item) {
      const arrayPos = [];
      const reducer = (accumulator, currentValue) => {
        if (currentValue !== null) {
          accumulator = currentValue;
        }
        return accumulator;
      };
      if (item.parcelaUnica.codDebito) {
        arrayPos.push(item.parcelaUnica.codDebito);
      }
      if (item.parcela1.codDebito) {
        arrayPos.push(item.parcela1.codDebito);
      }
      if (item.parcela2.codDebito) {
        arrayPos.push(item.parcela2.codDebito);
      }
      if (item.parcela3.codDebito) {
        arrayPos.push(item.parcela3.codDebito);
      }
      return arrayPos.reduce(reducer);
    },

    fnSumParcelas() {
      let boletoRefer = null;
      this.detran.sumParcelas = this.detran.boletos.reduce((acc, boleto, index) => {
        boletoRefer = boleto;
        let key = `${boletoRefer.codDebito}`;
        if (boletoRefer.codDebito === boleto.codDebito && boleto.parcela > 0) {
          if (!acc[key]) {
            acc[key] = 0;
          }
          acc[key] = boleto.valor + acc[key];
        }

        boletoRefer = boleto;
        key = `${boletoRefer.codDebito}`;
        return acc;
      }, {});
    },
  },
};
</script>

<style lang="less" scoped>
  @import "~assets/vars.less";
  .page-resultado {
    .panel {
      &-default {
        .panel-heading {
          background-color: @color1;
          color: @color2;
        }
      }
    }
  }
  .error{
    color:red;
  }
  .cxLabel{
    display: inline-block;
    height: 30px;
    margin: 3px 0;
    padding: 7px 0;
  }
  .page-resultado-auto {
    padding-top: 32px;
  }
  button {
    background: #000;
    color: @color7;
    text-transform: uppercase;
  }
  .descricao{
    margin:10px 0;
    text-align: center;
  }
  .displayRowFiltros{
    display: inline;
    padding-right: 15px;
  }
  .valor{
    text-align: right;
  }
  .bold{
    font-weight: bold;
  }
  .mt10{
    margin-top:10px;
  }
  .tableResultado {
    table {
      width: 100%;
      display: block;
      & > thead {
        border-bottom: 1px solid @color10;
        border-top: 1px solid @color10;

        th {
          // text-align: left;
          padding: 5px 10px;
          // padding-right: 15px;
          // padding-left: 15px;

          &#codBarras {
            max-width: 40px;
            padding: 5px 0;
          }

          &#descricao{
            min-width: 455px;

            @media (min-width: @screen-lg-min) {
              // width: 33%;
            }
          }

          &#vencimento {
            min-width: 100px;
          }

          &#valor {
            width: 100%;
          }
        }
      }

      &> tbody {
        tr {
          &:nth-child(odd) {
            background-color: @color18;
          }
          td{
            white-space:nowrap;
            div#first{
              margin:10px;
            }
          }
        }
      }

      &> tfoot {
        tr{
          td {
            &.valorTotal{

                font-family: @mainFontBold;
                font-size: @ftSizeNormal;
                margin: 0;
                padding: 0;
                padding-bottom: 5px;

            }
          }
        }
      }
    }
  }

</style>
