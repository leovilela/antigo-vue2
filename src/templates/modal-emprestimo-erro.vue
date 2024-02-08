<template>
  <div id="modalErros">

    <div class="alert alert-danger formatTxt" role="alert">
      <p class="glyphicon glyphicon-exclamation-sign"></p>
      <h3>Erro(s) nos bloco(s) ==> campo(s): </h3>
      <div>
        <table id="erros" width="100%">

          <tbody>
            <tr v-for="(pos, index) in transactionObj.response.data" :key="index">
              <td>
                <table border="1" width="100%" cellpadding="2" cellspacing="2">
                  <tr>
                    <td valign="top" align="left">
                      <ul v-for="(pos2, index) in pos.errorList" :key="index">
                        <li>{{text[pos.blockTypeDescription].title}} ==> {{text[pos.blockTypeDescription].labels[pos2.name.charAt(0).toLowerCase() + pos2.name.slice(1)]}}</li>
                      </ul>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<script>
/* eslint-disable func-names */


export default {
  data() {
    return {
      modalTimeOut: null,
      btRecarregue: false,
      text: {
        err400: "Erro nos dados enviados",
        err401: "Erro na autenticação.<br>Recarregue sua página",
        err403: "Não autorizado",
        err415: "Arquivo não suportado",
        err500: "Erro no processamento",
        recarregar_pagina: "Recarregar página",

        RegistrationData: {
          title: "Dados Cadastrais",
          labels: {
            cpf: "CPF",
            fullName: "Nome (sem abreviação)",
            rG: "Nº identidade",
            simpleName: "Nome abreviado",
            identificationDocumentType: "Tipo documento de Identificação",
            documentState: "UF",
            organEmitter: "Órgão emissor",
            emissionDate: "Data de emissão",
            degreeEducationID: "Grau de instrução",
            nameMother: "Nome da mãe",
            nameFather: "Nome do pai",
            maritalStatusID: "Estado civil",
            genderID: "Sexo",
            dependents: "Nº de dependentes",
            birthDate: "Data de nascimento",
            placeOfBirth: "Natural de",
            phone: "Telefone",
            phoneCel: "Celular",
            email: "E-mail",
          },
          placeholders: {
            idState: "UF",
            degreeEducationID: "Grau de instrução",
            maritalStatusID: "Estado civil",
            genderID: "Sexo",
          },
        },
        Spouse: {
          title: "Cônjuge/Companheiro",
          labels: {
            fullName: "Nome (sem abreviação)",
            documentNumberCPF: "CPF",
            placeOfBirth: "Natural de",
            documentNumberRG: "Nº Identidade",
            identificationDocumentType: "Tipo documento de Identificação",
            idState: "UF",
            organEmitter: "Órgão emissor",
            emissionDate: "Data de emissão",
            birthdate: "Data de nascimento",
            nameMother: "Nome da mãe",
            nameFather: "Nome do pai",
            addressPostalCode: "CEP",
            addressStreetName: "Endereço",
            addressNumber: "Nº",
            addressAdditionalData: "Complemento",
            addressNeighborhood: "Bairro",
            addressStateID: "UF",
            cityName: "Cidade",
            telOffice: "Telefone",
            nameEmployer: "Nome do empregador",
            departament: "Departamento",
            profession: "Profissão",
            jobRole: "Cargo",
            admissionDate: "Data admissão",
          },
          placeholders: {
            idState: "UF",
            cityName: "Cidade",
            departament: "Departamento",
            profession: "Profissão",
            function: "Cargo",
          },
        },
        Address: {
          title: "Residência",
          labels: {
            addressPostalCode: "CEP",
            addressStreetName: "Endereço",
            addressNumber: "Nº",
            addressAdditionalData: "Complemento",
            addressNeighborhood: "Bairro",
            addressStateID: "UF",
            cityName: "Cidade",
            referencePoint: "Ponto de referência",
            homeTypeID: "Residência",
            homeTypeID_owner: "Própria",
            homeTypeID_rent: "Alugado",
            otherHome: "Outro",
            houseTime: "Tempo de residência",
            phone: "Telefone",
          },
          placeholders: {
            addressStateID: "UF",
            cityName: "Cidade",
            houseTimeID: "Tempo de residência",
          },
        },
        ProfessionalData: {
          title: "Dados profissionais",
          labels: {
            fullName: "Razão Social",
            numberDocumentCNPJ: "CNPJ",
            capitalParticipation: "Participação (%)",
            addressPostalCode: "CEP",
            addressStreetName: "Endereço",
            addressNumber: "Nº",
            addressAdditionalData: "Complemento",
            addressNeighborhood: "Bairro",
            uf: "UF",
            cityName: "Cidade",
            phone: "Telefone",
            salary: "Remuneração/Faturamento",
            profession: "Profissão",
            function: "Cargo",
            admissionDate: "Data admissão",
            hasAdditionalCompany: "Sócio/Proprietário em outra empresa?",
            hasAdditionalPayment: "Outras Rendas",
            yes: "Sim",
            no: "Não",
            rent: "Aluguel",
            retirement: "Aposentadoria",
            pension: "Pensão",
            proLabore: "Pro-labore",
            commission: "Comissão",
            other: "Outros",
            value: "Valor (R$)",
          },
          placeholders: {
            profession: "Profissão",
            uf: "UF",
            cityName: "Cidade",
            function: "Cargo",
          },
        },
        BankingReferences: {
          title: "Dados bancários",
          labels: {
            bank: "Banco",
            agency: "Agência",
            digit: "Dígito",
            account: "Conta corrente",
            account_since: "Conta desde",
          },
          placeholders: {
            account_since: "Conta desde",
          },
        },
        BusinessReferences: {
          title: "Referências comerciais/pessoais",
          labels: {
            fullName: "Nome",
            phone: "Telefone",
            kinship: "Grau de parentesco",
          },
        },
        dadosPatrimoniais: {
          title: "Dados patrimoniais",
          labels: {
            description: "Descrição",
            location: "Localização",
            value: "Valor",
            realEstate: "Bens imóveis",
            movables: "Bens móveis",
            type: "Espécie",
            brand: "Marca/Modelo",
            year: "Ano",
          },
          placeholders: {
            movables: "Tipo de bem",
          },
        },
        pep: {
          title: "Declaração Obrigatória Pessoa Exposta Politicamente",
          description: "PEP (Pessoa Exposta Politicamente) são pessoas que desempenham ou tenham desempenhado nos últimos cinco anos, no Brasil ou o exterior, cargos, empregos e/ou funções públicas relevantes, assim como seus representantes, familiares, e outras pessoas de seu relacionamento próximo. Conforme definido pela Circular nº 3.339 de 22/12/2016 do Banco Central do Brasil, as instituições financeiras, devem observar procedimentos a respeito das movimentações financeira das chamadas PEP. Possui representantes, sócios, administradores, familiares ou outras pessoas de seu relacionamento que desempenham ou desempenharam nos últimos 05 anos, no Brasil ou em países, territórios e dependências estrangeiras, cargos, empregos ou funções públicas relevantes?",
          labels: {
            yes: "Sim (Relacione abaixo)",
            no: "Não",
            cpf: "CPF",
            name: "Nome",
            startMandate: "Início mandato",
            expirationDate: "Fim mandato",
            kinship: "Grau relacionamento",
            organ: "Órgão",
            position: "Cargo",
          },
        },
        paymentError: {
          scheduleDate: "A data de pagamento não é um dia útil.",
          paymentData: "Erro nos dados enviados.",
        },
      },

    };
  },
  props: {
    transactionObj: {
      required: true,
    },
  },
  mounted() {
    this.protocolo = window.location.protocol;
    // this.transactionObj.data.forEach((value, index) => {
    //     value.posicao = index;
    //     self.listaCoeficientes.push(value);
    //   });
    // if (this.transactionObj.Code === 0) {
    //   myVar = setTimeout(this.redirectPage, 5000);
    // }
  },
  methods: {
    // emitir toggle Modal
    closeModal() {
      this.$nuxt.$emit("toggleModal", null);
    },
    redirectPage() {
      this.closeModal();
      this.$router.push("/login", () => {});
    },
    reloadPage() {
      this.$router.go({ path: "$nuxt.$route.path", force: true });
    },
    msgErr(err) {
      let msg;
      switch (err) {
        case (400):
          msg = this.text.err400;
          break;
        case (401):
          msg = this.text.err401;
          this.btRecarregue = true;
          break;
        case (403):
          msg = this.text.err403;
          this.$warehouse.remove("refresh_token");
          this.$warehouse.remove("access_token");
          this.$warehouse.remove("Authorization");
          this.$warehouse.remove("expiresToken");
          setTimeout(this.redirectPage, 2000);
          break;
        case (415):
          msg = this.text.err415;
          break;
        case (500):
          msg = this.text.err500;
          break;
        default:
          msg = "Error";
      }

      return msg;
    },
    paymentError(err) {
      const self = this;

      if (err) {
        if (err.indexOf("scheduleDate") > -1) {
          return self.text.paymentError.scheduleDate;
        }
        return self.text.paymentError.paymentData;
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "~assets/vars.less";
@import "~assets/variables.less";

#modalErros {
  height: 100%;
  text-align: center;

  h3{
    padding:0;
     margin: 0;
  }

  ul{
    padding:0;
     margin: 0;
    list-style-type: none;
  }

  li{
    padding:0;
    margin: 0;

  }

  .formatTxt{
    font-size: @ftSizeLarge;
  }

  #loadImage{
    text-align: center;
  }

  #buttons {
    button {
      width: 100%;

      &#concluir {
        color: @color7;
      }
    }
  }
}
</style>
