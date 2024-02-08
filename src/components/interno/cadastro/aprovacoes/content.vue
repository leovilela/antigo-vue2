<template>
  <div id="conteudo-aprovacoes" class="page-interno page-aprovacoes">
    <content-section v-show="!controls.loading">
      <div class="row" slot="content">
        <!-- <code>{{pendingSummary}}</code> -->
        <table class="col-xs-12 listagem" v-show="pendingSummary.length > 0">
          <thead>
            <tr>
              <th>
                <table>
                  <tr>
                    <th class="item">ID</th>
                    <th class="colName">Nome</th>
                    <th class="item"></th>
                    <th class="item"></th>
                    <th class="item"></th>
                  </tr>
                </table>
              </th>

            </tr>
          </thead>
          <tbody>
            <tr v-for="(exchange, index) in pendingSummary" :key="index" v-if="exchange.affiliateName !== null">
              <!-- <code>{{exchange}}</code> -->
              <td class="itensListagem">
                <table id="exchangeDetails">
                  <tr @click="details(index, exchange.affiliateId)" class="openDetails">
                    <td class="item">{{exchange.affiliateId}}</td>
                    <td class="colName">{{exchange.affiliateName}}</td>
                    <td class="item"></td>
                    <td class="item"></td>
                    <td class="item"><span v-if="exchange.hasExchangeRequestContact !== false || exchange.hasExchangeRequestAffiliate !== false || exchange.hasExchangeRequestFinancial !== false">Ver solicitações</span></td>
                  </tr>
                  <tr v-if="pendingSelected.affiliateId == exchange.affiliateId">
                    <td colspan="5">
                      <div class="container-fluid"  v-for="(pending, key, index) in pendingSelected" :key="index" v-if="(key == 'affiliate' || key == 'contact' || key == 'financial') && pending.exchange !== null">
                        <!-- <code>{{pending}}</code> -->
                        <div class="form-section" v-if="key == 'affiliate' && pending.exchange !== null">
                          <h2>Dados de Cadastro</h2>
                          <div class="row">
                            <div class="tipo col-xs-6" v-for="(pendingInterno, key1, index1) in pending.exchange" :key="index1">
                              <p><strong>{{labels[key1]}}</strong> : {{pendingInterno}}</p>
                            </div>
                          </div>
                          <div class="row form-group">
                            <div class="col-xs-6">
                              <h3>Arquivos</h3>
                              <p v-if="pending.files.length <= 0" class="alert alert-danger">Não foram encontrados arquivos nessa solicitação.</p>
                              <ul class="filesList">
                                <li v-for="(file, key, index) in pending.files" :key="index" @click="getTargetAffiliateFile(file, index)"><span>{{file}} </span><span class="glyphicon glyphicon-download downloadBtn"></span> </li>
                              </ul>
                            </div>
                          </div>
                          <div class="row form-group">
                            <div class="col-xs-6">
                              <button @click="aprove(pending.exchange, true, 'affiliate')">Aprovar</button>
                            </div>
                            <div class="col-xs-6">
                              <button @click="aprove(pending.exchange, false, 'affiliate')" :disabled="description[key] == null || description[key] == ''">Reprovar</button>
                            </div>
                          </div>
                          <div class="row  form-group">
                             <div class="col-xs-12">
                              <textarea placeholder="Digite o motivo da reprovação" v-model="description[key]"></textarea>
                             </div>
                           </div>
                        </div>
                        <div class="form-section form-group"  v-if="key == 'contact' && pending.exchange !== null">
                          <h2>Dados de Contato</h2>
                          <div class="row">
                            <div class="col-xs-12">
                              <table id="tabelaCompararAlteracao">
                                <thead>
                                  <th>Atual</th>
                                  <th>Alteração (Log <span v-if="key == 'contact' && pending.exchange !== undefined">{{pending.exchange.logDataId}}</span>)</th>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>
                                      <!-- <p>{{pending.current}}</p> -->
                                      <table class="current">
                                        <tr v-for="(atual, key, index) in pending.current" :key="index" v-if="key != 'id' && key != 'logDataId'">
                                          <td>{{labels[key]}}:</td>
                                          <td>{{atual}}</td>
                                        </tr>
                                      </table>
                                    </td>
                                    <td>
                                      <table class="exchange">
                                        <tr v-for="(pendingInterno, key1, index1) in pending.exchange" :key="index1" v-if="key1 != 'id' && key1 != 'logDataId'" :class="{'infoHasChanged': pending.exchange[key1] != pending.current[key1]}">
                                          <td>{{labels[key1]}}:</td>
                                          <td>{{pendingInterno}}</td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <!-- <div class="tipo col-xs-6" v-for="(pendingInterno, key1, index1) in pending.exchange" :key="index1" v-if="pendingInterno != null">
                              <p><strong>{{labels[key1]}}</strong> : {{pendingInterno}}</p>
                            </div> -->
                          </div>
                          <div class="row form-group">
                            <div class="col-xs-6">
                              <h3>Arquivos</h3>
                              <p v-if="pending.files.length <= 0" class="alert alert-danger">Não foram encontrados arquivos nessa solicitação.</p>
                              <ul class="filesList">
                                <li v-for="(file, key, index) in pending.files" :key="index" @click="getTargetAffiliateFile(file, index)"><span>{{file}} </span><span  class="glyphicon glyphicon-download downloadBtn"></span> </li>
                              </ul>
                            </div>
                          </div>
                          <div class="row  form-group">
                            <div class="col-xs-6  col-sm-6 col-md-6 ">
                              <button @click="aprove(pending.exchange, true, 'contact')">Aprovar</button>
                            </div>
                            <div class="col-xs-6  col-sm-6 col-md-6 ">
                              <button @click="aprove(pending.exchange, false, 'contact')" :disabled="description[key] == null || description[key] == ''">Reprovar</button>
                            </div>
                          </div>
                           <div class="row  form-group">
                             <div class="col-xs-12">
                              <textarea placeholder="Digite o motivo da reprovação" v-model="description[key]"></textarea>
                             </div>
                           </div>
                        </div>
                        <div class="form-section form-group"  v-if="key == 'financial' && pending.exchange !== null">
                          <h2>Domicílio Bancário</h2>
                          <div class="row">
                            <div class="col-xs-12">
                              <table id="tabelaCompararAlteracao">
                                <thead>
                                  <th>Atual</th>
                                  <th>Alteração (Log <span v-if="key == 'financial' && pending.exchange !== undefined">{{pending.exchange.logDataId}}</span>)</th>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>
                                      <table class="current">
                                        <tr v-for="(atual, key, index) in pending.current" :key="index" v-if="key != 'id' && key != 'logDataId'">
                                          <td>{{labels[key]}}:</td>
                                          <td>{{atual}}</td>
                                        </tr>
                                      </table>
                                    </td>
                                    <td>
                                      <table class="exchange">
                                        <tr v-for="(pendingInterno, key1, index1) in pending.exchange" :key="index1" v-if="key1 != 'id' && key1 != 'logDataId'">
                                          <td>{{labels[key1]}}:</td>
                                          <td>{{pendingInterno}}</td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <!-- <div class="tipo col-xs-6" v-for="(pendingInterno, key1, index1) in pending.exchange" :key="index1" v-if="pendingInterno != null">
                              <p><strong>{{labels[key1]}}</strong> : {{pendingInterno}}</p>
                            </div> -->
                          </div>
                          <div class="row form-group">
                            <div class="col-xs-6">
                              <h3>Arquivos</h3>
                              <p v-if="pending.files.length <= 0" class="alert alert-danger">Não foram encontrados arquivos nessa solicitação.</p>
                              <ul class="filesList">
                                <li v-for="(file, key, index) in pending.files" :key="index" @click="getTargetAffiliateFile(file, index)"><span>{{file}} </span><span class="glyphicon glyphicon-download downloadBtn"></span> </li>
                              </ul>
                            </div>
                          </div>
                          <div class="row  form-group">
                           <div class="col-xs-6  col-sm-6 col-md-6 ">
                            <button @click="aprove(pending.exchange, true, 'financial')">Aprovar</button>
                          </div>
                           <div class="col-xs-6  col-sm-6 col-md-6 ">
                            <button @click="aprove(pending.exchange, false, 'financial')" :disabled="description[key] == null || description[key] == ''">Reprovar</button>
                           </div>
                          </div>
                          <div class="row  form-group">
                             <div class="col-xs-12">
                              <textarea placeholder="Digite o motivo da reprovação" v-model="description[key]"></textarea>
                             </div>
                           </div>
                        </div>


                      </div>

                    </td>
                  </tr>
                </table>
              </td>

            </tr>
          </tbody>
        </table>
      </div>

    </content-section>

    <!-- <content-section>
      <div slot="content">
        <div v-for="(pending, key, index) in pendingSelected" :key="index">
          <p>{{key}}: {{pending}}</p>
        </div>
      </div>
    </content-section> -->

    <content-section id="loading-gif" v-show="controls.loading">
      <img slot="content" src="~assets/img/loading.gif" alt="">
    </content-section>
  </div>
</template>

<script>
import contentSection from "~/components/mainContentSection.vue";

export default {
  components: {
    contentSection,
  },
  data() {
    return {
      controls: {
        loading: true,
      },
      pendingSummary: [],
      pendingSelected: {
        affiliate: [],
        financial: [],
        contact: [],
      },
      index: null,
      id: null,
      area: null,
      description: [],
      aproveDescription: true,
      labels: {
        fullName: "Nome Completo",
        birthDate: "Data de Nascimento",
        simpleName: "Nome",
        document: "Documento",
        agency: "Agência",
        bankID: "Banco",
        agencyCode: "Dígito agência",
        account: "Conta",
        accountCode: "Dígito conta",
        addressStreetName: "Rua/Logradouro",
        addressNumber: "Número",
        addressAdditionalData: "Dados adicionais",
        addressPostalCode: "CEP",
        addressNeighborhood: "Bairro",
        cityID: "Cidade",
        id: "ID",
        contactTypeID: "Tipo de contato",
        logDataId: "ID da alteração",
        accountTypeID: "Tipo de conta",
        state: "Estado",
      },
      bancos: [
        {
          ID: 262,
          Name: "Banco Bankpar S.A.",
          Code: 0,
        },
        {
          ID: 293,
          Name: "Banco do Brasil S.A.",
          Code: 1,
        },
        {
          ID: 289,
          Name: "Banco da Amazônia S.A.",
          Code: 3,
        },
        {
          ID: 297,
          Name: "Banco do Nordeste do Brasil S.A.",
          Code: 4,
        },
        {
          ID: 327,
          Name: "Banco Standard de Investimentos S.A.",
          Code: 12,
        },
        {
          ID: 355,
          Name: "Natixis Brasil S.A. Banco Múltiplo",
          Code: 14,
        },
        {
          ID: 333,
          Name: "BANESTES S.A. Banco do Estado do Espírito Santo",
          Code: 21,
        },
        {
          ID: 260,
          Name: "Banco BANDEPE S.A.",
          Code: 24,
        },
        {
          ID: 258,
          Name: "Banco Alfa S.A.",
          Code: 25,
        },
        {
          ID: 261,
          Name: "Banco Banerj S.A.",
          Code: 29,
        },
        {
          ID: 265,
          Name: "Banco Beg S.A.",
          Code: 31,
        },
        {
          ID: 325,
          Name: "Banco Santander (Brasil) S.A.",
          Code: 33,
        },
        {
          ID: 272,
          Name: "Banco Bradesco BBI S.A.",
          Code: 36,
        },
        {
          ID: 295,
          Name: "Banco do Estado do Pará S.A.",
          Code: 37,
        },
        {
          ID: 356,
          Name: "Banco do Estado do Piauí S.A. - BEP",
          Code: 39,
        },
        {
          ID: 279,
          Name: "Banco Cargill S.A.",
          Code: 40,
        },
        {
          ID: 296,
          Name: "Banco do Estado do Rio Grande do Sul S.A.",
          Code: 41,
        },
        {
          ID: 316,
          Name: "Banco Opportunity S.A.",
          Code: 45,
        },
        {
          ID: 294,
          Name: "Banco do Estado de Sergipe S.A.",
          Code: 47,
        },
        {
          ID: 346,
          Name: "Hipercard Banco Múltiplo S.A.",
          Code: 62,
        },
        {
          ID: 302,
          Name: "Banco Ibi S.A. Banco Múltiplo",
          Code: 63,
        },
        {
          ID: 345,
          Name: "Goldman Sachs do Brasil Banco Múltiplo S.A.",
          Code: 64,
        },
        {
          ID: 271,
          Name: "Banco Bracce S.A.",
          Code: 65,
        },
        {
          ID: 339,
          Name: "BPN Brasil Banco Múltiplo S.A.",
          Code: 69,
        },
        {
          ID: 341,
          Name: "BRB - Banco de Brasília S.A.",
          Code: 70,
        },
        {
          ID: 336,
          Name: "BB Banco Popular do Brasil S.A.",
          Code: 73,
        },
        {
          ID: 310,
          Name: "Banco J. Safra S.A.",
          Code: 74,
        },
        {
          ID: 257,
          Name: "Banco ABN AMRO S.A.",
          Code: 75,
        },
        {
          ID: 372,
          Name: "Banco Intermedium S.A.",
          Code: 77,
        },
        {
          ID: 338,
          Name: "BES Investimento do Brasil S.A.-Banco de Investimento",
          Code: 78,
        },
        {
          ID: 357,
          Name: "Unicred Norte do Paraná",
          Code: 84,
        },
        {
          ID: 358,
          Name: "Cooperativa Central de Crédito Urbano-CECRED",
          Code: 85,
        },
        {
          ID: 359,
          Name: "OBOE Crédito Financiamento e Investimento S.A.",
          Code: 86,
        },
        {
          ID: 370,
          Name: "Cooperativa Unicred Central Santa Catarina",
          Code: "087-6",
        },
        {
          ID: 360,
          Name: "Cooperativa de Crédito Rural da Região de Mogiana",
          Code: 89,
        },
        {
          ID: 361,
          Name:
                "Cooperativa Central de Economia e Crédito Mutuo das Unicreds",
          Code: 91,
        },
        {
          ID: 362,
          Name: "Brickell S.A. Crédito, financiamento e Investimento",
          Code: 92,
        },
        {
          ID: 284,
          Name: "Banco Confidence de Câmbio S.A.",
          Code: 95,
        },
        {
          ID: 266,
          Name: "Banco BM&FBOVESPA de Serviços de Liquidação e Custódia S.A",
          Code: 96,
        },
        {
          ID: 363,
          Name: "Cooperativa Central de Crédito Noroeste Brasileiro Ltda.",
          Code: 97,
        },
        {
          ID: 364,
          Name: "Credicorol Cooperativa de Crédito Rural",
          Code: 98,
        },
        {
          ID: 342,
          Name: "Caixa Econômica Federal",
          Code: 104,
        },
        {
          ID: 264,
          Name: "Banco BBM S.A.",
          Code: 107,
        },
        {
          ID: 332,
          Name: "Banco Western Union do Brasil S.A.",
          Code: 119,
        },
        {
          ID: 377,
          Name: "Banco Agibank S.A.",
          Code: 121,
        },
        {
          ID: 340,
          Name: "Brasil Plural S.A. - Banco Múltiplo",
          Code: 125,
        },
        {
          ID: 371,
          Name: "CC Confesol",
          Code: 133,
        },
        {
          ID: 368,
          Name: "Confederacao Nacional das Cooperativas Centrais UNICREDS",
          Code: 136,
        },
        {
          ID: 365,
          Name: "HSBC Finance (Brasil) S.A. - Banco Múltiplo",
          Code: 168,
        },
        {
          ID: 307,
          Name: "Banco Itaú BBA S.A.",
          Code: 184,
        },
        {
          ID: 273,
          Name: "Banco Bradesco Cartões S.A.",
          Code: 204,
        },
        {
          ID: 276,
          Name: "Banco BTG Pactual S.A.",
          Code: 208,
        },
        {
          ID: 317,
          Name: "Banco Original S.A.",
          Code: 212,
        },
        {
          ID: 292,
          Name: "Banco Dibens S.A.",
          Code: 214,
        },
        {
          ID: 283,
          Name: "Banco Comercial e de Investimento Sudameris S.A.",
          Code: 215,
        },
        {
          ID: 311,
          Name: "Banco John Deere S.A.",
          Code: 217,
        },
        {
          ID: 270,
          Name: "Banco Bonsucesso S.A.",
          Code: 218,
        },
        {
          ID: 287,
          Name: "Banco Credit Agricole Brasil S.A.",
          Code: 222,
        },
        {
          ID: 299,
          Name: "Banco Fibra S.A.",
          Code: 224,
        },
        {
          ID: 281,
          Name: "Banco Cifra S.A.",
          Code: 233,
        },
        {
          ID: 275,
          Name: "Banco Bradesco S.A.",
          Code: 237,
        },
        {
          ID: 256,
          Name: "Banco ABC Brasil S.A.",
          Code: 246,
        },
        {
          ID: 269,
          Name: "Banco Boavista Interatlântico S.A.",
          Code: 248,
        },
        {
          ID: 306,
          Name: "Banco Investcred Unibanco S.A.",
          Code: 249,
        },
        {
          ID: 337,
          Name: "BCV - Banco de Crédito e Varejo S.A.",
          Code: 250,
        },
        {
          ID: 352,
          Name: "Paraná Banco S.A.",
          Code: 254,
        },
        {
          ID: 376,
          Name: "Nu Pagamentos",
          Code: 260,
        },
        {
          ID: 277,
          Name: "Banco Cacique S.A.",
          Code: 263,
        },
        {
          ID: 298,
          Name: "Banco Fator S.A.",
          Code: 265,
        },
        {
          ID: 267,
          Name: "Banco BMG S.A.",
          Code: 318,
        },
        {
          ID: 304,
          Name: "Banco Industrial e Comercial S.A.",
          Code: 320,
        },
        {
          ID: 350,
          Name: "Itaú Unibanco S.A.",
          Code: 341,
        },
        {
          ID: 322,
          Name: "Banco Real S.A.",
          Code: 356,
        },
        {
          ID: 326,
          Name: "Banco Société Générale Brasil S.A.",
          Code: 366,
        },
        {
          ID: 314,
          Name: "Banco Mizuho do Brasil S.A.",
          Code: 370,
        },
        {
          ID: 309,
          Name: "Banco J. P. Morgan S.A.",
          Code: 376,
        },
        {
          ID: 313,
          Name: "Banco Mercantil do Brasil S.A.",
          Code: 389,
        },
        {
          ID: 274,
          Name: "Banco Finasa BMC S.A.",
          Code: 394,
        },
        {
          ID: 347,
          Name: "HSBC Bank Brasil S.A. - Banco Múltiplo",
          Code: 399,
        },
        {
          ID: 354,
          Name: "UNIBANCO - União de Bancos Brasileiros S.A.",
          Code: 409,
        },
        {
          ID: 324,
          Name: "Banco Safra S.A.",
          Code: 422,
        },
        {
          ID: 291,
          Name: "Banco de Tokyo-Mitsubishi UFJ Brasil S.A.",
          Code: 456,
        },
        {
          ID: 328,
          Name: "Banco Sumitomo Mitsui Brasileiro S.A.",
          Code: 464,
        },
        {
          ID: 278,
          Name: "Banco Caixa Geral - Brasil S.A.",
          Code: 473,
        },
        {
          ID: 343,
          Name: "Citibank S.A.",
          Code: 477,
        },
        {
          ID: 308,
          Name: "Banco ItaúBank S.A",
          Code: 479,
        },
        {
          ID: 344,
          Name: "Deutsche Bank S.A. - Banco Alemão",
          Code: 487,
        },
        {
          ID: 351,
          Name: "JPMorgan Chase Bank",
          Code: 488,
        },
        {
          ID: 348,
          Name: "ING Bank N.V.",
          Code: 492,
        },
        {
          ID: 288,
          Name: "Banco Credit Suisse (Brasil) S.A.",
          Code: 505,
        },
        {
          ID: 373,
          Name: "Unicred União",
          Code: 582,
        },
        {
          ID: 312,
          Name: "Banco Luso Brasileiro S.A.",
          Code: 600,
        },
        {
          ID: 303,
          Name: "Banco Industrial do Brasil S.A.",
          Code: 604,
        },
        {
          ID: 331,
          Name: "Banco VR S.A.",
          Code: 610,
        },
        {
          ID: 319,
          Name: "Banco Paulista S.A.",
          Code: 611,
        },
        {
          ID: 318,
          Name: "Banco Panamericano S.A.",
          Code: 623,
        },
        {
          ID: 300,
          Name: "Banco Ficsa S.A.",
          Code: 626,
        },
        {
          ID: 323,
          Name: "Banco Rendimento S.A.",
          Code: 633,
        },
        {
          ID: 329,
          Name: "Banco Triângulo S.A.",
          Code: 634,
        },
        {
          ID: 378,
          Name: "Banco Sofisa S.A.",
          Code: 637,
        },
        {
          ID: 259,
          Name: "Banco Alvorada S.A.",
          Code: 641,
        },
        {
          ID: 320,
          Name: "Banco Pine S.A.",
          Code: 643,
        },
        {
          ID: 349,
          Name: "Itaú Unibanco Holding S.A.",
          Code: 652,
        },
        {
          ID: 305,
          Name: "Banco Indusval S.A.",
          Code: 653,
        },
        {
          ID: 330,
          Name: "Banco Votorantim S.A.",
          Code: 655,
        },
        {
          ID: 290,
          Name: "Banco Daycoval S.A.",
          Code: 707,
        },
        {
          ID: 334,
          Name: "Banif-Banco Internacional do Funchal (Brasil)S.A.",
          Code: 719,
        },
        {
          ID: 375,
          Name: "Banco Neon",
          Code: 735,
        },
        {
          ID: 280,
          Name: "Banco Cetelem S.A.",
          Code: 739,
        },
        {
          ID: 263,
          Name: "Banco Barclays S.A.",
          Code: 740,
        },
        {
          ID: 366,
          Name: "Banco Ribeirão Preto S.A.",
          Code: 741,
        },
        {
          ID: 282,
          Name: "Banco Citibank S.A.",
          Code: 745,
        },
        {
          ID: 315,
          Name: "Banco Modal S.A.",
          Code: 746,
        },
        {
          ID: 321,
          Name: "Banco Rabobank International Brasil S.A.",
          Code: 747,
        },
        {
          ID: 286,
          Name: "Banco Cooperativo Sicredi S.A.",
          Code: 748,
        },
        {
          ID: 353,
          Name: "Scotiabank Brasil S.A. Banco Múltiplo",
          Code: 751,
        },
        {
          ID: 268,
          Name: "Banco BNP Paribas Brasil S.A.",
          Code: 752,
        },
        {
          ID: 367,
          Name: "NBC Bank Brasil S.A. - Banco Múltiplo",
          Code: 753,
        },
        {
          ID: 335,
          Name: "Bank of America Merrill Lynch Banco Múltiplo S.A.",
          Code: 755,
        },
        {
          ID: 285,
          Name: "Banco Cooperativo do Brasil S.A. - BANCOOB",
          Code: 756,
        },
        {
          ID: 374,
          Name: "Banco Viacredi S.A.",
          Code: 850,
        },
        {
          ID: 369,
          Name: "Banco Teste",
          Code: 999,
        },
      ],
    };
  },
  mounted() {
    const self = this;

    self.$axios
      .get(`${process.env.API_AFFILIATE}/pendingApprovals/summary`)
      .then((response) => {
        self.controls.loading = false;
        if (response.status == 200) {
          self.pendingSummary = response.data;
          self.pendingSummary.map((item) => {
            item.dataPending = null;
          });
        }
      }).catch((err) => { console.log("Err:", err); return false; });
    // .catch((error) => {
    //   self.$nuxt.$emit("toggleModal", {
    //     api: "erro",
    //     code: error.status,
    //     modalContent: error,
    //   });
    // });
  },
  methods: {
    remounted() {
      const self = this;
      self.$axios
        .get(`${process.env.API_AFFILIATE}/pendingApprovals/summary`)
        .then((response) => {
          self.controls.loading = false;
          if (response.status == 200) {
            self.pendingSummary = response.data;
            self.pendingSummary.map((item) => {
              item.dataPending = null;
            });
          }
        }).catch((err) => { console.log("Err:", err); return false; });
      // .catch((error) => {
      //   self.$nuxt.$emit("toggleModal", {
      //     api: "erro",
      //     code: error.status,
      //     modalContent: error,
      //   });
      // });
    },
    getTargetAffiliateFile(fileID) {
      const self = this;
      self.$axios
        .get(`${process.env.API_AFFILIATE}/affiliates/files/${fileID}`, {
          responseType: "blob",
        })
        .then((response) => {
          // console.log(response);
          const headers = response.headers;
          // console.log(headers);
          const blob = new Blob([response.data], { type: headers["content-type"] });
          // const disposition = headers["content-disposition"].split(";");
          // const filename = disposition.filter(x => x.indexOf("filename=") != -1)[0];
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.setAttribute("download", fileID);
          link.click();
        }).catch((err) => { console.log("Err:", err); return false; });
      // .catch((error) => {
      //   self.$nuxt.$emit("toggleModal", {
      //     api: "erro",
      //     code: error.status,
      //     modalContent: error,
      //   });
      // });
    },
    details(index, id) {
      const self = this;
      let cityID;
      let varredura;
      this.index = index;
      this.id = id;
      this.description = [];
      let selectedBank;

      self.$axios.get(`${process.env.API_AFFILIATE}/pendingApprovals/details?affiliateId=${id}`)
        .then((response) => {
          self.pendingSelected = response.data;
          varredura = response.data;

          // console.log("varredura", varredura);

          if (varredura.contact.exchange) {
            if (varredura.contact.exchange.cityID) {
              exchangeCityID = varredura.contact.exchange.cityID;
              currentCityID = varredura.contact.current.cityID;
              self.$axios.get(`${process.env.API_CEP}/ZipCode/city/${exchangeCityID}`).then((response) => {
                self.pendingSelected.contact.exchange.cityID = response.data.cityName;
                self.pendingSelected.contact.exchange.state = response.data.stateName;
              }).catch((err) => { console.log("Err:", err); return false; });
              self.$axios.get(`${process.env.API_CEP}/ZipCode/city/${currentCityID}`).then((response) => {
                self.pendingSelected.contact.current.cityID = response.data.cityName;
                self.pendingSelected.contact.current.state = response.data.stateName;
              }).catch((err) => { console.log("Err:", err); return false; });
            }
          }

          // varredura.contact.exchange.bankID
          // console.log(varredura.financial.exchange);
          if (varredura.financial.exchange) {
            if (varredura.financial.exchange.bankID) {
              selectedBank = self.bancos.filter(x => (x.ID == varredura.financial.exchange.bankID));
              self.pendingSelected.financial.exchange.bankID = selectedBank[0].Name;
            }
            if (varredura.financial.current.bankID) {
              selectedBank = self.bancos.filter(x => (x.ID == varredura.financial.current.bankID));
              self.pendingSelected.financial.current.bankID = selectedBank[0].Name;
            }
            if (varredura.financial.exchange.accountTypeID) {
              switch (varredura.financial.exchange.accountTypeID) {
                case 1: self.pendingSelected.financial.exchange.accountTypeID = "Conta Corrente - Individual";
                  break;
                case 2: self.pendingSelected.financial.exchange.accountTypeID = "Conta Corrente - Conjunta";
                  break;
                case 3: self.pendingSelected.financial.exchange.accountTypeID = "Conta Poupança - Individual";
                  break;
                case 4: self.pendingSelected.financial.exchange.accountTypeID = "Conta Poupança - Conjunta";
                  break;
              }
            }
            if (varredura.financial.current.accountTypeID) {
              switch (varredura.financial.current.accountTypeID) {
                case 1: self.pendingSelected.financial.current.accountTypeID = "Conta Corrente - Individual";
                  break;
                case 2: self.pendingSelected.financial.current.accountTypeID = "Conta Corrente - Conjunta";
                  break;
                case 3: self.pendingSelected.financial.current.accountTypeID = "Conta Poupança - Individual";
                  break;
                case 4: self.pendingSelected.financial.current.accountTypeID = "Conta Poupança - Conjunta";
                  break;
              }
            }
          }
        }).catch((err) => { console.log("Err:", err); return false; });
      // .catch((error) => {
      //   self.$nuxt.$emit("toggleModal", {
      //     api: "erro",
      //     code: error.response.status,
      //     modalContent: error,
      //   });
      // });
    },

    aprove(dado, ok, area) {
      const self = this;
      const reason = this.description[area];

      // eslint-disable-next-line no-debugger
      // debugger;

      if (self.pendingSelected[area].exchange.logDataId == dado.logDataId) {
        delete self.pendingSelected[area].exchange;
      }

      this.details(self.index, self.id);


      self.$axios
        .put(`${process.env.API_AFFILIATE}/affiliates/ExchangeRequestValidation`, {
          logDataId: dado.logDataId,
          description: reason,
          statusAproval: ok,
        })
        .then((response) => {
          self.description = [];
          this.remounted();
        }).catch((err) => { console.log("Err:", err); return false; });
      // .catch((error) => {
      //   self.$nuxt.$emit("toggleModal", {
      //     api: "erro",
      //     code: error.status,
      //     modalContent: error,
      //   });
      // });
    },
  },

};
</script>

<style lang="less">
@import "~assets/main.less";
@import "~assets/vars.less";

.listagem {
          width: 100%;
          thead {
            th {
              font-size: 15px;
              font-family: @mainFontBold;
              padding: 18px 0;
              text-align: left;
            }
          }
          .itensListagem{
            width: 100%;
            border: 1px #bbb solid;
            border-top: none;
            &:first-child{
              border-top:  1px #bbb solid;
            }
            #exchangeDetails {
              width: 100%;
              & > tr {
                &:first-child{
                  background-color: @color20;
                  &:hover{
                    background-color:  #ababab57;
                  }
                }

                &.openDetails {
                  cursor: pointer;
                }
              }
            }
          }
          .item{
            width: 10%;
            span {
              text-decoration:underline;
            }
          }
          .colName{
            width: 50%;
          }
          tbody {
            // tr {


            //   // &:nth-child(even) {
            //   //   // background-color: @color20;
            //   //   // border: #bbb solid 1px;
            //   // }

            //   // &:last-child:nth-child(odd) {
            //   //   // border-bottom: 1px solid @color14;
            //   // }
            // }
            td{
              div{
                // border: #000 solid 1px;
                div.tipo {
                  list-style-type: none;
                  padding-left: 2px;
                  margin: 0;
                  border:none;
                }
              }

            }
          }
        }
.page-aprovacoes {
  min-height: 200px;
  width: 100%;

  &#conteudo-aprovacoes {
    .filesList {
      span {
        cursor: pointer;

      }
    }
    #loading-gif {
      text-align: center;
      img {
        min-height: 80px;
        margin: 50px;
      }
    }
  }

  #tabelaCompararAlteracao {
    width: 100%;

    thead {
      th {
        width: 50%;
      }
    }

    tbody {
      tr {
        .current, .exchange {
          width: 100%;
          tr {
            &:nth-child(odd) {
              background-color: @color20;
            }

            td {
              width: 80%;

              &:first-child {
                width: 20%;
              }
            }
          }
        }
        .current {
          border-right: 5px solid @color2
        }
        .exchange {
          .infoHasChanged {
            font-weight: bold;
            color: @color24;
          }
        }
      }
    }
  }
}
</style>
