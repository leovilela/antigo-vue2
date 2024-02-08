import { Services } from "../services";

export default (ctx, inject) => {
  const $services = new Services(ctx.$axios, ctx.store, ctx.app.router, ctx.app.$swal);


  inject("services", $services);
  ctx.$services = $services;
  window.$services = $services
};
