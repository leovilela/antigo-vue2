<template>
  <!--modal id="modal-contrato" name="modal-contrato" height="auto" width="90%" :scrollable="true"-->
  <modal id="modal-contrato" name="modal-contrato" height="90%" width="90%">
    <button @click="$modal.hide('modal-contrato')" class="fechar">X</button>
    <h1>Termos e condições de contrato</h1>
    <div class="termosContrato" v-bar="{scrollThrottle: 30, preventParentScroll: true}">
      <div ref="contrato">
        <ol>
          <li><b>Silvio Santos Ipsum mah voc mora com o papai ou com a mamem?</b><br>
            <span>com voc Lombardiam. com voc Lombardiam. Patrciaaammmm... Luiz Ricardouaaammmmmm. Mah a porta da esperanaam. Eu s acreditoammmm.... Vendoammmm. por sua conta e riscoamm? Ma voc est certo dissoam? Mah roda a roduamm.</span></li>
          <li><b>Mais vale um bebadis conhecidiss, que um alcoolatra anonimis.</b><br><span>Não sou faixa preta cumpadi, sou preto inteiris, inteiris. Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi. Delegadis gente finis, bibendum egestas augue arcu ut est.</span>
            <ol>
              <li><b>Silvio Santos Ipsum mah voc mora com o papai ou com a mamem?</b><br><span>ilvio Santos Ipsum mah voc mora com o papai ou com a mamem? com voc Lombardiam. com voc Lombardiam. Patrciaaammmm... Luiz Ricardouaaammmmmm. Mah a porta da esperanaam. Eu s acreditoammmm.... Vendoammmm. por sua conta e riscoamm? Ma voc est certo dissoam? Mah roda a roduamm.</span></li>
              <li><b>Silvio Santos Ipsum mah voc mora com o papai ou com a mamem?</b><br><span>>ilvio Santos Ipsum mah voc mora com o papai ou com a mamem? com voc Lombardiam. com voc Lombardiam. Patrciaaammmm... Luiz Ricardouaaammmmmm. Mah a porta da esperanaam. Eu s acreditoammmm.... Vendoammmm. por sua conta e riscoamm? Ma voc est certo dissoam? Mah roda a roduamm.</span></li>
              <li><b>Silvio Santos Ipsum mah voc mora com o papai ou com a mamem?</b><br><span>ilvio Santos Ipsum mah voc mora com o papai ou com a mamem? com voc Lombardiam. com voc Lombardiam. Patrciaaammmm... Luiz Ricardouaaammmmmm. Mah a porta da esperanaam. Eu s acreditoammmm.... Vendoammmm. por sua conta e riscoamm? Ma voc est certo dissoam? Mah roda a roduamm.</span></li>
              <li><b>Silvio Santos Ipsum mah voc mora com o papai ou com a mamem?</b><br><span>ilvio Santos Ipsum mah voc mora com o papai ou com a mamem? com voc Lombardiam. com voc Lombardiam. Patrciaaammmm... Luiz Ricardouaaammmmmm. Mah a porta da esperanaam. Eu s acreditoammmm.... Vendoammmm. por sua conta e riscoamm? Ma voc est certo dissoam? Mah roda a roduamm.</span>
                <ol>
                  <li><b>Silvio Santos Ipsum mah voc mora com o papai ou com a mamem?</b><br><span>ilvio Santos Ipsum mah voc mora com o papai ou com a mamem? com voc Lombardiam. com voc Lombardiam. Patrciaaammmm... Luiz Ricardouaaammmmmm. Mah a porta da esperanaam. Eu s acreditoammmm.... Vendoammmm. por sua conta e riscoamm? Ma voc est certo dissoam? Mah roda a roduamm.</span></li>
                </ol>
              </li>
            </ol>
          </li>
          <li><b>Silvio Santos Ipsum mah voc mora com o papai ou com a mamem?</b><br><span>Mais vale um bebadis conhecidiss, que um alcoolatra anonimis. Não sou faixa preta cumpadi, sou preto inteiris, inteiris. Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi. Delegadis gente finis, bibendum egestas augue arcu ut est.</span></li>
          <li><b>Silvio Santos Ipsum mah voc mora com o papai ou com a mamem?</b><br>
            <span>com voc Lombardiam. com voc Lombardiam. Patrciaaammmm... Luiz Ricardouaaammmmmm. Mah a porta da esperanaam. Eu s acreditoammmm.... Vendoammmm. por sua conta e riscoamm? Ma voc est certo dissoam? Mah roda a roduamm.</span></li>
          <li><b>Silvio Santos Ipsum mah voc mora com o papai ou com a mamem?</b><br>
            <span>com voc Lombardiam. com voc Lombardiam. Patrciaaammmm... Luiz Ricardouaaammmmmm. Mah a porta da esperanaam. Eu s acreditoammmm.... Vendoammmm. por sua conta e riscoamm? Ma voc est certo dissoam? Mah roda a roduamm.</span></li>
          <li><b>Silvio Santos Ipsum mah voc mora com o papai ou com a mamem?</b><br>
            <span>com voc Lombardiam. com voc Lombardiam. Patrciaaammmm... Luiz Ricardouaaammmmmm. Mah a porta da esperanaam. Eu s acreditoammmm.... Vendoammmm. por sua conta e riscoamm? Ma voc est certo dissoam? Mah roda a roduamm.</span></li>
        </ol>
      </div>
    </div>
    <div class="painelBotoes">
      <form>
        <!--div class="radio">
            <label>
              <input type="radio" value="aceito" name="aceito">
              <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>
              <b>Li</b> e <b>aceito</b> os termos e condições de contrato.
            </label>
          </div-->
        <div class="painelDireito">
          <button class="imprimir" @click="imprimir">Imprimir contrato</button>
          <button class="aceitar" @click="novocadastro">Aceitar e continuar</button>
        </div>
      </form>
    </div>
  </modal>
</template>
<script>
export default {
  methods: {
    imprimir() {
      const telaImpressao = window.open("about:blank");
      const conteudo = this.$refs.contrato.innerText;
      telaImpressao.document.write(conteudo);
      telaImpressao.window.print();
      telaImpressao.window.close();
    },
    novocadastro(e) {
      e.preventDefault();
      if (!this.$store.state.aceite) {
        this.$store.commit("aceiteListo");
        this.$router.push("/novo-cadastro", () => {});
      }

      /* this.$http.post('/api/users',this.user,function(data){
                 router.go('/');
            })
            .error(function(data){
              if(data.errors != 'undefined')
              {
                this.$set('error',data.errors);
              }
            }); */
    },
  },
};
</script>

<style lang="less" scoped>
@import "~assets/vars.less";
@import "~assets/variables.less";

#modal-contrato {
  ol {
    counter-reset: item;
    padding-bottom: 15px;
    padding-left: 10px;
    padding-right: 30px;
  }
  li {
    display: block;
    font-family: @mainFontBold;

    font-size: @ftSizeNormal;
    padding-bottom: 20px;

    li {
      padding-left: 20px;
    }

    b {
      font-family: @mainFontBold;
    }
    span {
      font-family: @mainFontLight;
    }
  }
  li:before {
    content: counters(item, ".") " ";
    counter-increment: item;
  }

  @media (max-width: @screen-xs-max) {
  }
  @media (min-width: @screen-sm-min) {
  }
  @media (min-width: @screen-md-min) {
  }
  @media (min-width: @screen-lg-min) {
  }

  .fechar {
    position: absolute;
    top: 0;
    right: 0;
    background-color: @color17;
    color: @color2;
    width: 60px;
    height: 60px;
    border: 0;
    font-size: @ftSizeExtraLarge;

    &:hover {
      filter: brightness(1.25);
    }
  }

  h1 {
    font-size: @ftSizeBig;
    font-family: @mainFontBold;
    padding: 30px 54px;
    margin: 0;
    @media (max-width: @screen-xs-max) {
    }
    @media (min-width: @screen-sm-min) {
    }
    @media (min-width: @screen-md-min) {
    }
    @media (min-width: @screen-lg-min) {
    }
  }

  .termosContrato {
    height: 250px;
    width: calc(100% - 108px);
    margin: 0 auto;
    height: calc(100% - 208px);

    @media (max-width: @screen-xs-max) {
    }
    @media (min-width: @screen-sm-min) {
    }
    @media (min-width: @screen-md-min) {
    }
    @media (min-width: @screen-lg-min) {
    }
  }

  .painelBotoes {
    height: 168px;
    padding: 30px 54px;
    position: relative;
    @media (max-width: @screen-xs-max) {
    }
    @media (min-width: @screen-sm-min) {
    }
    @media (min-width: @screen-md-min) {
    }
    @media (min-width: @screen-lg-min) {
    }
    .radio {
      display: inline-block;
    }
    .aceite {
      @media (max-width: @screen-xs-max) {
      }
      @media (min-width: @screen-sm-min) {
      }
      @media (min-width: @screen-md-min) {
      }
      @media (min-width: @screen-lg-min) {
      }
    }
    .painelDireito {
      @media (max-width: @screen-xs-max) {
      }
      @media (min-width: @screen-sm-min) {
      }
      @media (min-width: @screen-md-min) {
      }
      @media (min-width: @screen-lg-min) {
      }
      position: absolute;
      right: 54px;
      display: inline-block;
      .imprimir {
        background-color: @color2;
        color: @color11;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        border: 1px solid @color11;
        display: inline-block;
        margin: 0 auto;
        padding: 8px;
        width: 270px;
        font-family: @mainFontLight;
        font-size: @ftSizeLarge;
        text-decoration: none;

        @media (max-width: @screen-xs-max) {
        }
        @media (min-width: @screen-sm-min) {
        }
        @media (min-width: @screen-md-min) {
        }
        @media (min-width: @screen-lg-min) {
        }

        &:hover {
          box-shadow: 0px 0px 0px 2px @color11 inset;

          box-sizing: border-box;
        }
      }
      .aceitar {
        background-color: @color16;
        color: @color2;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        border: 0;
        display: inline-block;
        margin: 0 auto;
        padding: 8px;
        width: 270px;
        font-family: @mainFontLight;
        font-size: @ftSizeLarge;
        text-decoration: none;
        @media (max-width: @screen-xs-max) {
        }
        @media (min-width: @screen-sm-min) {
        }
        @media (min-width: @screen-md-min) {
        }
        @media (min-width: @screen-lg-min) {
        }

        &:hover {
          background-color: @color11;
        }
      }
    }
  }
}
</style>
