<template>
  <section id="page-suporte" slot="content">
    <!-- <h2>{{text.title}}</h2> -->
    <div class="panel panel-default">
      <div class="panel-heading">{{text.faleComigo}}</div>
      <div class="panel-body">
        <!-- <p>{{emailStatus}}</p> -->
        <form @submit.prevent>
          <div id="userInfo" class="row">
            <div class="col-xs-6">
              <p>
                <strong><span v-html="text.cliente"></span></strong>
                <span v-html="`[${$nuxt.$store.state.usuario.clientID}] ${$nuxt.$store.state.usuario.userName}`"></span>
              </p>
            </div>
          </div>

          <div class="row">
            <div class="col-xs-12 form-group" :class="{'form-invalid': form.subject.length <= 0}">
              <label for="subject">{{text.assunto}}</label>
              <input type="text" id="subject" v-model="form.subject">
            </div>
            <div class="col-xs-12 form-group" :class="{'form-invalid': form.body.length <= 0}">
              <label for="clientMessage">{{text.mensagem}}</label>
              <textarea id="clientMessage" v-model="form.body" :placeholder="text.placeholder"></textarea>
              <!-- <p>{{clientMessage}}</p> -->
            </div>
          </div>

          <div class="row">
            <div class="col-xs-12 form-button pull-right">
              <button id="emailButton" class="pull-right" :disabled="form.body.length <= 0 || form.subject.length <= 0 || loading || emailStatus != null" @click="sendClientMessage">{{text.botao}}</button>
            </div>
          </div>

          <div id="emailStatusMessage" class="row" v-if="emailStatus != null">
            <p class="sucesso" v-if="emailStatus == 200">{{text.sucesso}}</p>
            <p class="falha" v-else>{{text.falha}}</p>
          </div>
        </form>
      </div>
    </div>

  </section>
</template>

<style lang="less">
@import "~assets/vars.less";
@import "~assets/variables.less";

#page-suporte {
  .panel {
    .panel-heading {
      background-color:@color5;
      color: @color2;
      font-weight: bold;
    }
  }

  #clientMessage {
    resize: vertical;
    width: 100%;
    min-height: 120px;
    white-space: pre-wrap;
  }

  #emailStatusMessage {
    text-align: right;
    padding: 0 15px;
    // font-weight: bold;
    .sucesso {
      color: @color11;
    }
    .falha {
      color: @color24;
    }
  }

  #emailButton {
    background-color: @color2;
    border: 0;
    color: @color1;
    max-width: 150px;

    &:hover {
      background-color: @color20;
    }

    &:disabled {
      pointer-events: none;
      background-color: @color15;
    }
  }
}

</style>

<script>

export default {
  data() {
    return {
      text: {
        title: "Suporte",
        faleComigo: "Fale com a Listo",
        cliente: "Cliente: ",
        placeholder: "Digite sua mensagem",
        botao: "Enviar",
        assunto: "Assunto",
        mensagem: "Mensagem",
        sucesso: "Mensagem enviada com sucesso. Em breve o Atendimento da Listo entrará em contato com você.",
        falha: "Não foi possível enviar sua mensagem. Tente novamente.",
      },
      form: {
        subject: "",
        body: "",
      },
      loading: false,
      emailStatus: null,
    };
  },
  methods: {
    // envia mensagem do cliente
    sendClientMessage() {
      const self = this;

      self.emailStatus = null;

      self.loading = true;

      const email = {
        body: "",
        subject: "",
        to: "",
      };

      email.body = self.createEmailBody(self.form.body, self.form.subject);
      email.subject = self.createEmailSubject(self.form.subject);
      email.to = process.env.EMAIL_ATENDIMENTO;

      const formData = new FormData();

      Object.keys(email).map((k) => {
        // console.log(k, email[k]);
        formData.append(k, email[k]);
      });

      // console.log(formData);

      const config = {
        // responseType: "json",
        headers: { "X-Requested-With": "XMLHttpRequest", "Content-Type": "multipart/form-data" },
      };

      self.$axios
        .post(`${process.env.API_AFFILIATE}/email`, formData, config)
        .then((response) => {
          // console.log(response);
          self.loading = false;

          self.emailStatus = response.status;

          setTimeout(() => {
            self.$nuxt.$emit("toggleModal", null);
          }, 3000);
        }).catch(err => console.log("Err:", err));
    },
    // create HTML for email body
    createEmailBody(msg, subj) {
      // <table style="border-collapse: collapse; border-spacing: 0; margin: 20px 0; white-space: pre-wrap; border-bottom: 1px solid #000000">
      //   <tr>
      //     <td>
      //       <img src="http://www.soulisto.com.br/resources/img/logo-sub.png" alt="Listo Fácil" border="0" style="display: block;" width="600" height="160">
      //     </td>
      //   </tr>
      // </table>
      return `
        <p style="text-align: left;">${$nuxt.$store.state.usuario.userName} [${$nuxt.$store.state.usuario.clientID}] escreveu: </p>
        <table style="border-collapse: collapse; border-spacing: 0 20px; margin: 20px 0; white-space: pre-wrap;">
          <thead style="text-align: center;">
            <th>
              <h1>${subj}</h1>
            </th>
          </thead>
          <tbody>
            <tr>
              <td>${msg}</td>
            </tr>
          </tbody>
        </table>
        <br>`;
    },
    // create correct email subject
    createEmailSubject(subj) {
      return `[${$nuxt.$store.state.usuario.clientID}] - ${subj}`;
    },
  },

};
</script>
