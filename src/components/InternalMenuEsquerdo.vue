<template>
  <div id="menuEsquerdo">
    <nav>
      <div class="miniLogo" v-if="menu !== false"></div>
      <div
        class="logo"
        v-if="
          menu !== true &&
            ($mq === 'laptop' || $mq === 'desktop' || $mq === 'bigScreen')
        "
      ></div>
      <component-menu-navegacao 
        :menuItensChild="menuItensAllowed"
      ></component-menu-navegacao>
    </nav>

    <a
      id="menu-button"
      v-if="
        menu !== true &&
          ($mq === 'laptop' || $mq === 'desktop' || $mq === 'bigScreen')
      "
      v-on:click="activeMenu"
      class="glyphicon glyphicon-menu-hamburger"
    ></a>

    <a
      v-if="menu == true && ($mq === 'mobile' || $mq === 'tablet')"
      v-on:click="activeMenu"
      class="buttonClose"
    >X</a>
  </div>
</template>


<style lang="less" scoped>
@import "../assets/vars.less";
@import "../assets/variables.less";

#menuEsquerdo {
  display: block;

  #menu-button {
    text-align: center;
    background-color: @color5;
    height: 50px;
    width: 50px;
    position: absolute;
    display: inline-block;
    top: 0;
    right: 0;
    box-sizing: border-box;
    padding-top: 16px;
    cursor: pointer;
    color: @color7;
    a {
      text-decoration: none;
    }
  }
  .logo {
    width: 155px;
    height: 37px;
    display: block;
    position: relative;
    background: transparent url("../assets/img/logo-listofacil.png") no-repeat
      scroll 0px 0px;
    background-size: contain;
    margin: 13px 0 0 27px;
  }
  .miniLogo {
    width: 23px;
    height: 23px;
    display: block;
    position: relative;
    background: transparent url("../assets/img/ico-listo-small.png") no-repeat
      scroll 0px 0px;
    background-size: contain;
    margin: 17px 0 10px 28px;
  }
  .buttonClose {
    background-color: @color12;
    color: @color2;
    font-size: @ftSizeLarge;
    padding: 2px 8px;
    width: 33px;
    position: absolute;
    display: inline-block;
    font-family: @mainFontBold;
    top: 0;
    right: 0;
    cursor: pointer;
  }
  nav {
    overflow-y: auto;
    height: 100vh;
    width: calc(100vw - 33px);
    position: absolute;
    display: block;
    left: 0;
    @media (max-width: @screen-xs-max) {
      width: calc(100vw);
    }
    @media (min-width: @screen-sm-min) {
      overflow-y: unset;
      height: auto;
      position: relative;
      width: calc(100vw);
    }
    @media (min-width: @screen-md-min) {
      overflow-y: unset;
      height: auto;
      position: relative;
    }
    @media (min-width: @screen-lg-min) {
      overflow-y: unset;
      height: auto;
      position: relative;
    }

    ul {
      position: relative;
      li {
        color: black;
      }
    }
  }
}
</style>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
import menuNavegacao from "./menuNavegacao.vue";
import { menuItensOptions } from "../utils/menu.utils";
import { ROLES } from "../enums/Roles";

const menuExport = {
  components: {
    "component-menu-navegacao": menuNavegacao
  },

  data() {
    return {
      menu: false,
      hasDetranService: false
    };
  },

  created() {
    this.$nuxt.$on("activeMenu", data => {
      this.menu = data;
    });
  },
  async mounted() {
    const self = this;
    const detranPayments = this.typesOfservices;
    if (detranPayments) {
      this.hasDetranService = detranPayments.find(
        service => service.serviceName === "DETRAN - Pagamento de Taxas"
      );
    }
    this.$nextTick(() => {
      this.menuItens.map(item => {});
    });
  },
  methods: {
    ...mapMutations(["startLoading", "finishLoading"]),
    activeMenu() {
      this.menu = this.menu == false ? true : false;
      this.$nuxt.$emit("activeMenu", this.menu);
    },
    checkUserPermission() {
      return menuItensOptions.filter(menuItem => {
        return this.userPermissions.includes(menuItem.code) || menuItem.code === ROLES.CUSTOMER_PANEL;
      });
    }
  },
  computed: {
    ...mapGetters({
      isUserOwner: "auth/isUserOwner",

    }),
    ...mapState(
      {
        typesOfservices: state => state.transaction.typesOfservices,
        transactionType: state => state.transaction.transactionTypes,
        fields: state => state.transaction.fields,
        enableEmprestimos: state => state.emprestimos.enabled,
        permissions: state => state.client.systemPermissions,
        userPermissions: state => state.client.userPermissions
      },
      ["afiliado"]
    ),
    menuItens() {
      return this.permissions
        .filter(permission => permission.isEnabled)
        .filter(permission => menuItensOptions.find(
            menuItemOption => permission.code === menuItemOption.code
        ))
        .map(permission => {
          return menuItensOptions.find(
            menuItemOption => permission.code === menuItemOption.code
          )
        });
    },
    menuItensAllowed() {
      if (this.isUserOwner) {
        return this.menuItens;
      } else {
        return this.checkUserPermission();
      }  
    },
  }
};

export default menuExport;
</script>
