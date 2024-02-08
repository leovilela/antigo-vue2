<template>
  <transition name="page">
    <div class="container-fluid">
      <div id="header-container" class="row">
        <div class="col-xs-2 btn-back "><a v-on:click="activeMenu" class="glyphicon glyphicon-menu-hamburger"></a></div>
        <div class="col-xs-8 logoListo"><img src="~assets/img/logo-listofacil.svg"></div>
        <div class="col-xs-2 pull-right btn-logout">
          <span @click="logout" class="glyphicon glyphicon-off"></span>
        </div>
        <!--div class="col-xs-4 duvidas"><div class="notificacao"><img class="profile-notifications" src="~/assets/img/ico-sino-mb.png" alt="notificacoes"><div class="nmsg">10</div></div><a href="#" id="btn-duvidas"><img src="~assets/img/user-data-headset.svg"></a></div-->
      </div>
    </div>
  </transition>
</template>

<style lang="less" scoped>
@import "~assets/vars.less";
@import "~assets/variables.less";

#header-container {
  background-color: black;
  box-sizing: border-box;
  padding: 10px 0;
  height: 50px;

  .duvidas {
    text-align: right;
  }

  .notificacao {
    position: relative;
    display: inline-block;
    margin-right: 10px;

    .nmsg {
      color: @color2;
      background-color: @color12;
      position: absolute;
      //width: 16px;
      height: 16px;
      border-radius: 130px;
      font-size: 10px;
      bottom: -2px;
      right: -7px;
      text-align: center;
      padding: 3px 3px 0px 3px;
    }
  }

  img {
    max-height: 30px;
  }

  .btn-back {
    text-align: center;
    margin-top: 5px;

    a {
      color: @color2;
      margin: 0;
      padding: 0;
      text-decoration: none;
    }
  }

  .btn-logout {
    padding-top: 5px;
    color: @color2;
    text-align: center;
    cursor: pointer;
  }

  .logoListo {
    bottom: 3px;
  }

  // @media (min-width: @screen-sm-min) {display: none;}
}
</style>

<script>
const menuExport = {
  data: () => ({
    menu: false,
  }),
  created() {
    this.$nuxt.$on("activeMenu", (data) => {
      this.menu = data;
    });
  },
  methods: {
    // uma função "getter" computada (computed getter)
    activeMenu() {
      // `this` aponta para a instância Vue da variável `vm`
      this.menu = this.menu == false ? true : false;
      this.$nuxt.$emit("activeMenu", this.menu);
    },
    logout() {
      this.$services.auth.logout();
    },
  },
};

export default menuExport;
</script>
