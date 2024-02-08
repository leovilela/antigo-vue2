<template>
  <div id="guide" class="redefinir-senha"></div>
</template>


<script>

export default {
  asyncData({
    $axios, $warehouse, redirect, $services, route, store
  }) {
    const guide = route.params.guide;
    if (store.state.auth.accessToken) {
      redirect('/painel-do-cliente');
      return;
    }
    $axios.get(`${process.env.API_AFFILIATE}/login/ValidateRequest/${guide}`).then((response) => {
      $warehouse.set("password_guide", guide);
      redirect("/definir-senha/nova-senha");
    }).catch((error) => {
      redirect("/definir-senha/vencida");
      console.warn(error);
    });
  },
};
</script>
