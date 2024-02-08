<template>
  <div id="formMinhaContaListo" class="container-fluid">
    <form
      id="form-MinhaContaListo"
      class="row"
      v-on:submit.prevent
      @keypress.enter.prevent
      v-if="!controls.loading"
    >

      <div class="form-section">

        <fieldset id="container-afiliado" class="form-group row">

          <div id="container-documento" class="col-xs-6 col-lg-3">
            <label v-if="userData.affiliate.affiliationTypeID == 1" for="cpf">CPF</label>
            <the-mask
              v-if="userData.affiliate.affiliationTypeID == 1"
              :mask="'###.###.###-##'"
              name="cpf"
              id="cpf"
              type="text"
              :value="userData.affiliate.document"
              disabled
            />

            <label v-if="userData.affiliate.affiliationTypeID == 2" for="cnpj">CNPJ</label>
            <the-mask
              v-if="userData.affiliate.affiliationTypeID == 2"
              :mask="'##.###.###/####-##'"
              name="cnpj"
              id="cnpj"
              type="text"
              :value="userData.affiliate.document"
              disabled
            />
          </div>

          <div
            id="container-razaoSocial"
            class="col-xs-6 col-lg-5"
            :class="{'form-invalid': $v.userData.affiliate.fullName.$invalid && controls.invalidForm}"
          >
            <label v-if="userData.affiliate.affiliationTypeID == 1" for="nome">{{text.form_nome}}</label>
            <label v-else for="nome">{{text.form_razaoSocial}}</label>
            <input
              type="text"
              name="nome"
              id="nome"
              v-model="userData.affiliate.fullName"
              :disabled="userData.affiliate.affiliateStatusID !== 0"
              @input="controls.hasEditedAffiliate = true;"
            />
            <span v-if="$v.userData.affiliate.fullName.$error">Campo deve ter ao menos dois nomes</span>
          </div>

          <div
            id="container-nomeFantasia"
            class="col-xs-6 col-lg-4"
            :class="{'form-invalid': $v.userData.affiliate.simpleName.$invalid && controls.invalidForm}"
          >
            <label for="nome_fantasia">{{text.form_fantasia}}</label>
            <input
              type="text"
              name="nome_fantasia"
              id="nome_fantasia"
              v-model="userData.affiliate.simpleName"
              :disabled="userData.affiliate.affiliateStatusID !== 0"
              @input="controls.hasEditedAffiliate = true;"
            />
          </div>

          <div
            class="col-xs-6 col-lg-3"
            :class="{'form-invalid': $v.userData.affiliate.birthDate.$invalid && controls.invalidForm}"
          >
            <label
              v-if="userData.affiliate.affiliationTypeID == 1"
              for="birthDate"
            >{{text.form_datanascimento}}</label>
            <label v-else for="birthDate">{{text.form_datafundacao}}</label>
            <date-picker
              :not-before="new Date('1800-01-01')"
              id="birthDate"
              :disabled="userData.affiliate.affiliateStatusID !== 0"
              v-model.trim="$v.userData.affiliate.birthDate.$model"
              :lang="'pt-br'"
              :format="'DD/MM/YYYY'"
              v-mask="'##/##/####'"
              :not-after="notAfterBirthDate"
              @input.native="controls.hasEditedAffiliate = true;"
            ></date-picker>
          </div>

          <fieldset
            id="container-genero"
            class="col-xs-6 col-lg-3"
            v-if="userData.affiliate.affiliationTypeID == 1"
            :disabled="userData.affiliate.affiliateStatusID !== 0"
            :class="{'form-invalid': $v.userData.affiliate.genderID.$invalid && controls.invalidForm}"
          >
            <label for="genero">{{text.form_genero}}</label>
            <div>
              <label class="selectGender" for="feminino">
                <input
                  type="radio"
                  class="pull-left"
                  name="genero"
                  id="feminino"
                  value="1"
                  v-model="userData.affiliate.genderID"
                  :disabled="edicao"
                  @input="controls.hasEditedAffiliate = true;"
                />
                {{text.form_feminino}}
              </label>
              <label class="selectGender" for="masculino">
                <input
                  type="radio"
                  class="pull-left"
                  name="genero"
                  id="masculino"
                  value="2"
                  v-model="userData.affiliate.genderID"
                  :disabled="edicao"
                  @input="controls.hasEditedAffiliate = true;"
                />
                {{text.form_masculino}}
              </label>
            </div>
          </fieldset>
        </fieldset>
      </div>

      <div class="form-section">
        <fieldset
          id="container-cep"
          class="form-group row"
          :class="{'form-no-edit': controls.loadingCEP}"
        >
          <span class="form-invalid col-xs-12" v-if="userData.exchangeRequest.contact">
            <strong>{{text.solicitacoes_pendentes}}</strong>
          </span>

          <div
            class="col-xs-4 col-lg-3"
            :class="{'form-invalid': $v.userData.contact.$each[controls.currentContact].addressPostalCode.$invalid && controls.invalidForm}"
          >
            <label for="cep">{{text.form_cep}}</label>
            <the-mask
              id="cep"
              name="cep"
              type="text"
              :value="userData.contact[controls.currentContact].addressPostalCode"
              :mask="'#####-###'"
              @change.native="buscaCEP($event.target.value)"
              @input.native="updateCEP($event); controls.hasEditedAddress = true"
              :disabled="controls.loadingCEP || userData.affiliate.affiliateStatusID != 0"
            ></the-mask>
            <span
              class="form-invalid contactExchangeRequestText"
              v-if="userData.exchangeRequest.contact"
            >{{userData.exchangeRequest.contact.addressPostalCode}}</span>
          </div>

          <div
            class="col-xs-8 col-lg-7"
            :class="{'form-invalid': $v.userData.contact.$each[controls.currentContact].addressStreetName.$invalid && controls.invalidForm}"
          >
            <label for="endereco">{{text.form_endereco}}</label>
            <input
              type="text"
              name="endereco"
              id="endereco"
              v-model="userData.contact[controls.currentContact].addressStreetName"
              :disabled="controls.loadingCEP || controls.validCEP || userData.affiliate.affiliateStatusID != 0"
              @input="controls.hasEditedAddress = true"
            />
            <span
              class="form-invalid contactExchangeRequestText"
              v-if="userData.exchangeRequest.contact"
            >{{userData.exchangeRequest.contact.addressStreetName}}</span>
          </div>

          <div
            class="col-xs-3 col-lg-2"
            :class="{'form-invalid': $v.userData.contact.$each[controls.currentContact].addressNumber.$invalid && controls.invalidForm}"
          >
            <label for="numero">{{text.form_numero}}</label>
            <input
              type="number"
              name="numero"
              id="numero"
              v-model="userData.contact[controls.currentContact].addressNumber"
              :disabled="controls.loadingCEP || userData.contact[controls.currentContact].addressPostalCode == null || userData.affiliate.affiliateStatusID != 0"
              @input="controls.hasEditedAddress = true"
            />
            <span
              class="form-invalid contactExchangeRequestText"
              v-if="userData.exchangeRequest.contact"
            >{{userData.exchangeRequest.contact.addressNumber}}</span>
          </div>

          <div class="col-xs-3 col-lg-2">
            <label for="complemento">{{text.form_complemento}}</label>
            <input
              type="text"
              name="complemento"
              id="complemento"
              v-model="userData.contact[controls.currentContact].addressAdditionalData"
              :disabled="controls.loadingCEP || userData.contact[controls.currentContact].addressPostalCode == null || userData.affiliate.affiliateStatusID != 0"
              @input="controls.hasEditedAddress = true"
            />
            <span
              class="form-invalid contactExchangeRequestText"
              v-if="userData.exchangeRequest.contact"
            >{{userData.exchangeRequest.contact.addressAdditionalData}}</span>
          </div>

          <div
            class="col-xs-6 col-sm-6 col-lg-3"
            :class="{'form-invalid': $v.userData.contact.$each[controls.currentContact].addressNeighborhood.$invalid && controls.invalidForm}"
          >
            <label for="bairro">{{text.form_bairro}}</label>
            <input
              type="text"
              id="bairro"
              v-model="userData.contact[controls.currentContact].addressNeighborhood"
              :disabled="!controls.selectCities || controls.loadingCEP || userData.affiliate.affiliateStatusID != 0"
              @input="controls.hasEditedAddress = true"
            />
            <span
              class="form-invalid contactExchangeRequestText"
              v-if="userData.exchangeRequest.contact"
            >{{userData.exchangeRequest.contact.addressNeighborhood}}</span>
          </div>

          <div
            class="col-xs-4 col-lg-2"
            :class="{'form-invalid': $v.userData.contact.$each[controls.currentContact].uf.$invalid && controls.invalidForm}"
          >
            <label for="uf">{{text.form_uf}}</label>
            <select
              name="uf"
              id="uf"
              v-model.trim="userData.contact[controls.currentContact].uf"
              @change="updateCitiesList($event.target.value); controls.hasEditedAddress = true"
              :disabled="!controls.selectCities || controls.loadingCEP || userData.affiliate.affiliateStatusID != 0"
            >
              <option value="disabled" disabled hidden>{{text.label_estado}}</option>
              <option
                v-for="(state, index) in content.states"
                :key="index"
                :value="state.uf"
              >{{ state.uf.trim() }}</option>
            </select>
            <span
              class="form-invalid contactExchangeRequestText"
              v-if="userData.exchangeRequest.contact"
            >{{userData.exchangeRequest.contact.uf}}</span>
          </div>

          <div
            class="col-xs-8 col-lg-5"
            :class="{'form-invalid': $v.userData.contact.$each[controls.currentContact].cityID.$invalid && controls.invalidForm}"
          >
            <label for="cidade">{{text.form_cidade}}</label>
            <select
              name="cidade"
              id="city"
              v-model="userData.contact[controls.currentContact].cityID"
              :disabled="!controls.selectCities || controls.loadingCEP || userData.affiliate.affiliateStatusID != 0"
              @input="controls.hasEditedAddress = true"
            >
              <option value="disabled" disabled hidden>{{text.label_cidade}}</option>
              <option
                v-for="(city, index) in content.cities"
                :key="index"
                :value="city.cityID"
              >{{ city.cityName }}</option>
            </select>
            <span
              class="form-invalid contactExchangeRequestText"
              v-if="userData.exchangeRequest.contact"
            >{{userData.exchangeRequest.contact.cityName}}</span>
          </div>
        </fieldset>
      </div>
      
      <div class="form-section telefone" v-if="!!userData.contact[controls.currentContact].phones">
        <fieldset id="container-telefones" class="row">
          <div
            v-for="(telefone,index) in userData.contact[controls.currentContact].phones"
            :key="index"
            class="telefone col-xs-6"
          >
            <fieldset class="row">
              <div class="col-xs-12">
                <label>{{text.form_telefone}} {{index + 1}}</label>
              </div>

              <div
                class="col-xs-12"
                :class="{'form-invalid' : ((telefone.attributeType == null || telefone.attributeType == '') && controls.invalidForm) || $v.userData.contact.$each[controls.currentContact].phones.$each[index].attributeType.$invalid}"
              >
                <select
                  class="tipotelefone"
                  name="tipo"
                  v-model="telefone.attributeType"
                  :disabled="(userData.contact[controls.currentContact].phones.length !== (index + 1)) || telefone.id != null"
                >
                  <option hidden disabled :value="null">{{text.placeholder_tipotelefone}}</option>
                  <option hidden disabled value="0">Não definido</option>
                  <option hidden disabled value="-1">Não definido</option>
                  <option hidden disabled value="-2">Não definido</option>
                  <option
                    v-for="(option,ind) in controls.tiposTelefone"
                    v-bind:value="option.value"
                    :key="ind"
                  >{{ option.text }}</option>
                </select>
              </div>

              <div
                :class="{
               'col-xs-6 col-lg-8': (userData.contact[controls.currentContact].phones.length > 1 && index == userData.contact[controls.currentContact].phones.length - 1),
               'col-xs-9 col-lg-10': !(userData.contact[controls.currentContact].phones.length > 1 && index == userData.contact[controls.currentContact].phones.length - 1),'form-invalid': $v.userData.contact.$each[controls.currentContact].phones.$each[index].value.$invalid
              }"
              >
                <the-mask
                  tabindex="2"
                  class="ntelefone"
                  :masked="true"
                  :mask="(telefone.attributeType == 3 || telefone.attributeType == 4) ? '(##) #####-####' : '(##) ####-####'"
                  :placeholder="text.placeholder_telefone"
                  type="text"
                  :name="telefone+index"
                  v-model="telefone.value"
                  :disabled="(userData.contact[controls.currentContact].phones.length !== (index + 1)) || telefone.id != null"
                />
              </div>

              <div
                v-if="userData.contact[controls.currentContact].phones.length > 1 && isUserOwner"
                class="editInfoButton col-xs-3 col-lg-2"
              >
                <button
                  class="deleteInfoButton no-mt"
                  @click="delArrayPosition(userData.contact[controls.currentContact].phones, index, 'affiliateContacts/addressAttribute' , telefone.id, 'delete', $event.target)"
                  v-if="!getReadOnly"
                >
                  <span class="glyphicon glyphicon-trash"></span>
                </button>
              </div>

              <div
                v-if="index == userData.contact[controls.currentContact].phones.length - 1 && isUserOwner"
                class="editInfoButton col-xs-3 col-lg-2"
              >
                <button
                  :disabled="($v.userData.contact.$each[controls.currentContact].phones.$each[index].value.$invalid) || !(index == userData.contact[controls.currentContact].phones.length - 1)"
                  class="addInfoButton"
                  @click="addArrayPosition(userData.contact[controls.currentContact].phones, {id: null, contactAddressId: userData.contact[0].id, value:null, attributeType:null}, 'affiliateContacts/addressAttribute', { id: telefone.id, contactAddressId: userData.contact[0].id, attributeType: telefone.attributeType, value: telefone.value}, 'post', $event.target)"
                  v-if="!getReadOnly"
                >
                  <span v-if="!telefone.id" style="font-size: 16px;" class="glyphicon glyphicon-ok"></span>
                  <span v-else>+</span>
                </button>
              </div>
            </fieldset>
          </div>
        </fieldset>
      </div>

      <div class="form-section enderecos-eletronicos">
        <fieldset id="container-sites" class="form-group row">
          <div class="col-xs-6">

            <div class="row">
              <div class="col-xs-12">
                <label for="email">{{text.email}}</label>
              </div>
              <div :class="{ 'col-xs-10': isUserOwner, 'col-xs-12': !isUserOwner}">
                <input
                  v-if="disabledEmail"
                  ref="input"
                  type="text"
                  class="site"
                  name="email"
                  v-model="userData.contact[controls.currentContact].contacts[0].value"
                  :placeholder="text.placeholder_email"
                  :disabled="disabledEmail"

                />
                <input
                  v-if="disabledEmail === false"
                  ref="input"
                  type="text"
                  class="site"
                  :class="{ 'email-invalid': (!$v.emailPrincipal.required || !$v.emailPrincipal.email)}"
                  name="email2"
                  v-model="emailPrincipal"
                  :placeholder="text.placeholder_email"
                />
              </div>
              <div :class="{ 'col-xs-2': isUserOwner}">
                <button  v-if="disabledEmail && isUserOwner" @click.prevent="abilitarEdicaoEmail()" class="editInfoButton no-mt">
                  <span class="glyphicon glyphicon-pencil"></span>
                </button>
                <button  v-if="disabledEmail === false && isUserOwner"  :disabled="!$v.emailPrincipal.required || !$v.emailPrincipal.email"  @click.prevent="confirmarAlterarEmail()" class="confirmInfoButton no-mt">
                  <span class="glyphicon glyphicon-ok"></span>
                </button>
              </div>
            </div>
          </div>
          <div
            v-for="(site,index) in userData.contact[controls.currentContact].contacts"
            :key="index"
            class="col-xs-6"
          >
            <div class="row" v-if="($v.userData.contact.$each[controls.currentContact].contacts.$each[index].value.$model !== null || isUserOwner)">
              <div v-if="(site.attributeType !== 5)" class="col-xs-12">
                <label :for="text.sites+(index)">{{text.sites}} {{index}}</label>
              </div>
              <div
                v-if="(site.attributeType !== 5)"
                class="col-xs-12"
                :class="{'form-invalid': ($v.userData.contact.$each[controls.currentContact].contacts.$each[index].value.$invalid && $v.userData.contact.$each[controls.currentContact].contacts.$each[index].value.$model !== null) }"
              >
                <input
                  type="text"
                  class="site"
                  name="site"
                  v-model="site.value"
                  :placeholder="text.placeholder_site"
                  :disabled="(userData.contact[controls.currentContact].contacts.length !== (index + 1)) || site.id != null"
                />
              </div>
              <div
                v-if="(site.attributeType !== 5)"
                :class="{
                'col-xs-6 col-lg-8': userData.contact[controls.currentContact].contacts.length > 1 && index == userData.contact[controls.currentContact].contacts.length - 1,
                'col-xs-9 col-lg-10': !(userData.contact[controls.currentContact].contacts.length > 1 && index == userData.contact[controls.currentContact].contacts.length - 1),
                'form-invalid': ($v.userData.contact.$each[controls.currentContact].contacts.$each[index].attributeType.$invalid && $v.userData.contact.$each[controls.currentContact].contacts.$each[index].attributeType.$model !== null)
              }"
              >
                <select
                  class="tiposite"
                  name="tiposite"
                  v-model="site.attributeType"
                  :disabled="(userData.contact[controls.currentContact].contacts.length !== (index + 1)) || site.id != null"
                >
                  <option :value="null" disabled hidden>{{text.placeholder_tipoSite}}</option>
                  <option :value="5" disabled v-if="site.attributeType === 5" selected>Email</option>
                  <option
                    v-for="(option,ind) in controls.tiposSite"
                    v-bind:value="option.value"
                    :key="ind"
                  >{{ option.text }}</option>
                </select>
              </div>

              <div
                v-if="userData.contact[controls.currentContact].contacts.length > 1 && site.attributeType !== 5 && isUserOwner"
                class="editInfoButton col-xs-3 col-lg-2"
              >
                <button
                  class="deleteInfoButton no-mt"
                  @click="delArrayPosition(userData.contact[controls.currentContact].contacts, index, 'affiliateContacts/addressAttribute' , site.id, 'delete', $event.target)"
                  v-if="!getReadOnly"
                >
                  <span class="glyphicon glyphicon-trash"></span>
                </button>
              </div>

              <div
                v-if="index == userData.contact[controls.currentContact].contacts.length - 1 && isUserOwner"
                class="editInfoButton col-xs-3 col-lg-2"
              >
                <button
                  class="addInfoButton"
                  @click="addArrayPosition(userData.contact[controls.currentContact].contacts, {id: null, contactAddressId: userData.contact[0].id, value:null, attributeType:null}, 'affiliateContacts/addressAttribute', {id: site.id, value:site.value, contactAddressId: userData.contact[0].id, attributeType:site.attributeType}, 'post', $event.target)"
                  v-if="!getReadOnly"
                >
                  <span v-if="!site.id" style="font-size: 16px;" class="glyphicon glyphicon-ok"></span>
                  <span v-else>+</span>
                </button>
              </div>
            </div>
          </div>
        </fieldset>

        <fieldset id="container-proprietario-responsavel" class="form-group row">
          <!-- <p>{{userData.names.owner}}</p> -->
          <!-- <p>{{userData.names.responsible}}</p> -->
          <!-- <code>{{$v.userData.contact.$each[controls.currentContact].names}}</code> -->
          <div
            class="col-xs-6"
            :class="{'form-invalid': controls.invalidForm && $v.userData.contact.$each[controls.currentContact].names.owner.value.$invalid}"
          >
            <label for="proprietario">{{text.proprietario}}</label>
            <input
              type="text"
              v-model="userData.contact[controls.currentContact].names.owner.value"
              :disabled="userData.affiliate.affiliateStatusID != 0"
            />
            <span
              v-if="$v.userData.contact.$each[controls.currentContact].names.owner.value.$error"
            >Campo deve ter ao menos dois nomes</span>
          </div>

          <div
            class="col-xs-6"
            :class="{'form-invalid': controls.invalidForm && $v.userData.contact.$each[controls.currentContact].names.responsible.value.$invalid}"
          >
            <label for="responsavel">{{text.responsavel}}</label>
            <input
              type="text"
              v-model="userData.contact[controls.currentContact].names.responsible.value"
              :disabled="userData.affiliate.affiliateStatusID != 0"
            />
            <span
              v-if="$v.userData.contact.$each[controls.currentContact].names.responsible.value.$error"
            >Campo deve ter ao menos dois nomes</span>
          </div>
        </fieldset>
      </div>

      <div class="form-group">
        <fieldset id="container-equipamentos" class="row">
          <!-- <p>currentMask {{currentEquipmentMask}}</p> -->
          <!-- <p>terminais {{userData.terminais}}</p> -->
          <!-- <code>{{$v.userData.terminais}}</code> -->
          <!-- <p>{{content.equipment}}</p> -->
          <div
            class="col-xs-6"
            v-for="(terminal,index) in userData.terminais"
            :key="index"
            :class="{'form-invalid': index == userData.terminais.length - 1 && $v.userData.terminais.$each[index].equipmentSerialCode.$invalid && controls.invalidForm}"
          >
            <fieldset class="row">
              <div class="col-xs-12">
                <label>{{text.terminais}} {{index + 1}}</label>
              </div>

              <div class="col-xs-6">
                <select
                  class="Fornecedor"
                  name="Fornecedor"
                  :disabled="terminal.id !== null"
                  v-model="terminal.manufacturerID"
                  @change="terminal.equipmentModelID = null"
                >
                  <option :value="null" hidden>{{text.placeholder_fornecedor}}</option>
                  <option
                    v-for="(option,manufacturerIndex) in content.equipment.manufacturers"
                    :value="option.id"
                    :key="manufacturerIndex"
                    :disabled="option.id == 0"
                    :hidden="option.id == 0"
                  >{{ option.name }}</option>
                </select>
              </div>

              <div class="col-xs-6">
                <select
                  class="Modelo"
                  name="Modelo"
                  v-model="terminal.equipmentModelID"
                  :disabled="terminal.id !== null"
                >
                  <option :value="null" hidden disabled>{{text.placeholder_modelo}}</option>
                  <option
                    v-for="(option,modelIndex) in content.equipment.models"
                    :value="option.id"
                    :key="modelIndex"
                    v-if="terminal.manufacturerID == option.manufactureId"
                  >{{ option.equipmentModel }}</option>
                </select>
              </div>

              <div class="col-xs-6">
                <div
                  v-for="(mod, connectionIndex) in content.equipment.models"
                  :key="connectionIndex"
                >
                  <input
                    type="text"
                    class="Tipo_Conexao"
                    name="Tipo_Conexao"
                    v-model="mod.connectionTypeName"
                    v-if="mod.id == terminal.equipmentModelID"
                    :placeholder="text.placeholder_conexaoEquipamento"
                    disabled
                  />
                </div>
              </div>

              <div class="col-xs-6">
                <div
                  v-for="(mod, equipmentIndex) in content.equipment.models"
                  :key="equipmentIndex"
                >
                  <input
                    type="text"
                    class="Tipo_Equipamento"
                    name="Tipo_Equipamento"
                    v-model="mod.equipmentType"
                    v-if="mod.id == terminal.equipmentModelID"
                    :placeholder="text.placeholder_tipoEquipamento"
                    disabled
                  />
                </div>
              </div>

              <div
                :class="(userData.terminais.length > 1 && index == userData.terminais.length - 1) && userData.affiliate.affiliateStatusID === 0 ? 'col-xs-6 col-lg-8' : userData.affiliate.affiliateStatusID !== 0 ? 'col-xs-12' : 'col-xs-10'"
              >
                <div
                  v-for="(option,serialIndex) in content.equipment.models"
                  :value="option.id"
                  :key="serialIndex"
                  v-if="option.isEnabled && terminal.equipmentModelID == option.manufactureId"
                  :class="{'form-invalid': ((!$v.userData.terminais.$each[index].equipmentSerialCode.maskLength || !$v.userData.terminais.$each[index].equipmentSerialCode.required) && index == userData.terminais.length - 1) && controls.invalidForm}"
                >
                  <the-mask
                    :disabled="terminal.id !== null"
                    :placeholder="text.placeholder_codEquipamento"
                    class="Cod_Equipamento"
                    name="Cod_Equipamento"
                    :mask="(terminal.serialNumberFormat != '----') || (terminal.equipmentSerialCode === undefined) ? option.serialNumberFormat : 'XXXXXXXXXXXX'"
                    @input="updateCurrentEquipmentSerialCode($event, index)"
                    :value="$v.userData.terminais.$each[index].equipmentSerialCode.$model"
                  ></the-mask>

                  <span
                    v-if="!$v.userData.terminais.$each[index].equipmentSerialCode.required && index == userData.terminais.length - 1 && controls.invalidForm"
                  >Número de série obrigatório</span>
                  <span
                    v-if="(($v.userData.terminais.$each[index].equipmentSerialCode.required && !$v.userData.terminais.$each[index].equipmentSerialCode.maskLength) && index == userData.terminais.length - 1) && controls.invalidForm"
                  >Número de série incorreto</span>
                </div>
              </div>

              <div
                v-if="userData.terminais.length > 1 && userData.affiliate.affiliateStatusID == 0 && isUserOwner"
                class="editInfoButton col-xs-3 col-lg-2"
              >
                <button
                  class="deleteInfoButton no-mt2"
                  @click="delArrayPosition(userData.terminais, index, 'affiliateEquipments' , terminal.id, 'delete', $event.target)"
                >
                  <span class="glyphicon glyphicon-trash"></span>
                </button>
              </div>

              <div
                v-if="index == userData.terminais.length - 1 && userData.affiliate.affiliateStatusID == 0 && isUserOwner"
                class="editInfoButton col-xs-3 col-lg-2"
              >
                <button
                  class="addInfoButton"
                  @click="addArrayPosition(userData.terminais, { id: null, manufacturerID: null, equipmentModelID: null, equipmentSerialCode: null }, '/affiliateEquipments', { id: terminal.id, equipmentModelID: terminal.equipmentModelID, equipmentSerialCode: terminal.equipmentSerialCode}, 'post', $event.target)"
                  :disabled=" $v.userData.terminais.$each[index].equipmentSerialCode.$invalid"
                >
                  <span v-if="!terminal.id" style="font-size: 16px;" class="glyphicon glyphicon-ok"></span>
                  <span v-else>+</span>
                </button>
              </div>
            </fieldset>
          </div>
        </fieldset>
      </div>

      <div class="form-section">

        <!-- <fieldset class="form-group row" :class="{'form-no-edit': (((!controls.hasEditedAddress && hasSavedAddressFile) || (!controls.hasEditedAffiliate && hasSavedDocumentFile)) && userData.affiliate.affiliateStatusID === 0) || (!controls.hasEditedAddress && userData.affiliate.affiliateStatusID !== 0)}"> -->
        <fieldset class="form-group row" v-if="isUserOwner">
          <div
            class="form-button col-xs-6 pull-right"
            v-if="userData.affiliate.affiliateStatusID === 0"
          >
            <fieldset>
              <button
                id="btnSalvar"
                @click.prevent="saveAffiliateGeral"
                :class="{wait: controls.sendingJSON}"
              >{{text.form_salvar}}</button>
            </fieldset>
          </div>

          <div class="form-button col-xs-6 pull-right" v-else>
            <fieldset>
              <button
                id="btnSolicitar"
                @click.prevent="solicitarAlteracaoEndereco"
                :class="{wait: controls.sendingJSON}"
                v-if="!getReadOnly"
              >{{text.solicitar_alteracao}}</button>
            </fieldset>
          </div>
        </fieldset>
      </div>

    </form>

    <div class="row loading" v-show="controls.loading">
      <div class="col-xs-12 loadImage">
        <img src="~assets/img/loading.gif" alt="Carregando" />
      </div>
    </div>

  </div>
</template>

<style lang="less" scoped>
@import "~assets/vars.less";
@import "~assets/variables.less";
.email-invalid{
  color: red!important;
  border: solid 1px red!important;
}
.email-edit{
  border: solid 1px #006ED7!important;
}
#formMinhaContaListo {
  .addInfoButton,
  .editInfoButton,
  .deleteInfoButton {
    margin: 0;
    line-height: 0;
  }
  .addInfoButton {
    font-size: @ftSizeBig;
  }
  .loadImage {
    text-align: center;
  }
  #container-genero {
    .selectGender {
      display: inline-block;
      margin: 0;
      margin-right: 10px;

      input[type="radio"] {
        margin: 0;
        margin-right: 5px;
      }
    }
  }
  .contactExchangeRequestText {
    font-style: italic;
    font-size: @ftSizeTiny;
  }
}
</style>

<script>
import { EventBus } from '~/utils/eventBus.utils.js';
/* eslint-disable no-await-in-loop */
import { mapActions, mapState, mapGetters } from "vuex";
import {
  required,
  minLength,
  requiredIf,
  maxLength,
  email
} from "vuelidate/lib/validators";
import { TheMask } from "vue-the-mask";
import DatePicker from "vue2-datepicker";
import { reject } from "q";
import fileUpload from "~/components/fileUpload.vue";
import { phoneRegexMobile, phoneRegexFixo } from "~/utils/regex.utils";
import { atLeastTwoNames } from "~/utils/validate.utils";
import { GET_AFFILIATE } from "~/store/affiliate/mutations";

import dayjs from "dayjs";

const phone = phoneRegexMobile;
export default {
  data() {
    return {
      disabledEmail: true,
      edicao: false,
      readonly: false,
      controls: {
        loading: true,
        loadingCEP: false,
        sendingJSON: false,
        editAddressCep: false,
        currentContact: 0,
        tiposTelefone: [],
        tiposSite: [],
        validYear: new Date(),
        validCEP: true,
        selectCities: false,
        invalidForm: false,
        hasEditedAffiliate: false,
        hasEditedAddress: false,
        aproved: true
      },
      content: {
        states: [],
        cities: [],
        equipment: {
          manufacturers: [],
          models: [],
          types: [],
          connections: [],
          selected: null
        }
      },
      text: {
        responsavel: "Responsável",
        proprietario: "Proprietário",
        terminais: "Equipamento",
        form_nome: "Nome completo",
        form_razaoSocial: "Razão Social",
        form_fantasia: "Nome Fantasia",
        form_datanascimento: "Data de Nascimento",
        form_datafundacao: "Data Fundação",
        form_genero: "Sexo",
        form_masculino: "Masculino",
        form_feminino: "Feminino",
        form_cep: "CEP",
        form_bairro: "Bairro",
        form_endereco: "Endereço",
        form_numero: "Número",
        form_complemento: "Complemento",
        form_cidade: "Cidade",
        form_uf: "UF",
        form_telefone: "Telefone",
        form_salvar: "Salvar",
        sites: "Endereço eletrônico",
        email: "Endereço de email",
        placeholder_telefone: "Telefone",
        placeholder_tipotelefone: "Tipo",
        placeholder_site: "Site",
        placeholder_email: "Email",
        placeholder_tipoSite: "Tipo",
        placeholder_fornecedor: "Fornecedor",
        placeholder_modelo: "Modelo",
        placeholder_codEquipamento: "Código equipamento",
        placeholder_tipoEquipamento: "Tipo equipamento",
        placeholder_conexaoEquipamento: "Conexão",
        label_estado: "Estado",
        label_cidade: "Cidade",
        solicitar_alteracao: "Solicitar Alteração",
        solicitacoes_pendentes: "Você tem solicitações pendentes de aprovação."
      },
      userData: {
        affiliate: {},
        contact: [],
        telefones: [],
        sites: [],
        terminais: [],
        names: {
          owner: null,
          responsible: null
        },
        comprovantes: {
          afiliado: null,
          endereco: null
        },
        exchangeRequest: {}
      },
      emailPrincipal: "",
    };
  },
  components: {
    TheMask,
    DatePicker,
    fileUpload
  },
  validations() {
    const self = this;
    return {
      emailPrincipal: {
        required,
        email
      },
      userData: {
        affiliate: {
          birthDate: {
            required
          },
          fullName: {
            required,
            atLeastTwoNames
          },
          simpleName: {
            required
          },
          genderID: {
            required: requiredIf(
              () => self.userData.affiliate.affiliationTypeID != 0
            ),
            gender(value) {
              if (self.userData.affiliate.affiliationTypeID == 1) {
                return value != 0 ? true : false;
              }
              return true;
            }
          }
        },
        terminais: {
          $each: {
            manufacturerID: {
              required
            },
            equipmentModelID: {
              required
            },
            equipmentSerialCode: {
              required,
              maskLength: (value, model) =>
                !model.id
                  ? minLength(self.currentEquipmentMask)(value)
                  : minLength(1)(value)
            }
          }
        },
        contact: {
          $each: {
            addressPostalCode: {
              required,
              cepLength: minLength(8)
            },
            addressStreetName: {
              required
            },
            addressNeighborhood: {
              required
            },
            addressNumber: {
              required,
              maxLength: maxLength(50)
            },
            cityID: {
              required,
              validate(value) {
                if (value) {
                  return value > 0;
                }
                return false;
              }
            },
            uf: {
              required
            },
            names: {
              owner: {
                value: {
                  required: requiredIf(() =>
                    self.userData.affiliate.affiliateStatusID == 0
                      ? true
                      : false
                  ),
                  atLeastTwoNames
                }
              },
              responsible: {
                value: {
                  required: requiredIf(() =>
                    self.userData.affiliate.affiliateStatusID == 0
                      ? true
                      : false
                  ),
                  atLeastTwoNames
                }
              }
            },
            phones: {
              $each: {
                attributeType: {
                  required,
                  validate(value) {
                    if (value) {
                      return value > 0;
                    }
                    return false;
                  }
                },
                value: {
                  required,
                  // phone,
                  validate(value) {
                    if (
                      value.length >= 14 &&
                      /^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/g.test(
                        value
                      )
                    ) {
                      return true;
                    }
                    return false;
                  }
                  // validate: minLength(14),
                }
              }
            },
            contacts: {
              $each: {
                attributeType: {
                  required,
                  validate(value) {
                    if (value) {
                      return value > 0;
                    }
                    return false;
                  }
                },
                value: {
                  required
                }
              }
            }
          }
        }
        // comprovantes: {
        //   endereco: {
        //     required: requiredIf(() => (self.controls.hasEditedAddress ? true : false)),
        //   },
        //   afiliado: {
        //     required: requiredIf(self.editedAffiliate && self.userData.affiliate.affiliateStatusID == 0),
        //   },
        // },
      }
    };
  },
  mounted() {
    const self = this;
    self.controls.validYear.setFullYear(
      self.controls.validYear.getFullYear() - 18
    );

    self.getEquipments();
    self.getManufacturer();
    self.getEquipmentModel();
    self.getAttributeTypesGroups();
    self.getAffiliatesContacts();
    EventBus.$on('onModalClosed', function(){
      self.disabledEmail = true;
    });
    EventBus.$on('onPrimaryEmailModified', function(){
      self.getAffiliatesContacts();
    });
  },
  methods: {
    getEquipments() {
      const self = this;

      self.$axios
        .get(`${process.env.API_AFFILIATE}/affiliateEquipments`)
        .then(response => {
          if (response.data) {
            self.userData.terminais = response.data;
            // // console.log("self.userData.terminais", self.userData.terminais);
            if (!self.userData.terminais) {
              self.userData.terminais = [
                {
                  id: null,
                  manufacturerID: null,
                  equipmentModelID: null,
                  equipmentSerialCode: null
                }
              ];
            }
            self.userData.terminais.map(st => {
              // // console.log("st.endDate", st.endDate == null);
              st.endDate =
                st.endDate == null || st.endDate == ""
                  ? "2050-01-01T01:01:01"
                  : st.endDate;
              st.initialDate =
                st.initialDate == null ? "2000-01-01T01:01:01" : st.initialDate;
              st.fullName =
                st.fullName == null || st.fullName == "fullname"
                  ? "fullname"
                  : st.fullName;
            });
          }
        })
        .catch(err => console.log("Err:", err));
    },
    getManufacturer() {
      const self = this;
      self.$axios
        .get(`${process.env.API_AFFILIATE}/affiliateEquipments/Manufacturer`)
        .then(response => {
          if (response.data) {
            self.content.equipment.manufacturers = response.data;
          }
        })
        .catch(err => console.log("Err:", err));
    },
    getEquipmentModel() {
      const self = this;
      self.$axios
        .get(`${process.env.API_AFFILIATE}/affiliateEquipments/EquipmentModel`)
        .then(response => {
          if (response.data) {
            self.content.equipment.models = response.data;
          }
        })
        .catch(err => console.log("Err:", err));
    },
    getAttributeTypesGroups() {
      const self = this;

      self.$axios
        .get(`${process.env.API_AFFILIATE}/attributeTypes/groups`)
        .then(response => {
          if (response.data) {
            const groups = response.data;
            groups.forEach((element0, index) => {
              self.$axios
                .get(
                  `${process.env.API_AFFILIATE}/attributeTypes/${element0.id}`
                )
                .then(resp => {
                  const tipos = resp.data;

                  // // console.log("groups", element0.id);
                  tipos.forEach((element, index) => {
                    if (element0.id === 1) {
                      self.controls.tiposTelefone.push({
                        value: element.id,
                        text: element.attributeType
                      });
                    }
                    if (element0.id === 2 && element.id !== 5) {
                      self.controls.tiposSite.push({
                        value: element.id,
                        text: element.attributeType
                      });
                    }
                  });
                })
                .catch(err => console.log("Err:", err));
            });
          }
        })
        .catch(err => console.log("Err:", err));
    },
    getAffiliatesContacts() {
      const self = this;
      let stateID = 0;

      self.$axios
        .get(`${process.env.API_AFFILIATE}/affiliates/contacts`)
        .then(response => {
          let contatos = null;
          if (response.data) {
            contatos = response.data;

            self.userData.contact = contatos;
            self.userData.contact[self.controls.currentContact].uf != null
              ? self.userData.contact[self.controls.currentContact].uf
                  .toUpperCase()
                  .trim()
              : null;
            if (
              self.userData.contact[self.controls.currentContact].contacts
                .length === 1 &&
              self.userData.contact[self.controls.currentContact].contacts[0]
                .attributeType === 5
            ) {
              self.userData.contact[self.controls.currentContact].contacts.push(
                {
                  id: null,
                  contactAddressId:
                    self.userData.contact[self.controls.currentContact].id,
                  value: null,
                  attributeType: null
                }
              );
            }
            if (
              contatos[self.controls.currentContact].contacts !== null &&
              typeof contatos[self.controls.currentContact].contacts !==
                "undefined"
            ) {
              contatos[self.controls.currentContact].contacts.forEach(
                (element, index) => {
                  self.userData.sites.push({
                    id: element.id,
                    value: element.value,
                    attributeType: element.attributeType
                  });
                }
              );
            }

            self.userData.contact = contatos;
            self.userData.contact[self.controls.currentContact].uf =
              self.userData.contact[self.controls.currentContact].uf != null
                ? self.userData.contact[self.controls.currentContact].uf
                    .toUpperCase()
                    .trim()
                : null;
          }

          self.$axios
            .get(`${process.env.API_CEP}/ZipCode/country/1/states`)
            .then(response => {
              if (response.data) {
                self.content.states = response.data;

                if (
                  self.userData.contact.length > 0 &&
                  self.userData.contact[self.controls.currentContact].uf != null
                ) {
                  self.content.states.map(st => {
                    if (
                      st.uf.trim() ==
                      self.userData.contact[
                        self.controls.currentContact
                      ].uf.trim()
                    ) {
                      stateID = st.stateID;
                    }
                  });
                }

                self.$axios
                  .get(`${process.env.API_CEP}/ZipCode/state/${stateID}/cities`)
                  .then(response => {
                    if (response.data) {
                      self.content.cities = response.data;
                      self.getAffiliates();
                    }
                  })
                  .catch(err => console.log("Err:", err));
              } else {
                self.getAffiliates();
              }
            })
            .catch(err => console.log("Err:", err));

          if (self.userData.terminais.length <= 0) {
            self.addArrayPosition(
              self.userData.terminais,
              {
                id: null,
                manufacturerID: null,
                equipmentModelID: null,
                equipmentSerialCode: null
              },
              null,
              {
                id: null,
                manufacturerID: null,
                equipmentModelID: null,
                equipmentSerialCode: null
              },
              null,
              null
            );
          }

          if (
            self.userData.contact.length > 0 &&
            self.userData.contact[self.controls.currentContact].names == null
          ) {
            self.userData.contact[self.controls.currentContact].names = {
              owner: {
                id: null,
                attributeType: 11,
                value: null
              },
              responsible: {
                id: null,
                attributeType: 10,
                value: null
              }
            };
          } else if (self.userData.contact.length > 0) {
            Object.keys(
              self.userData.contact[self.controls.currentContact].names
            ).map(n => {
              if (
                self.userData.contact[self.controls.currentContact].names[n] ==
                null
              ) {
                if (n == "owner") {
                  self.userData.contact[self.controls.currentContact].names[
                    n
                  ] = {
                    id: null,
                    attributeType: 11,
                    value: null
                  };
                } else {
                  self.userData.contact[self.controls.currentContact].names[
                    n
                  ] = {
                    id: null,
                    attributeType: 10,
                    value: null
                  };
                }
              }
            });
          }
          $nuxt.$store.commit("gravaContatos", {
            contacts: contatos
          });
        })
        .catch(err => console.log("Err:", err));
    },

    getAffiliates() {
      const self = this;

      // // console.log("GET affiliates");

      self.$axios
        .get(`${process.env.API_AFFILIATE}/affiliates`)
        .then(response => {
          if (response.data) {
            const afiliado = response.data;

            Object.freeze(afiliado);

            $nuxt.$store.commit("gravaAfiliado", {
              affiliate: afiliado
            });

            self.userData.affiliate = Object.assign({}, afiliado);
            self.userData.affiliate.birthDate =
              self.userData.affiliate.birthDate !== "0001-01-01T00:00:00"
                ? self.userData.affiliate.birthDate
                : null;
          }

          if (
            self.userData.contact[self.controls.currentContact]
              .exchangeRequest &&
            self.userData.affiliate.affiliateStatusID !== 0
          ) {
            self.userData.exchangeRequest.contact =
              self.userData.contact[
                self.controls.currentContact
              ].exchangeRequest;

            // // console.log("cityID", self.userData.exchangeRequest.contact.cityID);

            if (self.userData.exchangeRequest.contact.cityID) {
              self.$axios
                .get(
                  `${process.env.API_CEP}/ZipCode/city/${self.userData.exchangeRequest.contact.cityID}`
                )
                .then(response => {
                  if (response.data) {
                    self.controls.loading = false;
                    self.controls.loadingCEP = false;

                    self.userData.exchangeRequest.contact.cityName =
                      response.data.cityName;
                    self.userData.exchangeRequest.contact.uf = response.data.uf;
                    self.userData.exchangeRequest.contact.stateName =
                      response.data.stateName;
                  }
                })
                .catch(err => console.log("Err:", err));
            } else {
              self.controls.loading = false;
              self.controls.loadingCEP = false;
            }
          } else {
            self.controls.loading = false;
            self.controls.loadingCEP = false;
          }
        })
        .catch(err => console.log("Err:", err));
    },
    saveAffiliateContactNames() {
      const self = this;
      Object.keys(
        self.userData.contact[self.controls.currentContact].names
      ).map(k => {
        if (
          self.userData.contact[self.controls.currentContact].names[k].id !=
            null &&
          self.userData.contact[self.controls.currentContact].names[k].value !=
            null
        ) {
          self.$axios.put(
            `${process.env.API_AFFILIATE}/affiliateContacts/addressAttribute/${
              self.userData.contact[self.controls.currentContact].names[k].id
            }`,
            {
              contactAddressId:
                self.userData.contact[self.controls.currentContact].id,
              attributeType:
                self.userData.contact[self.controls.currentContact].names[k]
                  .attributeType,
              value:
                self.userData.contact[self.controls.currentContact].names[k]
                  .value
            }
          );
        } else if (
          self.userData.contact[self.controls.currentContact].names[k].value !=
          null
        ) {
          self.$axios.post(
            `${process.env.API_AFFILIATE}/affiliateContacts/addressAttribute`,
            {
              contactAddressId:
                self.userData.contact[self.controls.currentContact].id,
              attributeType:
                self.userData.contact[self.controls.currentContact].names[k]
                  .attributeType,
              value:
                self.userData.contact[self.controls.currentContact].names[k]
                  .value
            }
          );
        }
      });
    },
    saveAffiliateContactsExchange() {
      const self = this;
      // // console.log("self.userData.contact[controls.currentContact].id", self.userData.contact[self.controls.currentContact].id);

      self.controls.loadingCEP = true;

      const objeto = {
        contactTypeID:
          self.userData.contact[self.controls.currentContact].contactTypeID,
        addressStreetName:
          self.userData.contact[self.controls.currentContact].addressStreetName,
        addressNumber:
          self.userData.contact[self.controls.currentContact].addressNumber,
        addressAdditionalData:
          self.userData.contact[self.controls.currentContact]
            .addressAdditionalData,
        addressPostalCode:
          self.userData.contact[self.controls.currentContact].addressPostalCode,
        addressNeighborhood:
          self.userData.contact[self.controls.currentContact]
            .addressNeighborhood,
        cityID: self.userData.contact[self.controls.currentContact].cityID,
        uf: self.userData.contact[self.controls.currentContact].uf.trim()
      };

      // // console.log("objeto saveAffiliateContactsExchange", objeto);

      self
        .$axios({
          method: "post",
          url: `${
            process.env.API_AFFILIATE
          }/affiliateContacts/exchangeRequest/${
            self.userData.contact[self.controls.currentContact].id
          }`,
          data: objeto
        })
        .then(response => {
          if (response.data) {
            if (response.status == 200) {
              self.controls.hasEditedAddress = false;

              $nuxt.$store.commit("setComprovanteState", {
                status: false,
                type: "comprovante_endereco"
              });

              if (self.userData.affiliate.affiliateStatusID != 0) {
                self.$axios
                  .get(`${process.env.API_AFFILIATE}/affiliates/contacts`)
                  .then(response => {
                    // // console.log(response.data[self.controls.currentContact].exchangeRequest);

                    self.userData.exchangeRequest.contact =
                      response.data[
                        self.controls.currentContact
                      ].exchangeRequest;

                    // // console.log("cityID", self.userData.exchangeRequest.contact.cityID);

                    if (self.userData.exchangeRequest.contact.cityID) {
                      self.$axios
                        .get(
                          `${process.env.API_CEP}/ZipCode/city/${self.userData.exchangeRequest.contact.cityID}`
                        )
                        .then(response => {
                          self.controls.loadingCEP = false;
                          this.controls.selectCities = false;
                          self.userData.exchangeRequest.contact.cityName =
                            response.data.cityName;
                          self.userData.exchangeRequest.contact.stateName =
                            response.data.stateName;
                        })
                        .catch(err => console.log("Err:", err));
                    }
                  })
                  .catch(err => {
                    self.controls.loadingCEP = false;
                    this.controls.selectCities = true;
                    // // console.log("err", err);
                  });
              }
            }
          }
        })
        .catch(error => {
          self.controls.loadingCEP = false;
          $nuxt.$store.commit("setComprovanteState", {
            status: false,
            type: "comprovante_endereco"
          });
        });
    },
    saveAffiliateExchange() {
      const self = this;

      const objeto = {
        fullName: self.userData.affiliate.fullName,
        simpleName: self.userData.affiliate.simpleName,
        birthDate: self.userData.affiliate.birthDate,
        gender: self.userData.affiliate.genderID
      };

      if (self.userData.affiliate.affiliateStatusID == 0) {
        self
          .$axios({
            method: "post",
            url: `${process.env.API_AFFILIATE}/affiliates/exchangeRequest/`,
            data: objeto
          })
          .then(response => {
            $nuxt.$store.commit("setComprovanteState", {
              status: false,
              type:
                self.userData.affiliate.affiliationTypeID == 1
                  ? "comprovante_cpf"
                  : "comprovante_cnpj"
            });
          })
          .catch(error => {
            $nuxt.$store.commit("setComprovanteState", {
              status: false,
              type:
                self.userData.affiliate.affiliationTypeID == 1
                  ? "comprovante_cpf"
                  : "comprovante_cnpj"
            });
          });
      }
    },
    delArrayPosition(variavel, posicao, endpoint, id, delMethod, button) {
      const self = this;
      let countID = 0;
      if (!id) {
        variavel.splice(posicao, 1);
        return;
      }
      Object.keys(variavel).map(k => {
        // // console.log("variavel[k]", variavel[k]);
        countID = variavel[k].id !== null ? (countID += 1) : countID;
      });

      const countEmail = Object.keys(variavel).filter(
        k => variavel[k].attributeType == 5
      );

      if (countID > 1) {
        const confirmar = confirm("Deseja deletar esse registro?");
        // console.log("variavel[posicao].attributeType", variavel[posicao].attributeType);
        if (variavel[posicao].attributeType != 5) {
          // console.log("id", id);
          if (id) {
            // console.log("confirmar", confirmar);
            if (confirmar) {
              button.parentElement.parentElement.parentElement.parentElement.parentElement.classList.add(
                "form-no-edit"
              );
              self
                .$axios({
                  method: delMethod,
                  url: `${process.env.API_AFFILIATE}/${endpoint}/${id}`
                })
                .then(response => {
                  variavel.splice(posicao, 1);
                  button.parentElement.parentElement.parentElement.parentElement.parentElement.classList.remove(
                    "form-no-edit"
                  );
                })
                .catch(error => {
                  button.parentElement.parentElement.parentElement.parentElement.parentElement.classList.remove(
                    "form-no-edit"
                  );
                });
            }
          } else {
            variavel.splice(posicao, 1);
          }
        } else if (countEmail.length <= 1) {
          // console.log("confirmar 2");
          alert("É necessário ter ao menos um e-mail");
        } else if (confirmar) {
          // console.log("confirmar 3");
          button.parentElement.parentElement.parentElement.parentElement.parentElement.classList.add(
            "form-no-edit"
          );
          self
            .$axios({
              method: delMethod,
              url: `${process.env.API_AFFILIATE}/${endpoint}/${id}`
            })
            .then(response => {
              variavel.splice(posicao, 1);
              button.parentElement.parentElement.parentElement.parentElement.parentElement.classList.remove(
                "form-no-edit"
              );
            })
            .catch(error => {
              button.parentElement.parentElement.parentElement.parentElement.parentElement.classList.remove(
                "form-no-edit"
              );
            });
        }
      } else if (countID <= 1 && id !== null) {
        // console.log("confirmar 4");
        alert("É necessário ter ao menos um registro");
      } else {
        // console.log("confirmar 5");
        variavel.splice(posicao, 1);
      }
      /* if (countID > 1 && variavel[posicao].attributeType !== 5) {
        if (id) {
          const confirmar = confirm("Deseja deletar esse registro?");

          if (confirmar) {
            button.parentElement.parentElement.parentElement.parentElement.parentElement.classList.add("form-no-edit");
            self.$axios({
              method: delMethod,
              url: `${process.env.API_AFFILIATE}/${endpoint}/${id}`,
            })
              .then((response) => {
                variavel.splice(posicao, 1);
                button.parentElement.parentElement.parentElement.parentElement.parentElement.classList.remove("form-no-edit");
              })
              .catch((error) => {
                button.parentElement.parentElement.parentElement.parentElement.parentElement.classList.remove("form-no-edit");
              });
            // if (id !== null) {
            // } else {
            //   variavel.splice(posicao, 1);
            // }
          }
        } else {
          variavel.splice(posicao, 1);
        }
      } else if (countID <= 1 && id !== null) {
        alert("É necessário ter ao menos um registro");
      } else if (countEmail.length <= 1 && variavel[posicao].attributeType == 5) {
        alert("É necessário ter ao menos um e-mail");
      } else {
        variavel.splice(posicao, 1);
      } */
      if (self.userData.contact[self.controls.currentContact].contacts.length === 2) {
        self.userData.contact[self.controls.currentContact].contacts.push({
          id: null,
          contactAddressId: self.userData.contact[self.controls.currentContact].id,
          value: null,
          attributeType: null
        });
      }
    },
    savePosition(tipoObjeto, insertMethod, endpoint) {
      const self = this;
      self.controls.aproved = true;
      let inserir = false;
      let breakMap = true;
      const estruturaObj = [];
      let ar;
      let formatObj = {};

      if (tipoObjeto === "telefone") {
        ar =
          self.userData.contact[self.controls.currentContact].phones[
            self.userData.contact[self.controls.currentContact].phones.length -
              1
          ];
      }

      if (tipoObjeto === "contatos") {
        ar =
          self.userData.contact[self.controls.currentContact].contacts[
            self.userData.contact[self.controls.currentContact].contacts
              .length - 1
          ];
      }

      if (tipoObjeto === "terminais") {
        ar = self.userData.terminais[self.userData.terminais.length - 1];
      }

      Object.keys(ar).map(k => {
        if (breakMap) {
          if (k !== "id") {
            if (ar[k] !== null) {
              // // console.log("ar[k].length", ar[k].length);
              if (typeof ar[k].length !== "undefined") {
                inserir = ar[k].length >= 1 ? true : false;
                breakMap = !inserir ? false : true;
              }
            } else {
              inserir = false;
              breakMap = false;
            }
          }
        }
      });

      if (inserir) {
        if (tipoObjeto === "telefone") {
          formatObj = {
            id: ar.id,
            contactAddressId: this.userData.contact[0].id,
            attributeType: ar.attributeType,
            value: ar.value
          };
        } else if (tipoObjeto === "contatos") {
          formatObj = {
            id: ar.id,
            contactAddressId: this.userData.contact[0].id,
            attributeType: ar.attributeType,
            value: ar.value
          };
        } else {
          formatObj = {
            equipmentModelID: ar.equipmentModelID,
            equipmentSerialCode: ar.equipmentSerialCode
          };
        }

        if (ar.id === null) {
          self
            .$axios({
              method: insertMethod,
              url: `${process.env.API_AFFILIATE}/${endpoint}`,
              data: formatObj
            })
            .then(response => {
              ar.id = response.data;
              if (tipoObjeto === "terminais") {
                self.$axios
                  .post(
                    `${process.env.API_AFFILIATE}/affiliateEquipments/${response.data}`
                  )
                  .catch(() => {
                    ar.id = null;
                  });
              }
              return true;
              // // console.log(variavel);
              // variavel.push(elemento);
            })
            .catch(error => {
              self.controls.aproved = false;
              // // console.log("erro SavePosition", error);
            });
        }
      }
    },
    addArrayPosition(
      variavel,
      elemento,
      endpoint,
      objeto,
      insertMethod,
      button
    ) {
      const self = this;
      let inserir = false;
      let breakMap = true;

      if (!variavel) {
        const variavel = [];
      }

      if (variavel.length <= 0) {
        variavel.push(elemento);
      }

      if (variavel[0]) {
        const ar = variavel[variavel.length - 1];

        Object.keys(ar).map(k => {
          if (breakMap) {
            if (k !== "id") {
              if (ar[k] !== null) {
                if (typeof ar[k].length !== "undefined") {
                  inserir = ar[k].length >= 1 ? true : false;
                  breakMap = !inserir ? false : true;
                }
              } else {
                inserir = false;
                breakMap = false;
              }
            }
          }
        });

        if (inserir) {
          if (objeto.id === null) {
            button.parentElement.parentElement.parentElement.parentElement.parentElement.classList.add(
              "form-no-edit"
            );
            self
              .$axios({
                method: insertMethod,
                url: `${process.env.API_AFFILIATE}/${endpoint}`,
                data: objeto
              })
              .then(response => {
                ar.id = response.data;
                if (endpoint === "/affiliateEquipments") {
                  // console.log("ar.id ", ar.id);
                  self.$axios
                    .post(
                      `${process.env.API_AFFILIATE}/affiliateEquipments/${ar.id}`
                    )
                    .then(response => {
                      if (!response.data) {
                        button.parentElement.parentElement.parentElement.parentElement.parentElement.classList.remove(
                          "form-no-edit"
                        );
                      }
                    })
                    .catch(error => {
                      ar.id = null;
                      self.$nuxt.$emit("toggleModal", {
                        api: "erro",
                        modalContent: error.response.data
                      });

                      if (button.parentElement) {
                        button.parentElement.parentElement.parentElement.parentElement.parentElement.classList.remove(
                          "form-no-edit"
                        );
                      }
                    });
                }
                button.parentElement.parentElement.parentElement.parentElement.parentElement.classList.remove(
                  "form-no-edit"
                );
              })
              .catch(error => {
                ar.id = null;
                button.parentElement.parentElement.parentElement.parentElement.parentElement.classList.remove(
                  "form-no-edit"
                );
                if (!error.response.data.Value) {
                  return self.$nuxt.$emit("toggleModal", {
                    api: "erro",
                    modalContent: "Erro ao inserir Registro"
                  });
                }
                self.$nuxt.$emit("toggleModal", {
                  api: "erro",
                  modalContent: Array.isArray(error.response.data.Value)
                    ? error.response.data.Value[0]
                    : error.response.data.Value
                });
              });
          } else {
            variavel.push(elemento);
          }
        }
      }
      // variavel.push(elemento);
    },
    // atualiza lista de cidades baseada no estado selecionado
    updateCitiesList(ev) {
      const self = this;
      let stateID;

      self.controls.loadingCEP = true;

      self.content.states.map(st => {
        if (st.uf == ev) {
          // // console.log(`${st.uf} igual ${ev}`);
          stateID = st.stateID;
        }
      });

      self.$axios
        .get(`${process.env.API_CEP}/ZipCode/state/${stateID}/cities`)
        .then(response => {
          self.content.cities = response.data;
          self.controls.loadingCEP = false;
          // // console.log(self.content.cities);
        })
        .catch(() => {
          self.controls.loadingCEP = false;
        });
    },
    // busca endereço a partir do CEP
    buscaCEP(ev) {
      if (ev.length < 9) {
        return false;
      }
      const self = this;

      if (ev) {
        const val = ev.toString().replace(/[^0-9]/g, "");
        let state;

        // this.controls.validCEP = false;
        self.controls.loadingCEP = true;

        self.userData.contact[
          self.controls.currentContact
        ].addressPostalCode = val;

        self.userData.contact[self.controls.currentContact].uf = "";
        self.userData.contact[self.controls.currentContact].cityID = 0;

        self.$axios
          .get(`${process.env.API_CEP}/zipcode/${val}`)
          .then(response => {
            if (response.data) {
              self.controls.loadingCEP = false;

              self.userData.contact[
                self.controls.currentContact
              ].addressNumber = "";
              self.userData.contact[
                self.controls.currentContact
              ].addressAdditionalData = "";

              if (response.status == 200) {
                const infoCep = response.data;
                self.controls.validCEP = true;
                self.controls.selectCities = false;
                // self.controls.editAddressCep = false;

                const nomeCompletoDaRua = `${infoCep.streetType.trim()} ${infoCep.streetName.trim()}`;
                self.userData.contact[
                  self.controls.currentContact
                ].addressStreetName = nomeCompletoDaRua;
                self.userData.contact[
                  self.controls.currentContact
                ].addressNeighborhood = infoCep.neighborhood.trim();
                self.userData.contact[
                  self.controls.currentContact
                ].uf = infoCep.state.trim();
                self.userData.contact[self.controls.currentContact].cityName =
                  infoCep.city;
                self.userData.contact[self.controls.currentContact].cityID =
                  infoCep.cityID;
                self.userData.contact[self.controls.currentContact].stateID =
                  infoCep.stateID;

                const stateID =
                  self.userData.contact[self.controls.currentContact].stateID;
                const cityID =
                  self.userData.contact[self.controls.currentContact].cityID;

                self.$axios
                  .get(`${process.env.API_CEP}/ZipCode/state/${stateID}/cities`)
                  .then(response => {
                    self.content.cities = response.data;
                  })
                  .catch(err => console.log("Err:", err));
              } else {
                self.controls.validCEP = false;
                self.controls.selectCities = true;
                self.controls.editAddressCep = true;

                self.userData.contact[
                  self.controls.currentContact
                ].addressStreetName = "";
                self.userData.contact[self.controls.currentContact].uf = "";
                self.userData.contact[self.controls.currentContact].cityID = 0;
                self.userData.contact[
                  self.controls.currentContact
                ].addressNeighborhood = "";
                self.userData.contact[self.controls.currentContact].cityName =
                  "";
              }
            } else {
              self.controls.loadingCEP = false;
              self.controls.validCEP = false;
              self.controls.selectCities = true;
              self.controls.editAddressCep = true;

              self.userData.contact[
                self.controls.currentContact
              ].addressStreetName = "";
              self.userData.contact[self.controls.currentContact].uf = "";
              self.userData.contact[self.controls.currentContact].cityID = 0;
              self.userData.contact[
                self.controls.currentContact
              ].addressNeighborhood = "";
              self.userData.contact[self.controls.currentContact].cityName = "";
            }
          })
          .catch(() => {
            self.controls.loadingCEP = false;
            self.controls.validCEP = false;
            self.controls.selectCities = true;
          });
      }
    },
    saveAffiliateGeral() {
      const self = this;

      self.$v.$touch();

      self.controls.invalidForm = self.$v.userData.$invalid;

      if (!self.controls.invalidForm) {
        if (self.userData.affiliate.affiliateStatusID != 0) {
          self.salvarDadosGerais();
        } else {
          self.enviarDadosParaAnalise();
        }
      } else {
        alert("Preencha os dados dos campos obrigatórios!");
      }
    },
    salvarDadosGerais() {
      // // console.log("salvarDadosGerais");
      const self = this;
      const p1 = new Promise((resolve, reject) => {
        resolve(self.saveAffiliateExchange());
      }).catch(error => reject(error));
      const p2 = new Promise((resolve, reject) => {
        resolve(self.saveAffiliateContactNames());
      }).catch(error => reject(error));
      const p3 = new Promise((resolve, reject) => {
        resolve(
          self.savePosition(
            "telefone",
            "post",
            "affiliateContacts/addressAttribute"
          )
        );
      }).catch(error => reject(error));
      const p4 = new Promise((resolve, reject) => {
        resolve(
          self.savePosition(
            "contatos",
            "post",
            "affiliateContacts/addressAttribute"
          )
        );
      }).catch(error => reject(error));
      const p5 = new Promise((resolve, reject) => {
        resolve(self.savePosition("terminais", "post", "affiliateEquipments"));
      }).catch(error => reject(error));
      const p6 = new Promise((resolve, reject) => {
        resolve(self.saveAffiliateContactsExchange());
      }).catch(error => reject(error));

      Promise.all([p1, p2, p3, p4, p5, p6])
        .then(result => {
          console.info("Ok");
          self.$nuxt.$emit("trocaTab", "Domicílio bancário");
        })
        .catch(reason => {
          console.warn("Failed!", reason);
        });
    },
    // atualiza CEP no input.native do the-mask de CEP
    updateCEP(ev) {
      const self = this;

      const formatCep = ev.target.value.split("-").join("");

      self.userData.contact[
        self.controls.currentContact
      ].addressPostalCode = formatCep;
    },
    // avança para o proximo campo de telefone
    goToNextTelephone(ev) {
      let telefone;

      if (ev.value && ev.value.length >= 2) {
        const fieldset = Array.from(
          ev.parentElement.parentElement.parentElement.parentElement
            .parentElement.childNodes
        );

        fieldset.map(child => {
          const nodes = Array.from(child.childNodes);

          nodes.map(node => {
            // // console.log("class", Array.from(node.classList));

            if (Array.from(node.classList).indexOf("ntelefone") > -1) {
              telefone = node;
            }
          });

          if (telefone) {
            telefone.focus();
          }
        });
      }
    },
    // atualiza o valor do serial baseado no evento nativo de change
    updateCurrentEquipmentSerialCode(event, terminalIndex) {
      const self = this;

      const serialNumber = event.replace(/-|\s/gi, "");

      self.$v.userData.terminais.$each[
        terminalIndex
      ].equipmentSerialCode.$model = serialNumber;

      // // console.log("serial", serialNumber);
      // // console.log("terminal", self.$v.userData.terminais.$each[terminalIndex]);
    },
    async enviarDadosParaAnalise() {
      const self = this;

      const afiliado = {
        fullName: self.userData.affiliate.fullName,
        simpleName: self.userData.affiliate.simpleName,
        birthDate: self.userData.affiliate.birthDate,
        gender: self.userData.affiliate.genderID
      };

      const contato = {
        contactTypeID:
          self.userData.contact[self.controls.currentContact].contactTypeID,
        addressStreetName:
          self.userData.contact[self.controls.currentContact].addressStreetName,
        addressNumber:
          self.userData.contact[self.controls.currentContact].addressNumber,
        addressAdditionalData:
          self.userData.contact[self.controls.currentContact]
            .addressAdditionalData,
        addressPostalCode:
          self.userData.contact[self.controls.currentContact].addressPostalCode,
        addressNeighborhood:
          self.userData.contact[self.controls.currentContact]
            .addressNeighborhood,
        cityID: self.userData.contact[self.controls.currentContact].cityID,
        uf: self.userData.contact[self.controls.currentContact].uf.trim()
      };

      if (self.userData.affiliate.affiliateStatusID == 0) {
        try {
          self.controls.loading = true;
          self.controls.loadingCEP = true;
          await self.$axios.post(
            `${process.env.API_AFFILIATE}/affiliates/exchangeRequest/`,
            afiliado
          );
          await self.$axios.post(
            `${process.env.API_AFFILIATE}/affiliateContacts/exchangeRequest/${
              self.userData.contact[self.controls.currentContact].id
            }`,
            contato
          );
          if (
            self.userData.contact[self.controls.currentContact].names.owner
              .id &&
            self.userData.contact[self.controls.currentContact].names.owner.id
          ) {
            await self.$axios.put(
              `${
                process.env.API_AFFILIATE
              }/affiliateContacts/addressAttribute/${
                self.userData.contact[self.controls.currentContact].names.owner
                  .id
              }`,
              {
                contactAddressId:
                  self.userData.contact[self.controls.currentContact].id,
                attributeType:
                  self.userData.contact[self.controls.currentContact].names
                    .owner.attributeType,
                value:
                  self.userData.contact[self.controls.currentContact].names
                    .owner.value
              }
            );
          } else if (
            self.userData.contact[self.controls.currentContact].names.owner
              .value != null
          ) {
            await self.$axios.post(
              `${process.env.API_AFFILIATE}/affiliateContacts/addressAttribute`,
              {
                contactAddressId:
                  self.userData.contact[self.controls.currentContact].id,
                attributeType:
                  self.userData.contact[self.controls.currentContact].names
                    .owner.attributeType,
                value:
                  self.userData.contact[self.controls.currentContact].names
                    .owner.value
              }
            );
          }

          if (
            self.userData.contact[self.controls.currentContact].names
              .responsible.id &&
            self.userData.contact[self.controls.currentContact].names
              .responsible.id
          ) {
            await self.$axios.put(
              `${
                process.env.API_AFFILIATE
              }/affiliateContacts/addressAttribute/${
                self.userData.contact[self.controls.currentContact].names
                  .responsible.id
              }`,
              {
                contactAddressId:
                  self.userData.contact[self.controls.currentContact].id,
                attributeType:
                  self.userData.contact[self.controls.currentContact].names
                    .responsible.attributeType,
                value:
                  self.userData.contact[self.controls.currentContact].names
                    .responsible.value
              }
            );
          } else if (
            self.userData.contact[self.controls.currentContact].names
              .responsible.value != null
          ) {
            await self.$axios.post(
              `${process.env.API_AFFILIATE}/affiliateContacts/addressAttribute`,
              {
                contactAddressId:
                  self.userData.contact[self.controls.currentContact].id,
                attributeType:
                  self.userData.contact[self.controls.currentContact].names
                    .responsible.attributeType,
                value:
                  self.userData.contact[self.controls.currentContact].names
                    .responsible.value
              }
            );
          }
          for (const phone of self.userData.contact[
            self.controls.currentContact
          ].phones) {
            if (!phone.id) {
              await self.$axios.post(
                `${process.env.API_AFFILIATE}/affiliateContacts/addressAttribute`,
                {
                  contactAddressId:
                    self.userData.contact[self.controls.currentContact].id,
                  attributeType: phone.attributeType,
                  value: phone.value
                }
              );
            } else {
              await self.$axios.put(
                `${process.env.API_AFFILIATE}/affiliateContacts/addressAttribute/${phone.id}`,
                {
                  contactAddressId:
                    self.userData.contact[self.controls.currentContact].id,
                  attributeType: phone.attributeType,
                  value: phone.value
                }
              );
            }
          }
          for (const contact of self.userData.contact[
            self.controls.currentContact
          ].contacts) {
            if (!contact.id) {
              await self.$axios.post(
                `${process.env.API_AFFILIATE}/affiliateContacts/addressAttribute`,
                {
                  contactAddressId:
                    self.userData.contact[self.controls.currentContact].id,
                  attributeType: contact.attributeType,
                  value: contact.value
                }
              );
            } else {
              await self.$axios.put(
                `${process.env.API_AFFILIATE}/affiliateContacts/addressAttribute/${contact.id}`,
                {
                  contactAddressId:
                    self.userData.contact[self.controls.currentContact].id,
                  attributeType: contact.attributeType,
                  value: contact.value
                }
              );
            }
          }
          for (const terminal of self.userData.terminais) {
            if (!terminal.equipmentID && !terminal.id) {
              const { data } = await self.$axios.post(
                `${process.env.API_AFFILIATE}/affiliateEquipments`,
                terminal
              );
              await self.$axios.post(
                `${process.env.API_AFFILIATE}/affiliateEquipments/${data}`
              );
            }
          }
          self.controls.loadingCEP = false;
          self.controls.loading = false;
          self.controls.hasEditedAddress = false;
          self.$nuxt.$store.commit("gravaAfiliado", {
            affiliate: self.userData.affiliate
          });
          self.$nuxt.$store.commit(GET_AFFILIATE, {
            affiliate: self.userData.affiliate
          });
          self.$nuxt.$emit("trocaTab", "Domicílio bancário");
        } catch (error) {
          if (!error.response.data) {
            return self.$nuxt.$emit("toggleModal", {
              api: "erro",
              modalContent: "Erro ao inserir Registro"
            });
          }
          self.$nuxt.$emit("toggleModal", {
            api: "erro",
            modalContent: this.showModalError(error)
          });
          self.controls.loadingCEP = false;
          self.controls.loading = false;
        }
      }
    },
    showModalError({ response }) {
      const { data } = response;
      if (data.Value) {
        return Array.isArray(data.Value) ? data.Value.join("\n") : data.Value;
      }
      return data;
    },
    // abre modal para atualizar endereco
    solicitarAlteracaoEndereco() {
      const self = this;

      self.$nuxt.$emit("toggleModal", {
        api: "editarEndereco",
        modalContent: self.userData.contact[self.controls.currentContact]
      });
    },
    abilitarEdicaoEmail(){
      const self = this;
      self.disabledEmail = false;
      self.emailPrincipal = self.userData.contact[self.controls.currentContact].contacts[0].value;
      const emailField = this.$refs.input;
      if(emailField){
        emailField.classList.add("email-edit");
      }
    },
    // abre modal para atualizar endereco
    confirmarAlterarEmail(){
      const self = this;
      self.$nuxt.$emit("toggleModal", {
        api: "editarEnderecoEmail",
        email: self.emailPrincipal,
        modalContent: self.userData.contact[self.controls.currentContact]
        
      });
      const emailField = this.$refs.input;
      if(emailField){
        emailField.classList.remove("email-edit");
      }
    },

  },
  computed: {
    ...mapGetters({
      isUserOwner: "auth/isUserOwner"
    }),
    notAfterBirthDate() {
      const CNPJ_AFFILIATE_ID = 2;
      const affiliate = this.$store.state.afiliado.affiliate;
      if (!affiliate) {
        return new Date();
      }
      return affiliate.affiliationTypeID === CNPJ_AFFILIATE_ID
        ? new Date()
        : dayjs()
            .subtract(18, "y")
            .toDate();
    },
    // retorna o CEP do contato atual se existir
    currentAddressPostalCode() {
      if (this.userData.contact[this.controls.currentContact]) {
        return this.userData.contact[this.controls.currentContact]
          .addressPostalCode;
      }
      return false;
    },
    getReadOnly() {
      if (
        $nuxt.$store.state.roles.indexOf("ec_read") >= 0 ||
        ($nuxt.$store.state.afiliado.affiliate &&
          $nuxt.$store.state.afiliado.affiliate.affiliateStatusID < 0)
      ) {
        return true;
      }
      return false;
    },
    // retorna a máscara de equipamentos atual
    currentEquipmentMask() {
      const self = this;

      const currentEquipment = self.userData.terminais.length - 1;
      const listaTerminais = self.userData.terminais;
      const listaModelos = self.content.equipment.models;

      if (currentEquipment >= 0) {
        const equipamentoSelecionado = listaModelos.filter(
          md => md.id == listaTerminais[currentEquipment].equipmentModelID
        )[0];

        if (equipamentoSelecionado) {
          const currentMask = equipamentoSelecionado.serialNumberFormat
            .trim()
            .replace(/-|\s/gi, "");
          return currentMask.length;
        }
      }
      return 20;
    },
    // monitora se salvou comprovante de endereco
    hasSavedAddressFile() {
      return $nuxt.$store.state.comprovantes.endereco;
    },
    // monitora se salvou comprovante de endereco
    hasSavedDocumentFile() {
      return $nuxt.$store.state.comprovantes.document;
    },
    editedAffiliate() {
      return this.controls.hasEditedAffiliate;
    },
    editedAddress() {
      return this.controls.hasEditedAddress;
    }
  },
  watch: {
    // se o CEP tiver o tamanho esperado busca um CEP válido com esse valor
    currentAddressPostalCode(val) {
      const self = this;
      if (val && val.length == 8 && !self.controls.loading) {
        self.buscaCEP(val);
      }
    },
    hasSavedAddressFile(val) {
      const self = this;

      // // console.log("address", val);

      self.userData.comprovantes.endereco = true;
    },
    hasSavedDocumentFile(val) {
      const self = this;

      // // console.log("document", val);

      self.userData.comprovantes.afiliado = true;
    }
  }
};
</script>
