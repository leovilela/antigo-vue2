<template>
  <section class="page-financiamentos-auto page-financiamentos-auto--simulacao container-fluid" id="upload-de-documentos">
    <div class="row">
      <div class="col-xs-12">
        <div class="panel panel-default">
          <div class="panel-heading">
            <span>{{$t('titles.uploadDocumentos')}}</span>
          </div>
          <div class="panel-body">
            <transition name="fade">
              <Base-Modal v-show="isModalCadastroDigital" class="cadastro-digital">
                <template #header>
                  <img src="~assets/img/logo-listo.png" alt="" />
                </template>
                <template #body>
                  <h3>Aguardando cadastro digital</h3>
                  <p>Informe ao cliente que é necessário se cadastrar no aplicativo Listo, enviado por SMS para o número de celular informado por ele.</p>
                  <p>A partir destas informações será possível oferecer melhores condições de financiamento.</p>
                </template>
                <template #footer>
                  <Base-Button
                    class="btn-modal-cancelar"
                    aria-label="Cancelar"
                    @click="cancelModalCadastroDigital"
                  >
                    Cancelar
                  </Base-Button>
                </template>
              </Base-Modal>
            </transition>

            <transition name="fade">
              <Base-Modal v-show="isModalCadastroDigitalConcluido" class="cadastro-digital">
                <template #header>
                  <img src="~assets/img/logo-listo-smartphone.png" alt="" />
                </template>
                <template #body>
                  <h3>Cadastro digital concluído.</h3>
                  <p>Próximo passo: Escolha o carro a ser financiado.</p>
                </template>
                <template #footer>
                  <Base-Button
                    class="btn-modal-continuar"
                    aria-label="Botão Continuar"
                    @click="btnContinuarCadastroDigitalConcluido"
                  >
                    Continuar
                  </Base-Button>
                </template>
              </Base-Modal>
            </transition>

            <transition name="fade">
              <Base-Modal v-show="isModalTC3" class="tc3" ref="tc3">
                <template #header>
                  <img src="~assets/img/logo-lupa-lista.png" alt="" />
                </template>
                <template #body>
                  <h3>TC3</h3>
                  <h4>Tarifa de Concessão de Crédito e Cadastro</h4>
                  <p>A Tarifa de Concessão de Crédito e Cadastro (TC3) é uma tarifa cobrada, de acordo com leis reguladas por órgãos públicos, para início de relacionamento do cliente com um Banco, Financeira ou SCD, momento em que são realizadas pesquisas em serviços de proteção ao crédito, base e tratamento de dados e informações necessárias para análise de crédito, e, tem valor de R$ 1.100,00.</p>
                  <p>Ao optar pela isenção da Tarifa de Concessão de Crédito e Cadastro, você deverá apresentar ao Listo Sociedade de Crédito Direto, no momento da formalização do financiamento, os seguintes documentos:</p>
                  <ul>
                    <li>Documento de Identificação com foto;</li>
                    <li>CPF;</li>
                    <li>Comprovante de residência;</li>
                    <li>Comprovante de renda ou de patrimônio, sendo eles cópia do holerite ou da declaração anual de imposto de renda;</li>
                    <li>Pesquisa em bancos de dados e de proteção ao crédito. As pesquisas podem ser executadas na SERASA Experian ou na Boavista ou no SPC Brasil, à escolha do consumidor;</li>
                    <li>Certidões de cartórios de protesto do local do domicílio do consumidor;</li>
                    <li>Certidão de regularidade do CPF do consumidor expedida pela Receita Federal do Brasil.</li>
                  </ul>
                  <p>A isenção só ocorrerá após a apresentação de todos os documentos ao Estabelecimento Comercial cadastrado junto à Listo Sociedade de Crédito Direto, e estes devem ser apresentados no seu devido prazo de validade (até 30 dias antecedentes a efetivação da proposta).</p>
                  <p>Maiores informações favor entrar em contato com a Listo SCD pelo telefone 0800-942-1835.</p>
                </template>
                <template #footer>
                  <div class="row">
                    <div class="col-xs-6">
                      <Base-Button
                        class="btn-modal-imprimir"
                        @click="btnImprimir"
                      >
                        Imprimir
                      </Base-Button>
                    </div>
                    <div class="col-xs-6">
                      <Base-Button
                        class="btn-modal-fechar"
                        @close="closeModal"
                        aria-label="Close modal"
                        @click="closeModalTC3"
                      >
                        Fechar
                      </Base-Button>
                    </div>
                  </div>
                </template>
              </Base-Modal>
            </transition>


            <Base-FotosVeiculoModal :active="true"  :isNewCar="true" :documentNumber="61159475377" />
            <transition name="fade">
              <Base-Modal v-show="isModalFormalizacaoConcluida" class="formalizacao">
                <template #header>
                  <img src="~assets/img/logo-aperto-de-maos.png" alt="" />
                </template>
                <template #body>
                  <h3>Formalização concluída!</h3>
                  <p>Parabéns! Documentação assinada pelo cliente.</p>
                  <p>Processo encerrado!</p>
                </template>
                <template #footer>
                  <Base-Button
                    class="btn-modal-fechar"
                    aria-label="Fechar"
                    @click="closeModalFormalizacaoConcluida"
                  >
                    Fechar
                  </Base-Button>
                </template>
              </Base-Modal>
            </transition>

            <transition name="fade">
              <Base-Modal v-show="isModalVisible" class="fotos-automovel">
                <template #body>
                  <div class="box-dropzone">
                    <img src="~assets/img/ico-foto.png" width="126" height="111px" alt="" />
                    <h3 class="dropzone-custom-title">Fotos do Automóvel</h3>
                    <p class="dropzone-custom-subtitle">Envie duas fotos seguindo o modelo abaixo:</p>
                    <div class="dropzone-cars">
                      <vue-dropzone ref="fileX" id="dropzone" :options="dropzoneOptions" :useCustomSlot="true" @vdropzone-success="onSuccessFileX" @vdropzone-removed-file="onRemovedFileX">
                        <div class="dropzone-custom-content">
                          <img src="~assets/img/ico-foto-carro-dianteira.png" alt="" />
                          <Base-Button class="btn-enviar-foto">Foto Perfil</Base-Button>
                        </div>
                      </vue-dropzone>
                      <vue-dropzone ref="fileY" id="dropzone" :options="dropzoneOptions" :useCustomSlot="true" @vdropzone-success="onSuccessFileY" @vdropzone-removed-file="onRemovedFileY">
                        <div class="dropzone-custom-content">
                          <img src="~assets/img/ico-foto-carro-traseira.png" alt="" />
                          <Base-Button class="btn-enviar-foto">Foto Traseira</Base-Button>
                        </div>
                      </vue-dropzone>
                      <vue-dropzone ref="fileZ" id="dropzone" :options="dropzoneOptions" :useCustomSlot="true" @vdropzone-success="onSuccessFileZ" @vdropzone-removed-file="onRemovedFileZ">
                        <div class="dropzone-custom-content">
                          <img src="~assets/img/ico-foto-carro-traseira.png" alt="" />
                          <Base-Button class="btn-enviar-foto">Doc. do Carro</Base-Button>
                        </div>
                      </vue-dropzone>
                    </div>
                  </div>
                  <div class="observacoes">
                    <p><strong>OBSERVAÇÕES:</strong></p>
                    <p>1. A placa do carro deve estar legível em ambas as fotos do veículo.</p>
                    <p>2. As informações do documento do carro devem estar legíveis.</p>
                  </div>
                </template>
                <template #footer>
                  <Base-Button
                    class="btn-modal-continuar"
                    @close="closeModal"
                    aria-label="Close modal"
                    :disabled="isBtnDisabled"
                    @click="btnContinuarFotosAutomovel"
                  >
                    Continuar
                  </Base-Button>
                </template>
              </Base-Modal>
            </transition>

            <transition name="fade">
              <Base-Modal v-show="isModalFotosEnviadasSucesso" class="fotos-enviadas-sucesso">
                <template #header>
                  <img src="~assets/img/logo-aperto-de-maos.png" alt="" />
                </template>
                <template #body>
                  <h3>Fotos enviadas com sucesso!</h3>
                  <p>Parabéns. Fotos recebidas.</p>
                </template>
                <template #footer>
                  <div class="row">
                    <div class="col-xs-6">
                      <Base-Button
                        class="btn-modal-nova-operacao"
                        @close="closeModal"
                        aria-label="Close modal"
                        @click="btnNovaOperacao"
                      >
                        Nova Operação
                      </Base-Button>
                    </div>
                    <div class="col-xs-6">
                      <Base-Button
                        class="btn-modal-ver-relatorios"
                        @close="closeModal"
                        aria-label="Close modal"
                        @click="btnVerRelatorios"
                      >
                        Ver Relatórios
                      </Base-Button>
                    </div>
                  </div>
                </template>
              </Base-Modal>
            </transition>

            <Base-Button @click="showModalCadastroDigital" class="btn-modal-open">Cadastro Digital</Base-Button>
            <Base-Button @click="showModalCadastroDigitalConcluido" class="btn-modal-open">Cadastro Digital Concluído</Base-Button>
            <Base-Button @click="showModalTC3" class="btn-modal-open">TC3</Base-Button>
            <Base-Button @click="showModalCET" class="btn-modal-open">CET</Base-Button>
            <Base-Button @click="showModalFormalizacao" class="btn-modal-open">Formalização</Base-Button>
            <Base-Button @click="showModalAssinaturaDigital" class="btn-modal-open">Assinatura Digital</Base-Button>
            <Base-Button @click="showModalFormalizacaoConcluida" class="btn-modal-open">Formalização Concluída</Base-Button>
            <Base-Button @click="showModal" class="btn-modal-open">Fotos do Automóvel</Base-Button>
            <Base-Button @click="showModalFotosEnviadasSucesso" class="btn-modal-open">Fotos Enviadas com Sucesso</Base-Button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import vue2Dropzone from "vue2-dropzone";
import Printd from "printd";

export default {
  name: "app",
  components: {
    vueDropzone: vue2Dropzone,
  },
  data() {
    return {
      isModalVisible: false,
      isModalCadastroDigital: false,
      isModalCadastroDigitalConcluido: false,
      isModalTC3: false,
      isModalCET: false,
      isModalFormalizacao: false,
      isModalAssinaturaDigital: false,
      isModalFormalizacaoConcluida: false,
      isModalFotosEnviadasSucesso: false,
      dropzoneOptions: {
        url: "/",
        maxFilesize: 6, // MB
        thumbnailWidth: 200,
        thumbnailMethod: "contain",
        addRemoveLinks: true,
        dictRemoveFile: "Remover arquivo",
        autoProcessQueue: false,
        acceptedFiles: "image/jpeg,image/png",
        dictInvalidFileType: "Você não pode carregar arquivos desse tipo.",
      },
      fileX: null,
      fileY: null,
      fileZ: null,
      cet: {
        valorDoBem: "50.000,00",
        entrada: "20.000,00",
        marca: "Ford",
        modelo: "Fusion",
        ano: "2016",
        placa: "ABC 1234",
        dataPrimeiroVencimento: "03/09/2019",
        dataUltimoVencimento: "03/08/2021",
        valorIOF: "1.403,27",
        cetMes: "2,95%",
        cetAno: "41,81%",
        taxaJuros: "2,65%",
        valorTC3: "1.200,00",
      },
    };
  },
  computed: {
    isBtnDisabled() {
      return !(this.fileX && this.fileY && this.fileZ);
    },
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    showModalCadastroDigital() {
      this.isModalCadastroDigital = true;
    },
    showModalCadastroDigitalConcluido() {
      this.isModalCadastroDigitalConcluido = true;
    },
    showModalTC3() {
      this.isModalTC3 = true;
    },
    showModalCET() {
      this.isModalCET = true;
    },
    showModalFormalizacao() {
      this.isModalFormalizacao = true;
    },
    showModalAssinaturaDigital() {
      this.isModalAssinaturaDigital = true;
    },
    showModalFormalizacaoConcluida() {
      this.isModalFormalizacaoConcluida = true;
    },
    showModalFotosEnviadasSucesso() {
      this.isModalFotosEnviadasSucesso = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    closeModalCadastroDigital() {
      this.isModalCadastroDigital = false;
    },
    closeModalCadastroDigitalConcluido() {
      this.isModalCadastroDigitalConcluido = false;
    },
    closeModalTC3() {
      this.isModalTC3 = false;
    },
    closeModalCET() {
      this.isModalCET = false;
    },
    closeModalFormalizacao() {
      this.isModalFormalizacao = false;
    },
    closeModalAssinaturaDigital() {
      this.isModalAssinaturaDigital = false;
    },
    closeModalFormalizacaoConcluida() {
      this.isModalFormalizacaoConcluida = false;
    },
    closeModalFotosEnviadasSucesso() {
      this.isModalFotosEnviadasSucesso = false;
    },
    cancelModalCadastroDigital() {
      this.isModalCadastroDigital = false;
    },
    cancelModalAssinaturaDigital() {
      this.isModalAssinaturaDigital = false;
    },
    onSuccessFileX(file, response) {
      this.fileX = file;
    },
    onSuccessFileY(file, response) {
      this.fileY = file;
    },
    onSuccessFileZ(file, response) {
      this.fileZ = file;
    },
    onRemovedFileX(file, error, xhr) {
      this.fileX = error;
    },
    onRemovedFileY(file, error, xhr) {
      this.fileY = error;
    },
    onRemovedFileZ(file, error, xhr) {
      this.fileZ = error;
    },
    btnContinuarCadastroDigitalConcluido() {
      console.log("Continuar Cadastro Digital");
    },
    btnContinuarCET() {
      console.log("Continuar CET");
    },
    btnContinuarFotosAutomovel() {
      console.log("Continuar Fotos Automóvel");
    },
    btnVerRelatorios() {
      this.$router.push("/financiamentos/relatorio");
    },
    btnFormalizacao() {
      console.log("Formalização");
    },
    btnNovaOperacao() {
      this.$router.push("/financiamentos/auto/simulacao");
    },
    btnImprimir() {
      const self = this;
      const css = `
      body {
        margin: 0;
        font-family: 'newjunebook';
        font-size: 14px;
        line-height: 1.42857143;
        color: #333333;
        background-color: #fff;
      }
      table.vgt-table {
        font-size: 16px;
        border-collapse: collapse;
        background-color: #fff;
        width: 100%;
        max-width: 100%;
        table-layout: auto;
        border: 1px solid #dcdfe6;
      }
      table.vgt-table thead th {
        color: black;
        border-bottom: 1px solid #dcdfe6;
      }
      table.vgt-table td {
        padding: .75em .75em .75em .75em;
        vertical-align: top;
        border-bottom: 1px solid #dcdfe6;
        color: #606266;
      }
      `;
      const p = new Printd();
      const element = this.$refs.tc3.$el;
      p.print(element, [
        css,
      ]);
    },
  },
};
</script>

<style lang="less">
@import "~assets/vars.less";
@import "vue2-dropzone/dist/vue2Dropzone.min.css";

.btn-modal-open {
  width: auto;
  font-family: 'newjunebold';
  font-size: 14px;
  background: @color1;
  color: @color2;
  text-transform: uppercase;
}

.fotos-automovel {
  position: relative;
  .vue-dropzone {
    width: auto;
    border: none;
  }

  .box-dropzone {
    align-items: center;
    flex-direction: column;
    display: flex;
  }

  #dropzone {
    width: 250px;
    background-color: @color2;
    color: @color5;
  }

  #dropzone .dz-preview .dz-details {
    color: @color2;
    background-color: @color1;
  }

  .dropzone-custom-title {
    font-family: Arial;
    font-size: 32px;
    font-weight: bold;
    margin: 20px 0 0 0;
  }

  .dropzone-custom-subtitle {
    font-family: Arial;
    font-size: 18px;
    margin: 0 0 20px 0;
  }

  .dropzone-items {
    display: flex;
  }

  .dropzone-cars {
    justify-content: space-around;
    display: flex;
  }

  .observacoes {
    text-align: left;
  }

  .btn-enviar-foto {
    font-family: 'newjunebold';
    font-size: 14px;
    color: @color2;
    background: @color1;
    margin-top: 30px;
    text-transform: uppercase;
  }
}

.cadastro-digital {
  width: 60%;
  h3 {
    font-family: 'newjunebold';
    font-size: 24px;
    color: @color1;
    font-weight: bold;
    margin-bottom: 12px;
  }
  p {
    font-family: 'newjuneregular';
    font-size: 14px;
    color: @color1;
    text-align: left;
  }
  .btn-modal-continuar {
    font-family: 'newjunebold';
    font-size: 14px;
    color: @color7;
    text-transform: uppercase;
  }
  .btn-modal-cancelar {
    font-family: 'newjunebold';
    font-size: 14px;
    width: auto;
    background: @color1;
    color: @color7;
    margin-top: 40px;
    padding: 0 50px;
    text-transform: uppercase;
  }
}

.tc3 {
  width: 80%;
  h3 {
    font-family: 'newjunebold';
    font-size: 20px;
    color: @color1;
    font-weight: bold;
    line-height: 18px;
    margin-bottom: 12px;
  }
  h4 {
    font-family: 'newjuneregular';
    font-size: 16px;
    color: @color1;
    font-weight: bold;
    margin: 0;
    line-height: 14px;
  }
  ul{
    list-style-type: disc;
    li{
      font-family: 'newjuneregular';
      font-size: 16px;
      color: @color1;
      text-align: left;
    }
  }
  p {
    font-family: 'newjuneregular';
    font-size: 16px;
    color: @color1;
    text-align: left;
  }
  .btn-modal-imprimir {
    font-family: 'newjunebold';
    font-size: 14px;
    width: auto;
    background: @color1;
    color: @color7;
    padding: 0 50px;
    text-transform: uppercase;
  }
  .btn-modal-fechar {
    font-family: 'newjunebold';
    font-size: 14px;
    width: auto;
    background: @color1;
    color: @color7;
    padding: 0 50px;
    text-transform: uppercase;
  }
}


.assinatura-digital {
  width: 60%;
  h3 {
    font-family: 'newjunebold';
    font-size: 20px;
    color: @color1;
    font-weight: bold;
    margin: 30px 0 20px 0;
  }
  h4 {
    font-family: 'newjuneregular';
    font-size: 16px;
    color: @color1;
    font-weight: bold;
    margin: 0;
    line-height: 14px;
  }
  ul{
    list-style-type: none;
    padding: 0;
  }
  p {
    font-family: 'newjuneregular';
    font-size: 16px;
    color: @color1;
    text-align: left;
  }
  .documentos {
    text-align: left;
  }
  .btn-modal-continuar {
    font-family: 'newjunebold';
    font-size: 14px;
    width: auto;
    background: @color1;
    color: @color7;
    padding: 0 50px;
    text-transform: uppercase;
  }
  .btn-modal-cancelar {
    font-family: 'newjunebold';
    font-size: 14px;
    width: auto;
    background: @color1;
    color: @color7;
    margin-top: 40px;
    padding: 0 50px;
    text-transform: uppercase;
  }
}

.fotos-enviadas-sucesso {
  width: 60%;
  h3 {
    font-family: 'newjunebold';
    font-size: 20px;
    color: @color1;
    font-weight: bold;
    margin: 40px 0 0 0;
  }
  h4 {
    font-family: 'newjuneregular';
    font-size: 16px;
    color: @color1;
    font-weight: bold;
    margin: 0;
    line-height: 14px;
  }
  ul{
    list-style-type: none;
    padding: 0;
  }
  p {
    font-family: 'newjuneregular';
    font-size: 16px;
    color: @color1;
    text-align: left;
  }
  .documentos {
    text-align: left;
  }
  .btn-modal-nova-operacao {
    font-family: 'newjunebold';
    font-size: 14px;
    width: auto;
    background: @color1;
    color: @color7;
    margin-top: 40px;
    padding: 0 50px;
    white-space: nowrap;
    text-transform: uppercase;
  }
  .btn-modal-ver-relatorios {
    font-family: 'newjunebold';
    font-size: 14px;
    width: auto;
    background: @color1;
    color: @color7;
    margin-top: 40px;
    padding: 0 50px;
    white-space: nowrap;
    text-transform: uppercase;
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.vue-dropzone>.dz-preview .dz-error-message {
  margin-left: auto;
  margin-right: auto;
  left: 0;
  width: 100%;
  text-align: center;
  top: 0;
}
</style>
