<template>
  <form class="modal-editar-endereco container-fluid" :class="{'form-no-edit': controls.loading}" @submit.prevent="saveContactExchangeRequest">

    <div class="form-section">
      <div class="row form-group">
        <div class="col-xs-6">
          <label for="cep">{{text.cep}}</label>
          <the-mask :mask="'#####-###'" id="cep" v-model="userData.contact.addressPostalCode"></the-mask>
        </div>
        <div class="col-xs-2 col-lg-1 form-button">
          <label>&nbsp;</label>
          <button @click.prevent="searchAddressPostalCode(userData.contact.addressPostalCode)" :disabled="$v.userData.contact.addressPostalCode.$invalid"><span class="glyphicon glyphicon-search"></span></button>
        </div>
      </div>
    </div>

    <div class="form-section">
      <div class="row form-group">
        <div class="col-xs-6 col-lg-6">
          <label for="endereco">{{text.endereco}}</label>
          <input type="text" id="endereco" v-model="userData.contact.addressStreetName" :disabled="controls.validPostalCode">
        </div>
        <div class="col-xs-6 col-lg-3">
          <label for="numero">{{text.numero}}</label>
          <input type="number" id="numero" v-model="userData.contact.addressNumber" :disabled="!controls.enableAddressNumber">
        </div>
        <div class="col-xs-6 col-lg-3">
          <label for="complemento">{{text.complemento}}</label>
          <input type="text" id="complemento" v-model="userData.contact.addressAdditionalData" :disabled="!controls.enableAddressNumber">
        </div>
        <div class="col-xs-6 col-lg-6">
          <label for="bairro">{{text.bairro}}</label>
          <input type="text" id="bairro" v-model="userData.contact.addressNeighborhood" :disabled="controls.validPostalCode">
        </div>
        <div class="col-xs-6 col-lg-2">
          <label for="uf">{{text.uf}}</label>
          <select id="uf" @change="loadCitiesFrom(userData.contact.uf)" v-model="userData.contact.uf" :disabled="controls.validPostalCode">
            <option v-for="(state, index) in content.states" :key="index" :value="state.uf">{{state.uf}}</option>
          </select>
        </div>
        <div class="col-xs-6 col-lg-4">
          <label for="cidade">{{text.cidade}}</label>
          <select id="cidade" v-model="userData.contact.cityID" :disabled="controls.validPostalCode">
            <option v-for="(city, index) in content.cities" :key="index" :value="city.cityID">{{city.cityName}}</option>
          </select>
        </div>
      </div>
    </div>

    <div class="row form-group">
      <div class="col-xs-6">
        <label for="usuario">{{text.usuario}}</label>
        <input type="text" disabled :value="getCurrentUsername">
      </div>
      <div class="col-xs-6">
        <p></p>
        <file-upload :documentType="'AddressCheck'" :isEnabled="true"></file-upload>
      </div>
    </div>

    <div class="row form-group">
      <div class="col-xs-6 pull-right">
        <p></p>
        <button :disabled="$v.userData.contact.$invalid" type="submit">{{text.enviar}}</button>
      </div>
    </div>

    <div class="row form-group" v-if="controls.submitStatus !== null">
      <div class="alert alert-success" v-if="controls.submitStatus == 200">{{text.sucessoAlteracao}}</div>
      <div class="alert alert-danger" v-else>{{text.erroAlteracao}}</div>
    </div>

    <!-- <p>Prop {{endereco}}</p> -->
    <!-- <p>Contact {{userData.contact}}</p> -->
    <!-- <p>{{$v.userData.contact}}</p> -->
    <!-- <p>{{controls}}</p> -->
  </form>
</template>

<script>
import { TheMask, mask } from "vue-the-mask";
import { required, minLength, requiredIf } from "vuelidate/lib/validators";
import fileUpload from "../components/fileUpload.vue";

export default {
  data() {
    return {
      text: {
        cep: "CEP",
        endereco: "Endereço",
        numero: "Número",
        complemento: "Complemento",
        bairro: "Bairro",
        uf: "UF",
        cidade: "Cidade",
        enviar: "Enviar para análise",
        usuario: "Usuário",
        sucessoAlteracao: "Seu pedido de alteração de endereço será atendido em até 2 dias",
        erroAlteracao: "Não foi possível enviar sua solicitação.",
      },
      content: {
        states: [],
        cities: [],
      },
      controls: {
        loading: false,
        hasLoaded: false,
        formValidated: null,
        validPostalCode: true,
        submitStatus: null,
        enableAddressNumber: false,
      },
      userData: {
        contact: {
          cityID: null,
          addressPostalCode: null,
          addressStreetName: null,
          addressNumber: null,
          addressNeighborhood: null,
          uf: null,
        },
      },
    };
  },
  props: {
    endereco: {
      type: Object,
      required: true,
    },
  },
  components: {
    TheMask,
    fileUpload,
  },
  directives: {
    mask,
  },
  created() {
    const self = this;

    self.controls.loading = true;

    Object.keys(self.endereco).map((k) => {
      self.userData.contact[k] = self.endereco[k];
    });

    self.$nuxt.$store.commit("setComprovanteState", {
      status: false,
      type: "AddressCheck",
    });

    self.$axios
      .get(`${process.env.API_CEP}/ZipCode/country/1/states`)
      .then((response) => {
        self.content.states = response.data;

        if (self.userData.contact.uf != null) {
          let stateID;

          self.content.states.map((st) => {
            if (st.uf.trim() == self.userData.contact.uf.trim()) {
              stateID = st.stateID;
            }
          });

          self.$axios
            .get(`${process.env.API_CEP}/ZipCode/state/${stateID}/cities`)
            .then((response) => {
              self.content.cities = response.data;
              self.controls.loading = false;
            }).catch(err => console.log("Err:", err));
        }
      }).catch(err => console.log("Err:", err));
  },
  methods: {
    // carrega as cidades do estado selecionado
    loadCitiesFrom(state) {
      const self = this;

      self.controls.loading = true;

      const stateID = self.content.states.filter(st => st.uf == self.userData.contact.uf)[0].stateID;

      self.$axios.get(`${process.env.API_CEP}/ZipCode/state/${stateID}/cities`).then((response) => {
        self.content.cities = response.data;
        self.controls.loading = false;
        self.controls.enableAddressNumber = true;
      }).catch((err) => { console.log("Err:", err); return false; });
    },
    // salvar alterações
    saveContactExchangeRequest() {
      const self = this;

      self.$v.$touch();

      self.controls.formValidated = !self.$v.$invalid;

      if (self.controls.formValidated) {
        self.controls.loading = true;
        self.$axios.post(`${process.env.API_AFFILIATE}/affiliateContacts/exchangeRequest/${self.userData.contact.id}`, self.userData.contact)
          .then((response) => {
            self.controls.loading = false;

            if (response.status == 200) {
              self.controls.submitStatus = 200;
              self.$nuxt.$store.commit("setComprovanteState", {
                status: false,
                type: "AddressCheck",
              });
              setTimeout(() => {
                self.$nuxt.$emit("toggleModal", null);
              }, 3000);
            } else {
              self.controls.submitStatus = response.status;
            }
          })
          .catch((error) => {
            // console.log(error);

            self.controls.loading = false;
            self.controls.submitStatus = error.status;
          });
      }
    },
    // busca CEP informado
    searchAddressPostalCode(cep) {
      const self = this;

      self.controls.loading = true;

      self.$axios.get(`${process.env.API_CEP}/ZipCode/${cep}`).then((response) => {
        // console.log(response);
        if (response.status == 200) {
          self.controls.validPostalCode = true;
          self.userData.contact.addressStreetName = `${response.data.streetType} ${response.data.streetName}`;
          self.userData.contact.addressNeighborhood = response.data.neighborhood;
          self.userData.contact.uf = response.data.state;
          self.userData.contact.cityID = response.data.cityID;
          self.userData.contact.addressNumber = null;
          self.userData.contact.addressAdditionalData = null;

          self.loadCitiesFrom(self.userData.contact.uf);
        } else {
          self.controls.validPostalCode = false;
          self.controls.loading = false;

          self.userData.contact.addressStreetName = null;
          self.userData.contact.addressNumber = null;
          self.userData.contact.addressAdditionalData = null;
          self.userData.contact.addressNeighborhood = null;
          self.userData.contact.cityID = null;
          self.userData.contact.uf = null;
        }
      }).catch((err) => { console.log("Err:", err); return false; });
    },
  },
  validations() {
    const self = this;

    return {
      userData: {
        contact: {
          cityID: {
            required,
          },
          addressPostalCode: {
            required,
            cepLength: minLength(8),
          },
          addressStreetName: {
            required,
          },
          addressNumber: {
            required,
          },
          addressNeighborhood: {
            required,
          },
          uf: {
            required,
          },
          file: {
            validateFile() {
              return self.$nuxt.$store.state.comprovantes.AddressCheck ? true : false;
            },
          },
        },
      },
    };
  },
  computed: {
    getCurrentUsername() {
      return $nuxt.$store.state.usuario.userName;
    },
  },
};
</script>

<style lang='less'>
@import "~assets/main.less";

.modal-editar-endereco {
  padding: 32px 0;
}

</style>
