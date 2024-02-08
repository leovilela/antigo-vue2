<template>
  <section class="base-user-data-group">
    <base-profile-picture
      :source="picture.source"
      :alt="picture.alt" />

    <base-link-button
      class="base-user-data-group__link-button base-user-data-group__change-picture"
      @click="$emit('onAlterPicture')"
      label="Alterar Foto" />

    <h4 class="base-user-data-group__name">{{ name }}</h4>

    <p class="base-user-data-group__paragraph">
      <strong class="base-user-data-group__strong">{{ $t('cliente_id') }}:</strong>
      <span class="base-user-data-group__id">{{ id }}</span>
    </p>

    <p class="base-user-data-group__paragraph">
      <strong class="base-user-data-group__strong">{{ $t('login') }}:</strong>
      <span class="base-user-data-group__user">{{ user }}</span>
    </p>

    <base-link-button
      @click="$emit('onAlterPassword')"
      class="base-user-data-group__link-button base-user-data-group__update-password"
      label="Alterar Senha" />
  </section>
</template>

<script>
import BaseProfilePicture from "../../atoms/BaseProfilePicture";
import BaseLinkButton from "../../atoms/BaseLinkButton";

export default {
  components: {
    BaseProfilePicture,
    BaseLinkButton,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    picture: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="less" scoped>
  @import "./style.less";
</style>
