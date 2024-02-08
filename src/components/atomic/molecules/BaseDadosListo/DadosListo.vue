<template>
  <div class="dados-listo">
    <Base-Duvida :text="doubtText"/>
    <Base-Phone0800 :phoneNumber="phoneNumber"/>
    <Base-Expedient :expedientWeek="expedientWeekHours" :expedientWeekend="expedientWeekendHours"/>
  </div>
</template>
<script>
import BaseDuvida from "../../atoms/BaseDuvida";
import BasePhone0800 from "../../atoms/BasePhone0800";
import BaseExpedient from "../../atoms/BaseExpedient";

export default {
  components: {
    BaseDuvida,
    BasePhone0800,
    BaseExpedient,
  },
  computed: {
    expedientWeekHours(){
      return this.$t("expedient_week");
    },
    expedientWeekendHours(){
      return this.$t("expedient_weekend");
    },
    doubtText(){
      return this.$t("doubt");
    },
    phoneNumber(){
      return this.$t("phone_0800");
    },
  },
};
</script>
<style lang="less" scoped>
  @import "DadosListo.less";
</style>
