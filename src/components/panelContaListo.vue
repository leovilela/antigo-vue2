<template>
  <div id="panelContaListo">
    <component-panel-section>
      <div id="profile" slot="content">
        <div id="profilePicture"></div>
      </div>
    </component-panel-section>

    <component-panel-section v-if="$mq ==='mobile' || $mq === 'tablet'">
      <ul id="links" slot="content">
        <li><a v-on:click="navegacao('conteudo')"><span><img src="~assets/img/ico-conta-virtual.png" alt="conta Listo"></span>{{ text.contaListo }}</a></li>
      </ul>
    </component-panel-section>

    <component-panel-section v-if="$mq ==='laptop' || $mq === 'desktop' || $mq === 'bigScreen'">
      <component-consolidado slot="content"></component-consolidado>
    </component-panel-section>

    <component-panel-section :class="{ noPadding: true }">
      <component-contato slot="content"></component-contato>
    </component-panel-section>
  </div>
</template>

<style lang="less" scoped>
@import "~assets/vars.less";
@import "~assets/variables.less";

#panelContaListo {
  #profile {
    #profilePicture {
      background: @color22 url("~assets/img/ico-conta-virtual.png");
      background-size: 50%;
      background-repeat: no-repeat;
      background-position: 50% 50%;
      width: 100px;
      height: 100px;
      display: inline-block;
      border: 4px solid @color12;
      border-radius: 100%;
    }
  }
  #links {
    list-style-type: none;
    padding: 0;
    img {
      max-width: 40px;
      margin-bottom: 10px;
      margin-right: 10px;
    }
    a {
      color: @color5;
      font-family: @mainFont;
      font-size: @ftSizeLarge;

      &:hover {
        text-decoration: none;
        user-select: none;
      }
    }
  }
}

</style>

<script>
import panelSection from "~/components/leftPanelSection.vue";
import panelConsolidado from "~/components/panelSectionConsolidado.vue";
import panelContato from "~/components/leftPanelContato.vue";

export default {
  components: {
    "component-panel-section": panelSection,
    "component-contato": panelContato,
    "component-consolidado": panelConsolidado,
  },
  data() {
    return {
      text: {
        contaListo: "Conta Listo",
        saldoTitulo: "Conta Listo",
        saldoTabela: "Saldo",
      },
      content: {
        saldo: 0,
      },
    };
  },
  methods: {
    // uma função "getter" computada (computed getter)
    navegacao(pp) {
      this.$nuxt.$emit("navMobileInternal", pp);
    },
  },
  mounted() {
    /* $nuxt.$emit("consolidado", {
      title: this.text.saldoTitulo,
      rows: [
        {
          title: this.text.saldoTabela,
          value: this.content.saldo,
          type: "currency",
          class: "total",
        },
      ],
      tableClass: "contaListo",
    }); */
    const self = this;
    self.$axios
      .get(`${process.env.API_FIDES}/api/Client/balance/${$nuxt.$store.state.usuario.clientID}`)
      .then((response) => {
        if (response.status == 200) {
          // console.log("balance", response.data);
          this.content.saldo = response.data.result;
          $nuxt.$emit("consolidado", {
            title: this.text.saldoTitulo,
            rows: [
              {
                title: this.text.saldoTabela,
                value: this.content.saldo,
                type: "currency",
                class: "total",
              },
            ],
            tableClass: "contaListo",
          });
        } else {
          $nuxt.$emit("consolidado", {
            title: this.text.saldoTitulo,
            rows: [
              {
                title: this.text.saldoTabela,
                value: 0,
                type: "currency",
                class: "total",
              },
            ],
            tableClass: "contaListo",
          });
        }
      })
      .catch(() => {
        $nuxt.$emit("consolidado", {
          title: this.text.saldoTitulo,
          rows: [
            {
              title: this.text.saldoTabela,
              value: 0,
              type: "currency",
              class: "total",
            },
          ],
          tableClass: "contaListo",
        });
      });
  },
};
</script>
