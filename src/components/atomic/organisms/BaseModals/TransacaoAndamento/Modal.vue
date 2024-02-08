<template>
  <Base-Modal v-if="innerActive" center class="transactionTextModal">
   <template #header>
     <h2>{{title}}</h2>
   </template>
   <template #body>
     <div class="container">
       <div class="row">
         <div class="col-md-12">
          <img src="~/assets/img/loading.gif"  alt="">
          <Base-Alert type="danger" v-if="innerTransactionText">
            {{innerTransactionText}}
          </Base-Alert>
         </div>
       </div>
     </div>
   </template>

  </Base-Modal>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    transactionText: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      innerActive: false,
      innerTransactionText: "",
    };
  },
  computed: {
    title() {
      return !this.innerTransactionText ? "Transação  em andamento" : "Erro ao transacionar";
    },
  },
  mounted() {
    this.innerActive = this.active;
    this.innerTransactionText = this.transactionText;
  },
  methods: {
    ...mapMutations(['finishLoading'])
  },
  watch: {
    active(value) {
      this.innerActive = value;
      this.finishLoading();
    },
    transactionText(value) {
      this.innerTransactionText = value;
    },
  },
};
</script>

<style lang="less">
.transactionTextModal {
  .modal {
    width: auto !important;
  }
}
  .center {
    text-align: center
  }
</style>
