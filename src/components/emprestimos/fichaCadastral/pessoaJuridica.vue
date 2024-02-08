<template>
  <form class="page-emprestimos ficha-cadastral ficha-cadastral-pessoa-juridica container-fluid" @submit.prevent v-if="!controls.loading">

    <h2>{{text.RegistrationData.title}}</h2>

    <!-- <p v-for="(type, key, index) in formData.CorporatePartnerShareHolder" :key="index">{{key}} : {{type}}</p> -->

    <!-- <h3 style="position:fixed;top:10px;left:0;right:0;background-color:lightgray;z-index:999;width:50vw;margin:0 auto;padding: 10px;border: 0.5px dashed black;">{{content.formBlockTypes}}</h3> -->

    <section id="dados-cadastrais" class="panel panel-default">

      <div class="panel-heading">
        <span>{{text.RegistrationData.title}}</span>
      </div>

      <div class="panel-body">

        <!-- <p>{{formData.RegistrationData}}</p> -->

        <div class="row">
          <div class="col-xs-12 col-sm-4" :class="{'form-invalid': $v.formData.RegistrationData.cnpj.$error}">
            <label for="dados-cadastrais-cnpj">{{text.RegistrationData.labels.cnpj}}</label>
            <the-mask :mask="'##.###.###/####-##'" id="dados-cadastrais-cnpj" disabled v-model="formData.RegistrationData.cnpj" @blur.native="autoSaveForm(1, formData.RegistrationData, $event.target.value)"></the-mask>
          </div>
          <div class="col-xs-12 col-sm-8" :class="{'form-invalid': $v.formData.RegistrationData.fullName.$error}">
            <label for="dados-cadastrais-fullName">{{text.RegistrationData.labels.fullName}}</label>
            <input type="text" id="dados-cadastrais-fullName" disabled v-model="formData.RegistrationData.fullName" @blur="autoSaveForm(1, formData.RegistrationData, $event.target.value)">
            <div class="tooltip-campo-vazio alert alert-danger" v-if="!formData.RegistrationData.fullName"><span class='glyphicon glyphicon-remove' aria-hidden='true' @click="msgHidden($event)" :class="{tooltipHidden: isActive}"></span> {{text.campoObrigatorioVazio.texto}}</div>
          </div>
        </div>

        <div class="row">
          <div class="col-xs-12 col-sm-4" :class="{'form-invalid': $v.formData.RegistrationData.simpleName.$error}">
            <label for="dados-cadastrais-simpleName">{{text.RegistrationData.labels.simpleName}}</label>
            <input type="text" id="dados-cadastrais-simpleName" disabled v-model="formData.RegistrationData.simpleName" @blur="autoSaveForm(1, formData.RegistrationData, $event.target.value)">
            <div class="tooltip-campo-vazio alert alert-danger" v-if="!formData.RegistrationData.simpleName"><span class='glyphicon glyphicon-remove' aria-hidden='true' @click="msgHidden($event)" :class="{tooltipHidden: isActive}"></span> {{text.campoObrigatorioVazio.texto}}</div>
          </div>
          <div class="col-xs-12 col-sm-8" :class="{'form-invalid': $v.formData.RegistrationData.addressStreetName.$error}">
            <label for="dados-cadastrais-addressStreetName">{{text.RegistrationData.labels.addressStreetName}}</label>
            <input type="text" id="dados-cadastrais-addressStreetName" disabled v-model="formData.RegistrationData.addressStreetName" @blur="autoSaveForm(1, formData.RegistrationData, $event.target.value)">
            <div class="tooltip-campo-vazio alert alert-danger" v-if="!formData.RegistrationData.addressStreetName"><span class='glyphicon glyphicon-remove' aria-hidden='true' @click="msgHidden($event)" :class="{tooltipHidden: isActive}"></span> {{text.campoObrigatorioVazio.texto}}</div>
          </div>
        </div>

        <div class="row">
          <div class="col-xs-12 col-sm-2 col-md-2 col-lg-1" :class="{'form-invalid': $v.formData.RegistrationData.addressNumber.$error}">
            <label for="dados-cadastrais-addressNumber">{{text.RegistrationData.labels.addressNumber}}</label>
            <input type="text" id="dados-cadastrais-addressNumber" disabled v-model="formData.RegistrationData.addressNumber" @blur="autoSaveForm(1, formData.RegistrationData, $event.target.value)">
            <div class="tooltip-campo-vazio alert alert-danger" v-if="!formData.RegistrationData.addressNumber"><span class='glyphicon glyphicon-remove' aria-hidden='true' @click="msgHidden($event)" :class="{tooltipHidden: isActive}"></span> {{text.campoObrigatorioVazio.texto}}</div>
          </div>
          <div class="col-xs-12 col-sm-5 col-md-2 col-lg-3">
            <label for="dados-cadastrais-addressAdditionalData">{{text.RegistrationData.labels.addressAdditionalData}}</label>
            <input type="text" id="dados-cadastrais-addressAdditionalData" v-model="formData.RegistrationData.addressAdditionalData" @blur="autoSaveForm(1, formData.RegistrationData, $event.target.value)">
          </div>
          <div class="col-xs-12 col-sm-5 col-md-2 col-lg-2" :class="{'form-invalid': $v.formData.RegistrationData.addressNeighborhood.$error}">
            <label for="dados-cadastrais-addressNeighborhood">{{text.RegistrationData.labels.addressNeighborhood}}</label>
            <input type="text" id="dados-cadastrais-addressNeighborhood" disabled v-model="formData.RegistrationData.addressNeighborhood" @blur="autoSaveForm(1, formData.RegistrationData, $event.target.value)">
            <div class="tooltip-campo-vazio alert alert-danger" v-if="!formData.RegistrationData.addressNeighborhood"><span class='glyphicon glyphicon-remove' aria-hidden='true' @click="msgHidden($event)" :class="{tooltipHidden: isActive}"></span> {{text.campoObrigatorioVazio.texto}}</div>
          </div>
          <div class="col-xs-12 col-sm-2 col-md-2 col-lg-1" :class="{'form-invalid': $v.formData.RegistrationData.uf.$error}">
            <label for="dados-cadastrais-uf">{{text.RegistrationData.labels.uf}}</label>
            <select id="dados-cadastrais-uf" disabled v-model="formData.RegistrationData.uf" @blur="autoSaveForm(1, formData.RegistrationData, $event.target.value)">
              <option v-for="(state, index) in content.states" :key="index" :value="state.uf">{{state.uf}}</option>
            </select>
            <div class="tooltip-campo-vazio alert alert-danger" v-if="!formData.RegistrationData.uf"><span class='glyphicon glyphicon-remove' aria-hidden='true' @click="msgHidden($event)" :class="{tooltipHidden: isActive}"></span> {{text.campoObrigatorioVazio.texto}}</div>
          </div>
          <div class="col-xs-12 col-sm-5 col-md-2 col-lg-3" :class="{'form-invalid': $v.formData.RegistrationData.cityName.$error}">
            <label for="dados-cadastrais-cityName">{{text.RegistrationData.labels.cityName}}</label>
            <input type="text" id="dados-cadastrais-cityName" disabled v-model="formData.RegistrationData.cityName" @blur="autoSaveForm(1, formData.RegistrationData, $event.target.value)">
            <div class="tooltip-campo-vazio alert alert-danger" v-if="!formData.RegistrationData.cityName"><span class='glyphicon glyphicon-remove' aria-hidden='true' @click="msgHidden($event)" :class="{tooltipHidden: isActive}"></span> {{text.campoObrigatorioVazio.texto}}</div>
          </div>
          <div class="col-xs-12 col-sm-5 col-md-2 col-lg-2" :class="{'form-invalid': $v.formData.RegistrationData.addressPostalCode.$error}">
            <label for="dados-cadastrais-addressPostalCode">{{text.RegistrationData.labels.addressPostalCode}}</label>
            <the-mask :mask="'#####-###'" id="dados-cadastrais-addressPostalCode" disabled v-model="formData.RegistrationData.addressPostalCode" @blur.native="autoSaveForm(1, formData.RegistrationData, $event.target.value)"></the-mask>
            <div class="tooltip-campo-vazio alert alert-danger" v-if="!formData.RegistrationData.addressPostalCode"><span class='glyphicon glyphicon-remove' aria-hidden='true' @click="msgHidden($event)" :class="{tooltipHidden: isActive}"></span> {{text.campoObrigatorioVazio.texto}}</div>
          </div>
        </div>

        <div class="row">
          <div class="col-xs-12 col-sm-6 col-md-3 col-lg-4">
            <label for="dados-cadastrais-referencePoint">{{text.RegistrationData.labels.referencePoint}}</label>
            <input type="text" id="dados-cadastrais-referencePoint" v-model="formData.RegistrationData.referencePoint" @blur="autoSaveForm(1, formData.RegistrationData, $event.target.value)">
          </div>
          <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3" :class="{'form-invalid': $v.formData.RegistrationData.phone.$error}">
            <label for="dados-cadastrais-phone">{{text.RegistrationData.labels.phone}}</label>
            <the-mask :mask="['(##) ####-####', '(##) #####-####']" :masked="true" id="dados-cadastrais-phone" v-model="formData.RegistrationData.phone" @blur.native="autoSaveForm(1, formData.RegistrationData, $event.target.value)"></the-mask>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3" :class="{'form-invalid': $v.formData.RegistrationData.postalBox.$error}">
            <label for="dados-cadastrais-postalBox">{{text.RegistrationData.labels.postalBox}}</label>
            <input type="text" id="dados-cadastrais-postalBox" v-model="formData.RegistrationData.postalBox" @blur="autoSaveForm(1, formData.RegistrationData, $event.target.value)">
          </div>
          <div class="col-xs-12 col-sm-6 col-md-3 col-lg-2" :class="{'form-invalid': $v.formData.RegistrationData.foundationDate.$error}">
            <label for="dados-cadastrais-foundationDate">{{text.RegistrationData.labels.foundationDate}}</label>
            <date-picker id="dados-cadastrais-foundationDate" :lang="'pt-br'" :format="'DD/MM/YYYY'" v-mask="'##/##/####'" v-model="formData.RegistrationData.foundationDate" :not-after="new Date()" @focusout.native="autoSaveForm(1, formData.RegistrationData, $event.target.value)"></date-picker>
          </div>
        </div>

        <div class="row">
          <div class="col-xs-12 col-sm-6 col-lg-3">
            <label for="dados-cadastrais-numCommercialBoard">{{text.RegistrationData.labels.numCommercialBoard}}</label>
            <input id="dados-cadastrais-numCommercialBoard" type="text" v-model="formData.RegistrationData.numCommercialBoard" @blur="autoSaveForm(1, formData.RegistrationData, $event.target.value)">
          </div>
          <div class="col-xs-12 col-sm-6 col-lg-3" :class="{'form-invalid': $v.formData.RegistrationData.shareCapitalValue.$error}">
            <label for="dados-cadastrais-shareCapitalValue">{{text.RegistrationData.labels.shareCapitalValue}}</label>
            <Money type="text" id="dados-cadastrais-shareCapitalValue" v-bind="controls.money" v-model="formData.RegistrationData.shareCapitalValue" @blur.native="autoSaveForm(1, formData.RegistrationData, $event.target.value)"></Money>
          </div>
          <div class="col-xs-12 col-sm-6 col-lg-3">
            <label for="dados-cadastrais-successorSocialName">{{text.RegistrationData.labels.successorSocialName}}</label>
            <input type="text" id="dados-cadastrais-successorSocialName" v-model="formData.RegistrationData.successorSocialName" @blur="autoSaveForm(1, formData.RegistrationData, $event.target.value)">
          </div>
          <div class="col-xs-12 col-sm-3 col-lg-2">
            <label for="dados-cadastrais-dateIncial">{{text.RegistrationData.labels.dateIncial}}</label>
            <date-picker id="dados-cadastrais-dateIncial" :lang="'pt-br'" :format="'DD/MM/YYYY'" v-mask="'##/##/####'" v-model="formData.RegistrationData.dateIncial" @focusout.native="autoSaveForm(1, formData.RegistrationData, $event.target.value )"></date-picker>
          </div>
          <div class="col-xs-12 col-sm-3 col-lg-1">
            <label for="dados-cadastrais-qtdeBranch">{{text.RegistrationData.labels.qtdeBranch}}</label>
            <input type="number" step="1" min="0" id="dados-cadastrais-qtdeBranch" v-model="formData.RegistrationData.qtdeBranch" @blur="autoSaveForm(1, formData.RegistrationData, $event.target.value)">
          </div>
        </div>

        <div class="row">
          <div class="col-xs-12 col-md-4 col-lg-6">
            <label for="dados-cadastrais-mainProducts">{{text.RegistrationData.labels.mainProducts}}</label>
            <input type="text" v-model="formData.RegistrationData.mainProducts" @blur="autoSaveForm(1, formData.RegistrationData, $event.target.value)">
          </div>
          <div class="col-xs-12 col-sm-8 col-md-4 col-lg-4" :class="{'form-invalid': $v.formData.RegistrationData.branchActivity.$error}">
            <label for="dados-cadastrais-branchActivity">{{text.RegistrationData.labels.branchActivity}}</label>
            <input type="text" disabled v-model="formData.RegistrationData.branchActivity" @blur="autoSaveForm(1, formData.RegistrationData, $event.target.value)">
            <div class="tooltip-campo-vazio alert alert-danger" v-if="!formData.RegistrationData.branchActivity"><span class='glyphicon glyphicon-remove' aria-hidden='true' @click="msgHidden($event)" :class="{tooltipHidden: isActive}"></span> {{text.campoObrigatorioVazio.texto}}</div>
          </div>
          <div class="col-xs-12 col-sm-4 col-md-4 col-lg-2" :class="{'form-invalid': $v.formData.RegistrationData.numEmployees.$error}">
            <label for="dados-cadastrais-numEmployees">{{text.RegistrationData.labels.numEmployees}}</label>
            <input type="number" min="0" step="1" v-model="formData.RegistrationData.numEmployees" @blur="autoSaveForm(1, formData.RegistrationData, $event.target.value)">
          </div>
        </div>

        <div class="row">
          <fieldset class="col-xs-12 col-sm-6" :class="{'form-invalid': $v.formData.RegistrationData.optSimplesNacional.$error}">
            <legend class="form-group">{{text.RegistrationData.labels.optSimplesNacional}}</legend>

            <div class="col-xs-6">
              <label for="dados-cadastrais-brazilSimples_optIn">
                <input type="radio" name="simples-nacional" :value="true" id="dados-cadastrais-brazilSimples_optIn" v-model="formData.RegistrationData.optSimplesNacional" @blur="autoSaveForm(1, formData.RegistrationData, $event.target.value)">
                {{text.RegistrationData.labels.brazilSimples_optIn}}
              </label>
            </div>

            <div class="col-xs-6">
              <label for="dados-cadastrais-brazilSimples_optOut">
                <input type="radio" name="simples-nacional" :value="false" id="dados-cadastrais-brazilSimples_optOut" v-model="formData.RegistrationData.optSimplesNacional" @blur="autoSaveForm(1, formData.RegistrationData, $event.target.value)">
                {{text.RegistrationData.labels.brazilSimples_optOut}}
              </label>
            </div>

          </fieldset>

          <div class="col-xs-12 col-sm-6">
            <label for="dados-cadastrais-socialObject">{{text.RegistrationData.labels.socialObject}}</label>
            <input type="text" id="dados-cadastrais-socialObject" v-model="formData.RegistrationData.socialObject" @blur="autoSaveForm(1, formData.RegistrationData, $event.target.value)">
          </div>
        </div>

      </div>

      <div class="panel-footer">
        <span>{{text.camposObrigatorios.texto}}</span>
      </div>
    </section>

    <section id="CorporatePartnerShareHolder" class="panel panel-default">


      <div class="panel-heading">
        <span>{{text.CorporatePartnerShareHolder.title}}</span>
      </div>

      <div class="panel-body">

        <!-- <h3>{{formData.CorporatePartnerShareHolder}}</h3> -->

        <fieldset id="lista-CorporatePartnerShareHolder">
          <legend>{{text.CorporatePartnerShareHolder.labels.CorporatePartnerShareHolder}}</legend>

          <div class="row" v-for="(item, index) in formData.CorporatePartnerShareHolder.CorporatePartnerShareHolder" :key="index" :class="{'form-group': index === formData.CorporatePartnerShareHolder.CorporatePartnerShareHolder.length - 1, 'form-section': (index !== formData.CorporatePartnerShareHolder.CorporatePartnerShareHolder.length - 1) && formData.CorporatePartnerShareHolder.CorporatePartnerShareHolder.length > 1}">

            <div :class="{
              'form-invalid': $v.formData.CorporatePartnerShareHolder.CorporatePartnerShareHolder.$each[index].name.$error,
              'col-xs-6 col-sm-8 col-lg-5': formData.CorporatePartnerShareHolder.CorporatePartnerShareHolder.length <= 1,
              'col-xs-6 col-sm-8 col-lg-3': formData.CorporatePartnerShareHolder.CorporatePartnerShareHolder.length > 1,
              }">
              <label :for="`CorporatePartnerShareHolder-${index + 1}-nome`">{{text.CorporatePartnerShareHolder.labels.nome}}</label>
              <input type="text" :id="`CorporatePartnerShareHolder-${index + 1}-admissionDate`" v-model="item.name" @blur="autoSaveForm(10, formData.CorporatePartnerShareHolder.CorporatePartnerShareHolder, $event.target.value)">
            </div>

            <div class="col-xs-6 col-sm-4 col-lg-2" :class="{'form-invalid': $v.formData.CorporatePartnerShareHolder.CorporatePartnerShareHolder.$each[index].cpf.$error}">
              <label :for="`CorporatePartnerShareHolder-${index + 1}-cpf`">{{text.CorporatePartnerShareHolder.labels.cpf}}</label>
              <the-mask type="text" :mask="'###.###.###-##'" :id="`CorporatePartnerShareHolder-${index + 1}-cpf`" v-model="item.cpf" @blur.native="autoSaveForm(10, formData.CorporatePartnerShareHolder.CorporatePartnerShareHolder, $event.target.value)"></the-mask>
            </div>

            <div class="col-xs-6 col-sm-4 col-md-5 col-lg-2" :class="{'form-invalid': $v.formData.CorporatePartnerShareHolder.CorporatePartnerShareHolder.$each[index].admissionDate.$error}">
              <label :for="`CorporatePartnerShareHolder-${index + 1}-admissionDate`">{{text.CorporatePartnerShareHolder.labels.admissionDate}}</label>
              <date-picker :id="`CorporatePartnerShareHolder-${index + 1}-admissionDate`" :lang="'pt-br'" :format="'DD/MM/YYYY'" v-mask="'##/##/####'" v-model="item.admissionDate" @focusout.native="autoSaveForm(10, formData.CorporatePartnerShareHolder.CorporatePartnerShareHolder, $event.target.value)"></date-picker>
            </div>

            <div :class="{
              'form-invalid': $v.formData.CorporatePartnerShareHolder.CorporatePartnerShareHolder.$each[index].capitalParticipation.$error,
              'col-xs-6 col-sm-6 col-md-6 col-lg-2': formData.CorporatePartnerShareHolder.CorporatePartnerShareHolder.length <= 1,
              'col-xs-6 col-sm-4 col-md-5 col-lg-3': formData.CorporatePartnerShareHolder.CorporatePartnerShareHolder.length > 1,
              }">
              <label :for="`CorporatePartnerShareHolder-${index + 1}-capitalParticipation`">{{text.CorporatePartnerShareHolder.labels.capitalParticipation}}</label>
              <input type="number" min="0" step="0.1" max="100" :id="`CorporatePartnerShareHolder-${index + 1}-capitalParticipation`" v-model="item.capitalParticipation" @blur="autoSaveForm(10, formData.CorporatePartnerShareHolder.CorporatePartnerShareHolder, $event.target.value)">
            </div>

            <div class="col-xs-2 col-md-1">
              <label>&nbsp;</label>
              <button @click="addAcionista(index)"><span class="glyphicon glyphicon-plus"></span></button>
            </div>
            <div class="col-xs-2 col-md-1" v-if="formData.CorporatePartnerShareHolder.CorporatePartnerShareHolder.length > 1">
              <label>&nbsp;</label>
              <button @click="removeAcionista(index)"><span class="glyphicon glyphicon-trash"></span></button>
            </div>
          </div>
        </fieldset>

        <fieldset id="lista-administradores">
          <legend>{{text.CorporatePartnerShareHolder.labels.administradores}}</legend>

          <div class="row" v-for="(item, index) in formData.CorporatePartnerShareHolder.administradores" :key="index" :class="{'form-section': formData.CorporatePartnerShareHolder.administradores.length > 1 && index !== formData.CorporatePartnerShareHolder.administradores.length - 1, 'form-group': index === formData.CorporatePartnerShareHolder.administradores.length - 1}">
            <div class="col-xs-6 col-sm-12 col-md-8" :class="{'form-invalid': $v.formData.CorporatePartnerShareHolder.administradores.$each[index].name.$error}">
              <label :for="`administradores-${index + 1}-nome`">{{text.CorporatePartnerShareHolder.labels.nome}}</label>
              <input type="text" :id="`administradores-${index + 1}-nome`" v-model="item.name" @blur="autoSaveForm(11, formData.CorporatePartnerShareHolder.administradores, $event.target.value)">
            </div>

            <div class="col-xs-6 col-md-4" :class="{'form-invalid': $v.formData.CorporatePartnerShareHolder.administradores.$each[index].cpf.$error}">
              <label :for="`administradores-${index + 1}-cpf`">{{text.CorporatePartnerShareHolder.labels.cpf}}</label>
              <the-mask :mask="'###.###.###-##'" :id="`administradores-${index + 1}-cpf`" v-model="item.cpf" @blur.native="autoSaveForm(11, formData.CorporatePartnerShareHolder.administradores, $event.target.value)"></the-mask>
            </div>

            <div class="col-xs-6 col-md-3 col-lg-3">
              <label :for="`administradores-${index + 1}-admissionDate`">{{text.CorporatePartnerShareHolder.labels.admissionDate}}</label>
              <date-picker :id="`administradores-${index + 1}-admissionDate`" :lang="'pt-br'" :format="'DD/MM/YYYY'" v-mask="'##/##/####'" v-model="item.admissionDate" @focusout.native="autoSaveForm(11, formData.CorporatePartnerShareHolder.administradores, $event.target.value)"></date-picker>
            </div>

            <div class="col-xs-6 col-sm-4 col-md-3 col-lg-3">
              <label :for="`administradores-${index + 1}-expirationDate`">{{text.CorporatePartnerShareHolder.labels.expirationDate}}</label>
              <date-picker :id="`administradores-${index + 1}-expirationDate`" :lang="'pt-br'" :format="'DD/MM/YYYY'" v-mask="'##/##/####'" v-model="item.expirationDate" @focusout.native="autoSaveForm(11, formData.CorporatePartnerShareHolder.administradores, $event.target.value)"></date-picker>
            </div>

            <div :class="{
              'col-xs-6 col-sm-4 col-md-4': formData.CorporatePartnerShareHolder.administradores.length > 1 && (index === formData.CorporatePartnerShareHolder.administradores.length - 1),
              'col-xs-6 col-md-5': (formData.CorporatePartnerShareHolder.administradores.length > 1 && (index !== formData.CorporatePartnerShareHolder.administradores.length - 1)) || formData.CorporatePartnerShareHolder.administradores.length <= 1,
              }">
              <label :for="`administradores-${index + 1}-position`">{{text.CorporatePartnerShareHolder.labels.position}}</label>
              <input type="text" :id="`administradores-${index + 1}-position`" v-model="item.position" @blur="autoSaveForm(11, formData.CorporatePartnerShareHolder.administradores, $event.target.value)">
            </div>

            <div class="col-xs-2 col-md-1" v-if="index === formData.CorporatePartnerShareHolder.administradores.length - 1">
              <label>&nbsp;</label>
              <button @click="addAdministrador(index)"><span class="glyphicon glyphicon-plus"></span></button>
            </div>

            <div class="col-xs-2 col-md-1" v-if="formData.CorporatePartnerShareHolder.administradores.length > 1">
              <label>&nbsp;</label>
              <button @click="removeAdministrador(index)"><span class="glyphicon glyphicon-trash"></span></button>
            </div>

          </div>
        </fieldset>

        <fieldset id="lista-procuradores">
          <legend>{{text.CorporatePartnerShareHolder.labels.procuradores}}</legend>
          <div class="row" v-for="(item, index) in formData.CorporatePartnerShareHolder.procuradores" :key="index" :class="{'form-section': formData.CorporatePartnerShareHolder.procuradores.length > 1 && index !== formData.CorporatePartnerShareHolder.procuradores.length - 1 }">

            <div class="col-xs-6 col-sm-12 col-md-8" :class="{'form-invalid': $v.formData.CorporatePartnerShareHolder.procuradores.$each[index].name.$error}">
              <label :for="`procuradores-${index + 1}-nome`">{{text.CorporatePartnerShareHolder.labels.nome}}</label>
              <input type="text" v-model="item.name" :id="`procuradores-${index + 1}-nome`" @blur="autoSaveForm(12, formData.CorporatePartnerShareHolder.procuradores, $event.target.value)">
            </div>

            <div class="col-xs-6 col-md-4" :class="{'form-invalid': $v.formData.CorporatePartnerShareHolder.procuradores.$each[index].cpf.$error}">
              <label :for="`procuradores-${index + 1}-cpf`">{{text.CorporatePartnerShareHolder.labels.cpf}}</label>
              <the-mask :mask="'###.###.###-##'" v-model="item.cpf" :id="`procuradores-${index + 1}-cpf`" @blur.native="autoSaveForm(12, formData.CorporatePartnerShareHolder.procuradores, $event.target.value)"></the-mask>
            </div>

            <div class="col-xs-6 col-md-3 col-lg-3">
              <label :for="`procuradores-${index + 1}-admissionDate`">{{text.CorporatePartnerShareHolder.labels.admissionDate}}</label>
              <date-picker :id="`procuradores-${index + 1}-admissionDate`" :lang="'pt-br'" :format="'DD/MM/YYYY'" v-mask="'##/##/####'" v-model="item.admissionDate" @focusout.native="autoSaveForm(12, formData.CorporatePartnerShareHolder.procuradores, $event.target.value)"></date-picker>
            </div>

            <div class="col-xs-6 col-sm-4 col-md-3 col-lg-3">
              <label :for="`procuradores-${index + 1}-expirationDate`">{{text.CorporatePartnerShareHolder.labels.expirationDateProcuration}}</label>
              <date-picker :id="`procuradores-${index + 1}-expirationDate`" :lang="'pt-br'" :format="'DD/MM/YYYY'" v-mask="'##/##/####'" v-model="item.expirationDate" @focusout.native="autoSaveForm(12, formData.CorporatePartnerShareHolder.procuradores, $event.target.value)"></date-picker>
            </div>

            <div :class="{
              'form-invalid': $v.formData.CorporatePartnerShareHolder.procuradores.$each[index].position.$error,
              'col-xs-6 col-sm-4 col-md-4': formData.CorporatePartnerShareHolder.procuradores.length > 1 && (index === formData.CorporatePartnerShareHolder.procuradores.length - 1),
              'col-xs-6 col-md-5': (formData.CorporatePartnerShareHolder.procuradores.length > 1 && (index !== formData.CorporatePartnerShareHolder.procuradores.length - 1)) || formData.CorporatePartnerShareHolder.procuradores.length <= 1,
              }">
              <label :for="`procuradores-${index + 1}-position`">{{text.CorporatePartnerShareHolder.labels.position}}</label>
              <input type="text" :id="`procuradores-${index + 1}-position`" v-model="item.position" @blur="autoSaveForm(12, formData.CorporatePartnerShareHolder.procuradores, $event.target.value)">
            </div>

            <div class="col-xs-2 col-md-1" v-if="index == formData.CorporatePartnerShareHolder.procuradores.length - 1">
              <label>&nbsp;</label>
              <button @click="addProcurador(index)"><span class="glyphicon glyphicon-plus"></span></button>
            </div>
            <div class="col-xs-2 col-md-1" v-if="formData.CorporatePartnerShareHolder.procuradores.length > 1">
              <label>&nbsp;</label>
              <button @click="removeProcurador(index)"><span class="glyphicon glyphicon-trash"></span></button>
            </div>
          </div>
        </fieldset>

      </div>

    </section>

    <section id="participacoes" class="panel panel-default">
      <div class="panel-heading">
        <span>{{text.participacoes.title}}</span>
      </div>
      <div class="panel-body">

        <!-- <p>{{formData.participacoes}}</p> -->

        <div class="row" v-for="(item, index) in formData.participacoes" :key="index" :class="{'form-section': formData.participacoes.length > 1 && index !== formData.participacoes.length - 1}">

          <div :class="{
            'form-invalid': $v.formData.participacoes.$each[index].companyName.$error,
            'col-xs-6 col-md-7 col-lg-4': formData.participacoes.length <= 1,
            'col-xs-6 col-md-7 col-lg-3': formData.participacoes.length > 1,
            }">
            <label :for="`participacoes-${index + 1}-companyName`">{{text.participacoes.labels.companyName}}</label>
            <input type="text" :id="`participacoes-${index + 1}-companyName`" v-model="item.companyName" @blur="autoSaveForm(14, formData.participacoes, $event.target.value)">
          </div>

          <div class="col-xs-6 col-md-5 col-lg-3" :class="{'form-invalid': $v.formData.participacoes.$each[index].lineBusiness.$error}">
            <label :for="`participacoes-${index + 1}-lineBusiness`">{{text.participacoes.labels.lineBusiness}}</label>
            <input type="text" :id="`participacoes-${index + 1}-lineBusiness`" v-model="item.lineBusiness" @blur="autoSaveForm(14, formData.participacoes, $event.target.value)">
          </div>

          <div :class="{
            'form-invalid': $v.formData.participacoes.$each[index].cnpj.$error,
            'col-xs-6 col-sm-6 col-md-6 col-lg-2': formData.participacoes.length <= 1,
            'col-xs-6 col-sm-4 col-md-5 col-lg-2': (formData.participacoes.length > 1 && index === formData.participacoes.length - 1),
            'col-xs-6 col-sm-6 col-md-6 col-lg-3': (formData.participacoes.length > 1 && index !== formData.participacoes.length - 1),
            }">
            <label :for="`participacoes-${index + 1}-cnpj`">{{text.participacoes.labels.cnpj}}</label>
            <the-mask :mask="'##.###.###/####-##'" :id="`participacoes-${index + 1}-cnpj`" v-model="item.cnpj" @blur.native="autoSaveForm(14, formData.participacoes, $event.target.value)"></the-mask>
          </div>

          <div class="col-xs-6 col-sm-4 col-md-5 col-lg-2" :class="{'form-invalid': $v.formData.participacoes.$each[index].capitalParticipation.$error}">
            <label :for="`participacoes-${index + 1}-capitalParticipation`">{{text.participacoes.labels.capitalParticipation}}</label>
            <input type="number" step="1" min="0" max="100" :id="`participacoes-${index + 1}-capitalParticipation`" v-model="item.capitalParticipation" @blur="autoSaveForm(14, formData.participacoes, $event.target.value)">
          </div>

          <div class="col-xs-2 col-md-1" v-if="index === formData.participacoes.length - 1">
              <label>&nbsp;</label>
              <button @click="addParticipacao(index)"><span class="glyphicon glyphicon-plus"></span></button>
          </div>
          <div class="col-xs-2 col-md-1" v-if="formData.participacoes.length > 1">
            <label>&nbsp;</label>
            <button @click="removeParticipacao(index)"><span class="glyphicon glyphicon-trash"></span></button>
          </div>

        </div>
      </div>
    </section>

    <section id="dados-patrimoniais" class="panel panel-default">
      <div class="panel-heading">
        <span>{{text.dadosPatrimoniais.title}}</span>
      </div>
      <div class="panel-body">

        <fieldset id="bens-imoveis">
          <legend>{{text.dadosPatrimoniais.labels.realEstate}}</legend>
          <div class="row form-group" v-for="(item, index) in formData.dadosPatrimoniais.realEstate" :key="index" :class="{'form-section': index !== formData.dadosPatrimoniais.realEstate.length - 1 && formData.dadosPatrimoniais.realEstate.length > 1}">

            <div :class="{
              'form-invalid': $v.formData.dadosPatrimoniais.realEstate.$each[index].description.$error,
              'col-xs-6 col-sm-12 col-md-5': (formData.dadosPatrimoniais.realEstate.length <= 1) || (formData.dadosPatrimoniais.realEstate.length > 1 && index !== formData.dadosPatrimoniais.realEstate.length - 1),
              'col-xs-6 col-sm-12 col-md-4': formData.dadosPatrimoniais.realEstate.length > 1 && index === formData.dadosPatrimoniais.realEstate.length - 1,
              }">
              <label :for="`bensImoveis-${index + 1}-description`">{{text.dadosPatrimoniais.labels.description}}</label>
              <input type="text" :id="`bensImoveis-${index + 1}-description`" v-model="item.description" @blur="autoSaveForm(8, formData.dadosPatrimoniais.realEstate, $event.target.value)">
            </div>

            <div class="col-xs-6 col-md-3" :class="{
              'form-invalid': $v.formData.dadosPatrimoniais.realEstate.$each[index].location.$error,
              'col-sm-6': formData.dadosPatrimoniais.realEstate.length <= 1 || (formData.dadosPatrimoniais.realEstate.length > 1 && index !== formData.dadosPatrimoniais.realEstate.length - 1),
              'col-sm-4': formData.dadosPatrimoniais.realEstate.length > 1 && index === formData.dadosPatrimoniais.realEstate.length - 1,
              }">
              <label :for="`bensImoveis-${index + 1}-location`">{{text.dadosPatrimoniais.labels.location}}</label>
              <input type="text" :id="`bensImoveis-${index + 1}-location`" v-model="item.location" @blur="autoSaveForm(8, formData.dadosPatrimoniais.realEstate, $event.target.value)">
            </div>

            <div class="col-xs-6 col-sm-4 col-md-3" :class="{'form-invalid': $v.formData.dadosPatrimoniais.realEstate.$each[index].value.$error}">
              <label :for="`bensImoveis-${index + 1}-value`">{{text.dadosPatrimoniais.labels.value}}</label>
              <Money type="text" :id="`bensImoveis-${index + 1}-value`" v-bind="controls.money" v-model="item.value" @blur.native="autoSaveForm(8, formData.dadosPatrimoniais.realEstate, $event.target.value)"></Money>
            </div>

            <div class="col-xs-2 col-md-1" v-if="index === formData.dadosPatrimoniais.realEstate.length - 1">
              <label>&nbsp;</label>
              <button @click="addRealEstate(index)"><span class="glyphicon glyphicon-plus"></span></button>
            </div>
            <div class="col-xs-2 col-md-1" v-if="formData.dadosPatrimoniais.realEstate.length > 1">
              <label>&nbsp;</label>
              <button @click="removeRealEstate(index)"><span class="glyphicon glyphicon-trash"></span></button>
            </div>
          </div>
        </fieldset>

        <fieldset id="bens-moveis">
          <!-- <p>{{formData.dadosPatrimoniais.movables}}</p> -->
          <legend>{{text.dadosPatrimoniais.labels.movables}}</legend>
          <div class="row" v-for="(item, index) in formData.dadosPatrimoniais.movables" :key="index" :class="{'form-section': index !== formData.dadosPatrimoniais.movables.length - 1 && formData.dadosPatrimoniais.movables.length > 1}">

            <div class="col-xs-6 col-sm-8" :class="{
              'form-invalid': $v.formData.dadosPatrimoniais.movables.$each[index].movableSpecieID.$error,
              'col-md-5': formData.dadosPatrimoniais.movables.length <= 1 || (formData.dadosPatrimoniais.movables.length > 1 && index !== formData.dadosPatrimoniais.movables.length - 1),
              'col-md-4': formData.dadosPatrimoniais.movables.length > 1 && index === formData.dadosPatrimoniais.movables.length - 1,
            }">
              <label :for="`movables-${index + 1}-movableSpecieID`">{{text.dadosPatrimoniais.labels.type}}</label>
              <select :id="`movables-${index + 1}-movableSpecieID`" v-model="item.movableSpecieID" @blur="autoSaveForm(7, formData.dadosPatrimoniais.movables, $event.target.value)">
                <option v-for="item in content.movableSpeciesList" :key="item.id" :value="item.id">{{item.description}}</option>
              </select>
            </div>

            <div class="col-xs-6 col-sm-4 col-md-2" :class="{'form-invalid': $v.formData.dadosPatrimoniais.movables.$each[index].markModel.$error,}">
              <label :for="`movables-${index + 1}-markModel`">{{text.dadosPatrimoniais.labels.markModel}}</label>
              <input type="text" :id="`movables-${index + 1}-markModel`" v-model="item.markModel" @blur="autoSaveForm(7, formData.dadosPatrimoniais.movables, $event.target.value)">
            </div>

            <div class="col-xs-6 col-sm-4 col-md-2" :class="{'form-invalid': $v.formData.dadosPatrimoniais.movables.$each[index].year.$error,}">
              <label :for="`movables-${index + 1}-year`">{{text.dadosPatrimoniais.labels.year}}</label>
              <input type="text" :id="`movables-${index + 1}-year`" v-model="item.year" @blur="autoSaveForm(7, formData.dadosPatrimoniais.movables, $event.target.value)">
            </div>

            <div class="col-md-2" :class="{
              'form-invalid': $v.formData.dadosPatrimoniais.movables.$each[index].value.$error,
              'col-xs-6 col-sm-6': formData.dadosPatrimoniais.movables.length <= 1 || (formData.dadosPatrimoniais.movables.length > 1 && index !== formData.dadosPatrimoniais.movables.length - 1),
              'col-xs-6 col-sm-4': formData.dadosPatrimoniais.movables.length > 1 && index === formData.dadosPatrimoniais.movables.length - 1,
            }">
              <label :for="`movables-${index + 1}-value`">{{text.dadosPatrimoniais.labels.value}}</label>
              <Money type="text" :id="`movables-${index + 1}-value`" v-bind="controls.money" v-model="item.value" @blur.native="autoSaveForm(7, formData.dadosPatrimoniais.movables, $event.target.value)"></Money>
            </div>

            <div class="col-xs-2 col-md-1" v-if="index === formData.dadosPatrimoniais.movables.length - 1">
              <label>&nbsp;</label>
              <button @click="addMovable(index)"><span class="glyphicon glyphicon-plus"></span></button>
            </div>
            <div class="col-xs-2 col-md-1" v-if="formData.dadosPatrimoniais.movables.length > 1">
              <label>&nbsp;</label>
              <button @click="removeMovable(index)"><span class="glyphicon glyphicon-trash"></span></button>
            </div>
          </div>
        </fieldset>
      </div>
    </section>

    <section id="referencias-bancarias" class="panel panel-default">
      <div class="panel-heading">
        <span>{{text.referenciasBancarias.title}}</span>
      </div>
      <div class="panel-body">
        <div class="row" v-for="(item, index) in $v.formData.referenciasBancarias.$each.$iter" :key="index" :class="{'form-section': index == formData.referenciasBancarias.length - 1 && formData.referenciasBancarias.length > 1}">

          <!-- <p>{{item}}</p> -->

          <div class="col-xs-6 col-sm-4 col-md-2" :class="{'form-invalid': item.bankCode.$error}">
            <label :for="`referenciasBancarias-${index + 1}-bankCode`">{{text.referenciasBancarias.labels.bankCode}}</label>
            <input type="text" disabled :id="`referenciasBancarias-${index + 1}-bankCode`" v-model="item.bankCode.$model">
            <div class="tooltip-campo-vazio alert alert-danger" v-if="!item.bankCode.$model"><span class='glyphicon glyphicon-remove' aria-hidden='true' @click="msgHidden($event)" :class="{tooltipHidden: isActive}"></span> {{text.campoObrigatorioVazio.texto}}</div>
          </div>
          <div class="col-xs-6 col-sm-5 col-md-2" :class="{'form-invalid': item.bankName.$error}">
            <label :for="`referenciasBancarias-${index + 1}-bankName`">{{text.referenciasBancarias.labels.bankName}}</label>
            <input type="text" disabled :id="`referenciasBancarias-${index + 1}-bankName`" v-model="item.bankName.$model">
            <div class="tooltip-campo-vazio alert alert-danger" v-if="!item.bankName.$model"><span class='glyphicon glyphicon-remove' aria-hidden='true' @click="msgHidden($event)" :class="{tooltipHidden: isActive}"></span> {{text.campoObrigatorioVazio.texto}}</div>
          </div>
          <div class="col-xs-6 col-sm-3 col-md-2" :class="{'form-invalid': item.agency.$error}">
            <label :for="`referenciasBancarias-${index + 1}-agency`">{{text.referenciasBancarias.labels.agency}}</label>
            <input type="text" disabled :id="`referenciasBancarias-${index + 1}-agency`" v-model="item.agency.$model">
            <div class="tooltip-campo-vazio alert alert-danger" v-if="!item.agency.$model"><span class='glyphicon glyphicon-remove' aria-hidden='true' @click="msgHidden($event)" :class="{tooltipHidden: isActive}"></span> {{text.campoObrigatorioVazio.texto}}</div>
          </div>
          <div class="col-xs-6 col-sm-2 col-md-1" :class="{'form-invalid': item.agencyCV.$error}">
            <label :for="`referenciasBancarias-${index + 1}-agencyCV`">{{text.referenciasBancarias.labels.agencyCV}}</label>
            <input type="text" disabled :id="`referenciasBancarias-${index + 1}-agencyCV`" v-model="item.agencyCV.$model">
          </div>
          <div class="col-xs-6 col-sm-3 col-md-2" :class="{'form-invalid': item.account.$error}">
            <label :for="`referenciasBancarias-${index + 1}-account`">{{text.referenciasBancarias.labels.account}}</label>
            <input type="text" disabled :id="`referenciasBancarias-${index + 1}-account`" v-model="item.account.$model">
            <div class="tooltip-campo-vazio alert alert-danger" v-if="!item.account.$model"><span class='glyphicon glyphicon-remove' aria-hidden='true' @click="msgHidden($event)" :class="{tooltipHidden: isActive}"></span> {{text.campoObrigatorioVazio.texto}}</div>
          </div>
          <div class="col-xs-6 col-sm-2 col-md-1" :class="{'form-invalid': item.accountCV.$error}">
            <label :for="`referenciasBancarias-${index + 1}-accountCV`">{{text.referenciasBancarias.labels.accountCV}}</label>
            <input type="text" disabled :id="`referenciasBancarias-${index + 1}-accountCV`" v-model="item.accountCV.$model">
          </div>
          <div class="col-xs-6 col-sm-5 col-md-2" :class="{'form-invalid': item.accountSince.$error}">
            <label for="">{{text.referenciasBancarias.labels.accountSince}}</label>
            <date-picker :id="`referenciasBancarias-${index + 1}-accountSince`" :lang="'pt-br'" :type="'month'" :format="'MM/YYYY'" v-mask="'##/####'" v-model="item.accountSince.$model" @focusout.native="autoSaveForm(5, formData.referenciasBancarias, $event.target.value)"></date-picker>
          </div>
        </div>
      </div>
      <div class="panel-footer">
        <span>{{text.camposObrigatorios.texto}}</span>
      </div>
    </section>

    <section id="referencias-comerciais" class="panel panel-default">

      <div class="panel-heading">
        <span>{{text.referenciasComerciais.title}}</span>
      </div>

      <div class="panel-body">

        <div class="row" v-for="(item, index) in formData.referenciasComerciais" :key="index" :class="{'form-section': formData.referenciasComerciais.length > 1 && index !== formData.referenciasComerciais.length - 1 }">

          <!-- <p>{{$v.formData.referenciasComerciais.$each[index]}}</p> -->

          <div :class="{
            'col-xs-12 col-sm-6 col-md-7': formData.referenciasComerciais.length <= 1 || (formData.referenciasComerciais.length > 1 && index !== formData.referenciasComerciais.length - 1),
            'col-xs-12 col-sm-4 col-md-6': formData.referenciasComerciais.length > 1 && (index === formData.referenciasComerciais.length - 1),
            'form-invalid': $v.formData.referenciasComerciais.$each[index].companyName.$error
          }">
            <label :for="`referencias-comerciais-${index + 1}-companyName`">{{text.referenciasComerciais.labels.companyName}}</label>
            <input type="text" :id="`referencias-comerciais-${index + 1}-companyName`" v-model="item.companyName" @blur="autoSaveForm(6, formData.referenciasComerciais, $event.target.value)">
          </div>

          <div class="col-xs-12 col-sm-4" :class="{'form-invalid': $v.formData.referenciasComerciais.$each[index].phone.$error}">
            <label :for="`referencias-comerciais-${index + 1}-phone`">{{text.referenciasComerciais.labels.phone}}</label>
            <the-mask :id="`referencias-comerciais-${index + 1}-phone`" :mask="['(##) ####-####', '(##) #####-####']" :masked="true" v-model="item.phone" @blur.native="autoSaveForm(6, formData.referenciasComerciais, $event.target.value)"></the-mask>
          </div>

          <div class="col-xs-2 col-md-1" v-if="index === formData.referenciasComerciais.length - 1">
            <label>&nbsp;</label>
            <button @click="addReferenciaComercial(index)"><span class="glyphicon glyphicon-plus"></span></button>
          </div>
          <div class="col-xs-2 col-md-1" v-if="formData.referenciasComerciais.length > 1">
            <label>&nbsp;</label>
            <button @click="removeReferenciaComercial(index)"><span class="glyphicon glyphicon-trash"></span></button>
          </div>
        </div>
      </div>
    </section>

    <section id="principais-parceiros" class="panel panel-default">
      <div class="panel-heading">
        <span>{{text.principaisParceiros.title}}</span>
      </div>

      <div class="panel-body">

        <div class="row" v-for="(item, index) in formData.principaisParceiros" :key="index" :class="{'form-section': index !== formData.principaisParceiros.length - 1 && formData.principaisParceiros.length > 1}">

          <!-- <p>{{$v.formData.principaisParceiros.$each[index]}}</p> -->

          <div :class="{
            'form-invalid': $v.formData.principaisParceiros.$each[index].companyName.$error,
            'col-xs-12 col-lg-5': formData.principaisParceiros.length > 1 && index === formData.principaisParceiros.length - 1,
            'col-xs-12 col-lg-6': (formData.principaisParceiros.length > 1 && index !== formData.principaisParceiros.length - 1) || formData.principaisParceiros.length <= 1,
            }">
            <label for="">{{text.principaisParceiros.labels.companyName}}</label>
            <input type="text" v-model="item.companyName" @blur="autoSaveForm(13, formData.principaisParceiros, $event.target.value)">
          </div>

          <div :class="{
            'form-invalid': $v.formData.principaisParceiros.$each[index].product.$error,
            'col-xs-12 col-sm-4 col-md-5 col-lg-3': formData.principaisParceiros.length > 1 && index === formData.principaisParceiros.length - 1,
            'col-xs-12 col-sm-6 col-md-6 col-lg-3': (formData.principaisParceiros.length > 1 && index !== formData.principaisParceiros.length - 1) || formData.principaisParceiros.length <= 1,
            }">
            <label for="">{{text.principaisParceiros.labels.product}}</label>
            <input type="text" v-model="item.product" @blur="autoSaveForm(13, formData.principaisParceiros, $event.target.value)">
          </div>

          <div class="col-xs-12 col-sm-4 col-md-5 col-lg-2" :class="{'form-invalid': $v.formData.principaisParceiros.$each[index].productionMonthly.$error}">
            <label for="">{{text.principaisParceiros.labels.productionMonthly}}</label>
            <Money type="text" v-bind="controls.money" v-model="item.productionMonthly" @blur.native="autoSaveForm(13, formData.principaisParceiros, $event.target.value)"></Money>
          </div>

          <div class="col-xs-2 col-md-1" v-if="index == formData.principaisParceiros.length - 1">
            <label>&nbsp;</label>
            <button @click="addPrincipalParceiro(index)"><span class="glyphicon glyphicon-plus"></span></button>
          </div>
          <div class="col-xs-2 col-md-1" v-if="formData.principaisParceiros.length > 1">
            <label>&nbsp;</label>
            <button @click="removePrincipalParceiro(index)"><span class="glyphicon glyphicon-trash"></span></button>
          </div>
        </div>
      </div>
    </section>

    <section id="Revenue" class="panel panel-default">
      <div class="panel-heading">
        <span>{{text.Revenue.title}}</span>
      </div>

      <div class="panel-body">
        <!-- <code>{{$v.formData.Revenue}}</code> -->
        <fieldset>
          <legend>{{text.Revenue.labels.lastTwoYears}}</legend>
          <div class="row form-group">
            <div class="col-xs-4 col-md-2" :class="{'form-invalid': $v.formData.Revenue.revenuesYear01.$error}">
              <label for="Revenue-revenuesYear01">{{text.Revenue.labels.year}}</label>
              <the-mask id="Revenue-revenuesYear01" v-model.number="formData.Revenue.revenuesYear01" :mask="'####'" @blur.native="autoSaveForm(16, formData.Revenue, $event.target.value)"></the-mask>
            </div>
            <div class="col-xs-8 col-md-4" :class="{'form-invalid': $v.formData.Revenue.revenuesValue01.$error}">
              <label for="Revenue-revenuesValue01">{{text.Revenue.labels.value}}</label>
              <Money id="Revenue-revenuesValue01" v-bind="controls.money" type="text" v-model="formData.Revenue.revenuesValue01" @blur.native="autoSaveForm(16, formData.Revenue, $event.target.value)"></Money>
            </div>
            <div class="col-xs-4 col-md-2" :class="{'form-invalid': $v.formData.Revenue.revenuesYear02.$error}">
              <label for="Revenue-revenuesYear02">{{text.Revenue.labels.year}}</label>
              <the-mask id="Revenue-revenuesYear02" v-model.number="formData.Revenue.revenuesYear02" :mask="'####'" @blur.native="autoSaveForm(16, formData.Revenue, $event.target.value)"></the-mask>
            </div>
            <div class="col-xs-8 col-md-4" :class="{'form-invalid': $v.formData.Revenue.revenuesValue02.$error}">
              <label for="Revenue-revenuesValue02">{{text.Revenue.labels.value}}</label>
              <Money id="Revenue-revenuesValue02" v-bind="controls.money" type="text" v-model="formData.Revenue.revenuesValue02" @blur.native="autoSaveForm(16, formData.Revenue, $event.target.value)"></Money>
            </div>
          </div>
        </fieldset>
        <fieldset :class="{'form-invalid': $v.formData.Revenue.companySizeID.$error}">
          <legend>{{text.Revenue.labels.companySizeID}}</legend>
          <div class="col-xs-3 col-md-2" v-for="size in content.companySizesList" :key="size.id">
            <label :for="`companySizeID-${size.description}`">
              <input type="radio" name="Revenue-companySizeID" v-model="formData.Revenue.companySizeID" :id="`companySizeID-${size.description}`" :value="size.id" @change="autoSaveForm(16, formData.Revenue, $event.target.value)">
              <span>{{size.description}}</span>
            </label>
          </div>
        </fieldset>
      </div>

      <div class="panel-footer">
        <span>{{text.camposObrigatorios.texto}}</span>
      </div>
    </section>

    <section id="principais-produtos" class="panel panel-default">
      <div class="panel-heading">
        <span>{{text.principaisProdutos.title}}</span>
      </div>

      <div class="panel-body">

        <div class="row" v-for="(item, index) in formData.principaisProdutos" :key="index" :class="{'form-section': formData.principaisProdutos.length > 1 && index !== formData.principaisProdutos.length - 1}">

          <!-- <p>{{$v.formData.principaisProdutos.$each[index]}}</p> -->

          <div class="col-xs-6 col-md-3" :class="{'form-invalid': $v.formData.principaisProdutos.$each[index].revenuesTypeId.$error}">
            <label :for="`principais-produtos-${index + 1}-revenueTypesList`">{{text.principaisProdutos.labels.product}}</label>
            <select :id="`principais-produtos-${index + 1}-revenueTypesList`" v-model="item.revenuesTypeId" @blur="autoSaveForm(15, formData.principaisProdutos, $event.target.value)">
              <option v-for="type in content.revenueTypesList" :key="type.id" :value="type.id">{{type.description}}</option>
            </select>
          </div>

          <div class="col-xs-6 col-md-3" :class="{'form-invalid': $v.formData.principaisProdutos.$each[index].productionMonthly.$error}">
            <label :for="`principais-produtos-${index + 1}-productionMonthly`">{{text.principaisProdutos.labels.productionMonthly}}</label>
            <Money :id="`principais-produtos-${index + 1}-productionMonthly`" v-bind="controls.money" type="text" v-model="item.productionMonthly" @blur.native="autoSaveForm(15, formData.principaisProdutos, $event.target.value)"></Money>
          </div>

          <div class="col-xs-6 col-md-3" :class="{'form-invalid': $v.formData.principaisProdutos.$each[index].averageValue.$error}">
            <label :for="`principais-produtos-${index + 1}-averageValue`">{{text.principaisProdutos.labels.averageValue}}</label>
            <Money :id="`principais-produtos-${index + 1}-averageValue`" v-bind="controls.money" type="text" v-model="item.averageValue" @blur.native="autoSaveForm(15, formData.principaisProdutos, $event.target.value)"></Money>
          </div>

          <div class="col-xs-6 col-md-3" :class="{'form-invalid': $v.formData.principaisProdutos.$each[index].qtde.$error}">
            <label :for="`principais-produtos-${index + 1}-qtde`">{{text.principaisProdutos.labels.quantity}}</label>
            <input :id="`principais-produtos-${index + 1}-qtde`" type="number" step="1" min="0" v-model="item.qtde" @blur="autoSaveForm(15, formData.principaisProdutos, $event.target.value)">
          </div>

          <div :class="{
            '': formData.principaisProdutos.length > 1 && index === formData.principaisProdutos.length - 1 && formData.principaisProdutos.length < 2,
            'col-xs-10 col-md-11': (formData.principaisProdutos.length > 1 && index !== formData.principaisProdutos.length - 1) || formData.principaisProdutos.length <= 1 || formData.principaisProdutos.length == 2,
            }">
            <label :for="`principais-produtos-${index + 1}-observation`">{{text.principaisProdutos.labels.details}}</label>
            <textarea :id="`principais-produtos-${index + 1}-observation`" v-model="item.observation" @blur="autoSaveForm(15, formData.principaisProdutos, $event.target.value)"></textarea>
          </div>

          <div class="col-xs-2 col-md-1" v-if="index === formData.principaisProdutos.length - 1 && formData.principaisProdutos.length < 2">
            <label>&nbsp;</label>
            <button @click="addPrincipalProduto(index)"><span class="glyphicon glyphicon-plus"></span></button>
          </div>
          <div class="col-xs-2 col-md-1" v-if="formData.principaisProdutos.length > 1">
            <label>&nbsp;</label>
            <button @click="removePrincipalProduto(index)"><span class="glyphicon glyphicon-trash"></span></button>
          </div>
        </div>
      </div>
    </section>

    <section id="financiamento-veiculos" class="panel panel-default">

      <div class="panel-heading">
        <span v-html="text.financiamentoVeiculos.title"></span>
      </div>

      <div class="panel-body">

        <fieldset id="tipos-veiculos" class="form-group col-xs-12 col-md-6">
          <legend>{{text.financiamentoVeiculos.labels.vehicleTypes}}</legend>
          <div class="row">
            <div class="col-xs-6">
              <label for="vehicleType-light">
                <input type="checkbox" v-model="formData.financiamentoVeiculos.typeLight" name="financiamento-vehicleTypes" id="vehicleType-light" :value="true" @change="autoSaveForm(17, formData.financiamentoVeiculos, $event.target.value)">
                <span>{{text.financiamentoVeiculos.labels.light}}</span>
              </label>
            </div>
            <div class="col-xs-6">
              <label for="vehicleType-heavy">
                <input type="checkbox" v-model="formData.financiamentoVeiculos.typeHeavy" name="financiamento-vehicleTypes" id="vehicleType-heavy" :value="true" @change="autoSaveForm(17, formData.financiamentoVeiculos, $event.target.value)">
                <span>{{text.financiamentoVeiculos.labels.heavy}}</span>
              </label>
            </div>
            <div class="col-xs-6">
              <label for="vehicleType-bikes">
                <input type="checkbox" v-model="formData.financiamentoVeiculos.typeMoto" name="financiamento-vehicleTypes" id="vehicleType-bikes" :value="true" @change="autoSaveForm(17, formData.financiamentoVeiculos, $event.target.value)">
                <span>{{text.financiamentoVeiculos.labels.bikes}}</span>
              </label>
            </div>
            <div class="col-xs-6">
              <label for="vehicleType-utility">
                <input type="checkbox" v-model="formData.financiamentoVeiculos.typeUtility" name="financiamento-vehicleTypes" id="vehicleType-utility" :value="true" @change="autoSaveForm(17, formData.financiamentoVeiculos, $event.target.value)">
                <span>{{text.financiamentoVeiculos.labels.utility}}</span>
              </label>
            </div>
          </div>
        </fieldset>

        <fieldset id="estoque-veiculos" class="form-group col-xs-12 col-md-6">
          <legend>{{text.financiamentoVeiculos.labels.vehicleStock}}</legend>
          <div class="row">
            <div class="col-xs-12">
              <label for="vehicleStock-qtySmall">
                <input type="radio" name="financiamento-vehicleStock" id="vehicleStock-qtySmall" :value="true" v-model="formData.financiamentoVeiculos.sizeStockSmall" @change="autoSaveForm(17, formData.financiamentoVeiculos, $event.target.value)">
                <span>{{text.financiamentoVeiculos.labels.qtySmall}}</span>
              </label>
            </div>
            <div class="col-xs-12">
              <label for="vehicleStock-qtyMedium">
                <input type="radio" name="financiamento-vehicleStock" id="vehicleStock-qtyMedium" :value="true" v-model="formData.financiamentoVeiculos.sizeStockMedium" @change="autoSaveForm(17, formData.financiamentoVeiculos, $event.target.value)">
                <span>{{text.financiamentoVeiculos.labels.qtyMedium}}</span>
              </label>
            </div>
            <div class="col-xs-12">
              <label for="vehicleStock-qtyLarge">
                <input type="radio" name="financiamento-vehicleStock" id="vehicleStock-qtyLarge" :value="true" v-model="formData.financiamentoVeiculos.sizeStockLarge" @change="autoSaveForm(17, formData.financiamentoVeiculos, $event.target.value)">
                <span>{{text.financiamentoVeiculos.labels.qtyLarge}}</span>
              </label>
            </div>
          </div>
        </fieldset>

        <fieldset id="faixas-veiculos" class="form-group col-xs-12 col-md-6">
          <legend>{{text.financiamentoVeiculos.labels.vehicleAgeQuantity}}</legend>
          <div class="row">
            <div class="col-xs-7">
              <label for="financiamento-vehicleAge-ageNew">{{text.financiamentoVeiculos.labels.ageNew}}</label>
            </div>
            <div class="col-xs-5">
              <input type="number" step="1" min="0" id="financiamento-vehicleAge-ageNew" v-model="formData.financiamentoVeiculos.qtdePhase0Km" @blur="autoSaveForm(17, formData.financiamentoVeiculos, $event.target.value)">
            </div>
          </div>
          <div class="row">
            <div class="col-xs-7">
              <label for="financiamento-vehicleAge-ageAbove2002">{{text.financiamentoVeiculos.labels.ageAbove2002}}</label>
            </div>
            <div class="col-xs-5">
              <input type="number" step="1" min="0" id="financiamento-vehicleAge-ageAbove2002" v-model="formData.financiamentoVeiculos.qtdePhaseUp2002" @blur="autoSaveForm(17, formData.financiamentoVeiculos, $event.target.value)">
            </div>
          </div>
          <div class="row">
            <div class="col-xs-7">
              <label for="financiamento-vehicleAge-ageBelow2002">{{text.financiamentoVeiculos.labels.ageBelow2002}}</label>
            </div>
            <div class="col-xs-5">
              <input type="number" step="1" min="0" id="financiamento-vehicleAge-ageBelow2002" v-model="formData.financiamentoVeiculos.qtdePhaseDown2002" @blur="autoSaveForm(17, formData.financiamentoVeiculos, $event.target.value)">
            </div>
          </div>
        </fieldset>

        <fieldset id="outros-veiculos" class="col-xs-12 col-md-6">
          <legend>{{text.financiamentoVeiculos.labels.other}}</legend>
          <div class="row">
            <div class="col-xs-7">
              <label for="">{{text.financiamentoVeiculos.labels.otherMonthlySold}}</label>
            </div>
            <div class="col-xs-5">
              <input type="number" step="1" min="0" v-model.number="formData.financiamentoVeiculos.volumeSoldMonth" @blur="autoSaveForm(17, formData.financiamentoVeiculos, $event.target.value)">
            </div>
          </div>
          <div class="row">
            <div class="col-xs-7">
              <label for="">{{text.financiamentoVeiculos.labels.otherMonthlyFinanced}}</label>
            </div>
            <div class="col-xs-5">
              <input type="number" step="1" min="0" v-model.number="formData.financiamentoVeiculos.volumeFinancedMonth" @blur="autoSaveForm(17, formData.financiamentoVeiculos, $event.target.value)">
            </div>
          </div>
          <div class="row">
            <div class="col-xs-7">
              <label for="">{{text.financiamentoVeiculos.labels.otherMonthlyFinancedValue}}</label>
            </div>
            <div class="col-xs-5">
              <Money v-bind="controls.money" type="text" v-model.number="formData.financiamentoVeiculos.valueFinancedMonth" @blur.native="autoSaveForm(17, formData.financiamentoVeiculos, $event.target.value)"></Money>
            </div>
          </div>
        </fieldset>

      </div>
    </section>

    <section id="declaracao-pep" class="panel panel-default">
      <div class="panel-heading" @click="() => $v.formData.declaracaoPEP.$touch()">
        <span>{{text.declaracaoPEP.title}}</span>
      </div>
      <div class="panel-body" :class="{'form-invalid': $v.controls.hasPEP.$error}">
        <fieldset>
          <span>{{text.declaracaoPEP.description}}</span>
        </fieldset>

        <div class="row form-section" >
          <div class="col-xs-6 col-md-4 col-lg-3">
            <label for="hasPEP-true">
              <input type="radio" name="declaracaoPEP-hasPEP" id="hasPEP-true" :value="true" v-model="controls.hasPEP">
              {{text.declaracaoPEP.labels.yes}}
            </label>
          </div>
          <div class="col-xs-6 col-md-4 col-lg-2">
            <label for="hasPEP-false">
              <input type="radio" name="declaracaoPEP-hasPEP" id="hasPEP-false" :value="false" v-model="controls.hasPEP">
              {{text.declaracaoPEP.labels.no}}
            </label>
          </div>
        </div>

        <div class="row" v-if="controls.hasPEP" v-for="(item, index) in $v.formData.declaracaoPEP.$each.$iter" :key="index" :class="{'form-section': formData.declaracaoPEP.length > 1 && index != formData.declaracaoPEP.length > 1 }">

          <!-- <p>{{item}}</p> -->

          <div class="col-xs-6 col-sm-4 col-md-4 col-lg-3" :class="{'form-invalid': item.cpf.$error}">
            <label for="">{{text.declaracaoPEP.labels.cpf}}</label>
            <the-mask :mask="'###.###.###-##'" v-model="item.cpf.$model" @blur.native="autoSaveForm(9, formData.declaracaoPEP, $event.target.value)"></the-mask>
          </div>

          <div class="col-xs-6 col-sm-8 col-md-8 col-lg-7" :class="{'form-invalid': item.name.$error}">
            <label for="">{{text.declaracaoPEP.labels.name}}</label>
            <input type="text" v-model="item.name.$model" @blur="autoSaveForm(9, formData.declaracaoPEP, $event.target.value)">
          </div>

          <div class="col-xs-6 col-sm-4 col-md-4 col-lg-2" :class="{'form-invalid': item.warrantIni.$error}">
            <label for="">{{text.declaracaoPEP.labels.startMandate}}</label>
            <the-mask :mask="'####'" v-model.number="item.warrantIni.$model" @blur.native="autoSaveForm(9, formData.declaracaoPEP, $event.target.value)"></the-mask>
          </div>

          <div class="col-xs-6 col-sm-4 col-md-4 col-lg-2" :class="{'form-invalid': item.warrantEnd.$error}">
            <label for="">{{text.declaracaoPEP.labels.expirationDate}}</label>
            <the-mask :mask="'####'" v-model.number="item.warrantEnd.$model" @blur.native="autoSaveForm(9, formData.declaracaoPEP, $event.target.value)"></the-mask>
          </div>

          <div class="col-xs-6 col-sm-4 col-md-4" :class="{
            'form-invalid': item.degreeRelationship.$error,
            'col-lg-2': formData.declaracaoPEP.length > 1 && index == formData.declaracaoPEP.length - 1,
            'col-lg-3': (formData.declaracaoPEP.length > 1 && index != formData.declaracaoPEP.length - 1) ||formData.declaracaoPEP.length <= 1,
            }">
            <label for="">{{text.declaracaoPEP.labels.kinship}}</label>
            <input type="text" v-model="item.degreeRelationship.$model" @blur="autoSaveForm(9, formData.declaracaoPEP, $event.target.value)">
          </div>

          <div class="col-xs-6 col-lg-3" :class="{
            'form-invalid': item.organ.$error,
            'col-sm-4 col-md-5': formData.declaracaoPEP.length > 1 && index == formData.declaracaoPEP.length - 1,
            'col-sm-5 col-md-6': formData.declaracaoPEP.length <= 1 || (formData.declaracaoPEP.length > 1 && index != formData.declaracaoPEP.length - 1),
            }">
            <label for="">{{text.declaracaoPEP.labels.organ}}</label>
            <input type="text" v-model="item.organ.$model" @blur="autoSaveForm(9, formData.declaracaoPEP, $event.target.value)">
          </div>

          <div class="col-xs-6 col-md-5 col-lg-3" :class="{
            'form-invalid': item.function.$error,
            'col-sm-4': formData.declaracaoPEP.length > 1 && index == formData.declaracaoPEP.length - 1,
            'col-sm-5': formData.declaracaoPEP.length <= 1 || (formData.declaracaoPEP.length > 1 && index != formData.declaracaoPEP.length - 1),
            }">
            <label for="">{{text.declaracaoPEP.labels.position}}</label>
            <input type="text" v-model="item.function.$model" @blur="autoSaveForm(9, formData.declaracaoPEP, $event.target.value)">
          </div>

          <div class="col-xs-2 col-md-1" v-if="index == formData.declaracaoPEP.length - 1">
            <label>&nbsp;</label>
            <button @click="addItemPEP(index)"><span class="glyphicon glyphicon-plus"></span></button>
          </div>
          <div class="col-xs-2 col-md-1" v-if="formData.declaracaoPEP.length > 1">
            <label>&nbsp;</label>
            <button @click="removeItemPEP(index)"><span class="glyphicon glyphicon-trash"></span></button>
          </div>

        </div>

      </div>
      <div class="panel-footer">
        <span>{{text.camposObrigatorios.texto}}</span>
      </div>
    </section>

    <div class="row">
      <div class="col-xs-12 form-button pull-right">
        <button @click="validateForm">{{text.saveButton}}</button>
      </div>
    </div>

  </form>

  <div class="page-emprestimos page-emprestimos-loading-gif" v-else>
    <img src="~assets/img/loading.gif" alt="Carregando...">
  </div>

</template>

<script>
import { TheMask, mask } from "vue-the-mask";
import DatePicker from "vue2-datepicker";
import {
  required, minLength, email, numeric, alphaNum, requiredIf, requiredUnless, helpers, between, minValue, decimal, maxLength, integer,
} from "vuelidate/lib/validators";
import { Money } from "v-money";
import { reject } from "q";

const validateCPF = (value) => {
  if (!value) return true;
  return value.length >= 11;
};
const validateCNPJ = (value) => {
  if (!value) return true;
  return value.length >= 14;
};
const alpha = (value) => {
  if (!value) {
    return true;
  }
  return /[a-zA-Z\s]+$/g.test(value);
};
const validatePhone = helpers.regex(
  "telefone",
  /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/,
);

export default {
  components: {
    TheMask,
    DatePicker,
    Money,
  },
  directives: {
    mask,
  },
  data() {
    return {
      isActive: false,
      controls: {
        loading: false,
        money: {
          decimal: ",",
          thousands: ".",
          prefix: "R$ ",
          precision: 2,
          masked: false,
        },
        testAddMovable: false,
        testAddComercialReference: false,
        testAddPrincipaisParceiros: false,
        hasPEP: null,
      },
      text: {
        saveButton: "Salvar",
        RegistrationData: {
          title: "Dados Cadastrais",
          labels: {
            cnpj: "CNPJ:*",
            fullName: "Razão Social:*",
            simpleName: "Nome Fantasia:*",
            addressStreetName: "Endereço:*",
            addressNumber: "Nº:*",
            addressAdditionalData: "Complemento:",
            addressNeighborhood: "Bairro:*",
            cityName: "Cidade:*",
            uf: "UF:*",
            addressPostalCode: "CEP:*",
            referencePoint: "Ponto de Referência:",
            phone: "Telefone:*",
            postalBox: "Caixa Postal:",
            foundationDate: "Data Fundação:*",
            numCommercialBoard: "Registro Junta Comercial:",
            shareCapitalValue: "Capital Social Atual (R$):",
            successorSocialName: "Sucessora de (razão social):",
            dateIncial: "Em (data):",
            qtdeBranch: "Filiais:",
            mainProducts: "Principais Produtos:",
            branchActivity: "Ramo de Atividade:*",
            numEmployees: "Nº Funcionários:*",
            optSimplesNacional: "Simples Nacional:*",
            brazilSimples_optIn: "Optante",
            brazilSimples_optOut: "Não optante",
            socialObject: "Objeto Social:",
          },
        },
        CorporatePartnerShareHolder: {
          title: "Acionistas (Sócios, Administradores ou Procuradores)",
          labels: {
            CorporatePartnerShareHolder: "Acionistas/Sócios",
            administradores: "Administradores",
            procuradores: "Procuradores",
            nome: "Nome:*",
            cpf: "CPF:*",
            admissionDate: "Data de Admissão:*",
            capitalParticipation: "Participação (%):*",
            expirationDate: "Vcto. Mandato:",
            position: "Cargo:",
            expirationDateProcuration: "Vcto. Procuração:",
          },
        },
        participacoes: {
          title: "Participação em Outras Empresas",
          labels: {
            companyName: "Razão Social:",
            lineBusiness: "Ramo de Atividade:",
            cnpj: "CNPJ:",
            capitalParticipation: "Participação (%):",
          },
        },
        dadosPatrimoniais: {
          title: "Dados Patrimoniais",
          labels: {
            realEstate: "Bens Imóveis",
            description: "Descrição:",
            location: "Localização:",
            value: "Valor (R$):",
            movables: "Bens Móveis",
            type: "Espécie:",
            markModel: "Marca/Modelo:",
            year: "Ano:",
          },
        },
        referenciasBancarias: {
          title: "Referências Bancárias",
          labels: {
            bankCode: "Nº do Banco:",
            bankName: "Nome do Banco:",
            agency: "Agência:",
            agencyCV: "Dígito:",
            account: "Conta:",
            accountCV: "Dígito:",
            accountSince: "Conta desde:*",
          },
        },
        referenciasComerciais: {
          title: "Referências Comerciais",
          labels: {
            companyName: "Razão Social:",
            phone: "Telefone:",
          },
        },
        principaisParceiros: {
          title: "Principais Parceiros",
          labels: {
            companyName: "Nome da Empresa:",
            product: "Produto em que Opera:",
            productionMonthly: "Produção Mensal (R$):",
          },
        },
        Revenue: {
          title: "Faturamento",
          labels: {
            lastTwoYears: "Últimos 02 anos",
            year: "Ano:",
            value: "Valor (R$):",
            companySizeID: "Com base no faturamento, classifique o porte da empresa:*",
          },
        },
        principaisProdutos: {
          title: "Principais Produtos",
          labels: {
            product: "Produto:",
            productionMonthly: "Produção Mensal (R$):",
            averageValue: "Valor Médio Operação (R$):",
            quantity: "Quantidade:",
            details: "Observações:",
          },
        },
        financiamentoVeiculos: {
          title: "Somente para <strong>Produto Financiamento de Veículos (Exclusivo para o Segmento de Veículos)</strong>",
          labels: {
            vehicleTypes: "Tipos de Veículos que Trabalha:",
            vehicleStock: "Quantidade Veículos Estoque:",
            vehicleAgeQuantity: "Quantidade Veículos por Faixa:",
            other: "Outros Dados:",
            light: "Leves",
            heavy: "Pesados",
            bikes: "Motos",
            utility: "Utilitários",
            qtySmall: "Pequena de 01 a 15",
            qtyMedium: "Média de 16 a 45",
            qtyLarge: "Grande acima de 45",
            ageNew: "0 KM",
            ageAbove2002: "Acima de 2002",
            ageBelow2002: "Abaixo de 2002",
            otherMonthlySold: "Volume veículos vendidos Mês:",
            otherMonthlyFinanced: "Volume veículos financiados Mês:",
            otherMonthlyFinancedValue: "Valor de financiamentos Mês:",
          },
        },
        declaracaoPEP: {
          title: "Declaração Obrigatória Pessoa Exposta Politicamente*",
          description: "PEP (Pessoa Exposta Politicamente) são pessoas que desempenham ou tenham desempenhado nos últimos cinco anos, no Brasil ou o exterior, cargos, empregos e/ou funções públicas relevantes, assim como seus representantes, familiares, e outras pessoas de seu relacionamento próximo. Conforme definido pela Circular nº 3.339 de 22/12/2016 do Banco Central do Brasil, as instituições financeiras, devem observar procedimentos a respeito das movimentações financeira das chamadas PEP. Possui representantes, sócios, administradores, familiares ou outras pessoas de seu relacionamento que desempenham ou desempenharam nos últimos 05 anos, no Brasil ou em países, territórios e dependências estrangeiras, cargos, empregos ou funções públicas relevantes?",
          labels: {
            yes: "Sim (Relacione abaixo)",
            no: "Não",
            cpf: "CPF*",
            name: "Nome*",
            startMandate: "Início mandato*",
            expirationDate: "Fim mandato*",
            kinship: "Grau relacionamento*",
            organ: "Órgão*",
            position: "Cargo*",
          },
        },
        camposObrigatorios: {
          texto: "* Campos de preenchimento obrigatório",
        },
        campoObrigatorioVazio: {
          texto: "Caso o campo acima esteja vazio, entrar em contato com a Listo SCD.",
        },
      },
      formData: {
        RegistrationData: {
          cnpj: null,
          fullName: null,
          simpleName: null,
          addressStreetName: null,
          addressNumber: null,
          addressAdditionalData: null,
          addressNeighborhood: null,
          uf: null,
          cityName: null,
          addressPostalCode: null,
          referencePoint: null,
          phone: null,
          postalBox: null,
          foundationDate: null,
          numCommercialBoard: null,
          shareCapitalValue: 0,
          successorSocialName: null,
          dateIncial: null,
          qtdeBranch: null,
          mainProducts: null,
          branchActivity: null,
          numEmployees: null,
          optSimplesNacional: null,
          socialObject: null,
        },
        CorporatePartnerShareHolder: {
          CorporatePartnerShareHolder: [
            {
              roleParticipationCompanyID: 2,
              name: null,
              cpf: null,
              admissionDate: null,
              expirationDate: null,
              position: null,
              capitalParticipation: 0,
            },
          ],
          administradores: [
            {
              roleParticipationCompanyID: 3,
              name: null,
              cpf: null,
              admissionDate: null,
              expirationDate: null,
              position: null,
              capitalParticipation: 0,
            },
          ],
          procuradores: [
            {
              roleParticipationCompanyID: 4,
              name: null,
              cpf: null,
              admissionDate: null,
              expirationDate: null,
              position: null,
              capitalParticipation: 0,
            },
          ],
        },
        participacoes: [
          {
            companyName: null,
            lineBusiness: null,
            cnpj: null,
            capitalParticipation: null,
          },
        ],
        dadosPatrimoniais: {
          realEstate: [{
            description: null,
            location: null,
            value: 0,
          }],
          movables: [{
            movableSpecieID: null,
            markModel: null,
            year: null,
            value: 0,
          }],
        },
        referenciasBancarias: [
          {
            bankCode: null,
            bankName: null,
            agency: null,
            agencyCV: null,
            account: null,
            accountCV: null,
            accountSince: null,
          },
        ],
        referenciasComerciais: [
          {
            companyName: null,
            phone: null,
            kinship: null,
          },
        ],
        principaisParceiros: [
          {
            companyName: null,
            product: null,
            productionMonthly: 0,
          },
        ],
        principaisProdutos: [
          {
            product: null,
            productionMonthly: 0,
            averageValue: 0,
            quantity: null,
            details: null,
          },
        ],
        financiamentoVeiculos: {
          typeLight: null,
          typeHeavy: null,
          typeUtility: null,
          typeMoto: null,
          sizeStockSmall: null,
          sizeStockMedium: null,
          sizeStockLarge: null,
          qtdePhase0Km: 0,
          qtdePhaseUp2002: 0,
          qtdePhaseDown2002: 0,
          volumeSoldMonth: 0,
          volumeFinancedMonth: 0,
          valueFinancedMonth: 0,
        },
        Revenue: {
          companySizeID: null,
          revenuesYear01: null,
          revenuesValue01: 0,
          revenuesYear02: null,
          revenuesValue02: 0,
        },
        declaracaoPEP: [
          {
            cpf: null,
            name: null,
            warrantIni: null,
            warrantEnd: null,
            degreeRelationship: null,
            organ: null,
            function: null,
          },
        ],
      },
      content: {
        formBlockTypes: [],
        states: [],
        companySizesList: [],
      },
    };
  },
  validations() {
    const self = this;

    return {
      controls: {
        hasPEP: {
          required,
        },
      },
      formData: {
        RegistrationData: {
          cnpj: {
            required,
            validateCNPJ,
          },
          fullName: {
            required,
          },
          simpleName: {
            required,
          },
          addressStreetName: {
            required,
          },
          addressNumber: {
            required,
            numeric,
          },
          addressNeighborhood: {
            required,
          },
          uf: {
            required,
          },
          cityName: {
            required,
          },
          addressPostalCode: {
            required,
          },
          phone: {
            required,
          },
          postalBox: {
            // required,
          },
          foundationDate: {
            required,
          },
          branchActivity: {
            required,
          },
          numEmployees: {
            required,
          },
          shareCapitalValue: {
            validate: minValue(0),
          },
          optSimplesNacional: {
            required,
          },
        },
        CorporatePartnerShareHolder: {
          CorporatePartnerShareHolder: {
            $each: {
              name: {
                required,
              },
              cpf: {
                required,
                tamanhoCPF: minLength(11),
                validateCPF,
              },
              admissionDate: {
                required,
              },
              capitalParticipation: {
                required,
                validate(value) {
                  return value > 0 && value <= 100 ? true : false;
                },
              },
            },
          },
          administradores: {
            $each: {
              name: {
                alpha,
              },
              cpf: {
                validateCPF,
                tamanhoCPF: minLength(11),
              },
              // admissionDate: {
              //   required,
              // },
              // expirationDate: {
              //   required,
              // },
              // position: {
              //   alpha,
              // },
            },
          },
          procuradores: {
            $each: {
              name: {
                alpha,
              },
              cpf: {
                validateCPF,
                tamanhoCPF: minLength(11),
              },
              position: {
                alpha,
              },
            },
          },
        },
        participacoes: {
          $each: {
            companyName: {
              // required,
            },
            lineBusiness: {
              // required,
            },
            cnpj: {
              // required,
              validateCNPJ,
              tamanhoCNPJ: minLength(14),
            },
            capitalParticipation: {
              // required,
              numeric,
              validate(value) {
                return value >= 0 && value <= 100 ? true : false;
              },
            },
          },
        },
        dadosPatrimoniais: {
          realEstate: {
            $each: {
              description: {
                // required,
              },
              location: {
                // required,
              },
              value: {
              // required,
              //   validate(value) {
              //     return value > 0 ? true : false;
              //   },
              },
            },
          },
          movables: {
            $each: {
              movableSpecieID: {
                req: requiredIf(() => self.controls.testAddMovable),
                // validate(value) {
                //   if (self.controls.testAddMovable) {
                //     if (value) {
                //       return value.length > 0;
                //     }
                //     return false;
                //   }
                //   return true;
                // },
              },
              markModel: {
                req: requiredIf(() => self.controls.testAddMovable),
                // validate(value, movable) {
                //   if (movable.type && movable.type.length > 0) {
                //     if (value) {
                //       return value.length > 0;
                //     }
                //     return false;
                //   }
                //   return true;
                // },
              },
              year: {
                validate(value, movable) {
                  const date = new Date();
                  const year = date.getFullYear();

                  if (self.controls.testAddMovable) {
                    if (movable.movableSpecieID) {
                      if (value) {
                        return value <= year;
                      }
                      return false;
                    }
                    return false;
                  } return true;
                },
              },
              value: {
                validate(value, movable) {
                  if (self.controls.testAddMovable) {
                    if (movable.movableSpecieID) {
                      if (value) {
                        return value > 0;
                      }
                      return false;
                    }
                    return false;
                  } return true;
                },
              },
            },
          },
        },
        referenciasBancarias: {
          $each: {
            bankCode: {
              required,
            },
            bankName: {
              required,
            },
            agency: {
              required,
              numeric,
            },
            agencyCV: {
              // alphaNum,
              // validate: maxLength(1),
            },
            account: {
              required,
            },
            accountCV: {
              // alphaNum,
              // validate: maxLength(1),
            },
            accountSince: {
              required,
            },
          },
        },
        principaisProdutos: {
          $each: {
            revenuesTypeId: {
              // required,
              validate(value) {
                const test = self.formData.principaisProdutos.filter(produto => produto.revenuesTypeId == value);
                return test.length <= 1 ? true : false;
              },
            },
            productionMonthly: {
              // required,
              // validate(value) {
              //   return value > 0 ? true : false;
              // },
            },
            averageValue: {
              // required,
              // validate(value) {
              //   return value > 0 ? true : false;
              // },
            },
            qtde: {
              // required,
              // validate(value) {
              //   return value > 0 ? true : false;
              // },
            },
          },
        },
        Revenue: {
          revenuesYear01: {
            validate(value) {
              const date = new Date();
              const currentYear = date.getFullYear();

              if (value) {
                if (value <= currentYear) {
                  return true;
                }
                return false;
              }
              return true;
            },
          },
          revenuesValue01: {
            // numeric,
            validate(value) {
              if (self.formData.Revenue.revenuesYear01 && !self.$v.formData.Revenue.revenuesYear01.$invalid) {
                return value > 0 ? true : false;
              }
              return true;
            },
          },
          revenuesYear02: {
            validate(value) {
              const date = new Date();
              const currentYear = date.getFullYear();

              if (value) {
                if (value <= currentYear) {
                  return true;
                }
                return false;
              }
              return true;
            },
          },
          revenuesValue02: {
            // numeric,
            validate(value) {
              if (self.formData.Revenue.revenuesYear02 && !self.$v.formData.Revenue.revenuesYear02.$invalid) {
                return value > 0 ? true : false;
              }
              return true;
            },
          },
          companySizeID: {
            required,
          },
        },
        referenciasComerciais: {
          $each: {
            companyName: {
              // validate(value) {
              //   if (self.controls.testAddComercialReference) {
              //     if (value) {
              //       return value.length > 0;
              //     }
              //     return false;
              //   }
              //   return true;
              // },
              required: requiredIf(() => (self.controls.testAddComercialReference)),
            },
            phone: {
              required: requiredIf(() => (self.controls.testAddComercialReference)),
              validatePhone,
              // validate(value, ref) {
              //   if (self.controls.testAddComercialReference) {
              //     if (ref.fullName && ref.fullName.length > 0) {
              //       if (value) {
              //         return value.length >= 9 && /[a-zA-Z\s]+$/g.test(value);
              //       } return false;
              //     } return false;
              //   } return true;
              // },
            },
          },
        },
        principaisParceiros: {
          $each: {
            companyName: {
              req: requiredIf(() => self.controls.testAddPrincipaisParceiros),
            },
            product: {
              req: requiredIf(() => self.controls.testAddPrincipaisParceiros),
            },
            productionMonthly: {
              // req: requiredIf(() => self.controls.testAddPrincipaisParceiros),
              validate(value) {
                if (self.controls.testAddPrincipaisParceiros) {
                  if (value) {
                    return value > 0;
                  }
                  return false;
                }
                return true;
              },
            },
          },
        },
        declaracaoPEP: {
          $each: {
            cpf: {
              req: requiredIf(() => self.controls.hasPEP),
              validateCPF,
            },
            name: {
              req: requiredIf(() => self.controls.hasPEP),
            },
            warrantIni: {
              req: requiredIf(() => self.controls.hasPEP),
              validate(value) {
                if (value) {
                  return value > 1900;
                }
                return true;
              },
            },
            warrantEnd: {
              req: requiredIf(() => self.controls.hasPEP),
              validate(value) {
                if (value) {
                  return value > 1900;
                }
                return true;
              },
            },
            degreeRelationship: {
              req: requiredIf(() => self.controls.hasPEP),
            },
            organ: {
              req: requiredIf(() => self.controls.hasPEP),
            },
            function: {
              req: requiredIf(() => self.controls.hasPEP),
            },
          },
        },
        financiamentoVeiculos: {
          typeLight: {
            validate: requiredIf(() => self.formData.RegistrationData.isAutomobile),
          },
          typeHeavy: {
            validate: requiredIf(() => self.formData.RegistrationData.isAutomobile),
          },
          typeUtility: {
            validate: requiredIf(() => self.formData.RegistrationData.isAutomobile),
          },
          typeMoto: {
            validate: requiredIf(() => self.formData.RegistrationData.isAutomobile),
          },
          sizeStockSmall: {
            validate: requiredIf(() => self.formData.RegistrationData.isAutomobile),
          },
          sizeStockMedium: {
            validate: requiredIf(() => self.formData.RegistrationData.isAutomobile),
          },
          sizeStockLarge: {
            validate: requiredIf(() => self.formData.RegistrationData.isAutomobile),
          },
          qtdePhase0Km: {
            validate: requiredIf(() => self.formData.RegistrationData.isAutomobile),
          },
          qtdePhaseUp2002: {
            validate: requiredIf(() => self.formData.RegistrationData.isAutomobile),
          },
          qtdePhaseDown2002: {
            validate: requiredIf(() => self.formData.RegistrationData.isAutomobile),
          },
          volumeSoldMonth: {
            validate: requiredIf(() => self.formData.RegistrationData.isAutomobile),
          },
          volumeFinancedMonth: {
            validate: requiredIf(() => self.formData.RegistrationData.isAutomobile),
          },
          valueFinancedMonth: {
            validate: requiredIf(() => self.formData.RegistrationData.isAutomobile),
          },
        },
      },
    };
  },
  watch: {
    // eslint-disable-next-line func-names
    "formData.declaracaoPEP": function (newVal, oldVal) {
      const self = this;

      if (newVal.length > 0) {
        self.controls.hasPEP = true;
      }
    },
  },
  created() {
    const self = this;

    self.controls.loading = true;

    const getautoSaveFormTypes = new Promise((resolve, reject) => {
      self.$axios.get(`${process.env.API_CUSTOMER_DATA}/AutoSaveForm/formBlockTypes`).then((response) => {
        self.content.formBlockTypes = response.data;
        setTimeout(() => {
          resolve(response);
        }, 50);
      }).catch((error) => {
        reject(error);
        return false;
      });
    });

    const getStates = new Promise((resolve, reject) => {
      self.$axios.get(`${process.env.API_CEP}/ZipCode/country/1/states`).then((response) => {
        self.content.states = response.data;
        setTimeout(() => {
          resolve(response);
        }, 50);
      }).catch((error) => {
        reject(error);
        return false;
      });
    });

    const getCorporatePartnerShareHolder = new Promise((resolve, reject) => {
      self.$axios.get(`${process.env.API_CUSTOMER_DATA}/CorporateStructurePJ/2`).then((response) => {
        // console.log("Get CorporatePartnerShareHolder", response.data);
        if (response.status == 200) {
          self.formData.CorporatePartnerShareHolder.CorporatePartnerShareHolder = response.data;

          self.formData.CorporatePartnerShareHolder.CorporatePartnerShareHolder.map((item) => {
            if (!item.roleParticipationCompanyID) {
              item.roleParticipationCompanyID = 2;
            }
          });
        }
        setTimeout(() => {
          // self.autoSaveForm(10, self.formData.CorporatePartnerShareHolder.CorporatePartnerShareHolder);
          resolve(response);
        }, 50);
      }).catch((error) => {
        // console.log(error);
        reject(error);
        return false;
      });
    });

    const getAdministradores = new Promise((resolve, reject) => {
      self.$axios.get(`${process.env.API_CUSTOMER_DATA}/CorporateStructurePJ/3`).then((response) => {
        // console.log("Get Administradores", response.data);
        if (response.status == 200) {
          self.formData.CorporatePartnerShareHolder.administradores = response.data;

          self.formData.CorporatePartnerShareHolder.administradores.map((item) => {
            if (!item.roleParticipationCompanyID) {
              item.roleParticipationCompanyID = 3;
            }
          });
        }
        setTimeout(() => {
          // self.autoSaveForm(11, self.formData.CorporatePartnerShareHolder.administradores);
          resolve(response);
        }, 50);
      }).catch((error) => {
        // console.log(error);
        reject(error);
        return false;
      });
    });

    const getProcuradores = new Promise((resolve, reject) => {
      self.$axios.get(`${process.env.API_CUSTOMER_DATA}/CorporateStructurePJ/4`).then((response) => {
        // console.log("Get Procuradores", response.data);
        if (response.status == 200) {
          self.formData.CorporatePartnerShareHolder.procuradores = response.data;

          self.formData.CorporatePartnerShareHolder.procuradores.map((item) => {
            if (!item.roleParticipationCompanyID) {
              item.roleParticipationCompanyID = 4;
            }
          });
        }
        setTimeout(() => {
          // self.autoSaveForm(12, self.formData.CorporatePartnerShareHolder.procuradores);
          resolve(response);
        }, 50);
      }).catch((error) => {
        // console.log(error);
        reject(error);
      });
    });

    const getBankReferences = new Promise((resolve, reject) => {
      self.$axios.get(`${process.env.API_CUSTOMER_DATA}/BankReference`).then((response) => {
        // console.log("Bank ref", response);

        if (response.status == 200) {
          self.formData.referenciasBancarias = response.data;

          self.formData.dadosBancarios.map((bank) => {
            bank.accountCV = bank.accountCV.trim();
            bank.agencyCV = bank.agencyCV.trim();
          });
        }
        setTimeout(() => {
          // self.autoSaveForm(5, self.formData.referenciasBancarias);
          resolve(response);
        }, 50);
      }).catch((error) => {
        // console.log(error);
        reject(error);
        return false;
      });
    });

    const getOtherParticipations = new Promise((resolve, reject) => {
      self.$axios.get(`${process.env.API_CUSTOMER_DATA}/ParticipationsOtherCompanyPJ`).then((response) => {
        if (response.status == 200) {
          self.formData.participacoes = response.data;
        }
        setTimeout(() => {
          // self.autoSaveForm(14, self.formData.participacoes);
          resolve(response);
        }, 50);
      }).catch((error) => {
        reject(error);
      });
    });

    const getCommercialReference = new Promise((resolve, reject) => {
      self.$axios.get(`${process.env.API_CUSTOMER_DATA}/CommercialReference`).then((response) => {
        if (response.status == 200) {
          self.formData.referenciasComerciais = response.data;
        }
        setTimeout(() => {
          // self.autoSaveForm(6, self.formData.referenciasComerciais);
          resolve(response);
        }, 50);
      }).catch((error) => {
        reject(error);
        return false;
      });
    });

    const getPrincipalPartners = new Promise((resolve, reject) => {
      self.$axios.get(`${process.env.API_CUSTOMER_DATA}/PrincipalPartnersPJ`).then((response) => {
        if (response.status == 200) {
          self.formData.principaisParceiros = response.data;
        }
        setTimeout(() => {
          // self.autoSaveForm(13, self.formData.principaisParceiros);
          resolve(response);
        }, 50);
      }).catch((error) => {
        reject(error);
        return false;
      });
    });

    const getCompanySizesList = new Promise((resolve, reject) => {
      self.$axios.get(`${process.env.API_CUSTOMER_DATA}/RevenuePJ/CompanySize`).then((response) => {
        self.content.companySizesList = response.data;
        setTimeout(() => {
          resolve(response);
        }, 50);
      }).catch((error) => {
        reject(error);
        return false;
      });
    });

    const getRevenue = new Promise((resolve, reject) => {
      self.$axios.get(`${process.env.API_CUSTOMER_DATA}/RevenuePJ`).then((response) => {
        if (response.status == 200) {
          self.formData.Revenue = response.data;
        }
        // console.log("Revenue", self.formData.Revenue);
        setTimeout(() => {
          // self.autoSaveForm(16, self.formData.Revenue);
          resolve(response);
        }, 50);
      }).catch((error) => {
        reject(error);
        return false;
      });
    });

    const getProductionRevenues = new Promise((resolve, reject) => {
      self.$axios.get(`${process.env.API_CUSTOMER_DATA}/ProductionRevenuesPJ`).then((response) => {
        if (response.status == 200) {
          self.formData.principaisProdutos = response.data;
        }
        setTimeout(() => {
          // self.autoSaveForm(15, self.formData.principaisProdutos);
          resolve(response);
        }, 50);
      }).catch((error) => { reject(error); return false; });
    });

    const getRevenueTypesList = new Promise((resolve, reject) => {
      self.$axios.get(`${process.env.API_CUSTOMER_DATA}/ProductionRevenuesPJ/RevenuesType`).then((response) => {
        self.content.revenueTypesList = response.data;
        setTimeout(() => {
          resolve(response);
        }, 50);
      }).catch((error) => {
        reject(error);
        return false;
      });
    });

    const getRegistrationData = new Promise((resolve, reject) => {
      self.$axios.get(`${process.env.API_CUSTOMER_DATA}/RegistrationData/pj`).then((response) => {
        if (response.status == 200) {
          self.formData.RegistrationData = response.data;
          if (response.data.addressPostalCode) {
            response.data.addressPostalCode = response.data.addressPostalCode.replace("-", "");
            response.data.addressPostalCode = response.data.addressPostalCode.replace(" ", "");
          }
          if (self.formData.RegistrationData.shareCapitalValue == null) self.formData.RegistrationData.shareCapitalValue = 0;
        }
        setTimeout(() => {
          self.autoSaveForm(1, self.formData.RegistrationData, "ignore");
          resolve(response);
        }, 50);
      }).catch((error) => {
        reject(error);
        return false;
      });
    });

    const getMovableSpeciesList = new Promise((resolve, reject) => {
      self.$axios.get(`${process.env.API_CUSTOMER_DATA}/Equity/MovableSpecie`).then((response) => {
        self.content.movableSpeciesList = response.data;
        setTimeout(() => {
          resolve(response);
        }, 50);
      }).catch((error) => { reject(error); return false; });
    });

    const getMovables = new Promise((resolve, reject) => {
      self.$axios.get(`${process.env.API_CUSTOMER_DATA}/Equity/Movable`).then((response) => {
        if (response.status == 200) {
          self.formData.dadosPatrimoniais.movables = response.data;
        }
        setTimeout(() => {
          // self.autoSaveForm(7, self.formData.movables.dadosPatrimoniais.movables);
          resolve(response);
        }, 50);
      }).catch((error) => { reject(error); return false; });
    });

    const getRealEstate = new Promise((resolve, reject) => {
      self.$axios.get(`${process.env.API_CUSTOMER_DATA}/Equity/Immovable`).then((response) => {
        if (response.status == 200) {
          self.formData.dadosPatrimoniais.realEstate = response.data;
        }
        setTimeout(() => {
          // self.autoSaveForm(8, self.formData.dadosPatrimoniais.realEstate);
          resolve(response);
        }, 50);
      }).catch((error) => { reject(error); return false; });
    });

    const getFinanciamento = new Promise((resolve, reject) => {
      self.$axios.get(`${process.env.API_CUSTOMER_DATA}/ProductionMotorVehiclesPJ`).then((response) => {
        if (response.status == 200) {
          self.formData.financiamentoVeiculos = response.data;
        }
        setTimeout(() => {
          // self.autoSaveForm(17, self.formData.financiamentoVeiculos);
          resolve(response);
        }, 50);
      }).catch((error) => { reject(error); return false; });
    });

    const getListPEP = new Promise((resolve, reject) => {
      self.$axios.get(`${process.env.API_CUSTOMER_DATA}/DeclarationPEP`).then((response) => {
        if (response.status == 200) {
          self.formData.declaracaoPEP = response.data;
        }
        setTimeout(() => {
          // self.autoSaveForm(9, self.formData.declaracaoPEP);
          resolve(response);
        }, 50);
      }).catch((error) => { reject(error); return false; });
    });


    Promise.all([
      getautoSaveFormTypes,
      getStates,
      getCorporatePartnerShareHolder,
      getAdministradores,
      getProcuradores,
      getBankReferences,
      getOtherParticipations,
      getCommercialReference,
      getPrincipalPartners,
      getCompanySizesList,
      getRevenue,
      getProductionRevenues,
      getRevenueTypesList,
      getRegistrationData,
      getMovableSpeciesList,
      getRealEstate,
      getMovables,
      getFinanciamento,
      getListPEP,
    ]).then(() => {
      self.controls.loading = false;
    }).catch(() => {
      self.controls.loading = false;
    });
  },
  methods: {
    validateForm() {
      const self = this;

      self.$v.formData.$touch();
      self.$v.controls.hasPEP.$touch();


      if (!self.$v.formData.$invalid && !self.$v.controls.hasPEP.$invalid) {
        self.controls.loading = true;

        const promises = [];


        promises.push(self.autoSaveForm(1, self.formData.RegistrationData));
        promises.push(self.autoSaveForm(5, self.formData.referenciasBancarias));
        promises.push(self.autoSaveForm(6, self.formData.referenciasComerciais));
        promises.push(self.autoSaveForm(7, self.formData.dadosPatrimoniais.movables));
        promises.push(self.autoSaveForm(8, self.formData.dadosPatrimoniais.realEstate));
        promises.push(self.autoSaveForm(9, self.formData.declaracaoPEP));
        promises.push(self.autoSaveForm(10, self.formData.CorporatePartnerShareHolder.CorporatePartnerShareHolder));
        promises.push(self.autoSaveForm(11, self.formData.CorporatePartnerShareHolder.administradores));
        promises.push(self.autoSaveForm(12, self.formData.CorporatePartnerShareHolder.procuradores));
        promises.push(self.autoSaveForm(13, self.formData.principaisParceiros));
        promises.push(self.autoSaveForm(14, self.formData.participacoes));
        promises.push(self.autoSaveForm(15, self.formData.principaisProdutos));
        promises.push(self.autoSaveForm(16, self.formData.Revenue));
        promises.push(self.autoSaveForm(17, self.formData.financiamentoVeiculos));

        Promise.all(promises).then(() => {
          self.$axios.post(`${process.env.API_CUSTOMER_DATA}/Form/Save`).then((response) => {
            self.$nuxt.$emit("toggleRegistrationForm", false);
            $nuxt.$store.commit("setLoanFormCompleted", true);
            setTimeout(() => {
              self.controls.loading = false;
            }, 100);
          }).catch((err) => {
            console.log(err);
            self.$nuxt.$emit("toggleModal", {
              api: "emprestimoerroPJ",
              modalContent: err,
            });
            setTimeout(() => {
              self.controls.loading = false;
            }, 100);
          });
        }).catch(() => {

        });
      } else {
        setTimeout(() => {
          const invalid = document.getElementsByClassName("form-invalid")[0];

          invalid.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }, 100);
      }
    },
    addAcionista(index) {
      const self = this;

      self.$v.formData.CorporatePartnerShareHolder.CorporatePartnerShareHolder.$each[index].$touch();

      if (!self.$v.formData.CorporatePartnerShareHolder.CorporatePartnerShareHolder.$each[index].$invalid) {
        self.formData.CorporatePartnerShareHolder.CorporatePartnerShareHolder.push({
          name: null,
          cpf: null,
          admissionDate: null,
          capitalParticipation: null,
          roleParticipationCompanyID: 2,
        });
      }
    },
    removeAcionista(index) {
      const self = this;

      self.formData.CorporatePartnerShareHolder.CorporatePartnerShareHolder.splice(index, 1);
      // self.autoSaveForm(10, self.formData.CorporatePartnerShareHolder.CorporatePartnerShareHolder);
    },
    addAdministrador(index) {
      const self = this;

      self.$v.formData.CorporatePartnerShareHolder.administradores.$each[index].$touch();

      if (!self.$v.formData.CorporatePartnerShareHolder.administradores.$each[index].$invalid) {
        self.formData.CorporatePartnerShareHolder.administradores.push({
          name: null,
          cpf: null,
          admissionDate: null,
          expirationDate: null,
          position: null,
          roleParticipationCompanyID: 3,
        });
      }
    },
    removeAdministrador(index) {
      const self = this;

      self.formData.CorporatePartnerShareHolder.administradores.splice(index, 1);
      // self.autoSaveForm(11, self.formData.CorporatePartnerShareHolder.administradores);
    },
    addProcurador(index) {
      const self = this;

      self.$v.formData.CorporatePartnerShareHolder.procuradores.$each[index].$touch();

      if (!self.$v.formData.CorporatePartnerShareHolder.procuradores.$each[index].$invalid) {
        self.formData.CorporatePartnerShareHolder.procuradores.push({
          name: null,
          cpf: null,
          admissionDate: null,
          expirationDate: null,
          position: null,
          roleParticipationCompanyID: 4,
        });
        self.$v.formData.CorporatePartnerShareHolder.procuradores.$each[index].$reset();
      }
    },
    removeProcurador(index) {
      const self = this;

      self.formData.CorporatePartnerShareHolder.procuradores.splice(index, 1);
      // self.autoSaveForm(12, self.formData.CorporatePartnerShareHolder.procuradores);
    },
    addParticipacao(index) {
      const self = this;

      self.$v.formData.participacoes.$each[index].$touch();

      if (!self.$v.formData.participacoes.$each[index].$invalid) {
        self.formData.participacoes.push({
          companyName: null,
          lineBusiness: null,
          cnpj: null,
          capitalParticipation: null,
        });
      }
    },
    removeParticipacao(index) {
      const self = this;

      self.formData.participacoes.splice(index, 1);
      // self.autoSaveForm(14, self.formData.participacoes);
    },
    addRealEstate(index) {
      const self = this;

      self.$v.formData.dadosPatrimoniais.realEstate.$each[index].$touch();

      if (!self.$v.formData.dadosPatrimoniais.realEstate.$each[index].$invalid) {
        self.formData.dadosPatrimoniais.realEstate.push({
          description: null,
          location: null,
          value: 0,
        });
      }
    },
    removeRealEstate(index) {
      const self = this;

      self.formData.dadosPatrimoniais.realEstate.splice(index, 1);
      // self.autoSaveForm(8, self.formData.dadosPatrimoniais.realEstate);
    },
    addMovable(index) {
      const self = this;

      self.controls.testAddMovable = true;

      const validate = self.formData.dadosPatrimoniais.movables[index].movableSpecieID;

      self.$v.formData.dadosPatrimoniais.movables.$each[index].$touch();

      if (!self.$v.formData.dadosPatrimoniais.movables.$each[index].$invalid && validate) {
        self.formData.dadosPatrimoniais.movables.push({
          movableSpecieID: null,
          markModel: null,
          year: null,
          value: 0,
        });
        self.controls.testAddMovable = false;
        self.$v.formData.dadosPatrimoniais.movables.$each[index].$reset();
      }
    },
    removeMovable(index) {
      const self = this;

      self.formData.dadosPatrimoniais.movables.splice(index, 1);
      // self.autoSaveForm(7, self.formData.movables.dadosPatrimoniais.movables);
    },
    addReferenciaComercial(index) {
      const self = this;

      self.controls.testAddComercialReference = true;

      self.$v.formData.referenciasComerciais.$each[index].$touch();

      if (!self.$v.formData.referenciasComerciais.$each[index].$invalid) {
        self.formData.referenciasComerciais.push({
          companyName: null,
          phone: null,
          kinship: null,
        });
        self.controls.testAddComercialReference = false;
        self.$v.formData.referenciasComerciais.$each[index].$reset();
      }
    },
    removeReferenciaComercial(index) {
      const self = this;

      self.formData.referenciasComerciais.splice(index, 1);
      // self.autoSaveForm(6, self.formData.referenciasComerciais);
    },
    addPrincipalParceiro(index) {
      const self = this;

      self.controls.testAddPrincipaisParceiros = true;

      self.$v.formData.principaisParceiros.$each[index].$touch();

      if (!self.$v.formData.principaisParceiros.$each[index].$invalid) {
        self.formData.principaisParceiros.push({
          companyName: null,
          product: null,
          productionMonthly: 0,
        });

        self.controls.testAddPrincipaisParceiros = false;
      }
    },
    removePrincipalParceiro(index) {
      const self = this;

      self.formData.principaisParceiros.splice(index, 1);
      // self.autoSaveForm(13, self.formData.principaisParceiros);
    },
    addPrincipalProduto(index) {
      const self = this;

      self.$v.formData.principaisProdutos.$each[index].$touch();

      if (!self.$v.formData.principaisProdutos.$each[index].$invalid) {
        self.formData.principaisProdutos.push({
          product: null,
          productionMonthly: 0,
          averageValue: 0,
          quantity: null,
          details: null,
        });
      }
    },
    removePrincipalProduto(index) {
      const self = this;

      self.formData.principaisProdutos.splice(index, 1);
      // self.autoSaveForm(15, self.formData.principaisProdutos);
    },
    addItemPEP(index) {
      const self = this;

      self.$v.formData.declaracaoPEP.$each[index].$touch();

      if (!self.$v.formData.declaracaoPEP.$each[index].$invalid) {
        self.formData.declaracaoPEP.push({
          cpf: null,
          name: null,
          warrantIni: null,
          warrantEnd: null,
          degreeRelationship: null,
          organ: null,
          function: null,
        });
      }
    },
    removeItemPEP(index) {
      const self = this;

      self.formData.declaracaoPEP.splice(index, 1);
      // self.autoSaveForm(9, self.formData.declaracaoPEP);
    },
    autoSaveForm(blockID, blockData, value) {
      return new Promise((resolve, reject) => {
        const self = this;
        if (value && value !== "" && value !== "ignore") {
          setTimeout(() => {
            self.$axios.post(`${process.env.API_CUSTOMER_DATA}/AutoSaveForm`, {
              formBlockType: blockID,
              information: JSON.stringify(blockData),
            }).then((response) => {
              resolve();
            }).catch(() => { reject(); });
          }, 150);
        } else {
          setTimeout(() => {
            self.$axios.post(`${process.env.API_CUSTOMER_DATA}/AutoSaveForm`, {
              formBlockType: blockID,
              information: JSON.stringify(blockData),
            }).then((response) => {
              resolve();
            }).catch(() => { reject(); });
          }, 150);
        }
      });
    },
    // eslint-disable-next-line object-shorthand
    msgHidden(event) {
      // this.isActive = !this.isActive;
      event.target.parentElement.remove();
    },
  },
};
</script>
