<template>
  <div id="pagamentos-detran">
    <div class="row" :class="{'form-no-edit': controls.loading}">
      <div class="col-xs-6 col-sm-5 col-lg-4 form-input">
        <label for="state">{{content.text.label_state}}</label>
        <select name="state" id="state" v-model="controls.currentState" @change="selectState($event.target.value)">
          <option :value="null" disabled hidden>{{content.text.placeholder_state}}</option>
          <option v-for="(state, index) in content.states" :key="index" :value="state.uf" v-if="state.uf == 'sp' || state.uf == 'rj' || state.uf == 'mg'">{{state.stateName}}</option>
        </select>
      </div>
      <div class="col-xs-6 col-sm-7 col-lg-5 form-input">
        <label for="type">{{content.text.label_type}}</label>
        <select name="paymentType" id="paymentType" v-model="controls.currentType" :disabled="controls.currentState == null" @change="loadPayment">
          <option :value="null" disabled hidden>{{content.text.placeholder_type}}</option>
          <option v-for="(type, index) in content.types" :key="index" :value="type">{{type.toUpperCase()}}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: {
        text: {
          label_state: "Estado",
          placeholder_state: "Escolha o estado",
          label_type: "Tipo de pagamento",
          placeholder_type: "Escolha um pagamento",
        },
        states: null,
        types: ["ipva", "dpvat"],
      },
      controls: {
        currentState: null,
        currentType: null,
        loading: false,
      },
    };
  },
  methods: {
    // Armazena estado baseado na seleção
    selectState(val) {
      const self = this;
      self.controls.currentType = null;
      self.$nuxt.$emit("hidePayment");
    },

    // carrega as informações do pagamento selecionado
    loadPayment() {
      const self = this;
      const type = self.controls.currentType.toLowerCase();

      self.controls.loading = true;
      self.$nuxt.$emit("hidePayment");

      self.$nuxt.$emit("setPaymentType", {
        type: self.controls.currentType,
        state: self.controls.currentState,
      });
      self.$nuxt.$emit("showPayment");
      self.controls.loading = false;
    },

  },
  mounted() {
    const self = this;

    self.controls.loading = true;

    self.$axios
      .get(`${process.env.API_CEP}/ZipCode/country/1/states`)
      .then((response) => {
        // console.log(response.data);
        self.content.states = response.data;
        self.content.states.map((st) => {
          // console.log("st", st);
          st.uf = st.uf.trim().toLowerCase();
        });

        self.controls.loading = false;
      }).catch(err => console.log("Err:", err));
  },

  created() {
    const self = this;

    self.$nuxt.$on("newPayment", () => {
      self.controls.currentState = null;
      self.controls.currentType = null;
    });
  },
};
</script>
