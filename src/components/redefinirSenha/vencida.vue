<template>
  <div id="documento" class="form-definir-senha container-fluid">
    <!-- <p>{{$v}}</p> -->
    <!-- debug -->
    <h1 class="title">{{text.title}}</h1>
    <p class="description"  v-html="text.infoText"></p>
    <form @submit.prevent="enviaInfo" class="row">      
        <div class="form-group col-xs-12">
          <nuxt-link to="/redefinir-senha/info">
            <button>CONTINUAR</button>
          </nuxt-link>
        </div>
    </form>

  </div>
</template>

<style lang="less">
@import "~assets/vars.less";
@import "~assets/main.less";

.form-definir-senha {
  .title{
       font-family: @mainFontBold;
      font-size: @ftSizeBig;
      display: block;
      margin: 10px 0;
    } 
    .description {
      font-weight: bold;
    }
 &#documento {
   #separar-campos {
     margin: 0;
     position: relative;
     text-align: center;

     &:before, &:after {
       content: "";
       border: 0.5px solid @color10;
       width: 40%;
      //  height: 1px;
       position: absolute;
       top: 8px;
     }

     &:before {
       left: 15px;
     }

     &:after {
       right:15px;
     }
   }
 }
}

</style>

<script>
export default {
  data() {
    return {
      text: {
        title: "Seja Listo",
        infoText: "O tempo para a definição de sua senha expirou.<br>Clique em CONTINUAR para solicitar uma nova senha."        
      },      
    };
  },
};
</script>
