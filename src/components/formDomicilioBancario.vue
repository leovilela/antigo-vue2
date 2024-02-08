<template>
  <div id="formDomicilioBancario" class="container-fluid">
    <div id="forms-container" v-if="!controls.loading">
      <form id="form-editar"  autocomplete="off" class="row" v-on:submit.prevent v-if="enableEdit">
        <div id="forms" class="row">
          <div id="resumoDomicilio" class="col-xs-12 col-md-6">

            <div class="secao">
              <label for="bank">{{text.form_banco}}</label>
              <select id="bank" v-model="content.domicilios[controls.currentBank].bankID" disabled>
                <option value="disabled" disabled hidden>{{ text.form_escolhaBanco }}</option>
                <option v-for="(banco, index) in content.bancos" :key="index" :value="banco.ID">{{banco.Name}}</option>
              </select>
               <span v-if="!controls.submitStatus && content.editarBanco[controls.currentBank].exchangeRequest" class="form-invalid financialExchangeRequestText">{{getBankDataFrom(content.editarBanco[controls.currentBank].exchangeRequest.bankID)}}</span>
            </div>

            <div class="secao pt-15">
              <fieldset>
                <legend>{{text.form_natureza}}</legend>
                <label class="col-xs-6" for="correnteDisabled"><input type="radio" id="correnteDisabled" disabled value="1" :checked="content.domicilios[controls.currentBank].accountTypeID == 1 || content.domicilios[controls.currentBank].accountTypeID == 2">{{text.form_corrente}}</label>
                <label class="col-xs-6" for="poupancaDisabled"><input type="radio" id="poupancaDisabled" disabled value="0" :checked="content.domicilios[controls.currentBank].accountTypeID == 3 || content.domicilios[controls.currentBank].accountTypeID == 4">{{text.form_poupanca}}</label>
              </fieldset>

              <fieldset>
                <legend>{{text.form_tipo}}</legend>
                <label class="col-xs-6" for="individualDisabled"><input type="radio" id="individualDisabled" disabled value="0" :checked="content.domicilios[controls.currentBank].accountTypeID == 1 || content.domicilios[controls.currentBank].accountTypeID == 3">{{text.form_individual}}</label>
                <label class="col-xs-6" for="conjuntaDisabled"><input type="radio" id="conjuntaDisabled" disabled value="1" :checked="content.domicilios[controls.currentBank].accountTypeID == 2 || content.domicilios[controls.currentBank].accountTypeID == 4">{{text.form_conjunta}}</label>
              </fieldset>
               <span v-if="!controls.submitStatus && content.editarBanco[controls.currentBank].exchangeRequest" class="form-invalid financialExchangeRequestText">{{getExchangeAccountTypeFrom(content.editarBanco[controls.currentBank].exchangeRequest.accountTypeID)}}</span>
            </div>

            <div class="secao pt-15">
              <div class="row">
                <div class="col-xs-8 col-sm-8 col-md-8">
                  <label for="agencia">{{text.form_agencia}}</label>
                  <input type="text" id="agencia" :value="content.domicilios[controls.currentBank].agency" disabled>
                   <span v-if="!controls.submitStatus && content.editarBanco[controls.currentBank].exchangeRequest" class="form-invalid financialExchangeRequestText">{{content.editarBanco[controls.currentBank].exchangeRequest.agency}}</span>
                </div>
                <div class="col-xs-4 col-sm-4 col-md-4">
                  <label for="agenciadv">{{text.form_dv}}</label>
                  <input type="text" id="agenciadv" :value="content.domicilios[controls.currentBank].agencyCode" disabled>
                   <span v-if="!controls.submitStatus && content.editarBanco[controls.currentBank].exchangeRequest" class="form-invalid financialExchangeRequestText">{{content.editarBanco[controls.currentBank].exchangeRequest.agencyCode}}</span>
                </div>
              </div>
              <div class="row">
                <div class="col-xs-8 col-sm-8 col-md-8">
                  <label for="conta">{{text.form_conta}}</label>
                  <input type="text" id="conta" :value="content.domicilios[controls.currentBank].account" disabled>
                   <span v-if="!controls.submitStatus && content.editarBanco[controls.currentBank].exchangeRequest" class="form-invalid financialExchangeRequestText">{{content.editarBanco[controls.currentBank].exchangeRequest.account}}</span>
                </div>
                <div class="col-xs-4 col-sm-4 col-md-4">
                  <label for="ccdv">{{text.form_dv}}</label>
                  <input type="text" id="ccdv" :value="content.domicilios[controls.currentBank].accountCode" disabled>
                   <span v-if="!controls.submitStatus && content.editarBanco[controls.currentBank].exchangeRequest" class="form-invalid financialExchangeRequestText">{{content.editarBanco[controls.currentBank].exchangeRequest.accountCode}}</span>
                </div>
              </div>

            </div>

            <div class="secao pt-15" v-if="content.editarBanco[controls.currentBank].exchangeRequest">
              <span class="form-invalid"><strong>{{text.solicitacoes_pendentes}}</strong></span>
              <!-- <p>{{content.editarBanco[controls.currentBank].exchangeRequest}}</p> -->
            </div>

          </div>
          

          <div id="editarDomicilio" class="col-xs-12 col-md-6" v-if="controls.ajusteBancario && !controls.loadingBankMask" :class="{'pt-15': $mq == 'mobile' || $mq == 'tablet' || $mq == 'laptop', 'form-no-edit': controls.sucesso}">
            <div class="secao" :class="{'form-invalid': $v.content.editarBanco.$each[controls.currentBank].bankID.$invalid && controls.invalidBankFormData}">
              <label for="bank">{{text.form_banco}}</label>
              <multiselect v-model="content.editarBanco[controls.currentBank]" :options="content.bancos" :showNoResults="false" :custom-label="nameWithLang" :allow-empty="false" :placeholder="text.form_escolhaBanco" :show-labels="false" label="Name" track-by="Name" @select="clearDataLoadMasks($event); "></multiselect>
              <span v-if="$v.content.editarBanco.$each[controls.currentBank].bankID.$invalid && controls.invalidBankFormData"><em>Campo obrigatório</em></span>
            </div>

            <div class="secao pt-15">
              <fieldset :class="{'form-no-edit': content.editarBanco[controls.currentBank].bankID === null || content.editarBanco[controls.currentBank].bankID === 0 || controls.bankSave == 200, 'form-invalid': content.editarAccountType.natureza == null && controls.invalidBankFormData}">
                <legend>{{text.form_natureza}}</legend>
                <label class="col-xs-6" for="correnteEnabled">
                  <input type="radio" id="correnteEnabled" :value="0" v-model="content.editarAccountType.natureza">
                  {{text.form_corrente}}
                </label>
                <label class="col-xs-6" for="poupancaEnabled">
                  <input type="radio" id="poupancaEnabled" :value="1" v-model="content.editarAccountType.natureza">
                  {{text.form_poupanca}}
                </label>
                <span v-if="content.editarAccountType.natureza == null && controls.invalidBankFormData"><em>Campo obrigatório</em></span>
              </fieldset>

              <fieldset :class="{'form-no-edit': content.editarBanco[controls.currentBank].bankID === null || content.editarBanco[controls.currentBank].bankID === 0 || controls.bankSave == 200, 'form-invalid': content.editarAccountType.tipo == null && controls.invalidBankFormData}">
                <legend>{{text.form_tipo}}</legend>
                <label class="col-xs-6" for="individualEnabled">
                  <input type="radio" id="individualEnabled" :value="0" v-model="content.editarAccountType.tipo">
                  {{text.form_individual}}
                </label>
                <label class="col-xs-6" for="conjuntaEnabled">
                  <input type="radio" id="conjuntaEnabled" :value="1" v-model="content.editarAccountType.tipo">
                  {{text.form_conjunta}}
                </label>
                <span v-if="content.editarAccountType.tipo == null && controls.invalidBankFormData"><em>Campo obrigatório</em></span>
              </fieldset>
            </div>

            <div class="secao pt-15" :class="{'form-no-edit':(content.editarAccountType.natureza == null || content.editarAccountType.tipo == null)}">
              <div class="row">
                <div class="col-xs-8 col-sm-8 col-md-8" :class="{'form-invalid': $v.content.editarBanco.$each[controls.currentBank].agency.$invalid && (controls.invalidBankFormData || $v.content.editarBanco.$each[controls.currentBank].agency.required)}">
                  <label for="agencia">{{text.form_agencia}}</label>
                  <the-mask id="agencia" type="text" :mask="content.currentMask.AgencyMask !== null ? content.currentMask.AgencyMask : '####################'" v-model="content.editarBanco[controls.currentBank].agency"></the-mask>

                  <div class="errors">
                    <p v-if="!$v.content.editarBanco.$each[controls.currentBank].agency.required && controls.invalidBankFormData">Campo obrigatório</p>
                    <p v-if="$v.content.editarBanco.$each[controls.currentBank].agency.$invalid && $v.content.editarBanco.$each[controls.currentBank].agency.required">Preencha corretamente</p>
                  </div>
                </div>

                <div class="col-xs-4 col-sm-4 col-md-4" :class="{'form-invalid': $v.content.editarBanco.$each[controls.currentBank].agencyCode.$invalid && (controls.invalidBankFormData || $v.content.editarBanco.$each[controls.currentBank].agencyCode.required)}">
                  <label for="agenciadv">{{text.form_dv}}</label>
                  <the-mask id="agenciadv" type="text" :mask="content.currentMask.AgencyDigitMask != null ? content.currentMask.AgencyDigitMask : 'X'" v-model="content.editarBanco[controls.currentBank].agencyCode" :disabled="content.currentMask.AgencyDigitMask == '' || content.currentMask.AgencyDigitMask == ' '"></the-mask>

                  <div class="errors">
                    <p v-if="!$v.content.editarBanco.$each[controls.currentBank].agencyCode.required && controls.invalidBankFormData">Campo obrigatório</p>
                    <p v-if="$v.content.editarBanco.$each[controls.currentBank].agencyCode.$invalid && $v.content.editarBanco.$each[controls.currentBank].agencyCode.required">Preencha corretamente</p>
                  </div>

                </div>

                <div class="col-xs-8 col-sm-8 col-md-8" :class="{'form-invalid': $v.content.editarBanco.$each[controls.currentBank].account.$invalid && (controls.invalidBankFormData || $v.content.editarBanco.$each[controls.currentBank].account.required)}">
                  <label for="conta">{{text.form_conta}}</label>
                  <the-mask id="conta" type="text" :mask="content.currentMask.AccountMask != null ? content.currentMask.AccountMask : '####################'" v-model="content.editarBanco[controls.currentBank].account" ></the-mask>

                  <div class="errors">
                    <p v-if="!$v.content.editarBanco.$each[controls.currentBank].account.required && controls.invalidBankFormData">Campo obrigatório</p>
                    <p v-if="$v.content.editarBanco.$each[controls.currentBank].account.$invalid && $v.content.editarBanco.$each[controls.currentBank].account.required">Preencha corretamente</p>
                  </div>

                </div>

                <div class="col-xs-4 col-sm-4 col-md-4" :class="{'form-invalid': $v.content.editarBanco.$each[controls.currentBank].accountCode.$invalid && (controls.invalidBankFormData || $v.content.editarBanco.$each[controls.currentBank].accountCode.required)}">
                  <label for="ccdv">{{text.form_dv}}</label>
                  <the-mask id="ccdv" type="text" :mask="content.currentMask.AccountDigitMask != null ? content.currentMask.AccountDigitMask : 'XX'" v-model="content.editarBanco[controls.currentBank].accountCode" :disabled="content.currentMask.AccountDigitMask == '' || content.currentMask.AccountDigitMask == ' '"></the-mask>

                  <div class="errors">
                    <p v-if="!$v.content.editarBanco.$each[controls.currentBank].accountCode.required && controls.invalidBankFormData">Campo obrigatório</p>
                    <p v-if="$v.content.editarBanco.$each[controls.currentBank].accountCode.$invalid && $v.content.editarBanco.$each[controls.currentBank].accountCode.required">Preencha corretamente</p>
                  </div>

                </div>
              </div>
            </div>

            <div class="secao pt-15" :class="{'form-invalid': $v.content.editarBanco.$each[controls.currentBank].savedFile && controls.invalidBankFormData, 'form-no-edit':(content.editarAccountType.natureza == null || content.editarAccountType.tipo == null)}">
              <file-upload :documentType="'FinancialCheck'" :isEnabled="!controls.sucesso"></file-upload>
              <span v-if="$v.content.editarBanco.$each[controls.currentBank].savedFile.$invalid && controls.invalidBankFormData"><em>Campo obrigatório</em></span>
            </div>
          </div>
        </div>

        <div id="botoes" class="row">
          <div class="col-xs-6">
            <div class="row">
              <div class="col-xs-12 col-md-6 pull-right">
                <fieldset>
                  <span v-if="controls.ajusteBancario">&nbsp;</span>
                  <div v-if="!getReadOnly">
                    <button v-if="!controls.ajusteBancario && isUserOwner" class="btnSolicitacao" @click="controls.ajusteBancario = !controls.ajusteBancario">{{text.form_solicitacao}}</button>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-md-6">
            <!-- <pre>$v.content.editarBanco.$each[controls.currentBank].$invalid {{$v.content.editarBanco.$each[controls.currentBank].$invalid}}</pre>
            <pre>$v.content.editarBanco.$each[controls.currentBank] {{$v.content.editarBanco.$each[controls.currentBank]}}</pre> -->

            <fieldset v-if="!controls.sucesso && isUserOwner">
              <span v-if="!controls.ajusteBancario">&nbsp;</span>
              <button v-if="controls.ajusteBancario" class="btnConfirmar" @click.prevent="setBankFormValidation" :disabled="$v.content.editarBanco.$each[controls.currentBank].$invalid">{{ text.form_confirmar_solicitacao}}</button>
            </fieldset>
          </div>
        </div>

        <div class="row" v-if="controls.sucesso && isUserOwner">
          <div class="col-12">
            <fieldset>
              <div class="alert alert-success" v-if="enableEdit">{{text.solicitacao_sucesso}}</div>
              <div class="alert alert-success" v-else>{{text.salvar_sucesso}}</div>
            </fieldset>
          </div>
        </div>


      </form>

      <form id="form-criar" autocomplete="off" class="row" v-on:submit.prevent v-else>        
        <div id="forms" class="row">
          <!-- <h1>Teste</h1> -->
          <div id="criarDomicilio" class="col-xs-12 col-md-6" :class="{'pt-15': $mq == 'mobile' || $mq == 'tablet' || $mq == 'laptop'}" v-if="!controls.loadingBankMask">

            <div class="secao" :class="{'form-invalid': $v.content.editarBanco.$each[controls.currentBank].bankID.$invalid && controls.invalidBankFormData}" >
              <label for="bank">{{text.form_banco}}</label>

              <multiselect v-model="content.editarBanco[controls.currentBank]" :options="content.bancos"  :showNoResults="false" :custom-label="nameWithLang" :allow-empty="false" :placeholder="text.form_escolhaBanco" :show-labels="false" label="Name" track-by="Name" @select="clearDataLoadMasks($event)" :disabled="content.domicilios[controls.currentBank].bankID !== null || controls.bankSave == 200"></multiselect>

              <span v-if="$v.content.editarBanco.$each[controls.currentBank].bankID.$invalid && controls.invalidBankFormData"><em>Campo obrigatório</em></span>
            </div>

            <div class="secao pt-15" :class="{'form-no-edit': content.editarBanco[controls.currentBank].bankID === null || content.editarBanco[controls.currentBank].bankID === 0 || controls.bankSave == 200}">
              <fieldset :class="{'form-invalid': content.editarAccountType.natureza == null && controls.invalidBankFormData}">
                <legend>{{text.form_natureza}}</legend>
                <label class="col-xs-6" for="correnteEnabled">
                  <input type="radio" id="correnteEnabled" :value="0" v-model="content.editarAccountType.natureza">
                  {{text.form_corrente}}
                </label>
                <label class="col-xs-6" for="poupancaEnabled">
                  <input type="radio" id="poupancaEnabled" :value="1" v-model="content.editarAccountType.natureza">
                  {{text.form_poupanca}}
                </label>
                <span v-if="content.editarAccountType.natureza == null && controls.invalidBankFormData"><em>Campo obrigatório</em></span>
              </fieldset>

              <fieldset :class="{'form-invalid': content.editarAccountType.tipo == null && controls.invalidBankFormData}">
                <legend>{{text.form_tipo}}</legend>
                <label class="col-xs-6" for="individualEnabled">
                  <input type="radio" id="individualEnabled" :value="0" v-model="content.editarAccountType.tipo">
                  {{text.form_individual}}
                </label>
                <label class="col-xs-6" for="conjuntaEnabled">
                  <input type="radio" id="conjuntaEnabled" :value="1" v-model="content.editarAccountType.tipo">
                  {{text.form_conjunta}}
                </label>
                <span v-if="content.editarAccountType.tipo == null && controls.invalidBankFormData"><em>Campo obrigatório</em></span>
              </fieldset>
            </div>

            <div class="secao pt-15" :class="{'form-no-edit': $v.content.editarBanco.$each[controls.currentBank].bankID.$invalid || (content.editarAccountType.natureza == null || content.editarAccountType.tipo == null)}">

              <div class="row">

                <div class="col-xs-8 col-sm-8 col-md-8" :class="{'form-invalid': $v.content.editarBanco.$each[controls.currentBank].agency.$invalid && (controls.invalidBankFormData || $v.content.editarBanco.$each[controls.currentBank].agency.required)}">
                  <label for="agencia">{{text.form_agencia}}</label>
                  <the-mask id="agencia" type="text" :mask="content.currentMask.AgencyMask !== null ? content.currentMask.AgencyMask : '####################'" v-model="content.editarBanco[controls.currentBank].agency" :disabled="$v.content.editarBanco.$each[controls.currentBank].bankID.$invalid || content.domicilios[controls.currentBank].bankID !== null || controls.bankSave == 200"></the-mask>


                  <div class="errors">
                    <p v-if="$v.content.editarBanco.$each[controls.currentBank].agency.$invalid && controls.invalidBankFormData">Campo obrigatório</p>
                    <p v-if="$v.content.editarBanco.$each[controls.currentBank].agency.$invalid && $v.content.editarBanco.$each[controls.currentBank].agency.required">Preencha corretamente</p>
                  </div>
                </div>
                
                <div class="col-xs-4 col-sm-4 col-md-4" :class="{'form-invalid': $v.content.editarBanco.$each[controls.currentBank].agencyCode.$invalid && (controls.invalidBankFormData || $v.content.editarBanco.$each[controls.currentBank].agencyCode.required)}">
                  <label for="agenciadv">{{text.form_dv}}</label>
                  <the-mask id="agenciadv" type="text" :mask="content.currentMask.AgencyDigitMask != null ? content.currentMask.AgencyDigitMask : 'X'" v-model="content.editarBanco[controls.currentBank].agencyCode" :disabled="content.currentMask.AgencyDigitMask == ' ' || content.currentMask.AgencyDigitMask == '' || $v.content.editarBanco.$each[controls.currentBank].bankID.$invalid || content.domicilios[controls.currentBank].bankID !== null || controls.bankSave == 200"></the-mask>
                  <div class="errors">
                    <p v-if="$v.content.editarBanco.$each[controls.currentBank].agencyCode.$invalid && controls.invalidBankFormData">Campo obrigatório</p>
                    <p v-if="$v.content.editarBanco.$each[controls.currentBank].agencyCode.$invalid && $v.content.editarBanco.$each[controls.currentBank].agencyCode.required">Preencha corretamente</p>
                  </div>

                </div>

                <div class="col-xs-8 col-sm-8 col-md-8" :class="{'form-invalid': $v.content.editarBanco.$each[controls.currentBank].account.$invalid && (controls.invalidBankFormData || $v.content.editarBanco.$each[controls.currentBank].account.required)}">
                  <label for="conta">{{text.form_conta}}</label>
                  <the-mask id="conta" type="text" :mask="content.currentMask.AccountMask != null ? content.currentMask.AccountMask : '####################'" v-model="content.editarBanco[controls.currentBank].account" :disabled="$v.content.editarBanco.$each[controls.currentBank].bankID.$invalid || content.domicilios[controls.currentBank].bankID !== null || controls.bankSave == 200"></the-mask>

                  <div class="errors">
                    <p v-if="$v.content.editarBanco.$each[controls.currentBank].account.$invalid && controls.invalidBankFormData">Campo obrigatório</p>
                    <p v-if="$v.content.editarBanco.$each[controls.currentBank].account.$invalid && $v.content.editarBanco.$each[controls.currentBank].account.required">Preencha corretamente</p>
                  </div>

                </div>

                <div class="col-xs-4 col-sm-4 col-md-4" :class="{'form-invalid': $v.content.editarBanco.$each[controls.currentBank].accountCode.$invalid && (controls.invalidBankFormData || $v.content.editarBanco.$each[controls.currentBank].accountCode.required)}">
                  <label for="ccdv">{{text.form_dv}}</label>
                  <the-mask id="ccdv" type="text" :mask="content.currentMask.AccountDigitMask != null ? content.currentMask.AccountDigitMask : 'XX'" v-model="content.editarBanco[controls.currentBank].accountCode" :disabled="content.currentMask.AccountDigitMask == '' || content.currentMask.AccountDigitMask == ' ' || $v.content.editarBanco.$each[controls.currentBank].bankID.$invalid || content.domicilios[controls.currentBank].bankID !== null || controls.bankSave == 200"></the-mask>

                  <div class="errors">
                    <p v-if="$v.content.editarBanco.$each[controls.currentBank].accountCode.$invalid && controls.invalidBankFormData">Campo obrigatório</p>
                    <p v-if="$v.content.editarBanco.$each[controls.currentBank].accountCode.$invalid && $v.content.editarBanco.$each[controls.currentBank].accountCode.required">Preencha corretamente</p>
                  </div>

                </div>

              </div>

            </div>
          </div>
        </div>

        <div id="botoes" class="row pt-15">
          <div class="form-group col-xs-6 col-sm-12 col-md-6">
            <fieldset>
              <span>&nbsp;</span>
              <button class="btnConfirmar" @click.prevent="setBankFormValidation" :disabled="controls.submitStatus || content.domicilios[controls.currentBank].bankID != null || controls.bankSave == 200 || $v.content.editarBanco.$each[controls.currentBank].bankID.$invalid || $v.content.editarBanco.$each[controls.currentBank].$invalid">{{text.form_salvarBanco}}</button>
            </fieldset>
          </div>
          <div class="col-xs-12">
            <div class="row">
              <div id="confirmacao" class="form-group col-xs-6 col-sm-12 col-md-6" v-if="controls.bankSave != null">
                <div class="alert alert-success" v-if="controls.bankSave == 200">{{text.salvar_sucesso}}</div>
                <div class="alert alert-danger" v-else>{{text.salvar_falha}}</div>
              </div>
            </div>
          </div>
        </div>

      </form>

    </div>

    <div class="row loading" v-show="controls.loading">
      <div class="col-xs-12 loadImage">
        <img src="~assets/img/loading.gif" alt="Carregando">
      </div>
    </div>

  </div>
</template>

<script>
import { Money } from "v-money";
import {
  required, helpers, minLength, maxLength, requiredIf,
} from "vuelidate/lib/validators";
import { TheMask } from "vue-the-mask";
import Multiselect from "vue-multiselect";
import contentSection from "~/components/mainContentSection.vue";
import fileUpload from "~/components/fileUpload.vue";
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  components: {
    TheMask,
    Multiselect,
    fileUpload,
    "component-content-section": contentSection,
  },
  data() {
    return {
      text: {
        minha_conta_listo: "Minha conta listo",
        domicilio_bancario: "Domicílio Bancário",
        editar_cadastro: "Editar cadastro",
        alterar_senha: "Alterar senha",
        editar_foto: "Editar foto",
        form_banco: "Banco",
        form_natureza: "Natureza",
        form_corrente: "Corrente",
        form_poupanca: "Poupança",
        form_tipo: "Tipo",
        form_individual: "Individual",
        form_conjunta: "Conjunta",
        form_agencia: "Agência",
        form_dv: "DV",
        form_conta: "Conta",
        form_solicitacao: "Solicitar alteração",
        form_confirmar_solicitacao: "Confirmar solicitação de alteração",
        form_escolhaBanco: "Selecionar banco",
        // form_salvarBanco: "Salvar domicílio bancário",
        // form_salvarBanco: "Enviar para análise",
        form_enviarParaAnalise: "Enviar para análise",
        form_salvarBanco: "Salvar",
        // salvar_sucesso: "Domicílio bancário salvo com sucesso!",
        salvar_sucesso: "Documentos enviados para análise",
        salvar_falha: "Não foi possível salvar seu domicílio bancário. Tente novamente.",
        solicitacoes_pendentes: "Você tem solicitações pendentes de aprovação.",
        solicitacao_sucesso: "Seu pedido de alteração de domicílio bancário será atendido em até 2 dias",
      },
      controls: {
        submitStatus: null,
        ajusteBancario: false,
        loading: true,
        currentBank: 0,
        sucesso: false,
        affiliateStatusID: null,
        bankSave: null,
        invalidBankFormData: null,
        statusAffiliate: 0,
        loadingBankMask: false,
        // statusReadonly: false,
      },
      content: {
        currentMask: {
          ID: "X",
          Name: 0,
          Code: 0,
          Masks: [],
          AgencyMask: '',
          AgencyLength: 0,
          AgencyDigitMask: '',
          AccountMask: '',
          AccountLength: 0,
          AccountDigitMask: '',
          typeLength: 1,
        },
        bancos: [],
        banks: [],
        domicilios: [],
        editarBanco: [],
        editarAccountType: {
          natureza: 0,
          tipo: 0,
        },
      },
    };
  },
  methods: {
    ...mapActions({
      getBanks: "affiliate/getBanks",
    }),
    async getAffiliates() {
      await this.$axios
        .get(`${process.env.API_AFFILIATE}/affiliates`)
        .then((response) => {
          this.controls.affiliateStatusID = response.data.affiliateStatusID;

          this.$nuxt.$store.commit("gravaStatusAfiliado", response.data.affiliateStatusID);
        }).catch(err => false);
    },
    async getAffiliatesBanks() {
      await this.$axios
        .get(`${process.env.API_AFFILIATE}/affiliates/banks`)
        .then((response) => {
          if (response.status == 200) {
            response.data.forEach((bk, index) => {
              response.data[index].codeID = response.data[index].id;
            });

            this.content.domicilios = response.data;
          } else {
            this.content.domicilios[0] = {
              account: null,
              accountCode: null,
              accountTypeID: null,
              accountTypeName: null,
              agency: null,
              agencyCode: null,
              bankCode: null,
              bankID: null,
              bankName: null,
              document: null,
            };
            this.content.editarAccountType.natureza = null;
            this.content.editarAccountType.tipo = null;
          }

          for (const i in this.content.domicilios) {
            Object.freeze(this.content.domicilios[i]);
            this.content.editarBanco.push(Object.assign({}, this.content.domicilios[i]));
          }

          if (this.content.editarBanco[this.controls.currentBank].account != null) {
            switch (this.content.editarBanco[this.controls.currentBank].accountTypeID) {
              case 1:
                this.content.editarAccountType.natureza = 0;
                this.content.editarAccountType.tipo = 0;
                break;

              case 2:
                this.content.editarAccountType.natureza = 0;
                this.content.editarAccountType.tipo = 1;
                break;

              case 3:
                this.content.editarAccountType.natureza = 1;
                this.content.editarAccountType.tipo = 0;
                break;

              case 4:
                this.content.editarAccountType.natureza = 1;
                this.content.editarAccountType.tipo = 1;
                break;
            }
          } else {
            this.content.editarAccountType.natureza = null;
            this.content.editarAccountType.tipo = null;
            this.content.editarBanco[this.controls.currentBank].accountTypeID = null;
            this.content.editarBanco[this.controls.currentBank].accountTypeName = null;
          }

          if (this.content.editarBanco[this.controls.currentBank].bankID || this.content.editarBanco[this.controls.currentBank].bankID !== null) {
            if (this.content.editarBanco[this.controls.currentBank].bankID != 0) {
              const bank = this.content.bancos.filter(x => x.ID == this.content.editarBanco[this.controls.currentBank].bankID);              
              this.content.currentMask = bank[0];
            }
          }


          this.controls.loading = false;


          // this.carregaMascaraBancaria(this.content.editarBanco[this.controls.currentBank].bankID);
        }).catch((err) => { console.warn("Err:", err); return false; });
    },
    carregaMascaraBancaria(val) {                
      let infoBank = null;
      infoBank = this.content.bancos.filter(x => x.ID == val);      
      if(infoBank[0]){
        if (infoBank[0].Masks.length > 1){          
          // content.editarAccountType.natureza
          // accountMask: "########"
          // accountTypeId: 1
          // accountTypeName: "Conta Corrente - Individual"
          // agencyMask: "####"
          // digitAccountMask: "X"
          // digitAgencyMask: "X"  
          
          if(infoBank[0].Masks[this.content.editarAccountType.natureza]){
            this.content.currentMask.typeLength = infoBank[0].Masks.length;        
            this.content.currentMask.AgencyMask = infoBank[0].Masks[this.content.editarAccountType.natureza].agencyMask;
            this.content.currentMask.AgencyDigitMask = infoBank[0].Masks[this.content.editarAccountType.natureza].digitAgencyMask;
            this.content.currentMask.AccountMask = infoBank[0].Masks[this.content.editarAccountType.natureza].accountMask;
            this.content.currentMask.AccountDigitMask = infoBank[0].Masks[this.content.editarAccountType.natureza].digitAccountMask;
          }
          
          
        }
        this.content.currentMask = infoBank[0];

        infoBank.forEach((bk, index) => {
          infoBank[index].codeID = this.content.editarBanco[index].codeID;
        });

        this.content.currentMask.bankID = this.content.currentMask.ID;
      }           
      
      
      this.$v.$touch();
    },

    nameWithLang({
      Name, bankName, bankCode, Code,
    }) {
      if (Name) {
        return Code ? `[${Code}] ${Name}` : `[${bankCode}] ${Name}`;
      } if (bankName && !Name) {
        return Code ? `[${Code}] ${bankName}` : `[${bankCode}] ${bankName}`;
      }
      return "Não informado";
    },

    limpaDadosBancarios() {      
      this.content.editarBanco[this.controls.currentBank].account = "";
      this.content.editarBanco[this.controls.currentBank].accountCode = "";
      this.content.editarBanco[this.controls.currentBank].agency = "";
      this.content.editarBanco[this.controls.currentBank].agencyCode = "";
      this.content.editarBanco[this.controls.currentBank].accountTypeName = "";      
      this.content.editarAccountType.natureza = null;
      this.content.editarAccountType.tipo = null;
      this.controls.invalidBankFormData = false;
    },


    // Envia edição de dados bancários
    async enviarEdicao() {
      this.controls.submitStatus = true;
      const objectoBank = {
        accountTypeID: this.content.editarBanco[this.controls.currentBank].accountTypeID,
        bankID: this.content.editarBanco[this.controls.currentBank].bankID,
        bankCode: this.content.editarBanco[this.controls.currentBank].bankCode,
        Document: $nuxt.$store.state.afiliado.affiliate.document,
        Agency: this.content.editarBanco[this.controls.currentBank].agency,
        AgencyCode: this.content.editarBanco[this.controls.currentBank].agencyCode === "" ? " " : this.content.editarBanco[this.controls.currentBank].agencyCode,
        Account: this.content.editarBanco[this.controls.currentBank].account,
        AccountCode: this.content.editarBanco[this.controls.currentBank].accountCode === "" ? " " : this.content.editarBanco[this.controls.currentBank].accountCode,
      };

      this.content.editarBanco[this.controls.currentBank].exchangeRequest = objectoBank;


      await this.$axios
        .post(`${process.env.API_AFFILIATE}/affiliateBanks/exchangeRequest/${this.content.domicilios[this.controls.currentBank].id}`, objectoBank)
        .then((response) => {
          this.controls.submitStatus = false;
          $nuxt.$store.commit("setComprovanteState", {
            status: false,
            type: "FinancialCheck",
          });

          this.$nuxt.$emit("removerComprovante");

          if (response.status === 200 || response.status === 201) {
            this.controls.sucesso = true;
            setTimeout(() => {
              this.controls.sucesso = false;
            }, 3000);
          } else {
            this.controls.sucesso = false;
          }
          // this.content.domicilios[this.controls.currentBank] = response.data;
        })
        .catch((error) => {
          this.controls.sucesso = false;
          this.controls.submitStatus = false;
          $nuxt.$store.commit("setComprovanteState", {
            status: false,
            type: "FinancialCheck",
          });

          this.$nuxt.$emit("removerComprovante");
          return false;
        });
    },

    async salvarBanco() {
      this.controls.submitStatus = true;
      this.controls.bankSave = null;
      this.controls.sucesso = false;

      const objectoBank = {
        accountTypeID: this.content.editarBanco[this.controls.currentBank].accountTypeID,
        bankID: this.content.editarBanco[this.controls.currentBank].bankID,
        bankCode: this.content.editarBanco[this.controls.currentBank].Code,
        document: this.content.domicilios[this.controls.currentBank].document,
        Agency: this.content.editarBanco[this.controls.currentBank].agency,
        AgencyCode: this.content.editarBanco[this.controls.currentBank].agencyCode,
        Account: this.content.editarBanco[this.controls.currentBank].account,
        AccountCode: this.content.editarBanco[this.controls.currentBank].accountCode,
      };

      await this.$axios
        .post(`${process.env.API_AFFILIATE}/affiliateBanks/exchangeRequest/${this.content.domicilios[this.controls.currentBank].id}`, objectoBank)
        .then(async (response) => {
          this.controls.bankSave = response.status;
          this.controls.submitStatus = false;

          await this.$axios.get(`${process.env.API_AFFILIATE}/affiliates/banks`)
            .then((response) => {
              this.$nuxt.$store.commit("gravaBancos", { banks: response.data });
            })
            .catch((err) => { console.warn("err: ", err); return false; });

          $nuxt.$store.commit("setComprovanteState", {
            status: false,
            type: "comprovante_bancario",
          });

          this.$nuxt.$emit("removerComprovante");

          if (this.controls.bankSave == 200 || this.controls.bankSave == 201) {
            this.controls.sucesso = true;
            this.$nuxt.$emit("trocaTab", "Comprovantes");
          } else {
            this.controls.sucesso = false;
          }
        })
        .catch((err) => {
          this.controls.sucesso = false;
          this.controls.submitStatus = false;
          this.controls.bankSave = 0;

          $nuxt.$store.commit("setComprovanteState", {
            status: false,
            type: "FinancialCheck",
          });

          this.$nuxt.$emit("removerComprovante");
          return false;
        });
    },

    // gera informacoes do banco a partir do ID
    getBankDataFrom(id) {
      const banco = this.content.bancos.filter(bco => bco.ID == id)[0];
      return `${banco.Name}`;
    },

    // exibe o tipo da conta a partir do id no exchange request
    getExchangeAccountTypeFrom(id) {
      switch (id) {
        case 1:
          return "Conta Corrente - Individual";
        case 2:
          return "Conta Corrente - Conjunta";
        case 3:
          return "Conta Poupança - Individual";
        case 4:
          return "Conta Poupança - Conjunta";
      }
    },

    // validar dados inputados no formulário
    setBankFormValidation() {

      this.controls.invalidBankFormData = null;

      this.$v.$touch();
      this.controls.invalidBankFormData = this.$v.content.editarBanco.$each[this.controls.currentBank].$invalid;


      if (!this.controls.invalidBankFormData) {
        if (this.enableEdit) this.enviarEdicao();
        else this.salvarBanco();
      }
    },

    clearDataLoadMasks(ev) {

      this.controls.loadingBankMask = true;

      this.limpaDadosBancarios();
      setTimeout(() => {
        this.controls.loadingBankMask = false;
        this.updateBankID(ev);
        $nuxt.$store.commit("setComprovanteState", {
          status: false,
          type: "FinancialCheck",
        });
      }, 100);
    },

    updateBankID(ev) {
      this.content.editarBanco[this.controls.currentBank].bankID = null;
      this.content.editarBanco[this.controls.currentBank].bankID = ev.ID;

      this.carregaMascaraBancaria(ev.ID);
    },

  },
  
  async created() {
    await this.getBanks();
    await this.getAffiliates();
    await this.getAffiliatesBanks();

    $nuxt.$store.commit("setComprovanteState", {
      type: "FinancialCheck",
      status: false,
    });
  },
  async mounted() {
    let agencyLength = null;  
    let accountLength = null;

    this.banks.map((bank, index) => {
      agencyLength = !bank.accountTypeMasks[this.content.editarAccountType.tipo].agencyMask ? null : bank.accountTypeMasks[this.content.editarAccountType.tipo].agencyMask.length;
      accountLength = !bank.accountTypeMasks[this.content.editarAccountType.tipo].accountMask ? null : bank.accountTypeMasks[this.content.editarAccountType.tipo].accountMask.length;
      this.content.bancos.push({
          ID: bank.id,
          Name: bank.name,
          Code: bank.code,
          Masks: bank.accountTypeMasks,
          AgencyMask: bank.accountTypeMasks[this.content.editarAccountType.tipo].agencyMask,
          AgencyLength: agencyLength,
          AgencyDigitMask: bank.accountTypeMasks[this.content.editarAccountType.tipo].digitAgencyMask,
          AccountMask: bank.accountTypeMasks[this.content.editarAccountType.tipo].accountMask,
          AccountLength: accountLength,
          AccountDigitMask: bank.accountTypeMasks[this.content.editarAccountType.tipo].digitAccountMask,
          IsIndividual: bank.accountTypeMasks[this.content.editarAccountType.tipo].isIndividual,
          IsSavingAccount: bank.accountTypeMasks[this.content.editarAccountType.tipo].isSavingAccount,
          AccountTypeId: bank.accountTypeMasks[this.content.editarAccountType.tipo].accountTypeId,
          CanPay: bank.canPay,
          IspbCode: bank.ispbCode
      });      
    });

   
  },
  watch: {
    // eslint-disable-next-line func-names
    "content.editarAccountType": {
      handler(val) {               
        this.$v.content.editarBanco.$each[this.controls.currentBank].accountTypeID.$reset();

        if (val.natureza == 0) {
          if (val.tipo == 0) {
            this.content.editarBanco[this.controls.currentBank].accountTypeID = 1;
            this.content.editarBanco[this.controls.currentBank].accountTypeName = "Conta Corrente - Individual";
          } else if (val.tipo == 1) {
            this.content.editarBanco[this.controls.currentBank].accountTypeID = 2;
            this.content.editarBanco[this.controls.currentBank].accountTypeName = "Conta Corrente - Conjunta";
          }
        } else if (val.natureza == 1) {
          if (val.tipo == 0) {
            this.content.editarBanco[this.controls.currentBank].accountTypeID = 3;
            this.content.editarBanco[this.controls.currentBank].accountTypeName = "Conta Poupança - Individual";
          } else if (val.tipo == 1) {
            this.content.editarBanco[this.controls.currentBank].accountTypeID = 4;
            this.content.editarBanco[this.controls.currentBank].accountTypeName = "Conta Poupança - Conjunta";
          }
        } else if (val.natureza == null || val.tipo == null) {
          this.content.editarBanco[this.controls.currentBank].accountTypeID = null;
          this.content.editarBanco[this.controls.currentBank].accountTypeName = null;
        }
        this.carregaMascaraBancaria(this.content.currentMask.ID);        
        this.$v.content.editarBanco.$each[this.controls.currentBank].accountTypeID.$touch();
      },
      deep: true,
    },
    "content.editarBanco": {
      handler(val) {          
        
        if (val[0].ID) {          
          this.carregaMascaraBancaria(val[0].ID);
        }        
        this.$v.content.editarBanco.$each[this.controls.currentBank].accountTypeID.$touch();
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters({
      isUserOwner: "auth/isUserOwner",
    }),
    ...mapState({
      banks: state => state.affiliate.banks,      
    }),
    enableEdit() {
      return this.controls.affiliateStatusID != null && this.controls.affiliateStatusID != 0 ? true : false;
    },
    getReadOnly() {
      if ($nuxt.$store.state.roles.indexOf("ec_read") >= 0 || ($nuxt.$store.state.afiliado.affiliate && $nuxt.$store.state.afiliado.affiliate.affiliateStatusID < 0)) {
        return true;
      }
      return false;
    },
  },
  validations() {   
    return {
      content: {
        editarBanco: {
          $each: {
            bankID: {
              required: true,
            },
            agency: {
              required: true,
              agencyLength: minLength(this.content.currentMask.AgencyMask !== null ? this.content.currentMask.AgencyMask.length : 0)
            },
            agencyCode: {
             required: requiredIf(() => (this.content.currentMask.AgencyDigitMask !== null && this.content.currentMask.AgencyDigitMask !== '' && this.content.currentMask.AgencyDigitMask !== ' ') && this.content.currentMask.AgencyDigitMask.length > 0),
             agencyCodeLength: minLength(this.content.currentMask.AgencyDigitMask !== null ? this.content.currentMask.AgencyDigitMask.length : 0),
            },
            account: {
              required: true,
              accountLength: minLength(this.content.currentMask.AccountMask !== null ? this.content.currentMask.AccountMask.length : 0)
            },
            accountCode: {
              required: requiredIf(() => (this.content.currentMask.AccountDigitMask != null && this.content.currentMask.AccountDigitMask != '' && this.content.currentMask.AccountDigitMask != ' ')),
              minLength: minLength(this.content.currentMask.AccountDigitMask !== null ? this.content.currentMask.AccountDigitMask.length : 0),
            },
            accountTypeID: {
              required: true,
            },
            savedFile: {
              savedFileValidation() {
                if (this.enableEdit) {
                  return $nuxt.$store.state.comprovantes.FinancialCheck;
                }
                return true;
              },
            },
          },
        },
      },
    };
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="less" scoped>
  @import "~assets/vars.less";
  @import "~assets/variables.less";

  #formDomicilioBancario {

    .btnConfirmar, .btnSolicitacao {
      width: 100%;
    }

    .loadImage {
      text-align: center;
    }

    .financialExchangeRequestText {
      font-style: italic;
      font-size: @ftSizeTiny;
    }
  }
</style>


