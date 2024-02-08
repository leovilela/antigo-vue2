<template>
  <div class="container-fluid"  v-if="detran.resultDetranPayments">
    <div class="row">
      <h1>Escolha o pagamento:</h1>
    </div>
    <div class="row">
      <ul>
        <li><nuxt-link to="/debitos-veiculares/detran/ipva"><span class="link-image" id="ipva"></span><span class="label">Detran</span></nuxt-link></li>
      </ul>
    </div>
  </div>
  <div class="container-fluid"  v-else>
    <div class="row">
      <h1>Operação não permitida</h1>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import "~assets/vars.less";
ul {
  list-style: none;
  padding: 0;


  li {
    padding: 16px 0;
    display: inline-block;

    a {
      color: @color1;
      font-size: @ftSizeLarge;
      margin-left: 16px;

      .label, .link-image {
        vertical-align: middle;
        display: inline-block;
      }

      .label {
        padding-left: 16px;
        padding-top: 8px;
      }
    }

    .link-image {
      background-size: contain;
      background-repeat: no-repeat;
      width: 48px;
      height: 48px;

      &#ipva {
        background-image: url("../../assets/img/icon_debveic.png");
      }
    }
  }

}

</style>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import checkAccess from '../../middleware/routeGuard';
import { ROLES } from "../../enums/Roles";

const menuExport = {
  asyncData({ redirect, store }) {
    if (!checkAccess(store, ROLES.VEHICLE_DEBITS)) {
      redirect("/painel-do-cliente");
    }
  },
  data() {
    return {
      detran: {
        resultDetranPayments: true,
      },

    };
  },
  async mounted() {
    const self = this;
    let resultDetranPayments = false;
    const detranPayments = this.typesOfservices;
    if (detranPayments) {
      resultDetranPayments = detranPayments.find(service => service.serviceName === "DETRAN - Pagamento de Taxas");
    } else {
      this.detran.resultDetranPayments = false;
    }
  },
  methods: {
    ...mapMutations(["startLoading", "finishLoading"]),
    // uma função "getter" computada (computed getter)
  },
  computed: {
    ...mapState({
      typesOfservices: state => state.transaction.typesOfservices,
      transactionType: state => state.transaction.transactionTypes,
      fields: state => state.transaction.fields,
    }),
  },
};

export default menuExport;
</script>
