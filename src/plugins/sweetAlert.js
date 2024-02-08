import Swal from 'sweetalert2'

export default (ctx, inject) => {
  inject("swal", (opts) => Swal.fire(opts));
  ctx.$swal = (opts) => Swal.fire(opts);
};
