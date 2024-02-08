<template>
  <div class="base-user-support">
    <Base-Button class="base-user-support__button base-user-support__talk-to-listo" @click="onTalkToList">
      <span class="ico glyphicon glyphicon-envelope">&nbsp;</span>{{$t("talk_to_listo")}}</Base-Button>
    <Base-Button class="base-user-support__button base-user-support__remote-support" @click="onRemoteSupport">
      <span class="ico ">&nbsp;</span>{{$t("remote_support")}}
    </Base-Button>
  </div>
</template>
<script>
import BaseButton from "../../atoms/BaseButton";

export default {
  components: {
    BaseButton,
  },
  methods: {
    onTalkToList() {
      return this.$emit("onTalkToList");
    },
    onRemoteSupport() {
      return this.$emit("onRemoteSupport");
    },
  },
};
</script>
<style lang="less" scoped>
  @import "./style.less";
</style>
