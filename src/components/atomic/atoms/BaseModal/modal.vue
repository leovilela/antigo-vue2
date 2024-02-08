<template>
<div>
    <div class="modal-backdrop" role="dialog"></div>
    <div class="modal-dialog">
      <div class="modal" ref="modal">
        <header class="modal-header" v-if="$slots.header">
          <slot name="header" class="modal-header" />
        </header>
        <section class="modal-body" :class="modalClassesBody" v-if="$slots.body">
          <slot name="body" />
        </section>
        <footer class="modal-footer" v-if="$slots.footer">
          <slot name="footer"  />
        </footer>
      </div>
    </div>
</div>
</template>

<script>
export default {
  name: "modal",
  props: {
    center: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    modalClassesBody() {
      return [
        { "is-centered": this.center },
      ];
    },
  },
};
</script>

<style scoped>
  .modal-backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0,0,0,0.7);
    z-index: 990;
  }
  .modal-dialog {
    width: 900px;
    max-width: 100%;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: auto;
    max-height: 100%;
    display: flex;
    justify-content: center;
    z-index: 999;
  }

  .modal {
    width: 60%;
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    padding: 30px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .modal-header,
  .modal-footer {
    padding: 5px;
    display: flex;
    flex-direction: row;
    width: 100%;
  }

  .modal-header {
    justify-content: center;
  }

  .modal-footer {
    justify-content: space-around;
  }

  .modal-body {
    position: relative;
    padding: 0;
  }

  .modal-btn-close {
    border: none;
    font-size: 20px;
    padding: 20px;
    cursor: pointer;
    font-weight: bold;
    color: white;
    background: black;
  }

  .btn-modal-continuar {
    width: 210px;
    font-size: 14px;
    color: white;
    text-transform: uppercase;
    background: black;
    display: flex;
    justify-content: center;
  }
  .is-centered {
    justify-content: center;
    text-align: center;
  }
</style>
