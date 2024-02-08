<template>
  <div id="documento" class="form-definir-senha container-fluid">
    <!-- <p>{{$v}}</p> -->
    <!-- debug -->
    <h1 class="title">{{text.title}}</h1>
    <p class="description">{{text.infoText}}</p>
    <form @submit.prevent="enviaInfo" class="row">

      <div class="form-group col-xs-12" :class="{'form-invalid': $v.userDocument.$invalid}">

        
          
            <label for="documento">{{text.documento}}</label>
            <the-mask id="documento" v-model.trim="$v.userDocument.$model" :mask="['###.###.###-##', '##.###.###/####-##']"></the-mask>
          
        </div>
        <div class="form-group col-xs-12" :class="{'form-invalid': $v.affiliate.$invalid}">
         

          
            <label for="email">{{text.affiliate}}</label>
            <input id="email" type="text" v-model.trim="$v.affiliate.$model">
          
      </div>

      <div class="form-group col-xs-12">
        <div class="col-xs-12">
          <button type="submit" :disabled="$v.$invalid">ENVIAR</button>
        </div>

        <div class="col-xs-12" v-if="submitStatus">
          <div class="alert alert-warning" v-if="submitStatus == 'ENVIANDO'">Carregando</div>
          <div class="alert alert-danger" v-if="submitStatus == 'ERRO400' || submitStatus == 'ERRO204'">Não foi possível encontrar essa informação de cadastro.</div>
          <div class="alert alert-danger" v-if="submitStatus == 'ERRO500'">Não foi possível conectar com o servidor. Tente novamente.</div>
          <div class="alert alert-success" v-if="submitStatus == 'SUCESSO'">Uma mensagem foi enviada para {{userMaskedEmail}} com as instruções para definição de senha.</div>
        </div>

        <div class="col-xs-12">
          <nuxt-link to="/login">
            <button :disabled="submitStatus == 'ENVIANDO'">VOLTAR</button>
          </nuxt-link>
        </div>
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
import { TheMask } from "vue-the-mask";
import {
  required, email, helpers, minLength, requiredUnless,
} from "vuelidate/lib/validators";

const documento = value => (value.length == 11 || value.length == 14 ? true : false);

export default {
  data() {
    return {
      text: {
        title: "Solicitar nova senha",
        infoText: "Para solicitar uma nova senha preencha os dados abaixo. Você tem 30 minutos para acessar seu e-mail.",
        ou: "OU",
        documento: "CPF",
        affiliate: "Nº do cliente",
      },
      affiliate: "",
      userDocument: "",
      submitStatus: null,
      userMaskedEmail: null,
    };
  },
  components: {
    TheMask,
  },
  validations() {
    const self = this;

    return {
      affiliate: {
        // email,
        // minLength: minLength(4),
        required,
      },
      userDocument: {
        documento,
        required,
      },
    };
  },

  methods: {
    enviaInfo() {
      const self = this;

      self.submitStatus = "ENVIANDO";

      self.$axios
        .post(`${process.env.API_AFFILIATE}/login/SetLogin`, {
          document: self.userDocument,
          affiliateID: self.affiliate,
        })
        .then((response) => {
          // console.log(response);

          if (response.status == 200) {
            self.submitStatus = "SUCESSO";
            self.userMaskedEmail = response.data.email;
          } else if (response.status == 204) {
            self.submitStatus = "ERRO204";
          }
        })
        .catch((err) => {
          err.status == 400 ? self.submitStatus = "ERRO400" : self.submitStatus = "ERRO500";
        });
    },
  },
};
</script>
