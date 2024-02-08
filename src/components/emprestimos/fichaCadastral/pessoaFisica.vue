<template>
  <form class="page-emprestimos ficha-cadastral ficha-cadastral-pessoa-fisica" v-if="!controls.loading" @submit.prevent>

    <!-- <p>{{formData.RegistrationData}}</p> -->
    <!-- <p>{{$v.formData}}</p> -->
    <h2>{{text.ficha_title}}</h2>

    <!--div style="position:fixed; background:white; z-index:1000">{{$v.formData.BusinessReferences}}</div-->
    <!-- <p>{{$v.controls}}</p> -->

    <section id="dados-cadastrais" class="panel panel-default container-fluid">

      <div class="panel-heading row">
        <p class="col-xs-10 col-sm-11">{{text.RegistrationData.title}}</p>
      </div>

      <div class="panel-body row">

        <!-- <p>{{$v.formData.RegistrationData}}</p> -->


        <div id="dados-cadastrais-name" class="row form-section form-group">
          <div class="col-xs-4 col-sm-4 col-md-3 col-lg-2" :class="{'form-invalid': $v.formData.RegistrationData.cpf.$error}">
            <label for="dados-cadastrais-cpf">{{text.RegistrationData.labels.cpf}}</label>
            <the-mask id="dados-cadastrais-cpf" :mask="'###.###.###-##'" v-model="formData.RegistrationData.cpf" disabled @blur="event => formAutoSave('RegistrationData', 'RegistrationData', null, event)"></the-mask>

          </div>
          <div class="col-xs-8 col-sm-8 col-md-5 col-lg-6" :class="{'form-invalid': $v.formData.RegistrationData.fullName.$error}">
            <label for="dados-cadastrais-fullName">{{text.RegistrationData.labels.fullName}}</label>
            <input type="text" id="dados-cadastrais-fullName" v-model="formData.RegistrationData.fullName" disabled @blur="event => formAutoSave('RegistrationData', 'RegistrationData', null, event)" :maxlength="controls.maxInputText">
            <div class="tooltip-campo-vazio alert alert-danger" v-if="!formData.RegistrationData.fullName" >
              <span class='glyphicon glyphicon-remove' aria-hidden='true' @click="msgHidden($event)" :class="{tooltipHidden: isActive}"></span> {{text.campoObrigatorioVazio.texto}}
            </div>
          </div>
          <div class="col-xs-8 col-sm-6 col-md-4 col-lg-4" :class="{'form-invalid': $v.formData.RegistrationData.simpleName.$error}">
            <label for="dados-cadastrais-simpleName">{{text.RegistrationData.labels.simpleName}}</label>
            <input type="text" id="dados-cadastrais-simpleName" v-model="formData.RegistrationData.simpleName" @blur="event => formAutoSave('RegistrationData', 'RegistrationData', null, event)" :maxlength="controls.maxInputText">
          </div>
        </div>

        <div id="dados-cadastrais-document" class="row form-section form-group">
          <div class="col-xs-5 col-sm-3 col-md-2 col-lg-2" :class="{'form-invalid': $v.formData.RegistrationData.rg.$error}">
            <label for="dados-cadastrais-rg">{{text.RegistrationData.labels.rg}}</label>
            <input type="text" id="dados-cadastrais-rg" v-model="formData.RegistrationData.rg" @blur="event => formAutoSave('RegistrationData', 'RegistrationData', null, event)" maxlength="15">
          </div>
          <div class="col-xs-7 col-sm-5 col-md-4 col-lg-3" :class="{'form-invalid': $v.formData.RegistrationData.identificationDocumentType.$error}">
            <label for="dados-cadastrais-identificationDocumentType">{{text.RegistrationData.labels.identificationDocumentType}}</label>
            <input type="text" id="dados-cadastrais-identificationDocumentType" v-model="formData.RegistrationData.identificationDocumentType" @blur="event => formAutoSave('RegistrationData', 'RegistrationData', null, event)" :maxlength="controls.maxInputText">
          </div>
          <div class="col-xs-5 col-sm-4 col-md-3 col-lg-2" :class="{'form-invalid': $v.formData.RegistrationData.organEmitter.$error}">
            <label for="dados-cadastrais-organEmitter">{{text.RegistrationData.labels.organEmitter}}</label>
            <input type="text" id="dados-cadastrais-organEmitter" v-model="formData.RegistrationData.organEmitter" @blur="event => formAutoSave('RegistrationData', 'RegistrationData', null, event)" :maxlength="controls.maxInputText">
          </div>
          <div class="col-xs-4 col-sm-4 col-md-3 col-lg-2" :class="{'form-invalid': $v.formData.RegistrationData.emissionDate.$error}">
            <label for="dados-cadastrais-emissionDate">{{text.RegistrationData.labels.emissionDate}}</label>
            <date-picker id="dados-cadastrais-emissionDate" :lang="'pt-br'" :format="'DD/MM/YYYY'" v-mask="'##/##/####'" v-model="formData.RegistrationData.emissionDate" :not-after="new Date()" @focusout.native="event => formAutoSave('RegistrationData', 'RegistrationData', null, event)"></date-picker>
          </div>
          <div class="col-xs-3 col-sm-3 col-md-2 col-lg-1" :class="{'form-invalid': $v.formData.RegistrationData.documentState.$error}">
            <label for="dados-cadastrais-documentState">{{text.RegistrationData.labels.documentState}}</label>
            <select id="dados-cadastrais-documentState" v-model="formData.RegistrationData.documentState" @blur="event => formAutoSave('RegistrationData', 'RegistrationData', null, event)">
              <option :value="null" disabled hidden>{{text.RegistrationData.placeholders.documentState}}</option>
              <option v-for="(state, index) in content.states" :key="index" :value="state.uf.trim()">{{state.uf.trim()}}</option>
            </select>
          </div>
          <div class="col-xs-5 col-sm-5 col-md-4 col-lg-2" :class="{'form-invalid': $v.formData.RegistrationData.placeOfBirth.$error}">
            <label for="dados-cadastrais-placeOfBirth">{{text.RegistrationData.labels.placeOfBirth}}</label>
            <input type="text" id="dados-cadastrais-placeOfBirth" v-model="formData.RegistrationData.placeOfBirth" @blur="event => formAutoSave('RegistrationData', 'RegistrationData', null, event)">
          </div>
        </div>

        <div id="dados-cadastrais-parents" class="row form-section form-group">
          <div class="col-xs-12 col-sm-6 col-lg-6" :class="{'form-invalid': $v.formData.RegistrationData.nameMother.$error}">
            <label for="dados-cadastrais-nameMother">{{text.RegistrationData.labels.nameMother}}</label>
            <input type="text" id="dados-cadastrais-nameMother" v-model="formData.RegistrationData.nameMother" @blur="event => formAutoSave('RegistrationData', 'RegistrationData', null, event)">
          </div>
          <div class="col-xs-12 col-sm-6 col-lg-6">
            <label for="dados-cadastrais-nameFather">{{text.RegistrationData.labels.nameFather}}</label>
            <input type="text" id="dados-cadastrais-nameFather" v-model="formData.RegistrationData.nameFather" @blur="event => formAutoSave('RegistrationData', 'RegistrationData', null, event)">
          </div>
        </div>

        <div id="dados-cadastrais-info" class="row form-section form-group">
          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-4">
            <label for="dados-cadastrais-degreeEducationID">{{text.RegistrationData.labels.degreeEducationID}}</label>
            <select id="dados-cadastrais-degreeEducationID" v-model="formData.RegistrationData.degreeEducationID" @blur="event => formAutoSave('RegistrationData', 'RegistrationData', null, event)">
              <option :value="null" disabled hidden>{{text.RegistrationData.placeholders.degreeEducationID}}</option>
              <option v-for="(degree, index) in content.educationDegrees" :key="index" :value="degree.id">{{degree.description}}</option>
            </select>
          </div>
          <div class="col-xs-6 col-sm-6 col-md-3 col-lg-2" :class="{'form-invalid': $v.formData.RegistrationData.maritalStatusID.$error}">
            <label for="dados-cadastrais-maritalStatusID">{{text.RegistrationData.labels.maritalStatusID}}</label>
            <select id="dados-cadastrais-maritalStatusID" v-model="formData.RegistrationData.maritalStatusID" @blur="event => formAutoSave('RegistrationData', 'RegistrationData', null, event)">
              <option :value="null" disabled hidden>{{text.RegistrationData.placeholders.maritalStatusID}}</option>
              <option v-for="(status, index) in content.maritalStatusID" :key="index" :value="status.id">{{status.description}}</option>
            </select>
          </div>
          <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2" :class="{'form-invalid': $v.formData.RegistrationData.genderID.$error}">
            <label for="dados-cadastrais-genderID">{{text.RegistrationData.labels.genderID}}</label>
            <select id="dados-cadastrais-genderID" v-model="formData.RegistrationData.genderID" disabled @blur="event => formAutoSave('RegistrationData', 'RegistrationData', null, event)">
              <option :value="null" disabled hidden>{{text.RegistrationData.placeholders.genderID}}</option>
              <option v-for="(genderID, index) in content.genderIDs" :key="index" :value="genderID.id">{{genderID.description}}</option>
            </select>
            <div class="tooltip-campo-vazio alert alert-danger" v-if="!formData.RegistrationData.genderID" >
              <span class='glyphicon glyphicon-remove' aria-hidden='true' @click="msgHidden($event)" :class="{tooltipHidden: isActive}"></span> {{text.campoObrigatorioVazio.texto}}</div>
          </div>
          <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2" :class="{'form-invalid': $v.formData.RegistrationData.dependents.$error}">
            <label for="dados-cadastrais-dependents">{{text.RegistrationData.labels.dependents}}</label>
            <input type="number" id="dados-cadastrais-dependents" v-model.number="formData.RegistrationData.dependents"  @blur="event => formAutoSave('RegistrationData', 'RegistrationData', null, event)">
          </div>
          <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2" :class="{'form-invalid': $v.formData.RegistrationData.birthDate.$error}">
            <label for="dados-cadastrais-birthDate">{{text.RegistrationData.labels.birthDate}}</label>
            <date-picker id="dados-cadastrais-birthDate" :lang="'pt-br'" :format="'DD/MM/YYYY'" v-mask="'##/##/####'" v-model="formData.RegistrationData.birthDate" disabled :not-after="new Date()"></date-picker>
            <div class="tooltip-campo-vazio alert alert-danger" v-if="!formData.RegistrationData.birthDate" >
              <span class='glyphicon glyphicon-remove' aria-hidden='true' @click="msgHidden($event)" :class="{tooltipHidden: isActive}"></span> {{text.campoObrigatorioVazio.texto}}</div>
          </div>
        </div>

        <div id="dados-cadastrais-contact" class="row form-group">
          <div class="col-xs-6 col-sm-4 col-md-4 col-lg-4" :class="{'form-invalid': $v.formData.RegistrationData.phone.$error}">
            <label for="dados-cadastrais-phone">{{text.RegistrationData.labels.phone}}</label>
            <the-mask id="dados-cadastrais-phone" :masked="true" :mask="'(##) ####-####'" v-model="formData.RegistrationData.phone" @blur.native="event => formAutoSave('RegistrationData', 'RegistrationData', null, event)"></the-mask>
          </div>
          <div class="col-xs-6 col-sm-4 col-md-4 col-lg-4" :class="{'form-invalid': $v.formData.RegistrationData.phoneCel.$error}">
            <label for="dados-cadastrais-phoneCel">{{text.RegistrationData.labels.phoneCel}}</label>
            <the-mask id="dados-cadastrais-phoneCel" :masked="true" :mask="'(##) #####-####'" v-model="formData.RegistrationData.phoneCel" @blur.native="event => formAutoSave('RegistrationData', 'RegistrationData', null, event)"></the-mask>
          </div>
          <div class="col-xs-6 col-sm-4 col-md-4 col-lg-4" :class="{'form-invalid': $v.formData.RegistrationData.email.$error}">
            <label for="dados-cadastrais-email">{{text.RegistrationData.labels.email}}</label>
            <input type="text" id="dados-cadastrais-email" v-model="formData.RegistrationData.email"  @blur="event => formAutoSave('RegistrationData', 'RegistrationData', null, event)">
          </div>
        </div>
      </div>

      <div class="panel-footer row">
        <span>{{text.camposObrigatorios.texto}}</span>
      </div>

    </section>

    <!-- section id="Spouse" v-if="formData.RegistrationData.maritalStatusID == 2 || formData.RegistrationData.maritalStatusID == 6" class="panel panel-default container-fluid">

      <div class="panel-heading row">
        <p class="col-xs-10 col-sm-11">{{text.Spouse.title}}</p>
      </div>

      <div class="panel-body row">
        div id="Spouse-documentNumberCPF" class="row form-group form-section">
          <div class="container-fluid">
            <div class="row">
              <div class="col-xs-12 col-sm-4 col-md-3" :class="{'form-invalid': $v.formData.Spouse.documentNumberCPF.$error}">
                <label for="Spouse-documentNumberCPF-input">{{text.Spouse.labels.documentNumberCPF}}</label>
                <the-mask :mask="'###.###.###-##'" id="Spouse-documentNumberCPF-input" v-model="formData.Spouse.documentNumberCPF" @blur.native="event => formAutoSave('Spouse', 'Spouse', null, event)"></the-mask>
              </div>

              <div class="col-xs-12 col-sm-8 col-md-9" :class="{'form-invalid': $v.formData.Spouse.fullName.$error}">
                <label for="Spouse-fullName">{{text.Spouse.labels.fullName}}</label>
                <input type="text" id="Spouse-fullName" v-model="formData.Spouse.fullName" @blur="event => formAutoSave('Spouse', 'Spouse', null, event)">
              </div>

            </div>
          </div>
        </div>

        <div id="Spouse-documentNumberRG" class="row form-group form-section">
          <div class="container-fluid">
            <div class="row">
              <div class="col-xs-6 col-sm-5 col-md-4 col-lg-2">
                <label for="Spouse-documentNumberRG">{{text.Spouse.labels.documentNumberRG}}</label>
                <input type="text" id="Spouse-documentNumberRG" v-model="formData.Spouse.documentNumberRG" @blur="event => formAutoSave('Spouse', 'Spouse', null, event)">
              </div>
              <div class="col-xs-6 col-sm-4 col-md-4 col-lg-3">
                <label for="Spouse-identificationDocumentType">{{text.Spouse.labels.identificationDocumentType}}</label>
                <input type="text" id="Spouse-identificationDocumentType" v-model="formData.Spouse.identificationDocumentType" @blur="event => formAutoSave('Spouse', 'Spouse', null, event)">
              </div>
              <div class="col-xs-4 col-sm-3 col-md-4 col-lg-2">
                <label for="Spouse-organEmitter">{{text.Spouse.labels.organEmitter}}</label>
                <input type="text" id="Spouse-organEmitter" v-model="formData.Spouse.organEmitter" @blur="event => formAutoSave('Spouse', 'Spouse', null, event)">
              </div>
              <div class="col-xs-5 col-sm-4 col-md-4 col-lg-3" :class="{'form-invalid': $v.formData.Spouse.placeOfBirth.$error}">
                <label for="Spouse-placeOfBirth">{{text.Spouse.labels.placeOfBirth}}</label>
                <input type="text" id="Spouse-placeOfBirth" v-model="formData.Spouse.placeOfBirth" @blur="event => formAutoSave('Spouse', 'Spouse', null, event)">
              </div>
              <div class="col-xs-3 col-sm-2 col-md-2 col-lg-2">
                <label for="Spouse-idState">{{text.Spouse.labels.idState}}</label>
                <select id="Spouse-documentState" v-model="formData.Spouse.documentState" @blur="event => formAutoSave('Spouse', 'Spouse', null, event)">
                  <option :value="null" disabled hidden>{{text.Spouse.placeholders.documentState}}</option>
                  <option v-for="(state, index) in content.states" :key="index" :value="state.uf.trim()">{{state.uf.trim()}}</option>
                </select>
              </div>
              <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3">
                <label for="Spouse-emissionDate">{{text.Spouse.labels.emissionDate}}</label>
                <date-picker id="Spouse-emissionDate" :lang="'pt-br'" :format="'DD/MM/YYYY'" v-mask="'##/##/####'" v-model="formData.Spouse.emissionDate" :not-after="new Date()" @focusout.native="event => formAutoSave('Spouse', 'Spouse', null, event)"></date-picker>
              </div>
              <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3">
                <label for="Spouse-birthdate">{{text.Spouse.labels.birthdate}}</label>
                <date-picker id="Spouse-birthdate" :lang="'pt-br'" :format="'DD/MM/YYYY'" v-mask="'##/##/####'" v-model="formData.Spouse.birthdate" :not-after="new Date()" @focusout.native="event => formAutoSave('Spouse', 'Spouse', null, event)"></date-picker>
              </div>
            </div>
          </div>
        </div>

        <div id="Spouse-parents" class="row form-group form-section">
          <div class="container-fluid">
            <div class="row">
              <div class="col-xs-12 col-sm-6" :class="{'form-invalid': $v.formData.Spouse.nameMother.$error}">
                <label for="nameMother">{{text.Spouse.labels.nameMother}}</label>
                <input type="text" id="nameMother" v-model="formData.Spouse.nameMother" @blur="event => formAutoSave('Spouse', 'Spouse', null, event)">
              </div>
              <div class="col-xs-12 col-sm-6">
                <label for="nameFather">{{text.Spouse.labels.nameFather}}</label>
                <input type="text" id="nameFather" v-model="formData.Spouse.nameFather" @blur="event => formAutoSave('Spouse', 'Spouse', null, event)">
              </div>
            </div>
          </div>
        </div>

        <div id="Spouse-address" class="row form-group form-section">
          <div class="container-fluid">
            <div class="row">
              <div class="col-xs-3 col-sm-4 col-md-3 col-lg-2" :class="{'form-invalid': $v.formData.Spouse.addressPostalCode.$error}">
                <label for="Spouse-addressPostalCode">{{text.Spouse.labels.addressPostalCode}}</label>
                <the-mask id="Spouse-addressPostalCode" :mask="'#####-###'" v-model="formData.Spouse.addressPostalCode" :disabled="controls.Spouse.loadingCep" @blur.native="event => formAutoSave('Spouse', 'Spouse', null, event)"></the-mask>
              </div>
              <div class="col-xs-9 col-sm-8 col-md-7 col-lg-8" :class="{'form-invalid': $v.formData.Spouse.addressStreetName.$error}">
                <label for="Spouse-addressStreetName">{{text.Spouse.labels.addressStreetName}}</label>
                <input type="text" id="Spouse-addressStreetName" v-model="formData.Spouse.addressStreetName" :disabled="!controls.Spouse.editAddress || controls.Spouse.loadingCep" @blur="event => formAutoSave('Spouse', 'Spouse', null, event)">
              </div>
              <div class="col-xs-3 col-sm-2 col-md-2 col-lg-2" :class="{'form-invalid': $v.formData.Spouse.addressNumber.$error}">
                <label for="Spouse-addressNumber">{{text.Spouse.labels.addressNumber}}</label>
                <input type="text" id="Spouse-addressNumber" v-model="formData.Spouse.addressNumber" :disabled="controls.Spouse.loadingCep" @blur="event => formAutoSave('Spouse', 'Spouse', null, event)">
              </div>
              <div class="col-xs-4 col-sm-3 col-md-2 col-lg-2">
                <label for="Spouse-addressAdditionalData">{{text.Spouse.labels.addressAdditionalData}}</label>
                <input type="text" id="Spouse-addressAdditionalData" v-model="formData.Spouse.addressAdditionalData" :disabled="controls.Spouse.loadingCep" @blur="event => formAutoSave('Spouse', 'Spouse', null, event)">
              </div>
              <div class="col-xs-5 col-sm-5 col-md-2 col-lg-2" :class="{'form-invalid': $v.formData.Spouse.addressNeighborhood.$error}">
                <label for="Spouse-addressNeighborhood">{{text.Spouse.labels.addressNeighborhood}}</label>
                <input type="text" id="Spouse-addressNeighborhood" v-model="formData.Spouse.addressNeighborhood" :disabled="!controls.Spouse.editAddress || controls.Spouse.loadingCep" @blur="event => formAutoSave('Spouse', 'Spouse', null, event)">
              </div>
              <div class="col-xs-3 col-sm-2 col-md-2 col-lg-2" :class="{'form-invalid': $v.formData.Spouse.uf.$error}">

                <label for="Spouse-uf">{{text.Spouse.labels.addressStateID}}</label>

                <select id="Spouse-uf" v-model="formData.Spouse.uf" :disabled="!controls.Spouse.editAddress || controls.Spouse.loadingCep" @change="spouse_loadCities(formData.Spouse.uf)" @blur="event => formAutoSave('Spouse', 'Spouse', null, event)">
                  <option :value="null" disabled hidden>{{text.Spouse.placeholders.idState}}</option>
                  <option v-for="(state, index) in content.states" :key="index" :value="state.uf.trim()">{{state.uf.trim()}}</option>
                </select>
              </div>
              <div class="col-xs-9 col-sm-5 col-md-4 col-lg-4" :class="{'form-invalid': $v.formData.Spouse.cityName.$error}">
                <label for="Spouse-cityName">{{text.Spouse.labels.cityName}}</label>
                <select id="Spouse-cityName" v-model="formData.Spouse.cityName" :disabled="!controls.Spouse.editAddress || controls.Spouse.loadingCep" @blur="event => formAutoSave('Spouse', 'Spouse', null, event)">
                  <option :value="null" disabled hidden>{{text.Spouse.placeholders.cityName}}</option>
                  <option v-for="(city, index) in content.Spouse.cities" :key="index" :value="city.cityName">{{city.cityName}}</option>
                </select>
              </div>
              <div class="col-xs-6 col-sm-5 col-md-3 col-lg-2" :class="{'form-invalid': $v.formData.Spouse.telOffice.$error}">
                <label for="Spouse-telOffice">{{text.Spouse.labels.telOffice}}</label>
                <the-mask id="Spouse-telOffice" :mask="['(##) ####-####', '(##) #####-####']" :masked="true" v-model="formData.Spouse.telOffice" :disabled="controls.Spouse.loadingCep" @blur.native="event => formAutoSave('Spouse', 'Spouse', null, event)"></the-mask>
              </div>
            </div>
          </div>
        </div> -->

        <!-- div id="Spouse-employer" class="row form-group">
          <div class="container-fluid">
            <div class="row">
              <div class="col-xs-12 col-sm-8 col-md-8 col-lg-6">
                <label for="Spouse-nameEmployer">{{text.Spouse.labels.nameEmployer}}</label>
                <input type="text" id="Spouse-nameEmployer" v-model="formData.Spouse.nameEmployer" @blur="event => formAutoSave('Spouse', 'Spouse', null, event)">
              </div>
              <div class="col-xs-6 col-sm-4 col-md-4 col-lg-3">
                <label for="Spouse-departament">{{text.Spouse.labels.departament}}</label>
                <input type="text" id="Spouse-departament" v-model="formData.Spouse.departament" @blur="event => formAutoSave('Spouse', 'Spouse', null, event)">
              </div>
              <div class="col-xs-6 col-sm-4 col-md-4 col-lg-3">
                <label for="Spouse-profession">{{text.Spouse.labels.profession}}</label>
                <input type="text" for="Spouse-profession" v-model="formData.Spouse.profession" @blur="event => formAutoSave('Spouse', 'Spouse', null, event)">
              </div>
              <div class="col-xs-6 col-sm-4 col-md-4 col-lg-3">
                <label for="Spouse-jobRole">{{text.Spouse.labels.jobRole}}</label>
                <input type="text" for="Spouse-jobRole" v-model="formData.Spouse.jobRole" @blur="event => formAutoSave('Spouse', 'Spouse', null, event)">
              </div>
              <div class="col-xs-6 col-sm-4 col-md-4 col-lg-3">
                <label for="Spouse-admissionDate">{{text.Spouse.labels.admissionDate}}</label>
                <date-picker id="Spouse-admissionDate" :lang="'pt-br'" :format="'DD/MM/YYYY'" v-mask="'##/##/####'" v-model="formData.Spouse.admissionDate" :not-after="new Date()" @focusout.native="event => formAutoSave('Spouse', 'Spouse', null, event)"></date-picker>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="panel-footer row">
        <span>{{text.camposObrigatorios.texto}}</span>
      </div>

    </section -->

    <section id="Spouse" v-if="formData.RegistrationData.maritalStatusID == 2 || formData.RegistrationData.maritalStatusID == 6" class="panel panel-default container-fluid">

      <div class="panel-heading row">
        <p class="col-xs-10 col-sm-11">{{text.Spouse.title}}</p>
      </div>

      <div class="panel-body row">

        <!-- <p>{{$v.formData.Spouse}}</p> -->

        <div id="Spouse-documentNumberCPF" class="row form-group form-section">
          <div class="container-fluid">
            <div class="row">

              <!-- <p>{{formData.Spouse}}</p> -->

              <div class="col-xs-12 col-sm-4 col-md-3">
                <label for="Spouse-documentNumberCPF-input">{{text.Spouse.labels.documentNumberCPF}}</label>
                <the-mask :mask="'###.###.###-##'" id="Spouse-documentNumberCPF-input" v-model="formData.Spouse.documentNumberCPF" @blur.native="event => formAutoSave('Spouse', 'Spouse', null, event)"></the-mask>
              </div>

              <div class="col-xs-12 col-sm-8 col-md-9">
                <label for="Spouse-fullName">{{text.Spouse.labels.fullName}}</label>
                <input type="text" id="Spouse-fullName" v-model="formData.Spouse.fullName" @blur="event => formAutoSave('Spouse', 'Spouse', null, event)">
              </div>

            </div>
          </div>
        </div>

        <div id="Spouse-documentNumberRG" class="row form-group form-section">
          <div class="container-fluid">
            <div class="row">
              <div class="col-xs-6 col-sm-5 col-md-4 col-lg-2">
                <label for="Spouse-documentNumberRG">{{text.Spouse.labels.documentNumberRG}}</label>
                <input type="text" id="Spouse-documentNumberRG" v-model="formData.Spouse.documentNumberRG" @blur="event => formAutoSave('Spouse', 'Spouse', null, event)">
              </div>
              <div class="col-xs-6 col-sm-4 col-md-4 col-lg-3">
                <label for="Spouse-identificationDocumentType">{{text.Spouse.labels.identificationDocumentType}}</label>
                <input type="text" id="Spouse-identificationDocumentType" v-model="formData.Spouse.identificationDocumentType" @blur="event => formAutoSave('Spouse', 'Spouse', null, event)">
              </div>
              <div class="col-xs-4 col-sm-3 col-md-4 col-lg-2">
                <label for="Spouse-organEmitter">{{text.Spouse.labels.organEmitter}}</label>
                <input type="text" id="Spouse-organEmitter" v-model="formData.Spouse.organEmitter" @blur="event => formAutoSave('Spouse', 'Spouse', null, event)">
              </div>
              <div class="col-xs-5 col-sm-4 col-md-4 col-lg-3">
                <label for="Spouse-placeOfBirth">{{text.Spouse.labels.placeOfBirth}}</label>
                <input type="text" id="Spouse-placeOfBirth" v-model="formData.Spouse.placeOfBirth" @blur="event => formAutoSave('Spouse', 'Spouse', null, event)">
              </div>
              <div class="col-xs-3 col-sm-2 col-md-2 col-lg-2">
                <label for="Spouse-idState">{{text.Spouse.labels.idState}}</label>
                <select id="Spouse-documentState" v-model="formData.Spouse.documentState" @blur="event => formAutoSave('Spouse', 'Spouse', null, event)">
                  <option :value="null" disabled hidden>{{text.Spouse.placeholders.documentState}}</option>
                  <option v-for="(state, index) in content.states" :key="index" :value="state.uf.trim()">{{state.uf.trim()}}</option>
                </select>
              </div>
              <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3">
                <label for="Spouse-emissionDate">{{text.Spouse.labels.emissionDate}}</label>
                <date-picker id="Spouse-emissionDate" :lang="'pt-br'" :format="'DD/MM/YYYY'" v-mask="'##/##/####'" v-model="formData.Spouse.emissionDate" :not-after="new Date()" @focusout.native="event => formAutoSave('Spouse', 'Spouse', null, event)"></date-picker>
              </div>
              <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3">
                <label for="Spouse-birthdate">{{text.Spouse.labels.birthdate}}</label>
                <date-picker id="Spouse-birthdate" :lang="'pt-br'" :format="'DD/MM/YYYY'" v-mask="'##/##/####'" v-model="formData.Spouse.birthdate" :not-after="new Date()" @focusout.native="event => formAutoSave('Spouse', 'Spouse', null, event)"></date-picker>
              </div>
            </div>
          </div>
        </div>

        <div id="Spouse-parents" class="row form-group form-section">
          <div class="container-fluid">
            <div class="row">
              <div class="col-xs-12 col-sm-6">
                <label for="nameMother">{{text.Spouse.labels.nameMother}}</label>
                <input type="text" id="nameMother" v-model="formData.Spouse.nameMother" @blur="event => formAutoSave('Spouse', 'Spouse', null, event)">
              </div>
              <div class="col-xs-12 col-sm-6">
                <label for="nameFather">{{text.Spouse.labels.nameFather}}</label>
                <input type="text" id="nameFather" v-model="formData.Spouse.nameFather" @blur="event => formAutoSave('Spouse', 'Spouse', null, event)">
              </div>
            </div>
          </div>
        </div>

        <div id="Spouse-address" class="row form-group form-section">
          <div class="container-fluid">
            <div class="row">
              <div class="col-xs-3 col-sm-4 col-md-3 col-lg-2">
                <label for="Spouse-addressPostalCode">{{text.Spouse.labels.addressPostalCode}}</label>
                <the-mask id="Spouse-addressPostalCode" :mask="'#####-###'" v-model="formData.Spouse.addressPostalCode" :disabled="controls.Spouse.loadingCep" @blur.native="event => formAutoSave('Spouse', 'Spouse', null, event)"></the-mask>
              </div>
              <div class="col-xs-9 col-sm-8 col-md-7 col-lg-8">
                <label for="Spouse-addressStreetName">{{text.Spouse.labels.addressStreetName}}</label>
                <input type="text" id="Spouse-addressStreetName" v-model="formData.Spouse.addressStreetName" :disabled="!controls.Spouse.editAddress || controls.Spouse.loadingCep" @blur="event => formAutoSave('Spouse', 'Spouse', null, event)">
              </div>
              <div class="col-xs-3 col-sm-2 col-md-2 col-lg-2">
                <label for="Spouse-addressNumber">{{text.Spouse.labels.addressNumber}}</label>
                <input type="text" id="Spouse-addressNumber" v-model="formData.Spouse.addressNumber" :disabled="controls.Spouse.loadingCep" @blur="event => formAutoSave('Spouse', 'Spouse', null, event)">
              </div>
              <div class="col-xs-4 col-sm-3 col-md-2 col-lg-2">
                <label for="Spouse-addressAdditionalData">{{text.Spouse.labels.addressAdditionalData}}</label>
                <input type="text" id="Spouse-addressAdditionalData" v-model="formData.Spouse.addressAdditionalData" :disabled="controls.Spouse.loadingCep" @blur="event => formAutoSave('Spouse', 'Spouse', null, event)">
              </div>
              <div class="col-xs-5 col-sm-5 col-md-2 col-lg-2">
                <label for="Spouse-addressNeighborhood">{{text.Spouse.labels.addressNeighborhood}}</label>
                <input type="text" id="Spouse-addressNeighborhood" v-model="formData.Spouse.addressNeighborhood" :disabled="!controls.Spouse.editAddress || controls.Spouse.loadingCep" @blur="event => formAutoSave('Spouse', 'Spouse', null, event)">
              </div>
              <div class="col-xs-3 col-sm-2 col-md-2 col-lg-2">
                <label for="Spouse-uf">{{text.Spouse.labels.addressStateID}}</label>
                <select id="Spouse-uf" v-model="formData.Spouse.uf" :disabled="!controls.Spouse.editAddress || controls.Spouse.loadingCep" @change="spouse_loadCities(formData.Spouse.uf)" @blur="event => formAutoSave('Spouse', 'Spouse', null, event)">
                  <option :value="null" disabled hidden>{{text.Spouse.placeholders.idState}}</option>
                  <option v-for="(state, index) in content.states" :key="index" :value="state.uf.trim()">{{state.uf.trim()}}</option>
                </select>
              </div>
              <div class="col-xs-9 col-sm-5 col-md-4 col-lg-4">
                <label for="Spouse-cityName">{{text.Spouse.labels.cityName}}</label>
                <select id="Spouse-cityName" v-model="formData.Spouse.cityName" :disabled="!controls.Spouse.editAddress || controls.Spouse.loadingCep" @blur="event => formAutoSave('Spouse', 'Spouse', null, event)">
                  <option :value="null" disabled hidden>{{text.Spouse.placeholders.cityName}}</option>
                  <option v-for="(city, index) in content.Spouse.cities" :key="index" :value="city.cityName">{{city.cityName}}</option>
                </select>
              </div>
              <div class="col-xs-6 col-sm-5 col-md-3 col-lg-2">
                <label for="Spouse-telOffice">{{text.Spouse.labels.telOffice}}</label>
                <the-mask id="Spouse-telOffice" :mask="['(##) ####-####', '(##) #####-####']" :masked="true" v-model="formData.Spouse.telOffice" :disabled="controls.Spouse.loadingCep" @blur.native="event => formAutoSave('Spouse', 'Spouse', null, event)"></the-mask>
              </div>
            </div>
          </div>
        </div>

        <div id="Spouse-employer" class="row form-group">
          <div class="container-fluid">
            <div class="row">
              <div class="col-xs-12 col-sm-8 col-md-8 col-lg-6">
                <label for="Spouse-nameEmployer">{{text.Spouse.labels.nameEmployer}}</label>
                <input type="text" id="Spouse-nameEmployer" v-model="formData.Spouse.nameEmployer" @blur="event => formAutoSave('Spouse', 'Spouse', null, event)">
              </div>
              <div class="col-xs-6 col-sm-4 col-md-4 col-lg-3">
                <label for="Spouse-departament">{{text.Spouse.labels.departament}}</label>
                <input type="text" id="Spouse-departament" v-model="formData.Spouse.departament" @blur="event => formAutoSave('Spouse', 'Spouse', null, event)">
              </div>
              <div class="col-xs-6 col-sm-4 col-md-4 col-lg-3">
                <label for="Spouse-profession">{{text.Spouse.labels.profession}}</label>
                <input type="text" for="Spouse-profession" v-model="formData.Spouse.profession" @blur="event => formAutoSave('Spouse', 'Spouse', null, event)">
              </div>
              <div class="col-xs-6 col-sm-4 col-md-4 col-lg-3">
                <label for="Spouse-jobRole">{{text.Spouse.labels.jobRole}}</label>
                <input type="text" for="Spouse-jobRole" v-model="formData.Spouse.jobRole" @blur="event => formAutoSave('Spouse', 'Spouse', null, event)">
              </div>
              <div class="col-xs-6 col-sm-4 col-md-4 col-lg-3">
                <label for="Spouse-admissionDate">{{text.Spouse.labels.admissionDate}}</label>
                <date-picker id="Spouse-admissionDate" :lang="'pt-br'" :format="'DD/MM/YYYY'" v-mask="'##/##/####'" v-model="formData.Spouse.admissionDate" :not-after="new Date()" @focusout.native="event => formAutoSave('Spouse', 'Spouse', null, event)"></date-picker>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="panel-footer row">
        <span>{{text.camposObrigatorios.texto}}</span>
      </div>

    </section>

    <section id="Address" class="panel panel-default container-fluid">

      <div class="panel-heading row">
        <p class="col-xs-10 col-sm-11">{{text.Address.title}}</p>
      </div>

      <div class="panel-body row">
        <div id="Address-endereco" class="row form-group form-section">
          <div class="container-fluid">
            <div class="row">

              <!-- <p>{{formData.Address}}</p> -->
              <!-- <p>{{$v.formData.Address}}</p> -->

              <div class="col-xs-4 col-sm-4 col-md-4 col-lg-2" :class="{'form-invalid': $v.formData.Address.addressPostalCode.$error}">
                <label for="Address-addressPostalCode">{{text.Address.labels.addressPostalCode}}</label>
                <the-mask :mask="'#####-###'" id="Address-addressPostalCode" v-model="formData.Address.addressPostalCode" :disabled="controls.Address.loadingCep" @blur.native="event => formAutoSave('Address', 'Address', null, event)"></the-mask>
              </div>

              <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8" :class="{'form-invalid': $v.formData.Address.addressStreetName.$error}">
                <label for="Address-addressStreetName">{{text.Address.labels.addressStreetName}}</label>
                <input type="text" id="Address-addressStreetName" v-model="formData.Address.addressStreetName" :disabled="controls.Address.loadingCep || !controls.Address.editAddress || $v.formData.Address.addressPostalCode.$invalid" @blur="event => formAutoSave('Address', 'Address', null, event)">
              </div>

              <div class="col-xs-4 col-sm-2 col-md-2 col-lg-2" :class="{'form-invalid': $v.formData.Address.addressNumber.$error}">
                <label for="Address-addressNumber">{{text.Address.labels.addressNumber}}</label>
                <input type="text" id="Address-addressNumber" v-model.number="formData.Address.addressNumber" :disabled="controls.Address.loadingCep || $v.formData.Address.addressPostalCode.$invalid" @blur="event => formAutoSave('Address', 'Address', null, event)">
              </div>

              <div class="col-xs-8 col-sm-4 col-md-4 col-lg-2">
                <label for="Address-addressAdditionalData">{{text.Address.labels.addressAdditionalData}}</label>
                <input type="text" id="Address-addressAdditionalData" v-model="formData.Address.addressAdditionalData" :disabled="controls.Address.loadingCep || $v.formData.Address.addressPostalCode.$invalid" @blur="event => formAutoSave('Address', 'Address', null, event)">
              </div>

              <div class="col-xs-6 col-md-6 col-lg-3" :class="{'form-invalid': $v.formData.Address.addressNeighborhood.$error}">
                <label for="Address-addressNeighborhood">{{text.Address.labels.addressNeighborhood}}</label>
                <input type="text" id="Address-addressNeighborhood" v-model="formData.Address.addressNeighborhood" :disabled="controls.Address.loadingCep || !controls.Address.editAddress || $v.formData.Address.addressPostalCode.$invalid" @blur="event => formAutoSave('Address', 'Address', null, event)">
              </div>

              <div class="col-xs-6 col-sm-5 col-md-6 col-lg-3">
                <label for="Address-referencePoint">{{text.Address.labels.referencePoint}}</label>
                <input type="text" id="Address-referencePoint" v-model="formData.Address.referencePoint" :disabled="controls.Address.loadingCep || $v.formData.Address.addressPostalCode.$invalid" @blur="event => formAutoSave('Address', 'Address', null, event)">
              </div>

              <div class="col-xs-4 col-sm-2 col-md-2 col-lg-1" :class="{'form-invalid': $v.formData.Address.uf.$error}">
                <label for="Address-uf">{{text.Address.labels.addressStateID}}</label>
                <select id="Address-uf" v-model="formData.Address.uf" @change="Address_loadCities(formData.Address.uf)" :disabled="controls.Address.loadingCep || !controls.Address.editAddress || $v.formData.Address.addressPostalCode.$invalid" @blur="event => formAutoSave('Address', 'Address', null, event)">
                  <option :value="null" disabled hidden>{{text.Address.placeholders.addressStateID}}</option>
                  <option v-for="(state, index) in content.states" :key="index" :value="state.uf.trim()">{{state.uf.trim()}}</option>
                </select>
              </div>

              <div class="col-xs-8 col-sm-5 col-md-4 col-lg-3" :class="{'form-invalid': $v.formData.Address.cityName.$error}">
                <label for="Address-cityName">{{text.Address.labels.cityName}}</label>
                <select id="Address-cityName" v-model="formData.Address.cityName" :disabled="controls.Address.loadingCep || !controls.Address.editAddress || $v.formData.Address.addressPostalCode.$invalid" @blur="event => formAutoSave('Address', 'Address', null, event)">
                  <option :value="null" disabled hidden>{{text.Address.placeholders.cityName}}</option>
                  <option v-for="(city, index) in content.Address.cities" :key="index" :value="city.cityName">{{city.cityName}}</option>
                </select>
              </div>

            </div>
          </div>
        </div>

        <div id="Address-detalhes" class="row form-group">
          <div class="container-fluid">
            <div class="row">
              <fieldset class="col-xs-12 col-md-8 col-lg-7" :class="{'form-invalid': $v.formData.Address.homeTypeID.$error}">
                <legend>{{text.Address.labels.homeTypeID}}</legend>
                <label class="ficha-cadastral-inline-input" for="Address-residenceType-owner"><input type="radio" name="Address-residenceType" id="Address-residenceType-owner" v-model.number="formData.Address.homeTypeID" value="1" @click="event => formAutoSave('Address', 'Address', null, event)">{{text.Address.labels.homeTypeID_owner}}</label>
                <label class="ficha-cadastral-inline-input" for="Address-residenceType-rent"><input type="radio" name="Address-residenceType" id="Address-residenceType-rent" v-model.number="formData.Address.homeTypeID" value="2" @click="event => formAutoSave('Address', 'Address', null, event)">{{text.Address.labels.homeTypeID_rent}}</label>
                <label class="ficha-cadastral-inline-input" for="Address-residenceType-other" :class="{'form-invalid': $v.formData.Address.otherHome.$error}"><input type="radio" name="Address-residenceType" id="Address-residenceType-other" v-model.number="formData.Address.homeTypeID" value="5" @click="event => formAutoSave('Address', 'Address', null, event)">{{text.Address.labels.otherHome}}<input type="text" id="Address-residenceType-other" v-model="formData.Address.otherHome" :disabled="formData.Address.homeTypeID !== 5"></label>
              </fieldset>

              <div class="col-xs-6 col-md-4 col-lg-3" :class="{'form-invalid': $v.formData.Address.houseTimeID.$error}">
                <label for="Address-residenceTime">{{text.Address.labels.houseTime}}</label>
                <select id="Address-residenceTime" v-model="formData.Address.houseTimeID" @blur="event => formAutoSave('Address', 'Address', null, event)">
                  <option :value="null" disabled hidden>{{text.Address.placeholders.houseTimeID}}</option>
                  <option v-for="(item, index) in content.houseTimes" :key="index" :value="item.id">{{item.description}}</option>
                </select>
              </div>

              <div class="col-xs-6 col-md-6 col-lg-2" :class="{'form-invalid': $v.formData.Address.phone.$error}">
                <label for="Address-phone">{{text.Address.labels.phone}}</label>
                <the-mask :mask="['(##) ####-####', '(##) #####-####']" :masked="true" id="Address-phone" v-model="formData.Address.phone" @blur.native="event => formAutoSave('Address', 'Address', null, event)"></the-mask>
              </div>

            </div>
          </div>
        </div>
      </div>

      <div class="panel-footer row">
        <span>{{text.camposObrigatorios.texto}}</span>
      </div>

    </section>

    <section id="dados-profissionais" class="panel panel-default container-fluid">

      <div class="panel-heading row">
        <p class="col-xs-10 col-sm-11">{{text.ProfessionalData.title}}</p>
      </div>

      <div class="panel-body row">
        <div id="dados-profissionais-info" class="row form-group form-section">
          <div class="container-fluid">

            <div class="row form-group form-section">
              <div class="col-xs-12 col-sm-7 col-md-6 col-lg-7" :class="{'form-invalid': $v.formData.ProfessionalData.fullName.$error}">
                <label for="dados-profissionais-fullName">{{text.ProfessionalData.labels.fullName}}</label>
                <input type="text" id="dados-profissionais-fullName" v-model="formData.ProfessionalData.fullName" @blur="event => formAutoSave('ProfessionalData', 'ProfessionalData', null, event)" :maxlength="controls.maxInputText">
              </div>
              <div class="col-xs-6 col-sm-3 col-md-3 col-lg-3">
                <label for="dados-profissionais-numberDocumentCNPJ">{{text.ProfessionalData.labels.numberDocumentCNPJ}}</label>
                <the-mask id="dados-profissionais-numberDocumentCNPJ" :mask="'##.###.###/####-##'" v-model="formData.ProfessionalData.numberDocumentCNPJ" @blur.native="event => formAutoSave('ProfessionalData', 'ProfessionalData', null, event)"></the-mask>
              </div>
              <div class="col-xs-6 col-sm-2 col-md-3 col-lg-2">
                <label for="dados-profissionais-capitalParticipation">{{text.ProfessionalData.labels.capitalParticipation}}</label>
                <input id="dados-profissionais-capitalParticipation" type="number" step="0.01" min="0" max="100" v-model="formData.ProfessionalData.capitalParticipation" @blur="event => formAutoSave('ProfessionalData', 'ProfessionalData', null, event)" maxlength="3">
              </div>
            </div>

            <div class="row form-group form-section">
              <div class="col-xs-3 col-md-3 col-lg-2" :class="{'form-invalid': $v.formData.ProfessionalData.addressPostalCode.$error}">
                <label for="dados-profissionais-addressPostalCode">{{text.ProfessionalData.labels.addressPostalCode}}</label>
                <the-mask id="dados-profissionais-addressPostalCode" :mask="'#####-###'" v-model="formData.ProfessionalData.addressPostalCode" disabled></the-mask>
                <div class="tooltip-campo-vazio alert alert-danger" v-if="!formData.ProfessionalData.addressPostalCode" ><span class='glyphicon glyphicon-remove' aria-hidden='true' @click="msgHidden($event)" :class="{tooltipHidden: isActive}"></span> {{text.campoObrigatorioVazio.texto}}</div>
              </div>
              <div class="col-xs-9 col-md-9 col-lg-8" :class="{'form-invalid': $v.formData.ProfessionalData.addressStreetName.$error}">
                <label for="dados-profissionais-addressStreetName">{{text.ProfessionalData.labels.addressStreetName}}</label>
                <input id="dados-profissionais-addressStreetName" type="text" v-model="formData.ProfessionalData.addressStreetName" disabled>
                <div class="tooltip-campo-vazio alert alert-danger" v-if="!formData.ProfessionalData.addressStreetName" ><span class='glyphicon glyphicon-remove' aria-hidden='true' @click="msgHidden($event)" :class="{tooltipHidden: isActive}"></span> {{text.campoObrigatorioVazio.texto}}</div>
              </div>
              <div class="col-xs-3 col-sm-4 col-md-3 col-lg-2" :class="{'form-invalid': $v.formData.ProfessionalData.addressNumber.$error}">
                <label for="dados-profissionais-addressNumber">{{text.ProfessionalData.labels.addressNumber}}</label>
                <input id="dados-profissionais-addressNumber" type="number" v-model="formData.ProfessionalData.addressNumber" disabled>
                <div class="tooltip-campo-vazio alert alert-danger" v-if="!formData.ProfessionalData.addressNumber" ><span class='glyphicon glyphicon-remove' aria-hidden='true' @click="msgHidden($event)" :class="{tooltipHidden: isActive}"></span>{{text.campoObrigatorioVazio.texto}}</div>
              </div>
              <div class="col-xs-5 col-sm-4 col-md-3 col-lg-2">
                <label for="dados-profissionais-addressAdditionalData">{{text.ProfessionalData.labels.addressAdditionalData}}</label>
                <input id="dados-profissionais-addressAdditionalData" type="text" v-model="formData.ProfessionalData.addressAdditionalData" disabled>
              </div>
              <div class="col-xs-4 col-sm-4 col-md-6 col-lg-3" :class="{'form-invalid': $v.formData.ProfessionalData.addressNeighborhood.$error}">
                <label for="dados-profissionais-addressNeighborhood">{{text.ProfessionalData.labels.addressNeighborhood}}</label>
                <input id="dados-profissionais-addressNeighborhood" type="text" v-model="formData.ProfessionalData.addressNeighborhood" disabled>
                <div class="tooltip-campo-vazio alert alert-danger" v-if="!formData.ProfessionalData.addressNeighborhood" ><span class='glyphicon glyphicon-remove' aria-hidden='true' @click="msgHidden($event)" :class="{tooltipHidden: isActive}"></span>{{text.campoObrigatorioVazio.texto}}</div>
              </div>
              <div class="col-xs-3 col-sm-3 col-md-3 col-lg-1" :class="{'form-invalid': $v.formData.ProfessionalData.uf.$error}">
                <label for="dados-profissionais-uf">{{text.ProfessionalData.labels.uf}}</label>
                <select id="dados-profissionais-uf" v-model="formData.ProfessionalData.uf" disabled>
                  <option :value="null" disabled hidden>{{text.ProfessionalData.placeholders.uf}}</option>
                  <option v-for="(state, index) in content.states" :key="index" :value="state.uf.trim()">{{state.uf.trim()}}</option>
                </select>
                <div class="tooltip-campo-vazio alert alert-danger" v-if="!formData.ProfessionalData.uf" ><span class='glyphicon glyphicon-remove' aria-hidden='true' @click="msgHidden($event)" :class="{tooltipHidden: isActive}"></span>{{text.campoObrigatorioVazio.texto}}</div>
              </div>
              <div class="col-xs-5 col-sm-5 col-md-5 col-lg-4" :class="{'form-invalid': $v.formData.ProfessionalData.cityName.$error}">
                <label for="dados-profissionais-cityName">{{text.ProfessionalData.labels.cityName}}</label>
                <select id="dados-profissionais-cityName" v-model="formData.ProfessionalData.cityName" disabled>
                  <option :value="null" disabled hidden>{{text.ProfessionalData.placeholders.cityName}}</option>
                  <option v-for="(city, index) in content.ProfessionalData.cities" :key="index" :value="city.cityName">{{city.cityName}}</option>
                </select>
                <div class="tooltip-campo-vazio alert alert-danger" v-if="!formData.ProfessionalData.cityName" ><span class='glyphicon glyphicon-remove' aria-hidden='true' @click="msgHidden($event)" :class="{tooltipHidden: isActive}"></span>{{text.campoObrigatorioVazio.texto}}</div>
              </div>
              <div class="col-xs-4 col-sm-4 col-md-4 col-lg-2">
                <label for="dados-profissionais-phone">{{text.ProfessionalData.labels.phone}}</label>
                <the-mask id="dados-profissionais-phone" :masked="true" :mask="['(##) ####-####', '(##) #####-####']" v-model="formData.ProfessionalData.phone" @blur.native="event => formAutoSave('ProfessionalData', 'ProfessionalData', null, event)"></the-mask>
              </div>
            </div>

            <div class="row form-group">
              <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4">
                <label for="dados-profissionais-professionID">{{text.ProfessionalData.labels.profession}}</label>
                <select id="dados-profissionais-professionID" v-model="formData.ProfessionalData.professionID"  @blur="event => formAutoSave('ProfessionalData', 'ProfessionalData', null, event)">
                  <option :value="null" disabled hidden>{{text.ProfessionalData.placeholders.profession}}</option>
                  <option v-for="(item, index) in content.professions" :key="index" :value="item.id">[{{item.cod}}] - {{item.description}}</option>
                </select>
              </div>
              <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4">
                <label for="dados-profissionais-functionID">{{text.ProfessionalData.labels.function}}</label>
                <select id="dados-profissionais-functionID" v-model="formData.ProfessionalData.functionID" @blur="event => formAutoSave('ProfessionalData', 'ProfessionalData', null, event)">
                  <option :value="null" disabled hidden>{{text.ProfessionalData.placeholders.function}}</option>
                  <option v-for="(item, index) in content.functions" :key="index" :value="item.id">[{{item.cod}}] - {{item.description}}</option>
                </select>
              </div>
              <div class="col-xs-6 col-sm-6 col-md-2 col-lg-2" :class="{'form-invalid': $v.formData.ProfessionalData.salary.$error}">
                <label for="dados-profissionais-salary">{{text.ProfessionalData.labels.salary}}</label>
                <Money type="text" id="dados-profissionais-salary" v-bind="controls.money" v-model="formData.ProfessionalData.salary" @blur.native="event => formAutoSave('ProfessionalData', 'ProfessionalData', null, event)"></Money>
              </div>
              <div class="col-xs-6 col-sm-6 col-md-2 col-lg-2">
                <label for="dados-profissionais-admissionDate">{{text.ProfessionalData.labels.admissionDate}}</label>
                <date-picker id="dados-profissionais-admissionDate" :lang="'pt-br'" :format="'DD/MM/YYYY'" v-mask="'##/##/####'" v-model="formData.ProfessionalData.admissionDate" :not-after="new Date()"  @focusout.native="event => formAutoSave('ProfessionalData', 'ProfessionalData', null, event)"></date-picker>
              </div>
            </div>

          </div>
        </div>
        <div id="dados-profissionais-empresas" class="row form-group form-section" :class="{'form-invalid': $v.formData.ProfessionalData.hasAdditionalCompany.$error}">
          <fieldset class="container-fluid">
            <div class="row">
              <legend class="col-xs-12">{{text.ProfessionalData.labels.hasAdditionalCompany}}</legend>
            </div>
            <div class="row">
              <div class="col-xs-12 form-group">
                <label for="dados-profissionais-hasAdditionalCompany-true" class="ficha-cadastral-inline-input"><input type="radio" id="dados-profissionais-hasAdditionalCompany-true" name="dados-profissionais-hasAdditionalCompany" v-model="formData.ProfessionalData.hasAdditionalCompany" :value="true"  @click="acceptAdditionalCompany()">{{text.ProfessionalData.labels.yes}}</label>
                <label for="dados-profissionais-hasAdditionalCompany-false" class="ficha-cadastral-inline-input"><input type="radio" name="dados-profissionais-hasAdditionalCompany" id="dados-profissionais-hasAdditionalCompany-false" v-model="formData.ProfessionalData.hasAdditionalCompany"  :value="false" @click="removeAllAdditionalCompany()">{{text.ProfessionalData.labels.no}}</label>
              </div>
            </div>
            <div class="row form-group form-section" v-if="formData.ProfessionalData.hasAdditionalCompany && formData.ProfessionalData" v-for="(company, index) in formData.ProfessionalData.shareholders" :key="index">
              <div class="col-xs-4 col-sm-4 col-md-4 col-lg-2" :class="{'form-invalid': $v.formData.ProfessionalData.shareholders.$each[index].numberDocumentCNPJ.$error}">
                <label>{{text.ProfessionalData.labels.numberDocumentCNPJ}}</label>
                <the-mask :mask="'##.###.###/####-##'" v-model="formData.ProfessionalData.shareholders[index].numberDocumentCNPJ"  @blur.native="event => formAutoSave('ProfessionalData', 'ProfessionalData', null, event)"></the-mask>
              </div>
              <div class="col-xs-8 col-sm-8 col-md-8 col-lg-3" :class="{'form-invalid': $v.formData.ProfessionalData.shareholders.$each[index].fullName.$error}">
                <label>{{text.ProfessionalData.labels.fullName}}</label>
                <input type="text" v-model="formData.ProfessionalData.shareholders[index].fullName"  @blur="event => formAutoSave('ProfessionalData', 'ProfessionalData', null, event)" :maxlength="controls.maxInputText">
              </div>
              <div class="col-xs-4 col-sm-4 col-md-4 col-lg-2" :class="{'form-invalid': $v.formData.ProfessionalData.shareholders.$each[index].admissionDate.$error}">
                <label>{{text.ProfessionalData.labels.admissionDate}}</label>
                <date-picker :lang="'pt-br'" :format="'DD/MM/YYYY'" v-mask="'##/##/####'" v-model="formData.ProfessionalData.shareholders[index].admissionDate" :not-after="new Date()"  @focusout.native="event => formAutoSave('ProfessionalData', 'ProfessionalData', null, event)"></date-picker>
              </div>
              <div class="capitalParticipation" :class="[(formData.ProfessionalData.shareholders.length > 1 && index == formData.ProfessionalData.shareholders.length - 1 ? 'col-xs-4 col-sm-4 col-md-4 col-lg-3' : 'col-xs-6 col-sm-6 col-md-6 col-lg-5'), ($v.formData.ProfessionalData.shareholders.$each[index].capitalParticipation.$error ? 'form-invalid': '')]">
                <label>{{text.ProfessionalData.labels.capitalParticipation}}</label>
                <input type="number" v-model="formData.ProfessionalData.shareholders[index].capitalParticipation" step=".01" min="0" max="100"  @blur="event => formAutoSave('ProfessionalData', 'ProfessionalData', null, event)">
              </div>
              <div class="col-xs-2 col-sm-2 col-md-2 col-lg-1" v-if="index == formData.ProfessionalData.shareholders.length - 1">
                <label>&nbsp;</label>
                <button @click="addAdditionalCompany" :disabled="$v.formData.ProfessionalData.shareholders.$each[index].$invalid"><span class="glyphicon glyphicon-plus"></span></button>
              </div>
              <div class="col-xs-2 col-sm-2 col-md-2 col-lg-1" v-if="formData.ProfessionalData.shareholders.length > 1">
                <label>&nbsp;</label>
                <button @click="removeAdditionalCompany(index), event => formAutoSave('ProfessionalData', 'ProfessionalData', null, event)"><span class="glyphicon glyphicon-trash"></span></button>
              </div>
            </div>
          </fieldset>
        </div>

        <div id="dados-profissionais-rendas" class="row form-group" :class="{'form-invalid': $v.formData.ProfessionalData.hasAdditionalPayment.$error}">
          <div class="container-fluid">
            <div class="row">
              <fieldset class="col-xs-12">
                <legend>{{text.ProfessionalData.labels.hasAdditionalPayment}}</legend>
              </fieldset>
            </div>
            <div class="row" :class="{'form-invalid': $mq === 'mobile' || $mq === 'tablet'}">
              <div class="col-xs-12">
                <label for="dados-profissionais-hasAdditionalPayment-true" class="ficha-cadastral-inline-input"><input name="hasAdditionalPayment" type="radio" id="dados-profissionais-hasAdditionalPayment-true" v-model="formData.ProfessionalData.hasAdditionalPayment" :value="true" >{{text.ProfessionalData.labels.yes}}</label>
                <label for="dados-profissionais-hasAdditionalPayment-false" class="ficha-cadastral-inline-input"><input name="hasAdditionalPayment" type="radio" id="dados-profissionais-hasAdditionalPayment-false" v-model="formData.ProfessionalData.hasAdditionalPayment" :value="false"  @click="removeAllAdditionalPayment">{{text.ProfessionalData.labels.no}}</label>
              </div>
            </div>
            <div class="row" v-if="formData.ProfessionalData.hasAdditionalPayment">
              <div class="col-xs-6 col-sm-7 col-md-9 col-lg-7 form-group" :class="{'form-invalid': $v.formData.ProfessionalData.incomes.$error}">
                <p v-if="$mq == 'desktop' || $mq == 'bigScreen'"></p>
                <br v-if="$mq == 'desktop' || $mq == 'bigScreen'">
                <label for="dados-profissionais-rent" class="ficha-cadastral-inline-input"><input id="dados-profissionais-rent" name="dados-profissionais-incomes" value="1" v-model="formData.ProfessionalData.incomes" type="checkbox"  @click="event => formAutoSave('ProfessionalData', 'ProfessionalData', null, event)">{{text.ProfessionalData.labels.rent}}</label>
                <label for="dados-profissionais-retirement" class="ficha-cadastral-inline-input"><input id="dados-profissionais-retirement" value="2" v-model="formData.ProfessionalData.incomes" type="checkbox" name="dados-profissionais-incomes"  @click="event => formAutoSave('ProfessionalData', 'ProfessionalData', null, event)">{{text.ProfessionalData.labels.retirement}}</label>
                <label for="dados-profissionais-pension" class="ficha-cadastral-inline-input"><input id="dados-profissionais-pension" value="3" v-model="formData.ProfessionalData.incomes" type="checkbox" name="dados-profissionais-incomes" @click="event => formAutoSave('ProfessionalData', 'ProfessionalData', null, event)">{{text.ProfessionalData.labels.pension}}</label>
                <label for="dados-profissionais-proLabore" class="ficha-cadastral-inline-input"><input id="dados-profissionais-proLabore" value="4" v-model="formData.ProfessionalData.incomes" type="checkbox" name="dados-profissionais-incomes"  @click="event => formAutoSave('ProfessionalData', 'ProfessionalData', null, event)">{{text.ProfessionalData.labels.proLabore}}</label>
                <label for="dados-profissionais-commission" class="ficha-cadastral-inline-input"><input id="dados-profissionais-commission" value="5" v-model="formData.ProfessionalData.incomes" type="checkbox" name="dados-profissionais-incomes"  @click="event => formAutoSave('ProfessionalData', 'ProfessionalData', null, event)">{{text.ProfessionalData.labels.commission}}</label>
                <label for="dados-profissionais-other" class="ficha-cadastral-inline-input"><input id="dados-profissionais-other" value="6" v-model="formData.ProfessionalData.incomes" type="checkbox" name="dados-profissionais-incomes" @click="event => formAutoSave('ProfessionalData', 'ProfessionalData', null, event)">{{text.ProfessionalData.labels.other}}</label>
              </div>
              <div class="col-xs-6 col-sm-5 col-md-3 col-lg-2" :class="{'form-invalid': $v.formData.ProfessionalData.valuesIncome.$error}">
                <label for="">{{text.ProfessionalData.labels.value}}</label>
                <Money type="text" v-bind="controls.money" v-model="formData.ProfessionalData.valuesIncome"  @blur.native="event => formAutoSave('ProfessionalData', 'ProfessionalData', null, event)"></Money>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="panel-footer row">
        <span>{{text.camposObrigatorios.texto}}</span>
      </div>

    </section>

    <section id="dados-bancarios" class="panel panel-default container-fluid">

      <div class="panel-heading row">
        <p class="col-xs-10 col-sm-11">{{text.BankingReferences.title}}</p>
      </div>

      <div class="panel-body row">
        <div id="dados-bancarios-info" class="row form-group">

          <div class="col-xs-12" v-for="(bank, index) in formData.BankingReferences" :key="index" :class="{'form-section': ($mq === 'mobile' || $mq === 'tablet' || $mq === 'laptop') && formData.BankingReferences.length > 1 && index !== formData.BankingReferences.length - 1}">
            <div class="container-fluid">

              <div class="row">

                <!-- <p>{{bank}}</p> -->
                <!-- <p>{{$v.formData.BankingReferences.$each[index]}}</p> -->

                <div class="col-xs-6 col-md-4" :class="{'form-invalid': $v.formData.BankingReferences.$each[index].bankName.$error}">
                  <label for="dados-bancarios-bank">{{text.BankingReferences.labels.bank}}</label>
                  <input type="text" id="dados-bancarios-bank" v-model="bank.bankName" disabled>
                  <div class="tooltip-campo-vazio alert alert-danger" v-if="!bank.bankName" ><span class='glyphicon glyphicon-remove' aria-hidden='true' @click="msgHidden($event)" :class="{tooltipHidden: isActive}"></span>{{text.campoObrigatorioVazio.texto}}</div>
                </div>

                <div class="col-xs-4 col-md-2" :class="{'form-invalid': $v.formData.BankingReferences.$each[index].agency.$error}">
                  <label for="dados-bancarios-agency">{{text.BankingReferences.labels.agency}}</label>
                  <input type="text" id="dados-bancarios-agency" v-model="bank.agency" disabled>
                  <div class="tooltip-campo-vazio alert alert-danger" v-if="!bank.agency" ><span class='glyphicon glyphicon-remove' aria-hidden='true' @click="msgHidden($event)" :class="{tooltipHidden: isActive}"></span>{{text.campoObrigatorioVazio.texto}}</div>
                </div>

                <div class="col-xs-2 col-md-1" :class="{'form-invalid': $v.formData.BankingReferences.$each[index].agencyCV.$error}">
                  <label for="dados-bancarios-digit">{{text.BankingReferences.labels.digit}}</label>
                  <input id="dados-bancarios-digit" type="number" v-model="bank.agencyCV" disabled>
                </div>

                <div class="col-xs-4 col-md-2" :class="{'form-invalid': $v.formData.BankingReferences.$each[index].account.$error}">
                  <label for="dados-bancarios-account">{{text.BankingReferences.labels.account}}</label>
                  <input type="text" id="dados-bancarios-account" v-model="bank.account" disabled>
                  <div class="tooltip-campo-vazio alert alert-danger" v-if="!bank.account" ><span class='glyphicon glyphicon-remove' aria-hidden='true' @click="msgHidden($event)" :class="{tooltipHidden: isActive}"></span>{{text.campoObrigatorioVazio.texto}}</div>
                </div>

                <div class="col-xs-2 col-md-1" :class="{'form-invalid': $v.formData.BankingReferences.$each[index].accountCV.$error}">
                  <label for="dados-bancarios-digit">{{text.BankingReferences.labels.digit}}</label>
                  <input id="dados-bancarios-digit" type="number" v-model="bank.accountCV" disabled>
                </div>

                <div class="col-xs-6 col-md-2" :class="{'form-invalid': $v.formData.BankingReferences.$each[index].accountSince.$error}">
                  <label for="dados-bancarios-account_since">{{text.BankingReferences.labels.account_since}}</label>
                  <date-picker id="dados-bancarios-account_since" :lang="'pt-br'" :type="'month'" :format="'MM/YYYY'" v-mask="'##/####'" v-model="bank.accountSince" :not-after="new Date()" @focusout.native="event => formAutoSave('BankingReferences', 'BankingReferences', null, event)"></date-picker>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

      <div class="panel-footer row">
        <span>{{text.camposObrigatorios.texto}}</span>
      </div>

    </section>

    <section id="referencias-comerciais" class="panel panel-default container-fluid">

      <div class="panel-heading row">
        <p class="col-xs-10 col-sm-11">{{text.BusinessReferences.title}}</p>
      </div>

      <div class="panel-body row">
        <div id="referencias-comerciais-info" class="row form-group">

          <div class="col-xs-12" v-for="(ref, index) in formData.BusinessReferences" :key="index" :class="{'form-section': ($mq === 'mobile' || $mq === 'tablet' || $mq === 'laptop') && formData.BusinessReferences.length > 1 && index !== formData.BusinessReferences.length - 1}">

            <div class="container-fluid">

              <div class="row form-group">

                <div :class="{
                  'form-invalid': $v.formData.BusinessReferences.$each[index].companyName.$error,
                  'col-xs-12 col-md-7 col-lg-5': formData.BusinessReferences.length <= 1,
                  'col-xs-12 col-md-4 col-lg-5': formData.BusinessReferences.length > 1 && index === formData.BusinessReferences.length - 1,
                  'col-xs-12 col-md-5 col-lg-7': formData.BusinessReferences.length > 1 && index !== formData.BusinessReferences.length - 1
                  }">
                  <label for="referencias-comerciais-companyName">{{text.BusinessReferences.labels.fullName}}</label>
                  <input type="text" id="referencias-comerciais-companyName" v-model="ref.companyName" @blur="event => formAutoSave('BusinessReferences', 'BusinessReferences', null, event)" :maxlength="controls.maxInputText">
                </div>

                <div :class="{
                  'form-invalid': $v.formData.BusinessReferences.$each[index].kinship.$error,
                  'col-xs-5 col-md-3': formData.BusinessReferences.length <= 1,
                  'col-xs-12 col-sm-4 col-md-3': formData.BusinessReferences.length > 1 && index === formData.BusinessReferences.length - 1,
                  'col-xs-12 col-sm-5 col-md-3 col-lg-2': formData.BusinessReferences.length > 1 && index !== formData.BusinessReferences.length - 1
                  }">
                  <label for="referencias-comerciais-kinship">{{text.BusinessReferences.labels.kinship}}</label>
                  <input type="text" id="referencias-comerciais-kinship" v-model="ref.kinship" @blur="event => formAutoSave('BusinessReferences', 'BusinessReferences', null, event)" :maxlength="controls.maxInputText">
                </div>

                <div :class="{
                  'form-invalid': $v.formData.BusinessReferences.$each[index].phone.$error,
                  'col-xs-5 col-md-3': formData.BusinessReferences.length <= 1,
                  'col-xs-8 col-sm-4 col-md-3 col-lg-2': formData.BusinessReferences.length > 1 && index === formData.BusinessReferences.length - 1,
                  'col-xs-5 col-md-3 col-lg-2': formData.BusinessReferences.length > 1 && index !== formData.BusinessReferences.length - 1
                  }">
                  <label for="referencias-comerciais-phone">{{text.BusinessReferences.labels.phone}}</label>
                  <the-mask :mask="['(##) ####-####', '(##) #####-####']" :masked="true" id="referencias-comerciais-phone" v-model="ref.phone" @blur.native="event => formAutoSave('BusinessReferences', 'BusinessReferences', null, event)"></the-mask>
                </div>

                <div class="col-xs-2 col-md-1" v-if="index === formData.BusinessReferences.length - 1">
                  <label>&nbsp;</label>
                  <button class="addInfoButton" @click="addComercialReference(index)"><span class="glyphicon glyphicon-plus" ></span></button>
                </div>

                <div class="col-xs-2 col-md-1" v-if="formData.BusinessReferences.length > 1">
                  <label>&nbsp;</label>
                  <button class="deleteInfoButton" @click="removeComercialReference(index)"><span class="glyphicon glyphicon-trash"></span></button>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>

    </section>

    <section id="dados-patrimoniais" class="panel panel-default container-fluid">

      <div class="panel-heading row">
        <p class="col-xs-10 col-sm-11">{{text.dadosPatrimoniais.title}}</p>
      </div>

      <div class="panel-body row">
        <div id="dados-patrimoniais-info" class="row form-group">
          <div class="container-fluid">
            <div class="row">
                <fieldset class="col-xs-12">
                <legend>{{text.dadosPatrimoniais.labels.realEstate}}</legend>
                </fieldset>
            </div>

            <fieldset class="container-fluid">
              <div class="row form-group" v-for="(item, index) in formData.dadosPatrimoniais.realEstate" :key="index">

                <div :class="{
                  'form-invalid': $v.formData.dadosPatrimoniais.realEstate.$each[index].description.$error,
                  'col-xs-12 col-md-5 col-lg-7': (formData.dadosPatrimoniais.realEstate.length > 1 && index !== formData.dadosPatrimoniais.realEstate.length - 1) || formData.dadosPatrimoniais.realEstate.length <= 1,
                  'col-xs-12 col-md-4 col-lg-6': formData.dadosPatrimoniais.realEstate.length > 1 && index === formData.dadosPatrimoniais.realEstate.length - 1}
                  ">
                  <label :for="`dados-patrimoniais-realEstate-${index + 1}-description`">{{text.dadosPatrimoniais.labels.description}}</label>
                  <input type="text" :id="`dados-patrimoniais-realEstate-${index + 1}-description`" v-model="item.description" @blur="event => formAutoSave('EquityImmovable', 'dadosPatrimoniais','realEstate', event)" :maxlength="controls.maxInputText">
                </div>

                <div class="col-xs-12 col-md-3 col-lg-2" :class="{
                  'form-invalid': $v.formData.dadosPatrimoniais.realEstate.$each[index].location.$error,
                  'col-sm-6': (formData.dadosPatrimoniais.realEstate.length > 1 && index !== formData.dadosPatrimoniais.realEstate.length - 1) || formData.dadosPatrimoniais.realEstate.length <= 1,
                  'col-sm-4': formData.dadosPatrimoniais.realEstate.length > 1 && index === formData.dadosPatrimoniais.realEstate.length - 1,
                  }">
                  <label :for="`dados-patrimoniais-realEstate-${index + 1}-location`">{{text.dadosPatrimoniais.labels.location}}</label>
                  <input type="text" :id="`dados-patrimoniais-realEstate-${index + 1}-location`" v-model="item.location" @blur="event => formAutoSave('EquityImmovable', 'dadosPatrimoniais','realEstate', event)" :maxlength="controls.maxInputText">
                </div>
                  <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2" :class="{'form-invalid': $v.formData.dadosPatrimoniais.realEstate.$each[index].value.$error}">
                    <label :for="`dados-patrimoniais-realEstate-${index + 1}-value`">{{text.dadosPatrimoniais.labels.value}}</label>
                    <Money type="text" :id="`dados-patrimoniais-realEstate-${index + 1}-value`" v-bind="controls.money" v-model="item.value" @blur.native="event => formAutoSave('EquityImmovable', 'dadosPatrimoniais','realEstate', event)"></Money>
                  </div>

                <div class="col-xs-2 col-md-1" v-if="index === formData.dadosPatrimoniais.realEstate.length - 1">
                  <label>&nbsp;</label>
                  <button class="addInfoButton" @click="addRealEstate(index)"><span class="glyphicon glyphicon-plus"></span></button>
                </div>

                <div class="col-xs-2 col-md-1" v-if="formData.dadosPatrimoniais.realEstate.length > 1">
                  <label>&nbsp;</label>
                  <button class="deleteInfoButton" @click="removeRealEstate(index)"><span class="glyphicon glyphicon-trash"></span></button>
                </div>

              </div>
            </fieldset>

            <div class="row">
                <fieldset class="col-xs-12">
                <legend>{{text.dadosPatrimoniais.labels.movables}}</legend>
                </fieldset>
            </div>

            <fieldset class="container-fluid" v-for="(item, index) in formData.dadosPatrimoniais.movables" :key="index">
              <div class="row form-group">
                  <div :class="{
                    'form-invalid': $v.formData.dadosPatrimoniais.movables.$each[index].movableSpecieID.$error,
                    'col-xs-12 col-md-3 col-lg-4': (formData.dadosPatrimoniais.movables.length > 1 && index === formData.dadosPatrimoniais.movables.length - 1),
                    'col-xs-12 col-md-4 col-lg-5': (formData.dadosPatrimoniais.movables.length > 1 && index !== formData.dadosPatrimoniais.movables.length - 1) || formData.dadosPatrimoniais.movables.length <= 1
                    }">
                    <label :for="`dados-patrimoniais-movables-${index + 1}-type`">{{text.dadosPatrimoniais.labels.type}}</label>

                    <select :id="`dados-patrimoniais-movables-${index + 1}-type`" v-model="item.movableSpecieID" @blur="event => formAutoSave('EquityMovable', 'dadosPatrimoniais', 'movables', event)">
                      <option :value="null">{{text.dadosPatrimoniais.placeholders.movables}}</option>
                      <option v-for="(item, index) in content.movableSpecie" :key="index" :value="item.id">{{item.description}}</option>
                    </select>
                  </div>
                  <div class="col-xs-6 col-sm-6 col-md-3 col-lg-2" :class="{'form-invalid': $v.formData.dadosPatrimoniais.movables.$each[index].markModel.$error}">
                    <label :for="`dados-patrimoniais-movables-${index + 1}-brand`">{{text.dadosPatrimoniais.labels.brand}}</label>
                    <input type="text" :id="`dados-patrimoniais-movables-${index + 1}-brand`" v-model="item.markModel" @blur="event => formAutoSave('EquityMovable', 'dadosPatrimoniais', 'movables', event)" :maxlength="controls.maxInputText">
                  </div>
                  <div class="col-xs-6 col-sm-6 col-md-2 col-lg-2" :class="{'form-invalid': $v.formData.dadosPatrimoniais.movables.$each[index].year.$error}">
                    <label :for="`dados-patrimoniais-movables-${index + 1}-year`">{{text.dadosPatrimoniais.labels.year}}</label>
                    <input :id="`dados-patrimoniais-movables-${index + 1}-year`" type="number" v-model="item.year" v-mask="'####'" @blur="event => formAutoSave('EquityMovable', 'dadosPatrimoniais', 'movables', event)">
                  </div>
                  <div class="col-xs-6 col-md-2 col-lg-2" :class="{
                    'form-invalid': $v.formData.dadosPatrimoniais.movables.$each[index].value.$error,
                    'col-sm-10': (formData.dadosPatrimoniais.movables.length > 1 && index !== formData.dadosPatrimoniais.movables.length - 1) || formData.dadosPatrimoniais.movables.length <= 1,
                    'col-sm-8': formData.dadosPatrimoniais.movables.length > 1 && index === formData.dadosPatrimoniais.movables.length - 1
                    }">
                    <label :for="`dados-patrimoniais-movables-${index + 1}-value`">{{text.dadosPatrimoniais.labels.value}}</label>
                    <Money type="text" :id="`dados-patrimoniais-movables-${index + 1}-value`" v-bind="controls.money" v-model="item.value" @blur.native="event => formAutoSave('EquityMovable', 'dadosPatrimoniais', 'movables', event)"></Money>
                  </div>
                  <div class="col-xs-6 col-sm-2 col-md-1" v-if="index === formData.dadosPatrimoniais.movables.length - 1">
                    <label>&nbsp;</label>
                    <button class="addInfoButton" @click="addMovables(index)"><span class="glyphicon glyphicon-plus"></span></button>
                  </div>
                  <div class="col-xs-6 col-sm-2 col-md-1" v-if="formData.dadosPatrimoniais.movables.length > 1">
                    <label>&nbsp;</label>
                    <button class="deleteInfoButton" @click="removeMovables(index)"><span class="glyphicon glyphicon-trash"></span></button>
                  </div>
                </div>
            </fieldset>
          </div>
        </div>
      </div>

    </section>
    <section id="dados-PEP" class="panel panel-default container-fluid">
      <div class="panel-heading row" @click="() => $v.formData.pep.$touch()">
        <p class="col-xs-12">{{text.pep.title}}</p>
      </div>
      <div class="panel-body row" :class="{'form-invalid': $v.controls.hasPEP.$error}">

        <!-- <p>{{formData.pep}}</p> -->
        <!-- <p>{{controls.hasPEP}}</p> -->

        <fieldset>
          <legend>{{text.pep.description}}</legend>
        </fieldset>

        <div class="row form-section" >
          <div class="col-xs-6 col-md-4 col-lg-3">
            <label for="hasPEP-true">
              <input type="radio" name="pep-hasPEP" id="hasPEP-true" :value="true" v-model="controls.hasPEP" @click="addNewPepElement">
              {{text.pep.labels.yes}}
            </label>
          </div>
          <div class="col-xs-6 col-md-4 col-lg-2">
            <label for="hasPEP-false">
              <input type="radio" name="pep-hasPEP" id="hasPEP-false" :value="false" v-model="controls.hasPEP" @click="removeAllPepElement">
              {{text.pep.labels.no}}
            </label>
          </div>
        </div>

        <div class="row" v-if="controls.hasPEP" v-for="(item, index) in $v.formData.pep.$each.$iter" :key="index" :class="{'form-section': formData.pep.length > 1 && index != formData.pep.length > 1 }">

          <!-- <p>{{item}}</p> -->

          <div class="col-xs-6 col-sm-4 col-md-4 col-lg-3" :class="{'form-invalid': item.cpf.$error}">
            <label :for="`pep-${index}-cpf`">{{text.pep.labels.cpf}}</label>
            <the-mask :id="`pep-${index}-cpf`" :mask="'###.###.###-##'" v-model="item.cpf.$model" @blur.native="event => formAutoSave('Pep', 'pep', null, event)"></the-mask>
          </div>

          <div class="col-xs-6 col-sm-8 col-md-8 col-lg-7" :class="{'form-invalid': item.name.$error}">
            <label :for="`pep-${index}-name`">{{text.pep.labels.name}}</label>
            <input :id="`pep-${index}-name`" type="text" v-model="item.name.$model" @blur="event => formAutoSave('Pep', 'pep', null, event)" :maxlength="controls.maxInputText">
          </div>

          <div class="col-xs-6 col-sm-4 col-md-4 col-lg-2" :class="{'form-invalid': item.warrantIni.$error}">
            <label :for="`pep-${index}-warrantIni`">{{text.pep.labels.startMandate}}</label>
            <the-mask :id="`pep-${index}-warrantIni`" :mask="'####'" v-model.number="item.warrantIni.$model" @blur.native="event => formAutoSave('Pep', 'pep', null, event)"></the-mask>
          </div>

          <div class="col-xs-6 col-sm-4 col-md-4 col-lg-2" :class="{'form-invalid': item.warrantEnd.$error}">
            <label :for="`pep-${index}-expirationDate`">{{text.pep.labels.expirationDate}}</label>
            <the-mask :id="`pep-${index}-expirationDate`" :mask="'####'" v-model.number="item.warrantEnd.$model" @blur.native="event => formAutoSave('Pep', 'pep', null, event)"></the-mask>
          </div>

          <div class="col-xs-6 col-sm-4 col-md-4" :class="{
            'form-invalid': item.degreeRelationship.$error,
            'col-lg-2': formData.pep.length > 1 && index == formData.pep.length - 1,
            'col-lg-3': (formData.pep.length > 1 && index != formData.pep.length - 1) ||formData.pep.length <= 1,
            }">
            <label :for="`pep-${index}-kinship`">{{text.pep.labels.kinship}}</label>
            <input :id="`pep-${index}-kinship`" type="text" v-model="item.degreeRelationship.$model" @blur="event => formAutoSave('Pep', 'pep', null, event)" :maxlength="controls.maxInputText">
          </div>

          <div class="col-xs-6 col-lg-3" :class="{
            'form-invalid': item.organ.$error,
            'col-sm-4 col-md-5': formData.pep.length > 1 && index == formData.pep.length - 1,
            'col-sm-5 col-md-6': formData.pep.length <= 1 || (formData.pep.length > 1 && index != formData.pep.length - 1),
            }">
            <label :for="`pep-${index}-organ`">{{text.pep.labels.organ}}</label>
            <input :id="`pep-${index}-organ`" type="text" v-model="item.organ.$model" @blur="event => formAutoSave('Pep', 'pep', null, event)" :maxlength="controls.maxInputText">
          </div>

          <div class="col-xs-6 col-md-5 col-lg-3" :class="{
            'form-invalid': item.function.$error,
            'col-sm-4': formData.pep.length > 1 && index == formData.pep.length - 1,
            'col-sm-5': formData.pep.length <= 1 || (formData.pep.length > 1 && index != formData.pep.length - 1),
            }">
            <label :for="`pep-${index}-position`">{{text.pep.labels.position}}</label>
            <input :id="`pep-${index}-position`" type="text" v-model="item.function.$model" @blur="event => formAutoSave('Pep', 'pep', null, event)" :maxlength="controls.maxInputText">
          </div>

          <div class="col-xs-2 col-md-1" v-if="index == formData.pep.length - 1">
            <label>&nbsp;</label>
            <button @click="addPepElement(index)"><span class="glyphicon glyphicon-plus"></span></button>
          </div>
          <div class="col-xs-2 col-md-1" v-if="formData.pep.length > 1">
            <label>&nbsp;</label>
            <button @click="removePepElement(index)"><span class="glyphicon glyphicon-trash"></span></button>
          </div>

        </div>

      </div>
      <div class="panel-footer row">
        <span>{{text.camposObrigatorios.texto}}</span>
      </div>
    </section>

    <section class="container-fluid">
      <div class="row">
        <div class="col-xs-12">
          <button class="form-button pull-right" @click="validateForm">{{text.saveButton}}</button>
        </div>
      </div>
    </section>

  </form>

  <div class="page-emprestimos page-emprestimos-loading-gif" v-else>
    <img src="~assets/img/loading.gif" alt="Carregando...">
  </div>
</template>

<script>
/* eslint-disable func-names */
/* eslint-disable vue/valid-v-bind */
/* eslint-disable no-irregular-whitespace */

import { TheMask, mask } from "vue-the-mask";
import DatePicker from "vue2-datepicker";
import {
  required, minLength, email, numeric, alphaNum, requiredIf, requiredUnless, helpers, between, minValue, decimal, maxLength,
} from "vuelidate/lib/validators";
import { Money } from "v-money";
import { resolve, reject } from "q";
import { phoneRegexMobile, phoneRegexFixo } from "~/utils/regex.utils";

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
const validatePhone = phoneRegexMobile;

const validatePhoneFixo = phoneRegexFixo;

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
      text: {
        ficha_title: "Cadastro - Pessoa Física",
        nextButton: "Próximo",
        saveButton: "Salvar",
        RegistrationData: {
          title: "Dados Cadastrais",
          labels: {
            cpf: "CPF:*",
            fullName: "Nome (sem abreviação):*",
            rg: "Nº identidade:*",
            simpleName: "Nome abreviado:",
            identificationDocumentType: "Tipo documento de Identificação:*",
            documentState: "UF:*",
            organEmitter: "Órgão emissor:*",
            emissionDate: "Data de emissão:*",
            degreeEducationID: "Grau de instrução:",
            nameMother: "Nome da mãe:*",
            nameFather: "Nome do pai:",
            maritalStatusID: "Estado civil:*",
            genderID: "Sexo:*",
            dependents: "Nº de dependentes:",
            birthDate: "Data de nascimento:*",
            placeOfBirth: "Natural de:*",
            phone: "Telefone:",
            phoneCel: "Celular:*",
            email: "E-mail:*",
          },
          placeholders: {
            idState: "UF",
            degreeEducationID: "Grau de instrução",
            maritalStatusID: "Estado civil",
            genderID: "Sexo",
          },
        },
        Spouse: {
          title: "Cônjuge/Companheiro",
          // labels: {
          //   fullName: "Nome (sem abreviação):*",
          //   documentNumberCPF: "CPF:*",
          //   placeOfBirth: "Natural de:",
          //   documentNumberRG: "Nº Identidade:",
          //   identificationDocumentType: "Tipo documento de Identificação:",
          //   idState: "UF:",
          //   organEmitter: "Órgão emissor:",
          //   emissionDate: "Data de emissão:",
          //   birthdate: "Data de nascimento:*",
          //   nameMother: "Nome da mãe:*",
          //   nameFather: "Nome do pai:",
          //   addressPostalCode: "CEP:",
          //   addressStreetName: "Endereço:",
          //   addressNumber: "Nº:",
          //   addressAdditionalData: "Complemento:",
          //   addressNeighborhood: "Bairro:",
          //   addressStateID: "UF:",
          //   cityName: "Cidade:",
          //   telOffice: "Telefone:",
          //   nameEmployer: "Nome do empregador:",
          //   departament: "Departamento:",
          //   profession: "Profissão:",
          //   jobRole: "Cargo:",
          //   admissionDate: "Data admissão:",
          // },
          labels: {
            fullName: "Nome (sem abreviação):",
            documentNumberCPF: "CPF:",
            placeOfBirth: "Natural de:",
            documentNumberRG: "Nº Identidade:",
            identificationDocumentType: "Tipo documento de Identificação:",
            idState: "UF:",
            organEmitter: "Órgão emissor:",
            emissionDate: "Data de emissão:",
            birthdate: "Data de nascimento:",
            nameMother: "Nome da mãe:",
            nameFather: "Nome do pai:",
            addressPostalCode: "CEP:",
            addressStreetName: "Endereço:",
            addressNumber: "Nº:",
            addressAdditionalData: "Complemento:",
            addressNeighborhood: "Bairro:",
            addressStateID: "UF:",
            cityName: "Cidade:",
            telOffice: "Telefone:",
            nameEmployer: "Nome do empregador:",
            departament: "Departamento:",
            profession: "Profissão:",
            jobRole: "Cargo:",
            admissionDate: "Data admissão:",
          },
          placeholders: {
            idState: "UF",
            cityName: "Cidade",
            departament: "Departamento:",
            profession: "Profissão",
            function: "Cargo",
          },
        },
        Address: {
          title: "Residência",
          labels: {
            addressPostalCode: "CEP:*",
            addressStreetName: "Endereço:*",
            addressNumber: "Nº:*",
            addressAdditionalData: "Complemento:",
            addressNeighborhood: "Bairro:*",
            addressStateID: "UF:*",
            cityName: "Cidade:*",
            referencePoint: "Ponto de referência:",
            homeTypeID: "Residência:*",
            homeTypeID_owner: "Própria",
            homeTypeID_rent: "Alugado",
            otherHome: "Outro:",
            houseTime: "Tempo de residência:*",
            phone: "Telefone:",
          },
          placeholders: {
            addressStateID: "UF",
            cityName: "Cidade",
            houseTimeID: "Tempo de residência:",
          },
        },
        ProfessionalData: {
          title: "Dados profissionais",
          labels: {
            fullName: "Razão Social*:",
            numberDocumentCNPJ: "CNPJ:",
            capitalParticipation: "Participação (%):",
            addressPostalCode: "CEP:*",
            addressStreetName: "Endereço:*",
            addressNumber: "Nº:*",
            addressAdditionalData: "Complemento:",
            addressNeighborhood: "Bairro:*",
            uf: "UF:*",
            cityName: "Cidade:*",
            phone: "Telefone:",
            salary: "Remuneração/Faturamento:*",
            profession: "Profissão:",
            function: "Cargo:",
            admissionDate: "Data admissão:",
            hasAdditionalCompany: "Sócio/Proprietário em outra empresa?*",
            hasAdditionalPayment: "Outras Rendas*",
            yes: "Sim",
            no: "Não",
            rent: "Aluguel",
            retirement: "Aposentadoria",
            pension: "Pensão",
            proLabore: "Pro-labore",
            commission: "Comissão",
            other: "Outros",
            value: "Valor (R$)*",
          },
          placeholders: {
            profession: "Profissão:",
            uf: "UF:",
            cityName: "Cidade:",
            function: "Cargo:",
          },
        },
        BankingReferences: {
          title: "Dados bancários",
          labels: {
            bank: "Banco",
            agency: "Agência",
            digit: "Dígito",
            account: "Conta corrente",
            account_since: "Conta desde*",
          },
          placeholders: {
            account_since: "Conta desde",
          },
        },
        BusinessReferences: {
          title: "Referências comerciais/pessoais",
          labels: {
            fullName: "Nome",
            phone: "Telefone",
            kinship: "Grau de parentesco",
          },
        },
        dadosPatrimoniais: {
          title: "Dados patrimoniais",
          labels: {
            description: "Descrição",
            location: "Localização",
            value: "Valor",
            realEstate: "Bens imóveis",
            movables: "Bens móveis",
            type: "Espécie",
            brand: "Marca/Modelo",
            year: "Ano",
          },
          placeholders: {
            movables: "Tipo de bem",
          },
        },
        pep: {
          title: "Declaração Obrigatória Pessoa Exposta Politicamente*",
          description: "PEP (Pessoa Exposta Politicamente) são pessoas que desempenham ou tenham desempenhado nos últimos cinco anos, no Brasil ou o exterior, cargos, empregos e/ou funções públicas relevantes, assim como seus representantes, familiares, e outras pessoas de seu relacionamento próximo. Conforme definido pela Circular nº 3.339 de 22/12/2016 do Banco Central do Brasil, as instituições financeiras, devem observar procedimentos a respeito das movimentações financeira das chamadas PEP. Possui representantes, sócios, administradores, familiares ou outras pessoas de seu relacionamento que desempenham ou desempenharam nos últimos 05 anos, no Brasil ou em países, territórios e dependências estrangeiras, cargos, empregos ou funções públicas relevantes?",
          labels: {
            yes: "Sim (Relacione abaixo)",
            no: "Não",
            cpf: "CPF",
            name: "Nome",
            startMandate: "Início mandato",
            expirationDate: "Fim mandato",
            kinship: "Grau relacionamento",
            organ: "Órgão",
            position: "Cargo",
          },
        },
        camposObrigatorios: {
          texto: "* Campos de preenchimento obrigatório",
        },
        campoObrigatorioVazio: {
          texto: "Caso o campo acima esteja vazio, entrar em contato com a Listo SCD.",
        },
      },
      controls: {
        currentPanel: "RegistrationData",
        maxInputText: 255,
        loading: false,
        money: {
          decimal: ",",
          thousands: ".",
          prefix: "R$ ",
          suffix: " ",
          precision: 2,
          masked: false,
        },
        formBlockTypes: [],
        RegistrationData: {
          saving: false,
          openPanel: true,
          nameApi: "RegistrationData",
        },
        Spouse: {
          editAddress: false,
          loadingCep: false,
          openPanel: true,
          nameApi: "Spouse",
        },
        Address: {
          editAddress: false,
          loadingCep: false,
          openPanel: true,
          nameApi: "Address",
        },
        ProfessionalData: {
          editAddress: false,
          loadingCep: false,
          openPanel: true,
          nameApi: "ProfessionalData",
        },
        BankingReferences: {
          editAddress: false,
          loadingCep: false,
          openPanel: true,
          nameApi: "BankingReferences",
        },
        BusinessReferences: {
          editAddress: false,
          loadingCep: false,
          testAddCommercialReference: false,
          nameApi: "BusinessReferences",
        },
        dadosPatrimoniais: {
          editAddress: false,
          loadingCep: false,
          realEstate: {
            nameApi: "RealEstateData",
            testAddRealEstate: false,
          },
          movables: {
            nameApi: "MovablesData",
            testAddMovables: false,
          },
        },
        pep: {
          editAddress: false,
          loadingCep: false,
          nameApi: "Pep",
        },
        hasPEP: null,
      },
      formData: {
        RegistrationData: {
          birthDate: null,
          cpf: null,
          degreeEducationID: null,
          dependents: null,
          documentState: null,
          email: null,
          emissionDate: null,
          fullName: null,
          genderIDID: null,
          maritalStatusIDID: null,
          nameFather: null,
          nameMother: null,
          organEmitter: null,
          phone: null,
          phoneCel: null,
          placeOfBirth: null,
          registrationFormID: null,
          rg: null,
          simpleName: null,
          identificationDocumentType: null,
        },
        Spouse: {
          registrationFormId: null,
          spouseId: null,
          fullName: null,
          identificationDocumentType: null,
          documentNumberRG: null,
          documentNumberCPF: null,
          placeOfBirth: null,
          documentState: null,
          organEmitter: null,
          emissionDate: null,
          nameMother: null,
          nameFather: null,
          birthdate: null,
          nameEmployer: null,
          addressPostalCode: null,
          addressNumber: null,
          addressAdditionalData: null,
          addressStreetName: null,
          addressNeighborhood: null,
          cityName: null,
          uf: null,
          departament: null,
          profession: null,
          jobRole: null,
          telOffice: null,
          admissionDate: null,
        },
        Address: {
          addressPostalCode: null,
          addressStreetName: null,
          addressNumber: null,
          addressAdditionalData: null,
          addressNeighborhood: null,
          addressStateID: null,
          cityName: null,
          referencePoint: null,
          homeTypeID: null,
          houseTime: null,
          houseTimeID: null,
          phone: null,
          AddressFormID: null,
        },
        ProfessionalData: {
          fullName: null,
          numberDocumentCNPJ: null,
          capitalParticipation: null,
          addressPostalCode: null,
          addressStreetName: null,
          addressNumber: null,
          addressAdditionalData: null,
          addressNeighborhood: null,
          uf: null,
          cityName: null,
          phone: null,
          salary: 0,
          professionID: null,
          functionID: null,
          admissionDate: null,
          hasAdditionalCompany: null,
          hasAdditionalPayment: null,
          valuesIncome: 0,
          shareholders: [
            {
              numberDocumentCNPJ: null,
              fullName: null,
              admissionDate: null,
              capitalParticipation: null,
            },
          ],
          incomes: [],
          ProfessionalDataFormID: null,
        },
        BankingReferences: [
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
        BusinessReferences: [
          {
            companyName: null,
            kinship: null,
            phone: null,
          },
        ],
        dadosPatrimoniais: {
          realEstate: [
            {
              description: null,
              location: null,
              value: 0,
            },
          ],
          movables: [
            {
              movableSpecieID: null,
              markModel: null,
              year: null,
              value: 0,
            },
          ],
        },
        pep: [
          /* {
            cpf: null,
            name: null,
            warrantIni: null,
            warrantEnd: null,
            degreeRelationship: null,
            function: null,
            organ: null,
            isPEP: true,
          }, */
        ],
      },
      content: {
        states: [],
        educationDegrees: [],
        functions: [],
        genderIDs: [],
        homeTypes: [],
        houseTimes: [],
        incomeTypes: [],
        maritalStatusID: [],
        professions: [],
        movableSpecie: [],
        Spouse: {
          cities: [],
        },
        Address: {
          cities: [],
        },
        ProfessionalData: {
          cities: [],
        },
        BankingReferences: {
          cities: [],
        },
        BusinessReferences: {
          cities: [],
        },
        dadosPatrimoniais: {
          cities: [],
        },
        pep: {
          cities: [],
        },
      },
      isActive: false,
    };
  },
  methods: {
    addAdditionalCompany() {
      const self = this;

      self.formData.ProfessionalData.shareholders.push({
        cnpj: null,
        companyName: null,
        createDate: null,
        capitalParticipation: null,
      });
    },
    removeAdditionalCompany(index) {
      const self = this;
      self.formData.ProfessionalData.shareholders.splice(index, 1);
    },
    acceptAdditionalCompany() {
      const self = this;
      self.formData.ProfessionalData.shareholders.push({
        cnpj: null,
        companyName: null,
        createDate: null,
        capitalParticipation: null,
      });
    },
    removeAllAdditionalCompany() {
      const self = this;
      self.formData.ProfessionalData.shareholders = [];
      // self.formAutoSave("ProfessionalData", "ProfessionalData");
    },
    removeAllAdditionalPayment() {
      const self = this;
      self.formData.ProfessionalData.incomes = [];
      self.formData.ProfessionalData.valuesIncome = 0;
      // self.formAutoSave("ProfessionalData", "ProfessionalData");
    },
    removeAdditionalPayment() {
      const self = this;
      // self.formAutoSave("ProfessionalData", "ProfessionalData");
      return true;
    },
    addComercialReference(index) {
      const self = this;

      self.controls.BusinessReferences.testAddCommercialReference = true;

      self.$v.formData.BusinessReferences.$each[index].$touch();

      if (!self.$v.formData.BusinessReferences.$each[index].$invalid) {
        self.$v.formData.BusinessReferences.$each[index].$reset();
        self.formData.BusinessReferences.push({
          fullName: null,
          kinship: null,
          phone: null,
        });
      }
    },
    checkComercialReference() {
      const self = this;
      self.controls.BusinessReferences.testAddCommercialReference = true;
      const index = self.formData.BusinessReferences.length - 1;
      self.$v.formData.BusinessReferences.$each[index].$touch();
    },
    removeComercialReference(index) {
      const self = this;
      self.formData.BusinessReferences.splice(index, 1);
    },
    addRealEstate(index) {
      const self = this;
      self.controls.dadosPatrimoniais.realEstate.testAddRealEstate = true;
      self.$v.formData.dadosPatrimoniais.realEstate.$each[index].$touch();
      if (!self.$v.formData.dadosPatrimoniais.realEstate.$each[index].$invalid) {
        self.controls.dadosPatrimoniais.realEstate.testAddRealEstate = true;
        self.$v.formData.dadosPatrimoniais.realEstate.$each[index].$reset();
        self.formData.dadosPatrimoniais.realEstate.push({
          description: null,
          location: null,
          value: 0,
        });
      }
    },
    checkRealEstate() {
      const self = this;
      const index = self.dadosPatrimoniais.realEstate.length - 1;
      self.controls.dadosPatrimoniais.realEstate.testAddRealEstate = true;
      self.$v.formData.dadosPatrimoniais.realEstate.$each[index].$touch();
    },
    removeRealEstate(index) {
      const self = this;
      self.formData.dadosPatrimoniais.realEstate.splice(index, 1);
      // self.formAutoSave("EquityImmovable", "dadosPatrimoniais", "realEstate");
    },
    addMovables(index) {
      const self = this;

      self.$v.formData.dadosPatrimoniais.movables.$each[index].$touch();

      self.controls.dadosPatrimoniais.movables.testAddMovables = true;

      if (!self.$v.formData.dadosPatrimoniais.movables.$each[index].$invalid) {
        self.controls.dadosPatrimoniais.movables.testAddMovables = false;
        self.$v.formData.dadosPatrimoniais.movables.$each[index].$reset();
        self.formData.dadosPatrimoniais.movables.push({
          description: null,
          brand: null,
          year: null,
          value: 0,
        });
      }
    },
    removeMovables(index) {
      const self = this;
      self.formData.dadosPatrimoniais.movables.splice(index, 1);
      // self.formAutoSave("EquityMovable", "dadosPatrimoniais", "movables");
    },
    addPepElement(index) {
      const self = this;

      self.$v.formData.pep.$each[index].$touch();

      if (!self.$v.formData.pep.$each[index].$invalid) {
        self.formData.pep.push({
          cpf: null,
          name: null,
          warrantIni: null,
          warrantEnd: null,
          degreeRelationship: null,
          function: null,
          organ: null,
          isPEP: true,
        });
      }
    },
    removePepElement(index) {
      const self = this;
      self.formData.pep.splice(index, 1);
    },
    removeAllPepElement() {
      const self = this;

      if (self.formData.pep.length) {
        self.formData.pep = [];
        // self.formAutoSave("Pep", "pep");
      }
    },
    addNewPepElement() {
      const self = this;

      if (!self.formData.pep.length) {
        self.formData.pep.push({
          cpf: null,
          name: null,
          warrantIni: null,
          warrantEnd: null,
          degreeRelationship: null,
          function: null,
          organ: null,
          isPEP: true,
        });
      }
    },
    loadBlockTypes() {
      const self = this;
      self.$axios.get(`${process.env.API_CUSTOMER_DATA}/AutoSaveForm/formBlockTypes`).then((response) => {
        response.data.map((r) => {
          self.controls.formBlockTypes.push(r);
        });
      }).catch(() => false);
    },
    saveBlock(blockID, obj) {
      return new Promise((resolve, reject) => {
        const self = this;

        const objSave = {
          formBlockType: blockID,
          information: obj,
        };

        // console.log("objSave", objSave);
        self.$axios.post(`${process.env.API_CUSTOMER_DATA}/AutoSaveForm`, objSave).then((response) => {
          resolve();
        }).catch(() => { reject(); return false; });
      });
    },
    spouse_loadCities(state) {
      const self = this;

      self.controls.Spouse.loadingCep = true;

      const stateID = self.content.states.filter(st => st.uf == state)[0].stateID;

      self.$axios.get(`${process.env.API_CEP}/ZipCode/state/${stateID}/cities`).then((response) => {
        self.content.Spouse.cities = response.data;
        self.controls.Spouse.loadingCep = false;
      }).catch(() => {
        self.controls.Spouse.loadingCep = false;
        return false;
      });
    },
    Address_loadCities(state) {
      const self = this;

      self.controls.Address.loadingCep = true;

      const stateID = self.content.states.filter(st => st.uf == state)[0].stateID;

      self.$axios.get(`${process.env.API_CEP}/ZipCode/state/${stateID}/cities`).then((response) => {
        self.content.Address.cities = response.data;
        self.controls.Address.loadingCep = false;
      }).catch(() => {
        self.controls.Address.loadingCep = false;
        return false;
      });
    },
    ProfessionalData_loadCities(state) {
      const self = this;
      self.controls.ProfessionalData.loadingCep = true;

      const stateID = self.content.states.filter(st => st.uf == state)[0].stateID;

      self.$axios.get(`${process.env.API_CEP}/ZipCode/state/${stateID}/cities`).then((response) => {
        self.content.ProfessionalData.cities = response.data;
        self.controls.ProfessionalData.loadingCep = false;
      }).catch(() => {
        self.controls.ProfessionalData.loadingCep = false;
        return false;
      });
    },
    formAutoSave(block, array, data, event) {
      return new Promise((resolve, reject) => {
        // console.log("event", event);
        const self = this;
        let blockTypeID = null;

        // console.log("block", block);
        // console.log("array", array);
        // console.log("data", data);
        // console.log("event", event);

        self.controls.formBlockTypes.map((bl) => {
          if (bl.description == block) {
            blockTypeID = bl.id;
          }
        });

        if (event) {
          if (event.target.value !== null && event.target.value !== "" && event.target.value !== "ignore") {
            setTimeout(() => {
              if (data) {
                self.saveBlock(blockTypeID, JSON.stringify(self.formData[array][data]))
                  .then(() => { resolve(); }).catch(() => { reject(); });
              } else {
                self.saveBlock(blockTypeID, JSON.stringify(self.formData[array]))
                  .then(() => { resolve(); }).catch(() => { reject(); });
              }
            }, 200);
          }
        } else {
          setTimeout(() => {
            if (data) {
              self.saveBlock(blockTypeID, JSON.stringify(self.formData[array][data]))
                .then(() => { resolve(); }).catch(() => { reject(); });
            } else {
              self.saveBlock(blockTypeID, JSON.stringify(self.formData[array]))
                .then(() => { resolve(); }).catch(() => { reject(); });
            }
          }, 200);
        }
      });
    },
    // eslint-disable-next-line object-shorthand
    msgHidden(event) {
      // this.isActive = !this.isActive;
      event.target.parentElement.remove();
    },
    validateForm() {
      const self = this;

      // self.controls.BusinessReferences.testAddCommercialReference = true;
      // self.controls.dadosPatrimoniais.realEstate.testAddRealEstate = true;
      // self.controls.dadosPatrimoniais.movables.testAddMovables = true;

      self.checkComercialReference();

      self.$v.formData.dadosPatrimoniais.movables.$each.$touch();
      // self.$v.formData.BusinessReferences.$each.$touch();
      self.$v.formData.dadosPatrimoniais.realEstate.$each.$touch();
      self.$v.formData.$touch();
      self.$v.controls.hasPEP.$touch();

      // console.log("[Validate Form] self.$v.formData.$invalid: ", self.$v.formData.$invalid);
      // console.log("[Validate Form] self.$v.formData: ", self.$v.formData);
      // console.log("[Validate Form] self.$v.controls.hasPEP.$invalid: ", self.$v.controls.hasPEP.$invalid);
      // console.log("[Validate Form] self.$v.controls.hasPEP: ", self.$v.controls.hasPEP);

      if (!self.$v.formData.$invalid && !self.$v.controls.hasPEP.$invalid) {
        self.controls.loading = true;

        const promises = [];
        promises.push(self.formAutoSave("RegistrationData", "RegistrationData"));
        promises.push(self.formAutoSave("Spouse", "Spouse"));
        promises.push(self.formAutoSave("Address", "Address"));
        promises.push(self.formAutoSave("ProfessionalData", "ProfessionalData"));
        promises.push(self.formAutoSave("BankingReferences", "BankingReferences"));
        promises.push(self.formAutoSave("BusinessReferences", "BusinessReferences"));
        promises.push(self.formAutoSave("EquityImmovable", "dadosPatrimoniais", "realEstate"));
        promises.push(self.formAutoSave("EquityMovable", "dadosPatrimoniais", "movables"));
        promises.push(self.formAutoSave("Pep", "pep"));

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
              api: "emprestimoerro",
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

          if (invalid) {
            invalid.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }
        }, 100);
      }
    },
  },
  validations() {
    const self = this;

    return {
      formData: {
        RegistrationData: {
          cpf: {
            required,
            validateCPF,
            tamanhoMax: maxLength(14),
          },
          fullName: {
            alpha,
            required,
            tamanhoMax: maxLength(100),
          },
          simpleName: {
            alpha,
            tamanhoMax: maxLength(35),
          },
          rg: {
            required,
            alphaNum,
            tamanhoMax: maxLength(14),
          },
          organEmitter: {
            required,
            alpha,
            tamanhoMax: maxLength(20),
          },
          identificationDocumentType: {
            required,
            alpha,
          },
          documentState: {
            required,
          },
          emissionDate: {
            required,
          },
          maritalStatusID: {
            required,
          },
          nameMother: {
            required,
            alpha,
            tamanhoMax: maxLength(200),
          },
          nameFather: {
            alpha,
            tamanhoMax: maxLength(200),
          },
          genderID: {
            required,
          },
          birthDate: {
            required,
          },
          placeOfBirth: {
            required,
            tamanhoMax: maxLength(100),
          },
          phone: {
          // required,
            validatePhoneFixo,
            phoneLength: minLength(10),
          },
          phoneCel: {
            required,
            validatePhone,
            mobileLength: minLength(11),
          },
          email: {
            email,
            required,
            tamanhoMax: maxLength(100),
          },
          dependents: {
            maximoDependents(value) {
              if (value !== null && value !== undefined && value >= 0 && value <= 255) {
                return true;
              }
              return false;
            },
          },
        },
        Spouse: {
          // fullName: {
          //   required: requiredIf(() => self.formData.RegistrationData.maritalStatusID == 2 || self.formData.RegistrationData.maritalStatusID == 6),
          //   alpha,
          // },
          // documentNumberCPF: {
          //   required: requiredIf(() => self.formData.RegistrationData.maritalStatusID == 2 || self.formData.RegistrationData.maritalStatusID == 6),
          //   validateCPF,
          // },
          // placeOfBirth: {
          //   required: requiredIf(() => self.formData.RegistrationData.maritalStatusID == 2 || self.formData.RegistrationData.maritalStatusID == 6),
          // },
          // documentNumberRG: {
          // required: requiredIf(() => self.formData.RegistrationData.maritalStatusID == 2 || self.formData.RegistrationData.maritalStatusID == 6),
          // alphaNum,
          // },
          // identificationDocumentType: {
          // required: requiredIf(() => self.formData.RegistrationData.maritalStatusID == 2 || self.formData.RegistrationData.maritalStatusID == 6),
          // alpha,
          // },
          // documentState: {
          //   required: requiredIf(() => self.formData.RegistrationData.maritalStatusID == 2 || self.formData.RegistrationData.maritalStatusID == 6),
          // },
          // organEmitter: {
          //   required: requiredIf(() => self.formData.RegistrationData.maritalStatusID == 2 || self.formData.RegistrationData.maritalStatusID == 6),
          //   alpha,
          //   tamanhoMax: maxLength(5),
          // },
          // emissionDate: {
          //   required: requiredIf(() => self.formData.RegistrationData.maritalStatusID == 2 || self.formData.RegistrationData.maritalStatusID == 6),
          // },
          // birthdate: {
          //   required: requiredIf(() => self.formData.RegistrationData.maritalStatusID == 2 || self.formData.RegistrationData.maritalStatusID == 6),
          // },
          // nameMother: {
          //   required: requiredIf(() => self.formData.RegistrationData.maritalStatusID == 2 || self.formData.RegistrationData.maritalStatusID == 6),
          //   alpha,
          // },
          // addressPostalCode: {
          //   required: requiredIf(() => self.formData.RegistrationData.maritalStatusID == 2 || self.formData.RegistrationData.maritalStatusID == 6),
          //   postalCodeLength: minLength(8),
          // },
          // addressStreetName: {
          //   required: requiredIf(() => self.formData.RegistrationData.maritalStatusID == 2 || self.formData.RegistrationData.maritalStatusID == 6),
          // },
          // addressNumber: {
          //   validate(value) {
          //     if (self.formData.RegistrationData.maritalStatusID == 2 || self.formData.RegistrationData.maritalStatusID == 6) {
          //       if (value) {
          //         return value >= 0;
          //       }
          //       return false;
          //     }
          //     return true;
          //   },
          // },
          // addressNeighborhood: {
          //   required: requiredIf(() => self.formData.RegistrationData.maritalStatusID == 2 || self.formData.RegistrationData.maritalStatusID == 6),
          // },
          // uf: {
          //   // required: requiredIf(() => self.formData.RegistrationData.maritalStatusID == 2 || self.formData.RegistrationData.maritalStatusID == 6),
          //   validate(value) {
          //     if (self.formData.RegistrationData.maritalStatusID == 2 || self.formData.RegistrationData.maritalStatusID == 6) {
          //       if (value) {
          //         return true;
          //       }
          //       return false;
          //     }
          //     return true;
          //   },
          // },
          // cityName: {
          //   required: requiredIf(() => self.formData.RegistrationData.maritalStatusID == 2 || self.formData.RegistrationData.maritalStatusID == 6),
          // },
          // telOffice: {
          // required: requiredIf(() => self.formData.RegistrationData.maritalStatusID == 2 || self.formData.RegistrationData.maritalStatusID == 6),
          // validatePhone,
          // phoneLength: minLength(10),
          // },
          // departament: {
          //   required: requiredIf(() => {
          //     if (self.formData.Spouse.nameEmployer) {
          //       if (self.formData.Spouse.nameEmployer !== null && self.formData.Spouse.nameEmployer.length > 0) {
          //         return true;
          //       }
          //     }
          //     return false;
          //   }),
          // },
          // profession: {
          //   required: requiredIf(() => {
          //     if (self.formData.Spouse.nameEmployer) {
          //       if (self.formData.Spouse.nameEmployer !== null && self.formData.Spouse.nameEmployer.length > 0) {
          //         return true;
          //       }
          //     }
          //     return false;
          //   }),
          // },
          // jobRole: {
          //   required: requiredIf(() => {
          //     if (self.formData.Spouse.nameEmployer) {
          //       if (self.formData.Spouse.nameEmployer !== null && self.formData.Spouse.nameEmployer.length > 0) {
          //         return true;
          //       }
          //     }
          //     return false;
          //   }),
          // },
          // admissionDate: {
          //   required: requiredIf(() => {
          //     if (self.formData.Spouse.nameEmployer) {
          //       if (self.formData.Spouse.nameEmployer !== null && self.formData.Spouse.nameEmployer.length > 0) {
          //         return true;
          //       }
          //     }
          //     return false;
          //   }),
          // },
        },
        Address: {
          addressPostalCode: {
            required,
            postalCodeLength: minLength(8),
          },
          addressStreetName: {
            required: requiredIf(() => self.controls.Address.editAddress),
          },
          addressNeighborhood: {
            required: requiredIf(() => self.controls.Address.editAddress),
          },
          uf: {
            required: requiredIf(() => self.controls.Address.editAddress),
          },
          cityName: {
            required: requiredIf(() => self.controls.Address.editAddress),
          },
          addressNumber: {
            validate(value) {
              if (value) {
                return value >= 0;
              }
              return false;
            },
          },
          // referencePoint: {
          //   tamanhoMax: maxLength(100),
          //   reference: requiredIf(() => !self.$v.formData.Address.addressPostalCode.$invalid && (self.formData.Address.addressNumber === null || self.formData.Address.addressNumber === "")),
          // },
          homeTypeID: {
            required,
            validate(value) {
              if (value) {
                return value > 0 ? true : false;
              }
              return false;
            },
          },
          otherHome: {
            required: requiredIf(() => self.formData.Address.homeTypeID == 5),
          },
          houseTimeID: {
            // required,
          },
          phone: {
            // required,
            validatePhone,
            phoneLength: minLength(10),
          },
        },
        pep: {
          $each: {
            cpf: {
              required: requiredIf(() => self.controls.hasPEP),
              validateCPF,
            },
            name: {
              required: requiredIf(() => self.controls.hasPEP),
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
              required: requiredIf(() => self.controls.hasPEP),
            },
            function: {
              required: requiredIf(() => self.controls.hasPEP),
            },
            organ: {
              required: requiredIf(() => self.controls.hasPEP),
            },
          },
        },
        ProfessionalData: {
          fullName: {
            required,
          },
          // numberDocumentCNPJ: {
          //   // required,
          //   validateCNPJ,
          // },
          // capitalParticipation: {
          //   decimal,
          //   maximum: between(0, 100),
          // },
          addressPostalCode: {
            required,
            numeric,
            postalCodeLength: minLength(8),
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
          // addressAdditionalData: {
          //   required,
          // },
          uf: {
            required,
          },
          cityName: {
            required,
          },
          phone: {
            required,
            validatePhone,
            phoneLength: minLength(10),
          },
          salary: {
            required,
            valor(value) {
              return value > 0 ? true : false;
            },
          },
          // professionID: {
          //   required,
          // },
          // functionID: {
          //   required,
          // },
          // admissionDate: {
          //   required,
          // },
          shareholders: {
            $each: {
              numberDocumentCNPJ: {
                required: requiredIf(() => self.formData.ProfessionalData.hasAdditionalCompany == true && self.formData.ProfessionalData.hasAdditionalCompany !== null),
                validateCNPJ,
              },
              fullName: {
                required: requiredIf(() => self.formData.ProfessionalData.hasAdditionalCompany == true && self.formData.ProfessionalData.hasAdditionalCompany !== null),
              },
              admissionDate: {
                required: requiredIf(() => self.formData.ProfessionalData.hasAdditionalCompany == true && self.formData.ProfessionalData.hasAdditionalCompany !== null),
              },
              capitalParticipation: {
                validateAdditionalCompanyShare(value) {
                  if (self.formData.ProfessionalData.hasAdditionalCompany == true && self.formData.ProfessionalData.hasAdditionalCompany !== null) {
                    return value !== null && value !== "" && value >= 0.01 && value <= 100;
                  }
                  return false;
                },
              },
            },
          },
          valuesIncome: {
            validateAdditionalPaymentValue(value) {
              if (self.formData.ProfessionalData.hasAdditionalPayment) {
                if (value && value > 0) {
                  return true;
                }
                return false;
              }
              return true;
            },
          },
          hasAdditionalCompany: {
            required,
          },
          hasAdditionalPayment: {
            required,
          },
          incomes: {
            required: requiredIf(() => self.formData.ProfessionalData.hasAdditionalPayment),
          },
        },
        BankingReferences: {
          $each: {
            bankName: {
              required,
            },
            agency: {
              required,
              numeric,
            },
            agencyCV: {
              tamanhoMax: maxLength(1),
              alphaNum,
            },
            account: {
              required,
              numeric,
            },
            accountCV: {
              tamanhoMax: maxLength(1),
              alphaNum,
            },
            accountSince: {
              required,
            },
          },
        },
        BusinessReferences: {
          $each: {
            companyName: {
              required: requiredIf(() => self.controls.BusinessReferences.testAddCommercialReference),
              alpha,
            },
            phone: {
              required: requiredIf(() => self.controls.BusinessReferences.testAddCommercialReference),
              validatePhone,
            },
            kinship: {
              required: requiredIf(() => self.controls.BusinessReferences.testAddCommercialReference),
              alpha,
            },
          },
        },
        dadosPatrimoniais: {
          realEstate: {
            $each: {
              description: {
                required: requiredIf(() => self.controls.dadosPatrimoniais.realEstate.testAddRealEstate),
              },
              location: {
                required: requiredIf(() => self.controls.dadosPatrimoniais.realEstate.testAddRealEstate),
              },
              value: {
                required,
                valor(value) {
                  if (self.controls.dadosPatrimoniais.realEstate.testAddRealEstate) {
                    return value > 0 ? true : false;
                  }
                  return true;
                },
              },
            },
          },
          movables: {
            $each: {
              movableSpecieID: {
                required: requiredIf(() => self.controls.dadosPatrimoniais.movables.testAddMovables),
              },
              markModel: {
                required: requiredIf(() => self.controls.dadosPatrimoniais.movables.testAddMovables),
              },
              year: {
                anoValido(value) {
                  const date = new Date();
                  const ano = date.getFullYear();

                  if (self.controls.dadosPatrimoniais.movables.testAddMovables) {
                    return value <= ano && value > 0 ? true : false;
                  }
                  return true;
                },
              },
              value: {
                valor(value) {
                  if (self.controls.dadosPatrimoniais.movables.testAddMovables) {
                    return value > 0 ? true : false;
                  } return true;
                },
              },
            },
          },
        },
      },
      controls: {
        hasPEP: {
          required,
        },
      },
    };
  },
  created() {
    const self = this;

    self.controls.loading = true;

    // console.log("Started loading lists");

    self.loadBlockTypes();

    const getStates = new Promise((resolve, reject) => {
      self.$axios.get(`${process.env.API_CEP}/ZipCode/country/1/states`).then((response) => {
        self.content.states = response.data;
        resolve(response);
      }).catch((error) => {
        reject(error);
        return false;
      });
    });

    const getEducationDegrees = new Promise((resolve, reject) => {
      self.$axios.get(`${process.env.API_CUSTOMER_DATA}/DegreeEducation`).then((response) => {
        self.content.educationDegrees = response.data;
        resolve(response);
      }).catch((error) => {
        reject(error);
        return false;
      });
    });

    const getFunctions = new Promise((resolve, reject) => {
      self.$axios.get(`${process.env.API_CUSTOMER_DATA}/Function`).then((response) => {
        self.content.functions = response.data;
        resolve(response);
      }).catch((error) => {
        reject(error);
        return false;
      });
    });

    const getgenderIDs = new Promise((resolve, reject) => {
      self.$axios.get(`${process.env.API_CUSTOMER_DATA}/Gender`).then((response) => {
        self.content.genderIDs = response.data;
        resolve(response);
      }).catch((error) => {
        reject(error);
        return false;
      });
    });

    const getHomeTypes = new Promise((resolve, reject) => {
      self.$axios.get(`${process.env.API_CUSTOMER_DATA}/HomeType`).then((response) => {
        self.content.homeTypes = response.data;
        resolve(response);
      }).catch((error) => {
        reject(error);
        return false;
      });
    });

    const getHouseTimes = new Promise((resolve, reject) => {
      self.$axios.get(`${process.env.API_CUSTOMER_DATA}/HouseTime`).then((response) => {
        self.content.houseTimes = response.data;
        resolve(response);
      }).catch((error) => {
        reject(error);
        return false;
      });
    });

    const getIncomeTypes = new Promise((resolve, reject) => {
      self.$axios.get(`${process.env.API_CUSTOMER_DATA}/IncomeType`).then((response) => {
        self.content.incomeTypes = response.data;
        resolve(response);
      }).catch((error) => {
        reject(error);
        return false;
      });
    });

    const getMaritalStatusID = new Promise((resolve, reject) => {
      self.$axios.get(`${process.env.API_CUSTOMER_DATA}/MaritalStatus`).then((response) => {
        self.content.maritalStatusID = response.data;
        resolve(response);
      }).catch((error) => {
        reject(error);
        return false;
      });
    });

    const getProfessionsList = new Promise((resolve, reject) => {
      self.$axios.get(`${process.env.API_CUSTOMER_DATA}/Profession/GetOccupations`).then((response) => {
        self.content.professions = response.data;
        resolve(response);
      }).catch((error) => {
        reject(error);
        return false;
      });
    });

    const getMovableSpecie = new Promise((resolve, reject) => {
      self.$axios.get(`${process.env.API_CUSTOMER_DATA}/Equity/MovableSpecie`).then((response) => {
        self.content.movableSpecie = response.data;
        resolve(response);
      }).catch((error) => {
        reject(error);
        return false;
      });
    });

    const getRegistrationData = new Promise((resolve, reject) => {
      self.$axios.get(`${process.env.API_CUSTOMER_DATA}/RegistrationData/pf`).then((response) => {
        // console.log("Registration Data\n", response.data);
        if (response.status == 200) {
          self.formData.RegistrationData = response.data;
        }
        // self.formAutoSave("RegistrationData", "RegistrationData");
        setTimeout(() => {
          resolve(response);
        }, 50);
      }).catch((error) => {
        reject(error);
        return false;
      });
    });

    const getAddress = new Promise((resolve, reject) => {
      self.$axios.get(`${process.env.API_CUSTOMER_DATA}/Address`).then((response) => {
        if (response.status == 200) {
          self.formData.Address = response.data;

          if (response.data.addressPostalCode) {
            response.data.addressPostalCode = response.data.addressPostalCode.replace("-", "");
            response.data.addressPostalCode = response.data.addressPostalCode.replace(" ", "");
          }
          // self.formAutoSave("Address", "Address");
        }
        setTimeout(() => {
          resolve(response);
        }, 50);
        // console.log("Registration Data\n", response.data);
      }).catch((error) => {
        reject(error);
        return false;
      });
    });

    const getProfession = new Promise((resolve, reject) => {
      self.$axios.get(`${process.env.API_CUSTOMER_DATA}/Profession`).then((response) => {
        if (response.status == 200) {
          self.formData.ProfessionalData = response.data;
          if (response.data.shareholders.length > 0) {
            self.formData.ProfessionalData.hasAdditionalCompany = true;
          }
          if (response.data.incomes.length > 0) {
            self.formData.ProfessionalData.hasAdditionalPayment = true;
          }
          if (response.data.addressPostalCode) {
            response.data.addressPostalCode = response.data.addressPostalCode.replace("-", "");
            response.data.addressPostalCode = response.data.addressPostalCode.replace(" ", "");
          }
        }
        setTimeout(() => {
          resolve(response);
        }, 50);
      }).catch((error) => {
        reject(error);
        return false;
      });
    });

    const getBankReferences = new Promise((resolve, reject) => {
      self.$axios.get(`${process.env.API_CUSTOMER_DATA}/BankReference`).then((response) => {
        if (response.status == 200) {
          self.formData.BankingReferences = response.data;

          self.formData.BankingReferences.map((bank) => {
            bank.accountCV = bank.accountCV.trim();
            bank.agencyCV = bank.agencyCV.trim();
          });
        }
        setTimeout(() => {
          resolve(response);
        }, 50);
      }).catch((error) => {
        reject(error);
        return false;
      });
    });

    const getCommercialReferences = new Promise((resolve, reject) => {
      self.$axios.get(`${process.env.API_CUSTOMER_DATA}/CommercialReference`).then((response) => {
        // console.log("Registration Data\n", response.data);
        if (response.status == 200) {
          self.formData.BusinessReferences = response.data;
        }
        setTimeout(() => {
          resolve(response);
        }, 50);
      }).catch((error) => {
        reject(error);
        return false;
      });
    });

    const getImmovables = new Promise((resolve, reject) => {
      self.$axios.get(`${process.env.API_CUSTOMER_DATA}/Equity/Immovable`).then((response) => {
        // console.log("Registration Data\n", response.data);
        if (response.status == 200) {
          self.formData.dadosPatrimoniais.realEstate = response.data;
        }
        setTimeout(() => {
          resolve(response);
        }, 50);
      }).catch((error) => {
        reject(error);
        return false;
      });
    });

    const getMovables = new Promise((resolve, reject) => {
      self.$axios.get(`${process.env.API_CUSTOMER_DATA}/Equity/Movable`).then((response) => {
        // self.controls.loading = false;
        // console.log("Registration Data\n", response.data);
        if (response.status == 200) {
          self.formData.dadosPatrimoniais.movables = response.data;
        }
        setTimeout(() => {
          resolve(response);
        }, 50);
      }).catch((error) => {
        reject(error);
        return false;
      });
    });

    const getDeclarationPEP = new Promise((resolve, reject) => {
      self.$axios.get(`${process.env.API_CUSTOMER_DATA}/DeclarationPEP`).then((response) => {
        if (response.status == 200 && response.data.length) {
          self.formData.pep = response.data;
        }
        setTimeout(() => {
          resolve(response);
        }, 50);
      }).catch((error) => { reject(error); return false; });
    });

    const getSpouse = new Promise((resolve, reject) => {
      self.$axios.get(`${process.env.API_CUSTOMER_DATA}/SpousePF`).then((response) => {
        if (response.status == 200) {
          if (response.data.length) {
            self.formData.Spouse = response.data;
            if (response.data.addressPostalCode) {
              response.data.addressPostalCode = response.data.addressPostalCode.replace("-", "");
              response.data.addressPostalCode = response.data.addressPostalCode.replace(" ", "");
            }
            self.formAutoSave("Spouse", "Spouse");
          }
        }
        setTimeout(() => {
          resolve(response);
          // console.log("PEP", self.formData.pep);
        }, 50);
      }).catch((error) => {
        reject(error);
        return false;
      });
    });

    Promise.all([
      getStates,
      getEducationDegrees,
      getFunctions,
      getgenderIDs,
      getHomeTypes,
      getHouseTimes,
      getIncomeTypes,
      getMaritalStatusID,
      getProfessionsList,
      getMovableSpecie,
      getRegistrationData,
      getAddress,
      getProfession,
      getBankReferences,
      getCommercialReferences,
      getImmovables,
      getMovables,
      getDeclarationPEP,
      getSpouse,
    ]).then(() => {
      self.controls.loading = false;
    }).catch(() => {
      self.controls.loading = false;
    });
  },
  watch: {
    "formData.RegistrationData.maritalStatusID": function (newValue, oldValue) {
      const self = this;
      // console.log("Watch maritalStatus", newValue);
      if (newValue) {
        if (newValue == 2 || newValue == 6) {
          self.$axios.get(`${process.env.API_CUSTOMER_DATA}/SpousePF`).then((response) => {
            self.controls.loading = false;

            if (response.status == 200) {
              self.formData.Spouse = response.data;
            }
            // console.log("Registration Data\n", response.data);
          }).catch(() => {
            self.controls.loading = false;
            return false;
          });
        }
      }
    },
    "formData.Spouse.addressPostalCode": function (newValue, oldValue) {
      const self = this;

      // console.log("New", newValue);
      // console.log("Old", oldValue);

      if (newValue) {
        if (newValue.length >= 8) {
          newValue = newValue.replace("-", "");
          newValue = newValue.replace(" ", "");
          self.controls.Spouse.loadingCep = true;
          self.$axios.get(`${process.env.API_CEP}/ZipCode/${newValue}`).then((response) => {
            // console.log("Buscar CEP", response.data);


            if (response.status == 200) {
              self.formData.Spouse.addressStateID = response.data.stateID;
              self.formData.Spouse.uf = response.data.state;
              self.formData.Spouse.cityName = response.data.city;
              self.formData.Spouse.addressStreetName = `${response.data.streetType} ${response.data.streetName}`;
              self.formData.Spouse.addressNeighborhood = response.data.neighborhood;

              self.$axios.get(`${process.env.API_CEP}/ZipCode/state/${response.data.stateID}/cities`).then((response) => {
                self.content.Spouse.cities = response.data;

                // console.log("Carrega lista de cidades do Spouse", self.content.Spouse.cities);

                self.controls.Spouse.editAddress = false;
                self.controls.Spouse.loadingCep = false;
              // eslint-disable-next-line no-console
              }).catch((err) => { console.log("Err:", err); return false; });
            } else {
              self.formData.Spouse.addressStateID = null;
              self.formData.Spouse.uf = null;
              self.formData.Spouse.cityName = null;
              self.formData.Spouse.addressStreetName = null;
              self.formData.Spouse.addressNeighborhood = null;
              self.content.Spouse.cities = [];

              self.controls.Spouse.editAddress = true;
              self.controls.Spouse.loadingCep = false;
            }
          }).catch((error) => {
            // console.log("Erro ao buscar CEP", error.response);
            self.formData.Spouse.addressStateID = null;
            self.formData.Spouse.uf = null;
            self.formData.Spouse.cityName = null;
            self.formData.Spouse.addressStreetName = null;
            self.formData.Spouse.addressNeighborhood = null;
            self.content.Spouse.cities = [];

            self.controls.Spouse.editAddress = true;
            self.controls.Spouse.loadingCep = false;
            return false;
          });
        }
      }
    },
    "formData.Address.addressPostalCode": function (newValue, oldValue) {
      const self = this;
      // console.log("New", newValue);
      // console.log("Old", oldValue);

      if (newValue) {
        if (newValue.length >= 8) {
          newValue = newValue.replace("-", "");
          newValue = newValue.replace(" ", "");
          self.controls.Address.loadingCep = true;
          self.$axios.get(`${process.env.API_CEP}/ZipCode/${newValue}`).then((response) => {
            // console.log("Buscar CEP", response.data);
            if (response.status == 200) {
              self.formData.Address.addressStateID = response.data.stateID;
              self.formData.Address.uf = response.data.state;
              self.formData.Address.cityName = response.data.city;
              self.formData.Address.addressStreetName = `${response.data.streetType} ${response.data.streetName}`;
              self.formData.Address.addressNeighborhood = response.data.neighborhood;

              self.$axios.get(`${process.env.API_CEP}/ZipCode/state/${response.data.stateID}/cities`).then((response) => {
                self.content.Address.cities = response.data;
                // console.log("Carrega lista de cidades do Spouse", self.content.Spouse.cities);
                self.controls.Address.editAddress = false;
                self.controls.Address.loadingCep = false;
              // eslint-disable-next-line no-console
              }).catch((err) => { console.log("Err:", err); return false; });
            } else {
              self.formData.Address.addressStateID = null;
              self.formData.Address.uf = null;
              self.formData.Address.cityName = null;
              self.formData.Address.addressStreetName = null;
              self.formData.Address.addressNeighborhood = null;
              self.content.Address.cities = [];

              self.controls.Address.editAddress = true;
              self.controls.Address.loadingCep = false;
            }
          }).catch((error) => {
            // console.log("Erro ao buscar CEP", error.response);
            self.formData.Address.addressStateID = null;
            self.formData.Address.uf = null;
            self.formData.Address.cityName = null;
            self.formData.Address.addressStreetName = null;
            self.formData.Address.addressNeighborhood = null;
            self.content.Address.cities = [];

            self.controls.Address.editAddress = true;
            self.controls.Address.loadingCep = false;
            return false;
          });
        }
      }
    },
    "formData.ProfessionalData.addressPostalCode": function (newValue, oldValue) {
      const self = this;

      // console.log("New", newValue);
      // console.log("Old", oldValue);
      if (newValue) {
        if (newValue.length >= 8) {
          newValue = newValue.replace("-", "");
          newValue = newValue.replace(" ", "");
          self.controls.ProfessionalData.loadingCep = true;
          self.$axios.get(`${process.env.API_CEP}/ZipCode/${newValue}`).then((response) => {
            // console.log("Buscar CEP", response.data);


            if (response.status == 200) {
              self.formData.ProfessionalData.addressStateID = response.data.stateID;
              self.formData.ProfessionalData.cityName = response.data.city;
              self.formData.ProfessionalData.addressStreetName = `${response.data.streetType} ${response.data.streetName}`;
              self.formData.ProfessionalData.addressNeighborhood = response.data.neighborhood;

              self.$axios.get(`${process.env.API_CEP}/ZipCode/state/${response.data.stateID}/cities`).then((response) => {
                self.content.ProfessionalData.cities = response.data;

                // console.log("Carrega lista de cidades do Spouse", self.content.Spouse.cities);

                self.controls.ProfessionalData.editAddress = false;
                self.controls.ProfessionalData.loadingCep = false;
              // eslint-disable-next-line no-console
              }).catch((err) => { console.log("Err:", err); return false; });
            } else {
              self.formData.ProfessionalData.addressStateID = null;
              self.formData.ProfessionalData.cityName = null;
              self.formData.ProfessionalData.addressStreetName = null;
              self.formData.ProfessionalData.addressNeighborhood = null;
              self.content.ProfessionalData.cities = [];

              self.controls.ProfessionalData.editAddress = true;
              self.controls.ProfessionalData.loadingCep = false;
            }
          }).catch((error) => {
            // console.log("Erro ao buscar CEP", error.response);
            self.formData.ProfessionalData.addressStateID = null;
            self.formData.ProfessionalData.cityName = null;
            self.formData.ProfessionalData.addressStreetName = null;
            self.formData.ProfessionalData.addressNeighborhood = null;
            self.content.ProfessionalData.cities = [];

            self.controls.ProfessionalData.editAddress = true;
            self.controls.ProfessionalData.loadingCep = false;
            return false;
          });
        }
      }
    },
    // eslint-disable-next-line func-names
    "formData.pep": function (newVal, oldVal) {
      const self = this;

      // console.log("Watch PEP", newVal, oldVal);

      if (newVal) {
        if (newVal.length > 0) {
          self.controls.hasPEP = true;
        } else {
          self.controls.hasPEP = false;
        }
      }
    },
    "$v.formData.Spouse.documentNumberCPF.$invalid": function (oldVal, newVal) {
      const self = this;

      // console.log("$v.formData.Spouse.documentNumberCPF: ", oldVal, newVal);

      if (newVal && !oldVal) {
        const blocoSpouse = document.querySelector("#Spouse .panel-body");
        // console.log(blocoSpouse);
        if (blocoSpouse) {
          blocoSpouse.classList.add("form-no-edit");

          self.$axios.get(`${process.env.API_CUSTOMER_DATA}/SpousePF/credilink/${self.formData.Spouse.documentNumberCPF}`).then((response) => {
            // console.log("[Spouse] Credilink: ", response);
            blocoSpouse.classList.remove("form-no-edit");
            self.formData.Spouse.fullName = response.data.fullName;
            self.formData.Spouse.birthdate = response.data.birthdate;
            self.formData.Spouse.nameMother = response.data.nameMother;
          })
            .catch((err) => { console.log("err: ", err); return false; });
        }
      }
    },
  },
};
</script>

<style lang='less'>
@import "~assets/main.less";
@import "~assets/vars.less";

.page-emprestimos {
  .ficha-cadastral {
    .addInfoButton, .deleteInfoButton {
        margin: 0;
        line-height: 0;
      }

    .panel.panel-default {
      user-select: none;
      .panel-toggle {
        cursor: pointer;
      }

      &.closed {
        .panel-body {
          display: none;
        }
      }

      &.inactive, &.disabled {
        .panel-heading {
          opacity: 0.5;
        }
      }

      &.disabled {
        pointer-events: none;
      }

    }

    .container-fluid {
      .panel-footer.row {
        padding: 15px;
      }
    }

    &-inline-input {
      margin: 0;
      margin-right: 16px;

      @media (max-width: @screen-xs-max) {
        margin-bottom: 10px;
        margin-right: 8px;
        width: 100%;
      }

      input {
        display: inline-block;
        width: unset;
        margin-right: 5px;

        &[type="text"] {
          margin-left: 10px;
          width: unset;
          display: inline-block;

          // @media (max-width: @screen-xs-max) {
          //   max-width: 100px;
          // }
          // @media (min-width: @screen-lg-min) {
          //   max-width: 150px;
          // }
        }
      }
    }

    button {
      margin: 0;
    }
  }
  &-loading-gif {
    img {
      display: block;
      margin: auto;
      height: 100px;
    }
  }
}

</style>
