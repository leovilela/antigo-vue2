<template>
    <div id="header-interna-desktop" class="container-fluid">

      <div v-if="menu !== false" class="col-xs-3" id="menu-button" v-on:click="activeMenu">
        <a class="glyphicon glyphicon-menu-hamburger"></a>
      </div>

      <div id="right-items" class="col-xs-6 pull-right">
        <div id="profile" class="pull-right col-xs-8 col-md-5">
          <p class="pull-right">
            <a href="#" class="profile-button" @click.prevent="toggleDropdown">{{text.meu_perfil}} <span class="glyphicon glyphicon-chevron-down"></span></a>
            <!-- <img class="profile-notifications" src="~/assets/img/ico-sino.png" alt="notificacoes"> -->
          </p>
          <div id="dropdown">
            <dropdown></dropdown>
          </div>
        </div>
      </div>
    </div>
</template>

<style lang="less" scoped>
@import "~assets/vars.less";
@import "~assets/variables.less";

#header-interna-desktop {
  height: 100%;
  padding-left: 0;
  transition: all 0.3s;

  #menu-button, #search, #right-items {
    height: inherit;
  }

  img {
    max-height: 24px;
  }

  #menu-button {
    background: @color5;
    max-width: 50px;
    cursor: pointer;
    transition: all 0.3s;
    text-align: center;

    a {
      color: @color7;
      text-decoration: none;
      vertical-align: middle;
      padding-top: 50%;
    }
  }

  #search {
    padding: 0;
    padding-top: 5px;

    * {
      display: inline-block;
    }

    & > div {
      height: inherit;
    }

    .search-icon {
      padding-top: 10px;
      min-width: 20px;
    }

    @media (min-width: @screen-sm) {
      max-width: 300px;
    }

  }

  #right-items {
    #separator, #pinpad-status, #profile {
      text-align: center;
      height: 100%;
      // overflow: hidden;

      & > * {
        display: inline-block;
        vertical-align: middle;
      }
    }

    #pinpad-status {
      div {
        & > * {
          display: inline-block;
          vertical-align: middle;
        }
      }
      @media (max-width: @screen-sm-max) {
        padding-top: 10px;
      }
    }

    #profile {
      position: relative;
      & > p {
        a {
          color: @color1;
          text-decoration: none;

          &:hover {
            color: @color1;
            text-decoration: none;
          }

          &:focus {
            outline: 0;
          }
        }
        & > * {
          vertical-align: top;
        }
      }
    }

    @media (max-width: @screen-sm-max) {
      max-width: 220px;
    }
    @media (min-width: @screen-md) {
      max-width: 320px;
    }
  }
}
</style>

<script>
import dropdown from "~/components/menuDropdown.vue";

const menuExport = {
  data: () => ({
    menu: false,
    pinpadStatus: false,
    dropdownControl: false,
    text: {
      o_que_procura: "O que você procura?",
      conectado: "Conectado",
      desconectado: "Desconectado",
      meu_perfil: "Meu perfil",
    },
  }),
  created() {
    this.$nuxt.$on("activeMenu", (data) => {
      this.menu = data;
    });

    this.$nuxt.$on("toggleDropdown", (data) => {
      // console.log("toggle", data);
      this.dropdownControl = data;
    });
  },
  methods: {
    // uma função "getter" computada (computed getter)
    activeMenu() {
      // `this` aponta para a instância Vue da variável `vm`
      this.menu = this.menu == false ? true : false;
      this.$nuxt.$emit("activeMenu", this.menu);
    },

    // abre o dropdown do perfil
    toggleDropdown() {
      this.dropdownControl = !this.dropdownControl;
      this.$nuxt.$emit("toggleDropdown", this.dropdownControl);
    },
  },
  components: {
    dropdown,
  },
};

export default menuExport;
</script>
