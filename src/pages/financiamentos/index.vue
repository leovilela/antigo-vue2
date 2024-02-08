<template>
  <div class="container-fluid">
    <div class="row">
      <h1>Escolha o tipo de financiamento:</h1>
    </div>
    <div class="row">
      <ul>
        <li><nuxt-link to="/financiamentos/auto/"><span class="link-image" id="automobile"></span><span class="label">Automotivo</span></nuxt-link></li>
      </ul>
    </div>
  </div>
</template>
IDCardForm -> identidde

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

      &#automobile {
        background-image: url("~assets/img/car-for-sale.svg");
        background-position-y: 50%;
      }
      &#house {
        background-image: url("~assets/img/house.svg");
      }
    }
  }

}

</style>


<script>
import { ROLES } from '../../enums/Roles';
import checkAccess from '../../middleware/routeGuard';

export default {
  asyncData({redirect, store}) {
   if (!checkAccess(store, ROLES.FINANCING)) {
      redirect("/painel-do-cliente");
    }
  },
};
</script>
