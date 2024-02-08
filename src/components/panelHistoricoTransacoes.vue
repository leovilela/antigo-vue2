<template>
  <div id="panelHistoricoTransacoes">
    <component-panel-section>
      <div id="profile" slot="content">
        <div id="profilePicture"></div>
      </div>
    </component-panel-section>

    <component-panel-section v-if="$mq ==='mobile' || $mq === 'tablet'">
      <ul id="links" slot="content">
        <li><a v-on:click="navegacao('conteudo')"><span><img src="~assets/img/ico-historico-transacoes-pq.png" alt="histórico de transações"></span> Histórico de Transações</a></li>
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

  #panelHistoricoTransacoes {
    #profile {
      #profilePicture {
        background: rgba(3, 133, 219, 0.1)
          url("~assets/img/ico-historico-transacoes.png");
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
        font-size: 24px;

        &:hover {
          text-decoration: none;
          user-select: none;
          cursor: pointer;
        }
      }
    }
  }
</style>

<script>
import panelSection from "~/components/leftPanelSection.vue";
import consolidado from "~/components/panelSectionConsolidado.vue";
import panelContato from "~/components/leftPanelContato.vue";

export default {
  data() {
    return {};
  },

  components: {
    "component-panel-section": panelSection,
    "component-consolidado": consolidado,
    "component-contato": panelContato,
  },

  methods: {
    // uma função "getter" computada (computed getter)
    navegacao(pp) {
      this.$nuxt.$emit("navMobileInternal", pp);
    },
  },

};
</script>
