<template>
    <transition name="page">
        <div class="container-fluid">
            <div id="header-container" class="row">
                <div class="col-xs-2 btn-back "><a onclick="history.back()" class="glyphicon glyphicon-arrow-left"></a></div>
                <div class="col-xs-8 logoListo"><img src="~assets/img/logo-listofacil.svg"></div>
                <div class="col-xs-2 duvidas"><a href="#" id="btn-duvidas"><img src="~assets/img/user-data-headset.svg"></a></div>
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

  // @media (min-width: @screen-sm-min) {display: none;}
}
</style>
