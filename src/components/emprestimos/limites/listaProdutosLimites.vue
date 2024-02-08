<template>
  <div class="page-emprestimos page-emprestimos-lista-produtos-limites">
    <div class="panel panel-default" v-if="!controls.loading">
      <div class="panel-heading">
        {{text.panelTitle}}
      </div>
      <form class="panel-body" @submit.prevent="startNewLoan()" v-if="controls.loadedLimits">
        <div class="emprestimo row form-group" v-for="(item, index) in content.emprestimos" :key="index">
          <!-- <p>{{item}}</p> -->
          <!-- <p>{{item.balance / item.limit}}</p> -->


          <div class="col-xs-2 col-sm-2" style="text-align:center;">
            <p><strong>{{item.productName}}</strong></p>
            <!-- <label style="text-align:center;" :for="`emprestimo-${item.fullName}-${index + 1}`">
              <input type="radio" name="emprestimo-type" :id="`emprestimo-${item.fullName}-${index + 1}`" :value="item.id + index" v-model="loanType">
              {{item.productName}}</label> -->
          </div>

          <div class="col-xs-8 col-sm-9">
            <div class="progress">
              <div class="progress-bar" :class="{'progress-bar-default': (item.balance / item.limit) > 0.25, 'progress-bar-low': (item.balance / item.limit) <= 0.25, 'progress-bar-critic': (item.balance / item.limit) <= 0.1}" role="progressbar" :style="{ width: (item.balance / item.limit) * 100 + '%' }" :aria-valuenow="(item.balance / item.limit) * 100" aria-valuemin="0" :aria-valuemax="item.limit">
                <span v-if="(item.balance / item.limit) >= 0.25">{{getValueAsCurrency(item.balance)}}</span>
              </div>
              <span class="limite-min">{{getValueAsCurrency(0)}}</span>
              <span class="limite-max">{{getValueAsCurrency(item.limit)}}</span>
              <span v-if="(item.balance / item.limit) < 0.25">{{getValueAsCurrency(item.balance)}}</span>
            </div>
          </div>

        </div>

        <div class="row">
          <div class="col-xs-12 form-button pull-right">
            <!-- <p>Loan: {{loanType}}</p> -->
            <button type="submit">{{text.novoEmprestimo}}</button>
          </div>
        </div>
      </form>
      <div class="panel-body" v-else>
        <p>{{text.erroLimites}}</p>
      </div>
    </div>

    <div class="page-emprestimos page-emprestimos-loading-gif" v-else>
      <img src="~assets/img/loading.gif" alt="Carregando...">
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      controls: {
        loading: true,
        loadedLimits: false,
      },
      text: {
        panelTitle: "Meus Limites",
        novoEmprestimo: "Novo empréstimo",
        erroLimites: "Não foi possível carregar suas informações de limites. Tente novamente.",
      },
      content: {
        emprestimos: [
          {
            id: 0,
            fullName: "Empréstimos KGC",
            productName: "Empréstimos",
            baseName: null,
            approvalName: null,
            level: null,
            consume: 1000,
            limit: 5000,
            balance: 4000,
          },
          {
            id: 0,
            fullName: "Crédito Consignado Listo XYZ",
            productName: "Crédito Consignado",
            baseName: null,
            approvalName: null,
            level: null,
            consume: 0,
            limit: 15000,
            balance: 3000,
          },
          {
            id: 0,
            fullName: "Crédito Consignado Listo XYZ",
            productName: "Crédito Consignado",
            baseName: null,
            approvalName: null,
            level: null,
            consume: 3000,
            limit: 15000,
            balance: 1000,
          },
        ],
      },
      loanType: null,
    };
  },
  computed: {
    getAffiliateID() {
      return $nuxt.$store.state.usuario.clientID ? $nuxt.$store.state.usuario.clientID : null;
    },
  },
  methods: {
    getValueAsCurrency(value) {
      return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    },
    startNewLoan() {
      const self = this;
      if (self.loanType !== null) {
        self.$nuxt.$store.commit("setLoanType", self.loanType);
      }
      $nuxt.$store.commit("setLoanCurrentTab", "transacao");
    },
  },
  mounted() {
    const self = this;

    self.loanType = null;
    self.$nuxt.$store.commit("setLoanType", self.loanType);

    self.$axios.get(`${process.env.API_CREDIT}/limits`).then((response) => {
      if (response.status == 200) {
        self.content.emprestimos = response.data;
        self.controls.loadedLimits = true;
      } else {
        self.controls.loadedLimits = false;
      }

      self.controls.loading = false;
    }).catch((error) => {
      self.controls.loading = false;
      self.controls.loadedLimits = false;
      return false;
    });
  },
};
</script>


<style lang="less">

.page-emprestimos {
  #form-limites {
    .progress {
      position: relative;
      overflow: unset;
      overflow-y: visible;
      margin-top: 20px;
      user-select: none;

      .limite-min, .limite-max {
        position: absolute;
      }

      .limite-min {
        top: -20px;
        left: 0;
      }

      .limite-max {
        top: -20px;
        right: 0;
      }


    }
  }
}


</style>
