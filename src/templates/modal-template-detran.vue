<template>
  <div id="modalRecibo" class="container-fluid">
    <button @click.prevent="print">Imprimir</button>
    <h1 id="modal-title" v-show="!loading">{{text.modalRecibo_title}}</h1>
    <div id="loading" class="row" v-show="loading">
      <h2>{{text.modalRecibo_carregando}}</h2>
    </div>
    <div id="receipt" class="row" v-show="!loading">
      <p id="content" class="col-xs-12 printing" ref="receipt">{{receipt}}</p>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import "../assets/vars.less";
@import "../assets/variables.less";

#modalRecibo {
  font-family: @mainFontLight;
  position: relative;
  height: inherit;

  #modal-title {
    font-family: @mainFontBold;
    font-size: @ftSizeBig;
    text-align: center;
  }

  #loading {
    height: inherit;

    h2 {
      text-align: center;
      position: absolute;
      top: 33%;
      left: 0;
      right: 0;
      margin: auto;
    }
  }

  #receipt {
    #content {
      white-space: pre-wrap;
      line-height: initial;
    }
    margin-bottom: 15px;
    overflow: auto;
    height: 310px;
  }

  button {
    width: 100%;
    border-radius: 4px;
    padding: 10px;
    font-family: @mainFontRegular;
    margin-bottom: 10px;
    user-select: none;

    @media (max-width: @screen-xs-max) {
      font-size: @ftSizeNormal;
    }
    @media (min-width: @screen-sm-min) {
      font-size: @ftSizeNormal;
    }
    @media (min-width: @screen-md-min) {
      font-size: @ftSizeSmall;
      margin-bottom: 0;
    }
    @media (min-width: @screen-lg-min) {
      font-size: @ftSizeNormal;
    }

    &#email {
      border: 1px solid @color12;
      background-color: @color12;
      color: @color2;
      span {
        margin-right: 10px;
        vertical-align: text-top;
      }
    }

    &#imprimir {
      border: 1px solid @color12;
      color: @color12;
      background-color: @color2;

      span {
        margin-right: 10px;
        vertical-align: text-top;
      }
    }

    &#whatsapp {
      border: 1px solid @color11;
      color: @color2;
      background-color: @color11;
      padding: 11px 5px;
      font-size: @ftSizeTiny;

      span {
        margin-right: 5px;
        vertical-align: text-top;
        &:before {
          border: 1.25px solid @color2;
          border-radius: 100%;
          padding: 4px;
          font-size: @ftSizeTiny;
        }
      }

      @media (max-width: @screen-xs-max) {
        font-size: @ftSizeNormal;
      }
      @media (min-width: @screen-sm-min) {
        font-size: @ftSizeNormal;
      }
      @media (min-width: @screen-md-min) {
        font-size: @ftSizeTiny;
      }
      @media (min-width: @screen-lg-min) {
        font-size: @ftSizeSmall;
      }
    }
  }

  #titulo-recibo {
    margin: 0;
    text-align: center;
  }

  .titulo-via {
    text-align: center;
    font-family: @mainFontBold;
  }

  .vias {
    margin-bottom: 20px;
  }
  .printing {
    white-space: pre-wrap;
    font-size: 12px;
  }

  #lojista,
  #cliente {
    text-align: center;
    table {
      width: 100%;
      margin: 0 auto;
      max-width: 280px;

      tr {
        &:nth-child(odd) {
          background: @color9;
        }
        td {
          padding: 5px 0;
          &:nth-child(odd) {
            text-align: left;
            font-family: @mainFont;
          }
          &:nth-child(even) {
            text-align: right;
          }
        }
        &.valorLiberado,
        &.valorTransacao {
          td:nth-child(even) {
            color: @color11;
            font-family: @mainFontRegular;
          }
        }
      }
    }
  }
}
</style>

<script>
import Printd from "printd";

export default {
  props: ["contentRecibo"],
  data() {
    return {
      text: {
        modalRecibo_title: "Recibo",
        modalRecibo_carregando: "Carregando...",
      },
      receipt: null,
      printer: null,
      code: null,
      loading: false,
      cssPrintStyle: `
      .printing {
        white-space: pre-wrap;
        font-size: 12px;
      }`,
    };
  },
  methods: {
    showNumberAsCurrency(number) {
      if (number) {
        const numero = number.toFixed(2).split(".");
        numero[0] = `R$ ${numero[0].split(/(?=(?:...)*$)/).join(".")}`;
        return numero.join(",");
      }
    },
    print() {
      this.printer.print(this.$refs.receipt, ["col-xs-12", this.cssPrintStyle]);
    },
    formatDocument(valor) {
      let val = valor;
      if (val.length == 11) {
        const cpf = val.split("");
        cpf.splice(3, 0, ".");
        cpf.splice(7, 0, ".");
        cpf.splice(11, 0, "-");
        val = cpf.join("");
      } else if (val.length > 11) {
        const cnpj = val.split("");
        cnpj.splice(2, 0, ".");
        cnpj.splice(6, 0, ".");
        cnpj.splice(10, 0, "/");
        cnpj.splice(15, 0, "-");
        val = cnpj.join("");
      }
      return val;
    },
  },
  mounted() {
    this.printer = new Printd();


    const { contentWindow } = this.printer.getIFrame();

    contentWindow.addEventListener(
      "beforeprint", () => console.log("before print event!"),
    );
    contentWindow.addEventListener(
      "afterprint", () => console.log("after print event!"),
    );
    const self = this;

    self.loading = true;


    setTimeout(() => {
      self.code = self.contentRecibo.codigo;
      self.$axios
        .post(`${process.env.API_CORBAN}/api/Report/DetranReceipt/`, {
          transactionId: self.code,
        })
        .then((response) => {
          // console.log(response);
          self.receipt = response.data;
          self.loading = false;
        }).catch(err => console.log("Err:", err));
    }, 10);
  },
};
</script>
