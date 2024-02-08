<template>
  <section class="base-commercial-group">

    <p> {{name}} </p>


    <base-link
      class="base-commercial-group__link base-commercial-group__link-email"
      :url="`mailto:${email}`"
      :label="email"
      :target="true" />

    <base-link
      class="base-commercial-group__link base-commercial-group__link-phone"
      :url="`tel:${phone}`"
      :label="phoneFormat"
      :target="true" />
  </section>
</template>

<script>
import BaseLink from "../../atoms/BaseLink";

export default {
  components: {
    BaseLink,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  computed: {
    phoneFormat() {
      return this.phone.replace(/[^0-9]/g, "").replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    },
  },
};
</script>

<style lang="less" scoped>
  @import "style.less";
</style>
